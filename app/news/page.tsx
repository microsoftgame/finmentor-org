import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { getProgramNews } from "@/lib/content"

export async function generateMetadata() {
  return {
    title: "News & Impact | FinMentor",
    description:
      "Stories, event highlights, and community milestones from FinMentor programs.",
    // /news 整页本期不对外激活
    robots: { index: false, follow: false },
  }
}

export default async function NewsPage() {
  const news = getProgramNews()

  return (
    <div className="animate-in fade-in duration-500 pb-20 pt-24">
      <div className="mx-auto mb-20 mt-12 max-w-5xl px-4 text-center">
        <span className="block text-sm font-bold uppercase tracking-[0.24em] text-blue-600">
          News & Impact
        </span>
        <h1 className="mt-4 font-heading text-5xl font-bold tracking-tight text-slate-900 md:text-7xl">
          Stories, milestones, and community impact.
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-xl font-medium leading-relaxed text-slate-600">
          Explore stories, event highlights, and community milestones that showcase how financial education is making a difference.
        </p>
      </div>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900">
              Latest Updates
            </h2>
            <p className="mt-2 text-lg font-medium text-slate-600">
              Recent highlights, announcements, and impact stories from our programs.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <Link
                key={item.slug}
                href={`/programs/news/${item.slug}`}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                <Card className="group h-full border-slate-200/60 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
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
                        Read More <ArrowUpRight className="size-4" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
