import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Calendar, ChevronRight, TrendingUp } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getNewsContent, getPageMetadata } from "@/lib/cms-content"
import { cn } from "@/lib/utils"

export async function generateMetadata() {
  return getPageMetadata("news", {
    title: "News & Impact",
    description: "Read Finmentor program updates, impact stories, and community milestones.",
  })
}

export default async function NewsPage() {
  const { featuredStory, impactStats, impactStories, newsUpdates } = await getNewsContent()

  return (
    <div className="animate-in fade-in duration-500 pb-20 pt-24">
      <div className="mx-auto mb-20 mt-12 max-w-5xl px-4 text-center">
        <span className="block text-sm font-bold uppercase tracking-[0.24em] text-blue-600">
          News & Impact
        </span>
        <h1 className="mt-4 font-heading text-5xl font-bold tracking-tight text-slate-900 md:text-7xl">
          Stories, milestones, and community proof points.
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-xl font-medium leading-relaxed text-slate-600">
          This page keeps gv1&apos;s visual polish while carrying the richer program updates, impact snapshots, and human stories that made v1 feel more complete.
        </p>
      </div>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="group relative mb-20 overflow-hidden rounded-[2.5rem] shadow-2xl">
            <div className="absolute inset-0 z-10 bg-slate-900/30 transition-colors group-hover:bg-slate-900/40" />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
            <Image
              src={featuredStory.image}
              alt={featuredStory.title}
              width={2070}
              height={1380}
              priority
              className="h-[620px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 z-20 w-full p-8 md:p-16 lg:w-3/4">
              <div className="flex flex-wrap items-center gap-4 text-sm font-bold uppercase tracking-[0.18em] text-blue-50/90">
                <span className="rounded-full bg-amber-400 px-4 py-1.5 text-slate-900">{featuredStory.tag}</span>
                <span className="rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-sm">{featuredStory.category}</span>
                <span className="inline-flex items-center gap-2">
                  <Calendar className="size-4" />
                  {featuredStory.date}
                </span>
              </div>
              <h2 className="mt-6 font-heading text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
                {featuredStory.title}
              </h2>
              <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-blue-50">
                {featuredStory.description}
              </p>
              <Link href="/news/featured" className={cn(buttonVariants({ variant: "glass" }), "mt-8 border-white/40")}>
                Read Full Story <ArrowUpRight className="ml-2 size-4" />
              </Link>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900">
              Latest Updates
            </h2>
            <p className="mt-2 text-lg font-medium text-slate-600">
              Recent highlights, announcements, and field notes from our programs.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {newsUpdates.map((item) => (
              <Card
                key={item.title}
                className="group flex flex-col overflow-hidden border-slate-200/60 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
              >
                <Link href={`/news/${item.slug}`} className="flex flex-1 flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 z-10 bg-slate-900/0 transition-colors group-hover:bg-slate-900/10" />
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="flex flex-1 flex-col">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.18em]">
                    <span className="text-blue-600">{item.category}</span>
                    <span className="text-slate-300">/</span>
                    <span className="text-slate-500">{item.date}</span>
                  </div>
                  <h3 className="mt-3 font-heading text-xl font-bold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-blue-600">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 font-medium leading-relaxed text-slate-600">
                    {item.excerpt}
                  </p>
                  <div className="mt-6 text-sm font-bold uppercase tracking-[0.22em] text-slate-400 transition-colors group-hover:text-slate-900">
                    <span className="inline-flex items-center gap-1">
                      Read More <ChevronRight className="size-4" />
                    </span>
                  </div>
                </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#0a1128] py-24 text-white">
        <div className="bg-noise absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
              Our Impact at a Glance
            </h2>
            <p className="mt-3 text-lg font-medium text-blue-100/75">
              Measuring the difference we make together.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((stat) => (
              <div key={stat.label} className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center">
                <TrendingUp className="mx-auto mb-4 size-8 text-amber-300" />
                <p className="text-4xl font-black tracking-tight md:text-5xl">{stat.number}</p>
                <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-blue-100/70">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Impact Stories
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg font-medium text-slate-600">
              Real stories from students, volunteers, and families whose lives changed through practical education.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {impactStories.map((story) => (
              <Card key={story.title} className="group overflow-hidden border-slate-200/70 transition-all hover:shadow-lg">
                <Link href={`/news/${story.slug}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent>
                  <span className="text-sm font-bold uppercase tracking-[0.18em] text-amber-500">
                    {story.category}
                  </span>
                  <h3 className="mt-3 font-heading text-xl font-bold tracking-tight text-slate-900">
                    {story.title}
                  </h3>
                  <p className="mt-3 font-medium leading-relaxed text-slate-600">{story.description}</p>
                </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-amber-400 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-4xl font-bold tracking-tight text-slate-950">
            Support the work behind the stories.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-medium leading-relaxed text-slate-900/75">
            Your support helps us keep expanding free programs, volunteer training, and community-centered financial education.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/support" className={cn(buttonVariants({ size: "lg" }), "bg-slate-950 text-white hover:bg-slate-800")}>
              Support Our Mission
            </Link>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-slate-950 text-slate-950 hover:bg-slate-950 hover:text-white"
              )}
            >
              Stay Connected
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
