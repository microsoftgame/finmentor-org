export const navigationItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Our People", href: "/leadership" },
  { label: "FinMentor App", href: "/app" },
] as const

export const homeStats = [
  { value: "10+", label: "Programs Delivered", tone: "text-blue-600", surface: "bg-white", offset: false },
  { value: "300+", label: "Students Reached", tone: "text-amber-500", surface: "bg-white", offset: false },
  { value: "100+", label: "Volunteers Engaged", tone: "text-emerald-600", surface: "bg-white", offset: true },
  { value: "1000+", label: "Community Service Hours", tone: "text-slate-900", surface: "bg-white", offset: false },
] as const

export const initiativeCards = [
  {
    image: "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/finmentor/programs/money-smart-course-1.jpg",
    tag: "CURRICULUM",
    title: "Money Smart Financial Literacy Program",
    description:
      "Practical financial education that helps high school students build essential skills in budgeting, saving, credit, and responsible money management.",
    href: "/programs",
  },
  {
    image: "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/finmentor/programs/international-volunteer.jpg",
    tag: "LEADERSHIP",
    title: "International Volunteer — Exploring China",
    description:
      "Students supported a cross-cultural campus event while gaining practical experience in teamwork, communication, and community service.",
    href: "/programs",
  },
  {
    image: "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/finmentor/programs/from-passion-to-excellence.jpg",
    tag: "COMMUNITY",
    title: "From Passion to Excellence",
    description:
      "An interactive workshop helping students explore interests, develop practical skills, and discover pathways for personal and academic growth.",
    href: "/programs",
  },
] as const

export const appFeatureList = [
  "Register for Courses and Events",
  "Real-time Volunteer Hour Tracking",
  "Verified Digital Certificates",
] as const

export const journeySteps = [
  {
    year: "Mid 2023",
    title: "The Idea Behind FinMentor",
    description:
      "While attending AAUW's National Conference for College Women Student Leaders, FinMentor's founders joined a financial literacy panel sponsored by the FDIC and FINRA. The experience inspired their vision to make practical financial education more accessible to students, families, and underserved communities.",
  },
  {
    year: "Early 2024",
    title: "Money Smart Program Launch",
    description:
      "FinMentor launched its first Money Smart financial literacy series, introducing structured courses on budgeting, saving, credit, consumer protection, and responsible money management for students and families.",
  },
  {
    year: "August 2024",
    title: "Recognition in FDIC Money Smart News",
    description:
      "FinMentor's educational initiatives were featured in FDIC Money Smart News, recognizing the organization's commitment to advancing youth financial literacy and community education.",
  },
  {
    year: "Late 2024",
    title: "Expansion into Community Education",
    description:
      "Building on the Money Smart curriculum, FinMentor expanded its outreach through community workshops covering financial safety, fraud prevention, and consumer protection, reaching more students and families throughout Orange County.",
  },
  {
    year: "Spring 2025",
    title: "Growth in Youth Leadership",
    description:
      "FinMentor encouraged students to turn ideas into action by participating in entrepreneurship competitions, leading workshops on starting school clubs, and promoting leadership through community engagement.",
  },
  {
    year: "Fall 2025",
    title: "College and Career Readiness Programs",
    description:
      "New seminars connected financial education with academic and career planning, featuring topics such as choosing between public and private schools, college preparation, and future career pathways through student-led discussions and expert insights.",
  },
  {
    year: "Early 2026",
    title: "Digital Finance Education",
    description:
      "FinMentor introduced programs exploring cryptocurrency, digital finance, and emerging financial technologies, helping students understand both the opportunities and risks of an evolving financial landscape.",
  },
  {
    year: "Spring 2026",
    title: "Expansion into Personal Development",
    description:
      "FinMentor expanded beyond financial literacy by offering personal development workshops that encouraged students to discover their interests, develop their strengths, and prepare for future academic and career success.",
  },
  {
    year: "May 2026",
    title: "Visit to FDIC Headquarters",
    description:
      "As a member of the FDIC Money Smart Alliance, FinMentor was invited to visit FDIC Headquarters, connect with financial education professionals, and explore new opportunities to expand its community financial literacy initiatives.",
  },
] as const

export const missionValues = [
  {
    title: "Mission",
    description:
      "To make financial education accessible and practical, empowering students and families to make informed financial decisions throughout their lives.",
    accent: "text-blue-400",
  },
  {
    title: "Vision",
    description:
      "A world where every young person has the knowledge, skills, and confidence to achieve financial independence and contribute to stronger communities.",
    accent: "text-emerald-400",
  },
  {
    title: "Values",
    description:
      "We are guided by five core values: accessibility, integrity, community partnership, continuous learning, and youth leadership.",
    accent: "text-amber-300",
  },
] as const

export const financialLiteracyFacts = [
  "Many U.S. states still do not require a standalone financial literacy course for high school graduation.",
  "Many college graduates leave school with more than $30,000 in student loan debt.",
  "66% of Americans cannot pass a basic financial literacy test.",
] as const

export const trustHighlights = [
  { title: "Registered U.S. Nonprofit", description: "Registered as a 501(c)(3) tax-exempt nonprofit." },
  { title: "Educational Mission", description: "Focused on advancing financial literacy and youth development." },
  { title: "Community-Rooted Programs", description: "Built with students and shaped by real community needs." },
  { title: "Community-First Model", description: "All public programs are offered free of charge to participants." },
] as const

export const leadershipSnapshot = [
  {
    title: "Meet Our People",
    description:
      "Meet the people who bring FinMentor's mission to life through leadership, education, collaboration, and community service.",
    ctaLabel: "Meet Our People",
    href: "/leadership",
  },
] as const

