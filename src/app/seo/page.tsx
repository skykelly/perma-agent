"use client"

import { seoSiteMetrics, seoTrendData, mockTechnicalIssues, mockContentBriefs } from "@/lib/mock-data/seo"
import { SeoKpiCard } from "@/components/seo/SeoKpiCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import {
  Bot,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Search,
  FileText,
  Wrench,
  Brain,
  MousePointerClick,
  Eye,
  BarChart2,
  Target,
} from "lucide-react"
import Link from "next/link"

const highIssues = mockTechnicalIssues.filter((i) => i.severity === "high")

export default function SeoDashboardPage() {
  const chartData = seoTrendData.map((d) => ({
    ...d,
    date: d.date.slice(5),
  }))

  return (
    <div className="p-6 space-y-8 max-w-screen-2xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">SEO 대시보드</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Google Search Console · GA4 · PageSpeed
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-xs px-3 py-1">
            2026-06-29
          </Badge>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Bot className="h-4 w-4" />
            Agent 실행
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <SeoKpiCard
          label="유기 클릭"
          value="284,720"
          change={seoSiteMetrics.clicksChange}
          icon={<MousePointerClick className="h-8 w-8" />}
        />
        <SeoKpiCard
          label="유기 노출"
          value="8,420,000"
          change={seoSiteMetrics.impressionsChange}
          icon={<Eye className="h-8 w-8" />}
        />
        <SeoKpiCard
          label="평균 CTR"
          value="3.38%"
          change={seoSiteMetrics.ctrChange}
          icon={<Target className="h-8 w-8" />}
        />
        <SeoKpiCard
          label="평균 순위"
          value="12.4"
          change={seoSiteMetrics.positionChange}
          changeLabel="전주 대비 (높을수록 악화)"
          icon={<BarChart2 className="h-8 w-8" />}
        />
        <SeoKpiCard
          label="브랜드 클릭"
          value="86,380"
          icon={<Search className="h-8 w-8" />}
        />
        <SeoKpiCard
          label="논브랜드 클릭"
          value="198,340"
          icon={<Search className="h-8 w-8" />}
        />
        <SeoKpiCard
          label="Page 1 진입 후보"
          value="63건"
          highlight
          icon={<TrendingUp className="h-8 w-8" />}
        />
        <SeoKpiCard
          label="CTR 개선 기회"
          value="38건"
          icon={<AlertTriangle className="h-8 w-8" />}
        />
      </div>

      {/* Trend Chart */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">유기 검색 트렌드 (28일)</CardTitle>
            <div className="flex items-center gap-2 rounded-md bg-amber-50 border border-amber-200 px-3 py-1.5 text-xs text-amber-800">
              <AlertTriangle className="h-3.5 w-3.5" />
              클릭 4.2% 감소 추세 감지 — CTR 개선 조치 필요
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11 }}
                tickLine={false}
                interval={6}
              />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                domain={[5, 20]}
                reversed
              />
              <Tooltip
                formatter={(value: number, name: string) => {
                  if (name === "클릭") return [value.toLocaleString(), name]
                  if (name === "순위") return [value, name]
                  return [value, name]
                }}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="clicks"
                name="클릭"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="position"
                name="순위"
                stroke="#f97316"
                strokeWidth={2}
                dot={false}
                strokeDasharray="4 4"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Opportunity Matrix */}
      <div>
        <h2 className="text-base font-semibold mb-3 text-foreground">기회 매트릭스</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-orange-200 bg-orange-50/40">
            <CardContent className="p-5">
              <div className="text-3xl font-bold text-orange-600 mb-1">38건</div>
              <div className="text-sm font-medium text-foreground mb-1">High Impression / Low CTR</div>
              <div className="text-xs text-muted-foreground mb-3">title/meta 개선으로 CTR 향상 가능</div>
              <Badge className="bg-orange-100 text-orange-800 border-orange-200 text-xs mb-3">
                title/meta 개선
              </Badge>
              <div>
                <Link href="/seo/queries">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    분석 보기
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50/40">
            <CardContent className="p-5">
              <div className="text-3xl font-bold text-blue-600 mb-1">63건</div>
              <div className="text-sm font-medium text-foreground mb-1">Page 2 → Page 1 진입</div>
              <div className="text-xs text-muted-foreground mb-3">콘텐츠 보강 시 1페이지 진입 가능</div>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs mb-3">
                콘텐츠 보강 + 내부링크
              </Badge>
              <div>
                <Link href="/seo/queries">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    분석 보기
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50/40">
            <CardContent className="p-5">
              <div className="text-3xl font-bold text-red-600 mb-1">24건</div>
              <div className="text-sm font-medium text-foreground mb-1">클릭 감소 페이지</div>
              <div className="text-xs text-muted-foreground mb-3">전주 대비 클릭이 감소 중인 페이지</div>
              <Badge className="bg-red-100 text-red-800 border-red-200 text-xs mb-3">
                콘텐츠 업데이트
              </Badge>
              <div>
                <Link href="/seo/queries">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    분석 보기
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50/40">
            <CardContent className="p-5">
              <div className="text-3xl font-bold text-purple-600 mb-1">18건</div>
              <div className="text-sm font-medium text-foreground mb-1">GEO 후보 쿼리</div>
              <div className="text-xs text-muted-foreground mb-3">AI 검색 답변 진입 가능한 쿼리</div>
              <Badge className="bg-purple-100 text-purple-800 border-purple-200 text-xs mb-3">
                Brand Answer 콘텐츠
              </Badge>
              <div>
                <Link href="/seo/queries">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    분석 보기
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Technical SEO Issues */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Wrench className="h-4 w-4 text-red-500" />
                기술 SEO 주요 이슈
              </CardTitle>
              <Link href="/seo/technical">
                <Button variant="ghost" size="sm" className="text-xs text-blue-600">
                  전체 보기
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {highIssues.slice(0, 3).map((issue) => (
              <div
                key={issue.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-red-50 border border-red-100"
              >
                <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-red-100 text-red-800 border-red-200 text-xs">높음</Badge>
                    <span className="text-xs text-muted-foreground font-mono truncate">{issue.url}</span>
                  </div>
                  <p className="text-xs text-foreground leading-relaxed">{issue.issue}</p>
                  <p className="text-xs text-blue-600 mt-1 font-medium">조치 필요: {issue.recommendedAction}</p>
                </div>
              </div>
            ))}
            <Link href="/seo/technical">
              <Button variant="outline" size="sm" className="w-full text-xs mt-2">
                전체 {seoSiteMetrics.technicalIssueCount}건 이슈 보기
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Content Brief Queue */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-500" />
                콘텐츠 브리프 대기
              </CardTitle>
              <Link href="/seo/briefs">
                <Button variant="ghost" size="sm" className="text-xs text-blue-600">
                  전체 보기
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockContentBriefs.map((brief) => (
              <div
                key={brief.id}
                className="flex items-start gap-3 p-3 rounded-lg border bg-card"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <Badge
                      className={
                        brief.priority === "high"
                          ? "bg-red-100 text-red-800 border-red-200 text-xs"
                          : "bg-yellow-100 text-yellow-800 border-yellow-200 text-xs"
                      }
                    >
                      {brief.priority === "high" ? "높음" : "중간"}
                    </Badge>
                    <Badge
                      className={
                        brief.status === "pending_approval"
                          ? "bg-orange-100 text-orange-800 border-orange-200 text-xs"
                          : "bg-blue-100 text-blue-800 border-blue-200 text-xs"
                      }
                    >
                      {brief.status === "pending_approval" ? "승인 대기" : "진행 중"}
                    </Badge>
                  </div>
                  <p className="text-xs font-medium text-foreground truncate">{brief.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 font-mono">{brief.targetUrl}</p>
                </div>
                <div className="text-xs text-muted-foreground shrink-0">
                  신뢰도 {Math.round(brief.confidenceScore * 100)}%
                </div>
              </div>
            ))}
            <Link href="/seo/briefs">
              <Button variant="outline" size="sm" className="w-full text-xs mt-2">
                브리프 {seoSiteMetrics.approvalPendingCount}건 승인 대기
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* GEO Readiness */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Brain className="h-4 w-4 text-purple-500" />
              GEO / AI 검색 준비도
            </CardTitle>
            <Link href="/seo/geo">
              <Button variant="ghost" size="sm" className="text-xs text-purple-600">
                상세 분석
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0 text-center">
              <div className="text-4xl font-bold text-orange-600">42</div>
              <div className="text-xs text-muted-foreground mt-1">/ 100</div>
              <div className="mt-1">
                <Badge className="bg-orange-100 text-orange-800 border-orange-200 text-xs">
                  기초 구축 중
                </Badge>
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">구조화 데이터</span>
                  <span className="font-medium">60%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "60%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Q&A 콘텐츠</span>
                  <span className="font-medium">35%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: "35%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">내부 링크 구조</span>
                  <span className="font-medium">55%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 rounded-full" style={{ width: "55%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">브랜드 언급</span>
                  <span className="font-medium">28%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-red-400 rounded-full" style={{ width: "28%" }} />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
