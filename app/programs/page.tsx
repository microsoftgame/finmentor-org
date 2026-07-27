import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BookOpen, Calendar, GraduationCap, Heart, MapPin, Users } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getPageMetadata } from "@/lib/cms-content"
import { newsUpdates, programImpactBullets } from "@/lib/site-data"
import { cn } from "@/lib/utils"

const programIcons = [GraduationCap, Users, Heart, BookOpen]

export async function generateMetadata() {
  return getPageMetadata("programs", {
    title: "Programs",
    description:
      "Explore FinMentor courses, workshops, leadership outreach, and financial education resources.",
  })
}

export default async function ProgramsPage() {
  return (
    <div className="animate-in fade-in duration-500 pb-20 pt-24">
      {/* Hero */}
      <div className="mx-auto mb-20 mt-12 max-w-5xl px-4 text-center">
        <span className="block text-sm font-bold uppercase tracking-[0.24em] text-blue-600">
          FinMentor Programs
        </span>
        <h1 className="mt-4 font-heading text-5xl font-bold tracking-tight text-slate-900 md:text-7xl">
          Programs built for students, families, and communities.
        </h1>
        <p className="mx-auto mt-8 max-w-3xl text-xl font-medium leading-relaxed text-slate-600">
          We make financial education accessible through engaging programs and practical resources, helping students, families, and communities build the knowledge and confidence to make informed financial decisions.
        </p>
      </div>

      {/* Programs Section */}
      <section className="border-t border-slate-200/60 bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {programIcons.map((Icon, index) => {
              const programs = [
                {
                  tag: "CURRICULUM",
                  title: "Money Smart Financial Literacy Course 1",
                  slug: "money-smart-course-1",
                  summary: "An introductory financial literacy course focused on practical money skills for high school students.",
                  bullets: ["Financial Decision-Making", "Spending Awareness", "Saving Strategies", "Responsible Money Habits"],
                  audience: "High School Students (Grades 9–12)",
                  image: "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/finmentor/programs/money-smart-course-1.jpg",
                  alt: "Students in a classroom learning financial literacy",
                  accent: "bg-blue-500",
                },
                {
                  tag: "LEADERSHIP",
                  title: "International Volunteer — Exploring China",
                  slug: "international-volunteer",
                  summary: "Students supported a cross-cultural campus event while gaining practical experience in teamwork, communication, and community service.",
                  bullets: ["Event Support", "Team Collaboration", "Cross-Cultural Communication", "Community Service"],
                  audience: "High School & College Students",
                  image: "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/finmentor/programs/international-volunteer.jpg",
                  alt: "Student volunteers collaborating",
                  accent: "bg-amber-500",
                },
                {
                  tag: "COMMUNITY",
                  title: "From Passion to Excellence",
                  slug: "from-passion-to-excellence",
                  summary: "An interactive workshop helping students explore interests, develop practical skills, and discover pathways for personal and academic growth.",
                  bullets: ["Self-Discovery", "Goal Setting", "Career Exploration", "Leadership & Communication"],
                  audience: "Middle & High School Students",
                  image: "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/finmentor/programs/from-passion-to-excellence.jpg",
                  alt: "Student panel discussion workshop",
                  accent: "bg-emerald-500",
                },
              ]

              const program = programs[index]
              if (!program) return null

              return (
                <div
                  key={program.slug}
                  className={`flex flex-col items-center gap-12 lg:gap-20 ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"}`}
                >
                  <div className="w-full lg:w-1/2">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-slate-200 shadow-xl">
                      <Image
                        src={program.image}
                        alt={program.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className={cn("absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white", program.accent)}>
                        {program.tag}
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-1/2">
                    <div className={cn("mb-6 flex size-14 items-center justify-center rounded-2xl text-white shadow-sm", program.accent)}>
                      <Icon className="size-7" />
                    </div>
                    <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                      {program.title}
                    </h2>
                    <p className="mt-6 text-lg font-medium leading-relaxed text-slate-600">
                      {program.summary}
                    </p>

                    <div className="mt-6">
                      <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                        What Participants Learn
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {program.bullets.map((bullet) => (
                          <span
                            key={bullet}
                            className="rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-700 ring-1 ring-slate-200"
                          >
                            {bullet}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600">
                      <Users className="size-4 text-blue-600" />
                      For: {program.audience}
                    </div>

                    <Link
                      href={`/programs/${program.slug}`}
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "mt-8 border-blue-600 text-blue-600 hover:bg-blue-50"
                      )}
                    >
                      Learn More
                      <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Latest Updates Section - Past Events */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Program & Event Highlights
              </h2>
              <p className="mt-2 text-lg font-medium text-slate-600">
                Stay informed about FinMentor programs, events, and community impact stories.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {newsUpdates.map((update) => (
              <Card key={update.title} className="border-slate-200/70 bg-slate-50 overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={update.image}
                    alt={update.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <CardContent className="pt-4">
                  <div className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                    <Calendar className="size-3" />
                    {update.category}
                  </div>
                  <h3 className="font-heading text-lg font-bold tracking-tight text-slate-900 line-clamp-2">
                    {update.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 line-clamp-2">
                    {update.excerpt}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-xs font-medium text-slate-400">
                    <Calendar className="size-3" />
                    {update.date}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Opportunities Section */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Upcoming Opportunities
              </h2>
              <p className="mt-2 text-lg font-medium text-slate-600">
                Explore our upcoming courses, community visits, and volunteer opportunities.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-slate-200/70 bg-white">
              <CardContent className="pt-6">
                <div className="mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                  <Calendar className="size-4" />
                  Fall Program
                </div>
                <h3 className="font-heading text-xl font-bold tracking-tight text-slate-900">
                  Youth Investment & Capital Markets Program
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Build real-world investing skills through guided lessons, a $100,000 virtual portfolio, team research, and presentations.
                </p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm font-medium text-slate-500">
                  <span>Enrollment Open · September–November 2026</span>
                </div>
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-4 w-full border-blue-600 text-blue-600 hover:bg-blue-50")}
                >
                  Contact Us to Enroll
                </Link>
              </CardContent>
            </Card>

            <Card className="border-slate-200/70 bg-white">
              <CardContent className="pt-6">
                <div className="mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
                  <Calendar className="size-4" />
                  Community Visit
                </div>
                <h3 className="font-heading text-xl font-bold tracking-tight text-slate-900">
                  Bank of America Branch Visit
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Explore branch operations, customer service, and banking careers through an in-person visit, professional insights, and Q&A.
                </p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm font-medium text-slate-500">
                  <span>Planned for Fall 2026 · Details Coming Soon</span>
                </div>
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-4 w-full border-emerald-600 text-emerald-600 hover:bg-emerald-50")}
                >
                  Contact Us for Updates
                </Link>
              </CardContent>
            </Card>

            <Card className="border-slate-200/70 bg-white">
              <CardContent className="pt-6">
                <div className="mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-amber-600">
                  <Calendar className="size-4" />
                  Volunteer
                </div>
                <h3 className="font-heading text-xl font-bold tracking-tight text-slate-900">
                  Student Volunteer Program
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Support financial literacy programs and community events while gaining leadership experience and earning service hours.
                </p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm font-medium text-slate-500">
                  <span>Now Recruiting · Rolling Applications</span>
                </div>
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-4 w-full border-amber-600 text-amber-600 hover:bg-amber-50")}
                >
                  Contact Us to Volunteer
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div className="relative">
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
              <Image
                src="https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/finmentor/impact-in-action"
                alt="Community impact in action"
                width={1200}
                height={900}
                className="h-[440px] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-3xl bg-amber-400 p-6 text-slate-950 shadow-xl">
              <div className="flex items-center gap-3">
                <BookOpen className="size-6" />
                <div>
                  <p className="text-2xl font-black tracking-tight">Real World</p>
                  <p className="text-sm font-bold uppercase tracking-[0.18em]">Financial Learning</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Impact in Action
            </h2>
            <p className="mt-6 text-lg font-medium leading-relaxed text-slate-600">
              Every workshop, course, and community event creates meaningful outcomes. Explore stories, event highlights, and community milestones that show how financial education is making a difference.
            </p>
            <ul className="mt-8 space-y-4">
              {programImpactBullets.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="mt-0.5 flex size-6 items-center justify-center rounded-full bg-emerald-100">
                    <span className="text-sm text-emerald-600">+</span>
                  </div>
                  <span className="font-medium text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-[#0a1128] py-20 text-white">
        <div className="bg-noise absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-4xl font-bold tracking-tight">
            Partner with us to create lasting community impact.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-medium leading-relaxed text-blue-100/75">
            Schools, community organizations, and businesses can partner with FinMentor to expand access to practical financial education and create lasting impact.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/support" className={cn(buttonVariants({ variant: "brandGold", size: "lg" }))}>
              Partner With Us
            </Link>
            <Link href="/contact" className={cn(buttonVariants({ variant: "glass", size: "lg" }))}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
