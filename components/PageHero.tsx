import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type HeroAction = {
  label: string
  href: string
  variant?: "default" | "outline" | "ghost" | "secondary" | "brandGold" | "glass"
}

type PageHeroProps = {
  eyebrow?: string
  title: ReactNode
  subtitle: string
  backgroundImage: string
  actions?: HeroAction[]
  priority?: boolean
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  backgroundImage,
  actions = [],
  priority = false,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#0a1128] pb-24 pt-36 lg:pb-40 lg:pt-52">
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover opacity-30 mix-blend-overlay"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1128] via-[#0a1128]/85 to-transparent" />
      <div className="absolute right-0 top-0 h-[600px] w-[800px] translate-x-1/3 -translate-y-12 rounded-full bg-blue-600/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:w-3/4 xl:w-2/3">
          {eyebrow ? (
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold capitalize tracking-[0.24em] text-blue-100 backdrop-blur-md">
              <span className="inline-block size-2 rounded-full bg-amber-300" />
              {eyebrow}
            </div>
          ) : null}
          <h1 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-blue-100/80 md:text-xl">
            {subtitle}
          </p>
          {actions.length ? (
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              {actions.map((action) => (
                <Link
                  key={action.href + action.label}
                  href={action.href}
                  className={cn(buttonVariants({ variant: action.variant ?? "default", size: "lg" }))}
                >
                  {action.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