export const programs = [
  {
    tag: "CURRICULUM",
    title: "Money Smart Financial Literacy Program",
    slug: "money-smart-course-1",
    summary: "An introductory financial literacy course focused on practical money skills for high school students.",
    bullets: [
      "Financial Decision-Making",
      "Spending Awareness",
      "Saving Strategies",
      "Responsible Money Habits",
    ],
    audience: "High School Students (Grades 9–12)",
    image: "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/finmentor/programs/money-smart-course-1.jpg",
    alt: "Students in a classroom learning financial literacy",
    cta: "Learn More",
    accent: "bg-blue-500",
    hasCustomDetail: true,
  },
  {
    tag: "LEADERSHIP",
    title: "International Volunteer — Exploring China",
    slug: "international-volunteer",
    summary: "Students supported a cross-cultural campus event while gaining practical experience in teamwork, communication, and community service.",
    bullets: [
      "Event Support",
      "Team Collaboration",
      "Cross-Cultural Communication",
      "Community Service",
    ],
    audience: "High School & College Students",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    alt: "Student volunteers collaborating at Saddleback College",
    cta: "Learn More",
    accent: "bg-amber-500",
    hasCustomDetail: false,
  },
  {
    tag: "COMMUNITY",
    title: "From Passion to Excellence",
    slug: "from-passion-to-excellence",
    summary: "An interactive workshop helping students explore interests, develop practical skills, and discover pathways for personal and academic growth.",
    bullets: [
      "Self-Discovery",
      "Goal Setting",
      "Career Exploration",
      "Leadership & Communication",
    ],
    audience: "Middle & High School Students",
    image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=1200&auto=format&fit=crop",
    alt: "Student panel discussion workshop",
    cta: "Learn More",
    accent: "bg-emerald-500",
    hasCustomDetail: false,
  },
] as const

export const upcomingEvents = [
  {
    title: "Financial Literacy Workshop",
    date: "April 15, 2024",
    location: "Saddleback College",
    type: "Workshop",
  },
  {
    title: "Student Leadership Training",
    date: "April 22, 2024",
    location: "Virtual",
    type: "Training",
  },
  {
    title: "Community Finance Q&A",
    date: "May 1, 2024",
    location: "Orange Public Library",
    type: "Community Event",
  },
] as const

export const programImpactBullets = [
  "Students build financial knowledge, confidence, and practical money skills.",
  "Volunteers develop leadership, communication, and community service experience.",
  "Families and communities benefit from financial education that creates lasting impact.",
] as const

export const featuredStory = {
  image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
  tag: "Featured Story",
  category: "Program Update",
  date: "March 15, 2024",
  title: "Q1 2024: A Quarter of Growth and Impact",
  description:
    "This quarter marked significant milestones in our mission to bring financial literacy to every corner of our community.",
} as const

export const newsUpdates = [
  {
    image: "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/finmentor/updates/public-or-private-school.jpg",
    category: "WORKSHOP",
    date: "November 16, 2025",
    title: "Public or Private School Student Panel Held",
    excerpt:
      "A student panel exploring academic experiences, extracurricular involvement, and everyday life in public and private high schools.",
  },
  {
    image: "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/finmentor/updates/money-smart-session-2.jpg",
    category: "PROGRAM",
    date: "October 6, 2024",
    title: "Money Smart Financial Literacy Course — Session 2",
    excerpt:
      "Students participated in Session 2 of FinMentor's Money Smart Financial Literacy Course, learning practical financial concepts through interactive classroom activities.",
  },
  {
    image: "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/finmentor/updates/money-smart-session-3.jpg",
    category: "PROGRAM",
    date: "April 17, 2025",
    title: "Money Smart Financial Literacy Course — Session 3",
    excerpt:
      "Session 3 continued FinMentor's Money Smart Financial Literacy Course with small-group, interactive instruction using the FDIC Money Smart curriculum.",
  },
  {
    image: "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/finmentor/updates/fdic-headquarters-visit.jpg",
    category: "VISIT",
    date: "May 29, 2026",
    title: "FDIC Headquarters Student Leadership Visit",
    excerpt:
      "Five FinMentor student leaders were invited to visit the FDIC Headquarters in Washington, D.C., gaining first-hand insights into financial regulation and public service careers.",
  },
  {
    image: "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/finmentor/updates/entrepreneurship-competition.jpg",
    category: "COMPETITION",
    date: "March 22, 2025",
    title: "FinMentor Students Excel at NextGen Entrepreneurs Competition",
    excerpt:
      "FinMentor students presented original business ideas at the 2025 NextGen Entrepreneurs Competition, earning second, joint third, and joint fourth place.",
  },
  {
    image: "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/finmentor/updates/college-career-beyond.jpg",
    category: "EVENT",
    date: "October 19, 2025",
    title: "College, Career, & Beyond",
    excerpt:
      "Students explored college planning, internship opportunities, workplace culture, and future career pathways through presentations from professionals.",
  },
  {
    image: "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/finmentor/updates/start-school-club.jpg",
    category: "EVENT",
    date: "January 19, 2025",
    title: "How to Start a School Club",
    excerpt:
      "A community workshop featuring student speakers and guest mentor Dr. Sofia Lee, sharing experiences on founding school clubs and developing leadership skills.",
  },
  {
    image: "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/finmentor/updates/digital-currencies-seminar.jpg",
    category: "WORKSHOP",
    date: "January 3, 2026",
    title: "Opportunities and Risks of Digital Currencies Seminar Held",
    excerpt:
      "Students explored the opportunities and risks of digital currencies through an expert presentation, real-world industry insights, and an interactive Q&A session.",
  },
  {
    image: "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/finmentor/updates/money-workshop.jpg",
    category: "WORKSHOP",
    date: "October 13, 2024",
    title: "Who Will Look After Your Money",
    excerpt:
      "Students and families explored practical financial literacy concepts while hearing Steven share his journey of overcoming challenges and pursuing academic goals at UCLA.",
  },
  {
    image: "https://res.cloudinary.com/mzpdswax/image/upload/v1785112277/finmentor/updates/tesoro-high-school-club.png",
    category: "CLUB",
    date: "September, 2024",
    title: "FinMentor Club Launch at Tesoro High School",
    excerpt:
      "A student-led club expanding practical financial education at Tesoro High School.",
  },
  {
    image: "https://res.cloudinary.com/mzpdswax/image/upload/v1785112279/finmentor/updates/sparkhub-competition.png",
    category: "COMPETITION",
    date: "March, 2025",
    title: "First Place at the SparkHub Youth Entrepreneurial Competition",
    excerpt:
      "Michael and Nathan earned first place after developing and presenting their startup idea to a panel of entrepreneurs and industry professionals.",
  },
  {
    image: "https://res.cloudinary.com/mzpdswax/image/upload/v1785112281/finmentor/updates/where-journey-began.png",
    category: "MILESTONE",
    date: "June, 2023",
    title: "Where the FinMentor Journey Began",
    excerpt:
      "At AAUW's national conference, our founders attended an FDIC- and FINRA-supported financial literacy session that inspired the idea behind FinMentor.",
  },
] as const

