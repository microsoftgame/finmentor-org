export const navigationItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Impact", href: "/news" },
  { label: "Leadership", href: "/leadership" },
  { label: "App", href: "/app" },
] as const

export const homeStats = [
  { value: "3+", label: "Sessions Delivered", tone: "text-blue-600", surface: "bg-white", offset: false },
  { value: "150+", label: "Students Reached", tone: "text-amber-500", surface: "bg-white", offset: false },
  { value: "40+", label: "Volunteers Engaged", tone: "text-emerald-600", surface: "bg-white", offset: true },
  { value: "200+", label: "Outreach Hours", tone: "text-slate-900", surface: "bg-blue-50", offset: true },
] as const

export const initiativeCards = [
  {
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop",
    tag: "High School",
    title: "Financial Literacy Courses",
    description:
      "Equipping teenagers with essential financial knowledge, from credit basics to budgeting, before they enter college.",
    href: "/programs",
  },
  {
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=800&auto=format&fit=crop",
    tag: "Community",
    title: "Adult & Family Workshops",
    description:
      "Accessible seminars tailored for local families, adapting FDIC materials to solve real-world economic challenges.",
    href: "/programs",
  },
  {
    image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=800&auto=format&fit=crop",
    tag: "Leadership",
    title: "Student Volunteer Outreach",
    description:
      "A peer-to-peer model empowering student leaders to teach and serve in their own communities.",
    href: "/programs",
  },
] as const

export const appFeatureList = [
  "Seamless Course & Event Reservations",
  "Real-time Volunteer Hour Tracking",
  "Verified Digital Certificate Center",
] as const

export const journeySteps = [
  {
    year: "2020",
    title: "Student-Led Beginning",
    description:
      "A group of Saddleback College students started a financial literacy club to help peers manage money wisely.",
  },
  {
    year: "2021",
    title: "Conference Inspiration",
    description:
      "Founders attended NCCWSL and discovered the FDIC Money Smart framework, which sharpened the nonprofit vision.",
  },
  {
    year: "2022",
    title: "Financial Literacy Club",
    description:
      "The program expanded into structured workshops for high schools and community centers across Orange County.",
  },
  {
    year: "2023",
    title: "Registered Nonprofit",
    description:
      "Finmentor officially became a California 501(c)(3) nonprofit organization built to scale sustainable community education.",
  },
] as const

export const missionValues = [
  {
    title: "Mission",
    description:
      "To provide accessible financial literacy education that empowers students and community members to make informed decisions and build lasting resilience.",
    accent: "text-blue-400",
  },
  {
    title: "Vision",
    description:
      "A world where every young person has the knowledge, skills, and confidence to achieve financial independence and strengthen their community.",
    accent: "text-emerald-400",
  },
  {
    title: "Values",
    description:
      "Accessibility, youth empowerment, community partnership, integrity, and continuous learning guide every program we deliver.",
    accent: "text-amber-300",
  },
] as const

export const financialLiteracyFacts = [
  "Only 17 states currently require financial literacy in high school.",
  "Average student loan debt still exceeds $30,000 for many graduates.",
  "66% of Americans cannot pass a basic financial literacy test.",
] as const

export const trustHighlights = [
  { title: "Registered U.S. Nonprofit", description: "Recognized 501(c)(3) tax-exempt organization." },
  { title: "Educational Mission", description: "Built specifically for financial literacy and youth development." },
  { title: "Community-Rooted Programs", description: "Started by local students and shaped by real neighborhood needs." },
  { title: "Public-Serving Model", description: "All public programs remain free for participants." },
] as const

export const leadershipSnapshot = [
  {
    title: "Adult Advisory Board",
    description:
      "Experienced professionals provide oversight, mentorship, and strategic guidance to strengthen every initiative.",
    ctaLabel: "Meet the Team",
    href: "/leadership",
  },
  {
    title: "Student Leadership Team",
    description:
      "Student leaders drive programs, outreach, and peer education while gaining meaningful real-world experience.",
    ctaLabel: "View Opportunities",
    href: "/leadership",
  },
] as const

