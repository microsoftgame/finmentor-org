import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, CheckCircle2, Users } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { getProgramBySlug, getProgramStaticParams } from "@/lib/cms-content"
import { cn } from "@/lib/utils"

type ProgramDetailPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getProgramStaticParams()
}

export async function generateMetadata({ params }: ProgramDetailPageProps) {
  const { slug } = await params
  const program = await getProgramBySlug(slug)

  if (!program) {
    return {}
  }

  return {
    title: program.seoTitle || program.title,
    description: program.seoDescription || program.description,
  }
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

export default async function ProgramDetailPage({ params }: ProgramDetailPageProps) {
  const { slug } = await params
  const program = await getProgramBySlug(slug)

  if (!program) {
    notFound()
  }

  const bullets: readonly string[] = Array.isArray(program.bullets) ? program.bullets : []
  const sections: readonly { heading: string; body: string }[] = program.sectionsJson?.length
    ? program.sectionsJson
    : [
        {
          heading: "What this program covers",
          body: program.description,
        },
        {
          heading: "Learning outcomes",
          body: bullets.join(", "),
        },
      ]

  return (
    <div className="animate-in fade-in duration-500 pb-20 pt-24">
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/programs" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
            <ArrowLeft className="size-4" />
            Programs
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <span className={cn("inline-flex rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white", program.accent || "bg-blue-600")}>
                {program.tag || "Program"}
              </span>
              <h1 className="mt-6 font-heading text-5xl font-bold tracking-tight text-slate-900 md:text-7xl">
                {program.title}
              </h1>
              <p className="mt-6 max-w-3xl text-xl font-medium leading-relaxed text-slate-600">
                {program.description}
              </p>
              {program.audience ? (
                <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 ring-1 ring-slate-200">
                  <Users className="size-4 text-blue-600" />
                  For: {program.audience}
                </div>
              ) : null}
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-slate-200 shadow-xl">
              <Image
                src={program.image}
                alt={program.alt || program.title}
                fill
                sizes="(max-width: 1024px) 100vw, 44vw"
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.75fr_1fr] lg:px-8">
          <aside className="rounded-[2rem] bg-slate-50 p-8 ring-1 ring-slate-200">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-slate-900">Key outcomes</h2>
            <ul className="mt-6 space-y-4">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />
                  <span className="font-medium leading-relaxed text-slate-700">{bullet}</span>
                </li>
              ))}
            </ul>
            <Link
              href={program.href || "/contact"}
              className={cn(buttonVariants({ size: "lg" }), "mt-8 w-full bg-blue-600 text-white hover:bg-blue-700")}
            >
              {program.cta || "Get Involved"}
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </aside>

          <article className="min-w-0">
            {renderRichText(program.content) || (
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
        </div>
      </section>
    </div>
  )
}
