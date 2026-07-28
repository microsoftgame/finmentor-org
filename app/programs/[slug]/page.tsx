import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, CheckCircle2, Calendar, Users } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Program data - in production this would come from CMS
const programsData: Record<string, {
  tag: string
  title: string
  summary: string
  audience: string
  image: string
  alt: string
  accent: string
  bullets: string[]
  overview: string
  highlights: string
  date?: string
  location?: string
  additionalImages?: { src: string; alt: string; caption?: string }[]
}> = {
  "money-smart-course-1": {
    tag: "CURRICULUM",
    title: "Money Smart Financial Literacy Program",
    summary: "An introductory financial literacy course focused on practical money skills for high school students.",
    audience: "High School Students (Grades 9–12)",
    image: "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/v1785162834/finmentor/programs/program-image-for-substitution.png",
    alt: "Students in a classroom learning financial literacy",
    accent: "bg-blue-500",
    bullets: [
      "Understanding Financial Choices",
      "Recognizing Spending Influences",
      "Building Healthy Money Habits",
      "Developing Financial Confidence",
    ],
    overview: "This course introduces practical financial concepts through interactive lessons, real-world examples, and classroom discussions. Students explore topics including spending, saving, consumer awareness, and responsible financial decision-making.",
    highlights: "Students participate in interactive discussions, real-life case studies, and collaborative activities that connect financial concepts with everyday situations. The course encourages critical thinking, responsible money habits, and confident financial decision-making.",
  },
  "international-volunteer": {
    tag: "LEADERSHIP",
    title: "International Volunteer — Exploring China",
    summary: "A one-time volunteer experience supporting cross-cultural workshops at Saddleback College through participant assistance and on-site event support.",
    audience: "High School & College Students",
    image: "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/finmentor/programs/international-volunteer.jpg",
    alt: "Student volunteers collaborating at Saddleback College",
    accent: "bg-amber-500",
    bullets: [
      "Event Support",
      "Team Collaboration",
      "Cross-Cultural Communication",
      "Community Service",
    ],
    overview: "FinMentor volunteers supported three cross-cultural workshops at Saddleback College, helping participants engage with topics related to Chinese culture, history, education, and economic development.",
    highlights: "Volunteers assisted with participant check-in, materials, event preparation, and on-site coordination during the three-day cultural exchange event held from March 11 to March 13.",
    date: "March 11–13, 2024",
    location: "Saddleback College",
  },
  "from-passion-to-excellence": {
    tag: "COMMUNITY",
    title: "From Passion to Excellence",
    summary: "An interactive workshop where students explored how personal interests can develop into meaningful skills through student stories, guest speakers, and group discussions.",
    audience: "Middle & High School Students",
    image: "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/finmentor/programs/from-passion-to-excellence.jpg",
    alt: "Student panel discussion workshop",
    accent: "bg-emerald-500",
    bullets: [
      "Discovering Personal Interests",
      "Setting Meaningful Goals",
      "Building Confidence",
      "Exploring Future Opportunities",
    ],
    overview: "Through student stories, guest presentations, and interactive discussions, participants explored how personal interests can grow into valuable skills, leadership experiences, and future academic or career opportunities.",
    highlights: "The workshop featured student panel discussions, guest speakers, audience Q&A, and real-life experiences that encouraged participants to reflect on their own interests and future development.",
  },
}

type ProgramDetailPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return Object.keys(programsData).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ProgramDetailPageProps) {
  const { slug } = await params
  const program = programsData[slug]

  if (!program) {
    return {}
  }

  return {
    title: `${program.title} | FinMentor`,
    description: program.summary,
  }
}

export default async function ProgramDetailPage({ params }: ProgramDetailPageProps) {
  const { slug } = await params
  const program = programsData[slug]

  if (!program) {
    notFound()
  }

  return (
    <div className="animate-in fade-in duration-500 pb-20 pt-24">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/programs"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-blue-600 transition-colors hover:text-blue-700"
        >
          <ArrowLeft className="size-4" />
          Programs
        </Link>
      </div>

      {/* Hero Section */}
      <section className="mt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            {/* Text Content */}
            <div>
              <span className={cn("inline-flex rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white", program.accent)}>
                {program.tag}
              </span>
              <h1 className="mt-6 font-heading text-5xl font-bold tracking-tight text-slate-900 md:text-6xl">
                {program.title}
              </h1>
              <p className="mt-6 max-w-3xl text-xl font-medium leading-relaxed text-slate-600">
                {program.summary}
              </p>

              {/* Meta Info */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">
                  <Users className="size-4 text-blue-600" />
                  For: {program.audience}
                </div>
                {program.date && (
                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">
                    <Calendar className="size-4 text-blue-600" />
                    {program.date}
                  </div>
                )}
                {program.location && (
                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">
                    {program.location}
                  </div>
                )}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-slate-200 shadow-xl">
              <Image
                src={program.image}
                alt={program.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 44vw"
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Outcomes Section */}
      <section className="mt-20 bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1fr] lg:items-start">
            {/* Outcomes Card */}
            <aside className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <h2 className="font-heading text-2xl font-bold tracking-tight text-slate-900">
                Key Outcomes
              </h2>
              <ul className="mt-6 space-y-4">
                {program.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />
                    <span className="font-medium leading-relaxed text-slate-700">{bullet}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={cn(buttonVariants({ size: "lg" }), "mt-8 w-full bg-blue-600 text-white hover:bg-blue-700")}
              >
                Get Involved
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </aside>

            {/* Content */}
            <article className="min-w-0 space-y-10">
              <section>
                <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900">
                  Program Overview
                </h2>
                <p className="mt-4 text-lg font-medium leading-relaxed text-slate-600">
                  {program.overview}
                </p>
              </section>

              <section>
                <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900">
                  {program.date ? "Event Highlights" : "Course Highlights"}
                </h2>
                <p className="mt-4 text-lg font-medium leading-relaxed text-slate-600">
                  {program.highlights}
                </p>
              </section>
            </article>
          </div>
        </div>
      </section>

      {/* Additional Images Section (Optional) */}
      {program.additionalImages && program.additionalImages.length > 0 && (
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900">
              Gallery
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {program.additionalImages.map((img, index) => (
                <div key={index} className="space-y-2">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-md">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  {img.caption && (
                    <p className="text-sm text-slate-500">{img.caption}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Programs CTA */}
      <section className="mt-16 bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
            >
              <ArrowLeft className="size-4" />
              Back to All Programs
            </Link>
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: "outline" }), "border-blue-600 text-blue-600 hover:bg-blue-50")}
            >
              Have Questions? Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
