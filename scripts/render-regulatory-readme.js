#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const statusPath = path.join(root, "data", "regulatory-status.json");
const readmePath = path.join(root, "README.md");

function renderDate(value) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(value + "T00:00:00Z"));
}

function render(status) {
  const annexIII = status.high_risk_application.annex_iii_standalone;
  const embedded = status.high_risk_application.annex_i_embedded_products;
  return [
    "<!-- regulatory-status:start -->",
    "### Regulatory status",
    "",
    "Source of truth: [`data/regulatory-status.json`](data/regulatory-status.json).",
    "",
    `Last reviewed: **${status.last_reviewed}**.`,
    "",
    `- Digital Omnibus status: \`${status.digital_omnibus.status}\` (${renderDate(status.digital_omnibus.agreement_date)}).`,
    `- Annex III stand-alone high-risk AI systems: **${renderDate(annexIII.date)}**.`,
    `- High-risk AI systems embedded in products under EU harmonisation legislation: **${renderDate(embedded.date)}**.`,
    "",
    `CI fails when \`last_reviewed\` is older than ${status.review_policy_months} months, so this block is a reminder to re-check the official sources before relying on the calendar.`,
    "<!-- regulatory-status:end -->"
  ].join("\n");
}

function replaceBlock(readme, block) {
  const pattern = /<!-- regulatory-status:start -->[\s\S]*?<!-- regulatory-status:end -->/;
  if (!pattern.test(readme)) {
    throw new Error("README.md is missing regulatory-status markers");
  }
  return readme.replace(pattern, block);
}

function main() {
  const status = JSON.parse(fs.readFileSync(statusPath, "utf8"));
  const block = render(status);

  if (process.argv.includes("--write")) {
    const readme = fs.readFileSync(readmePath, "utf8");
    fs.writeFileSync(readmePath, replaceBlock(readme, block) + "\n");
    return;
  }

  process.stdout.write(block + "\n");
}

if (require.main === module) main();

module.exports = { render, replaceBlock };
