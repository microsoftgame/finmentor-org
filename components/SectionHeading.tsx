import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
}

export function SectionHeading({
  title,
  subtitle,
  centered = false,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-16", centered && "text-center")}>
      <h2
        className={cn(
          "font-heading text-3xl font-bold tracking-tight md:text-5xl",
          light ? "text-white" : "text-slate-900"
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-6 max-w-3xl text-lg font-medium leading-relaxed",
            light ? "text-blue-100/80" : "text-slate-600",
            centered && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}
