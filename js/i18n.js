/* AI Act Scanner — ES/EN strings. ES is the default language. */
var I18N = {
  es: {
    ui: {
      appName: "AI Act Scanner",
      tagline: "Checklist interno imprimible de riesgos de IA para equipos",
      start: "Empezar la evaluación",
      back: "Atrás",
      next: "Siguiente",
      results: "Ver resultados",
      downloadPdf: "Descargar informe PDF",
      restart: "Volver a empezar",
      stepOf: "Paso {0} de {1}",
      multiHint: "Puedes seleccionar varias opciones.",
      requiredMsg: "Selecciona una opción para continuar.",
      introTitle: "¿Dónde está tu empresa frente al Reglamento Europeo de IA?",
      introLead:
        "Responde 8 preguntas sobre cómo usa tu equipo la inteligencia artificial y obtén un checklist interno imprimible con próximos pasos prácticos. Pensado para pymes que ya usan ChatGPT, Copilot, automatizaciones internas u otras herramientas de IA.",
      privacyTitle: "100% local: tus datos no salen del navegador",
      privacyBody:
        "Esta herramienta funciona íntegramente en tu navegador. No hay servidor, no se envía nada a internet y no se guarda ninguna respuesta. No introduzcas datos confidenciales ni personales: solo se evalúan categorías de uso.",
      disclaimerTitle: "Aviso importante",
      disclaimerBody:
        "Esta herramienta ofrece únicamente una autoevaluación técnica y organizativa preliminar. No es asesoría legal, no es una certificación de cumplimiento y no sustituye una revisión jurídica, regulatoria o de protección de datos cualificada.",
      reportTitle: "Informe preliminar de riesgo",
      overallLabel: "Nivel de riesgo global",
      areasTitle: "Riesgo por área",
      risksTitle: "Principales riesgos identificados",
      noRisks:
        "No se han identificado señales de riesgo relevantes con las respuestas dadas. Mantén un inventario de herramientas de IA y revisa esta evaluación si cambia tu uso.",
      incompleteNote:
        "Algunas respuestas están incompletas o son «no lo sé»: el resultado se marca como desconocido. Aclarar estos puntos internamente es el primer paso.",
      stepsTitle: "Próximos pasos recomendados",
      timelineTitle: "Contexto normativo: por qué actuar ahora",
      timelineBody:
        "El Reglamento Europeo de IA (AI Act) ya está en vigor y aplica por fases. Según el acuerdo provisional de Digital Omnibus de {0}, las nuevas fechas de aplicación para sistemas de alto riesgo serían {1} para sistemas autónomos cubiertos por el Anexo III y {2} para sistemas embebidos en productos bajo legislación armonizada de la UE. Última revisión de esta nota: {3}.",
      checklistTitle: "Checklist interno imprimible",
      checklistBody:
        "Usa el informe descargable como material de trabajo para una conversación interna entre negocio, tecnología, operaciones, RRHH y cumplimiento. No es un canal comercial ni sustituye una revisión experta cuando haya usos sensibles o de alto impacto.",
      footerNote:
        "AI Act Scanner no es asesoría legal ni una certificación de cumplimiento. Procesamiento 100% local: ningún dato sale de tu navegador.",
      pdfGenerated: "Informe generado el",
      pdfAnswersTitle: "Resumen de respuestas"
    },
    levels: {
      low: "Bajo",
      medium: "Medio",
      high: "Alto",
      unknown: "Desconocido"
    },
    areas: {
      data_protection: "Datos personales y sensibles",
      annex_iii: "Usos de alto riesgo (Anexo III)",
      governance: "Gobernanza interna",
      human_oversight: "Supervisión humana"
    },
    questions: {
      sector: {
        label: "¿En qué sector opera tu empresa?",
        options: {
          tech: "Tecnología / software",
          commerce: "Comercio / retail",
          healthcare: "Salud",
          finance: "Finanzas / seguros",
          education: "Educación",
          legal: "Legal / asesoría",
          industrial: "Industria / fabricación",
          services: "Servicios profesionales",
          other: "Otro"
        }
      },
      size: {
        label: "¿Qué tamaño tiene tu empresa?",
        options: {
          micro: "1–9 personas",
          small: "10–49 personas",
          medium: "50–249 personas",
          large: "250 o más personas"
        }
      },
      tools: {
        label: "¿Qué herramientas de IA usáis actualmente?",
        options: {
          chatgpt: "ChatGPT u otros chatbots de IA",
          copilot: "Microsoft Copilot",
          gemini: "Google Gemini",
          internal: "Automatizaciones internas con IA",
          hr_software: "Software de RRHH con IA",
          docs: "Procesamiento de documentos con IA",
          support: "Atención al cliente automatizada",
          other: "Otras herramientas de IA",
          none: "Ninguna todavía"
        }
      },
      personalData: {
        label: "¿Se procesan datos personales con herramientas de IA?",
        hint: "Por ejemplo: nombres, emails, datos de clientes o empleados introducidos en prompts o flujos automatizados.",
        options: {
          yes: "Sí",
          no: "No",
          unknown: "No lo sé"
        }
      },
      sensitiveData: {
        label: "¿Se procesan datos sensibles con herramientas de IA?",
        hint: "Por ejemplo: salud, datos biométricos, afiliación sindical, religión, orientación sexual u opiniones políticas.",
        options: {
          yes: "Sí",
          no: "No",
          unknown: "No lo sé"
        }
      },
      highRiskAreas: {
        label: "¿Se usa IA en alguna de estas áreas?",
        hint: "Son ámbitos que el Anexo III del AI Act considera de alto riesgo.",
        options: {
          hr: "RRHH: selección, evaluación o despidos",
          healthcare: "Sanidad o decisiones clínicas",
          finance: "Finanzas: acceso a servicios esenciales",
          education: "Educación: admisión o evaluación",
          credit_scoring: "Scoring crediticio o solvencia",
          law_enforcement: "Seguridad o aplicación de la ley",
          automated_decisions: "Decisiones automatizadas con efectos sobre personas",
          none: "Ninguna de las anteriores"
        }
      },
      guidelines: {
        label: "¿Tienen los empleados directrices internas sobre el uso de IA?",
        options: {
          yes: "Sí, hay una política escrita",
          partial: "Hay indicaciones informales",
          no: "No"
        }
      },
      humanReview: {
        label: "¿Una persona revisa los resultados de la IA antes de usarlos?",
        options: {
          always: "Siempre",
          sometimes: "A veces",
          never: "Nunca",
          unknown: "No lo sé"
        }
      }
    },
    findings: {
      dp_sensitive_yes:
        "Se procesan datos sensibles con IA: máxima exposición bajo RGPD y AI Act. Requiere base jurídica clara, evaluación de impacto y revisión experta.",
      dp_personal_yes:
        "Se procesan datos personales con herramientas de IA. Revisa las condiciones de los proveedores, la base jurídica y considera una evaluación de impacto (EIPD).",
      dp_personal_unknown:
        "No está claro si se procesan datos personales con IA. Esta falta de visibilidad es en sí un riesgo: haz un inventario de usos.",
      dp_sensitive_unknown:
        "No está claro si se procesan datos sensibles con IA. Aclararlo internamente debe ser prioritario.",
      ax_hr:
        "Uso de IA en RRHH (selección, evaluación o despidos): categoría de alto riesgo del Anexo III del AI Act.",
      ax_healthcare:
        "Uso de IA en sanidad o decisiones clínicas: ámbito de alto riesgo con requisitos reforzados.",
      ax_finance:
        "Uso de IA en acceso a servicios financieros esenciales: puede encajar en categorías de alto riesgo del Anexo III.",
      ax_education:
        "Uso de IA en admisión o evaluación educativa: categoría de alto riesgo del Anexo III.",
      ax_credit_scoring:
        "Scoring crediticio con IA: categoría de alto riesgo explícita del Anexo III.",
      ax_law_enforcement:
        "Uso de IA en seguridad o aplicación de la ley: ámbito de alto riesgo con restricciones específicas.",
      ax_automated_decisions:
        "Decisiones automatizadas con efectos significativos sobre personas: riesgo alto bajo AI Act y art. 22 RGPD.",
      ax_regulated_sector:
        "Operáis en un sector regulado y usáis herramientas de IA: conviene mapear qué usos podrían encajar en el Anexo III.",
      gov_no_guidelines:
        "No existen directrices internas de uso de IA: riesgo de fugas de datos, usos no controlados y responsabilidad difusa.",
      gov_partial_guidelines:
        "Las directrices de IA son informales. Formalizar una política escrita reduce riesgo y da seguridad a los equipos.",
      ho_never:
        "Los resultados de la IA no se revisan por personas antes de usarse: riesgo alto de errores, sesgos y decisiones sin supervisión.",
      ho_sometimes:
        "La revisión humana de los resultados de IA es solo ocasional. Define en qué casos la revisión es obligatoria.",
      ho_unknown:
        "No está claro si los resultados de IA se revisan por personas. Documenta el flujo real de uso."
    },
    steps: {
      inventory:
        "Haz un inventario de herramientas y usos de IA en la empresa: quién usa qué, para qué y con qué datos.",
      policy:
        "Redacta (o formaliza) una política interna de uso de IA: usos permitidos, prohibidos y canal de dudas.",
      training:
        "Forma a los empleados en uso responsable de IA, incluyendo qué datos nunca deben introducirse en herramientas externas.",
      dpia:
        "Evalúa si necesitas una evaluación de impacto de protección de datos (EIPD) para los usos que tratan datos personales.",
      vendor_check:
        "Revisa los contratos y condiciones de tus proveedores de IA: residencia de datos, uso para entrenamiento y encargos de tratamiento.",
      human_review_process:
        "Define un proceso explícito de revisión humana para los resultados de IA con impacto en personas o decisiones de negocio.",
      monitor_timeline:
        "Sigue el calendario del AI Act para usos de alto riesgo y prepárate con antelación.",
      expert_review:
        "Solicita una revisión experta (legal y técnica) de los usos señalados como de alto riesgo antes de ampliarlos."
    }
  },
  en: {
    ui: {
      appName: "AI Act Scanner",
      tagline: "Printable internal AI risk checklist for teams",
      start: "Start the assessment",
      back: "Back",
      next: "Next",
      results: "See results",
      downloadPdf: "Download PDF report",
      restart: "Start over",
      stepOf: "Step {0} of {1}",
      multiHint: "You can select multiple options.",
      requiredMsg: "Select an option to continue.",
      introTitle: "Where does your company stand under the EU AI Act?",
      introLead:
        "Answer 8 questions about how your team uses artificial intelligence and get a printable internal checklist with practical next steps. Built for SMEs already using ChatGPT, Copilot, internal automations or other AI tools.",
      privacyTitle: "100% local: your data never leaves the browser",
      privacyBody:
        "This tool runs entirely in your browser. There is no server, nothing is sent over the internet, and no answer is stored. Do not enter confidential or personal data: only categories of use are assessed.",
      disclaimerTitle: "Important notice",
      disclaimerBody:
        "This tool provides a preliminary technical and organizational self-assessment only. It is not legal advice, not a compliance certification, and not a substitute for qualified legal, regulatory or data protection review.",
      reportTitle: "Preliminary risk report",
      overallLabel: "Overall risk level",
      areasTitle: "Risk by area",
      risksTitle: "Main risks identified",
      noRisks:
        "No relevant risk signals were identified from your answers. Keep an inventory of AI tools and revisit this assessment if your usage changes.",
      incompleteNote:
        "Some answers are incomplete or \"I don't know\": the result is marked as unknown. Clarifying these points internally is the first step.",
      stepsTitle: "Recommended next steps",
      timelineTitle: "Regulatory context: why act now",
      timelineBody:
        "The EU AI Act is already in force and applies in stages. Under the {0} provisional Digital Omnibus agreement, the new application dates for high-risk systems would be {1} for stand-alone systems covered by Annex III and {2} for systems embedded in products under EU harmonisation legislation. Last reviewed: {3}.",
      checklistTitle: "Printable internal checklist",
      checklistBody:
        "Use the downloadable report as working material for an internal conversation between business, technology, operations, HR and compliance. It is not a commercial channel and it does not replace expert review where sensitive or high-impact uses are involved.",
      footerNote:
        "AI Act Scanner is not legal advice or a compliance certification. 100% local processing: no data leaves your browser.",
      pdfGenerated: "Report generated on",
      pdfAnswersTitle: "Answers summary"
    },
    levels: {
      low: "Low",
      medium: "Medium",
      high: "High",
      unknown: "Unknown"
    },
    areas: {
      data_protection: "Personal & sensitive data",
      annex_iii: "High-risk uses (Annex III)",
      governance: "Internal governance",
      human_oversight: "Human oversight"
    },
    questions: {
      sector: {
        label: "What sector does your company operate in?",
        options: {
          tech: "Technology / software",
          commerce: "Commerce / retail",
          healthcare: "Healthcare",
          finance: "Finance / insurance",
          education: "Education",
          legal: "Legal / advisory",
          industrial: "Industry / manufacturing",
          services: "Professional services",
          other: "Other"
        }
      },
      size: {
        label: "How big is your company?",
        options: {
          micro: "1–9 people",
          small: "10–49 people",
          medium: "50–249 people",
          large: "250+ people"
        }
      },
      tools: {
        label: "Which AI tools do you currently use?",
        options: {
          chatgpt: "ChatGPT or other AI chatbots",
          copilot: "Microsoft Copilot",
          gemini: "Google Gemini",
          internal: "Internal AI automations",
          hr_software: "HR software with AI",
          docs: "AI document processing",
          support: "Automated customer support",
          other: "Other AI tools",
          none: "None yet"
        }
      },
      personalData: {
        label: "Is personal data processed with AI tools?",
        hint: "For example: names, emails, customer or employee data entered into prompts or automated flows.",
        options: {
          yes: "Yes",
          no: "No",
          unknown: "I don't know"
        }
      },
      sensitiveData: {
        label: "Is sensitive data processed with AI tools?",
        hint: "For example: health, biometric data, union membership, religion, sexual orientation or political opinions.",
        options: {
          yes: "Yes",
          no: "No",
          unknown: "I don't know"
        }
      },
      highRiskAreas: {
        label: "Is AI used in any of these areas?",
        hint: "These are areas that Annex III of the AI Act treats as high-risk.",
        options: {
          hr: "HR: hiring, evaluation or dismissals",
          healthcare: "Healthcare or clinical decisions",
          finance: "Finance: access to essential services",
          education: "Education: admission or grading",
          credit_scoring: "Credit scoring or creditworthiness",
          law_enforcement: "Security or law enforcement",
          automated_decisions: "Automated decisions affecting people",
          none: "None of the above"
        }
      },
      guidelines: {
        label: "Do employees have internal guidelines on AI usage?",
        options: {
          yes: "Yes, there is a written policy",
          partial: "There is informal guidance",
          no: "No"
        }
      },
      humanReview: {
        label: "Does a person review AI outputs before they are used?",
        options: {
          always: "Always",
          sometimes: "Sometimes",
          never: "Never",
          unknown: "I don't know"
        }
      }
    },
    findings: {
      dp_sensitive_yes:
        "Sensitive data is processed with AI: maximum exposure under GDPR and the AI Act. Requires a clear legal basis, an impact assessment and expert review.",
      dp_personal_yes:
        "Personal data is processed with AI tools. Review vendor terms and legal basis, and consider a data protection impact assessment (DPIA).",
      dp_personal_unknown:
        "It is unclear whether personal data is processed with AI. That lack of visibility is itself a risk: build a usage inventory.",
      dp_sensitive_unknown:
        "It is unclear whether sensitive data is processed with AI. Clarifying this internally should be a priority.",
      ax_hr:
        "AI used in HR (hiring, evaluation or dismissals): a high-risk category under Annex III of the AI Act.",
      ax_healthcare:
        "AI used in healthcare or clinical decisions: a high-risk area with reinforced requirements.",
      ax_finance:
        "AI used in access to essential financial services: may fall under Annex III high-risk categories.",
      ax_education:
        "AI used in educational admission or grading: a high-risk category under Annex III.",
      ax_credit_scoring:
        "AI-based credit scoring: an explicit high-risk category under Annex III.",
      ax_law_enforcement:
        "AI used in security or law enforcement: a high-risk area with specific restrictions.",
      ax_automated_decisions:
        "Automated decisions with significant effects on people: high risk under the AI Act and GDPR art. 22.",
      ax_regulated_sector:
        "You operate in a regulated sector and use AI tools: map which uses could fall under Annex III.",
      gov_no_guidelines:
        "No internal AI usage guidelines exist: risk of data leaks, uncontrolled usage and unclear accountability.",
      gov_partial_guidelines:
        "AI guidance is informal. Formalizing a written policy reduces risk and gives teams clarity.",
      ho_never:
        "AI outputs are not reviewed by people before use: high risk of errors, bias and unsupervised decisions.",
      ho_sometimes:
        "Human review of AI outputs is only occasional. Define when review is mandatory.",
      ho_unknown:
        "It is unclear whether AI outputs are reviewed by people. Document the actual usage flow."
    },
    steps: {
      inventory:
        "Build an inventory of AI tools and uses in the company: who uses what, for what purpose, and with which data.",
      policy:
        "Write (or formalize) an internal AI usage policy: permitted uses, prohibited uses, and a channel for questions.",
      training:
        "Train employees in responsible AI usage, including which data must never be entered into external tools.",
      dpia:
        "Assess whether you need a data protection impact assessment (DPIA) for uses that process personal data.",
      vendor_check:
        "Review your AI vendors' contracts and terms: data residency, training on your data, and data processing agreements.",
      human_review_process:
        "Define an explicit human review process for AI outputs that affect people or business decisions.",
      monitor_timeline:
        "Track the AI Act timeline for high-risk uses and prepare ahead of time.",
      expert_review:
        "Get an expert (legal and technical) review of the uses flagged as high-risk before expanding them."
    }
  }
};
if (typeof module === "object" && module.exports) module.exports = I18N;
