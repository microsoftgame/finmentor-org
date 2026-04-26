import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Award, CheckCircle2, Heart, ShieldCheck, Smartphone } from "lucide-react"

import { PageHero } from "@/components/PageHero"
import { SectionHeading } from "@/components/SectionHeading"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getHomepageContent } from "@/lib/cms-content"
import { cn } from "@/lib/utils"

export default async function HomePage() {
  const { hero, trustBar, impactStats, initiatives, appSection, fallback } = await getHomepageContent()
  const homeStats = (impactStats?.itemsJson?.length ? impactStats.itemsJson : fallback.homeStats) as typeof fallback.homeStats
  const initiativeCards = (initiatives?.itemsJson?.length ? initiatives.itemsJson : fallback.initiativeCards) as typeof fallback.initiativeCards
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
        subtitle={hero?.subtitle || "We provide accessible financial literacy learning opportunities, equipping students, families, and communities with the tools to thrive."}
        backgroundImage={hero?.imageUrl || "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"}
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
            "Inspired by FDIC Initiatives",
            "100% Free Public Programs",
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
                Measurable Community Impact.
              </h2>
              <p className="mt-6 text-lg font-medium leading-relaxed text-slate-600">
                {impactStats?.subtitle || "Our commitment to financial literacy and youth leadership translates into real-world outcomes for our community."}
              </p>
              <Link
                href="/news"
                className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em] text-blue-600 transition-colors hover:text-blue-800"
              >
                Read Impact Stories <ArrowRight className="size-4" />
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
            title="Core Initiatives."
            subtitle={initiatives?.subtitle || "Purpose-built educational frameworks designed for sustainable growth."}
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
                  Explore Initiative <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
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
              The Digital Experience
            </span>
            <h2 className="mt-6 font-heading text-4xl font-bold tracking-tight md:text-5xl">
              {appSection?.title || "Learn, Participate, and Track Your Journey."}
            </h2>
            <p className="mt-8 text-lg font-medium leading-relaxed text-blue-100/80">
              {appSection?.subtitle || "The Finmentor app is your dedicated secure portal to reserve courses, track volunteer hours, and manage your certificates."}
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
            <Link
              href="/app"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "mt-10 border-transparent text-[#0a1128] hover:bg-slate-200"
              )}
            >
              <Smartphone className="mr-2 size-5" />
              Discover the App
            </Link>
          </div>

          <div className="flex justify-center lg:w-1/2 [perspective:1200px]">
            <div
              className="relative flex h-[550px] w-72 flex-col overflow-hidden rounded-[3rem] border-[8px] border-slate-800 bg-slate-900 shadow-2xl transition-transform duration-700 ease-out hover:[transform:rotateY(0deg)_rotateX(0deg)]"
              style={{ transform: "rotateY(-10deg) rotateX(5deg)" }}
            >
              <div className="absolute left-1/2 top-0 z-20 mx-auto h-7 w-32 -translate-x-1/2 rounded-b-2xl bg-slate-800" />
              <div className="flex flex-1 flex-col gap-4 bg-slate-50 p-5 pt-12">
                <div className="flex h-28 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 text-sm font-bold text-white shadow-inner">
                  Dashboard UI Placeholder
                </div>
                <div className="rounded-2xl border border-slate-200/60 bg-white p-4 shadow-sm">
                  <div className="mb-3 h-3 w-1/2 rounded-full bg-slate-200" />
                  <div className="h-2 w-3/4 rounded-full bg-slate-100" />
                </div>
                <div className="rounded-2xl border border-slate-200/60 bg-white p-4 shadow-sm">
                  <div className="mb-3 h-3 w-1/3 rounded-full bg-slate-200" />
                  <div className="h-2 w-2/3 rounded-full bg-slate-100" />
                </div>
                <div className="mt-auto h-32 rounded-2xl border border-emerald-200/50 bg-gradient-to-br from-emerald-50 to-emerald-100" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
