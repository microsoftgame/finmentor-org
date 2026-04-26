import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, CheckCircle2 } from "lucide-react"

import { getNewsBySlug, getNewsStaticParams } from "@/lib/cms-content"

type NewsDetailPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getNewsStaticParams()
}

export async function generateMetadata({ params }: NewsDetailPageProps) {
  const { slug } = await params
  const article = await getNewsBySlug(slug)

  if (!article) {
    return {}
  }

  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt || article.description,
  }
}

function formatDate(article: Awaited<ReturnType<typeof getNewsBySlug>>) {
  if (!article) return ""
  if (article.date) return article.date
  if (!article.publishedAt) return ""

  return new Date(article.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

function renderRichText(content?: string) {
  if (!content) {
    return null
  }

  return (
    <div
      className="prose prose-slate max-w-none prose-headings:font-heading prose-headings:tracking-tight prose-a:text-blue-600 prose-strong:text-slate-950"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params
  const article = await getNewsBySlug(slug)

  if (!article) {
    notFound()
  }

  const date = formatDate(article)
  const image = article.coverImageUrl || article.image || ""
  const intro = article.excerpt || article.description || ""
  const sections = article.sectionsJson?.length
    ? article.sectionsJson
    : [
        {
          heading: "Story overview",
          body: intro,
        },
      ]

  return (
    <div className="animate-in fade-in duration-500 pb-20 pt-24">
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link href="/news" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
            <ArrowLeft className="size-4" />
            News & Impact
          </Link>
          <div className="mt-10 flex flex-wrap items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
            <span className="rounded-full bg-blue-600 px-4 py-1.5 text-white">
              {article.category || article.tag || "Impact"}
            </span>
            {date ? (
              <span className="inline-flex items-center gap-2">
                <Calendar className="size-4" />
                {date}
              </span>
            ) : null}
          </div>
          <h1 className="mt-6 font-heading text-5xl font-bold tracking-tight text-slate-900 md:text-7xl">
            {article.title}
          </h1>
          {intro ? <p className="mt-6 text-xl font-medium leading-relaxed text-slate-600">{intro}</p> : null}
        </div>
      </section>

      {image ? (
        <div className="mx-auto -mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] shadow-2xl">
            <Image
              src={image}
              alt={article.coverImageAlt || article.title}
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
          </div>
        </div>
      ) : null}

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
          <article className="min-w-0">
            {renderRichText(article.content) || (
              <div className="space-y-10">
                {sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900">{section.heading}</h2>
                    <p className="mt-4 text-lg font-medium leading-relaxed text-slate-600">{section.body}</p>
                  </section>
                ))}
              </div>
            )}
          </article>

          {article.quickFactsJson?.length ? (
            <aside className="h-fit rounded-[2rem] bg-slate-50 p-8 ring-1 ring-slate-200">
              <h2 className="font-heading text-2xl font-bold tracking-tight text-slate-900">Quick facts</h2>
              <div className="mt-6 space-y-4">
                {article.quickFactsJson.map((fact) => (
                  <div key={fact.label} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />
                    <div>
                      <div className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">{fact.label}</div>
                      <div className="mt-1 text-2xl font-black tracking-tight text-slate-950">{fact.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          ) : null}
        </div>
      </section>
    </div>
  )
}
