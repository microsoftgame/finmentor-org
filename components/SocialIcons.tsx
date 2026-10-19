import * as React from "react"
import Link from "next/link"

import { socialLinks } from "@/lib/site-data"
import { cn } from "@/lib/utils"

export function YouTubeIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>YouTube</title>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

export function InstagramIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Instagram</title>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  )
}

export function FacebookIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Facebook</title>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

export function TikTokIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>TikTok</title>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.77 1.81-.02 3.32-1.4 3.47-3.21.09-2.01.04-4.02.05-6.03.01-4.22-.02-8.43.02-12.65z" />
    </svg>
  )
}

export function getSocialIcon(name: string, className = "size-5") {
  switch (name.toLowerCase()) {
    case "youtube":
      return <YouTubeIcon className={className} />
    case "instagram":
      return <InstagramIcon className={className} />
    case "facebook":
      return <FacebookIcon className={className} />
    case "tiktok":
      return <TikTokIcon className={className} />
    default:
      return null
  }
}

/**
 * 优雅通用的社交媒体图标组（适用于 Footer、Contact 等）
 */
export function SocialLinksList({
  variant = "footer",
  className,
}: {
  variant?: "footer" | "contact" | "minimal"
  className?: string
}) {
  if (variant === "footer") {
    return (
      <div className={cn("flex flex-wrap items-center gap-3", className)}>
        {socialLinks.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit FinMentor on ${item.name}`}
            className={cn(
              "group relative flex size-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/90 text-slate-400 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
              item.color
            )}
          >
            {getSocialIcon(item.name, "size-5 transition-transform duration-300 group-hover:scale-110")}
          </a>
        ))}
      </div>
    )
  }

  if (variant === "contact") {
    return (
      <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-4", className)}>
        {socialLinks.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit FinMentor on ${item.name}`}
            className="group flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-md"
          >
            <div className={cn("mb-2 flex size-10 items-center justify-center rounded-xl bg-slate-50 text-slate-700 transition-colors duration-300", item.color)}>
              {getSocialIcon(item.name, "size-5 transition-transform duration-300 group-hover:scale-110")}
            </div>
            <span className="font-heading text-sm font-bold text-slate-900 group-hover:text-blue-600">
              {item.name}
            </span>
            <span className="mt-0.5 text-xs text-slate-500">
              {item.handle}
            </span>
          </a>
        ))}
      </div>
    )
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {socialLinks.map((item) => (
        <a
          key={item.name}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.name}
          className="text-slate-400 transition-colors hover:text-white"
        >
          {getSocialIcon(item.name, "size-4")}
        </a>
      ))}
    </div>
  )
}
