/* Unit tests for the scoring engine. Run with: node test/scoring.test.js */
"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const Scoring = require("../js/scoring.js");
const rules = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "data", "rules.json"), "utf8")
);

function answers(overrides) {
  return Object.assign(
    {
      sector: "tech",
      size: "small",
      tools: ["chatgpt"],
      personalData: "no",
      sensitiveData: "no",
      highRiskAreas: ["none"],
      guidelines: "yes",
      humanReview: "always"
    },
    overrides
  );
}

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log("  ✓ " + name);
  } catch (err) {
    failed++;
    console.error("  ✗ " + name);
    console.error("    " + err.message);
  }
}

console.log("AI Act Scanner — scoring engine tests\n");

test("safe baseline answers give overall low", () => {
  const r = Scoring.evaluate(answers(), rules);
  assert.strictEqual(r.overall, "low");
  assert.strictEqual(r.findings.length, 0);
});

test("every area defaults to low with safe answers", () => {
  const r = Scoring.evaluate(answers(), rules);
  for (const area of Object.keys(r.areas)) {
    assert.strictEqual(r.areas[area].level, "low", area + " should be low");
  }
});

test("sensitive data = yes gives high overall and high data_protection", () => {
  const r = Scoring.evaluate(answers({ sensitiveData: "yes" }), rules);
  assert.strictEqual(r.overall, "high");
  assert.strictEqual(r.areas.data_protection.level, "high");
  assert.ok(r.findings.some((f) => f.id === "dp_sensitive_yes"));
});

test("personal data = yes (only) gives medium overall", () => {
  const r = Scoring.evaluate(answers({ personalData: "yes" }), rules);
  assert.strictEqual(r.overall, "medium");
  assert.strictEqual(r.areas.data_protection.level, "medium");
});

test("personal data = unknown (only) gives unknown overall", () => {
  const r = Scoring.evaluate(answers({ personalData: "unknown" }), rules);
  assert.strictEqual(r.overall, "unknown");
  assert.strictEqual(r.areas.data_protection.level, "unknown");
});

test("each Annex III area triggers high", () => {
  for (const area of [
    "hr",
    "healthcare",
    "finance",
    "education",
    "credit_scoring",
    "law_enforcement",
    "automated_decisions"
  ]) {
    const r = Scoring.evaluate(answers({ highRiskAreas: [area] }), rules);
    assert.strictEqual(r.overall, "high", area + " should be high");
    assert.strictEqual(r.areas.annex_iii.level, "high", area);
    assert.ok(
      r.findings.some((f) => f.id === "ax_" + area),
      "finding ax_" + area + " expected"
    );
  }
});

test("regulated sector + AI tools gives medium annex_iii", () => {
  const r = Scoring.evaluate(
    answers({ sector: "healthcare", tools: ["chatgpt", "docs"] }),
    rules
  );
  assert.strictEqual(r.areas.annex_iii.level, "medium");
  assert.strictEqual(r.overall, "medium");
  assert.ok(r.findings.some((f) => f.id === "ax_regulated_sector"));
});

test("regulated sector with no tools does NOT trigger regulated-sector rule", () => {
  const r = Scoring.evaluate(
    answers({ sector: "healthcare", tools: ["none"] }),
    rules
  );
  assert.ok(!r.findings.some((f) => f.id === "ax_regulated_sector"));
  assert.strictEqual(r.areas.annex_iii.level, "low");
});

test("no guidelines gives medium governance", () => {
  const r = Scoring.evaluate(answers({ guidelines: "no" }), rules);
  assert.strictEqual(r.areas.governance.level, "medium");
  assert.strictEqual(r.overall, "medium");
});

test("partial guidelines keeps governance low but adds a finding", () => {
  const r = Scoring.evaluate(answers({ guidelines: "partial" }), rules);
  assert.strictEqual(r.areas.governance.level, "low");
  assert.strictEqual(r.overall, "low");
  assert.ok(r.findings.some((f) => f.id === "gov_partial_guidelines"));
});

test("never reviewing outputs gives high human_oversight", () => {
  const r = Scoring.evaluate(answers({ humanReview: "never" }), rules);
  assert.strictEqual(r.areas.human_oversight.level, "high");
  assert.strictEqual(r.overall, "high");
});

test("sometimes reviewing outputs gives medium human_oversight", () => {
  const r = Scoring.evaluate(answers({ humanReview: "sometimes" }), rules);
  assert.strictEqual(r.areas.human_oversight.level, "medium");
});

test("high beats unknown in overall precedence", () => {
  const r = Scoring.evaluate(
    answers({ personalData: "unknown", highRiskAreas: ["hr"] }),
    rules
  );
  assert.strictEqual(r.overall, "high");
});

test("medium beats unknown in overall precedence", () => {
  const r = Scoring.evaluate(
    answers({ personalData: "unknown", guidelines: "no" }),
    rules
  );
  assert.strictEqual(r.overall, "medium");
});

test("missing required answers force overall unknown", () => {
  const r = Scoring.evaluate({ sector: "tech" }, rules);
  assert.strictEqual(r.overall, "unknown");
  assert.ok(r.incomplete.length > 0);
});

test("empty multi-select counts as missing", () => {
  const r = Scoring.evaluate(answers({ tools: [] }), rules);
  assert.strictEqual(r.overall, "unknown");
  assert.ok(r.incomplete.includes("tools"));
});

test("recommendations are non-empty and deduplicated", () => {
  const r = Scoring.evaluate(
    answers({ sensitiveData: "yes", highRiskAreas: ["hr", "credit_scoring"] }),
    rules
  );
  assert.ok(r.recommendations.length > 0);
  assert.strictEqual(new Set(r.recommendations).size, r.recommendations.length);
});

test("high overall always recommends expert review", () => {
  const r = Scoring.evaluate(answers({ humanReview: "never" }), rules);
  assert.ok(r.recommendations.includes("expert_review"));
});

test("low overall still recommends inventory and policy (base steps)", () => {
  const r = Scoring.evaluate(answers(), rules);
  assert.ok(r.recommendations.includes("inventory"));
  assert.ok(r.recommendations.includes("policy"));
});

test("every rule id, area and step key has ES and EN translations", () => {
  const I18N = require("../js/i18n.js");
  for (const lang of ["es", "en"]) {
    for (const area of rules.areas) {
      assert.ok(I18N[lang].areas[area.id], lang + " missing area " + area.id);
      for (const rule of area.rules) {
        assert.ok(
          I18N[lang].findings[rule.id],
          lang + " missing finding " + rule.id
        );
        for (const step of rule.recommends || []) {
          assert.ok(I18N[lang].steps[step], lang + " missing step " + step);
        }
      }
    }
    for (const level of Object.keys(rules.baseRecommendations)) {
      for (const step of rules.baseRecommendations[level]) {
        assert.ok(I18N[lang].steps[step], lang + " missing base step " + step);
      }
    }
  }
});

test("all rule levels exist in levelPrecedence", () => {
  for (const area of rules.areas) {
    assert.ok(rules.levelPrecedence.includes(area.default));
    for (const rule of area.rules) {
      assert.ok(
        rules.levelPrecedence.includes(rule.level),
        "bad level in " + rule.id
      );
    }
  }
});

console.log("\n" + passed + " passed, " + failed + " failed");
process.exit(failed ? 1 : 0);
