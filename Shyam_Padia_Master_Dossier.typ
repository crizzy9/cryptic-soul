// Master career dossier — Shyam Padia (built 2026-07 from the Sesame vault:
// Dec-24 promo portfolio/scorecard/summary, FY23-FY25 YES forms + summaries,
// project docs, CrypticSoul/Lumino/Naavik spaces — plus the current Naavik
// profile DB). Purpose: the COMPLETE record for import into Naavik's parser.
// Density and completeness over 1-page polish; Naavik trims per application.

#set page(paper: "us-letter", margin: (x: 0.55in, top: 0.5in, bottom: 0.55in))
#set text(font: ("Helvetica", "Arial", "Liberation Sans"), size: 9.6pt)
#set par(leading: 0.48em, spacing: 0.5em, justify: false)

#let linkcolor = rgb("#1a4f8b")

#let sectitle(name) = {
  v(0.55em)
  block(spacing: 0pt)[
    #text(size: 12.5pt, weight: "bold")[#upper(name)]
    #v(-0.25em)
    #line(length: 100%, stroke: 0.6pt + black)
  ]
  v(0.12em)
}

#let jobentry(company, title, location, dates) = {
  v(0.25em)
  grid(
    columns: (auto, 1fr, auto),
    column-gutter: 10pt,
    [#text(weight: "bold", company) — #emph(title)],
    align(center, emph(location)),
    align(right, text(weight: "bold", dates)),
  )
  v(0.05em)
}

#let bullets(items) = {
  pad(left: 0.12in, {
    for b in items {
      par(hanging-indent: 0.14in)[• #b]
    }
  })
}

// ───────── Header ─────────

#align(center)[
  #text(size: 16pt, weight: "bold")[SHYAM PADIA]
  #v(-0.3em)
  #text(size: 9.5pt)[
    #link("mailto:shyam.padia930@gmail.com")[#text(fill: linkcolor)[shyam.padia930\@gmail.com]] |
    +1 (857)-294-9264 | Fremont, CA |
    #link("https://linkedin.com/in/shyam-padia")[#text(fill: linkcolor)[linkedin.com/in/shyam-padia]] |
    #link("https://github.com/crizzy9")[#text(fill: linkcolor)[github.com/crizzy9]] |
    #link("https://crypticsoul.dev")[#text(fill: linkcolor)[crypticsoul.dev]]
  ]
]

#sectitle("Summary")
Senior Software Engineer at Intuit (Personalization / Marketing Technology) with 8+ years building AI/ML-driven personalization, marketing platforms, and data infrastructure at scale. Recognized as the team's resident GenAI expert and Personalization Data Steward: led cross-regional and cross-functional teams (4–6 engineers) delivering recommendation platforms, RAG assistants, GenAI content-generation systems, and self-serve analytics that generated \$10M+ incremental revenue, saved \$20M+ through pricing automation, and expanded content-creation capacity by 1,400%. Deep across the stack — Java/Spring Boot and Python backends, PySpark/Kafka data pipelines on AWS, React and HTMX frontends — with production experience in LLM orchestration (LangChain, MCP, RAG, prompt engineering), AWS Personalize, and Vespa/OpenSearch retrieval. Builds and open-sources large personal systems (Naavik, Lumino). H1B visa, i-140 pending.

#sectitle("Work Experience")

