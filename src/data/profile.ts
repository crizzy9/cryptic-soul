// Public CV detail from resume/OnePage/cv.tex, including the owner's commented bullets.
// The website has room for the fuller record; the downloadable PDF stays concise.
export const employers = [
  {
    id: "mosaic",
    name: "MosaicApp",
    website: "https://www.mosaicapp.com/",
    logo: "/logos/mosaic.png",
    initials: "M",
    context: "Chello · AI planning and agent systems",
    roles: [
      {
        title: "AI Technical Lead",
        period: "Aug 2025 – Present",
        location: "San Francisco, CA",
        current: true,
        achievements: [
          "Redesigned Chello's AI architecture, improving performance by 25% and cutting costs by 60%.",
          "Redesigned the agent cache and added subagents and task management to its LangChain harness.",
          "Led Model Context Protocol (MCP) development and built 27 CRUD tools.",
          "Launched Chello integrations for Slack and Microsoft Teams.",
          "Enabled tiered billing by integrating Stripe and MonetizeNow.",
          "Implemented dynamic model routing based on query complexity to reduce token usage and cost.",
        ],
      },
    ],
  },
  {
    id: "intuit",
    name: "Intuit",
    website: "https://www.intuit.com/",
    logo: "/logos/intuit.png",
    initials: "I",
    context: "Personalization, QuickBooks & TurboTax",
    roles: [
      {
        title: "Senior Software Engineer · Personalization",
        period: "Jan 2025 – Aug 2025",
        location: "Mountain View, CA",
        achievements: [
          "Built a LangChain agent orchestrator for RTB, on-call, and DevOps workflows.",
          "Architected unified user profiles with multi-source ingestion and real-time user embeddings on GPU-optimized EMR.",
          "Led a cross-regional team building a unified recommendation platform with Vespa, gRPC, and OpenSearch, replacing legacy systems.",
          "Developed an AI marketing agent with SymphonyAI, LangChain, and MCP, cutting campaign go-live time by 90%.",
          "Led five engineers building a bulk content system with dynamic templates and audience segmentation, increasing capacity by 1,400%.",
          "Built an LLM-powered content pipeline that automated marketing workflows and improved time-to-market by 75%.",
          "Created an MCP server for AI-powered marketing campaign creation, real-time content generation, and automated deployment.",
          "Crafted the personalization AI strategy roadmap across content generation, recommendations, predictive analytics, and workflow automation.",
        ],
      },
      {
        title: "Software Engineer 2 · Personalization",
        period: "Jan 2021 – Jan 2025",
        location: "Mountain View, CA",
        achievements: [
          "Engineered a self-service analytics platform with PySpark, AWS EMR, and React, reducing incidents and impression loss by 40%.",
          "Developed a RAG assistant with Hugging Face and LangChain for marketing content generation, reducing authoring time.",
          "Designed scalable PySpark data entities for real-time multi-source ingestion, eliminating approval bottlenecks.",
          "Implemented AWS Personalize on clickstream data with 20% lower API latency.",
          "Built a Kafka event pipeline for targeted offers that generated $10M in incremental revenue through dynamic audience targeting.",
          "Trained and deployed XGBoost and neural-network models for predictive business-health scoring, reducing investment risk by 23%.",
        ],
      },
      {
        title: "Software Engineer 1 · QuickBooks",
        period: "Jan 2020 – Jan 2021",
        location: "Mountain View, CA",
        achievements: [
          "Built a predictive revenue-forecasting model using customer behavior to estimate the impact of dynamic pricing strategies.",
          "Engineered a segmentation pipeline with AWS Glue and PyArrow to identify eligible cohorts for targeted pricing campaigns.",
          "Integrated price simulation and campaign execution components, delivering $20M in cost savings.",
          "Developed a pricing management platform with React, Spring Boot, and AWS, increasing operational efficiency by 50%.",
          "Implemented a parallelized synthetic-testing framework with Cypress, preventing $10M in potential revenue loss.",
        ],
      },
      {
        title: "Software Engineer Intern · TurboTax",
        period: "May 2019 – Aug 2019",
        location: "San Diego, CA",
        achievements: [
          "Developed OCR document processing for W2 uploads in TurboTax onboarding, reducing tax preparation time by 20%.",
          "Integrated an NLP intent-classification decision engine, replacing a third-party API and reducing latency by 30%.",
        ],
      },
      {
        title: "Software Engineer Co-op · TurboTax",
        period: "May 2018 – Dec 2018",
        location: "San Diego, CA",
        achievements: [
          "Engineered a rule-based case-deduplication service for the Intuit Help Portal, improving response time by 45% and reducing duplicates by 7%.",
          "Developed Smart Fields with React and PHP to automate content publishing, reducing support cases by 10%.",
          "Architected a serverless URL-redirect service with AWS Lambda and DynamoDB, improving routing efficiency by 35%.",
        ],
      },
    ],
  },
  {
    id: "outreachcircle",
    name: "OutreachCircle",
    website: "https://outreachcircle.com/",
    logo: "/logos/outreachcircle.png",
    initials: "OC",
    context: "Campaign software and constituent outreach",
    roles: [
      {
        title: "Software Developer",
        period: "Nov 2016 – May 2017",
        location: "Bangalore, India",
        achievements: [
          "Integrated Elasticsearch contact matching for voter registration and social profiles, improving outreach by 10%.",
          "Developed a campaign outreach platform with Meteor.js and Angular, improving canvassing efficiency and voter turnout by 15%.",
        ],
      },
    ],
  },
];

