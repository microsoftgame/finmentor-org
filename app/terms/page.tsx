import { getSiteSettings } from "@/lib/cms-content"

type Section =
  | { kind: "p"; heading: string; body: string }
  | { kind: "list"; heading: string; items: string[] }
  | { kind: "contact"; heading: string }

const sections: Section[] = [
  {
    kind: "p",
    heading: "Educational Use",
    body: "Our content and resources are provided for general informational and educational purposes only. They do not constitute professional financial, investment, tax, accounting, legal, or other professional advice.",
  },
  {
    kind: "list",
    heading: "Appropriate Use",
    items: [
      "Use the website, app, and materials for lawful educational, volunteer, and nonprofit program purposes.",
      "Provide accurate registration, attendance, and participation information.",
      "Do not misuse QR check-in, certificate, or participation-record features.",
      "Do not attempt to disrupt, misuse, reverse engineer, or compromise our services.",
      "Do not submit false, harmful, infringing, or unlawful content through contact or program forms.",
    ],
  },
  {
    kind: "p",
    heading: "Intellectual Property",
    body: "Unless otherwise stated, website content, educational materials, logos, graphics, and text are owned by or licensed to FinMentor Money Smart Organization and are protected by applicable intellectual property laws. Limited personal, educational use is permitted where allowed by law.",
  },
  {
    kind: "p",
    heading: "Third-Party Services",
    body: "Our website or app may link to third-party websites, app stores, or services. We are not responsible for third-party content, policies, or practices.",
  },
  {
    kind: "p",
    heading: "Limitation of Liability",
    body: "To the fullest extent permitted by law, FinMentor Money Smart Organization is not liable for indirect, incidental, consequential, or special damages arising from use of, or inability to use, our website, app, or educational resources.",
  },
  {
    kind: "p",
    heading: "Changes to These Terms",
    body: "We may update these terms from time to time. The updated version will be posted on this page with a revised date.",
  },
  { kind: "contact", heading: "Contact" },
]

export async function generateMetadata() {
  const settings = await getSiteSettings()

  return {
    title: "Terms of Service",
    description: "Website terms of service for FinMentor Money Smart Organization.",
    alternates: {
      canonical: `${settings.siteUrl.replace(/\/$/, "")}/terms`,
    },
  }
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-24 pt-36 sm:px-6 lg:px-8">
      <div className="surface-panel p-10 md:p-14">
        <h1 className="font-heading text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Last updated: March 2026
        </p>
        <p className="mt-6 text-lg font-medium leading-relaxed text-slate-600">
          Terms for using FinMentor resources.
        </p>

        <div className="mt-12 space-y-10">
          {sections.map((section) => {
            if (section.kind === "contact") {
              return (
                <div
                  key={section.heading}
                  className="rounded-2xl border border-slate-200/70 bg-slate-50 p-6"
                >
                  <h2 className="font-heading text-2xl font-bold tracking-tight text-slate-900">
                    {section.heading}
                  </h2>
                  <p className="mt-3 font-medium leading-relaxed text-slate-600">
                    Questions about these terms may be sent to{" "}
                    <a
                      href="mailto:contact@finmentors.org"
                      className="font-bold text-blue-600 underline-offset-2 hover:underline"
                    >
                      contact@finmentors.org
                    </a>
                    .
                  </p>
                </div>
              )
            }

            if (section.kind === "list") {
              return (
                <section key={section.heading}>
                  <h2 className="font-heading text-2xl font-bold tracking-tight text-slate-900">
                    {section.heading}
                  </h2>
                  <ul className="mt-4 space-y-3 pl-6 text-slate-600 marker:text-blue-500">
                    {section.items.map((item) => (
                      <li key={item} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              )
            }

            return (
              <section key={section.heading}>
                <h2 className="font-heading text-2xl font-bold tracking-tight text-slate-900">
                  {section.heading}
                </h2>
                <p className="mt-4 leading-relaxed text-slate-600">{section.body}</p>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
