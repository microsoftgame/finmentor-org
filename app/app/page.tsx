import { Award, ShieldCheck, Smartphone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getSiteSettings } from "@/lib/cms-content"

export async function generateMetadata() {
  const settings = await getSiteSettings()

  return {
    title: "Finmentor App",
    description:
      "Explore the Finmentor app experience for reservations, volunteer tracking, and digital certificates.",
    alternates: { canonical: `${settings.siteUrl.replace(/\/$/, "")}/app` },
  }
}

export default function AppIntroPage() {
  return (
    <div className="animate-in fade-in duration-500 pb-20 pt-24">
      <section className="mx-4 overflow-hidden rounded-b-[3rem] bg-slate-50 py-24 sm:mx-8 lg:py-32">
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-16 px-4 sm:px-6 lg:flex-row lg:gap-24 lg:px-8">
          <div className="z-10 lg:w-1/2">
            <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-blue-800">
              The Official Finmentor App
            </span>
            <h1 className="mt-8 font-heading text-5xl font-bold leading-[1.1] tracking-tight text-slate-900 md:text-6xl">
              Learn, Participate, & Track Your Journey.
            </h1>
            <p className="mt-8 text-xl font-medium leading-relaxed text-slate-600">
              Our mobile app is a dedicated platform built for course reservations, volunteer registration, activity tracking, and secure digital certificates.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button
                variant="secondary"
                size="lg"
                className="cursor-not-allowed border border-slate-200 text-slate-500 shadow-none hover:bg-slate-100"
              >
                <Smartphone className="mr-2 size-5" />
                App Coming Soon
              </Button>
            </div>

            <div className="mt-10 flex items-start gap-3 rounded-2xl border border-amber-200/60 bg-amber-50 p-5">
              <ShieldCheck className="size-6 shrink-0 text-amber-600" />
              <p className="text-sm font-medium leading-relaxed text-slate-700">
                <strong className="text-slate-900">System Boundary Note:</strong> The mobile app is a separate service platform for operations. This website remains Finmentor&apos;s official content, impact, and partnership portal.
              </p>
            </div>
          </div>

          <div className="relative z-10 flex justify-center lg:w-1/2">
            <div className="relative flex h-[600px] w-72 flex-col overflow-hidden rounded-[3rem] border-[10px] border-slate-900 bg-white shadow-2xl">
              <div className="absolute left-1/2 top-0 z-20 mx-auto h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-slate-900" />
              <div className="rounded-b-3xl bg-blue-600 px-6 pb-8 pt-14 text-white shadow-sm">
                <h3 className="font-heading text-2xl font-bold tracking-tight">Hello, Student!</h3>
                <p className="mt-1 text-sm font-medium text-blue-100">Ready to learn today?</p>
              </div>
              <div className="flex flex-1 flex-col gap-4 bg-slate-50 p-6">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-heading text-lg font-bold tracking-tight text-slate-900">
                    My Schedule
                  </span>
                  <span className="text-sm font-bold text-blue-600">See All</span>
                </div>
                <div className="rounded-3xl border border-slate-200/60 bg-white p-5 shadow-sm">
                  <div className="text-sm font-extrabold tracking-tight text-slate-900">
                    Credit Basics Workshop
                  </div>
                  <div className="mt-1.5 text-xs font-medium text-slate-500">Tomorrow, 4:00 PM</div>
                </div>
                <div className="rounded-3xl border border-slate-200/60 bg-white p-5 shadow-sm opacity-60">
                  <div className="text-sm font-extrabold tracking-tight text-slate-900">
                    Budgeting 101
                  </div>
                  <div className="mt-1.5 text-xs font-medium text-slate-500">Completed</div>
                </div>
                <div className="mt-auto flex items-center justify-between rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
                  <div>
                    <div className="text-sm font-bold text-emerald-900">Volunteer Hours</div>
                    <div className="mt-1 text-3xl font-black tracking-tight text-emerald-600">
                      12.5 <span className="text-sm font-bold text-emerald-600/70">hrs</span>
                    </div>
                  </div>
                  <Award className="size-10 text-emerald-500" />
                </div>
              </div>
            </div>
            <div className="absolute left-1/2 top-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/20 blur-[100px]" />
          </div>
        </div>
      </section>
    </div>
  )
}