export const impactStats = [
  { number: "50+", label: "Sessions Delivered" },
  { number: "2,000+", label: "Students Reached" },
  { number: "150+", label: "Volunteers Engaged" },
  { number: "5,000+", label: "Community Service Hours" },
] as const

export const impactStories = [
  {
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
    category: "Student Leadership",
    title: "From Participant to Leader",
    description:
      "One student's journey through our workshops led to a new role as a peer educator and community mentor.",
  },
  {
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
    category: "Community Impact",
    title: "Building Family Financial Security",
    description:
      "A family used lessons from our program to create their first emergency fund and build healthier habits.",
  },
  {
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop",
    category: "Partnership",
    title: "A Partnership That Expands Access",
    description:
      "Collaboration with educational partners is helping us deliver financial education to more learners every quarter.",
  },
] as const

export const featuredArticleSections = [
  {
    heading: "Program Expansion",
    body:
      "We launched our high school financial literacy curriculum in five new schools, reaching more than 300 additional students. Our volunteer network also grew to 150+ people who bring energy, empathy, and expertise into every session.",
  },
  {
    heading: "Community Impact",
    body:
      "Through workshops and family programs, we engaged hundreds of local residents who reported stronger confidence in budgeting, banking, and future planning.",
  },
  {
    heading: "Looking Ahead",
    body:
      "The next quarter brings plans for a deeper mobile experience, expansion into additional districts, and more leadership opportunities for student volunteers.",
  },
] as const

export const featuredQuickFacts = [
  { label: "Schools Reached", value: "12" },
  { label: "Students Engaged", value: "800+" },
  { label: "Volunteers", value: "150+" },
  { label: "Community Events", value: "25" },
] as const

export const leadershipWhyBullets = [
  "Practical experience in nonprofit management and program delivery.",
  "Mentorship from experienced professionals and adult advisors.",
  "Networking opportunities with educators and community leaders.",
  "Certificates and real outcomes that strengthen your portfolio.",
] as const

export const adultAdvisors = [
  {
    name: "Dr. James Wilson",
    role: "Financial Education Advisor",
    organization: "Former Banking Executive",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Maria Garcia",
    role: "Community Development Director",
    organization: "Orange County Non-Profit Alliance",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Robert Chen",
    role: "Education Program Manager",
    organization: "Saddleback College",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Sarah Thompson",
    role: "Youth Programs Coordinator",
    organization: "California Youth Services",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
  },
] as const

export const leadershipBenefits = [
  {
    title: "Leadership Experience",
    description: "Gain real-world leadership experience in a nonprofit setting.",
  },
  {
    title: "Skill Development",
    description: "Build communication, project management, and public speaking skills.",
  },
  {
    title: "Community Impact",
    description: "Create visible, meaningful change for students and families nearby.",
  },
  {
    title: "Resume Building",
    description: "Add credible mission-driven experience to your college or career story.",
  },
] as const

export const leadershipTracks = [
  {
    title: "Director of Community Engagement",
    description:
      "Lead outreach initiatives and build partnerships with local schools and community organizations.",
    responsibilities: ["Plan community events", "Manage partner relationships", "Coordinate volunteer activities"],
  },
  {
    title: "Director of Programs",
    description:
      "Oversee curriculum development and ensure program quality across all educational initiatives.",
    responsibilities: ["Develop lesson plans", "Train facilitators", "Evaluate program outcomes"],
  },
  {
    title: "Director of Marketing & Communications",
    description:
      "Manage brand identity, social media, and public-facing storytelling that amplifies our impact.",
    responsibilities: ["Create content", "Shape social strategy", "Support media outreach"],
  },
  {
    title: "Director of Partnerships",
    description:
      "Identify and cultivate relationships with sponsors, grants, and strategic supporters.",
    responsibilities: ["Grant writing", "Sponsor outreach", "Strategic planning"],
  },
  {
    title: "Director of Operations",
    description:
      "Handle day-to-day logistics, team coordination, and operational systems that keep programs moving.",
    responsibilities: ["Coordinate events", "Manage resources", "Schedule teams"],
  },
  {
    title: "Director of Student Outreach",
    description:
      "Focus on recruiting, onboarding, and supporting student volunteers and participants.",
    responsibilities: ["Recruit students", "Run orientations", "Coordinate peer support"],
  },
] as const

export const missionConnectionBullets = [
  "Teach financial literacy to peers and younger students.",
  "Develop and deliver educational content that is actually useful.",
  "Organize community events and workshops that broaden access.",
  "Build partnerships that help more families learn and participate.",
] as const

export const trustBullets = [
  {
    title: "IRS-recognized 501(c)(3) public charity",
    description: "Donations are tax-deductible to the full extent permitted by law.",
  },
  {
    title: "California nonprofit public benefit corporation",
    description: "Governed under California Corporations Code with an independent board of directors.",
  },
  {
    title: "Strictly educational mission",
    description:
      "Some courses and competition training programs carry fees to support program delivery. No student is turned away for inability to pay.",
  },
  {
    title: "Financial transparency",
    description:
      "Our annual Form 990 and program impact reports are available upon request. Write to contact@finmentors.org.",
  },
] as const

export const supportCards = [
  {
    title: "Community Programs",
    description: "Funding venue rentals, logistics, and outreach for free community workshops.",
  },
  {
    title: "Educational Materials",
    description: "Printing workbooks, planning guides, and developing digital curriculum assets.",
  },
  {
    title: "Volunteer Outreach",
    description: "Training costs and coordination software for our student volunteer network.",
  },
  {
    title: "Digital Access",
    description: "Maintaining our app platform and website to ensure accessible resources.",
  },
] as const