#jobentry("Intuit, Personalization", "Senior Software Engineer", "Mountain View, CA", "Jan 2025 – Present")
#bullets((
  [Led cross-regional team building a unified recommendation platform with Vespa, gRPC and OpenSearch, replacing legacy recommendation systems across the GTM stack],
  [Built an AI agent orchestrator harness with LangChain automating RTB, Oncall and DevOps workflows for the Personalization team],
  [Developed an AI marketing agent with SymphonyAI, LangChain and MCPs, automating campaign workflows and cutting go-live time by 90%],
  [Led 5 engineers building a bulk content system with dynamic templates and audience segmentation, increasing content-creation capacity by 1,400% (20 → 300+ offers per run) while cutting manual validation errors by 90%],
  [Built LLM-powered content generation pipeline automating end-to-end marketing workflows, improving time-to-market by 75%],
  [Created an MCP server enabling AI-powered marketing campaign creation with real-time generation and automated deployment],
  [Architected unified user profiles with multi-source data ingestion, generating real-time user embeddings on GPU-optimized EMR],
  [Led a team of 4 authoring the FY25 Personalization GenAI strategy paper (intelligent content suggestions, image generation, audience segmentation, workflow automation) — the foundation of the Personalization Manager redesign targeting 75% faster campaign launches and 10x platform scalability],
  [Led a team of 6 building Personalization Assist, a RAG assistant over years of Campaign Manager and Personalization documentation (embeddings + GenOS plugin), reducing new-engineer onboarding time by 30% and documentation query time-to-resolution by 40%],
  [Overhauled Campaign Manager experimentation for live edits and instant publishing, cutting experiment deployment turnaround from 15 minutes to 2 minutes],
  [Migrated Campaign Manager to a dedicated IXP EventBus swimlane cluster — new consumer factory, multi-connection IDPS configuration, standardized secure builds — improving reliability of metadata and change-event consumption],
  [Shipped Audience Set 2.0 (targeting by reference, decoupled from offers) and self-serve import/export over new CM Bulk APIs, enabling large-scale campaign management],
))

#jobentry("Intuit, Personalization", "Software Engineer 2", "Mountain View, CA", "Jan 2021 – Jan 2025")
#bullets((
  [Led development of Targeted Offers with CDP integration in Campaign Manager — new Kafka/EventBus consumer, Promo Management UI, roles-and-permissions module, dependent audiences, subscribe-billing support — contributing ~\$10M revenue impact in its first stage with zero campaign-guardrail frequency-capping incidents and ~10x faster offer analysis],
  [Built the Audience & Access Point Insights self-serve pipeline (BPP + PySpark on EMR, Lambda + PyArrow over S3) with a chart-based UI in Campaign Manager, cutting on-call troubleshooting requests by 80% (~50 → ~10 per quarter) and saving 40–160 support hours per quarter],
  [Primary driver for Clean Data Entities: designed MarketingRecommendation and MarketingCampaignEngagement entities in the Data Lake via custom BPP + EventBus ingestion pipelines with strict DataMap schemas, making personalization data self-serve company-wide and improving domain-entity job runtime by 20%],
  [Co-designed Intuit's AWS Personalize recommendation engine (autoML initiative): scalable EMR batch pipeline transforming multi-source Intuit data into Personalize schemas, serving higher-quality recommendations with 10–20% lower API latency and lifting click-through in A/B tests],
  [Engineered self-serve analytics platform with PySpark/AWS EMR and React, reducing incidents and impression loss by 40%],
  [Led design and architecture for hyper-personalization with Spokesmodel (GenAI content generation with A2D teams): bulk-processing APIs, automated validation, SLA and interface contracts — expanding offer creation 1,400% and improving API performance by 50%],
  [Developed a RAG AI assistant with HuggingFace and LangChain for marketing content generation, reducing authoring time],
  [Built the Content Generator Copilot — a GenOS agent integrating GPT-4 into Campaign Manager with engineered system prompts and a form-based React UI — projected to cut marketing text iteration time by 50%],
  [Integrated Campaigns V2 workflows (unified multi-offer campaigns, reactive audience-targeting UI, publish/unpublish flows), enabling ~10x faster campaign and offer management and ~50% faster launches for common-audience campaigns],
  [Automated the Split Billing migration with scripted bulk updates against the Offer API, eliminating 150+ hours of manual work across 1,300+ offers],
  [Built Kafka event consumer pipeline for targeted offers, generating \$10M incremental revenue through dynamic audience targeting],
  [Created a self-maintained Maven library managing ServiceNow Change Request lifecycles for CM and IXP, streamlining incident management and improving developer productivity by 10%],
  [Spearheaded GWP synthetic testing (Cypress with parallelized strict price checks across all QBO home pages), preserving ~\$10M through pricing-regression detection],
  [Revised the QBO Business Health Score risk model using boosting and neural networks, reaching 85% accuracy predicting small-business success/failure from debt, revenue and YoY profit/loss],
  [Built a shared Python library (ETLize, with Intuit Mint) auto-managing AWS EMR/EC2/Athena resources for ETL pipelines],
  [Mentored 4+ junior engineers and interns; ran Brown Bag workshops on Databricks, BPP, Glue, ML and AWS Personalize],
))

