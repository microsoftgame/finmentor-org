"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import type { NavItem } from "@/lib/cms-content"
import { cn } from "@/lib/utils"

const darkRoutes = new Set(["/"])

function getHeaderCtaLabel(label?: string) {
  if (!label) {
    return "Support Us"
  }

  return label.toLowerCase().includes("support") ? "Support Us" : label
}

type HeaderProps = {
  brandName?: string
  logoUrl?: string
  navigationItems: readonly NavItem[]
  primaryCtaLabel?: string
  primaryCtaHref?: string
}

export function Header({
  brandName = "FinMentor",
  logoUrl = "/logo.png",
  navigationItems,
  primaryCtaLabel = "Support Us",
  primaryCtaHref = "/support",
}: HeaderProps) {
  const pathname = usePathname()
  const [mobileMenuState, setMobileMenuState] = React.useState({ open: false, pathname })
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const mobileMenuOpen = mobileMenuState.open && mobileMenuState.pathname === pathname

  const onDarkHero = darkRoutes.has(pathname) && !scrolled
  const headerCtaLabel = getHeaderCtaLabel(primaryCtaLabel)
  const headerClass = onDarkHero
    ? "top-0 bg-transparent py-6"
    : "top-0 border-b border-slate-200/60 bg-white/90 py-4 shadow-sm backdrop-blur-md"
  const logoTextClass = onDarkHero ? "text-white" : "text-slate-900"
  const linkBaseClass = onDarkHero ? "text-white/80 hover:text-white" : "text-slate-600 hover:text-slate-900"

  return (
    <>
      <header className={cn("fixed inset-x-0 z-50 transition-all duration-300", headerClass)}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="group flex shrink-0 items-center gap-3 rounded-lg p-1 focus-visible:outline-none">
              <div className="overflow-hidden rounded-full shadow-sm transition-transform group-hover:scale-105">
                <Image
                  src={logoUrl}
                  alt={`${brandName} logo`}
                  width={40}
                  height={40}
                  className="size-10 object-cover"
                  priority
                />
              </div>
              <span className={cn("whitespace-nowrap text-xl font-extrabold uppercase tracking-[0.24em]", logoTextClass)}>
                {brandName}
              </span>
            </Link>

            <nav className="hidden min-w-0 items-center gap-5 lg:flex xl:gap-8">
              {navigationItems.map((item) => {
                const active = pathname === item.href
                const itemClass = active
                  ? onDarkHero
                    ? "text-amber-300"
                    : "text-blue-600"
                  : linkBaseClass

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-sm font-bold uppercase tracking-[0.22em] transition-colors",
                      "whitespace-nowrap lg:tracking-[0.16em] xl:tracking-[0.22em]",
                      itemClass
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
              <div className={cn("h-5 w-px", onDarkHero ? "bg-white/20" : "bg-slate-200")} />
              <Link
                href={primaryCtaHref}
                className={cn(
                  "text-sm font-bold uppercase tracking-[0.22em] transition-colors",
                  "whitespace-nowrap lg:tracking-[0.16em] xl:tracking-[0.22em]",
                  pathname === primaryCtaHref
                    ? onDarkHero
                      ? "text-amber-300"
                      : "text-blue-600"
                    : onDarkHero
                      ? "text-white hover:text-amber-300"
                      : "text-slate-900 hover:text-blue-600"
                )}
              >
                {headerCtaLabel}
              </Link>
              <Link href="/contact" className={buttonVariants({ variant: "default" })}>
                Contact
              </Link>
            </nav>

            <button
              type="button"
              className={cn(
                "rounded-md p-2 lg:hidden",
                onDarkHero ? "text-white" : "text-slate-900"
              )}
              onClick={() =>
                setMobileMenuState((value) => ({
                  open: !(value.open && value.pathname === pathname),
                  pathname,
                }))
              }
              aria-label="Toggle navigation"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="size-8" /> : <Menu className="size-8" />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen ? (
        <div className="fixed inset-0 z-40 overflow-y-auto bg-[#0a1128] px-6 pt-28 text-white animate-in fade-in slide-in-from-top-4 lg:hidden">
          <div className="mx-auto max-w-7xl">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block border-b border-white/10 py-5 text-2xl font-extrabold uppercase tracking-tight",
                  pathname === item.href ? "text-amber-300" : "text-white"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/support"
              className="block border-b border-white/10 py-5 text-2xl font-extrabold uppercase tracking-tight text-amber-300"
            >
              Support Us
            </Link>
            <Link href="/contact" className="block py-5 text-2xl font-extrabold uppercase tracking-tight text-white">
              Contact
            </Link>
          </div>
        </div>
      ) : null}
    </>
  )
}
