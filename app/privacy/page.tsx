import { getSiteSettings } from "@/lib/cms-content"

export async function generateMetadata() {
  const settings = await getSiteSettings()

  return {
    title: "Privacy Policy",
    description: "Privacy policy and student data handling information for Finmentor.",
    alternates: { canonical: `${settings.siteUrl.replace(/\/$/, "")}/privacy` },
  }
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-24 pt-36 sm:px-6 lg:px-8">
      <div className="surface-panel p-10 md:p-14">
        <h1 className="font-heading text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-6 text-lg font-medium leading-relaxed text-slate-600">
          This prototype preserves the placeholder privacy content from the original demo. In a production handoff, replace this page with your approved legal copy and student data handling policy.
        </p>
      </div>
    </div>
  )
}