// -----------------------------------------------------------------------------
// Our People — final architecture per Our_People/…修改执行稿(1).docx
// Three sections in display order: executive → department → board.
// A single person can hold multiple roles (executive + department); we still
// render one card, primary title first, secondary titles below.
// -----------------------------------------------------------------------------

export type PersonSection = "executive" | "department" | "board"
export type PersonStatus = "active" | "on_leave" | "former" | "alumni"

export type PersonRecord = {
  personId: string
  slug: string
  name: string
  section: PersonSection // primarySection — determines which section renders the card
  sectionOrder: number   // executive=1, department=2, board=3
  profileOrder: number
  status: PersonStatus
  showOnWebsite: boolean
  primaryTitle: string   // highest-tier active role
  secondaryTitles?: readonly string[] // additional executive or department roles
  boardRole?: string     // formal board title (used only in board section)
  founderNote?: string   // e.g. "Founding member" (bio-only, not a formal role)
  school?: string
  bio: string            // 70–110 words for executive/department; 40–70 for board
  photo?: string
  photoAlt: string
  linkedin?: string
  // Extended profile fields — surfaced on the detail page only
  tagline?: string                       // one-line editorial pull-quote (≤14 words)
  extendedBio?: readonly string[]        // paragraphs expanded from the short bio; must stay within original meaning
  focusAreas?: readonly string[]         // 3–5 short chips describing scope of work
  programsLed?: readonly {
    name: string
    detail?: string
  }[]                                    // signature initiatives owned or co-led
  approach?: string                      // short 1–2 sentence philosophy/method note
  joinedYear?: string                    // e.g. "2023"
}

