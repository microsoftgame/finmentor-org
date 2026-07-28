import { getSiteSettings } from "@/lib/cms-content"

export async function generateMetadata() {
  const settings = await getSiteSettings()

  return {
    title: "Terms of Service",
    description: "Website terms of service for FinMentor.",
    alternates: { canonical: `${settings.siteUrl.replace(/\/$/, "")}/terms` },
  }
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-24 pt-36 sm:px-6 lg:px-8">
      <div className="surface-panel p-10 md:p-14">
        <h1 className="font-heading text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-6 text-lg font-medium leading-relaxed text-slate-600">
          This prototype includes a placeholder terms page so the migrated navigation stays complete. Replace it with your finalized website usage and sponsorship terms before launch.
        </p>
      </div>
    </div>
  )
}
