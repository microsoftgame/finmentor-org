import Image from "next/image"
import Link from "next/link"
import { BookOpen, CheckCircle2, Heart, ShieldCheck, Smartphone, Users } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getPageMetadata } from "@/lib/cms-content"
import { supportCards, trustBullets } from "@/lib/site-data"
import { cn } from "@/lib/utils"

const icons = [Users, BookOpen, Heart, Smartphone]

export async function generateMetadata() {
  return getPageMetadata("support", {
    title: "Support Finmentor",
    description:
      "Support Finmentor's free financial literacy programs, educational materials, and student leadership development.",
  })
}

export default function SupportPage() {
  return (
    <div className="animate-in fade-in duration-500 pb-20 pt-24">
      <section className="relative mx-4 overflow-hidden rounded-b-[3rem] bg-[#0a1128] py-32 text-white sm:mx-8">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40 mix-blend-overlay"
          />
        </div>
        <div className="bg-noise absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1128] via-transparent to-transparent" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <span className="block text-sm font-bold uppercase tracking-[0.24em] text-amber-300">
            Partner With Finmentor
          </span>
          <h1 className="mt-6 font-heading text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Empowering the Next Generation Together.
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-xl font-medium leading-relaxed text-blue-100/90">
            Your support directly funds educational materials, workshop execution, and student leadership development in our communities.
          </p>
          <Link href="/contact" className={cn(buttonVariants({ variant: "brandGold", size: "lg" }), "mt-12")}>
            Inquire About Sponsorship
          </Link>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-16 lg:flex-row lg:gap-24">
            <div className="lg:w-1/3">
              <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900">
                Trust & Transparency
              </h2>
              <Card className="mt-8 border-slate-200/60 bg-slate-50 shadow-none">
                <CardContent>
                  <ShieldCheck className="mb-8 size-12 text-blue-600" />
                  <ul className="space-y-5 font-medium text-slate-700">
                    {trustBullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-4">
                        <CheckCircle2 className="mt-0.5 size-6 shrink-0 text-emerald-500" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="lg:w-2/3">
              <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900">
                How Support Helps
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {supportCards.map((item, index) => {
                  const Icon = icons[index]

                  return (
                    <Card
                      key={item.title}
                      className="border-slate-200/60 transition-shadow hover:shadow-md"
                    >
                      <CardContent>
                        <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-blue-50">
                          <Icon className="size-6 text-blue-600" />
                        </div>
                        <h3 className="font-heading text-xl font-bold tracking-tight text-slate-900">
                          {item.title}
                        </h3>
                        <p className="mt-3 font-medium leading-relaxed text-slate-600">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
