/* AI Act Scanner — wizard, i18n toggle, report rendering and PDF export.
 * All processing is local: no network calls besides loading static assets. */
(function () {
  "use strict";

  var QUESTIONS = [
    { id: "sector", type: "single", options: ["tech", "commerce", "healthcare", "finance", "education", "legal", "industrial", "services", "other"], compact: true },
    { id: "size", type: "single", options: ["micro", "small", "medium", "large"] },
    { id: "tools", type: "multi", exclusive: "none", options: ["chatgpt", "copilot", "gemini", "internal", "hr_software", "docs", "support", "other", "none"], compact: true },
    { id: "personalData", type: "single", options: ["yes", "no", "unknown"] },
    { id: "sensitiveData", type: "single", options: ["yes", "no", "unknown"] },
    { id: "highRiskAreas", type: "multi", exclusive: "none", options: ["hr", "healthcare", "finance", "education", "credit_scoring", "law_enforcement", "automated_decisions", "none"] },
    { id: "guidelines", type: "single", options: ["yes", "partial", "no"] },
    { id: "humanReview", type: "single", options: ["always", "sometimes", "never", "unknown"] }
  ];

  var state = {
    lang: localStorage.getItem("aas-lang") || "es",
    step: 0,
    answers: {},
    rules: null,
    result: null
  };

  var $ = function (sel) { return document.querySelector(sel); };

  function t(path) {
    var parts = path.split(".");
    var node = I18N[state.lang];
    for (var i = 0; i < parts.length; i++) {
      node = node && node[parts[i]];
    }
    return node !== undefined ? node : path;
  }

  function format(str) {
    var args = Array.prototype.slice.call(arguments, 1);
    return str.replace(/\{(\d+)\}/g, function (_, n) { return args[n]; });
  }

  /* ---------- i18n ---------- */
  function applyStaticTranslations() {
    document.documentElement.lang = state.lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    $("#lang-es").classList.toggle("active", state.lang === "es");
    $("#lang-en").classList.toggle("active", state.lang === "en");
    $("#lang-es").setAttribute("aria-pressed", state.lang === "es");
    $("#lang-en").setAttribute("aria-pressed", state.lang === "en");
  }

  function setLang(lang) {
    state.lang = lang;
    localStorage.setItem("aas-lang", lang);
    applyStaticTranslations();
    if (!$("#screen-wizard").hidden) renderQuestion();
    if (!$("#screen-report").hidden) renderReport();
  }

  /* ---------- screens ---------- */
  function showScreen(id) {
    ["screen-intro", "screen-wizard", "screen-report"].forEach(function (s) {
      $("#" + s).hidden = s !== id;
    });
    window.scrollTo({ top: 0 });
  }

  /* ---------- wizard ---------- */
  function renderQuestion() {
    var q = QUESTIONS[state.step];
    var qt = t("questions." + q.id);

    $("#progress-label").textContent = format(t("ui.stepOf"), state.step + 1, QUESTIONS.length);
    $("#progress-bar").style.width = ((state.step + 1) / QUESTIONS.length) * 100 + "%";
    $("#question-label").textContent = qt.label;

    var hintEl = $("#question-hint");
    var hint = qt.hint || (q.type === "multi" ? t("ui.multiHint") : "");
    if (qt.hint && q.type === "multi") hint = qt.hint + " " + t("ui.multiHint");
    hintEl.textContent = hint;
    hintEl.hidden = !hint;

    var optionsEl = $("#options");
    optionsEl.innerHTML = "";
    optionsEl.classList.toggle("options-compact", !!q.compact);

    q.options.forEach(function (opt) {
      var label = document.createElement("label");
      label.className = "option";
      var input = document.createElement("input");
      input.type = q.type === "multi" ? "checkbox" : "radio";
      input.name = q.id;
      input.value = opt;

      var current = state.answers[q.id];
      if (q.type === "multi") {
        input.checked = Array.isArray(current) && current.indexOf(opt) !== -1;
      } else {
        input.checked = current === opt;
      }
      if (input.checked) label.classList.add("selected");

      input.addEventListener("change", function () { onOptionChange(q, opt, input); });

      var span = document.createElement("span");
      span.textContent = qt.options[opt];
      label.appendChild(input);
      label.appendChild(span);
      optionsEl.appendChild(label);
    });

    $("#btn-back").style.visibility = state.step === 0 ? "hidden" : "visible";
    $("#btn-next").textContent = state.step === QUESTIONS.length - 1 ? t("ui.results") : t("ui.next");
    $("#validation-msg").hidden = true;
  }

  function onOptionChange(q, opt, input) {
    if (q.type === "multi") {
      var arr = Array.isArray(state.answers[q.id]) ? state.answers[q.id].slice() : [];
      if (input.checked) {
        // "none" is mutually exclusive with everything else
        if (opt === q.exclusive) arr = [opt];
        else arr = arr.filter(function (v) { return v !== q.exclusive; }).concat(opt);
      } else {
        arr = arr.filter(function (v) { return v !== opt; });
      }
      state.answers[q.id] = arr;
      renderQuestion();
    } else {
      state.answers[q.id] = opt;
      renderQuestion();
    }
    $("#validation-msg").hidden = true;
  }

  function validateStep() {
    var q = QUESTIONS[state.step];
    var v = state.answers[q.id];
    if (q.type === "multi") return Array.isArray(v) && v.length > 0;
    return typeof v === "string" && v.length > 0;
  }

  function nextStep(e) {
    e.preventDefault();
    if (!validateStep()) {
      var msg = $("#validation-msg");
      msg.textContent = t("ui.requiredMsg");
      msg.hidden = false;
      return;
    }
    if (state.step < QUESTIONS.length - 1) {
      state.step++;
      renderQuestion();
    } else {
      state.result = Scoring.evaluate(state.answers, state.rules);
      renderReport();
      showScreen("screen-report");
    }
  }

  function prevStep() {
    if (state.step > 0) {
      state.step--;
      renderQuestion();
    }
  }

  /* ---------- report ---------- */
  function badge(level) {
    var span = document.createElement("span");
    span.className = "badge badge-" + level;
    span.textContent = t("levels." + level);
    return span;
  }

  function renderReport() {
    var r = state.result;
    if (!r) return;

    var overallEl = $("#overall-badge");
    overallEl.className = "badge badge-" + r.overall;
    overallEl.textContent = t("levels." + r.overall);

    var note = $("#incomplete-note");
    var hasUnknown = r.incomplete.length > 0 || r.findings.some(function (f) { return f.level === "unknown"; });
    note.textContent = t("ui.incompleteNote");
    note.hidden = !hasUnknown;

    var grid = $("#areas-grid");
    grid.innerHTML = "";
    Object.keys(r.areas).forEach(function (areaId) {
      var card = document.createElement("div");
      card.className = "area-card";
      var name = document.createElement("span");
      name.className = "area-name";
      name.textContent = t("areas." + areaId);
      card.appendChild(name);
      card.appendChild(badge(r.areas[areaId].level));
      grid.appendChild(card);
    });

    var risks = $("#risks-list");
    risks.innerHTML = "";
    if (r.findings.length === 0) {
      var li = document.createElement("li");
      li.textContent = t("ui.noRisks");
      risks.appendChild(li);
    } else {
      r.findings.forEach(function (f) {
        var li = document.createElement("li");
        li.textContent = t("findings." + f.id);
        if (f.level === "low") li.className = "risk-low";
        risks.appendChild(li);
      });
    }

    var steps = $("#steps-list");
    steps.innerHTML = "";
    r.recommendations.forEach(function (s) {
      var li = document.createElement("li");
      li.textContent = t("steps." + s);
      steps.appendChild(li);
    });
  }

  /* ---------- PDF ---------- */
  function downloadPdf() {
    var r = state.result;
    if (!r || !window.jspdf) return;
    var doc = new window.jspdf.jsPDF({ unit: "mm", format: "a4" });
    var W = 210, MARGIN = 18, MAXW = W - MARGIN * 2;
    var y = 20;

    function ensureSpace(h) {
      if (y + h > 280) { doc.addPage(); y = 20; }
    }
    function text(str, size, style, color, indent) {
      doc.setFontSize(size);
      doc.setFont("helvetica", style || "normal");
      doc.setTextColor(color || "#1e293b");
      var lines = doc.splitTextToSize(str, MAXW - (indent || 0));
      lines.forEach(function (line) {
        ensureSpace(size * 0.5);
        doc.text(line, MARGIN + (indent || 0), y);
        y += size * 0.5;
      });
    }
    function gap(h) { y += h; }

    text(t("ui.appName"), 20, "bold", "#16324f");
    text(t("ui.reportTitle"), 13, "normal", "#475569");
    text(t("ui.pdfGenerated") + " " + new Date().toLocaleDateString(state.lang === "es" ? "es-ES" : "en-GB"), 9, "normal", "#64748b");
    gap(6);

    text(t("ui.overallLabel") + ": " + t("levels." + r.overall), 14, "bold", "#16324f");
    gap(4);

    text(t("ui.areasTitle"), 12, "bold", "#16324f");
    gap(1);
    Object.keys(r.areas).forEach(function (areaId) {
      text("• " + t("areas." + areaId) + ": " + t("levels." + r.areas[areaId].level), 10, "normal", "#1e293b", 2);
    });
    gap(4);

    text(t("ui.risksTitle"), 12, "bold", "#16324f");
    gap(1);
    if (r.findings.length === 0) {
      text(t("ui.noRisks"), 10, "normal", "#1e293b", 2);
    } else {
      r.findings.forEach(function (f) {
        text("• " + t("findings." + f.id), 10, "normal", "#1e293b", 2);
        gap(1);
      });
    }
    gap(3);

    text(t("ui.stepsTitle"), 12, "bold", "#16324f");
    gap(1);
    r.recommendations.forEach(function (s, i) {
      text(i + 1 + ". " + t("steps." + s), 10, "normal", "#1e293b", 2);
      gap(1);
    });
    gap(3);

    text(t("ui.timelineTitle"), 12, "bold", "#16324f");
    gap(1);
    text(t("ui.timelineBody"), 9, "normal", "#475569");
    gap(4);

    text(t("ui.ctaTitle"), 12, "bold", "#16324f");
    gap(1);
    text(t("ui.ctaBody") + " — https://calendly.com/jd-robles", 10, "normal", "#1d6fb8");
    gap(4);

    text(t("ui.disclaimerTitle"), 11, "bold", "#b26a00");
    gap(1);
    text(t("ui.disclaimerBody"), 9, "normal", "#475569");

    doc.save(state.lang === "es" ? "informe-ai-act-scanner.pdf" : "ai-act-scanner-report.pdf");
  }

  /* ---------- init ---------- */
  function restart() {
    state.step = 0;
    state.answers = {};
    state.result = null;
    showScreen("screen-intro");
  }

  function init() {
    applyStaticTranslations();

    fetch("data/rules.json")
      .then(function (res) { return res.json(); })
      .then(function (rules) { state.rules = rules; })
      .catch(function (err) { console.error("Could not load scoring rules:", err); });

    $("#lang-es").addEventListener("click", function () { setLang("es"); });
    $("#lang-en").addEventListener("click", function () { setLang("en"); });
    $("#btn-start").addEventListener("click", function () {
      state.step = 0;
      renderQuestion();
      showScreen("screen-wizard");
    });
    $("#question-form").addEventListener("submit", nextStep);
    $("#btn-back").addEventListener("click", prevStep);
    $("#btn-pdf").addEventListener("click", downloadPdf);
    $("#btn-restart").addEventListener("click", restart);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
