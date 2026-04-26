import Image from "next/image"
import Link from "next/link"
import { Award, Briefcase, Globe, GraduationCap, Heart, MessageCircle, Users } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  missionConnectionBullets,
} from "@/lib/site-data"
import { getLeadershipContent, getPageMetadata } from "@/lib/cms-content"
import { cn } from "@/lib/utils"

const benefitIcons = [Briefcase, GraduationCap, Heart, Award]

export async function generateMetadata() {
  return getPageMetadata("leadership", {
    title: "Leadership & Volunteer Opportunities",
    description:
      "Join Finmentor student leadership tracks and volunteer roles that build real community impact.",
  })
}

export default async function LeadershipPage() {
  const {
    adultAdvisors,
    leadershipBenefits,
    leadershipTracks,
    leadershipWhyBullets,
    missionConnectionBullets: cmsMissionConnectionBullets,
  } = await getLeadershipContent()

  return (
    <div className="animate-in fade-in duration-500 pb-20 pt-24">
      <div className="relative mx-4 mb-20 overflow-hidden rounded-b-[3rem] bg-[#0a1128] py-24 text-white sm:mx-8">
        <div className="bg-noise absolute inset-0" />
        <div className="absolute right-0 top-0 size-96 rounded-full bg-emerald-500/20 blur-[100px]" />
        <div className="absolute bottom-0 left-0 size-96 rounded-full bg-blue-500/20 blur-[100px]" />

        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <span className="block text-sm font-bold uppercase tracking-[0.24em] text-emerald-300">
            Leadership & Volunteer Opportunities
          </span>
          <h1 className="mt-6 font-heading text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Young leaders building real community impact.
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-xl font-medium leading-relaxed text-blue-50">
            Join a community of student leaders, mentors, and volunteers who turn financial literacy into action.
          </p>
        </div>
      </div>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Why Leadership Matters
            </h2>
            <p className="mt-6 text-lg font-medium leading-relaxed text-slate-600">
              At Finmentor, we believe young people can create lasting change. Our leadership program develops the next generation of financial educators and community builders.
            </p>
            <ul className="mt-8 space-y-4">
              {leadershipWhyBullets.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="mt-0.5 flex size-6 items-center justify-center rounded-full bg-emerald-100">
                    <span className="text-sm text-emerald-600">+</span>
                  </div>
                  <span className="font-medium text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                alt="Student leaders collaborating"
                width={1200}
                height={900}
                className="h-[440px] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 rounded-3xl bg-amber-400 p-6 text-slate-950 shadow-xl">
              <p className="text-3xl font-black tracking-tight">50+</p>
              <p className="text-sm font-bold uppercase tracking-[0.18em]">Student Leaders</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <Users className="mx-auto mb-4 size-10 text-blue-600" />
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Adult Advisory Board
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg font-medium text-slate-600">
              Experienced professionals provide guidance, oversight, and connective tissue to help Finmentor grow responsibly.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {adultAdvisors.map((advisor) => (
              <Card key={advisor.name} className="border-slate-200/70 bg-white text-center">
                <CardContent>
                  <div className="mx-auto mb-5 size-24 overflow-hidden rounded-full ring-4 ring-slate-100">
                    <Image
                      src={advisor.image}
                      alt={advisor.name}
                      width={240}
                      height={240}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="font-heading text-xl font-bold tracking-tight text-slate-900">
                    {advisor.name}
                  </h3>
                  <p className="mt-2 font-medium text-slate-700">{advisor.role}</p>
                  <p className="mt-1 text-sm font-medium text-slate-500">{advisor.organization}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <Award className="mx-auto mb-4 size-10 text-amber-500" />
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Open Leadership Tracks
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg font-medium text-slate-600">
              Join our student leadership team and develop skills that last long after the program ends.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {leadershipTracks.map((track) => (
              <Card
                key={track.title}
                className="group flex flex-col border-slate-200 transition-all hover:border-emerald-500 hover:shadow-lg"
              >
                <CardContent className="flex flex-1 flex-col">
                  <h3 className="font-heading text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-emerald-600">
                    {track.title}
                  </h3>
                  <p className="mt-4 font-medium leading-relaxed text-slate-600">{track.description}</p>
                  <div className="mt-6 border-t border-slate-200 pt-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                      Key Responsibilities
                    </p>
                    <ul className="mt-3 space-y-2">
                      {track.responsibilities.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm font-medium text-slate-600">
                          <span className="size-1.5 rounded-full bg-blue-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              What You&apos;ll Gain
            </h2>
            <p className="mt-3 text-lg font-medium text-slate-600">Real skills for your future.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {leadershipBenefits.map((benefit, index) => {
              const Icon = benefitIcons[index]

              return (
                <Card key={benefit.title} className="border-slate-200/70 bg-white text-center">
                  <CardContent>
                    <Icon className="mx-auto mb-4 size-10 text-amber-500" />
                    <h3 className="font-heading text-xl font-bold tracking-tight text-slate-900">
                      {benefit.title}
                    </h3>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative bg-[#0a1128] py-24 text-white">
        <div className="bg-noise absolute inset-0" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <Globe className="mb-4 size-10 text-amber-300" />
            <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
              Connected to Our Mission
            </h2>
            <p className="mt-6 text-lg font-medium leading-relaxed text-blue-100/80">
              Every leadership role at Finmentor directly contributes to stronger financial literacy in the community. You grow as a leader while helping others grow too.
            </p>
            <ul className="mt-8 space-y-3">
              {(cmsMissionConnectionBullets || missionConnectionBullets).map((item) => (
                <li key={item} className="flex items-center gap-3 text-blue-50">
                  <Heart className="size-5 text-amber-300" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop"
              alt="Leadership in action"
              width={1200}
              height={900}
              className="h-[440px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-amber-400 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <MessageCircle className="mx-auto mb-4 size-10 text-slate-950" />
          <h2 className="font-heading text-4xl font-bold tracking-tight text-slate-950">
            Get started today.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-medium leading-relaxed text-slate-900/75">
            Reach out to learn more about leadership opportunities, volunteer onboarding, and how to support the program.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "bg-slate-950 text-white hover:bg-slate-800")}>
              Contact Us
            </Link>
            <Link
              href="/support"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-slate-950 text-slate-950 hover:bg-slate-950 hover:text-white"
              )}
            >
              Support the Program
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