export const programs = [
  {
    tag: "Curriculum",
    title: "High School Financial Literacy Courses",
    description:
      "Comprehensive curriculum covering budgeting, saving, investing, and financial decision-making for high school students.",
    bullets: ["Budget Management", "Saving Strategies", "Intro to Investing", "Credit & Debt"],
    audience: "High School Students (9-12 grade)",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop",
    alt: "Students in a high school financial literacy class",
    cta: "Learn More",
    accent: "bg-blue-500",
  },
  {
    tag: "Community",
    title: "Community Workshops",
    description:
      "Interactive sessions for families and community members to learn practical financial skills in a supportive environment.",
    bullets: ["Family Financial Planning", "Tax Preparation Basics", "Banking Essentials", "Emergency Savings"],
    audience: "Adults & Families",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
    alt: "Community workshop discussion",
    cta: "Partner With Us",
    accent: "bg-emerald-500",
  },
  {
    tag: "Leadership",
    title: "Student Volunteer Outreach",
    description:
      "Empowering students to become financial literacy educators through leadership development and community service.",
    bullets: ["Leadership Training", "Teaching Practice", "Community Service Hours", "Resume Building"],
    audience: "High School & College Students",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    alt: "Student volunteers collaborating",
    cta: "Explore Outreach",
    accent: "bg-amber-500",
  },
  {
    tag: "Resources",
    title: "Educational Resources",
    description:
      "Free downloadable materials, guides, and tools to support financial learning at any level.",
    bullets: ["Workbooks & Templates", "Video Lessons", "Interactive Tools", "Financial Calculators"],
    audience: "Everyone",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    alt: "Educational resources on a desk",
    cta: "Browse Materials",
    accent: "bg-slate-700",
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
  "Students complete courses with improved financial knowledge and confidence.",
  "Volunteers gain leadership, facilitation, and public speaking experience.",
  "Communities build stronger long-term financial health through practical education.",
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
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop",
    category: "Partnership",
    date: "February 28, 2024",
    title: "New Partnership with Saddleback College",
    excerpt:
      "A new collaboration is bringing our financial literacy programs to more students across campus and the surrounding community.",
  },
  {
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
    category: "Event",
    date: "January 20, 2024",
    title: "Student Leadership Conference Recap",
    excerpt:
      "More than 50 student leaders gathered for workshops, networking, and hands-on skill building.",
  },
  {
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
    category: "Program",
    date: "December 10, 2023",
    title: "Community Workshop Series Launch",
    excerpt:
      "Our new neighborhood-based workshop series brings financial education directly into local communities.",
  },
  {
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    category: "Volunteer",
    date: "November 15, 2023",
    title: "Volunteer Spotlight: Sarah Chen",
    excerpt:
      "Meet a student volunteer who has helped educate more than 200 community members through peer instruction.",
  },
  {
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
    category: "Impact",
    date: "October 30, 2023",
    title: "Fall Semester Program Results",
    excerpt:
      "A look back at the measurable outcomes from our fall programs across Orange County.",
  },
  {
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
    category: "Resources",
    date: "September 20, 2023",
    title: "New Educational Resources Available",
    excerpt:
      "Fresh workbooks, financial planning guides, and student-friendly resources are now available online.",
  },
] as const

export const impactStats = [
  { number: "50+", label: "Sessions Delivered" },
  { number: "2,000+", label: "Students Reached" },
  { number: "150+", label: "Volunteers Engaged" },
  { number: "5,000+", label: "Community Hours" },
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
  "Registered 501(c)(3) nonprofit organization.",
  "California nonprofit public benefit corporation.",
  "Strictly educational mission; 100% of public programs are free.",
  "Financial and impact documentation available upon request.",
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

export const contactReasons = [
  "Partnership Inquiry",
  "Sponsorship Inquiry",
  "Program Question",
  "Volunteer Interest",
  "General Inquiry",
] as const
