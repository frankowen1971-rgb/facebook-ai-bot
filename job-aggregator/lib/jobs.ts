export type JobType = "Full-time" | "Part-time" | "Remote" | "Contract" | "Internship";

export type Job = {
  id: string;
  title: string;
  company: string;
  companyInitial: string;
  companyColor: string;
  location: string;
  type: JobType;
  category: string;
  salaryMin: number;
  salaryMax: number;
  salaryCurrency: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  postedAt: string;
  deadline: string;
  featured: boolean;
  source: string;
  applicants: number;
};

export const JOB_CATEGORIES = [
  "Engineering",
  "Design",
  "Marketing",
  "Finance",
  "Data Science",
  "Product",
  "Sales",
  "Operations",
  "Healthcare",
  "Education",
];

export const JOB_TYPES: JobType[] = [
  "Full-time",
  "Part-time",
  "Remote",
  "Contract",
  "Internship",
];

export const JOBS: Job[] = [
  {
    id: "1",
    title: "Senior Software Engineer",
    company: "Grameenphone",
    companyInitial: "GP",
    companyColor: "#00A651",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    category: "Engineering",
    salaryMin: 120000,
    salaryMax: 180000,
    salaryCurrency: "BDT",
    description:
      "Join Bangladesh's leading telecom company to build scalable backend systems serving 80M+ customers. You'll work on microservices architecture, API design, and cloud infrastructure.",
    requirements: [
      "5+ years of software engineering experience",
      "Proficiency in Java, Python, or Go",
      "Experience with AWS or Azure",
      "Strong knowledge of distributed systems",
      "Experience with Kubernetes and Docker",
    ],
    responsibilities: [
      "Design and implement scalable microservices",
      "Lead technical design reviews",
      "Mentor junior engineers",
      "Collaborate with product and design teams",
    ],
    postedAt: "2026-05-16",
    deadline: "2026-06-16",
    featured: true,
    source: "LinkedIn",
    applicants: 142,
  },
  {
    id: "2",
    title: "Product Designer (UI/UX)",
    company: "bKash",
    companyInitial: "bK",
    companyColor: "#E2136E",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    category: "Design",
    salaryMin: 80000,
    salaryMax: 130000,
    salaryCurrency: "BDT",
    description:
      "Shape the future of mobile financial services for millions of Bangladeshis. Design intuitive, accessible experiences for bKash's flagship app used by 65M+ users.",
    requirements: [
      "4+ years of product design experience",
      "Expert in Figma and prototyping tools",
      "Strong portfolio showcasing mobile UX",
      "Experience with design systems",
      "User research and usability testing skills",
    ],
    responsibilities: [
      "Lead end-to-end product design process",
      "Conduct user research and testing",
      "Build and maintain design system",
      "Collaborate with engineering on implementation",
    ],
    postedAt: "2026-05-15",
    deadline: "2026-06-10",
    featured: true,
    source: "Bdjobs",
    applicants: 89,
  },
  {
    id: "3",
    title: "Software Engineer, Backend",
    company: "Google",
    companyInitial: "G",
    companyColor: "#4285F4",
    location: "Singapore (Remote OK)",
    type: "Remote",
    category: "Engineering",
    salaryMin: 8000,
    salaryMax: 15000,
    salaryCurrency: "USD",
    description:
      "Work on Google-scale infrastructure used by billions worldwide. You'll solve complex distributed systems problems and contribute to products that impact the world.",
    requirements: [
      "BS/MS in Computer Science or equivalent",
      "3+ years of backend engineering experience",
      "Strong algorithms and data structures",
      "Experience with large-scale systems",
    ],
    responsibilities: [
      "Build and maintain large-scale distributed systems",
      "Write clean, well-tested code",
      "Participate in on-call rotation",
      "Drive technical direction within the team",
    ],
    postedAt: "2026-05-14",
    deadline: "2026-07-01",
    featured: true,
    source: "LinkedIn",
    applicants: 1240,
  },
  {
    id: "4",
    title: "Data Scientist",
    company: "Pathao",
    companyInitial: "Pa",
    companyColor: "#FF4719",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    category: "Data Science",
    salaryMin: 100000,
    salaryMax: 160000,
    salaryCurrency: "BDT",
    description:
      "Drive data-informed decisions at Southeast Asia's fastest-growing super app. Build ML models for ride pricing, fraud detection, and demand forecasting.",
    requirements: [
      "3+ years of data science experience",
      "Proficiency in Python, SQL",
      "Experience with ML frameworks (TensorFlow, PyTorch)",
      "Strong statistical knowledge",
    ],
    responsibilities: [
      "Build and deploy ML models to production",
      "Analyze large datasets for business insights",
      "A/B test new features and algorithms",
      "Collaborate with product teams",
    ],
    postedAt: "2026-05-14",
    deadline: "2026-06-14",
    featured: false,
    source: "Indeed",
    applicants: 203,
  },
  {
    id: "5",
    title: "Senior Frontend Engineer",
    company: "Microsoft",
    companyInitial: "MS",
    companyColor: "#00A4EF",
    location: "Remote (Worldwide)",
    type: "Remote",
    category: "Engineering",
    salaryMin: 7000,
    salaryMax: 12000,
    salaryCurrency: "USD",
    description:
      "Join the team building Microsoft 365 — productivity tools used by 400M+ people. Work on cutting-edge React applications with a focus on performance and accessibility.",
    requirements: [
      "5+ years of frontend engineering",
      "Expert-level React and TypeScript",
      "Deep understanding of web performance",
      "Experience with accessibility standards (WCAG)",
    ],
    responsibilities: [
      "Build performant React components at scale",
      "Lead frontend architecture decisions",
      "Drive accessibility improvements",
      "Mentor team members",
    ],
    postedAt: "2026-05-13",
    deadline: "2026-06-30",
    featured: false,
    source: "LinkedIn",
    applicants: 876,
  },
  {
    id: "6",
    title: "Digital Marketing Manager",
    company: "Chaldal",
    companyInitial: "Ch",
    companyColor: "#6DC04B",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    category: "Marketing",
    salaryMin: 70000,
    salaryMax: 110000,
    salaryCurrency: "BDT",
    description:
      "Lead digital growth for Bangladesh's #1 online grocery platform. Own our SEO, paid acquisition, and social media strategy to drive customer acquisition and retention.",
    requirements: [
      "4+ years of digital marketing experience",
      "Google Ads and Meta Ads expertise",
      "Strong analytical skills with GA4",
      "E-commerce marketing experience preferred",
    ],
    responsibilities: [
      "Plan and execute digital marketing campaigns",
      "Manage ৳50L+ monthly ad budget",
      "Drive SEO and content strategy",
      "Report on KPIs and optimize performance",
    ],
    postedAt: "2026-05-13",
    deadline: "2026-06-05",
    featured: false,
    source: "Bdjobs",
    applicants: 67,
  },
  {
    id: "7",
    title: "Product Manager",
    company: "SSLCOMMERZ",
    companyInitial: "SS",
    companyColor: "#1B4F9B",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    category: "Product",
    salaryMin: 110000,
    salaryMax: 160000,
    salaryCurrency: "BDT",
    description:
      "Define the product roadmap for Bangladesh's largest payment gateway processing billions in transactions. Work closely with engineering, design, and business teams.",
    requirements: [
      "4+ years of product management",
      "Experience with fintech or payments",
      "Strong data analysis skills",
      "Excellent stakeholder management",
    ],
    responsibilities: [
      "Own product roadmap and vision",
      "Write detailed product specifications",
      "Run sprint planning and retrospectives",
      "Drive cross-functional alignment",
    ],
    postedAt: "2026-05-12",
    deadline: "2026-06-12",
    featured: true,
    source: "LinkedIn",
    applicants: 118,
  },
  {
    id: "8",
    title: "Machine Learning Engineer",
    company: "Meta",
    companyInitial: "Me",
    companyColor: "#0866FF",
    location: "Remote (Asia Pacific)",
    type: "Remote",
    category: "Engineering",
    salaryMin: 10000,
    salaryMax: 18000,
    salaryCurrency: "USD",
    description:
      "Build AI systems that power Instagram Reels, Feed ranking, and ad targeting for 3 billion users. Work at the cutting edge of applied ML research and production systems.",
    requirements: [
      "MS/PhD in ML, AI, or related field",
      "5+ years of ML engineering experience",
      "Expert in PyTorch or TensorFlow",
      "Experience with large-scale ML systems",
    ],
    responsibilities: [
      "Train and deploy large-scale ML models",
      "Improve ranking and recommendation systems",
      "Collaborate with research scientists",
      "Own model quality and production reliability",
    ],
    postedAt: "2026-05-12",
    deadline: "2026-07-12",
    featured: false,
    source: "Glassdoor",
    applicants: 2100,
  },
  {
    id: "9",
    title: "DevOps Engineer",
    company: "ShajGoj",
    companyInitial: "SG",
    companyColor: "#C8336A",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    category: "Engineering",
    salaryMin: 85000,
    salaryMax: 130000,
    salaryCurrency: "BDT",
    description:
      "Build and maintain cloud infrastructure for Bangladesh's #1 beauty and lifestyle platform. Own CI/CD pipelines, monitoring, and reliability engineering.",
    requirements: [
      "3+ years of DevOps/SRE experience",
      "AWS or GCP expertise",
      "Kubernetes and Terraform proficiency",
      "Experience with monitoring tools (Datadog, Grafana)",
    ],
    responsibilities: [
      "Manage cloud infrastructure on AWS",
      "Build and optimize CI/CD pipelines",
      "Improve system reliability and uptime",
      "Implement security best practices",
    ],
    postedAt: "2026-05-11",
    deadline: "2026-06-11",
    featured: false,
    source: "Indeed",
    applicants: 45,
  },
  {
    id: "10",
    title: "Financial Analyst",
    company: "Dutch-Bangla Bank",
    companyInitial: "DB",
    companyColor: "#C41E3A",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    category: "Finance",
    salaryMin: 90000,
    salaryMax: 140000,
    salaryCurrency: "BDT",
    description:
      "Analyze financial performance and support strategic decision-making at one of Bangladesh's top private banks. Drive insights from complex financial datasets.",
    requirements: [
      "MBA Finance or CFA preferred",
      "5+ years of financial analysis experience",
      "Advanced Excel and financial modeling",
      "Knowledge of Bangladesh banking regulations",
    ],
    responsibilities: [
      "Prepare monthly financial reports",
      "Build financial models and forecasts",
      "Analyze investment opportunities",
      "Present findings to senior management",
    ],
    postedAt: "2026-05-10",
    deadline: "2026-06-10",
    featured: false,
    source: "Bdjobs",
    applicants: 93,
  },
  {
    id: "11",
    title: "Android Developer",
    company: "Shohoz",
    companyInitial: "Sh",
    companyColor: "#FF6B35",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    category: "Engineering",
    salaryMin: 75000,
    salaryMax: 120000,
    salaryCurrency: "BDT",
    description:
      "Build the next generation of Shohoz's transport and ticketing app used by millions of Bangladeshis for bus, launch, and event tickets.",
    requirements: [
      "3+ years of Android development",
      "Expert in Kotlin and Jetpack Compose",
      "Experience with MVVM architecture",
      "Strong understanding of Android performance",
    ],
    responsibilities: [
      "Develop new Android app features",
      "Optimize app performance and battery usage",
      "Write unit and integration tests",
      "Review code from team members",
    ],
    postedAt: "2026-05-10",
    deadline: "2026-06-01",
    featured: false,
    source: "LinkedIn",
    applicants: 76,
  },
  {
    id: "12",
    title: "Sales Manager, Enterprise",
    company: "Robi Axiata",
    companyInitial: "Ro",
    companyColor: "#E0001B",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    category: "Sales",
    salaryMin: 100000,
    salaryMax: 150000,
    salaryCurrency: "BDT",
    description:
      "Drive enterprise B2B sales for Robi's digital solutions including IoT, cloud, and connectivity products. Own a portfolio of Fortune 500 and local enterprise accounts.",
    requirements: [
      "5+ years of B2B sales experience",
      "Track record of exceeding sales targets",
      "Experience selling technology solutions",
      "Strong negotiation and presentation skills",
    ],
    responsibilities: [
      "Manage enterprise client relationships",
      "Achieve quarterly revenue targets",
      "Build sales pipeline from outbound and inbound",
      "Negotiate and close large contracts",
    ],
    postedAt: "2026-05-09",
    deadline: "2026-05-31",
    featured: false,
    source: "Glassdoor",
    applicants: 54,
  },
  {
    id: "13",
    title: "iOS Developer",
    company: "Nagad",
    companyInitial: "Na",
    companyColor: "#F7941D",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    category: "Engineering",
    salaryMin: 80000,
    salaryMax: 130000,
    salaryCurrency: "BDT",
    description:
      "Build beautiful, performant iOS experiences for Nagad's mobile financial app serving 70M+ users. Help shape the future of digital payments in Bangladesh.",
    requirements: [
      "3+ years of iOS development",
      "Expert in Swift and SwiftUI",
      "Experience with payment SDKs",
      "Strong understanding of Apple HIG",
    ],
    responsibilities: [
      "Develop new iOS features end-to-end",
      "Ensure app stability and performance",
      "Work closely with design on implementation",
      "Participate in code reviews",
    ],
    postedAt: "2026-05-08",
    deadline: "2026-05-30",
    featured: false,
    source: "Indeed",
    applicants: 61,
  },
  {
    id: "14",
    title: "Content Strategy Lead",
    company: "10 Minute School",
    companyInitial: "10",
    companyColor: "#7B2D8B",
    location: "Remote",
    type: "Remote",
    category: "Marketing",
    salaryMin: 60000,
    salaryMax: 90000,
    salaryCurrency: "BDT",
    description:
      "Lead content strategy for Bangladesh's largest ed-tech platform with 7M+ learners. Own our YouTube, blog, and social content to drive organic growth and engagement.",
    requirements: [
      "4+ years of content marketing experience",
      "Excellent Bangla and English writing skills",
      "YouTube and SEO expertise",
      "Education sector experience preferred",
    ],
    responsibilities: [
      "Define and execute content strategy",
      "Manage a team of content creators",
      "Oversee YouTube channel (5M+ subscribers)",
      "Measure and optimize content performance",
    ],
    postedAt: "2026-05-07",
    deadline: "2026-05-28",
    featured: false,
    source: "LinkedIn",
    applicants: 38,
  },
  {
    id: "15",
    title: "Software Engineer Intern",
    company: "Brain Station 23",
    companyInitial: "BS",
    companyColor: "#2563EB",
    location: "Dhaka, Bangladesh",
    type: "Internship",
    category: "Engineering",
    salaryMin: 15000,
    salaryMax: 20000,
    salaryCurrency: "BDT",
    description:
      "Kickstart your tech career at Bangladesh's leading software development company. Work on real projects for international clients across fintech, healthtech, and e-commerce.",
    requirements: [
      "Currently enrolled in CSE or related program",
      "Knowledge of at least one programming language",
      "Eagerness to learn and grow",
      "Good communication skills",
    ],
    responsibilities: [
      "Assist senior developers on client projects",
      "Fix bugs and write unit tests",
      "Participate in agile ceremonies",
      "Learn and apply best practices",
    ],
    postedAt: "2026-05-06",
    deadline: "2026-05-25",
    featured: false,
    source: "Bdjobs",
    applicants: 312,
  },
];

export function getJobs(filters?: {
  search?: string;
  category?: string;
  type?: string;
  location?: string;
}): Job[] {
  let result = [...JOBS];

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.description.toLowerCase().includes(q)
    );
  }

  if (filters?.category) {
    result = result.filter((j) => j.category === filters.category);
  }

  if (filters?.type) {
    result = result.filter((j) => j.type === filters.type);
  }

  if (filters?.location) {
    const loc = filters.location.toLowerCase();
    result = result.filter((j) => j.location.toLowerCase().includes(loc));
  }

  return result;
}

export function getJobById(id: string): Job | undefined {
  return JOBS.find((j) => j.id === id);
}

export function formatSalary(job: Job): string {
  const fmt = (n: number) =>
    job.salaryCurrency === "BDT"
      ? `৳${(n / 1000).toFixed(0)}k`
      : `$${(n / 1000).toFixed(0)}k`;
  return `${fmt(job.salaryMin)} – ${fmt(job.salaryMax)}`;
}

export function timeAgo(dateStr: string): string {
  const diff = Math.floor(
    (new Date().getTime() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diff === 0) return "Today";
  if (diff === 1) return "1 day ago";
  return `${diff} days ago`;
}
