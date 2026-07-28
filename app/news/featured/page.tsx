import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Share2, User } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getFeaturedArticleContent, getPageMetadata } from "@/lib/cms-content"
import { cn } from "@/lib/utils"

export async function generateMetadata() {
  return getPageMetadata("news", {
    title: "Featured Impact Story",
    description: "Read the latest featured FinMentor impact story.",
  })
}

export default async function NewsFeaturedPage() {
  const { featuredArticleSections, featuredQuickFacts, featuredStory, newsUpdates } =
    await getFeaturedArticleContent()

  return (
    <div className="animate-in fade-in duration-500 pb-20 pt-24">
      <section className="relative overflow-hidden bg-[#0a1128] py-20 text-white">
        <div className="bg-noise absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link href="/news" className={cn(buttonVariants({ variant: "glass" }), "mb-8 border-white/20")}>
            <ArrowLeft className="mr-2 size-4" />
            Back to News
          </Link>
          <div className="max-w-4xl">
            <div className="mb-4 flex flex-wrap items-center gap-4 text-sm font-bold uppercase tracking-[0.18em] text-blue-100/80">
              <span className="rounded-full bg-blue-500 px-4 py-1.5 text-white">{featuredStory.category}</span>
              <span className="inline-flex items-center gap-2">
                <Calendar className="size-4" />
                {featuredStory.date}
              </span>
            </div>
            <h1 className="font-heading text-4xl font-bold tracking-tight md:text-6xl">
              {featuredStory.title}
            </h1>
            <p className="mt-6 text-xl font-medium leading-relaxed text-blue-100/80">
              {featuredStory.description}
            </p>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem]">
            <Image
              src={featuredStory.image}
              alt={featuredStory.title}
              width={2070}
              height={1380}
              className="h-[320px] w-full object-cover md:h-[520px]"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-8">
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-full bg-slate-100">
                    <User className="size-6 text-slate-500" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">FinMentor Team</p>
                    <p className="text-sm font-medium text-slate-500">Published update</p>
                  </div>
                </div>
                <button type="button" className={cn(buttonVariants({ variant: "outline" }))}>
                  <Share2 className="mr-2 size-4" />
                  Share
                </button>
              </div>

              <div className="space-y-10">
                <p className="text-xl font-medium leading-relaxed text-slate-700">
                  As we reflect on the first quarter of 2024, we&apos;re proud to share the progress made together. This period has been marked by expansion, engagement, and measurable community impact across Orange County.
                </p>
                {featuredArticleSections.map((section) => (
                  <div key={section.heading}>
                    <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900">
                      {section.heading}
                    </h2>
                    <p className="mt-4 text-lg font-medium leading-relaxed text-slate-600">
                      {section.body}
                    </p>
                  </div>
                ))}
                <blockquote className="rounded-[2rem] border-l-4 border-amber-400 bg-slate-50 px-8 py-6 text-lg italic leading-relaxed text-slate-700">
                  &ldquo;The financial literacy program changed how I think about money. Now I have a clear plan for saving for college.&rdquo;
                </blockquote>
              </div>

              <div className="mt-12 border-t border-slate-200 pt-8">
                <h3 className="font-heading text-2xl font-bold tracking-tight text-slate-900">
                  Related Stories
                </h3>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {newsUpdates.slice(0, 2).map((item) => (
                    <Link
                      key={item.title}
                      href="/news"
                      className="block rounded-[1.5rem] border border-slate-200 p-5 transition-colors hover:border-slate-900"
                    >
                      <span className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                        {item.category}
                      </span>
                      <h4 className="mt-2 font-heading text-lg font-bold tracking-tight text-slate-900">
                        {item.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="border-slate-200/70 bg-slate-50">
                <CardContent>
                  <h3 className="font-heading text-xl font-bold tracking-tight text-slate-900">
                    Quick Facts
                  </h3>
                  <ul className="mt-5 space-y-3 text-sm font-medium">
                    {featuredQuickFacts.map((fact) => (
                      <li key={fact.label} className="flex items-center justify-between">
                        <span className="text-slate-500">{fact.label}</span>
                        <span className="font-bold text-slate-900">{fact.value}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Link href="/news" className={cn(buttonVariants({ size: "lg" }), "w-full bg-slate-950 text-white hover:bg-slate-800")}>
                View All News
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-amber-400 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-4xl font-bold tracking-tight text-slate-950">
            Stay updated with our next chapter.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-medium leading-relaxed text-slate-900/75">
            Reach out if you want to learn more about upcoming programs, partnerships, or future impact reports.
          </p>
          <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "mt-8 bg-slate-950 text-white hover:bg-slate-800")}>
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  )
}
