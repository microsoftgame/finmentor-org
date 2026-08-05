import type { Metadata } from "next"

import {
  adultAdvisors,
  appFeatureList,
  contactReasons,
  featuredArticleSections,
  featuredQuickFacts,
  featuredStory,
  financialLiteracyFacts,
  homeStats,
  impactStats,
  impactStories,
  initiativeCards,
  journeySteps,
  leadershipBenefits,
  leadershipSnapshot,
  leadershipTracks,
  leadershipWhyBullets,
  missionConnectionBullets,
  missionValues,
  navigationItems,
  newsUpdates,
  programs as fallbackPrograms,
  programImpactBullets,
  supportCards,
  trustBullets,
  trustHighlights,
} from "@/lib/site-data"

import {
  getPublishedRecords,
  getPublishedBySlug,
  getPublishedCollection,
  getPublishedRecordBySlug,
  getPublishedSingleton,
  parseContentData,
  type SonicContentItem,
} from "@/lib/cms"

export type NavItem = { label: string; href: string }

export type SiteSettings = {
  brandName: string
  siteUrl: string
  logoUrl: string
  faviconUrl: string
  defaultSeoTitle: string
  defaultSeoDescription: string
  ogImageUrl?: string
  contactEmail: string
  navigationJson: readonly NavItem[]
  footerJson?: {
    description?: string
    organizationLinks?: readonly NavItem[]
    actionLinks?: readonly NavItem[]
  }
  primaryCtaLabel?: string
  primaryCtaHref?: string
}

export type HomepageBlock = {
  title: string
  blockType: string
  eyebrow?: string
  subtitle?: string
  imageUrl?: string
  actionJson?: readonly { label: string; href: string; variant?: "default" | "outline" | "glass" | "brandGold" }[]
  itemsJson?: readonly unknown[]
  sortOrder?: number
}

export type PageContent = {
  title: string
  slug: string
  summary?: string
  sectionsJson?: Record<string, unknown>
  seoTitle?: string
  seoDescription?: string
  ogImageUrl?: string
}

export type NewsImpact = {
  image?: string
  tag?: string
  category?: string
  date?: string
  title: string
  description?: string
  excerpt?: string
  slug?: string
  coverImageUrl?: string
  publishedAt?: string
  isFeatured?: boolean
  storyType?: "featured" | "update" | "impact_story"
  content?: string
  coverImageAlt?: string
  seoTitle?: string
  seoDescription?: string
  quickFactsJson?: readonly { label: string; value: string }[]
  sectionsJson?: readonly { heading: string; body: string }[]
}

export type Program = {
  tag?: string
  title: string
  description?: string
  summary?: string
  bullets: readonly string[]
  audience?: string
  image: string
  alt?: string
  cta?: string
  href?: string
  accent?: string
  slug?: string
  content?: string
  sectionsJson?: readonly { heading: string; body: string }[]
  seoTitle?: string
  seoDescription?: string
  hasCustomDetail?: boolean
}

export type LeadershipEntry = {
  title: string
  entryType: "adult_advisor" | "leadership_track" | "benefit" | "mission_bullet"
  name?: string
  role?: string
  organization?: string
  description?: string
  responsibilities?: readonly string[]
  responsibilitiesJson?: readonly string[]
  image?: string
  imageUrl?: string
  sortOrder?: number
}

export type OrganizationUnit = {
  title: string
  slug: string
  parentUnit?: string
  description?: string
  responsibilities?: string
  isPublic?: boolean
  sortOrder?: number
}

export type PersonProfile = {
  title: string
  slug: string
  formalTitle: string
  organizationUnit?: string
  profileImageUrl?: string
  profileImageAlt?: string
  summary: string
  biography?: string
  performance?: string
  contributions?: string
  achievementsJson?: readonly string[]
  honorsJson?: readonly string[]
  publicContact?: string
  publicVisibility?: "public" | "hidden" | "noindex"
  seoTitle?: string
  seoDescription?: string
  ogImageUrl?: string
  sortOrder?: number
}

export type LeadershipPosition = {
  title: string
  slug: string
  organizationUnit?: string
  description?: string
  responsibilities?: string
  requirements?: string
  experience?: string
  assignedPerson?: string
  applicationStatus: "open" | "filled" | "closed"
  applicationUrl?: string
  sortOrder?: number
}

const fallbackSiteSettings: SiteSettings = {
  brandName: "FinMentor",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://finmentors.org",
  logoUrl: "/logo.png",
  faviconUrl: "/favicon.ico",
  defaultSeoTitle: "FinMentor | Youth Financial Education",
  defaultSeoDescription:
    "FinMentor provides accessible financial literacy learning opportunities for students, families, and communities.",
  ogImageUrl:
    "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/v1785162852/finmentor/about/meet-our-people-new.png",
  contactEmail: "contact@finmentors.org",
  navigationJson: navigationItems,
}

function sortByOrder<T extends { sortOrder?: number }>(items: readonly T[]) {
  return [...items].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
}

export function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function withRecordSlug<T extends { title: string; slug?: string }>(record: SonicContentItem<T>, data: T) {
  return {
    ...data,
    slug: data.slug || record.slug || toSlug(data.title),
  }
}

