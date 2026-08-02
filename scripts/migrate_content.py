# -*- coding: utf-8 -*-
"""一次性迁移脚本：把 lib/site-data.ts 的硬编码内容导出为 content/*.json（Decap 可用）。
运行：python scripts/migrate_content.py
注意：本脚本仅用于初始迁移，数据已人工核对，运行一次即可。
"""
import json
import os

BASE = os.path.join(os.path.dirname(__file__), "..", "content")


def w(folder, slug, data):
    d = os.path.join(BASE, folder)
    os.makedirs(d, exist_ok=True)
    with open(os.path.join(d, slug + ".json"), "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print("wrote", folder, slug)


def clean(o):
    if isinstance(o, dict):
        return {k: clean(v) for k, v in o.items() if v is not None}
    if isinstance(o, list):
        return [clean(v) for v in o if v is not None]
    return o


# ---------------------------------------------------------------------------
# programs（合并 site-data.programs 列表字段 + [slug] 页 programsData 详情字段）
# ---------------------------------------------------------------------------
programs = [
    {
        "slug": "money-smart-course-1",
        "tag": "CURRICULUM",
        "title": "Money Smart Financial Literacy Program",
        "summary": "An introductory financial literacy program focused on practical money skills for high school students.",
        "audience": "High School Students (Grades 9\u201312)",
        "image": "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/v1785162834/finmentor/programs/program-image-for-substitution.png",
        "alt": "Students in a classroom learning financial literacy",
        "accent": "bg-blue-500",
        "bullets": ["Financial Decision-Making", "Spending Awareness", "Saving Strategies", "Responsible Money Habits"],
        "overview": "This course introduces practical financial concepts through interactive lessons, real-world examples, and classroom discussions. Students explore topics including spending, saving, consumer awareness, and responsible financial decision-making.",
        "highlights": "Students participate in interactive discussions, real-life case studies, and collaborative activities that connect financial concepts with everyday situations. The course encourages critical thinking, responsible money habits, and confident financial decision-making.",
        "showOnWebsite": True,
    },
    {
        "slug": "international-volunteer",
        "tag": "LEADERSHIP",
        "title": "International Volunteer \u2014 Exploring China",
        "summary": "Students supported a cross-cultural campus event while gaining practical experience in teamwork, communication, and community service.",
        "audience": "High School & College Students",
        "image": "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/finmentor/programs/international-volunteer.jpg",
        "alt": "Student volunteers collaborating at Saddleback College",
        "accent": "bg-amber-500",
        "bullets": ["Event Support", "Team Collaboration", "Cross-Cultural Communication", "Community Service"],
        "overview": "FinMentor volunteers supported three cross-cultural workshops at Saddleback College, helping participants engage with topics related to Chinese culture, history, education, and economic development.",
        "highlights": "Volunteers assisted with participant check-in, materials, event preparation, and on-site coordination during the three-day cultural exchange event held from March 11 to March 13.",
        "date": "March 11\u201313, 2024",
        "location": "Saddleback College",
        "showOnWebsite": True,
    },
    {
        "slug": "from-passion-to-excellence",
        "tag": "COMMUNITY",
        "title": "From Passion to Excellence",
        "summary": "An interactive workshop where students explored how personal interests can develop into meaningful skills through student stories, guest speakers, and group discussions.",
        "audience": "Middle & High School Students",
        "image": "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/finmentor/programs/from-passion-to-excellence.jpg",
        "alt": "Student panel discussion workshop",
        "accent": "bg-emerald-500",
        "bullets": ["Discovering Personal Interests", "Setting Meaningful Goals", "Building Confidence", "Exploring Future Opportunities"],
        "overview": "Through student stories, guest presentations, and interactive discussions, participants explored how personal interests can grow into valuable skills, leadership experiences, and future academic or career opportunities.",
        "highlights": "The workshop featured student panel discussions, guest speakers, audience Q&A, and real-life experiences that encouraged participants to reflect on their own interests and future development.",
        "showOnWebsite": True,
    },
]

# ---------------------------------------------------------------------------
# programsPage（整页级 singleton 配置）
# ---------------------------------------------------------------------------
programs_page = {
    "heroEyebrow": "FinMentor Programs",
    "heroTitle": "Programs built for students, families, and communities.",
    "heroSubtitle": "We make financial education accessible through engaging programs and practical resources, helping students, families, and communities build the knowledge and confidence to make informed financial decisions.",
    "sectionHighlightsTitle": "Program & Event Highlights",
    "sectionHighlightsSubtitle": "Stay informed about FinMentor programs, events, and community impact stories.",
    "sectionUpcomingTitle": "Upcoming Opportunities",
    "sectionUpcomingSubtitle": "Explore our upcoming courses, community visits, and volunteer opportunities.",
    "impactImage": "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/finmentor/impact-in-action",
    "impactBadgeTitle": "Real World",
    "impactBadgeSubtitle": "Financial Learning",
    "impactTitle": "Impact in Action",
    "impactSubtitle": "Every workshop, course, and community event creates meaningful outcomes. Explore stories, event highlights, and community milestones that show how financial education is making a difference.",
    "impactBullets": [
        "Students build financial knowledge, confidence, and practical money skills.",
        "Volunteers develop leadership, communication, and community service experience.",
        "Families and communities benefit from financial education that creates lasting impact.",
    ],
    "ctaTitle": "Partner with us to create lasting community impact.",
    "ctaSubtitle": "Schools, community organizations, and businesses can partner with FinMentor to expand access to practical financial education and create lasting impact.",
    "ctaPrimaryLabel": "Partner With Us",
    "ctaPrimaryHref": "/support",
    "ctaSecondaryLabel": "Contact Us",
    "ctaSecondaryHref": "/contact",
}

# ---------------------------------------------------------------------------
# program-news（newsUpdates 12 条，无 slug 故生成稳定 slug）
# ---------------------------------------------------------------------------
raw_news = [
    ("fdic-headquarters-student-leadership-visit", "FDIC Headquarters Student Leadership Visit", "VISIT", "May 2026",
     "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/v1785162840/finmentor/updates/fdic-headquarters-student-leadership.png",
     "Five FinMentor student leaders were invited to visit the FDIC Headquarters in Washington D.C., gaining first-hand insights into financial regulation and public service careers"),
    ("digital-currencies-seminar", "Opportunities and Risks of Digital Currencies Seminar Held", "WORKSHOP", "January 2026",
     "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/v1785162851/finmentor/updates/digital-currencies-new.png",
     "Students explored the opportunities and risks of digital currencies through an expert presentation, real-world industry insights, and an interactive Q&A session"),
    ("public-or-private-school-student-panel", "Public or Private School Student Panel Held", "WORKSHOP", "November 2025",
     "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/finmentor/updates/public-or-private-school-new.png",
     "A student panel exploring academic experiences, extracurricular involvement, and everyday life in public and private high schools"),
    ("college-career-beyond", "College, Career & Beyond", "EVENT", "October 2025",
     "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/finmentor/updates/college-career-beyond.jpg",
     "Students explored college planning, internship opportunities, workplace culture, and future career pathways through presentations from professionals"),
    ("money-smart-session-3", "Money Smart Financial Literacy Course \u2014 Session 3", "PROGRAM", "April 2025",
     "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/v1785162846/finmentor/updates/money-smart-session3-new.png",
     "Session 3 continued FinMentor's Money Smart Financial Literacy Course with small-group, interactive instruction using the FDIC Money Smart curriculum"),
    ("nextgen-entrepreneurs-competition", "FinMentor Students Excel at NextGen Entrepreneurs Competition", "COMPETITION", "March 2025",
     "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/finmentor/updates/entrepreneurship-competition.jpg",
     "FinMentor students presented original business ideas at the 2025 NextGen Entrepreneurs Competition, earning second, joint third, and joint fourth place"),
    ("sparkhub-youth-entrepreneurial-competition", "First Place at the SparkHub Youth Entrepreneurial Competition", "COMPETITION", "March 2025",
     "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/v1785162836/finmentor/updates/program-michael-nathan.png",
     "Michael and Nathan earned first place after developing and presenting their startup idea to a panel of entrepreneurs and industry professionals at the SparkHub competition"),
    ("how-to-start-a-school-club", "How to Start a School Club", "EVENT", "January 2025",
     "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/v1785162848/finmentor/updates/how-to-start-a-school-club-new.png",
     "A community workshop featuring student speakers and guest mentor Dr. Sofia Lee, sharing experiences on founding school clubs and developing leadership skills"),
    ("money-smart-session-2", "Money Smart Financial Literacy Course \u2014 Session 2", "PROGRAM", "October 2024",
     "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/v1785162845/finmentor/updates/money-smart-session2-new.png",
     "Students participated in Session 2 of FinMentor's Money Smart Financial Literacy Course, learning practical financial concepts through interactive classroom activities and group discussions"),
    ("who-will-look-after-your-money", "Who Will Look After Your Money", "WORKSHOP", "October 2024",
     "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/v1785162842/finmentor/updates/who-will-look-after-your-money.png",
     "Students and families explored practical financial literacy concepts while hearing Steven share his journey of overcoming challenges and pursuing academic goals at UCLA"),
    ("finmentor-club-launch", "FinMentor Club Launch at Tesoro High School", "CLUB", "September 2024",
     "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/v1785162850/finmentor/updates/finmentor-club-new.png",
     "A student-led club expanding practical financial education at Tesoro High School, empowering students to bring financial literacy programs to their campus and community"),
    ("where-finmentor-journey-began", "Where the FinMentor Journey Began", "MILESTONE", "June 2023",
     "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/v1785162838/finmentor/updates/where-journey-began-new.png",
     "At AAUW's national conference, our founders attended an FDIC- and FINRA-supported financial literacy session that inspired the idea behind FinMentor"),
]
program_news = [
    {"slug": s, "title": t, "category": c, "date": d, "image": i, "excerpt": e, "body": "", "showOnWebsite": True, "featured": False}
    for (s, t, c, d, i, e) in raw_news
]

# ---------------------------------------------------------------------------
# upcoming（基于 programs 页实际渲染的 3 张硬卡）
# ---------------------------------------------------------------------------
upcoming = [
    {
        "slug": "youth-investment-capital-markets",
        "title": "Youth Investment & Capital Markets Program",
        "tag": "Fall Program",
        "accent": "bg-blue-600",
        "description": "Build real-world investing skills through guided lessons, a $100,000 virtual portfolio, team research, and presentations.",
        "period": "Enrollment Open \u00b7 September\u2013November 2026",
        "ctaLabel": "Contact Us to Enroll",
        "ctaHref": "/contact",
    },
    {
        "slug": "bank-of-america-branch-visit",
        "title": "Bank of America Branch Visit",
        "tag": "Community Visit",
        "accent": "bg-emerald-600",
        "description": "Explore branch operations, customer service, and banking careers through an in-person visit, professional insights, and Q&A.",
        "period": "Planned for Fall 2026 \u00b7 Details Coming Soon",
        "ctaLabel": "Contact Us for Updates",
        "ctaHref": "/contact",
    },
    {
        "slug": "student-volunteer-program",
        "title": "Student Volunteer Program",
        "tag": "Volunteer",
        "accent": "bg-amber-600",
        "description": "Support financial literacy programs and community events while gaining leadership experience and earning service hours.",
        "period": "Now Recruiting \u00b7 Rolling Applications",
        "ctaLabel": "Contact Us to Volunteer",
        "ctaHref": "/contact",
    },
]

# ---------------------------------------------------------------------------
# people（ourPeople 16 条）
# ---------------------------------------------------------------------------
people = [
    {
        "personId": "michael-yang", "slug": "michael-yang", "name": "Michael Yang",
        "section": "executive", "sectionOrder": 1, "profileOrder": 1, "status": "active", "showOnWebsite": True,
        "primaryTitle": "CEO and CTO", "school": None,
        "tagline": "Leading FinMentor's mission to advance financial literacy through technology and strategic execution.",
        "bio": "Michael Yang serves as Chief Executive Officer (CEO) and Chief Technology Officer (CTO) at FinMentor, leading the organization's strategic direction, technology initiatives, data management, and digital platform development.",
        "extendedBio": [
            "Michael Yang serves as Chief Executive Officer (CEO) and Chief Technology Officer (CTO) at FinMentor. In his executive role he leads organizational strategy, coordinates team efforts, and represents FinMentor to partners and the broader community.",
            "As CTO, he oversees the digital platforms and systems that enable program delivery, volunteer coordination, and educational resource management.",
        ],
        "focusAreas": ["Executive Leadership", "Strategic Planning", "Technology Strategy", "Platform Development"],
        "programsLed": [{"name": "Technology Infrastructure", "detail": "Digital systems supporting program delivery and operations."}],
        "approach": "Build sustainable systems that scale FinMentor's impact through practical technology and thoughtful leadership.",
        "photo": "https://res.cloudinary.com/mzpdswax/image/upload/c_fill,w_300,h_400,f_auto,q_auto/finmentor/people/michael-yang.jpg",
        "photoAlt": "Michael Yang, Chief Executive Officer.",
        "secondaryTitles": None, "boardRole": None, "founderNote": None, "linkedin": None, "joinedYear": None,
    },
    {
        "personId": "simao-shao", "slug": "simao-shao", "name": "Simon Shao",
        "section": "executive", "sectionOrder": 1, "profileOrder": 2, "status": "active", "showOnWebsite": True,
        "primaryTitle": "Vice President and COO", "school": None,
        "tagline": "Programs, events, and volunteers \u2014 the operating rhythm behind FinMentor.",
        "bio": "Simon Shao serves as Vice President and Chief Operating Officer (COO) at FinMentor, leading educational programs, community events, and volunteer engagement across the organization.",
        "extendedBio": [
            "Simon Shao serves as Vice President and Chief Operating Officer (COO), leading educational programs, community events, and volunteer engagement. His work spans program planning, event execution, volunteer recruitment, training, and on-site operations.",
            "He has led several signature initiatives including the Money Smart financial literacy series and cross-cultural volunteer programs that strengthen community engagement.",
        ],
        "focusAreas": ["Program Leadership", "Community Events", "Volunteer Engagement", "On-site Operations"],
        "programsLed": [
            {"name": "Money Smart Financial Literacy Series", "detail": "FinMentor's ongoing financial literacy series for students."},
            {"name": "International Volunteer Program", "detail": "Cross-cultural volunteer initiatives supporting community events."},
        ],
        "approach": "Run programs the way you'd want them run for your own family \u2014 thoughtful, prepared, and welcoming.",
        "photo": "https://res.cloudinary.com/mzpdswax/image/upload/c_fill,w_300,h_400,f_auto,q_auto/finmentor/people/simao-shao.jpg",
        "photoAlt": "Simon Shao, Vice President and COO.",
        "secondaryTitles": None, "boardRole": None, "founderNote": None, "linkedin": None, "joinedYear": None,
    },
    {
        "personId": "kaiqing-dong", "slug": "kaiqing-dong", "name": "Kaiqing Dong",
        "section": "executive", "sectionOrder": 1, "profileOrder": 3, "status": "active", "showOnWebsite": True,
        "primaryTitle": "CFO and Treasurer", "school": "Saddleback College",
        "tagline": "Supporting responsible financial management and community engagement through creative stewardship.",
        "bio": "Kaiqing Dong serves as Chief Financial Officer (CFO) and Treasurer at FinMentor, supporting the organization's financial planning and operational coordination. A Fine Art student at Saddleback College, she combines creativity with entrepreneurial experience as the co-founder of a vintage retail business and founder of a jewelry brand.",
        "extendedBio": [
            "Kaiqing Dong serves as Chief Financial Officer (CFO) and Treasurer at FinMentor, supporting financial planning and operational coordination. Her background in event operations, e-commerce, customer experience, and cross-cultural communication strengthens FinMentor's programs.",
            "Her entrepreneurial experience as a business co-founder and brand founder brings practical financial insight to the organization's mission.",
        ],
        "focusAreas": ["Financial Planning", "Operational Coordination", "Cross-Cultural Communication", "Entrepreneurial Stewardship"],
        "programsLed": [{"name": "Financial Management Systems", "detail": "Developing responsible financial processes for program delivery."}],
        "approach": "Combine creative thinking with practical financial stewardship to support sustainable community impact.",
        "photo": "https://res.cloudinary.com/mzpdswax/image/upload/c_fill,w_300,h_400,f_auto,q_auto/finmentor/people/kaiqing-dong.jpg",
        "photoAlt": "Kaiqing Dong, CFO and Treasurer.",
        "secondaryTitles": None, "boardRole": None, "founderNote": None, "linkedin": None, "joinedYear": None,
    },
    {
        "personId": "harry-zhu", "slug": "harry-zhu", "name": "Harry Qihao Zhu",
        "section": "executive", "sectionOrder": 1, "profileOrder": 4, "status": "active", "showOnWebsite": True,
        "primaryTitle": "Secretary and Director of Community Relations and Outreach", "school": "Saddleback College",
        "tagline": "Connecting communities and strengthening organizational communication.",
        "bio": "Harry Qihao Zhu serves as Secretary and Director of Community Relations and Outreach at FinMentor, where he supports organizational communication, community engagement, and outreach activities. He enjoys connecting with others and contributing to programs that bring students and families together.",
        "extendedBio": [
            "Harry Qihao Zhu serves as Secretary and Director of Community Relations and Outreach at FinMentor. He supports organizational communication, community engagement, and outreach activities.",
            "Outside of FinMentor, Harry enjoys playing basketball, practicing the piano, and playing video games. These interests keep him active, creative, and engaged while helping him develop teamwork, discipline, and communication skills.",
        ],
        "focusAreas": ["Governance & Records", "Community Relations", "Outreach Activities", "Organizational Communication"],
        "programsLed": [{"name": "Community Partnership Initiative", "detail": "Building relationships with schools and community organizations."}],
        "approach": "Clear communication and genuine relationship-building are the foundation of sustainable community partnerships.",
        "photo": "https://res.cloudinary.com/mzpdswax/image/upload/c_fill,w_300,h_400,f_auto,q_auto/finmentor/people/harry-zhu.jpg",
        "photoAlt": "Harry Qihao Zhu, Secretary.",
        "secondaryTitles": None, "boardRole": None, "founderNote": None, "linkedin": None, "joinedYear": None,
    },
    {
        "personId": "genghao-wang", "slug": "genghao-wang", "name": "Genghao Wang",
        "section": "department", "sectionOrder": 2, "profileOrder": 17, "status": "active", "showOnWebsite": False,
        "primaryTitle": "Assistant Treasurer / Deputy CFO", "secondaryTitles": ["Director of Volunteer Management"], "school": "Portola High School",
        "tagline": "Building tools and systems that connect volunteers with meaningful opportunities.",
        "bio": "Genghao Wang serves as Assistant Treasurer (Deputy CFO) and Director of Volunteer Management at FinMentor. Since joining the Money Smart financial literacy program in 2024, he has volunteered in a variety of community initiatives.",
        "extendedBio": [
            "Genghao Wang serves as Assistant Treasurer (Deputy CFO) and Director of Volunteer Management at FinMentor. Since joining the Money Smart financial literacy program in 2024, he has volunteered in a variety of community initiatives.",
            "In 2025, he began developing the FinMentor app to help schedule events, manage volunteers, and streamline student check-ins. Through his work in financial operations, volunteer management, and technology development, Genghao helps strengthen FinMentor's programs.",
        ],
        "focusAreas": ["Financial Operations", "Volunteer Management", "Technology Development", "Event Coordination"],
        "programsLed": [
            {"name": "FinMentor App Development", "detail": "Event scheduling, volunteer management, and student check-in systems."},
            {"name": "Volunteer Coordination", "detail": "Managing volunteer schedules and community initiatives."},
        ],
        "approach": "Thoughtful systems and reliable tools help volunteers focus on what matters most \u2014 making a difference in their communities.",
        "photo": "https://res.cloudinary.com/mzpdswax/image/upload/c_fill,w_300,h_400,f_auto,q_auto/finmentor/people/genghao-wang.jpg",
        "photoAlt": "Genghao Wang, Assistant Treasurer and Director of Volunteer Management.",
        "boardRole": None, "founderNote": None, "linkedin": None, "joinedYear": None,
    },
    {
        "personId": "haoye-li", "slug": "haoye-li", "name": "Haoye Li",
        "section": "department", "sectionOrder": 2, "profileOrder": 18, "status": "active", "showOnWebsite": True,
        "primaryTitle": "Director of Youth Financial Literacy Programs", "school": "Irvine High School",
        "tagline": "Empowering youth through financial education and community engagement.",
        "bio": "Haoye Li serves as Director of Youth Financial Literacy Programs at FinMentor, supporting youth financial education initiatives and community engagement.",
        "extendedBio": [
            "Haoye Li serves as Director of Youth Financial Literacy Programs at FinMentor, where he supports financial education initiatives that help young people develop essential money management skills and financial awareness.",
            "A student at Irvine High School, Haoye is also a dedicated clarinetist involved in his school's music programs. His interests in finance, music, and community service reflect his commitment to continuous learning, teamwork, and making a positive impact.",
        ],
        "focusAreas": ["Youth Education", "Financial Literacy Programs", "Community Service", "Teamwork & Leadership"],
        "programsLed": [{"name": "Youth Financial Literacy Program", "detail": "Supporting financial education initiatives for young people."}],
        "approach": "Engaging youth through relatable content and hands-on activities builds lasting financial knowledge and confidence.",
        "photo": "https://res.cloudinary.com/mzpdswax/image/upload/c_fill,w_300,h_400,f_auto,q_auto/finmentor/people/haoye-li.jpg",
        "photoAlt": "Haoye Li, Youth Financial Literacy Program Leader.",
        "secondaryTitles": None, "boardRole": None, "founderNote": None, "linkedin": None, "joinedYear": None,
    },
    {
        "personId": "nathan-wang", "slug": "nathan-wang", "name": "Nathan Wang",
        "section": "department", "sectionOrder": 2, "profileOrder": 10, "status": "active", "showOnWebsite": True,
        "primaryTitle": "Assistant Treasurer and Director of Volunteer Management", "school": None,
        "tagline": "Supporting financial operations and volunteer coordination for FinMentor's programs.",
        "bio": "Nathan Wang serves as Assistant Treasurer and Director of Volunteer Management at FinMentor. He supports financial operations and volunteer coordination for the organization's programs.",
        "extendedBio": [
            "Nathan Wang serves as Assistant Treasurer and Director of Volunteer Management at FinMentor. He supports financial operations while leading volunteer recruitment, training, and day-to-day coordination to ensure program success.",
            "As Director of Volunteer Management, he oversees volunteer recruitment, training, and coordination efforts across all FinMentor programs.",
        ],
        "focusAreas": ["Financial Operations", "Volunteer Coordination", "Program Support", "Team Organization"],
        "programsLed": [{"name": "Volunteer Management System", "detail": "Recruitment, training, and coordination for student and adult volunteers."}],
        "approach": "Well-coordinated volunteers are the heart of accessible community education.",
        "photo": "https://res.cloudinary.com/mzpdswax/image/upload/c_fill,w_300,h_400,f_auto,q_auto/finmentor/people/genghao-wang.jpg",
        "photoAlt": "Nathan Wang, Assistant Treasurer and Director of Volunteer Management.",
        "secondaryTitles": None, "boardRole": None, "founderNote": None, "linkedin": None, "joinedYear": None,
    },
    {
        "personId": "desmond-hong", "slug": "desmond-hong", "name": "Desmond Hong",
        "section": "department", "sectionOrder": 2, "profileOrder": 11, "status": "active", "showOnWebsite": True,
        "primaryTitle": "Assistant Secretary and Director of Administration", "school": "Valencia High School",
        "tagline": "Supporting organizational coordination and administrative activities.",
        "bio": "Desmond Hong serves as Assistant Secretary at FinMentor, supporting organizational coordination and administrative activities. A student at Valencia High School, he has developed a strong interest in personal finance through accounting coursework, the Young Investor Society, and UCI's Investments, Financial Planning & You (IFPY) program, where he built a virtual investment portfolio that achieved over 100% growth.",
        "extendedBio": [
            "Desmond Hong serves as Assistant Secretary at FinMentor, supporting organizational coordination and administrative activities.",
            "A student at Valencia High School, he has developed a strong interest in personal finance through accounting coursework, the Young Investor Society, and UCI's IFPY program.",
        ],
        "focusAreas": ["Administrative Coordination", "Organizational Support", "Financial Education", "Investment Knowledge"],
        "programsLed": [],
        "approach": "Attention to detail in administration ensures smooth operations that serve students and volunteers effectively.",
        "photo": "https://res.cloudinary.com/mzpdswax/image/upload/c_fill,w_300,h_400,f_auto,q_auto/finmentor/people/desmond-hong.jpg",
        "photoAlt": "Desmond Hong, Assistant Secretary.",
        "secondaryTitles": None, "boardRole": None, "founderNote": None, "linkedin": None, "joinedYear": None,
    },
    {
        "personId": "eric-su", "slug": "eric-su", "name": "Eric Su",
        "section": "department", "sectionOrder": 2, "profileOrder": 12, "status": "active", "showOnWebsite": True,
        "primaryTitle": "Director of Digital Marketing and Communications", "school": None,
        "tagline": "Leading digital outreach and communications that amplify FinMentor's mission.",
        "bio": "Eric Su is the Director of Digital Marketing and Communications at FinMentor, where he leads the organization's digital outreach and communications. He has supported several FinMentor initiatives, including the Money Smart financial literacy series, by managing presentation technology and electronic equipment for community events.",
        "extendedBio": [
            "Eric Su is the Director of Digital Marketing and Communications at FinMentor, leading the organization's digital outreach and communications strategy.",
            "He has supported several FinMentor initiatives by managing presentation technology and electronic equipment for community events.",
        ],
        "focusAreas": ["Digital Marketing", "Communications Strategy", "Event Technology", "Content Development"],
        "programsLed": [{"name": "Digital Communications", "detail": "Managing digital presence and community outreach."}],
        "approach": "Clear, consistent communication amplifies the reach and impact of financial education.",
        "photo": "https://res.cloudinary.com/mzpdswax/image/upload/c_fill,w_300,h_400,f_auto,q_auto/finmentor/people/eric-su.jpg",
        "photoAlt": "Eric Su, Director of Digital Marketing and Communications.",
        "secondaryTitles": None, "boardRole": None, "founderNote": None, "linkedin": None, "joinedYear": None,
    },
    {
        "personId": "jacqueline-hong", "slug": "jacqueline-hong", "name": "Jacqueline Hong",
        "section": "department", "sectionOrder": 2, "profileOrder": 13, "status": "active", "showOnWebsite": True,
        "primaryTitle": "Director of Programs and Event Management", "school": "Orange County School of the Arts (OCSA)",
        "tagline": "Bringing creative design expertise to program planning and community engagement.",
        "bio": "Jacqueline Hong is the Director of Programs and Event Management at FinMentor, where she supports program planning and community engagement through creative design. A junior at the Orange County School of the Arts (OCSA), she specializes in graphic design and fine arts, with experience in poster design and intuitive UI/UX.",
        "extendedBio": [
            "Jacqueline Hong is the Director of Programs and Event Management at FinMentor, supporting program planning and community engagement through creative design.",
            "A student at OCSA, she specializes in graphic design and fine arts, contributing to flyer design and community events with her creative expertise.",
        ],
        "focusAreas": ["Program Planning", "Event Coordination", "Graphic Design", "Creative Direction"],
        "programsLed": [{"name": "Program Design Initiative", "detail": "Creative approaches to program materials and event visuals."}],
        "approach": "Creative design makes financial education more engaging and accessible to diverse audiences.",
        "photo": "https://res.cloudinary.com/mzpdswax/image/upload/c_fill,w_300,h_400,f_auto,q_auto/finmentor/people/jacqueline-hong.jpg",
        "photoAlt": "Jacqueline Hong, Director of Programs and Event Management.",
        "secondaryTitles": None, "boardRole": None, "founderNote": None, "linkedin": None, "joinedYear": None,
    },
    {
        "personId": "sylvan-jiao", "slug": "sylvan-jiao", "name": "Sylvan Jiao",
        "section": "department", "sectionOrder": 2, "profileOrder": 14, "status": "active", "showOnWebsite": True,
        "primaryTitle": "Director of Educational Content Development", "school": "Saddleback College",
        "tagline": "Creating engaging educational materials that make financial literacy accessible.",
        "bio": "Sylvan Jiao serves as Director of Educational Content Development at FinMentor, where he helps develop educational materials and support financial literacy programs for students and families. A student with strong interests in sociology and history, he enjoys exploring how people, communities, and ideas shape society.",
        "extendedBio": [
            "Sylvan Jiao serves as Director of Educational Content Development at FinMentor, helping develop educational materials and support financial literacy programs.",
            "He is committed to creating engaging learning resources that make financial education more accessible and meaningful.",
        ],
        "focusAreas": ["Curriculum Development", "Educational Materials", "Content Creation", "Community Education"],
        "programsLed": [{"name": "Educational Content Initiative", "detail": "Developing and refining financial literacy materials."}],
        "approach": "Effective educational content transforms complex financial concepts into accessible, practical knowledge.",
        "photo": "https://res.cloudinary.com/mzpdswax/image/upload/c_fill,w_300,h_400,f_auto,q_auto/finmentor/people/sylvan-jiao.jpg",
        "photoAlt": "Sylvan Jiao, Director of Educational Content Development.",
        "secondaryTitles": None, "boardRole": None, "founderNote": None, "linkedin": None, "joinedYear": None,
    },
    {
        "personId": "leo-wang", "slug": "leo-wang", "name": "Leo Wang",
        "section": "department", "sectionOrder": 2, "profileOrder": 15, "status": "active", "showOnWebsite": True,
        "primaryTitle": "Director of Finance Operations and Administration", "school": "Saddleback College",
        "tagline": "Supporting nonprofit operations and financial literacy event coordination.",
        "bio": "Leo Wang is a volunteer with FinMentor, supporting the organization's nonprofit community education programs and financial literacy events. He works closely with fellow volunteers to help coordinate event operations and create a welcoming experience for community members.",
        "extendedBio": [
            "Leo Wang is the Director of Finance and Administration at FinMentor, supporting nonprofit community education programs and financial literacy events.",
            "Currently pursuing a degree in Business Administration at Saddleback College with plans to transfer to UC Irvine, he focuses on business, finance, and community engagement.",
        ],
        "focusAreas": ["Finance Operations", "Event Coordination", "Community Service", "Business Administration"],
        "programsLed": [{"name": "Event Operations Support", "detail": "Coordinating logistics for community education events."}],
        "approach": "Practical business skills support sustainable nonprofit operations and community impact.",
        "photo": "https://res.cloudinary.com/mzpdswax/image/upload/c_fill,w_300,h_400,f_auto,q_auto/finmentor/people/leo-wang.jpg",
        "photoAlt": "Leo Wang, Director of Finance and Administration.",
        "linkedin": "https://www.linkedin.com/in/leo-wang-37a48b422",
        "secondaryTitles": None, "boardRole": None, "founderNote": None, "joinedYear": None,
    },
    {
        "personId": "amber-zheng", "slug": "amber-zheng", "name": "Xinyun (Amber) Zheng",
        "section": "department", "sectionOrder": 2, "profileOrder": 16, "status": "active", "showOnWebsite": True,
        "primaryTitle": "Director of Customer Service and Support", "school": "JSerra Catholic High School",
        "tagline": "Creating welcoming experiences for students, families, and community members.",
        "bio": "Amber Zheng is the Director of Customer Service and Support at FinMentor, where she helps create a welcoming experience for students, families, and community members. She supports customer service initiatives while contributing to FinMentor's educational outreach and community engagement.",
        "extendedBio": [
            "Amber Zheng is the Director of Customer Service and Support at FinMentor, helping create welcoming experiences for students, families, and community members.",
            "A student at JSerra Catholic High School with a strong interest in healthcare, she has developed valuable skills in communication, empathy, and teamwork through volunteer service.",
        ],
        "focusAreas": ["Customer Service", "Community Support", "Communication Skills", "Educational Outreach"],
        "programsLed": [{"name": "Participant Support Initiative", "detail": "Ensuring positive experiences for program participants."}],
        "approach": "Every participant deserves a welcoming, supportive experience that encourages continued engagement.",
        "photo": "https://res.cloudinary.com/mzpdswax/image/upload/c_fill,w_300,h_400,f_auto,q_auto/finmentor/people/amber-zheng.jpg",
        "photoAlt": "Amber Zheng, Director of Customer Service and Support.",
        "linkedin": "https://www.linkedin.com/in/amber-zheng-24332140a",
        "secondaryTitles": None, "boardRole": None, "founderNote": None, "joinedYear": None,
    },
    {
        "personId": "angela-yang", "slug": "angela-yang", "name": "Angela Yang",
        "section": "board", "sectionOrder": 3, "profileOrder": 1, "status": "active", "showOnWebsite": True,
        "primaryTitle": "Chair of the Board", "school": None,
        "tagline": "Dedicated to expanding access to education and empowering the next generation.",
        "bio": "Angela was born in Shanghai, China. She came to the United States to pursue her master's degree in Journalism and then her doctoral degree in Higher Education Administration as an international student. She understands the struggles that international students encounter on and off campus and is excited to get to know students and help them achieve their educational goals in the U.S. Angela has traveled to many countries throughout Asia. She has been in the field of international education for 25 years and loves working with students from around the world. Angela currently works for Saddleback College as the Director of International Student Program.",
        "extendedBio": [
            "Angela was born in Shanghai, China. She came to the United States to pursue her master's degree in Journalism and then her doctoral degree in Higher Education Administration as an international student.",
            "She understands the struggles that international students encounter on and off campus and is excited to get to know students and help them achieve their educational goals in the U.S.",
            "Angela has traveled to many countries throughout Asia. She has been in the field of international education for 25 years and loves working with students from around the world.",
            "Angela currently works for Saddleback College as the Director of International Student Program.",
        ],
        "focusAreas": ["International Education", "Higher Education Administration", "Student Development", "Cross-Cultural Communication"],
        "programsLed": [],
        "approach": "Education has the power to transform lives, and every student deserves access to opportunities that help them thrive.",
        "photo": "https://res.cloudinary.com/mzpdswax/image/upload/v1785112239/finmentor/people/angela-yang.jpg",
        "photoAlt": "Angela Yang, Chair of the Board.",
        "secondaryTitles": None, "boardRole": None, "founderNote": None, "linkedin": None, "joinedYear": None,
    },
    {
        "personId": "carson-wen", "slug": "carson-wen", "name": "Carson Wen",
        "section": "board", "sectionOrder": 3, "profileOrder": 2, "status": "active", "showOnWebsite": True,
        "primaryTitle": "Treasurer", "school": None,
        "tagline": "Committed to responsible financial stewardship and community service.",
        "bio": "After graduating from university, I built a long career in business management, gaining extensive experience in organizational operations, team leadership, and strategic management. Ten years ago, I founded an international education consulting organization in the United States, dedicated to providing Chinese students with professional study-abroad planning and application services. Through these efforts, I have helped numerous students gain admission to outstanding overseas institutions and achieve their dreams of receiving an international education.",
        "extendedBio": [
            "After graduating from university, I built a long career in business management, gaining extensive experience in organizational operations, team leadership, and strategic management.",
            "Ten years ago, I founded an international education consulting organization in the United States, dedicated to providing Chinese students with professional study-abroad planning and application services.",
            "Through these efforts, I have helped numerous students gain admission to outstanding overseas institutions and achieve their dreams of receiving an international education.",
            "At the same time, I have remained actively involved in community service and have long been committed to supporting new immigrants and their families as they integrate into American society.",
        ],
        "focusAreas": ["Business Management", "Strategic Planning", "International Education", "Community Service"],
        "programsLed": [],
        "approach": "Education has the power to transform lives, community service strengthens and unites neighborhoods, and cultural diversity contributes to a more vibrant and inclusive society.",
        "photo": "https://res.cloudinary.com/mzpdswax/image/upload/v1785112240/finmentor/people/carson-wen.jpg",
        "photoAlt": "Carson Wen, Treasurer.",
        "secondaryTitles": None, "boardRole": None, "founderNote": None, "linkedin": None, "joinedYear": None,
    },
    {
        "personId": "jason-wei", "slug": "jason-wei", "name": "Jason Wei",
        "section": "board", "sectionOrder": 3, "profileOrder": 3, "status": "active", "showOnWebsite": True,
        "primaryTitle": "Secretary", "school": None,
        "tagline": "Applying 20+ years of technology and finance experience to empower communities.",
        "bio": "Jason Wei brings over 20 years of extensive experience in internet technology and IT practices to FinMentor. Born in Yunnan, China, he began his career at Cisco China, where he developed deep expertise in technology infrastructure and enterprise solutions. Jason has been at the forefront of integrating AI technologies with financial services, applying his technical knowledge to create meaningful impact in the fintech space.",
        "extendedBio": [
            "Jason Wei brings over 20 years of extensive experience in internet technology and IT practices to FinMentor. Born in Yunnan, China, he began his career at Cisco China, where he developed deep expertise in technology infrastructure and enterprise solutions.",
            "Jason has been at the forefront of integrating AI technologies with financial services, applying his technical knowledge to create meaningful impact in the fintech space.",
            "Driven by a passion for community empowerment through education, Jason is committed to expanding financial literacy and digital inclusion across underserved communities.",
            "He believes that technology and education are powerful tools for positive social change, and he brings this conviction to every aspect of his work with FinMentor.",
        ],
        "focusAreas": ["Technology Infrastructure", "AI & FinTech", "Digital Transformation", "Community Empowerment"],
        "programsLed": [],
        "approach": "Technology and education are powerful tools for positive social change \u2014 when combined thoughtfully, they can transform communities.",
        "photo": "https://res.cloudinary.com/mzpdswax/image/upload/v1785112240/finmentor/people/jason-wei.jpg",
        "photoAlt": "Jason Wei, Secretary.",
        "secondaryTitles": None, "boardRole": None, "founderNote": None, "linkedin": None, "joinedYear": None,
    },
]

# ---------------------------------------------------------------------------
# 写出
# ---------------------------------------------------------------------------
for p in programs:
    w("programs", p["slug"], p)
w("", "programs-page", programs_page)  # 注意：file collection 用 programs-page.json
for n in program_news:
    w("program-news", n["slug"], n)
for u in upcoming:
    w("upcoming", u["slug"], u)
for p in people:
    w("people", p["slug"], clean(p))

print("DONE")
