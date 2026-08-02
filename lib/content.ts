// 内容加载器：构建期用 fs 读取 content/*.json（由 Decap CMS 提交生成）。
// 作为纯静态站（output: export），没有运行时，所有内容在 next build 阶段读入。
// site-data.ts 仅作为内容文件缺失时的兜底，确保仓库干净 checkout 也能构建通过。

import fs from "fs"
import path from "path"
import type { PersonRecord } from "./site-data"
import { ourPeople } from "./site-data"

const CONTENT_DIR = path.join(process.cwd(), "content")

// ---------------------------------------------------------------------------
// 类型定义（与 Decap collections / content/*.json 对齐）
// ---------------------------------------------------------------------------

export type Program = {
  slug: string
  tag: string
  title: string
  summary: string
  audience: string
  image: string
  alt: string
  accent: string
  bullets: string[]
  overview: string
  highlights: string
  date?: string
  location?: string
  additionalImages?: { src: string; alt: string; caption?: string }[]
  showOnWebsite: boolean
}

export type ProgramNews = {
  slug: string
  title: string
  category: string
  date: string
  image: string
  excerpt: string
  body?: string
  showOnWebsite: boolean
  featured: boolean
}

export type Upcoming = {
  slug: string
  title: string
  tag: string
  accent: string
  description: string
  period: string
  ctaLabel: string
  ctaHref: string
}

export type ProgramsPageConfig = {
  heroEyebrow: string
  heroTitle: string
  heroSubtitle: string
  sectionHighlightsTitle: string
  sectionHighlightsSubtitle: string
  sectionUpcomingTitle: string
  sectionUpcomingSubtitle: string
  impactImage: string
  impactBadgeTitle: string
  impactBadgeSubtitle: string
  impactTitle: string
  impactSubtitle: string
  impactBullets: string[]
  ctaTitle: string
  ctaSubtitle: string
  ctaPrimaryLabel: string
  ctaPrimaryHref: string
  ctaSecondaryLabel: string
  ctaSecondaryHref: string
}

// ---------------------------------------------------------------------------
// 底层读取
// ---------------------------------------------------------------------------

function readJsonFile<T>(relativePath: string): T | null {
  try {
    const full = path.join(CONTENT_DIR, relativePath)
    return JSON.parse(fs.readFileSync(full, "utf-8")) as T
  } catch {
    return null
  }
}

function readCollection<T>(folder: string): T[] {
  try {
    const dir = path.join(CONTENT_DIR, folder)
    if (!fs.existsSync(dir)) return []
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".json"))
      .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8")) as T)
  } catch {
    return []
  }
}

function listSlugs(folder: string): string[] {
  try {
    const dir = path.join(CONTENT_DIR, folder)
    if (!fs.existsSync(dir)) return []
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(/\.json$/, ""))
      .sort()
  } catch {
    return []
  }
}

// ---------------------------------------------------------------------------
// 整页级兜底（仅当 content/programs-page.json 缺失时）
// ---------------------------------------------------------------------------

const FALLBACK_PROGRAMS_PAGE: ProgramsPageConfig = {
  heroEyebrow: "FinMentor Programs",
  heroTitle: "Programs built for students, families, and communities.",
  heroSubtitle:
    "We make financial education accessible through engaging programs and practical resources, helping students, families, and communities build the knowledge and confidence to make informed financial decisions.",
  sectionHighlightsTitle: "Program & Event Highlights",
  sectionHighlightsSubtitle: "Stay informed about FinMentor programs, events, and community impact stories.",
  sectionUpcomingTitle: "Upcoming Opportunities",
  sectionUpcomingSubtitle: "Explore our upcoming courses, community visits, and volunteer opportunities.",
  impactImage: "https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/finmentor/impact-in-action",
  impactBadgeTitle: "Real World",
  impactBadgeSubtitle: "Financial Learning",
  impactTitle: "Impact in Action",
  impactSubtitle:
    "Every workshop, course, and community event creates meaningful outcomes. Explore stories, event highlights, and community milestones that show how financial education is making a difference.",
  impactBullets: [
    "Students build financial knowledge, confidence, and practical money skills.",
    "Volunteers develop leadership, communication, and community service experience.",
    "Families and communities benefit from financial education that creates lasting impact.",
  ],
  ctaTitle: "Partner with us to create lasting community impact.",
  ctaSubtitle:
    "Schools, community organizations, and businesses can partner with FinMentor to expand access to practical financial education and create lasting impact.",
  ctaPrimaryLabel: "Partner With Us",
  ctaPrimaryHref: "/support",
  ctaSecondaryLabel: "Contact Us",
  ctaSecondaryHref: "/contact",
}

// ---------------------------------------------------------------------------
// 公开 API
// ---------------------------------------------------------------------------

export function getProgramsPage(): ProgramsPageConfig {
  return readJsonFile<ProgramsPageConfig>("programs-page.json") ?? FALLBACK_PROGRAMS_PAGE
}

export function getPrograms(): Program[] {
  return readCollection<Program>("programs")
}

export function getProgramNews(): ProgramNews[] {
  return readCollection<ProgramNews>("program-news")
}

export function getUpcoming(): Upcoming[] {
  return readCollection<Upcoming>("upcoming")
}

export function getPeople(): PersonRecord[] {
  const fromContent = readCollection<PersonRecord>("people")
  // 兜底：内容目录不存在时退回硬编码数据，保证构建通过
  return fromContent.length > 0 ? fromContent : (ourPeople as PersonRecord[])
}

export function getProgramSlugs(): string[] {
  return listSlugs("programs")
}

export function getProgramNewsSlugs(): string[] {
  return listSlugs("program-news")
}

export function getPersonSlugs(): string[] {
  const fromContent = listSlugs("people")
  return fromContent.length > 0 ? fromContent : ourPeople.map((p) => p.slug)
}

export function getProgramBySlug(slug: string): Program | undefined {
  return getPrograms().find((p) => p.slug === slug)
}

export function getProgramNewsBySlug(slug: string): ProgramNews | undefined {
  return getProgramNews().find((n) => n.slug === slug)
}

export function getPersonBySlug(slug: string): PersonRecord | undefined {
  return getPeople().find((p) => p.slug === slug)
}
