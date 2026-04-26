import { Building, ChevronDown, Mail, MapPin, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getPageMetadata } from "@/lib/cms-content"
import { contactReasons } from "@/lib/site-data"

export async function generateMetadata() {
  return getPageMetadata("contact", {
    title: "Contact Finmentor",
    description:
      "Contact Finmentor for partnerships, sponsorships, volunteer interest, media, and program questions.",
  })
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
                      Finmentor Money Smart Organization
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
                      123 Education Way, Suite 100
                      <br />
                      Orange County, CA 92653
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

            <div className="surface-panel lg:w-2/3">
              <form className="space-y-8 p-8 md:p-12">
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <Label htmlFor="fullName">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input id="fullName" type="text" placeholder="Jane Doe" required />
                  </div>
                  <div>
                    <Label htmlFor="organization">
                      Organization <span className="font-normal text-slate-400">(Optional)</span>
                    </Label>
                    <Input id="organization" type="text" placeholder="School or Company Name" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input id="email" type="email" placeholder="jane@example.com" required />
                </div>

                <div>
                  <Label htmlFor="reason">
                    Reason for Contact <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <select
                      id="reason"
                      className="flex h-14 w-full appearance-none rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-900 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      defaultValue=""
                      required
                    >
                      <option value="" disabled>
                        Select a topic...
                      </option>
                      {contactReasons.map((reason) => (
                        <option key={reason} value={reason.toLowerCase().replaceAll(" ", "-")}>
                          {reason}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-5 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">
                    Message <span className="text-red-500">*</span>
                  </Label>
                  <Textarea id="message" rows={5} placeholder="How can we help you?" required />
                </div>

                <Button type="submit" size="lg" className="h-14 w-full text-lg">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