export const education = [
  {
    institution: "Northeastern University",
    school: "Khoury College of Computer Sciences",
    degree: "Master of Science in Computer Science",
    period: "Sept 2017 – Dec 2019",
    location: "Boston, MA",
    logo: "/logos/northeastern.png",
    initials: "NU",
    gpa: "3.2 / 4",
    courses: ["Natural language processing", "Reinforcement learning", "Robotics", "Machine learning", "Artificial intelligence"],
  },
  {
    institution: "University of Mumbai",
    school: "Fr. Conceição Rodrigues College of Engineering",
    degree: "Bachelor of Engineering in Computer Engineering",
    period: "Aug 2012 – June 2016",
    location: "Mumbai, India",
    initials: "MU",
    gpa: "7.4 / 10",
    courses: [],
  },
];

export const skillGroups = [
  {
    title: "AI engineering",
    description: "Agents, retrieval, and recommendation systems",
    primary: ["LangChain", "MCP", "Hugging Face", "Vespa"],
    supporting: ["RAG", "Model routing", "Agent orchestration", "AWS Personalize"],
  },
  {
    title: "Machine learning & vision",
    description: "Modeling, language, and robotic perception",
    primary: ["PyTorch", "TensorFlow", "OpenCV", "scikit-learn"],
    supporting: ["XGBoost", "Keras", "NLTK", "Gensim", "Reinforcement learning"],
  },
  {
    title: "Languages",
    description: "Across backend, data, and systems work",
    primary: ["Python", "TypeScript", "Java", "Go"],
    supporting: ["JavaScript", "SQL", "Scala", "C / C++", "Nix", "Lua"],
  },
  {
    title: "Web & service development",
    description: "Product interfaces and distributed APIs",
    primary: ["React", "Spring Boot", "HTMX", "gRPC"],
    supporting: ["Astro", "Django", "Node.js", "REST", "Cypress"],
  },
  {
    title: "Data engineering",
    description: "Streaming, ingestion, and large-scale processing",
    primary: ["PySpark", "Kafka", "AWS EMR", "PyArrow"],
    supporting: ["Hadoop", "Pandas", "Hive", "Beam", "Flink", "EventBus", "RabbitMQ"],
  },
  {
    title: "Cloud & infrastructure",
    description: "Cloud workloads and declarative self-hosting",
    primary: ["AWS", "Docker", "Kubernetes", "NixOS"],
    supporting: ["SageMaker", "Lambda", "Glue", "Athena", "Redshift", "Nix Flakes", "Home Manager"],
  },
  {
    title: "Storage & search",
    description: "Relational, document, and vector-backed applications",
    primary: ["PostgreSQL", "DynamoDB", "Redis", "OpenSearch"],
    supporting: ["MySQL", "SQLite", "MongoDB", "Elasticsearch", "Vector databases"],
  },
];

