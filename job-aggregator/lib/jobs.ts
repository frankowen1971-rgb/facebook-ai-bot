export type JobType = "Full-time" | "Part-time" | "Remote" | "Contract" | "Internship";

export type Job = {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: JobType;
  category: string;
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  postedAt: string;
  deadline: string;
  featured: boolean;
  source: string;
  sourceUrl: string;
};

export const JOB_CATEGORIES = [
  "All",
  "Engineering",
  "Design",
  "Marketing",
  "Finance",
  "Healthcare",
  "Education",
  "Sales",
  "Data Science",
  "Product",
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
    title: "Senior React Developer",
    company: "TechBD Ltd.",
    companyLogo: "T",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    category: "Engineering",
    salary: "৳80,000 - ৳1,20,000/মাস",
    description:
      "আমরা একজন অভিজ্ঞ React Developer খুঁজছি যিনি আমাদের প্রোডাক্ট টিমে যোগ দেবেন এবং উচ্চমানের ওয়েব অ্যাপ্লিকেশন তৈরি করবেন।",
    requirements: [
      "React.js-এ ৩+ বছরের অভিজ্ঞতা",
      "TypeScript সম্পর্কে গভীর জ্ঞান",
      "Next.js, Redux জানা আবশ্যক",
      "REST API ও GraphQL-এর অভিজ্ঞতা",
      "Git ও Agile পদ্ধতিতে কাজের অভিজ্ঞতা",
    ],
    responsibilities: [
      "ফ্রন্টএন্ড আর্কিটেকচার ডিজাইন ও বাস্তবায়ন",
      "কোড রিভিউ এবং মেন্টরিং",
      "পারফরম্যান্স অপ্টিমাইজেশন",
      "প্রোডাক্ট টিমের সাথে সহযোগিতা",
    ],
    postedAt: "2026-05-15",
    deadline: "2026-06-15",
    featured: true,
    source: "LinkedIn",
    sourceUrl: "#",
  },
  {
    id: "2",
    title: "UI/UX Designer",
    company: "Creative Studio",
    companyLogo: "C",
    location: "Chittagong, Bangladesh",
    type: "Full-time",
    category: "Design",
    salary: "৳50,000 - ৳80,000/মাস",
    description:
      "Creative Studio-তে একজন প্রতিভাবান UI/UX Designer প্রয়োজন যিনি ব্যবহারকারীর অভিজ্ঞতা উন্নত করতে উদ্ভাবনী ডিজাইন তৈরি করতে পারবেন।",
    requirements: [
      "Figma, Adobe XD-তে দক্ষতা",
      "২+ বছরের UI/UX ডিজাইন অভিজ্ঞতা",
      "User Research ও Usability Testing জ্ঞান",
      "প্রোটোটাইপিং দক্ষতা",
    ],
    responsibilities: [
      "ওয়্যারফ্রেম ও প্রোটোটাইপ তৈরি",
      "ব্যবহারকারী গবেষণা পরিচালনা",
      "ডিজাইন সিস্টেম বজায় রাখা",
      "ডেভেলপারদের সাথে হ্যান্ডঅফ",
    ],
    postedAt: "2026-05-14",
    deadline: "2026-06-10",
    featured: true,
    source: "Bdjobs",
    sourceUrl: "#",
  },
  {
    id: "3",
    title: "Digital Marketing Manager",
    company: "GrowthHack BD",
    companyLogo: "G",
    location: "Remote",
    type: "Remote",
    category: "Marketing",
    salary: "৳60,000 - ৳90,000/মাস",
    description:
      "একজন দক্ষ Digital Marketing Manager দরকার যিনি আমাদের অনলাইন উপস্থিতি বাড়াতে এবং ROI উন্নত করতে কৌশল তৈরি করবেন।",
    requirements: [
      "SEO, SEM ও Social Media Marketing-এ অভিজ্ঞতা",
      "Google Analytics, Ads সার্টিফিকেশন",
      "কন্টেন্ট মার্কেটিং জ্ঞান",
      "ডেটা বিশ্লেষণ দক্ষতা",
    ],
    responsibilities: [
      "ডিজিটাল মার্কেটিং কৌশল পরিকল্পনা",
      "ক্যাম্পেইন পরিচালনা ও অপ্টিমাইজেশন",
      "KPI ট্র্যাকিং ও রিপোর্টিং",
      "টিম ম্যানেজমেন্ট",
    ],
    postedAt: "2026-05-13",
    deadline: "2026-06-05",
    featured: false,
    source: "Indeed",
    sourceUrl: "#",
  },
  {
    id: "4",
    title: "Data Scientist",
    company: "DataMind Analytics",
    companyLogo: "D",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    category: "Data Science",
    salary: "৳1,00,000 - ৳1,50,000/মাস",
    description:
      "আমরা একজন Machine Learning বিশেষজ্ঞ Data Scientist খুঁজছি যিনি বড় ডেটাসেট বিশ্লেষণ করে ব্যবসায়িক সিদ্ধান্ত গ্রহণে সহায়তা করবেন।",
    requirements: [
      "Python, R-এ দক্ষতা",
      "Machine Learning ফ্রেমওয়ার্ক (TensorFlow, PyTorch)",
      "SQL ও NoSQL ডেটাবেস জ্ঞান",
      "পরিসংখ্যান ও গণিতে শক্তিশালী ভিত্তি",
    ],
    responsibilities: [
      "ডেটা মডেল তৈরি ও প্রশিক্ষণ",
      "ডেটা ভিজ্যুয়ালাইজেশন",
      "ব্যবসায়িক সমস্যার ML সমাধান",
      "A/B টেস্টিং পরিচালনা",
    ],
    postedAt: "2026-05-12",
    deadline: "2026-06-12",
    featured: true,
    source: "LinkedIn",
    sourceUrl: "#",
  },
  {
    id: "5",
    title: "Product Manager",
    company: "StartupBD Inc.",
    companyLogo: "S",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    category: "Product",
    salary: "৳90,000 - ৳1,30,000/মাস",
    description:
      "একজন অভিজ্ঞ Product Manager দরকার যিনি প্রোডাক্ট ভিশন নির্ধারণ করবেন এবং ক্রস-ফাংশনাল টিমকে নেতৃত্ব দেবেন।",
    requirements: [
      "৩+ বছরের প্রোডাক্ট ম্যানেজমেন্ট অভিজ্ঞতা",
      "Agile/Scrum পদ্ধতিতে দক্ষতা",
      "ডেটা-চালিত সিদ্ধান্ত গ্রহণের ক্ষমতা",
      "চমৎকার যোগাযোগ দক্ষতা",
    ],
    responsibilities: [
      "প্রোডাক্ট রোডম্যাপ তৈরি",
      "স্টেকহোল্ডার ম্যানেজমেন্ট",
      "ব্যবহারকারীর চাহিদা গবেষণা",
      "স্প্রিন্ট পরিকল্পনা ও পর্যালোচনা",
    ],
    postedAt: "2026-05-11",
    deadline: "2026-06-08",
    featured: false,
    source: "Glassdoor",
    sourceUrl: "#",
  },
  {
    id: "6",
    title: "Node.js Backend Developer",
    company: "FinTech Solutions",
    companyLogo: "F",
    location: "Remote",
    type: "Remote",
    category: "Engineering",
    salary: "৳70,000 - ৳1,10,000/মাস",
    description:
      "FinTech Solutions-এ একজন দক্ষ Backend Developer দরকার যিনি স্কেলেবল API এবং মাইক্রোসার্ভিস আর্কিটেকচার তৈরি করবেন।",
    requirements: [
      "Node.js ও Express.js-এ ৩+ বছরের অভিজ্ঞতা",
      "PostgreSQL, MongoDB জ্ঞান",
      "Docker, Kubernetes অভিজ্ঞতা",
      "AWS বা Azure ক্লাউড সেবা",
    ],
    responsibilities: [
      "RESTful ও GraphQL API ডিজাইন",
      "ডেটাবেস স্কিমা অপ্টিমাইজেশন",
      "সিকিউরিটি বাস্তবায়ন",
      "পারফরম্যান্স মনিটরিং",
    ],
    postedAt: "2026-05-10",
    deadline: "2026-06-01",
    featured: false,
    source: "Bdjobs",
    sourceUrl: "#",
  },
  {
    id: "7",
    title: "Healthcare Data Analyst",
    company: "HealthCare BD",
    companyLogo: "H",
    location: "Sylhet, Bangladesh",
    type: "Full-time",
    category: "Healthcare",
    salary: "৳45,000 - ৳65,000/মাস",
    description:
      "হাসপাতাল ডেটা বিশ্লেষণ করে স্বাস্থ্যসেবার মান উন্নত করতে একজন ডেটা অ্যানালিস্ট প্রয়োজন।",
    requirements: [
      "স্বাস্থ্যসেবা ডোমেইন জ্ঞান",
      "Excel, Power BI দক্ষতা",
      "SQL জ্ঞান",
      "পরিসংখ্যান বিশ্লেষণ ক্ষমতা",
    ],
    responsibilities: [
      "রোগীর ডেটা বিশ্লেষণ",
      "রিপোর্ট তৈরি ও উপস্থাপনা",
      "KPI ড্যাশবোর্ড রক্ষণাবেক্ষণ",
      "ডেটা কোয়ালিটি নিশ্চিতকরণ",
    ],
    postedAt: "2026-05-09",
    deadline: "2026-05-30",
    featured: false,
    source: "Indeed",
    sourceUrl: "#",
  },
  {
    id: "8",
    title: "Python Developer (Part-time)",
    company: "AI Innovations",
    companyLogo: "A",
    location: "Remote",
    type: "Part-time",
    category: "Engineering",
    salary: "৳30,000 - ৳50,000/মাস",
    description:
      "AI প্রজেক্টে কাজ করার জন্য পার্টটাইম Python Developer প্রয়োজন। ফ্লেক্সিবল কাজের সময়সূচি।",
    requirements: [
      "Python-এ ২+ বছরের অভিজ্ঞতা",
      "FastAPI বা Django জ্ঞান",
      "ML লাইব্রেরি (NumPy, Pandas) দক্ষতা",
      "সপ্তাহে ২০ ঘণ্টা কাজের প্রাপ্যতা",
    ],
    responsibilities: [
      "Python স্ক্রিপ্ট ও API ডেভেলপমেন্ট",
      "ডেটা প্রসেসিং পাইপলাইন তৈরি",
      "AI মডেল ইন্টিগ্রেশন",
      "ডকুমেন্টেশন রক্ষণাবেক্ষণ",
    ],
    postedAt: "2026-05-08",
    deadline: "2026-05-25",
    featured: false,
    source: "LinkedIn",
    sourceUrl: "#",
  },
  {
    id: "9",
    title: "Sales Executive",
    company: "Commerce BD",
    companyLogo: "C",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    category: "Sales",
    salary: "৳35,000 - ৳60,000/মাস + কমিশন",
    description:
      "উদ্যমী Sales Executive দরকার যিনি নতুন ক্লায়েন্ট অর্জন এবং বিদ্যমান সম্পর্ক রক্ষণাবেক্ষণ করতে পারবেন।",
    requirements: [
      "সেলসে ২+ বছরের অভিজ্ঞতা",
      "চমৎকার আলোচনা দক্ষতা",
      "CRM সফটওয়্যার ব্যবহারের অভিজ্ঞতা",
      "টার্গেট অর্জনের ট্র্যাক রেকর্ড",
    ],
    responsibilities: [
      "লিড জেনারেশন ও কনভার্সন",
      "ক্লায়েন্ট সম্পর্ক ব্যবস্থাপনা",
      "বিক্রয় লক্ষ্যমাত্রা অর্জন",
      "বাজার গবেষণা",
    ],
    postedAt: "2026-05-07",
    deadline: "2026-05-28",
    featured: false,
    source: "Bdjobs",
    sourceUrl: "#",
  },
  {
    id: "10",
    title: "Software Intern",
    company: "NextGen Tech",
    companyLogo: "N",
    location: "Dhaka, Bangladesh",
    type: "Internship",
    category: "Engineering",
    salary: "৳10,000 - ৳15,000/মাস",
    description:
      "ফ্রেশ গ্র্যাজুয়েটদের জন্য চমৎকার সুযোগ। হাতে-কলমে শেখার পাশাপাশি বাস্তব প্রজেক্টে কাজ করার সুযোগ।",
    requirements: [
      "CSE বা সংশ্লিষ্ট বিষয়ে স্নাতক/স্নাতকোত্তর",
      "প্রোগ্রামিং ভাষায় মৌলিক জ্ঞান",
      "শেখার আগ্রহ ও উৎসাহ",
      "টিম প্লেয়ার মনোভাব",
    ],
    responsibilities: [
      "সিনিয়র ডেভেলপারদের সহায়তা",
      "বাগ ফিক্সিং",
      "ডকুমেন্টেশন লেখা",
      "কোড টেস্টিং",
    ],
    postedAt: "2026-05-06",
    deadline: "2026-05-20",
    featured: false,
    source: "Glassdoor",
    sourceUrl: "#",
  },
  {
    id: "11",
    title: "Finance Manager",
    company: "BankAsia Group",
    companyLogo: "B",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    category: "Finance",
    salary: "৳1,10,000 - ৳1,60,000/মাস",
    description:
      "অভিজ্ঞ Finance Manager প্রয়োজন যিনি আর্থিক পরিকল্পনা, বিশ্লেষণ এবং রিপোর্টিং পরিচালনা করবেন।",
    requirements: [
      "CPA বা CFA সার্টিফিকেশন",
      "৫+ বছরের আর্থিক ব্যবস্থাপনা অভিজ্ঞতা",
      "ERP সিস্টেম জ্ঞান",
      "বাংলাদেশের আর্থিক আইন সম্পর্কে জ্ঞান",
    ],
    responsibilities: [
      "বার্ষিক বাজেট প্রণয়ন",
      "আর্থিক বিবৃতি প্রস্তুতি",
      "ট্যাক্স পরিকল্পনা ও কমপ্লায়েন্স",
      "ঝুঁকি ব্যবস্থাপনা",
    ],
    postedAt: "2026-05-05",
    deadline: "2026-06-05",
    featured: true,
    source: "LinkedIn",
    sourceUrl: "#",
  },
  {
    id: "12",
    title: "Content Writer (Bangla)",
    company: "MediaBD",
    companyLogo: "M",
    location: "Remote",
    type: "Contract",
    category: "Marketing",
    salary: "৳500-৳1000/আর্টিকেল",
    description:
      "বাংলা ভাষায় দক্ষ Content Writer দরকার যিনি SEO-বান্ধব আর্টিকেল, ব্লগ পোস্ট এবং সোশ্যাল মিডিয়া কন্টেন্ট লিখতে পারবেন।",
    requirements: [
      "বাংলায় চমৎকার লেখার দক্ষতা",
      "SEO বেসিক জ্ঞান",
      "কন্টেন্ট মার্কেটিং বোঝার ক্ষমতা",
      "সময়মতো ডেলিভারি দেওয়ার ক্ষমতা",
    ],
    responsibilities: [
      "SEO আর্টিকেল লেখা",
      "সোশ্যাল মিডিয়া পোস্ট তৈরি",
      "কীওয়ার্ড রিসার্চ",
      "কন্টেন্ট ক্যালেন্ডার অনুসরণ",
    ],
    postedAt: "2026-05-04",
    deadline: "2026-05-25",
    featured: false,
    source: "Indeed",
    sourceUrl: "#",
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

  if (filters?.category && filters.category !== "All") {
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

export function getFeaturedJobs(): Job[] {
  return JOBS.filter((j) => j.featured);
}