export const ourPeople: readonly PersonRecord[] = [
  // ============================================================================
  // EXECUTIVE LEADERSHIP (Core Team - 4 positions)
  // ============================================================================
  {
    personId: "michael-yang",
    slug: "michael-yang",
    name: "Michael Yang",
    section: "executive",
    sectionOrder: 1,
    profileOrder: 1,
    status: "active",
    showOnWebsite: true,
    primaryTitle: "Chief Executive Officer (CEO)",
    secondaryTitles: ["Director of Technology and Data Management"],
    school: undefined,
    tagline: "Leading FinMentor's mission to advance financial literacy through technology and strategic execution.",
    bio: "Michael Yang serves as Chief Executive Officer (CEO) and Director of Technology and Data Management at FinMentor. He provides organizational leadership, sets strategic direction, and oversees technology systems that support the organization's educational programs and community outreach.",
    extendedBio: [
      "Michael Yang serves as Chief Executive Officer (CEO) and Director of Technology and Data Management at FinMentor. In his executive role he leads organizational strategy, coordinates team efforts, and represents FinMentor to partners and the broader community.",
      "As Director of Technology and Data Management, he oversees the digital platforms and systems that enable program delivery, volunteer coordination, and educational resource management.",
    ],
    focusAreas: [
      "Executive Leadership",
      "Strategic Planning",
      "Technology Strategy",
      "Platform Development",
    ],
    programsLed: [
      {
        name: "Technology Infrastructure",
        detail: "Digital systems supporting program delivery and operations.",
      },
    ],
    approach: "Build sustainable systems that scale FinMentor's impact through practical technology and thoughtful leadership.",
    photo: "https://res.cloudinary.com/mzpdswax/image/upload/c_fill,w_300,h_400,f_auto,q_auto/finmentor/people/michael-yang.jpg",
    photoAlt: "Michael Yang, Chief Executive Officer.",
  },
  {
    personId: "simao-shao",
    slug: "simao-shao",
    name: "Simao Shao",
    section: "executive",
    sectionOrder: 1,
    profileOrder: 2,
    status: "active",
    showOnWebsite: true,
    primaryTitle: "Vice President / Chief Operating Officer (COO)",
    school: undefined,
    tagline: "Programs, events, and volunteers — the operating rhythm behind FinMentor.",
    bio: "Simao Shao serves as Vice President and Chief Operating Officer (COO) at FinMentor, leading educational programs, community events, and volunteer engagement across the organization.",
    extendedBio: [
      "Simao Shao serves as Vice President and Chief Operating Officer (COO), leading educational programs, community events, and volunteer engagement. His work spans program planning, event execution, volunteer recruitment, training, and on-site operations.",
      "He has led several signature initiatives including the Money Smart financial literacy series and cross-cultural volunteer programs that strengthen community engagement.",
    ],
    focusAreas: [
      "Program Leadership",
      "Community Events",
      "Volunteer Engagement",
      "On-site Operations",
    ],
    programsLed: [
      {
        name: "Money Smart Financial Literacy Series",
        detail: "FinMentor's ongoing financial literacy series for students.",
      },
      {
        name: "International Volunteer Program",
        detail: "Cross-cultural volunteer initiatives supporting community events.",
      },
    ],
    approach: "Run programs the way you'd want them run for your own family — thoughtful, prepared, and welcoming.",
    photo: "https://res.cloudinary.com/mzpdswax/image/upload/c_fill,w_300,h_400,f_auto,q_auto/finmentor/people/simao-shao.jpg",
    photoAlt: "Simao Shao, Vice President and COO.",
  },
  {
    personId: "kaiqing-dong",
    slug: "kaiqing-dong",
    name: "Kaiqing Dong",
    section: "executive",
    sectionOrder: 1,
    profileOrder: 3,
    status: "active",
    showOnWebsite: true,
    primaryTitle: "Chief Financial Officer (CFO) / Treasurer",
    school: "Saddleback College",
    tagline: "Supporting responsible financial management and community engagement through creative stewardship.",
    bio: "Kaiqing Dong serves as Chief Financial Officer (CFO) and Treasurer at FinMentor, supporting the organization's financial planning and operational coordination. A Fine Art student at Saddleback College, she combines creativity with entrepreneurial experience as the co-founder of a vintage retail business and founder of a jewelry brand.",
    extendedBio: [
      "Kaiqing Dong serves as Chief Financial Officer (CFO) and Treasurer at FinMentor, supporting financial planning and operational coordination. Her background in event operations, e-commerce, customer experience, and cross-cultural communication strengthens FinMentor's programs.",
      "Her entrepreneurial experience as a business co-founder and brand founder brings practical financial insight to the organization's mission.",
    ],
    focusAreas: [
      "Financial Planning",
      "Operational Coordination",
      "Cross-Cultural Communication",
      "Entrepreneurial Stewardship",
    ],
    programsLed: [
      {
        name: "Financial Management Systems",
        detail: "Developing responsible financial processes for program delivery.",
      },
    ],
    approach: "Combine creative thinking with practical financial stewardship to support sustainable community impact.",
    photo: "https://res.cloudinary.com/mzpdswax/image/upload/c_fill,w_300,h_400,f_auto,q_auto/finmentor/people/kaiqing-dong.jpg",
    photoAlt: "Kaiqing Dong, CFO and Treasurer.",
  },
  {
    personId: "harry-zhu",
    slug: "harry-zhu",
    name: "Harry Qihao Zhu",
    section: "executive",
    sectionOrder: 1,
    profileOrder: 4,
    status: "active",
    showOnWebsite: true,
    primaryTitle: "Secretary",
    secondaryTitles: ["Director of Community Relations and Outreach"],
    school: "Saddleback College",
    tagline: "Connecting communities and strengthening organizational communication.",
    bio: "Harry Qihao Zhu serves as Secretary and Director of Community Relations and Outreach at FinMentor, where he supports organizational communication, community engagement, and outreach activities. He enjoys connecting with others and contributing to programs that bring students and families together.",
    extendedBio: [
      "Harry Qihao Zhu serves as Secretary and Director of Community Relations and Outreach at FinMentor. He supports organizational communication, community engagement, and outreach activities.",
      "Outside of FinMentor, Harry enjoys playing basketball, practicing the piano, and playing video games. These interests keep him active, creative, and engaged while helping him develop teamwork, discipline, and communication skills.",
    ],
    focusAreas: [
      "Governance & Records",
      "Community Relations",
      "Outreach Activities",
      "Organizational Communication",
    ],
    programsLed: [
      {
        name: "Community Partnership Initiative",
        detail: "Building relationships with schools and community organizations.",
      },
    ],
    approach: "Clear communication and genuine relationship-building are the foundation of sustainable community partnerships.",
    photo: "https://res.cloudinary.com/mzpdswax/image/upload/c_fill,w_300,h_400,f_auto,q_auto/finmentor/people/harry-zhu.jpg",
    photoAlt: "Harry Qihao Zhu, Secretary.",
  },

  // ============================================================================
  // DEPARTMENT DIRECTORS
  // ============================================================================
  {
    personId: "genghao-wang",
    slug: "genghao-wang",
    name: "Genghao Wang",
    section: "department",
    sectionOrder: 2,
    profileOrder: 17,
    status: "active",
    showOnWebsite: false,
    primaryTitle: "Assistant Treasurer / Deputy CFO",
    secondaryTitles: ["Director of Volunteer Management"],
    school: "Portola High School",
    tagline: "Building tools and systems that connect volunteers with meaningful opportunities.",
    bio: "Genghao Wang serves as Assistant Treasurer (Deputy CFO) and Director of Volunteer Management at FinMentor. Since joining the Money Smart financial literacy program in 2024, he has volunteered in a variety of community initiatives.",
    extendedBio: [
      "Genghao Wang serves as Assistant Treasurer (Deputy CFO) and Director of Volunteer Management at FinMentor. Since joining the Money Smart financial literacy program in 2024, he has volunteered in a variety of community initiatives.",
      "In 2025, he began developing the FinMentor app to help schedule events, manage volunteers, and streamline student check-ins. Through his work in financial operations, volunteer management, and technology development, Genghao helps strengthen FinMentor's programs.",
    ],
    focusAreas: [
      "Financial Operations",
      "Volunteer Management",
      "Technology Development",
      "Event Coordination",
    ],
    programsLed: [
      {
        name: "FinMentor App Development",
        detail: "Event scheduling, volunteer management, and student check-in systems.",
      },
      {
        name: "Volunteer Coordination",
        detail: "Managing volunteer schedules and community initiatives.",
      },
    ],
    approach: "Thoughtful systems and reliable tools help volunteers focus on what matters most — making a difference in their communities.",
    photo: "https://res.cloudinary.com/mzpdswax/image/upload/c_fill,w_300,h_400,f_auto,q_auto/finmentor/people/genghao-wang.jpg",
    photoAlt: "Genghao Wang, Assistant Treasurer and Director of Volunteer Management.",
  },
  {
    personId: "haoye-li",
    slug: "haoye-li",
    name: "Haoye Li",
    section: "department",
    sectionOrder: 2,
    profileOrder: 18,
    status: "active",
    showOnWebsite: true,
    primaryTitle: "Youth Financial Literacy Program Leader",
    school: "Irvine High School",
    tagline: "Empowering youth through financial education and community service.",
    bio: "Haoye Li serves as Youth Financial Literacy Program Leader at FinMentor, where he supports financial education initiatives that help young people develop essential money management skills and financial awareness.",
    extendedBio: [
      "Haoye Li serves as Youth Financial Literacy Program Leader at FinMentor, where he supports financial education initiatives that help young people develop essential money management skills and financial awareness.",
      "A student at Irvine High School, Haoye is also a dedicated clarinetist involved in his school's music programs. His interests in finance, music, and community service reflect his commitment to continuous learning, teamwork, and making a positive impact.",
    ],
    focusAreas: [
      "Youth Education",
      "Financial Literacy Programs",
      "Community Service",
      "Teamwork & Leadership",
    ],
    programsLed: [
      {
        name: "Youth Financial Literacy Program",
        detail: "Supporting financial education initiatives for young people.",
      },
    ],
    approach: "Engaging youth through relatable content and hands-on activities builds lasting financial knowledge and confidence.",
    photo: "https://res.cloudinary.com/mzpdswax/image/upload/c_fill,w_300,h_400,f_auto,q_auto/finmentor/people/haoye-li.jpg",
    photoAlt: "Haoye Li, Youth Financial Literacy Program Leader.",
  },
  {
    personId: "nathan-wang",
    slug: "nathan-wang",
    name: "Nathan Wang",
    section: "department",
    sectionOrder: 2,
    profileOrder: 10,
    status: "active",
    showOnWebsite: true,
    primaryTitle: "Assistant Treasurer / Deputy CFO",
    secondaryTitles: ["Director of Volunteer Management"],
    school: undefined,
    tagline: "Supporting financial operations and volunteer coordination for FinMentor's programs.",
    bio: "Nathan Wang serves as Assistant Treasurer / Deputy CFO and Director of Volunteer Management at FinMentor. He supports financial operations while leading volunteer recruitment, training, and coordination efforts.",
    extendedBio: [
      "Nathan Wang serves as Assistant Treasurer / Deputy CFO, supporting the organization's financial planning and operational coordination.",
      "As Director of Volunteer Management, he oversees volunteer recruitment, training, and day-to-day coordination to ensure program success.",
    ],
    focusAreas: [
      "Financial Operations",
      "Volunteer Coordination",
      "Program Support",
      "Team Organization",
    ],
    programsLed: [
      {
        name: "Volunteer Management System",
        detail: "Recruitment, training, and coordination for student and adult volunteers.",
      },
    ],
    approach: "Well-coordinated volunteers are the heart of accessible community education.",
    photo: "https://res.cloudinary.com/mzpdswax/image/upload/c_fill,w_300,h_400,f_auto,q_auto/finmentor/people/genghao-wang.jpg",
    photoAlt: "Nathan Wang, Assistant Treasurer and Director of Volunteer Management.",
  },
  {
    personId: "desmond-hong",
    slug: "desmond-hong",
    name: "Desmond Hong",
    section: "department",
    sectionOrder: 2,
    profileOrder: 11,
    status: "active",
    showOnWebsite: true,
    primaryTitle: "Assistant Secretary / Deputy Secretary",
    school: "Valencia High School",
    tagline: "Supporting organizational coordination and administrative activities.",
    bio: "Desmond Hong serves as Assistant Secretary at FinMentor, supporting organizational coordination and administrative activities. A student at Valencia High School, he has developed a strong interest in personal finance through accounting coursework, the Young Investor Society, and UCI's Investments, Financial Planning & You (IFPY) program, where he built a virtual investment portfolio that achieved over 100% growth.",
    extendedBio: [
      "Desmond Hong serves as Assistant Secretary at FinMentor, supporting organizational coordination and administrative activities.",
      "A student at Valencia High School, he has developed a strong interest in personal finance through accounting coursework, the Young Investor Society, and UCI's IFPY program.",
    ],
    focusAreas: [
      "Administrative Coordination",
      "Organizational Support",
      "Financial Education",
      "Investment Knowledge",
    ],
    programsLed: [],
    approach: "Attention to detail in administration ensures smooth operations that serve students and volunteers effectively.",
    photo: "https://res.cloudinary.com/mzpdswax/image/upload/c_fill,w_300,h_400,f_auto,q_auto/finmentor/people/desmond-hong.jpg",
    photoAlt: "Desmond Hong, Assistant Secretary.",
  },
  {
    personId: "eric-su",
    slug: "eric-su",
    name: "Eric Su",
    section: "department",
    sectionOrder: 2,
    profileOrder: 12,
    status: "active",
    showOnWebsite: true,
    primaryTitle: "Director of Digital Marketing and Communications",
    school: undefined,
    tagline: "Leading digital outreach and communications that amplify FinMentor's mission.",
    bio: "Eric Su is the Director of Digital Marketing and Communications at FinMentor, where he leads the organization's digital outreach and communications. He has supported several FinMentor initiatives, including the Money Smart financial literacy series, by managing presentation technology and electronic equipment for community events.",
    extendedBio: [
      "Eric Su is the Director of Digital Marketing and Communications at FinMentor, leading the organization's digital outreach and communications strategy.",
      "He has supported several FinMentor initiatives by managing presentation technology and electronic equipment for community events.",
    ],
    focusAreas: [
      "Digital Marketing",
      "Communications Strategy",
      "Event Technology",
      "Content Development",
    ],
    programsLed: [
      {
        name: "Digital Communications",
        detail: "Managing digital presence and community outreach.",
      },
    ],
    approach: "Clear, consistent communication amplifies the reach and impact of financial education.",
    photo: "https://res.cloudinary.com/mzpdswax/image/upload/c_fill,w_300,h_400,f_auto,q_auto/finmentor/people/eric-su.jpg",
    photoAlt: "Eric Su, Director of Digital Marketing and Communications.",
  },
  {
    personId: "jacqueline-hong",
    slug: "jacqueline-hong",
    name: "Jacqueline Hong",
    section: "department",
    sectionOrder: 2,
    profileOrder: 13,
    status: "active",
    showOnWebsite: true,
    primaryTitle: "Director of Program and Event Management",
    school: "Orange County School of the Arts (OCSA)",
    tagline: "Bringing creative design expertise to program planning and community engagement.",
    bio: "Jacqueline Hong is the Director of Program and Event Management at FinMentor, where she supports program planning and community engagement through creative design. A junior at the Orange County School of the Arts (OCSA), she specializes in graphic design and fine arts, with experience in poster design and intuitive UI/UX.",
    extendedBio: [
      "Jacqueline Hong is the Director of Program and Event Management at FinMentor, supporting program planning and community engagement through creative design.",
      "A student at OCSA, she specializes in graphic design and fine arts, contributing to flyer design and community events with her creative expertise.",
    ],
    focusAreas: [
      "Program Planning",
      "Event Coordination",
      "Graphic Design",
      "Creative Direction",
    ],
    programsLed: [
      {
        name: "Program Design Initiative",
        detail: "Creative approaches to program materials and event visuals.",
      },
    ],
    approach: "Creative design makes financial education more engaging and accessible to diverse audiences.",
    photo: "https://res.cloudinary.com/mzpdswax/image/upload/c_fill,w_300,h_400,f_auto,q_auto/finmentor/people/jacqueline-hong.jpg",
    photoAlt: "Jacqueline Hong, Director of Program and Event Management.",
  },
  {
    personId: "sylvan-jiao",
    slug: "sylvan-jiao",
    name: "Sylvan Jiao",
    section: "department",
    sectionOrder: 2,
    profileOrder: 14,
    status: "active",
    showOnWebsite: true,
    primaryTitle: "Director of Educational Content Development",
    school: "Saddleback College",
    tagline: "Creating engaging educational materials that make financial literacy accessible.",
    bio: "Sylvan Jiao serves as Director of Educational Content Development at FinMentor, where he helps develop educational materials and support financial literacy programs for students and families. A student with strong interests in sociology and history, he enjoys exploring how people, communities, and ideas shape society.",
    extendedBio: [
      "Sylvan Jiao serves as Director of Educational Content Development at FinMentor, helping develop educational materials and support financial literacy programs.",
      "He is committed to creating engaging learning resources that make financial education more accessible and meaningful.",
    ],
    focusAreas: [
      "Curriculum Development",
      "Educational Materials",
      "Content Creation",
      "Community Education",
    ],
    programsLed: [
      {
        name: "Educational Content Initiative",
        detail: "Developing and refining financial literacy materials.",
      },
    ],
    approach: "Effective educational content transforms complex financial concepts into accessible, practical knowledge.",
    photo: "https://res.cloudinary.com/mzpdswax/image/upload/c_fill,w_300,h_400,f_auto,q_auto/finmentor/people/sylvan-jiao.jpg",
    photoAlt: "Sylvan Jiao, Director of Educational Content Development.",
  },
  {
    personId: "leo-wang",
    slug: "leo-wang",
    name: "Leo Wang",
    section: "department",
    sectionOrder: 2,
    profileOrder: 15,
    status: "active",
    showOnWebsite: true,
    primaryTitle: "Director of Finance and Administration",
    school: "Saddleback College",
    tagline: "Supporting nonprofit operations and financial literacy event coordination.",
    bio: "Leo Wang is a volunteer with FinMentor, supporting the organization's nonprofit community education programs and financial literacy events. He works closely with fellow volunteers to help coordinate event operations and create a welcoming experience for community members.",
    extendedBio: [
      "Leo Wang is the Director of Finance and Administration at FinMentor, supporting nonprofit community education programs and financial literacy events.",
      "Currently pursuing a degree in Business Administration at Saddleback College with plans to transfer to UC Irvine, he focuses on business, finance, and community engagement.",
    ],
    focusAreas: [
      "Finance Operations",
      "Event Coordination",
      "Community Service",
      "Business Administration",
    ],
    programsLed: [
      {
        name: "Event Operations Support",
        detail: "Coordinating logistics for community education events.",
      },
    ],
    approach: "Practical business skills support sustainable nonprofit operations and community impact.",
    photo: "https://res.cloudinary.com/mzpdswax/image/upload/c_fill,w_300,h_400,f_auto,q_auto/finmentor/people/leo-wang.jpg",
    photoAlt: "Leo Wang, Director of Finance and Administration.",
    linkedin: "https://www.linkedin.com/in/leo-wang-37a48b422",
  },
  {
    personId: "amber-zheng",
    slug: "amber-zheng",
    name: "Xinyun (Amber) Zheng",
    section: "department",
    sectionOrder: 2,
    profileOrder: 16,
    status: "active",
    showOnWebsite: true,
    primaryTitle: "Director of Customer Service and Support",
    school: "JSerra Catholic High School",
    tagline: "Creating welcoming experiences for students, families, and community members.",
    bio: "Amber Zheng is the Director of Customer Service and Support at FinMentor, where she helps create a welcoming experience for students, families, and community members. She supports customer service initiatives while contributing to FinMentor's educational outreach and community engagement.",
    extendedBio: [
      "Amber Zheng is the Director of Customer Service and Support at FinMentor, helping create welcoming experiences for students, families, and community members.",
      "A student at JSerra Catholic High School with a strong interest in healthcare, she has developed valuable skills in communication, empathy, and teamwork through volunteer service.",
    ],
    focusAreas: [
      "Customer Service",
      "Community Support",
      "Communication Skills",
      "Educational Outreach",
    ],
    programsLed: [
      {
        name: "Participant Support Initiative",
        detail: "Ensuring positive experiences for program participants.",
      },
    ],
    approach: "Every participant deserves a welcoming, supportive experience that encourages continued engagement.",
    photo: "https://res.cloudinary.com/mzpdswax/image/upload/c_fill,w_300,h_400,f_auto,q_auto/finmentor/people/amber-zheng.jpg",
    photoAlt: "Amber Zheng, Director of Customer Service and Support.",
    linkedin: "https://www.linkedin.com/in/amber-zheng-24332140a",
  },

  // ============================================================================
  // BOARD OF DIRECTORS
  // ============================================================================
  {
    personId: "angela-yang",
    slug: "angela-yang",
    name: "Angela Yang",
    section: "board",
    sectionOrder: 3,
    profileOrder: 1,
    status: "active",
    showOnWebsite: true,
    primaryTitle: "Chair of the Board",
    school: undefined,
    tagline: "Dedicated to expanding access to education and empowering the next generation.",
    bio: "Angela was born in Shanghai, China. She came to the United States to pursue her master's degree in Journalism and then her doctoral degree in Higher Education Administration as an international student. She understands the struggles that international students encounter on and off campus and is excited to get to know students and help them achieve their educational goals in the U.S. Angela has traveled to many countries throughout Asia. She has been in the field of international education for 25 years and loves working with students from around the world. Angela currently works for Saddleback College as the Director of International Student Program.",
    extendedBio: [
      "Angela was born in Shanghai, China. She came to the United States to pursue her master's degree in Journalism and then her doctoral degree in Higher Education Administration as an international student.",
      "She understands the struggles that international students encounter on and off campus and is excited to get to know students and help them achieve their educational goals in the U.S.",
      "Angela has traveled to many countries throughout Asia. She has been in the field of international education for 25 years and loves working with students from around the world.",
      "Angela currently works for Saddleback College as the Director of International Student Program.",
    ],
    focusAreas: [
      "International Education",
      "Higher Education Administration",
      "Student Development",
      "Cross-Cultural Communication",
    ],
    programsLed: [],
    approach: "Education has the power to transform lives, and every student deserves access to opportunities that help them thrive.",
    photo: "https://res.cloudinary.com/mzpdswax/image/upload/v1785112239/finmentor/people/angela-yang.jpg",
    photoAlt: "Angela Yang, Chair of the Board.",
  },
  {
    personId: "carson-wen",
    slug: "carson-wen",
    name: "Carson Wen",
    section: "board",
    sectionOrder: 3,
    profileOrder: 2,
    status: "active",
    showOnWebsite: true,
    primaryTitle: "Treasurer",
    school: undefined,
    tagline: "Committed to responsible financial stewardship and community service.",
    bio: "After graduating from university, I built a long career in business management, gaining extensive experience in organizational operations, team leadership, and strategic management. Ten years ago, I founded an international education consulting organization in the United States, dedicated to providing Chinese students with professional study-abroad planning and application services. Through these efforts, I have helped numerous students gain admission to outstanding overseas institutions and achieve their dreams of receiving an international education.",
    extendedBio: [
      "After graduating from university, I built a long career in business management, gaining extensive experience in organizational operations, team leadership, and strategic management.",
      "Ten years ago, I founded an international education consulting organization in the United States, dedicated to providing Chinese students with professional study-abroad planning and application services.",
      "Through these efforts, I have helped numerous students gain admission to outstanding overseas institutions and achieve their dreams of receiving an international education.",
      "At the same time, I have remained actively involved in community service and have long been committed to supporting new immigrants and their families as they integrate into American society.",
    ],
    focusAreas: [
      "Business Management",
      "Strategic Planning",
      "International Education",
      "Community Service",
    ],
    programsLed: [],
    approach: "Education has the power to transform lives, community service strengthens and unites neighborhoods, and cultural diversity contributes to a more vibrant and inclusive society.",
    photo: "https://res.cloudinary.com/mzpdswax/image/upload/v1785112240/finmentor/people/carson-wen.jpg",
    photoAlt: "Carson Wen, Treasurer.",
  },
  {
    personId: "jason-wei",
    slug: "jason-wei",
    name: "Jason Wei",
    section: "board",
    sectionOrder: 3,
    profileOrder: 3,
    status: "active",
    showOnWebsite: true,
    primaryTitle: "Secretary",
    school: undefined,
    tagline: "Applying 20+ years of technology and finance experience to empower communities.",
    bio: "Jason Wei brings over 20 years of extensive experience in internet technology and IT practices to FinMentor. Born in Yunnan, China, he began his career at Cisco China, where he developed deep expertise in technology infrastructure and enterprise solutions. Jason has been at the forefront of integrating AI technologies with financial services, applying his technical knowledge to create meaningful impact in the fintech space.",
    extendedBio: [
      "Jason Wei brings over 20 years of extensive experience in internet technology and IT practices to FinMentor. Born in Yunnan, China, he began his career at Cisco China, where he developed deep expertise in technology infrastructure and enterprise solutions.",
      "Jason has been at the forefront of integrating AI technologies with financial services, applying his technical knowledge to create meaningful impact in the fintech space.",
      "Driven by a passion for community empowerment through education, Jason is committed to expanding financial literacy and digital inclusion across underserved communities.",
      "He believes that technology and education are powerful tools for positive social change, and he brings this conviction to every aspect of his work with FinMentor.",
    ],
    focusAreas: [
      "Technology Infrastructure",
      "AI & FinTech",
      "Digital Transformation",
      "Community Empowerment",
    ],
    programsLed: [],
    approach: "Technology and education are powerful tools for positive social change — when combined thoughtfully, they can transform communities.",
    photo: "https://res.cloudinary.com/mzpdswax/image/upload/v1785112240/finmentor/people/jason-wei.jpg",
    photoAlt: "Jason Wei, Secretary.",
  },
] as const

