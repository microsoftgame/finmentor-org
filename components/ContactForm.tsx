"use client"

import { useState } from "react"
import { CheckCircle2, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const ENDPOINT = "https://formsubmit.co/contact@finmentors.org"

export function ContactForm({ reasons }: { reasons: readonly string[] }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      })
      if (res.ok) {
        setStatus("success")
        form.reset()
      } else {
        setStatus("error")
      }
    } catch {
      // 网络异常时退回原生提交（会跳转 _next）
      form.submit()
    }
  }

  if (status === "success") {
    return (
      <div className="surface-panel p-12 text-center lg:w-2/3">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="size-8" />
        </div>
        <h3 className="mt-6 font-heading text-3xl font-bold tracking-tight text-slate-900">
          Message sent!
        </h3>
        <p className="mt-3 text-lg font-medium text-slate-600">
          Thank you for reaching out. We&apos;ll get back to you soon.
        </p>
        <Button type="button" size="lg" className="mt-8" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <div className="surface-panel lg:w-2/3">
      <form
        action={ENDPOINT}
        method="POST"
        onSubmit={handleSubmit}
        className="space-y-8 p-8 md:p-12"
      >
        {/* FormSubmit 配置（隐藏字段） */}
        <input type="hidden" name="_subject" value="New FinMentor Inquiry" />
        <input type="hidden" name="_captcha" value="true" />
        <input type="hidden" name="_next" value="https://finmentors.org/contact?sent=1" />
        <input type="hidden" name="_template" value="table" />
        {/* 蜜罐：隐藏输入框，机器人填写后会被过滤 */}
        <input
          type="text"
          name="_honey"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <Label htmlFor="fullName">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input id="fullName" name="fullName" type="text" placeholder="John Smith" required />
          </div>
          <div>
            <Label htmlFor="organization">
              Organization <span className="font-normal text-slate-400">(Optional)</span>
            </Label>
            <Input id="organization" name="organization" type="text" placeholder="School or Company Name" />
          </div>
        </div>

        <div>
          <Label htmlFor="email">
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input id="email" name="email" type="email" placeholder="johnsmith@example.com" required />
        </div>

        <div>
          <Label htmlFor="reason">
            Reason for Contact <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <select
              id="reason"
              name="reason"
              defaultValue=""
              required
              className="flex h-14 w-full appearance-none rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-900 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            >
              <option value="" disabled>
                Select a topic...
              </option>
              {reasons.map((reason) => (
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
          <Textarea id="message" name="message" rows={5} placeholder="How can we help you?" required />
        </div>

        {status === "error" && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            Something went wrong. Please try again or email us directly at contact@finmentors.org.
          </p>
        )}

        <Button type="submit" size="lg" className="h-14 w-full text-lg" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  )
}
