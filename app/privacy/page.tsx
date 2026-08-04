import { getSiteSettings } from "@/lib/cms-content"

type Section =
  | { kind: "p"; heading: string; body: string }
  | { kind: "list"; heading: string; items: string[] }
  | { kind: "contact"; heading: string }

const sections: Section[] = [
  {
    kind: "p",
    heading: "Information We Collect",
    body: "We may collect information you voluntarily provide, such as your name, email address, phone number, school or organization, program interest, volunteer interest, registration details, attendance or check-in status, participation records, certificate eligibility, and support request details. If our app includes accounts, QR verification, or activity records, we may collect basic account and usage information needed to provide those services.",
  },
  {
    kind: "list",
    heading: "How We Use Information",
    items: [
      "To respond to inquiries and provide program or app support.",
      "To manage registrations for courses, activities, events, and volunteer opportunities.",
      "To verify attendance or participation through QR code check-in or organizer review.",
      "To maintain participation records and issue certificates when requirements are met.",
      "To operate, improve, and maintain educational programs and resources.",
      "To communicate about workshops, volunteer opportunities, and nonprofit activities when appropriate.",
      "To protect the security, integrity, and lawful operation of our services.",
    ],
  },
  {
    kind: "p",
    heading: "Information Sharing",
    body: "We do not sell personal information. We do not share personal information with third parties for marketing purposes. We may use service providers that help us operate the website, app, communications, or educational resources, and those providers are expected to protect information appropriately.",
  },
  {
    kind: "p",
    heading: "Youth Privacy",
    body: "Protecting young learners is especially important to us. We do not knowingly collect or solicit personal information from children under 13 without verifiable parental consent. If you believe a child has provided personal information to us, please contact us so we can review and delete it where required.",
  },
  {
    kind: "p",
    heading: "Educational Content Notice",
    body: "Our website and app provide educational information only. They do not provide professional financial, investment, legal, or tax advice.",
  },
  { kind: "contact", heading: "Contact Us" },
]

export async function generateMetadata() {
  const settings = await getSiteSettings()

  return {
    title: "Privacy Policy",
    description:
      "How FinMentor collects, uses, and safeguards learner and visitor information.",
    alternates: {
      canonical: `${settings.siteUrl.replace(/\/$/, "")}/privacy`,
    },
  }
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-24 pt-36 sm:px-6 lg:px-8">
      <div className="surface-panel p-10 md:p-14">
        <h1 className="font-heading text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Last updated: March 2026
        </p>
        <p className="mt-6 text-lg font-medium leading-relaxed text-slate-600">
          How we protect learner and visitor information.
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
                    For privacy questions, requests, or concerns, contact FinMentor
                    Money Smart Organization at{" "}
                    <a
                      href="mailto:contact@finmentors.org"
                      className="font-bold text-blue-600 underline-offset-2 hover:underline"
                    >
                      contact@finmentors.org
                    </a>{" "}
                    or 1190 Roosevelt Ste 200, Irvine, CA 92620.
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
