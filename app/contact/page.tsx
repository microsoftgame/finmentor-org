import { Building, Mail, MapPin, ShieldCheck } from "lucide-react"

import { contactReasons } from "@/lib/site-data"
import { ContactForm } from "@/components/ContactForm"

export async function generateMetadata() {
  return {
    title: "Contact FinMentor",
    description:
      "Contact FinMentor for partnerships, sponsorships, volunteer interest, media, and program questions.",
  }
}

export default function ContactPage() {
  return (
    <div className="animate-in fade-in duration-500 pb-20 pt-24">
      <div className="mx-auto mb-20 mt-12 max-w-4xl px-4 text-center">
        <h1 className="font-heading text-5xl font-bold tracking-tight text-slate-900 md:text-7xl">
          Let&apos;s Connect.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-xl font-medium leading-relaxed text-slate-600">
          Have a question about our programs, partnership opportunities, or media inquiries? We&apos;re here to help.
        </p>
      </div>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-16 lg:flex-row lg:gap-24">
            <div className="lg:w-1/3">
              <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900">
                Direct Contacts
              </h2>
              <div className="mt-10 space-y-8">
                <div className="flex items-start gap-5">
                  <div className="rounded-2xl bg-blue-50 p-4 text-blue-600">
                    <Mail className="size-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Email</h4>
                    <a href="mailto:contact@finmentors.org" className="mt-1 block font-medium text-blue-600 hover:text-blue-800 hover:underline">
                      contact@finmentors.org
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="rounded-2xl bg-blue-50 p-4 text-blue-600">
                    <Building className="size-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Organization</h4>
                    <p className="mt-1 font-medium leading-relaxed text-slate-600">
                      FinMentor Money Smart Organization
                      <br />
                      <span className="text-sm text-slate-500">A CA Nonprofit Public Benefit Corp.</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="rounded-2xl bg-blue-50 p-4 text-blue-600">
                    <MapPin className="size-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Address</h4>
                    <p className="mt-1 font-medium leading-relaxed text-slate-600">
                      1190 Roosevelt #200
                      <br />
                      Irvine, CA 92620
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-noise mt-16 rounded-[2rem] bg-[#0a1128] p-8 text-white">
                <h3 className="flex items-center gap-3 text-xl font-bold">
                  <ShieldCheck className="size-6 text-amber-300" />
                  Privacy Promise
                </h3>
                <p className="mt-4 text-sm font-medium leading-relaxed text-blue-100/80">
                  By submitting an inquiry, you agree to our Privacy Policy. We do not sell or share your personal data, especially considering our work with students.
                </p>
              </div>
            </div>

            <ContactForm reasons={contactReasons} />
          </div>
        </div>
      </section>
    </div>
  )
}
