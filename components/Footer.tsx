import Image from "next/image"
import Link from "next/link"
import { ExternalLink, ShieldCheck } from "lucide-react"

import type { SiteSettings } from "@/lib/cms-content"
import { cn } from "@/lib/utils"

type FooterProps = {
  settings: SiteSettings
}

export function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const footer = settings.footerJson
  const organizationLinks = footer?.organizationLinks ?? [
    { label: "About Us", href: "/about" },
    { label: "Programs", href: "/programs" },
    { label: "Our People", href: "/leadership" },
  ]
  const actionLinks = footer?.actionLinks ?? [
    { label: "Support Our Mission", href: "/support" },
    { label: "Contact Us", href: "/contact" },
    { label: "Get the App", href: "/app" },
  ]

  return (
    <footer className="mt-auto border-t border-slate-800 bg-[#050814] py-20 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-12 lg:gap-8">
          <div className="md:col-span-5 lg:col-span-4">
            <Link href="/" className="mb-8 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center overflow-hidden rounded-full border border-slate-700 bg-white">
                <Image
                  src={settings.logoUrl || "/logo.png"}
                  alt={`${settings.brandName} logo`}
                  width={40}
                  height={40}
                  className="size-10 object-cover"
                />
              </div>
              <span className="text-xl font-extrabold uppercase tracking-[0.24em] text-white">
                {settings.brandName}
              </span>
            </Link>
            <p className="pe-4 text-sm font-medium leading-relaxed text-slate-400">
              {footer?.description ??
                "FinMentor Money Smart Organization is a registered 501(c)(3) nonprofit committed to advancing financial literacy, student leadership, and community engagement."}
            </p>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-emerald-900/50 bg-emerald-950/30 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-emerald-400">
              <ShieldCheck className="size-4" />
              <span>Verified 501(c)(3) Nonprofit</span>
            </div>
          </div>

          <div className="md:col-span-3 lg:col-span-2 lg:col-start-7">
            <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.24em] text-white">Organization</h4>
            <ul className="space-y-4 text-sm font-medium">
              {organizationLinks.map((item) => (
                <li key={item.href}><Link href={item.href} className="transition-colors hover:text-white">{item.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.24em] text-white">Connect & Act</h4>
            <ul className="space-y-4 text-sm font-medium">
              {actionLinks.map((item, index) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "transition-colors hover:text-white",
                      index === 0 && "text-amber-400 hover:text-amber-300",
                      item.href === "/app" && "flex items-center gap-1"
                    )}
                  >
                    {item.label} {item.href === "/app" ? <ExternalLink className="size-3" /> : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-8 text-xs font-medium md:flex-row">
          <p>&copy; {currentYear} {settings.brandName} Money Smart Organization. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="transition-colors hover:text-white">Terms of Service</Link>
            <a href={`mailto:${settings.contactEmail}`} className="transition-colors hover:text-white">
              {settings.contactEmail}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
