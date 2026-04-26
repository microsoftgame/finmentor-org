import type { Metadata } from "next"
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google"

import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { getSiteSettings } from "@/lib/cms-content"

import "./globals.css"

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
})

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()

  return {
    title: {
      default: settings.defaultSeoTitle,
      template: `%s | ${settings.brandName}`,
    },
    description: settings.defaultSeoDescription,
    metadataBase: new URL(settings.siteUrl),
    openGraph: {
      title: settings.defaultSeoTitle,
      description: settings.defaultSeoDescription,
      siteName: settings.brandName,
      url: settings.siteUrl,
      images: settings.ogImageUrl ? [{ url: settings.ogImageUrl }] : undefined,
      type: "website",
    },
    icons: {
      icon: settings.faviconUrl || "/favicon.ico",
      shortcut: settings.faviconUrl || "/favicon.ico",
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const settings = await getSiteSettings()

  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${fraunces.variable}`}>
      <body className="min-h-screen text-slate-900">
        <div className="flex min-h-screen flex-col">
          <Header
            brandName={settings.brandName}
            logoUrl={settings.logoUrl}
            navigationItems={settings.navigationJson}
            primaryCtaLabel={settings.primaryCtaLabel}
            primaryCtaHref={settings.primaryCtaHref}
          />
          <main className="flex-1">{children}</main>
          <Footer settings={settings} />
        </div>
      </body>
    </html>
  )
}
