import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Award, CheckCircle2, Heart, ShieldCheck } from "lucide-react"

import { PageHero } from "@/components/PageHero"
import { SectionHeading } from "@/components/SectionHeading"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getHomepageContent } from "@/lib/cms-content"
import { getPrograms } from "@/lib/content"
import { cn } from "@/lib/utils"

export default async function HomePage() {
  const { hero, trustBar, impactStats, initiatives, appSection, fallback } = await getHomepageContent()
  const homeStats = (impactStats?.itemsJson?.length ? impactStats.itemsJson : fallback.homeStats) as typeof fallback.homeStats
  // Core Initiatives 与 /programs 共用同一份内容（content/programs），
  // 取前三个可见项目，顺序由 sortOrder 决定，避免两处文案/图片/顺序不一致。
  const initiativeCards = getPrograms()
    .slice(0, 3)
    .map((program) => ({
      title: program.title,
      description: program.summary,
      tag: program.tag,
      image: program.image,
      alt: program.alt,
      href: `/programs/${program.slug}`,
    }))
  const appFeatureList = (appSection?.itemsJson?.length ? appSection.itemsJson : fallback.appFeatureList) as typeof fallback.appFeatureList

  return (
    <div className="animate-in fade-in duration-500">
      <PageHero
        eyebrow={hero?.eyebrow || "A U.S. Nonprofit Organization"}
        title={
          <span>
            {(hero?.title || "Empowering Youth Through Financial Education").replace("Financial Education", "")}{" "}
            <span className="bg-gradient-to-r from-amber-300 to-amber-100 bg-clip-text text-transparent">
              Financial Education
            </span>
          </span>
        }
        subtitle={hero?.subtitle || "We make financial education accessible through engaging programs and practical resources, helping students, families, and communities build the knowledge and confidence to make informed financial decisions."}
        backgroundImage={hero?.imageUrl || "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/finmentor/impact-in-action"}
        actions={hero?.actionJson?.length ? [...hero.actionJson] : [
          { label: "Explore Programs", href: "/programs", variant: "brandGold" },
          { label: "Support Our Mission", href: "/support", variant: "glass" },
        ]}
        priority
      />

      <section className="relative z-10 -mt-2 border-b border-slate-200 bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-12 gap-y-6 px-4 text-sm font-bold uppercase tracking-[0.22em] text-slate-600 sm:px-6 lg:px-8">
          {((trustBar?.itemsJson as string[] | undefined) || [
            "Registered 501(c)(3) Nonprofit",
            "Member of the FDIC Money Smart Alliance",
            "Real-World Financial Learning",
          ]).map((item, index) => {
            const Icon = [ShieldCheck, Award, Heart][index] || ShieldCheck
            return (
              <div key={item} className="flex items-center gap-3">
                <Icon className="size-5 text-blue-600" />
                {item}
              </div>
            )
          })}
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-50 py-24">
        <div className="absolute right-0 top-0 h-full w-1/2 translate-x-1/4 skew-x-12 bg-slate-100/60" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-16 md:flex-row">
            <div className="md:w-1/3">
              <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Measurable Community Impact
              </h2>
              <p className="mt-6 text-lg font-medium leading-relaxed text-slate-600">
                {impactStats?.subtitle || "Our programs create measurable outcomes for students, volunteers, and the communities we serve."}
              </p>
              <Link
                href="/programs"
                className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em] text-blue-600 transition-colors hover:text-blue-800"
              >
                Explore Programs <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="grid md:w-2/3 grid-cols-2 gap-4 md:gap-6">
              {homeStats.map((stat) => (
                <Card
                  key={stat.label}
                  className={cn(
                    "border-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
                    stat.surface,
                    stat.offset && "md:translate-y-8"
                  )}
                >
                  <CardContent>
                    <div className={cn("text-4xl font-black tracking-tight md:text-5xl", stat.tone)}>
                      {stat.value}
                    </div>
                    <div className="mt-3 text-sm font-bold uppercase tracking-[0.22em] text-slate-500">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Core Initiatives"
            subtitle={initiatives?.subtitle || "Practical programs designed to build lifelong financial confidence."}
          />
          <div className="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-3">
            {initiativeCards.map((initiative) => (
              <Link
                key={initiative.title}
                href={initiative.href}
                className="group block rounded-2xl p-2 transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500"
              >
                <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 z-10 bg-slate-900/10 transition-colors group-hover:bg-transparent" />
                  <Image
                    src={initiative.image}
                    alt={initiative.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 z-20 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-900 backdrop-blur-sm">
                    {initiative.tag}
                  </div>
                </div>
                <h3 className="font-heading text-2xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600">
                  {initiative.title}
                </h3>
                <p className="mt-3 font-medium leading-relaxed text-slate-600">
                  {initiative.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
                  Learn More <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0a1128] py-24 text-white md:py-32">
        <div className="bg-noise absolute inset-0" />
        <div className="absolute left-1/4 top-1/2 size-96 -translate-y-1/2 rounded-full bg-blue-600/30 blur-[100px]" />
        <div className="absolute right-1/4 top-1/2 size-96 -translate-y-1/2 rounded-full bg-amber-400/20 blur-[100px]" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-16 px-4 sm:px-6 lg:flex-row lg:px-8">
          <div className="lg:w-1/2">
            <span className="block text-sm font-bold uppercase tracking-[0.24em] text-amber-300">
              The FinMentor App
            </span>
            <h2 className="mt-6 font-heading text-4xl font-bold tracking-tight md:text-5xl">
              {appSection?.title || "Learn, Participate, and Track Your Journey"}
            </h2>
            <p className="mt-8 text-lg font-medium leading-relaxed text-blue-100/80">
              {appSection?.subtitle || "The FinMentor app lets you register for courses, track volunteer hours, and securely manage your certificates—all in one place."}
            </p>
            <ul className="mt-10 space-y-5">
              {appFeatureList.map((item) => (
                <li key={item} className="flex items-center gap-4 text-lg font-medium">
                  <div className="rounded-full border border-blue-400/30 bg-blue-500/20 p-1.5">
                    <CheckCircle2 className="size-5 text-blue-300" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="https://apps.apple.com/cn/app/fin-mentor/id6737214681"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0a1128] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-800"
              >
                <svg viewBox="0 0 24 24" className="mr-2 size-5" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                App Store
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.courseappAnd.finmentor"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0a1128] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-800"
              >
                <svg viewBox="0 0 24 24" className="mr-2 size-5" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.61 6.115V6.806l8.308 5.901zm3.83-3.83l2.79 2.79c.243.243.243.635 0 .878l-2.79 2.79-2.301-2.302 2.301-2.303zM5.393 3.527l8.308 5.901-2.302 2.302-8.308-5.901 2.302-2.302z"/>
                </svg>
                Google Play
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:w-1/2 [perspective:1200px]">
            <div
              className="relative flex h-[550px] w-72 flex-col overflow-hidden rounded-[3rem] border-[8px] border-slate-800 bg-slate-900 shadow-2xl transition-transform duration-700 ease-out hover:[transform:rotateY(0deg)_rotateX(0deg)]"
              style={{ transform: "rotateY(-10deg) rotateX(5deg)" }}
            >
              <div className="absolute left-1/2 top-0 z-20 mx-auto h-7 w-32 -translate-x-1/2 rounded-b-2xl bg-slate-800" />
              <div className="rounded-b-3xl bg-blue-600 px-6 pb-8 pt-14 text-white shadow-sm">
                <h3 className="font-heading text-2xl font-bold tracking-tight">Hello, Student!</h3>
                <p className="mt-1 text-sm font-medium text-blue-100">Ready to learn today?</p>
              </div>
              <div className="flex flex-1 flex-col gap-4 bg-slate-50 p-6">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-heading text-lg font-bold tracking-tight text-slate-900">
                    My Schedule
                  </span>
                  <span className="text-sm font-bold text-blue-600">See All</span>
                </div>
                <div className="rounded-3xl border border-slate-200/60 bg-white p-5 shadow-sm">
                  <div className="text-sm font-extrabold tracking-tight text-slate-900">
                    Credit Basics Workshop
                  </div>
                  <div className="mt-1.5 text-xs font-medium text-slate-500">Tomorrow, 4:00 PM</div>
                </div>
                <div className="rounded-3xl border border-slate-200/60 bg-white p-5 shadow-sm opacity-60">
                  <div className="text-sm font-extrabold tracking-tight text-slate-900">
                    Budgeting 101
                  </div>
                  <div className="mt-1.5 text-xs font-medium text-slate-500">Completed</div>
                </div>
                <div className="mt-auto flex items-center justify-between rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
                  <div>
                    <div className="text-sm font-bold text-emerald-900">Volunteer Hours</div>
                    <div className="mt-1 text-3xl font-black tracking-tight text-emerald-600">
                      12.5 <span className="text-sm font-bold text-emerald-600/70">hrs</span>
                    </div>
                  </div>
                  <Award className="size-10 text-emerald-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
