import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BookOpen, Calendar, GraduationCap, Heart, TrendingUp, Users } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getPublishedCollection } from "@/lib/cms"
import { getPageMetadata, getProgramsContent } from "@/lib/cms-content"
import {
  programImpactBullets,
  upcomingEvents as fallbackUpcomingEvents,
} from "@/lib/site-data"
import { cn } from "@/lib/utils"

const programIcons = [GraduationCap, Users, Heart, BookOpen]

export async function generateMetadata() {
  return getPageMetadata("programs", {
    title: "Programs",
    description:
      "Explore Finmentor courses, workshops, leadership outreach, and financial education resources.",
  })
}

export default async function ProgramsPage() {
  const programs = await getProgramsContent()
  const upcomingEvents = await getPublishedCollection("events", fallbackUpcomingEvents)

  return (
    <div className="animate-in fade-in duration-500 pb-20 pt-24">
      <div className="mx-auto mb-20 mt-12 max-w-5xl px-4 text-center">
        <span className="block text-sm font-bold uppercase tracking-[0.24em] text-blue-600">
          Community Initiatives
        </span>
        <h1 className="mt-4 font-heading text-5xl font-bold tracking-tight text-slate-900 md:text-7xl">
          Programs built for students, families, and neighborhoods.
        </h1>
        <p className="mx-auto mt-8 max-w-3xl text-xl font-medium leading-relaxed text-slate-600">
          This page keeps the original gv1 design language while carrying the fuller program story from v1: broader offerings, clearer audiences, and more concrete outcomes.
        </p>
      </div>

      <section className="border-t border-slate-200/60 bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {programs.map((program, index) => {
              const Icon = programIcons[index % programIcons.length]

              return (
                <div
                  key={program.title}
                  className={`flex flex-col items-center gap-12 lg:gap-20 ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"}`}
                >
                  <div className="w-full lg:w-1/2">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-slate-200 shadow-xl">
                      <Image
                        src={program.image}
                        alt={program.alt || program.title}
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
                      {program.description}
                    </p>

                    <div className="mt-6">
                      <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                        What participants learn
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
                      {program.cta || "Learn More"}
                      <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Upcoming Opportunities
              </h2>
              <p className="mt-2 text-lg font-medium text-slate-600">
                Events, trainings, and open sessions that keep the community engaged year-round.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {upcomingEvents.map((event) => (
              <Card key={event.title} className="border-slate-200/70 bg-slate-50">
                <CardContent>
                  <div className="mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                    <Calendar className="size-4" />
                    {event.type}
                  </div>
                  <h3 className="font-heading text-xl font-bold tracking-tight text-slate-900">{event.title}</h3>
                  <div className="mt-4 flex flex-wrap gap-3 text-sm font-medium text-slate-500">
                    <span>{event.date}</span>
                    <span className="text-slate-300">/</span>
                    <span>{event.location}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div className="relative">
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop"
                alt="Community impact in action"
                width={1200}
                height={900}
                className="h-[440px] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-3xl bg-amber-400 p-6 text-slate-950 shadow-xl">
              <div className="flex items-center gap-3">
                <TrendingUp className="size-6" />
                <div>
                  <p className="text-2xl font-black tracking-tight">100%</p>
                  <p className="text-sm font-bold uppercase tracking-[0.18em]">Free Programs</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Impact in Action
            </h2>
            <p className="mt-6 text-lg font-medium leading-relaxed text-slate-600">
              Every program we deliver creates ripples through the community, from students gaining confidence to families building financial security.
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
            <Link
              href="/news"
              className={cn(buttonVariants({ size: "lg" }), "mt-8 bg-blue-600 text-white hover:bg-blue-700")}
            >
              See Our Impact Stories
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative bg-[#0a1128] py-20 text-white">
        <div className="bg-noise absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-4xl font-bold tracking-tight">
            Partner with us to bring financial literacy further.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-medium leading-relaxed text-blue-100/75">
            Schools, community organizations, and businesses can collaborate with Finmentor to expand access to practical education.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/support" className={cn(buttonVariants({ variant: "brandGold", size: "lg" }))}>
              Become a Partner
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