// Explicit order for the CV. Homepage feature flags do not control this list.
export const cvProjectSelections = [
  {
    contentId: "lumino.md",
    title: "Lumino",
    category: "Declarative infrastructure",
    description: "A NixOS platform for desktops and self-hosted services, built around Nix Flakes, Home Manager, modular YAML configuration, and sops-nix. Brings infrastructure changes, service configuration, and recoverable generations into a versioned system.",
    technologies: ["NixOS", "Nix Flakes", "Home Manager"],
  },
  {
    contentId: "naavik.md",
    title: "Naavik",
    category: "AI-powered career workflows",
    description: "A self-hosted platform for explainable job matching, profile management, tailored application documents, and application tracking. Built with Python, FastAPI, HTMX, PostgreSQL, and Typst; V1 release qualification is ongoing.",
    technologies: ["Python", "FastAPI", "PostgreSQL", "AI agents"],
  },
  {
    contentId: "plano.md",
    title: "Plano",
    category: "Flight tracking · In development",
    description: "A self-hosted flight tracker with a Go and SQLite backend and an Expo / React Native mobile app. Connects flight status, inbound aircraft, telemetry, and travel history, with live-source and device qualification in progress.",
    technologies: ["Go", "SQLite", "React Native"],
  },
  {
    contentId: "lumino_bot.md",
    title: "Omnidirectional Autonomous Robot",
    category: "Robotics & computer vision",
    description: "Engineered a Raspberry Pi robot with a servo-controlled 6-DOF arm, inverse kinematics, OpenCV object detection, speech-to-text commands, autonomous navigation, and obstacle avoidance.",
    technologies: ["Raspberry Pi", "OpenCV", "Inverse kinematics"],
  },
  {
    contentId: "reinforced_tranferL.md",
    title: "Reinforcement Learning for Robotic Manipulation",
    category: "Transfer-learning research",
    description: "Compared Q-Learning, DQN, Policy Gradient, and MCMC for robot-arm simulation using PyTorch and OpenAI Gym. Transfer-learning experiments achieved 35% faster convergence and 28% improved task performance.",
    technologies: ["PyTorch", "OpenAI Gym", "Reinforcement learning"],
  },
  {
    contentId: "musicgan.md",
    title: "Multi-Track Music Generation",
    category: "Transformer architectures",
    description: "Developed separate transformer models for melody, bass, drums, and harmony, connected by custom global multi-headed attention. The polyphonic generation work improved musical coherence by 45%.",
    technologies: ["Transformers", "Attention", "Generative modeling"],
  },
  {
    contentId: "text_reconstruction.md",
    title: "Paragraph Embeddings with Variational Autoencoders",
    category: "Natural language processing",
    description: "Implemented TensorFlow architectures for unsupervised paragraph representations on the Gutenberg Corpus, comparing VAE and bidirectional LSTM Seq2Seq approaches and improving semantic-similarity performance by 22%.",
    technologies: ["TensorFlow", "VAE", "LSTM"],
  },
  {
    contentId: "fanforge.md",
    title: "Fan Forge · Comic-Con Museum",
    category: "Community software & team leadership",
    description: "Led a backend team of five building an open-source application where fans could curate exhibit and artifact ideas for the Comic-Con Museum in San Diego, using Express.js and AWS Lambda.",
    technologies: ["Express.js", "AWS Lambda", "Open source"],
  },
  {
    contentId: "homelab.md",
    title: "Home Lab",
    category: "Distributed systems & self-hosting",
    description: "Built hybrid infrastructure using N100 mini PCs and a Raspberry Pi cluster with Kubernetes, Proxmox, UnifiOS, Open Media Vault, and Home Assistant, connected through Tailscale and Cloudflare DNS.",
    technologies: ["Kubernetes", "Proxmox", "Networking"],
  },
];

export const certifications = [
  {
    title: "Machine Learning Professional Certificate",
    issuer: "General Assembly",
    date: "June 2022",
    description: "Supervised and unsupervised learning, neural networks, ensembles, model evaluation, and deployment strategies through hands-on Python work.",
  },
  {
    title: "Apache PySpark Certification",
    issuer: "Databricks",
    date: "Dec 2021",
    description: "Distributed processing, Spark SQL, DataFrames, performance optimization, and production-scale data pipelines on Databricks.",
  },
  {
    title: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    date: "Oct 2019",
    description: "Distributed systems, cloud architecture, service selection, cost optimization, and scalable applications on AWS.",
  },
];

export const openSourceContributions = [
  {
    title: "Vicinae",
    category: "Desktop application launcher",
    year: "2025",
    description: "Contributed features to the C++ and Qt desktop launcher, including Raycast-compatible extension APIs, TypeScript SDK integration, and Linux-native keyboard-driven productivity tools.",
    technologies: ["C++", "Qt", "TypeScript"],
  },
  {
    title: "Mopidy",
    category: "Python music server",
    year: "2024",
    description: "Contributed features and fixes for Spotify integration, playlist synchronization, and audio-stream optimization for Raspberry Pi deployments.",
    technologies: ["Python", "Audio", "Raspberry Pi"],
  },
];
