import Image from "next/image"
import Link from "next/link"
import { ArrowRight, HandHeart, Heart, Lightbulb, Shield, Target, Users } from "lucide-react"

import { SectionHeading } from "@/components/SectionHeading"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  financialLiteracyFacts,
  journeySteps,
  leadershipSnapshot,
  missionValues,
  trustHighlights,
} from "@/lib/site-data"
import { getPageMetadata } from "@/lib/cms-content"
import { cn } from "@/lib/utils"

const valueIcons = [Target, Lightbulb, HandHeart]
const snapshotIcons = [Users, Heart]

export async function generateMetadata() {
  return getPageMetadata("about", {
    title: "About FinMentor",
    description: "Learn about FinMentor's mission, history, values, and nonprofit model.",
  })
}

export default function AboutPage() {
  return (
    <div className="animate-in fade-in duration-500 pb-20 pt-24">
      <div className="mx-auto mb-24 mt-12 max-w-5xl px-4 text-center">
        <span className="block text-sm font-bold uppercase tracking-[0.24em] text-blue-600">
          About FinMentor
        </span>
        <h1 className="mt-4 font-heading text-5xl font-bold tracking-tight text-slate-900 md:text-7xl">
          From an idea sparked at a national conference to a community-driven nonprofit.
        </h1>
        <p className="mx-auto mt-8 max-w-3xl text-xl font-medium leading-relaxed text-slate-600">
          We advance financial literacy, leadership, and community education for students and families across California.
        </p>
      </div>

      <section className="border-t border-slate-200/60 bg-slate-50 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Story"
            subtitle="The journey reflects the power of youth leadership in creating lasting community impact."
            centered
          />
          <div className="space-y-12">
            {journeySteps.map((step) => (
              <div key={step.title} className="group flex flex-col gap-6 sm:flex-row sm:gap-12">
                <div className="pt-1 sm:w-1/3 sm:text-right">
                  <span className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
                    {step.year}
                  </span>
                </div>
                <div className="relative pb-12 sm:w-2/3 sm:border-l-2 sm:border-slate-200 sm:pl-12 sm:last:pb-0">
                  <div className="absolute left-[-9px] top-1 hidden size-4 rounded-full border-4 border-blue-600 bg-white transition-colors group-hover:bg-blue-600 sm:block" />
                  <h3 className="font-heading text-2xl font-bold tracking-tight text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-3 font-medium leading-relaxed text-slate-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#0a1128] py-24 text-white">
        <div className="bg-noise absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Mission, Vision & Values" centered light />
          <div className="grid gap-8 md:grid-cols-3">
            {missionValues.map((item, index) => {
              const Icon = valueIcons[index]

              return (
                <div
                  key={item.title}
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-10 backdrop-blur-lg transition-colors hover:bg-white/10"
                >
                  <Icon className={`mb-8 size-10 ${item.accent}`} />
                  <h3 className="font-heading text-2xl font-bold tracking-tight">{item.title}</h3>
                  <p className="mt-4 font-medium leading-relaxed text-blue-100/80">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <SectionHeading
              title="Why Financial Literacy Matters"
              subtitle="Many young people leave school without the skills needed to budget, understand credit, or plan for the future."
            />
            <ul className="space-y-4">
              {financialLiteracyFacts.map((fact) => (
                <li key={fact} className="flex items-start gap-3">
                  <div className="mt-0.5 flex size-6 items-center justify-center rounded-full bg-emerald-100">
                    <span className="text-sm text-emerald-600">+</span>
                  </div>
                  <span className="font-medium text-slate-700">{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
              <Image
                src="https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/v1785162854/finmentor/about/why-financial-literacy-right.png"
                alt="Students learning financial literacy together"
                width={1200}
                height={900}
                className="h-[440px] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 rounded-3xl bg-amber-400 p-6 text-slate-950 shadow-xl">
              <p className="text-3xl font-black tracking-tight">66%</p>
              <p className="text-sm font-bold uppercase tracking-[0.18em]">OF AMERICANS lack basic financial knowledge</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[#0a1128] py-24 text-white">
        <div className="bg-noise absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Trust & Transparency"
            subtitle="We are committed to accountability, educational integrity, and transparency in everything we do."
            centered
            light
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {trustHighlights.map((item) => (
              <div key={item.title} className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
                <Shield className="mb-4 size-8 text-amber-300" />
                <h3 className="font-heading text-xl font-bold tracking-tight text-white">{item.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-blue-100/75">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Meet Our People"
            subtitle="Meet the people who bring FinMentor's mission to life through leadership, education, collaboration, and community service."
            centered
          />
          <div className="mt-12 overflow-hidden rounded-3xl">
            <Image
              src="https://res.cloudinary.com/mzpdswax/image/upload/f_auto,q_auto/v1785162852/finmentor/about/meet-our-people-new.png"
              alt="FinMentor team"
              width={1200}
              height={600}
              className="w-full object-cover"
              style={{ aspectRatio: '2/1', objectFit: 'cover' }}
            />
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/leadership"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white"
              )}
            >
              Meet Our People
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-amber-400 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-4xl font-bold tracking-tight text-slate-950">
            Get Involved
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-medium leading-relaxed text-slate-900/75">
            Join our community of educators, volunteers, and supporters making a difference through financial education.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/support" className={cn(buttonVariants({ size: "lg" }), "bg-slate-950 text-white hover:bg-slate-800")}>
              Support Our Mission
            </Link>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-slate-950 text-slate-950 hover:bg-slate-950 hover:text-white"
              )}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
