// Public career facts aligned with resume/OnePage/cv.tex.
export const experience = [
  {
    title: "AI Technical Lead at MosaicApp",
    subtitle: "Aug 2025 – Present · San Francisco, CA",
    achievements: [
      "Redesigned Chello's AI architecture, improving performance by 25% and cutting costs by 60%.",
      "Redesigned the agent cache and added subagents and task management to its LangChain harness.",
      "Integrated Stripe and MonetizeNow to enable tiered billing.",
      "Implemented dynamic model routing based on query complexity to reduce token usage and cost.",
    ],
  },
  {
    title: "Senior Software Engineer · Personalization at Intuit",
    subtitle: "Jan 2025 – Aug 2025 · Mountain View, CA",
    achievements: [
      "Built a LangChain agent orchestrator for RTB, on-call, and DevOps workflows.",
      "Architected unified user profiles with multi-source ingestion and real-time user embeddings on GPU-optimized EMR.",
      "Led a cross-regional team building a recommendation platform with Vespa, gRPC, and OpenSearch.",
      "Developed an AI marketing agent with SymphonyAI, LangChain, and MCP, cutting campaign go-live time by 90%.",
      "Led five engineers building a bulk content system with dynamic templates and audience segmentation, increasing capacity by 1,400%.",
      "Built an LLM-powered content pipeline that improved marketing time-to-market by 75%.",
    ],
  },
  {
    title: "Software Engineer 2 · Personalization at Intuit",
    subtitle: "Jan 2021 – Jan 2025 · Mountain View, CA",
    achievements: [
      "Built a self-service analytics platform with PySpark, AWS EMR, and React, reducing incidents and impression loss by 40%.",
      "Developed a RAG assistant with Hugging Face and LangChain for marketing content generation.",
      "Implemented AWS Personalize on clickstream data with 20% lower API latency.",
      "Built a Kafka pipeline for targeted offers that generated $10M in incremental revenue.",
    ],
  },
  {
    title: "Software Engineer 1 · QuickBooks at Intuit",
    subtitle: "Jan 2020 – Jan 2021 · Mountain View, CA",
    achievements: [
      "Built a segmentation pipeline with AWS Glue and PyArrow for targeted pricing campaigns.",
      "Integrated price simulation and campaign execution components, delivering $20M in cost savings.",
      "Developed a pricing management platform with React, Spring Boot, and AWS, increasing operational efficiency by 50%.",
    ],
  },
  {
    title: "Software Engineer Intern · TurboTax at Intuit",
    subtitle: "May 2019 – Aug 2019 · San Diego, CA",
    achievements: [
      "Built OCR document processing for W2 uploads, reducing tax preparation time by 20%.",
      "Integrated an NLP intent-classification decision engine, reducing latency by 30%.",
    ],
  },
  {
    title: "Software Engineer Co-op · TurboTax at Intuit",
    subtitle: "May 2018 – Dec 2018 · San Diego, CA",
    achievements: [
      "Built a rule-based case deduplication service, improving response time by 45% and reducing duplicates by 7%.",
      "Developed Smart Fields with React and PHP to automate content publishing, reducing support cases by 10%.",
    ],
  },
  {
    title: "Software Developer at VoterCircle",
    subtitle: "Nov 2016 – May 2017 · Bangalore, India",
    achievements: [
      "Integrated Elasticsearch contact matching for voter registration and social profiles, improving outreach by 10%.",
      "Built a campaign outreach platform with Meteor.js and Angular, improving canvassing efficiency and voter turnout by 15%.",
    ],
  },
];

export const education = [
  {
    title: "Master of Science in Computer Science",
    subtitle: "Sept 2017 – Dec 2019 · Northeastern University, Khoury CCIS · Boston, MA",
    detail: "NLP, reinforcement learning, robotics, machine learning, and artificial intelligence.",
  },
  {
    title: "Bachelor of Engineering in Computer Engineering",
    subtitle: "Aug 2012 – June 2016 · University of Mumbai, Fr. CRCE · Mumbai, India",
  },
];

export const skills = [
  ["Languages", "Python, Java, JavaScript, TypeScript, Go, Nix, Lua, SQL, Scala, C/C++"],
  ["AI & machine learning", "PyTorch, TensorFlow, Hugging Face, LangChain, OpenCV, Vespa, NLTK, scikit-learn, Keras, Gensim"],
  ["Frameworks", "Spring Boot, React, HTMX, Astro, Django, Node.js, REST, gRPC"],
  ["Data engineering", "PySpark, Kafka, Hadoop, Pandas, PyArrow, Hive, Beam, Flink, EventBus, RabbitMQ"],
  ["Cloud & infrastructure", "AWS (SageMaker, Lambda, Glue, Personalize, EMR, OpenSearch, Athena, Redshift), Docker, Kubernetes"],
  ["Databases", "PostgreSQL, DynamoDB, MySQL, SQLite, MongoDB, Redis, Elasticsearch, vector databases"],
];
