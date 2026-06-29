"use client"

import { mockContentBriefs } from "@/lib/mock-data/seo"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CheckCircle2, XCircle, Link2, FileText, Bot, ExternalLink } from "lucide-react"

const statusConfig: Record<string, { label: string; className: string }> = {
  pending_approval: { label: "승인 대기", className: "bg-orange-100 text-orange-800 border-orange-200" },
  in_progress: { label: "진행 중", className: "bg-blue-100 text-blue-800 border-blue-200" },
  approved: { label: "승인 완료", className: "bg-green-100 text-green-800 border-green-200" },
}

const priorityConfig: Record<string, { label: string; className: string }> = {
  high: { label: "우선순위: 높음", className: "bg-red-100 text-red-800 border-red-200" },
  medium: { label: "우선순위: 중간", className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  low: { label: "우선순위: 낮음", className: "bg-gray-100 text-gray-700 border-gray-200" },
}

const intentLabel: Record<string, string> = {
  commercial_investigation: "상업적 조사",
  informational: "정보 탐색",
  transactional: "구매",
}

export default function BriefsPage() {
  const pendingCount = mockContentBriefs.filter((b) => b.status === "pending_approval").length
  const inProgressCount = mockContentBriefs.filter((b) => b.status === "in_progress").length
  const approvedCount = mockContentBriefs.filter((b) => b.status === "approved").length

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">콘텐츠 브리프</h1>
          <p className="text-sm text-muted-foreground mt-0.5">AI 생성 콘텐츠 개선안 — 검토 후 승인하세요</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-orange-500 inline-block" />
              대기 중 {pendingCount}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-500 inline-block" />
              진행 중 {inProgressCount}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500 inline-block" />
              승인 완료 {approvedCount}
            </span>
          </div>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Bot className="h-4 w-4" />
            브리프 생성
          </Button>
        </div>
      </div>

      {/* Brief Cards */}
      <div className="space-y-6">
        {mockContentBriefs.map((brief) => {
          const statusCfg = statusConfig[brief.status]
          const priorityCfg = priorityConfig[brief.priority]

          return (
            <Card key={brief.id} className="overflow-hidden">
              {/* Card Header */}
              <CardHeader className="pb-0 pt-5 px-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {priorityCfg && (
                        <span className={cn("inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium", priorityCfg.className)}>
                          {priorityCfg.label}
                        </span>
                      )}
                      {statusCfg && (
                        <span className={cn("inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium", statusCfg.className)}>
                          {statusCfg.label}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">{brief.createdAt} 생성</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground leading-tight">{brief.title}</h3>
                    <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                      <span className="text-xs font-mono text-blue-600">{brief.targetUrl}</span>
                      <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                        {brief.queryCluster}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-2xl font-bold text-blue-600">{Math.round(brief.confidenceScore * 100)}%</div>
                    <div className="text-xs text-muted-foreground">AI 신뢰도</div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="px-6 pt-5 pb-5 space-y-5">
                {/* Metrics row */}
                <div className="flex gap-3 flex-wrap">
                  <span className="inline-flex items-center rounded-md bg-blue-50 border border-blue-200 px-2.5 py-1 text-xs font-medium text-blue-700">
                    인텐트: {intentLabel[brief.searchIntent] || brief.searchIntent}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">AI 신뢰도</span>
                    <div className="h-1.5 w-24 bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn("h-full rounded-full", brief.confidenceScore >= 0.8 ? "bg-green-500" : "bg-blue-500")}
                        style={{ width: `${brief.confidenceScore * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium">{Math.round(brief.confidenceScore * 100)}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Current Gap */}
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">현재 콘텐츠 갭</h4>
                    <ul className="space-y-1.5">
                      {brief.currentGap.map((gap, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                          <span className="text-foreground">{gap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommended Sections */}
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">권장 섹션</h4>
                    <ul className="space-y-1.5">
                      {brief.recommendedSections.map((section, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                          <span className="text-foreground">{section}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Title Options */}
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    <FileText className="h-3.5 w-3.5 inline mr-1" />
                    제목 옵션
                  </h4>
                  <div className="space-y-2">
                    {brief.titleOptions.map((title, i) => (
                      <div key={i} className="flex items-start gap-2 p-2.5 rounded-md bg-muted/50 border">
                        <span className="shrink-0 text-xs font-semibold text-blue-600 mt-0.5">
                          Option {String.fromCharCode(65 + i)}
                        </span>
                        <span className="text-sm text-foreground">{title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Internal Links */}
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      <Link2 className="h-3.5 w-3.5 inline mr-1" />
                      내부 링크 제안
                    </h4>
                    <div className="space-y-1.5">
                      {brief.internalLinks.map((link, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                          <span className="text-blue-600 underline font-medium">{link.anchor}</span>
                          <span className="text-muted-foreground font-mono">{link.url}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Structured Data */}
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      구조화 데이터 권장
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {brief.structuredData.map((sd, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center rounded-full bg-gray-100 text-gray-700 border border-gray-200 px-2.5 py-0.5 text-xs font-medium"
                        >
                          {sd}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex gap-2">
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
                      size="sm"
                    >
                      승인 요청
                    </Button>
                    <Button variant="outline" size="sm" className="text-sm">
                      수정
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs text-blue-600 gap-1">
                    상세 보기
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
