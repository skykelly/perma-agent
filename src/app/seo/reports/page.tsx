"use client"

import { seoWeeklyReport, seoSiteMetrics } from "@/lib/mock-data/seo"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import {
  TrendingUp,
  TrendingDown,
  Download,
  FileText,
  Bot,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MousePointerClick,
  Eye,
} from "lucide-react"

function StatChip({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className={cn("rounded-lg border px-4 py-3 text-center", color)}>
      <div className="text-xl font-bold">{value}</div>
      <div className="text-xs mt-0.5 opacity-80">{label}</div>
    </div>
  )
}

export default function ReportsPage() {
  const markdownContent = `# SEO 주간 리포트\n**기간:** ${seoWeeklyReport.period}\n\n## 요약\n${seoWeeklyReport.summary}\n\n## 주요 지표\n- 유기 클릭: 284,720 (${seoSiteMetrics.clicksChange}%)\n- 유기 노출: 8,420,000 (+${seoSiteMetrics.impressionsChange}%)\n- 평균 CTR: 3.38%\n- 평균 순위: 12.4\n\n## 상승 쿼리\n${seoWeeklyReport.topGainers.map(g => `- ${g.query}: ${g.clicksChange}`).join('\n')}\n\n## 하락 쿼리\n${seoWeeklyReport.topDecliners.map(d => `- ${d.query}: ${d.clicksChange}`).join('\n')}\n`

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">SEO 리포트</h1>
          <p className="text-sm text-muted-foreground mt-0.5">자동 생성 주간/월간/Executive 리포트</p>
        </div>
        <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
          <Bot className="h-4 w-4" />
          리포트 생성
        </Button>
      </div>

      <Tabs defaultValue="weekly">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="weekly">주간 리포트</TabsTrigger>
          <TabsTrigger value="monthly">월간 리포트</TabsTrigger>
          <TabsTrigger value="executive">Executive Summary</TabsTrigger>
        </TabsList>

        {/* Weekly Report */}
        <TabsContent value="weekly" className="space-y-6 mt-6">
          {/* Period Header */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg font-bold text-foreground">주간 SEO 리포트</h2>
                    <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-800 border border-blue-200 px-2.5 py-0.5 text-xs font-medium">
                      자동 생성
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{seoWeeklyReport.period}</p>
                </div>
                <a
                  href={`data:text/markdown;charset=utf-8,${encodeURIComponent(markdownContent)}`}
                  download="seo-weekly-report.md"
                >
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Markdown 다운로드
                  </Button>
                </a>
              </div>

              {/* Summary */}
              <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
                <p className="text-sm text-blue-900 leading-relaxed">{seoWeeklyReport.summary}</p>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">이번 주 주요 지표</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatChip
                label="유기 클릭"
                value="284,720"
                color="border-red-200 bg-red-50 text-red-700"
              />
              <StatChip
                label="유기 노출"
                value="8.42M"
                color="border-green-200 bg-green-50 text-green-700"
              />
              <StatChip
                label="평균 CTR"
                value="3.38%"
                color="border-orange-200 bg-orange-50 text-orange-700"
              />
              <StatChip
                label="평균 순위"
                value="12.4"
                color="border-blue-200 bg-blue-50 text-blue-700"
              />
            </div>
          </div>

          {/* Gainers & Decliners */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2 text-green-700">
                  <TrendingUp className="h-4 w-4" />
                  상승 쿼리
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="pl-4 py-2 text-xs">검색어</TableHead>
                      <TableHead className="text-xs text-right">클릭 변화</TableHead>
                      <TableHead className="pr-4 text-xs text-right">순위 변화</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {seoWeeklyReport.topGainers.map((g, i) => (
                      <TableRow key={i} className="hover:bg-muted/30">
                        <TableCell className="pl-4 py-2 text-sm">{g.query}</TableCell>
                        <TableCell className="text-right text-sm font-semibold text-green-600">
                          {g.clicksChange}
                        </TableCell>
                        <TableCell className="pr-4 text-right text-sm text-green-600">
                          {g.positionChange}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2 text-red-700">
                  <TrendingDown className="h-4 w-4" />
                  하락 쿼리
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="pl-4 py-2 text-xs">검색어</TableHead>
                      <TableHead className="text-xs text-right">클릭 변화</TableHead>
                      <TableHead className="pr-4 text-xs text-right">순위 변화</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {seoWeeklyReport.topDecliners.map((d, i) => (
                      <TableRow key={i} className="hover:bg-muted/30">
                        <TableCell className="pl-4 py-2 text-sm">{d.query}</TableCell>
                        <TableCell className="text-right text-sm font-semibold text-red-600">
                          {d.clicksChange}
                        </TableCell>
                        <TableCell className="pr-4 text-right text-sm text-red-600">
                          {d.positionChange}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Activity Summary */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">이번 주 활동 요약</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <Eye className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground">{seoWeeklyReport.newOpportunities}</div>
                  <div className="text-xs text-muted-foreground">신규 기회 발견</div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground">{seoWeeklyReport.technicalIssuesFound}</div>
                  <div className="text-xs text-muted-foreground">기술 이슈 발견</div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground">{seoWeeklyReport.briefsGenerated}</div>
                  <div className="text-xs text-muted-foreground">브리프 생성</div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
                <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground">{seoWeeklyReport.pendingApprovals}</div>
                  <div className="text-xs text-muted-foreground">승인 대기</div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Week Priorities */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">다음 주 우선순위</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { label: "CTR 낮은 3개 페이지 title/meta 최적화", priority: "high" },
                { label: "canonical 오류 페이지 즉시 수정 (개발팀 요청)", priority: "high" },
                { label: "에어컨 추천 2026 가이드 콘텐츠 업데이트", priority: "medium" },
                { label: "삼성 vs LG 냉장고 비교 브리프 승인 후 집필 시작", priority: "medium" },
                { label: "GEO 후보 쿼리 5개에 대한 Brand Answer 브리프 생성", priority: "low" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className={cn(
                    "inline-flex shrink-0 items-center rounded-md border px-2 py-0.5 text-xs font-medium",
                    item.priority === "high" ? "bg-red-100 text-red-800 border-red-200" :
                    item.priority === "medium" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                    "bg-gray-100 text-gray-700 border-gray-200"
                  )}>
                    {item.priority === "high" ? "높음" : item.priority === "medium" ? "중간" : "낮음"}
                  </span>
                  <span className="text-sm text-foreground">{item.label}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Monthly Report */}
        <TabsContent value="monthly" className="space-y-6 mt-6">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-4xl font-bold text-muted-foreground/30 mb-4">
                <FileText className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">6월 월간 리포트</h3>
              <p className="text-sm text-muted-foreground mb-6">2026-06-01 ~ 2026-06-29 기간 데이터 집계 중</p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 max-w-lg mx-auto">
                <StatChip label="월간 유기 클릭" value="1.2M" color="border-blue-200 bg-blue-50 text-blue-700" />
                <StatChip label="월간 유기 노출" value="38.4M" color="border-green-200 bg-green-50 text-green-700" />
                <StatChip label="신규 기회 발견" value="34건" color="border-purple-200 bg-purple-50 text-purple-700" />
              </div>

              <Button variant="outline" className="gap-2">
                <Bot className="h-4 w-4" />
                월간 리포트 생성
              </Button>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">6월 월간 성과 하이라이트</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "오브제컬렉션 냉장고 순위 2.8 달성", type: "positive" },
                  { label: "비스포크 냉장고 클릭 전월 대비 +22%", type: "positive" },
                  { label: "냉장고 추천 쿼리 클릭 -4.2% 하락 지속", type: "negative" },
                  { label: "canonical 이슈 2건 잔존 — 기술 조치 필요", type: "negative" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    {item.type === "positive" ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                    )}
                    <span className="text-sm text-foreground">{item.label}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">다음 달 SEO 목표</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "냉장고 추천 쿼리 평균 클릭 10,000 이상 회복",
                  "CTR 3.38% → 3.8% 이상 개선",
                  "기술 SEO 이슈 47건 → 30건 이하 감소",
                  "GEO 준비도 42 → 55 이상 달성",
                  "콘텐츠 브리프 12건 승인 완료",
                ].map((goal, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-sm text-foreground">{goal}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Executive Summary */}
        <TabsContent value="executive" className="space-y-6 mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-foreground">Executive Summary</h2>
                  <p className="text-sm text-muted-foreground">2026년 6월 29일 기준</p>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  PDF 내보내기
                </Button>
              </div>

              {/* Traffic at a glance */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-4 text-center">
                  <MousePointerClick className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-700">284,720</div>
                  <div className="text-xs text-blue-600 mt-1">월간 유기 클릭</div>
                  <div className="text-xs font-medium text-red-600 mt-1">-4.2% 전월 대비</div>
                </div>
                <div className="rounded-xl border-2 border-green-200 bg-green-50 p-4 text-center">
                  <Eye className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-700">8.42M</div>
                  <div className="text-xs text-green-600 mt-1">월간 유기 노출</div>
                  <div className="text-xs font-medium text-green-600 mt-1">+8.7% 전월 대비</div>
                </div>
                <div className="rounded-xl border-2 border-purple-200 bg-purple-50 p-4 text-center">
                  <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-700">101건</div>
                  <div className="text-xs text-purple-600 mt-1">성장 기회 발견</div>
                  <div className="text-xs font-medium text-purple-600 mt-1">Page1/Low CTR/GEO</div>
                </div>
                <div className="rounded-xl border-2 border-orange-200 bg-orange-50 p-4 text-center">
                  <AlertTriangle className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-700">47건</div>
                  <div className="text-xs text-orange-600 mt-1">기술 이슈 잔존</div>
                  <div className="text-xs font-medium text-red-600 mt-1">High 3건 즉시 조치</div>
                </div>
              </div>

              {/* Strategic Summary */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-foreground border-b pb-2">전략적 현황</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">브랜드 검색</div>
                    <div className="text-2xl font-bold text-foreground">86,380<span className="text-base font-normal text-muted-foreground ml-1">클릭</span></div>
                    <div className="text-xs text-muted-foreground">전체 유기 클릭의 30.3%</div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "30.3%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">논브랜드 검색</div>
                    <div className="text-2xl font-bold text-foreground">198,340<span className="text-base font-normal text-muted-foreground ml-1">클릭</span></div>
                    <div className="text-xs text-muted-foreground">전체 유기 클릭의 69.7%</div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "69.7%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">GEO 준비도</div>
                    <div className="text-2xl font-bold text-orange-600">42<span className="text-base font-normal text-muted-foreground ml-1">/ 100</span></div>
                    <div className="text-xs text-muted-foreground">기초 구축 중 단계</div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: "42%" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Recommendations */}
              <div className="mt-6 space-y-3">
                <h3 className="text-base font-semibold text-foreground border-b pb-2">경영진 권고 사항</h3>
                {[
                  { icon: <AlertTriangle className="h-4 w-4 text-red-500" />, text: "canonical 오류 즉시 수정 — Impact 9/10, Effort 2/10의 Quick Win" },
                  { icon: <FileText className="h-4 w-4 text-blue-500" />, text: "냉장고 추천 가이드 리라이트 승인 — 월간 1만 클릭 회복 기대" },
                  { icon: <Bot className="h-4 w-4 text-purple-500" />, text: "GEO 전략 시작 — AI 검색 트래픽 비율이 분기별 5%p씩 증가 중" },
                ].map((rec, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/40">
                    <div className="shrink-0 mt-0.5">{rec.icon}</div>
                    <p className="text-sm text-foreground">{rec.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
