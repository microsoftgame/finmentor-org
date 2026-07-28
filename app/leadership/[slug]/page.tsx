import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, GraduationCap, Mail } from "lucide-react"

import { getSiteSettings } from "@/lib/cms-content"
import { ourPeople, type PersonRecord } from "@/lib/site-data"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const person = ourPeople.find((p) => p.slug === slug && p.showOnWebsite !== false)
  if (!person) return {}
  return {
    title: `${person.name} | FinMentor`,
    description: person.tagline || person.bio.slice(0, 155),
  }
}

export function generateStaticParams() {
  return ourPeople
    .filter((p) => p.showOnWebsite !== false)
    .map((p) => ({ slug: p.slug }))
}

function getImageUrl(url: string | undefined, size: number) {
  if (!url) return undefined
  // URL already contains transformation, return as-is
  return url
}

export default async function PersonProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const person = ourPeople.find((p) => p.slug === slug && p.showOnWebsite !== false)
  if (!person) {
    notFound()
  }

  const settings = await getSiteSettings()
  const imgSrc = getImageUrl(person.photo, 400)
  const nameParts = person.name.split(" ")
  const firstName = nameParts[0]
  const lastName = nameParts.slice(1).join(" ")
  const bioParagraphs = person.extendedBio && person.extendedBio.length > 0 ? person.extendedBio : [person.bio]

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-24 pt-12">
      {/* Decorative header */}
      <div className="bg-[#0a1128] py-16">
        <div className="mx-auto max-w-5xl px-6">
          <Link
            href="/leadership"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to Our People
          </Link>
        </div>
      </div>

      {/* Profile Card - Centered */}
      <div className="mx-auto max-w-3xl px-6 -mt-20">
        <div className="rounded-3xl bg-white shadow-2xl shadow-slate-200/50 ring-1 ring-slate-100">
          {/* Portrait Section */}
          <div className="relative flex flex-col items-center pt-12 pb-8">
            {/* Avatar */}
            <div className="relative">
              <div className="size-40 overflow-hidden rounded-full ring-4 ring-white shadow-xl">
                {imgSrc ? (
                  <Image
                    src={imgSrc}
                    alt={person.photoAlt}
                    width={320}
                    height={320}
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 font-heading text-5xl font-bold text-white">
                    {nameParts.map(n => n[0]).join("")}
                  </div>
                )}
              </div>
              {/* Status indicator */}
              <div className="absolute -bottom-1 -right-1 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white shadow">
                Active
              </div>
            </div>

            {/* Name & Title */}
            <div className="mt-6 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                {person.primaryTitle}
              </p>
              {(person.secondaryTitles ?? []).length > 0 && (
                <p className="mt-1 text-xs text-slate-500">
                  {person.secondaryTitles!.join(" · ")}
                </p>
              )}
              <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight text-slate-900">
                {firstName}{" "}
                <span className="text-slate-400">{lastName}</span>
              </h1>

              {person.school && (
                <p className="mt-3 flex items-center justify-center gap-2 text-sm text-slate-500">
                  <GraduationCap className="size-4 text-amber-600" />
                  {person.school}
                </p>
              )}

              {person.tagline && (
                <p className="mt-4 max-w-lg px-6 text-center text-base italic leading-relaxed text-slate-600">
                  &ldquo;{person.tagline}&rdquo;
                </p>
              )}
            </div>

            {/* Meta Links */}
            <div className="mt-6 flex items-center gap-4">
              {person.linkedin && (
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200 hover:text-blue-600"
                >
                  LinkedIn <ArrowUpRight className="size-3" />
                </a>
              )}
              <Link
                href="/contact"
                className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                <Mail className="size-4" />
                Contact
              </Link>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

          {/* Content Section */}
          <div className="px-8 py-10">
            {/* Biography */}
            <section className="mb-10">
              <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                <span className="h-px flex-1 bg-slate-200" style={{ maxWidth: '2rem' }} />
                Biography
              </h2>
              <div className="mt-6 space-y-5">
                {bioParagraphs.map((para, i) => (
                  <p key={i} className="text-base leading-[1.9] text-slate-600">
                    {para}
                  </p>
                ))}
              </div>
            </section>

            {/* Two Column Layout for Focus Areas & Programs */}
            <div className="grid gap-8 md:grid-cols-2">
              {/* Focus Areas */}
              {person.focusAreas && person.focusAreas.length > 0 && (
                <section>
                  <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                    <span className="h-px flex-1 bg-slate-200" style={{ maxWidth: '2rem' }} />
                    Focus Areas
                  </h2>
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    {person.focusAreas.map((area, index) => {
                      const colors = [
                        'bg-blue-100 text-blue-700 ring-blue-200',
                        'bg-emerald-100 text-emerald-700 ring-emerald-200',
                        'bg-amber-100 text-amber-700 ring-amber-200',
                        'bg-purple-100 text-purple-700 ring-purple-200',
                        'bg-rose-100 text-rose-700 ring-rose-200',
                        'bg-cyan-100 text-cyan-700 ring-cyan-200',
                      ]
                      const colorClass = colors[index % colors.length]
                      return (
                        <div
                          key={area}
                          className={cn(
                            "rounded-xl px-3 py-2 text-center text-xs font-semibold ring-1",
                            colorClass
                          )}
                        >
                          {area}
                        </div>
                      )
                    })}
                  </div>
                </section>
              )}

              {/* Programs Led */}
              {person.programsLed && person.programsLed.length > 0 && (
                <section>
                  <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                    <span className="h-px flex-1 bg-slate-200" style={{ maxWidth: '2rem' }} />
                    Programs Led
                  </h2>
                  <ul className="mt-5 space-y-4">
                    {person.programsLed.map((prog) => (
                      <li key={prog.name} className="rounded-lg bg-slate-50 p-3">
                        <p className="text-sm font-semibold text-slate-800">{prog.name}</p>
                        {prog.detail && (
                          <p className="mt-1 text-xs leading-relaxed text-slate-500">{prog.detail}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {/* Approach */}
            {person.approach && (
              <section className="mt-10">
                <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-slate-50 p-6 ring-1 ring-slate-100">
                  <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                    <span className="h-px flex-1 bg-blue-200" style={{ maxWidth: '2rem' }} />
                    Approach
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-slate-700">
                    {person.approach}
                  </p>
                </div>
              </section>
            )}
          </div>

          {/* Footer CTA */}
          <div className="rounded-b-3xl bg-slate-50 px-8 py-6">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-sm text-slate-500">
                Learn more about FinMentor&apos;s mission and programs.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/programs"
                  className={cn(
                    buttonVariants({ size: "sm", variant: "outline" }),
                    "border-blue-600 text-blue-600 hover:bg-blue-50"
                  )}
                >
                  Our Programs
                </Link>
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "bg-[#0a1128] text-white hover:bg-slate-800"
                  )}
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
