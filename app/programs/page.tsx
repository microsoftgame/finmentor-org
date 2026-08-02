import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BookOpen, Calendar, GraduationCap, Heart, Users } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  getProgramsPage,
  getPrograms,
  getProgramNews,
  getUpcoming,
  type Program,
  type Upcoming,
} from "@/lib/content"

const programIcons = [GraduationCap, Users, Heart, BookOpen]

// accent 配色映射（bg-* 派生 text-* / CTA 描边色）
const accentText: Record<string, string> = {
  "bg-blue-600": "text-blue-600",
  "bg-emerald-600": "text-emerald-600",
  "bg-amber-600": "text-amber-600",
}
const accentCta: Record<string, string> = {
  "bg-blue-600": "border-blue-600 text-blue-600 hover:bg-blue-50",
  "bg-emerald-600": "border-emerald-600 text-emerald-600 hover:bg-emerald-50",
  "bg-amber-600": "border-amber-600 text-amber-600 hover:bg-amber-50",
}

export async function generateMetadata() {
  return {
    title: "Programs | FinMentor",
    description:
      "Explore FinMentor courses, workshops, leadership outreach, and financial education resources.",
  }
}

export default async function ProgramsPage() {
  const page = getProgramsPage()
  const programs = getPrograms()
  const news = getProgramNews()
  const upcoming = getUpcoming()

  return (
    <div className="animate-in fade-in duration-500 pb-20 pt-24">
      {/* Hero */}
      <div className="mx-auto mb-20 mt-12 max-w-5xl px-4 text-center">
        <span className="block text-sm font-bold uppercase tracking-[0.24em] text-blue-600">
          {page.heroEyebrow}
        </span>
        <h1 className="mt-4 font-heading text-5xl font-bold tracking-tight text-slate-900 md:text-7xl">
          {page.heroTitle}
        </h1>
        <p className="mx-auto mt-8 max-w-3xl text-xl font-medium leading-relaxed text-slate-600">
          {page.heroSubtitle}
        </p>
      </div>

      {/* Programs Section */}
      <section className="border-t border-slate-200/60 bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {programs.map((program: Program, index) => {
              const Icon = programIcons[index % programIcons.length]
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

      {/* Latest Updates Section - Program & Event Highlights */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                {page.sectionHighlightsTitle}
              </h2>
              <p className="mt-2 text-lg font-medium text-slate-600">
                {page.sectionHighlightsSubtitle}
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((update) => (
              <Link
                key={update.slug}
                href={`/programs/news/${update.slug}`}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                <Card className="group h-full border-slate-200/70 bg-slate-50 overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={update.image}
                      alt={update.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="pt-4">
                    <div className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                      <Calendar className="size-3" />
                      {update.category}
                    </div>
                    <h3 className="font-heading text-lg font-bold leading-snug tracking-tight text-slate-900 line-clamp-2">
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
              </Link>
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
                {page.sectionUpcomingTitle}
              </h2>
              <p className="mt-2 text-lg font-medium text-slate-600">
                {page.sectionUpcomingSubtitle}
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {upcoming.map((u: Upcoming) => (
              <Card key={u.slug} className="border-slate-200/70 bg-white">
                <CardContent className="pt-6">
                  <div className={cn("mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em]", accentText[u.accent] ?? "text-blue-600")}>
                    <Calendar className="size-4" />
                    {u.tag}
                  </div>
                  <h3 className="font-heading text-xl font-bold tracking-tight text-slate-900">
                    {u.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    {u.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3 text-sm font-medium text-slate-500">
                    <span>{u.period}</span>
                  </div>
                  <Link
                    href={u.ctaHref}
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-4 w-full", accentCta[u.accent] ?? "border-blue-600 text-blue-600 hover:bg-blue-50")}
                  >
                    {u.ctaLabel}
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div className="relative">
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
              <Image
                src={page.impactImage}
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
                  <p className="text-2xl font-black tracking-tight">{page.impactBadgeTitle}</p>
                  <p className="text-sm font-bold uppercase tracking-[0.18em]">{page.impactBadgeSubtitle}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              {page.impactTitle}
            </h2>
            <p className="mt-6 text-lg font-medium leading-relaxed text-slate-600">
              {page.impactSubtitle}
            </p>
            <ul className="mt-8 space-y-4">
              {page.impactBullets.map((item) => (
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
            {page.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-medium leading-relaxed text-blue-100/75">
            {page.ctaSubtitle}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href={page.ctaPrimaryHref} className={cn(buttonVariants({ variant: "brandGold", size: "lg" }))}>
              {page.ctaPrimaryLabel}
            </Link>
            <Link href={page.ctaSecondaryHref} className={cn(buttonVariants({ variant: "glass", size: "lg" }))}>
              {page.ctaSecondaryLabel}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
