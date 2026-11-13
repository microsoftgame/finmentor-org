"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"
import { ArrowUpDown, Calendar } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import type { ProgramNews } from "@/lib/content"

type SortOption = "newest" | "oldest" | "recommended"

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "recommended", label: "Recommended" },
]

// 解析 "Month YYYY" 格式日期为时间戳，无法解析时排到末尾
function parseDate(date: string): number {
  const parsed = Date.parse(date)
  return Number.isNaN(parsed) ? 0 : parsed
}

export function ProgramNewsGrid({
  news,
  title,
  subtitle,
}: {
  news: ProgramNews[]
  title: string
  subtitle: string
}) {
  const [sort, setSort] = useState<SortOption>("newest")

  const sorted = useMemo(() => {
    const list = [...news]
    if (sort === "newest") {
      list.sort((a, b) => parseDate(b.date) - parseDate(a.date))
    } else if (sort === "oldest") {
      list.sort((a, b) => parseDate(a.date) - parseDate(b.date))
    } else {
      // 推荐：featured 优先，其余按时间倒序
      list.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1
        return parseDate(b.date) - parseDate(a.date)
      })
    }
    return list
  }, [news, sort])

  return (
    <div>
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            {title}
          </h2>
          <p className="mt-2 text-lg font-medium text-slate-600">
            {subtitle}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <ArrowUpDown className="size-4 text-slate-400" />
          <label htmlFor="news-sort" className="sr-only">
            Sort highlights
          </label>
          <select
            id="news-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sorted.map((update) => (
          <Link
            key={update.slug}
            href={`/programs/news/${update.slug}`}
            className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            <Card className="group h-full border-slate-200/70 bg-slate-50 overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={update.image}
                  alt={update.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardContent className="pt-4">
                <div className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                  <Calendar className="size-3" />
                  {update.category}
                </div>
                <h3 className="font-heading text-lg font-bold leading-snug tracking-tight text-slate-900 line-clamp-2">
                  {update.title}
                </h3>
                <p className="mt-2 text-sm text-slate-500 line-clamp-2">
                  {update.excerpt}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs font-medium text-slate-400">
                  <Calendar className="size-3" />
                  {update.date}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