#jobentry("Intuit, QuickBooks", "Software Engineer 1", "Mountain View, CA", "Jan 2020 – Jan 2021")
#bullets((
  [Built the QuickBooks Price Change platform from scratch in a team of 4 (React, Spring Boot, AWS Glue/SQS/S3): end-to-end campaign creation, cohort identification, price simulation and revenue tracking across all QuickBooks regions — delivering ~\$20M to the bottom line, 70%+ faster than prior methods, and boosting marketer productivity by 50%],
  [Engineered segmentation pipeline using AWS Glue and PyArrow to identify eligible cohorts for targeted pricing campaigns],
  [Integrated Price Simulation and Campaign Execution components for managing product pricing, with Karate/Gatling integration test suites and operational dashboards],
))

#jobentry("Intuit, TurboTax", "Software Engineer Intern", "San Diego, CA", "May 2019 – Aug 2019")
#bullets((
  [Integrated ML Decision Engine for NLP intent classification in the Get-To-Know-Me flow, replacing a third-party API and reducing latency by 30%],
  [Developed OCR document processing for W-2 upload in TurboTax onboarding, reducing tax preparation time by 20%],
))

#jobentry("Intuit, TurboTax", "Software Engineer Co-op", "San Diego, CA", "May 2018 – Dec 2018")
#bullets((
  [Engineered a rule-based case dedup service for Intuit Help Portal (Salesforce APIs; legacy SOAP migrated to REST on AWS Lambda), improving response time by 45% and reducing duplicates by 7%],
  [Developed Smart Fields with React and PHP to automate content publishing, reducing support cases by 10%],
  [Winner, Codechella — Intuit Intern Summit 2018],
))

#jobentry("VoterCircle", "Software Developer", "Bangalore, India", "Nov 2016 – May 2017")
#bullets((
  [Developed a friend-to-friend campaign outreach platform using Meteor.js and Angular, improving canvassing efficiency and voter turnout by 15%],
  [Integrated ElasticSearch contact-matching for voter registration against social media profiles, improving outreach by 10%],
))

#sectitle("Education")

#grid(
  columns: (1fr, auto, auto),
  column-gutter: 10pt,
  [#text(weight: "bold")[Northeastern University, Khoury College of Computer Sciences]],
  emph("Boston, MA"),
  text(weight: "bold")[Sep 2017 – Dec 2019],
)
#emph("Master of Science in Computer Science") — GPA 3.2/4 \
Coursework: Natural Language Processing, Reinforcement Learning, Robotics, Machine Learning, Artificial Intelligence
#v(0.3em)
#grid(
  columns: (1fr, auto, auto),
  column-gutter: 10pt,
  [#text(weight: "bold")[University of Mumbai, Fr. C. Rodrigues College of Engineering]],
  emph("Mumbai, India"),
  text(weight: "bold")[Aug 2012 – Jun 2016],
)
#emph("Bachelor of Engineering in Computer Engineering") — GPA 7.4/10

#sectitle("Technical Skills")

#let skillrow(cat, items) = par(hanging-indent: 0.9in)[#text(weight: "bold")[#cat: ] #items]
#skillrow("Languages", "Python, Java, JavaScript, TypeScript, Go, Nix, Lua, SQL, Scala, C/C++")
#skillrow("AI / ML", "PyTorch, TensorFlow, Hugging Face, LangChain, RAG, MCP (Model Context Protocol), prompt engineering, embeddings + vector search, AWS Personalize, GPT-4/OpenAI, Anthropic Claude, Ollama, Vespa, OpenCV, NLTK, scikit-learn, Keras, Gensim")
#skillrow("Frameworks", "Spring Boot, FastAPI, React.js, HTMX, Astro.js, Django, Node.js, REST, gRPC, SQLModel/SQLAlchemy, Pydantic")
#skillrow("Data", "PySpark, Kafka, EventBus, Hadoop, Pandas, PyArrow, Hive, Beam, Flink, RabbitMQ, Databricks, clickstream/ETL pipelines, Data Lake entity design")
#skillrow("Cloud / Infra", "AWS (SageMaker, Lambda, Glue, Personalize, EMR, EC2, OpenSearch, Athena, Redshift, SQS, S3, KMS), Docker, Kubernetes, NixOS/Nix flakes, Podman, Traefik, systemd, Netlify, Cloudflare")
#skillrow("Databases", "PostgreSQL (+pgvector), DynamoDB, MySQL, SQLite, MongoDB, Redis, ElasticSearch, vector databases")
#skillrow("Testing / Ops", "Karate, Gatling, Cypress (parallelized synthetic testing), pytest, Playwright, Prometheus/Grafana, Splunk dashboards, runbooks + on-call tooling")

