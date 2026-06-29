import { cn } from "@/lib/utils"

const opportunityConfig = {
  low_ctr: { label: "Low CTR", className: "bg-orange-100 text-orange-800 border-orange-200" },
  page2_to_page1: { label: "Page 2→1", className: "bg-blue-100 text-blue-800 border-blue-200" },
  declining: { label: "클릭 감소", className: "bg-red-100 text-red-800 border-red-200" },
  growing: { label: "성장 중", className: "bg-green-100 text-green-800 border-green-200" },
  geo_candidate: { label: "GEO 후보", className: "bg-purple-100 text-purple-800 border-purple-200" },
  cannibalization: { label: "카니발라이제이션", className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
}

export function OpportunityBadge({ type }: { type: string }) {
  const config = opportunityConfig[type as keyof typeof opportunityConfig] || { label: type, className: "" }
  return (
    <span className={cn("inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium", config.className)}>
      {config.label}
    </span>
  )
}
