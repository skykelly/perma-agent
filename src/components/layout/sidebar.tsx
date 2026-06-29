"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, Target, ThumbsUp, Bot, FileText,
  Search, Globe, BookOpen, Wrench, Brain, ChevronDown, TrendingUp
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

const marketingNav = [
  { href: "/dashboard", label: "대시보드", icon: LayoutDashboard },
  { href: "/campaigns/camp-001", label: "캠페인", icon: Target },
  { href: "/recommendations", label: "추천 & 승인", icon: ThumbsUp },
  { href: "/agent-runs", label: "Agent 실행 로그", icon: Bot },
  { href: "/reports", label: "리포트", icon: FileText },
]

const seoNav = [
  { href: "/seo", label: "SEO 대시보드", icon: Search },
  { href: "/seo/queries", label: "검색어 기회", icon: TrendingUp },
  { href: "/seo/pages", label: "랜딩 페이지", icon: Globe },
  { href: "/seo/briefs", label: "콘텐츠 브리프", icon: BookOpen },
  { href: "/seo/technical", label: "기술 SEO", icon: Wrench },
  { href: "/seo/geo", label: "GEO / AI 검색", icon: Brain },
  { href: "/seo/reports", label: "SEO 리포트", icon: FileText },
]

function NavItem({ href, label, icon: Icon }: { href: string; label: string; icon: React.ElementType }) {
  const pathname = usePathname()
  const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href))
  return (
    <Link href={href} className={cn(
      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
      isActive ? "bg-white/15 text-white font-medium" : "text-slate-400 hover:bg-white/10 hover:text-white"
    )}>
      <Icon className="h-4 w-4 shrink-0" />
      <span>{label}</span>
    </Link>
  )
}

export function Sidebar() {
  const [seoOpen, setSeoOpen] = useState(true)
  const [marketingOpen, setMarketingOpen] = useState(true)

  return (
    <div className="flex h-screen w-64 flex-col bg-slate-900 border-r border-slate-800">
      <div className="flex h-16 items-center px-6 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-blue-500 flex items-center justify-center">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-none">Performance</p>
            <p className="text-slate-400 text-xs">Agent One</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div>
          <button
            onClick={() => setMarketingOpen(v => !v)}
            className="flex w-full items-center justify-between px-3 mb-1"
          >
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">퍼포먼스 마케팅</span>
            <ChevronDown className={cn("h-3 w-3 text-slate-500 transition-transform", !marketingOpen && "-rotate-90")} />
          </button>
          {marketingOpen && (
            <div className="space-y-0.5">
              {marketingNav.map(item => <NavItem key={item.href} {...item} />)}
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => setSeoOpen(v => !v)}
            className="flex w-full items-center justify-between px-3 mb-1"
          >
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">SEO / GEO</span>
            <ChevronDown className={cn("h-3 w-3 text-slate-500 transition-transform", !seoOpen && "-rotate-90")} />
          </button>
          {seoOpen && (
            <div className="space-y-0.5">
              {seoNav.map(item => <NavItem key={item.href} {...item} />)}
            </div>
          )}
        </div>
      </div>

      <div className="px-3 pb-4 border-t border-slate-800 pt-3">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-medium">M</div>
          <div>
            <p className="text-white text-sm font-medium">마케팅팀</p>
            <p className="text-slate-400 text-xs">marketing@company.kr</p>
          </div>
        </div>
      </div>
    </div>
  )
}