#sectitle("Projects")

#grid(columns: (1fr, auto), [#text(weight: "bold")[Naavik — Open-Source Career Automation Platform] · #link("https://github.com/crizzy9/naavik")[#text(fill: linkcolor)[github.com/crizzy9/naavik]]], text(weight: "bold")[2026])
Self-hosted platform automating the full job-search lifecycle: AI resume/profile extraction, multi-source job scraping (LinkedIn, Indeed, Greenhouse, Lever, Ashby, Workday), explainable LLM compatibility scoring with visa filtering and gap analysis, tailored one-page Typst resume + cover-letter generation, application tracking with email-inbox inference, and human-gated auto-apply via Playwright form fillers. Python 3.12/FastAPI, HTMX + Jinja + Tailwind, PostgreSQL + pgvector, SQLModel, APScheduler, multi-provider LLM abstraction (Anthropic/OpenAI/Ollama) with per-call cost tracking; ships as a Nix flake and Docker Compose stack.
#v(0.3em)
#grid(columns: (1fr, auto), [#text(weight: "bold")[Lumino — Declarative Home-Infrastructure OS on NixOS]], text(weight: "bold")[2025])
Open-source homelab platform turning fragmented self-hosting into a unified, YAML-configured, schema-driven system: JSON-Schema contracts compiled through Nix, one-command service deployment with tiered isolation (MicroVM / NixOS container / Podman / systemd), Frost CLI (Go + Cobra) and an HTMX/Templ web dashboard, P2P mesh networking (Tailscale/WireGuard), local AI layer (Ollama, RAG, MCP), Prometheus/Grafana observability and Restic backups.
#v(0.3em)
#grid(columns: (1fr, auto), [#text(weight: "bold")[crypticsoul.dev — Portfolio & Writing]], text(weight: "bold")[ongoing])
Personal portfolio built with Astro on Netlify; CV and resume auto-synced from Naavik through a public portfolio API with webhook-triggered rebuilds.
#v(0.3em)
#grid(columns: (1fr, auto), [#text(weight: "bold")[Omnidirectional Autonomous Robot with Computer Vision]], text(weight: "bold")[2024])
Designed and built an omnidirectional robot with real-time computer-vision navigation and obstacle avoidance.
#v(0.3em)
#grid(columns: (1fr, auto), [#text(weight: "bold")[Reinforcement Learning Transfer for Robotic Manipulation]], text(weight: "bold")[2019])
Researched transfer learning for robotic manipulation policies across simulated environments (graduate research, Northeastern).
#v(0.3em)
#grid(columns: (1fr, auto), [#text(weight: "bold")[Multi-Track Music Generation with Transformer Architecture]], text(weight: "bold")[2019])
Built a transformer-based model generating coherent multi-track musical arrangements.

#sectitle("Open Source Contributions")

#bullets((
  [#text(weight: "bold")[Naavik] — author and maintainer of the open-source career-automation platform (Python/FastAPI/HTMX/Postgres; AGPL-3.0)],
  [#text(weight: "bold")[Lumino] (lumino-xlab) — author of the NixOS-based declarative home-infrastructure platform: module framework, Frost CLI, UI, and docs],
))

#sectitle("Certifications & Recognition")

#bullets((
  [Data Science Training Program — General Assembly (certified; team's resident ML expert)],
  [Personalization Data Steward — Intuit (official data-governance role for the Personalization platform)],
  [Winner, Codechella — Intuit Intern Summit 2018],
  [20+ Intuit spotlight awards across Customer Obsession (11), Stronger Together (8), Learn Fast, Deliver Awesome — including IXP cluster migration, Campaigns V2, Split Billing (150+ hours saved), GWP TurboTax homepage migration, and strategy-paper leadership],
  [Speaker: internal GenAI Tech Summit presentations; Brown Bag workshop series on Databricks, BPP, AWS Glue, ML and Amazon Personalize],
))
