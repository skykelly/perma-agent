"use client"

import { mockPages } from "@/lib/mock-data/seo"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle2, AlertCircle, Clock, FileText, Wrench } from "lucide-react"
import { cn } from "@/lib/utils"

const pageTypeConfig: Record<string, { label: string; className: string }> = {
  guide: { label: "가이드", className: "bg-blue-100 text-blue-800 border-blue-200" },
  category: { label: "카테고리", className: "bg-gray-100 text-gray-800 border-gray-200" },
  product: { label: "제품", className: "bg-green-100 text-green-800 border-green-200" },
  compare: { label: "비교", className: "bg-purple-100 text-purple-800 border-purple-200" },
  article: { label: "아티클", className: "bg-orange-100 text-orange-800 border-orange-200" },
  faq: { label: "FAQ", className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
}

function getSeoScoreColor(score: number) {
  if (score >= 80) return "text-green-600 font-bold"
  if (score >= 60) return "text-yellow-600 font-semibold"
  return "text-red-600 font-semibold"
}

function daysSinceUpdate(dateStr: string) {
  const updated = new Date(dateStr)
  const now = new Date("2026-06-29")
  return Math.floor((now.getTime() - updated.getTime()) / (1000 * 60 * 60 * 24))
}

export default function PagesPage() {
  const technicalIssueCount = mockPages.filter((p) => p.technicalStatus !== "ok").length
  const lowConversionCount = mockPages.filter((p) => p.conversionRate < 0.5).length
  const needsUpdateCount = mockPages.filter((p) => daysSinceUpdate(p.lastUpdated) > 90).length

  return (
    <div className="p-6 space-y-6 max-w-screen-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">랜딩 페이지 분석</h1>
          <p className="text-sm text-muted-foreground mt-0.5">SEO 성과 및 기술 상태 점검</p>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 rounded-lg border bg-card px-4 py-2.5">
          <FileText className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-semibold">{mockPages.length}개 페이지</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <span className="text-sm font-semibold text-red-700">기술 이슈 {technicalIssueCount}건</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-orange-200 bg-orange-50 px-4 py-2.5">
          <AlertCircle className="h-4 w-4 text-orange-500" />
          <span className="text-sm font-semibold text-orange-700">전환율 낮음 {lowConversionCount}건</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-2.5">
          <Clock className="h-4 w-4 text-yellow-600" />
          <span className="text-sm font-semibold text-yellow-700">업데이트 필요 {needsUpdateCount}건</span>
        </div>
      </div>

      {/* Pages Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">페이지별 SEO 성과</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="pl-6 py-3 text-xs font-semibold min-w-[220px]">URL / 제목</TableHead>
                  <TableHead className="text-xs font-semibold">페이지 타입</TableHead>
                  <TableHead className="text-xs font-semibold text-right">클릭</TableHead>
                  <TableHead className="text-xs font-semibold text-right">노출</TableHead>
                  <TableHead className="text-xs font-semibold text-right">CTR</TableHead>
                  <TableHead className="text-xs font-semibold text-right">순위</TableHead>
                  <TableHead className="text-xs font-semibold text-right">세션</TableHead>
                  <TableHead className="text-xs font-semibold text-right">전환율</TableHead>
                  <TableHead className="text-xs font-semibold text-right">SEO점수</TableHead>
                  <TableHead className="text-xs font-semibold">기술상태</TableHead>
                  <TableHead className="text-xs font-semibold">마지막 업데이트</TableHead>
                  <TableHead className="text-xs font-semibold pr-6">개선안</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPages.map((page) => {
                  const days = daysSinceUpdate(page.lastUpdated)
                  const typeCfg = pageTypeConfig[page.pageType]
                  return (
                    <TableRow key={page.id} className="hover:bg-muted/30 transition-colors align-top">
                      <TableCell className="pl-6 py-4">
                        <div>
                          <p className="text-xs font-mono text-blue-600">{page.url}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{page.title}</p>
                          {page.contentGap && (
                            <p className="text-xs text-amber-700 mt-1 bg-amber-50 rounded px-1.5 py-0.5 border border-amber-200">
                              {page.contentGap}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        {typeCfg && (
                          <span className={cn("inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium", typeCfg.className)}>
                            {typeCfg.label}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right text-sm py-4">
                        {page.clicks.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground py-4">
                        {(page.impressions / 1000).toFixed(0)}k
                      </TableCell>
                      <TableCell className="text-right text-sm py-4">
                        {page.ctr.toFixed(2)}%
                      </TableCell>
                      <TableCell className="text-right text-sm py-4">
                        {page.avgPosition}
                      </TableCell>
                      <TableCell className="text-right text-sm py-4">
                        {page.sessions.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right py-4">
                        <span className={cn("text-sm font-medium",
                          page.conversionRate >= 1 ? "text-green-600" :
                          page.conversionRate >= 0.5 ? "text-yellow-600" : "text-red-600"
                        )}>
                          {page.conversionRate.toFixed(2)}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right py-4">
                        <span className={cn("text-sm", getSeoScoreColor(page.seoScore))}>
                          {page.seoScore}
                        </span>
                      </TableCell>
                      <TableCell className="py-4">
                        {page.technicalStatus === "ok" ? (
                          <span className="flex items-center gap-1 text-xs text-green-600">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            정상
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs text-orange-600">
                            <AlertCircle className="h-3.5 w-3.5" />
                            캐노니컬 이슈
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="py-4">
                        <span className={cn("text-xs", days > 120 ? "text-red-600 font-semibold" : "text-muted-foreground")}>
                          {page.lastUpdated}
                          {days > 120 && (
                            <span className="block text-red-500">({days}일 전)</span>
                          )}
                        </span>
                      </TableCell>
                      <TableCell className="pr-6 py-4">
                        {page.technicalStatus !== "ok" ? (
                          <Button variant="outline" size="sm" className="text-xs h-7 border-orange-300 text-orange-700 hover:bg-orange-50">
                            <Wrench className="h-3 w-3 mr-1" />
                            이슈 보기
                          </Button>
                        ) : (
                          <Button size="sm" className="text-xs h-7 bg-green-600 hover:bg-green-700 text-white">
                            브리프 생성
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
