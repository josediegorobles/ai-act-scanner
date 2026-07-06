> [!IMPORTANT]
> **Superseded by [ai-act-diagnosis-bot](https://github.com/josediegorobles/ai-act-diagnosis-bot)** — 2026-07-03.
>
> The canonical bot now provides an adaptive questionnaire that follows the user's answers.
> It generates a downloadable PDF report for the diagnosis.
> It supports both Spanish and English flows.

# AI Act Scanner

A preliminary self-assessment tool for Spanish SMEs to understand AI usage risks under the EU AI Act.

**Live demo: <https://josediegorobles.github.io/ai-act-scanner/>**

![AI Act Scanner screenshot](assets/screenshot.png)

## How It Works

AI Act Scanner is a static single-page web app — vanilla HTML, CSS and JavaScript, with no backend, no build step and no frameworks. It is 100% local-first: every answer is processed in the browser and no data ever leaves it.

1. **Wizard questionnaire** — 8 steps covering sector, company size, AI tools in use, personal/sensitive data, use of AI in HR, healthcare, finance, education, credit scoring or automated decision-making, internal guidelines, and human review of AI outputs.
2. **Scoring engine** — [`js/scoring.js`](js/scoring.js) is a small pure-function rule interpreter. All rules are explicit data in [`data/rules.json`](data/rules.json), grouped into four areas loosely mapped to the EU AI Act: personal & sensitive data, Annex III high-risk uses, internal governance, and human oversight. Each area and the overall result resolve to **low / medium / high / unknown**.
3. **Report** — on-screen summary plus a downloadable PDF (generated locally with jsPDF from a CDN): overall risk level, risk per area, main risks identified, recommended next steps, and a call to action for an expert human review.
4. **Bilingual** — Spanish (default) and English, switchable at any time; all strings live in [`js/i18n.js`](js/i18n.js).

### Regulatory framing

The EU AI Act is already in force and applies in stages. The obligations for Annex III high-risk systems have been postponed to **December 2027 / August 2028** under the May 2026 provisional agreement (the "Digital Omnibus" package). The tool deliberately frames this as *acting now is a competitive advantage* — never as artificial deadlines.

### Running locally

Serve the folder with any static server (the rules JSON is loaded with `fetch`, so `file://` won't work):

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

### Tests

The scoring engine is the one piece that must not fail, so it is unit-tested in plain Node (no dependencies):

```bash
node test/scoring.test.js
```

### Deployment

Deployed with GitHub Pages from the `main` branch (root folder). Everything is static, so any static host works.

## Who It Is For

AI Act Scanner is designed for small and medium-sized companies in Spain that are already using, testing, or planning to adopt AI tools in day-to-day operations.

Typical users include SMEs using tools such as ChatGPT, Microsoft Copilot, Gemini, internal AI automations, AI assistants, HR software, document processing workflows, customer support automation, or other AI-enabled business systems.

The project is especially relevant for founders, operations teams, engineering leaders, HR managers, customer support managers, and business owners who need a practical first view of where AI-related risk may exist before engaging in a deeper legal, compliance, or technical review.

## What Problem It Solves

Many SMEs are adopting AI faster than they are documenting policies, reviewing risks, or clarifying responsibilities. This creates uncertainty around:

- whether AI tools are being used in sensitive business areas
- whether personal or sensitive data is being processed
- whether employees have clear AI usage guidelines
- whether AI outputs are reviewed by humans
- whether specific use cases may require expert legal or compliance review

AI Act Scanner helps companies structure this first conversation. It does not certify compliance and does not provide legal advice. Its purpose is to make AI usage more visible, easier to discuss, and easier to prioritize.

## What The MVP Will Do

The MVP will provide a simple questionnaire and generate a preliminary risk summary based on the answers provided.

It will help users:

- describe how AI is currently used inside the company
- identify whether AI is used in higher-risk contexts
- flag potential exposure related to personal data, sensitive data, automated decisions, or regulated sectors
- receive a basic low, medium, high, or unknown risk indication
- receive practical next steps for internal review
- understand when to seek expert review

## Example Questionnaire

The first version of the questionnaire may ask for:

- sector
- company size
- AI tools used
- whether personal data is processed
- whether sensitive data is processed
- whether AI is used in HR, education, healthcare, finance, law enforcement, credit scoring, or automated decision-making
- whether employees receive AI usage guidelines
- whether AI outputs are reviewed by humans

## Example Output

An example preliminary report may include:

- risk level: low, medium, high, or unknown
- main risks identified
- recommended next steps
- a clear "seek expert review" call to action

The output should be understandable by non-lawyers and useful enough to support an internal conversation between business, technical, and compliance stakeholders.

## Privacy Principles

AI Act Scanner should follow conservative privacy principles from the beginning:

- do not upload confidential data
- do not upload personal data
- prefer local-first processing where possible
- collect only the information needed for the self-assessment
- make limitations clear before users enter information

The intended use is to assess categories of AI usage, not to analyze private documents, customer records, employee records, prompts, contracts, or production data.

## Disclaimer

AI Act Scanner provides a preliminary technical and organizational risk self-assessment only.

It is not legal advice. It is not a compliance certification tool. It is not a substitute for qualified legal, regulatory, compliance, or data protection review.

Companies using AI in sensitive, regulated, or high-impact areas should seek expert review before relying on internal AI processes or deploying AI-enabled workflows.

## Roadmap

- [x] web form
- [x] PDF report
- [x] Spanish and English support
- [ ] sector-specific templates
- [ ] internal AI policy generator

## Author

Jose Robles — Head of Engineering / AI Architect

Rust + AI + Web3 + technical leadership

## Commercial Note

For a human review of your AI usage risks and internal AI policy, contact Jose Robles: <https://calendly.com/jd-robles>.
