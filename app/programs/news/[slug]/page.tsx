import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getProgramNewsBySlug, getProgramNewsSlugs } from "@/lib/content"
import { renderNewsBody } from "@/lib/markdown"

type ProgramNewsDetailPageProps = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  return getProgramNewsSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ProgramNewsDetailPageProps) {
  const { slug } = await params
  const news = getProgramNewsBySlug(slug)

  if (!news) {
    return {}
  }

  return {
    title: `${news.title} | FinMentor`,
    description: news.excerpt,
  }
}

export default async function ProgramNewsDetailPage({ params }: ProgramNewsDetailPageProps) {
  const { slug } = await params
  const news = getProgramNewsBySlug(slug)

  if (!news) {
    notFound()
  }

  // 正文可选：为空则不渲染正文区
  const bodyNodes = renderNewsBody(news.body)

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
              <span className="inline-flex rounded-full bg-blue-600 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white">
                {news.category}
              </span>
              <h1 className="mt-6 font-heading text-5xl font-bold tracking-tight text-slate-900 md:text-6xl">
                {news.title}
              </h1>
              <p className="mt-6 max-w-3xl text-xl font-medium leading-relaxed text-slate-600">
                {news.excerpt}
              </p>

              {/* Meta Info */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">
                  <Calendar className="size-4 text-blue-600" />
                  {news.date}
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-slate-200 shadow-xl">
              <Image
                src={news.image}
                alt={news.title}
                fill
                sizes="(max-width: 1024px) 100vw, 44vw"
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Body Section (optional) */}
      {bodyNodes.length > 0 && (
        <section className="mt-20 bg-slate-50 py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <article className="space-y-6">{bodyNodes}</article>
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
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
