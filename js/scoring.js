/*
 * AI Act Scanner — scoring engine.
 * Pure functions, no DOM. Works in the browser (window.Scoring)
 * and in Node (module.exports) so the same code is unit-tested.
 * All rules live in data/rules.json — this file only interprets them.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.Scoring = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  function matchCondition(cond, answers) {
    if (cond.allOf) {
      return cond.allOf.every(function (c) {
        return matchCondition(c, answers);
      });
    }
    if (cond.anyOf) {
      return cond.anyOf.some(function (c) {
        return matchCondition(c, answers);
      });
    }
    var value = answers[cond.field];
    if (value === undefined || value === null) return false;
    if (Object.prototype.hasOwnProperty.call(cond, "equals")) {
      return value === cond.equals;
    }
    if (Object.prototype.hasOwnProperty.call(cond, "in")) {
      return cond.in.indexOf(value) !== -1;
    }
    if (Object.prototype.hasOwnProperty.call(cond, "includes")) {
      return Array.isArray(value) && value.indexOf(cond.includes) !== -1;
    }
    if (Object.prototype.hasOwnProperty.call(cond, "includesAny")) {
      return (
        Array.isArray(value) &&
        cond.includesAny.some(function (v) {
          return value.indexOf(v) !== -1;
        })
      );
    }
    throw new Error("Unknown condition operator: " + JSON.stringify(cond));
  }

  function maxLevel(levels, precedence) {
    var best = precedence[0];
    levels.forEach(function (l) {
      if (precedence.indexOf(l) > precedence.indexOf(best)) best = l;
    });
    return best;
  }

  function missingFields(answers, rules) {
    return rules.requiredFields.filter(function (f) {
      var v = answers[f];
      return v === undefined || v === null || v === "" ||
        (Array.isArray(v) && v.length === 0);
    });
  }

  /**
   * @param {object} answers questionnaire answers
   * @param {object} rules   parsed data/rules.json
   * @returns {{overall:string, areas:object, findings:Array, recommendations:Array, incomplete:Array}}
   */
  function evaluate(answers, rules) {
    var precedence = rules.levelPrecedence;
    var incomplete = missingFields(answers, rules);
    var findings = [];
    var areas = {};
    var recommendations = [];

    rules.areas.forEach(function (area) {
      var matchedLevels = [];
      area.rules.forEach(function (rule) {
        if (matchCondition(rule.if, answers)) {
          matchedLevels.push(rule.level);
          findings.push({ id: rule.id, area: area.id, level: rule.level });
          (rule.recommends || []).forEach(function (r) {
            if (recommendations.indexOf(r) === -1) recommendations.push(r);
          });
        }
      });
      areas[area.id] = {
        level: matchedLevels.length
          ? maxLevel(matchedLevels, precedence)
          : area.default,
        findings: findings
          .filter(function (f) { return f.area === area.id; })
          .map(function (f) { return f.id; })
      };
    });

    var overall = maxLevel(
      Object.keys(areas).map(function (k) { return areas[k].level; }),
      precedence
    );
    if (incomplete.length) overall = "unknown";

    (rules.baseRecommendations[overall] || []).forEach(function (r) {
      if (recommendations.indexOf(r) === -1) recommendations.push(r);
    });

    return {
      overall: overall,
      areas: areas,
      findings: findings,
      recommendations: recommendations,
      incomplete: incomplete
    };
  }

  return { evaluate: evaluate, matchCondition: matchCondition, maxLevel: maxLevel };
});