export async function getSiteSettings() {
  return getPublishedSingleton<SiteSettings>("site_settings", fallbackSiteSettings)
}

export async function getHomepageContent() {
  const blocks = sortByOrder(await getPublishedCollection<HomepageBlock>("homepage_blocks", []))
  const byType = new Map(blocks.map((block) => [block.blockType, block]))

  return {
    hero: byType.get("hero"),
    trustBar: byType.get("trust_bar"),
    impactStats: byType.get("impact_stats"),
    initiatives: byType.get("initiatives"),
    appSection: byType.get("app_section"),
    fallback: { homeStats, initiativeCards, appFeatureList },
  }
}

export async function getPageContent(slug: string, fallback: PageContent) {
  return getPublishedBySlug<PageContent>("pages", slug, fallback)
}

export async function getPageMetadata(slug: string, fallback: Metadata): Promise<Metadata> {
  const settings = await getSiteSettings()
  const record = await getPublishedRecordBySlug<PageContent>("pages", slug)
  const data = record?.data && typeof record.data === "object" ? record.data : undefined
  const title = data?.seoTitle || record?.meta_title || fallback.title || settings.defaultSeoTitle
  const description =
    data?.seoDescription || record?.meta_description || fallback.description || settings.defaultSeoDescription
  const image = data?.ogImageUrl || settings.ogImageUrl

  return {
    title,
    description,
    alternates: { canonical: `${settings.siteUrl.replace(/\/$/, "")}/${slug === "home" ? "" : slug}` },
    openGraph: {
      title: String(title),
      description: String(description),
      url: `${settings.siteUrl.replace(/\/$/, "")}/${slug === "home" ? "" : slug}`,
      siteName: settings.brandName,
      images: image ? [{ url: image }] : undefined,
      type: "website",
    },
  }
}

