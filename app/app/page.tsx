import { Award, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getSiteSettings } from "@/lib/cms-content"

export async function generateMetadata() {
  const settings = await getSiteSettings()

  return {
    title: "FinMentor App",
    description:
      "Explore the FinMentor app experience for reservations, volunteer tracking, and digital certificates.",
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
              The Official FinMentor App
            </span>
            <h1 className="mt-8 font-heading text-5xl font-bold leading-[1.1] tracking-tight text-slate-900 md:text-6xl">
              Learn, Participate, & Track Your Journey.
            </h1>
            <p className="mt-8 text-xl font-medium leading-relaxed text-slate-600">
              Our mobile app helps you register for courses, manage volunteer activities, track your progress, and earn verifiable digital certificates.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="https://apps.apple.com/cn/app/fin-mentor/id6737214681"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700"
              >
                <svg viewBox="0 0 24 24" className="mr-2 size-5" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Download on App Store
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.courseappAnd.finmentor"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700"
              >
                <svg viewBox="0 0 24 24" className="mr-2 size-5" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.61 6.115V6.806l8.308 5.901zm3.83-3.83l2.79 2.79c.243.243.243.635 0 .878l-2.79 2.79-2.301-2.302 2.301-2.303zM5.393 3.527l8.308 5.901-2.302 2.302-8.308-5.901 2.302-2.302z"/>
                </svg>
                Get it on Google Play
              </a>
            </div>

            <div className="mt-10 flex items-start gap-3 rounded-2xl border border-amber-200/60 bg-amber-50 p-5">
              <ShieldCheck className="size-6 shrink-0 text-amber-600" />
              <p className="text-sm font-medium leading-relaxed text-slate-700">
                <strong className="text-slate-900">How They&apos;re Different:</strong> The mobile app is built for participating in FinMentor programs. This website is the official hub for our mission, programs, partnerships, and community impact.
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
