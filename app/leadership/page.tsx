import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { getPeople } from "@/lib/content"
import {
  ourPeopleSectionCopy,
  type PersonRecord,
  type PersonSection,
} from "@/lib/site-data"
import { cn } from "@/lib/utils"

const SITE = {
  brandName: "FinMentor",
  siteUrl: "https://finmentors.org",
}

export async function generateMetadata() {
  return {
    title: "Our People | FinMentor",
    description:
      "Meet the executive leaders, department leaders, and board of directors behind FinMentor's mission to advance financial literacy for students, families, and communities.",
  }
}

function bySection(section: PersonSection) {
  return getPeople()
    .filter(
      (p) =>
        p.showOnWebsite !== false && p.status === "active" && p.section === section
    )
    .sort((a, b) => a.profileOrder - b.profileOrder)
}

function allVisiblePeople() {
  return getPeople()
    .filter(
      (p) =>
        p.showOnWebsite !== false && p.status === "active" && p.section !== "board"
    )
    .sort((a, b) => {
      if (a.sectionOrder !== b.sectionOrder) {
        return a.sectionOrder - b.sectionOrder
      }
      return a.profileOrder - b.profileOrder
    })
}

export default async function OurPeoplePage() {
  const allPeople = allVisiblePeople()
  const boardMembers = bySection("board")

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.brandName,
    url: SITE.siteUrl,
    member: getPeople()
      .filter((p) => p.showOnWebsite !== false)
      .map((p) => ({
        "@type": "Person",
        name: p.name,
        jobTitle: p.primaryTitle,
        url: `${SITE.siteUrl}/leadership/${p.slug}`,
      })),
  }

  return (
    <main className="bg-white pb-24 pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      {/* ── Page Header ─────────────────────────────────────────── */}
      <header className="mx-auto max-w-6xl px-6 pb-16 pt-20 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600">
          {SITE.brandName}
        </p>
        <h1 className="mt-4 font-heading text-5xl font-bold tracking-tight text-slate-900 md:text-6xl">
          Our People
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
          {ourPeopleSectionCopy.hero.subtitle}
        </p>
        <div className="mt-8 h-px w-full bg-slate-200" />
      </header>

      {/* ── All People (without section labels) ─────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 lg:px-8">
        <ul className="grid gap-12 md:grid-cols-2 lg:gap-16">
          {allPeople.map((person) => (
            <li key={person.personId}>
              <PersonCard person={person} variant="executive" />
            </li>
          ))}
        </ul>
      </section>

      {/* Divider */}
      <div className="mx-auto mt-20 max-w-6xl px-6 lg:px-8">
        <div className="h-px bg-slate-200" />
      </div>

      {/* ── Board of Directors ─────────────────────────────────── */}
      <section className="mx-auto mt-20 max-w-6xl px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600">
            Governance
          </p>
          <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-slate-900">
            {ourPeopleSectionCopy.board.title}
          </h2>
        </div>

        <ul className="grid gap-12 md:grid-cols-2 lg:gap-16">
          {boardMembers.map((person) => (
            <li key={person.personId}>
              <PersonCard person={person} variant="executive" />
            </li>
          ))}
        </ul>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="mx-auto mt-24 max-w-6xl px-6 lg:px-8">
        <div className="rounded-2xl bg-slate-900 px-10 py-14 text-center text-white">
          <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
            Interested in getting involved?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-blue-100/80">
            Reach out to learn more about volunteer opportunities, partnerships, and how to support FinMentor&apos;s programs.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-blue-600 text-white hover:bg-blue-500"
              )}
            >
              Get in Touch
              <ArrowUpRight className="ml-1.5 size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

// ── Person Card ──────────────────────────────────────────────────────────────
function PersonCard({
  person,
  variant,
}: {
  person: PersonRecord
  variant: "executive" | "compact"
}) {
  const isExec = variant === "executive"

  return (
    <Link
      href={`/leadership/${person.slug}`}
      className={cn(
        "group flex gap-6 rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300",
        "hover:border-slate-300 hover:shadow-lg",
        isExec ? "items-start" : "flex-col items-center text-center"
      )}
    >
      {/* Circular portrait */}
      <div
        className={cn(
          "relative shrink-0 overflow-hidden rounded-full bg-slate-100",
          isExec ? "size-28 md:size-36" : "size-20"
        )}
      >
        {person.photo ? (
          <Image
            src={person.photo}
            alt={person.photoAlt}
            fill
            sizes={isExec ? "144px" : "80px"}
            className="object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 font-heading text-2xl font-bold text-slate-400">
            {person.name.split(" ").map((n) => n[0]).join("")}
          </div>
        )}
      </div>

      {/* Text */}
      <div className={cn("min-w-0 flex-1", isExec ? "" : "mt-4")}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
          {person.primaryTitle}
        </p>
        {(person.secondaryTitles ?? []).length > 0 && isExec && (
          <p className="mt-1 text-[11px] text-slate-500">
            {person.secondaryTitles!.join(" · ")}
          </p>
        )}
        <h3
          className={cn(
            "mt-2 font-heading font-bold tracking-tight text-slate-900",
            isExec ? "text-2xl" : "text-base"
          )}
        >
          {person.name}
        </h3>
        {person.school && (
          <p className="mt-1 text-xs text-slate-500">{person.school}</p>
        )}
        {person.tagline && isExec && (
          <p className="mt-3 text-sm italic leading-relaxed text-slate-600">
            &ldquo;{person.tagline}&rdquo;
          </p>
        )}
        {isExec && (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-500">
            {person.bio}
          </p>
        )}
        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 transition-colors group-hover:text-blue-600">
          View profile <ArrowUpRight className="size-3" />
        </span>
      </div>
    </Link>
  )
}