export async function getNewsContent() {
  const cmsRecords = await getPublishedRecords<NewsImpact>("news_impact")
  const records = cmsRecords
    .map((record) => {
      const data = parseContentData(record)
      return data ? withRecordSlug(record, data) : null
    })
    .filter((item): item is NewsImpact & { slug: string } => Boolean(item))
  const featured = records.find((item) => item.isFeatured) ?? {
    ...featuredStory,
    excerpt: featuredStory.description,
    coverImageUrl: featuredStory.image,
    slug: "featured",
    storyType: "featured" as const,
  }
  const updates = records
    .filter((item) => item.storyType === "update")
    .map((item) => ({
      slug: item.slug,
      image: item.coverImageUrl || item.image || "",
      category: item.category || "Update",
      date: item.date || (item.publishedAt ? new Date(item.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""),
      title: item.title,
      excerpt: item.excerpt || item.description || "",
    }))
  const stories = records
    .filter((item) => item.storyType === "impact_story")
    .map((item) => ({
      slug: item.slug,
      image: item.coverImageUrl || item.image || "",
      category: item.category || "Impact",
      title: item.title,
      description: item.excerpt || item.description || "",
    }))

  return {
    featuredStory: {
      slug: featured.slug,
      image: featured.coverImageUrl || featured.image || "",
      tag: featured.tag || "Featured Story",
      category: featured.category || "Program Update",
      date: featured.date || "March 15, 2024",
      title: featured.title,
      description: featured.excerpt || featured.description || "",
    },
    newsUpdates: updates.length
      ? updates
      : newsUpdates.map((item) => ({ ...item, slug: toSlug(item.title) })),
    impactStories: stories.length
      ? stories
      : impactStories.map((item) => ({ ...item, slug: toSlug(item.title) })),
    impactStats,
  }
}

export async function getProgramsContent(): Promise<Array<Program & { slug: string }>> {
  const cmsRecords = await getPublishedRecords<Program>("programs")
  const records = cmsRecords
    .map((record) => {
      const data = parseContentData(record)
      return data ? withRecordSlug(record, data) : null
    })
    .filter((item): item is Program & { slug: string } => Boolean(item))

  if (records.length) {
    return records
  }

  return fallbackPrograms.map((program) => ({
    ...program,
    slug: toSlug(program.title),
  }))
}

export async function getProgramBySlug(slug: string): Promise<(Program & { slug: string }) | null> {
  const programs = await getProgramsContent()

  return programs.find((program) => program.slug === slug) ?? null
}

export async function getProgramStaticParams() {
  const programs = await getProgramsContent()

  return programs.map((program) => ({ slug: program.slug }))
}

export async function getNewsBySlug(slug: string) {
  const records = await getPublishedRecords<NewsImpact>("news_impact")
  const cmsMatch = records
    .map((record) => {
      const data = parseContentData(record)
      return data ? withRecordSlug(record, data) : null
    })
    .find((item) => item?.slug === slug)

  if (cmsMatch) {
    return cmsMatch
  }

  const fallbackItems: Array<NewsImpact & { slug: string }> = [
    {
      ...featuredStory,
      slug: "featured",
      coverImageUrl: featuredStory.image,
      excerpt: featuredStory.description,
      storyType: "featured" as const,
      sectionsJson: featuredArticleSections,
      quickFactsJson: featuredQuickFacts,
    },
    ...newsUpdates.map((item) => ({
      ...item,
      slug: toSlug(item.title),
      coverImageUrl: item.image,
      storyType: "update" as const,
    })),
    ...impactStories.map((item) => ({
      ...item,
      slug: toSlug(item.title),
      coverImageUrl: item.image,
      excerpt: item.description,
      storyType: "impact_story" as const,
    })),
  ]

  return fallbackItems.find((item) => item.slug === slug) ?? null
}

export async function getNewsStaticParams() {
  const records = await getPublishedRecords<NewsImpact>("news_impact")
  const cmsParams = records
    .map((record) => {
      const data = parseContentData(record)
      return data?.title ? data.slug || record.slug || toSlug(data.title) : null
    })
    .filter((slug): slug is string => Boolean(slug))

  if (cmsParams.length) {
    return cmsParams.filter((slug) => slug !== "featured").map((slug) => ({ slug }))
  }

  return [...newsUpdates, ...impactStories].map((item) => ({ slug: toSlug(item.title) }))
}

export async function getFeaturedArticleContent() {
  const records = await getPublishedCollection<NewsImpact>("news_impact", [])
  const featured = records.find((item) => item.isFeatured)

  return {
    featuredStory: featured
      ? {
          image: featured.coverImageUrl || featured.image || "",
          tag: featured.tag || "Featured Story",
          category: featured.category || "Program Update",
          date: featured.date || "March 15, 2024",
          title: featured.title,
          description: featured.excerpt || featured.description || "",
        }
      : featuredStory,
    featuredArticleSections: featured?.sectionsJson?.length ? featured.sectionsJson : featuredArticleSections,
    featuredQuickFacts: featured?.quickFactsJson?.length ? featured.quickFactsJson : featuredQuickFacts,
    newsUpdates,
  }
}

export async function getLeadershipContent() {
  const organizationUnits = sortByOrder(await getPublishedCollection<OrganizationUnit>("organization_units", []))
    .filter((item) => item.isPublic !== false)
  const people = sortByOrder(await getPublishedCollection<PersonProfile>("people", []))
    .filter((item) => item.publicVisibility !== "hidden")
  const positions = sortByOrder(await getPublishedCollection<LeadershipPosition>("leadership_positions", []))
  const records = sortByOrder(await getPublishedCollection<LeadershipEntry>("leadership", []))
  const advisors = records
    .filter((item) => item.entryType === "adult_advisor")
    .map((item) => ({
      name: item.name || item.title,
      role: item.role || "",
      organization: item.organization || "",
      image: item.imageUrl || item.image || "",
    }))
  const tracks = records
    .filter((item) => item.entryType === "leadership_track")
    .map((item) => ({
      title: item.title,
      description: item.description || "",
      responsibilities: item.responsibilitiesJson || item.responsibilities || [],
    }))
  const benefits = records
    .filter((item) => item.entryType === "benefit")
    .map((item) => ({ title: item.title, description: item.description || "" }))
  const bullets = records.filter((item) => item.entryType === "mission_bullet").map((item) => item.description || item.title)

  return {
    organizationUnits,
    people: people.length
      ? people
      : (advisors.length ? advisors : adultAdvisors).map((advisor): PersonProfile => ({
          title: advisor.name,
          slug: toSlug(advisor.name),
          formalTitle: advisor.role,
          organizationUnit: advisor.organization,
          profileImageUrl: advisor.image,
          summary: `${advisor.name} supports FinMentor as ${advisor.role}.`,
          publicVisibility: "public" as const,
        })),
    positions: positions.length
      ? positions
      : (tracks.length ? tracks : leadershipTracks).map((track): LeadershipPosition => ({
          title: track.title,
          slug: toSlug(track.title),
          description: track.description,
          responsibilities: track.responsibilities.join("; "),
          applicationStatus: "open" as const,
        })),
    adultAdvisors: advisors.length ? advisors : adultAdvisors,
    leadershipTracks: tracks.length ? tracks : leadershipTracks,
    leadershipBenefits: benefits.length ? benefits : leadershipBenefits,
    leadershipWhyBullets: bullets.length ? bullets : leadershipWhyBullets,
    missionConnectionBullets,
  }
}

export async function getPersonBySlug(slug: string) {
  const records = await getPublishedRecords<PersonProfile>("people")
  const match = records.find((record) => record.slug === slug)
  const person = match ? parseContentData(match) : null

  if (person && person.publicVisibility !== "hidden") {
    return withRecordSlug(match!, person)
  }

  const leadership = await getLeadershipContent()
  return leadership.people.find((item) => item.slug === slug) ?? null
}

export async function getPersonStaticParams() {
  const leadership = await getLeadershipContent()
  return leadership.people.map((person) => ({ slug: person.slug }))
}

export const fallbackPageSections = {
  journeySteps,
  missionValues,
  financialLiteracyFacts,
  trustHighlights,
  leadershipSnapshot,
  programImpactBullets,
  trustBullets,
  supportCards,
  contactReasons,
}