// All department director positions are currently filled.
// Vacant positions will be shown as placeholder cards when needed.
export type OpenPositionRecord = {
  title: string
  slug: string
  focus: string
}

export const openDepartmentPositions: readonly OpenPositionRecord[] = [] as const

// Board of Directors — governance structure pending formal board establishment.
// Display as low-emphasis placeholder cards indicating roles to be filled.
export type OpenBoardSeatRecord = {
  slug: string
  boardRole: string
  focus: string
}

export const openBoardSeats: readonly OpenBoardSeatRecord[] = [
  {
    slug: "chair-of-the-board",
    boardRole: "Chair of the Board",
    focus: "Chairs the board, oversees governance meetings, and safeguards long-term mission alignment.",
  },
  {
    slug: "treasurer-board",
    boardRole: "Treasurer",
    focus: "Provides board-level oversight of budget, financial reporting, and fiduciary accountability.",
  },
  {
    slug: "secretary-board",
    boardRole: "Secretary",
    focus: "Maintains board records, resolutions, governance documents, and corporate filings.",
  },
] as const

export const ourPeopleSectionCopy = {
  hero: {
    title: "Our People",
    subtitle:
      "Meet the people who lead FinMentor's work, advance its mission, and turn financial education into meaningful community impact.",
  },
  executive: {
    title: "Executive Leadership",
    description:
      "Our executive leaders provide organizational direction, coordinate operations, and ensure that FinMentor's programs, resources, and partnerships advance its mission effectively.",
  },
  department: {
    title: "Department Leadership",
    description:
      "Our department leaders take direct responsibility for FinMentor's programs, educational content, technology, communications, finance, volunteer engagement, and community outreach.",
  },
  board: {
    title: "Board of Directors",
    description:
      "FinMentor's Board of Directors provides governance and long-term oversight, ensuring the organization's mission, integrity, and community commitments remain aligned.",
  },
} as const

export const contactReasons = [
  "Partnership Inquiry",
  "Sponsorship Inquiry",
  "Program Question",
  "Volunteer Interest",
  "General Inquiry",
] as const
