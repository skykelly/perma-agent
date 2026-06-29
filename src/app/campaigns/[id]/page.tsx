"use client"
import { mockCampaigns, mockDailyMetrics, mockRecommendations } from "@/lib/mock-data/marketing"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { ChevronRight, ArrowUpDown } from "lucide-react"
import Link from "next/link"
import { use } from "react"

function formatKRW(n: number) {
  return "₩" + n.toLocaleString("ko-KR")
}
function formatShortKRW(n: number) {
  if (n >= 1000000) return "₩" + (n / 1000000).toFixed(1) + "M"
  if (n >= 1000) return "₩" + (n / 1000).toFixed(0) + "K"
  return "₩" + n
}

const mockAdGroups = [
  { name: "브랜드 정확히 일치", impressions: 142000, clicks: 5820, ctr: 4.10, conversions: 148, cpa: 7240, roas: 8.20, spend: 1071520 },
  { name: "브랜드 구문 일치", impressions: 210000, clicks: 5840, ctr: 2.78, conversions: 132, cpa: 8940, spend: 1180080, roas: 6.12 },
  { name: "경쟁사 키워드", impressions: 98000, clicks: 1920, ctr: 1.96, conversions: 42, cpa: 12940, spend: 543480, roas: 3.84 },
  { name: "카테고리 키워드", impressions: 35230, clicks: 676, ctr: 1.92, conversions: 20, cpa: 2620, spend: 52380, roas: 5.44 },
]

export default function CampaignDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const campaign = mockCampaigns.find(c => c.id === id) || mockCampaigns[0]
  const relatedRecs = mockRecommendations.filter(r => r.targetCampaign === campaign.name)

  const totalSpend = mockDailyMetrics.reduce((a, b) => a + b.spend, 0)
  const chartData = mockDailyMetrics.map(d => ({
    date: d.date.slice(5),
    매출: Math.round(d.revenue / mockDailyMetrics.reduce((a, b) => a + b.revenue, 0) * campaign.revenue / 10000),
    광고비: Math.round(d.spend / totalSpend * campaign.spend / 10000),
  }))

  const kpis = [
    { label: "광고비", value: formatShortKRW(campaign.spend) },
    { label: "매출", value: formatShortKRW(campaign.revenue) },
    { label: "ROAS", value: campaign.roas > 0 ? campaign.roas.toFixed(2) : "-" },
    { label: "CPA", value: campaign.cpa > 0 ? formatKRW(campaign.cpa) : "-" },
    { label: "CTR", value: campaign.ctr > 0 ? campaign.ctr.toFixed(2) + "%" : "-" },
    { label: "CVR", value: campaign.cvr > 0 ? campaign.cvr.toFixed(2) + "%" : "-" },
    { label: "전환수", value: campaign.conversions > 0 ? campaign.conversions.toLocaleString() : "-" },
    { label: "노출수", value: campaign.impressions > 0 ? campaign.impressions.toLocaleString() : "-" },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-sm text-slate-500">
        <Link href="/dashboard" className="hover:text-slate-900">대시보드</Link>
        <ChevronRight className="h-3 w-3" />
        <span>캠페인</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-900 font-medium">{campaign.name}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-slate-900">{campaign.name}</h1>
            {campaign.status === "active"
              ? <Badge variant="success">활성</Badge>
              : <Badge variant="secondary">일시중지</Badge>
            }
            <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600">{campaign.platform}</span>
          </div>
          <p className="text-sm text-slate-500">목표: {campaign.objective} · 예산: {formatKRW(campaign.budget)}/월 · 소진율: {campaign.budgetUtilization.toFixed(1)}%</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">수정</Button>
          <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">일시중지</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map(k => (
          <Card key={k.label}>
            <CardContent className="pt-6">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{k.label}</p>
              <p className="text-2xl font-bold mt-1 text-slate-900">{k.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">일별 매출 및 광고비 (30일)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} interval={4} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}만`} />
              <Tooltip formatter={(v, name) => [`${Number(v).toLocaleString()}만원`, name]} />
              <Legend />
              <Area type="monotone" dataKey="매출" stroke="#3b82f6" fill="url(#colorRevenue)" strokeWidth={2} />
              <Area type="monotone" dataKey="광고비" stroke="#f59e0b" fill="url(#colorSpend)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="adgroups">
        <TabsList>
          <TabsTrigger value="adgroups">광고그룹 성과</TabsTrigger>
          <TabsTrigger value="recommendations">추천 액션 {relatedRecs.length > 0 && `(${relatedRecs.length})`}</TabsTrigger>
          <TabsTrigger value="history">실행 이력</TabsTrigger>
        </TabsList>

        <TabsContent value="adgroups">
          <Card>
            <CardContent className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>광고그룹명 <ArrowUpDown className="inline h-3 w-3 ml-1" /></TableHead>
                    <TableHead>노출 <ArrowUpDown className="inline h-3 w-3 ml-1" /></TableHead>
                    <TableHead>클릭 <ArrowUpDown className="inline h-3 w-3 ml-1" /></TableHead>
                    <TableHead>CTR <ArrowUpDown className="inline h-3 w-3 ml-1" /></TableHead>
                    <TableHead>전환 <ArrowUpDown className="inline h-3 w-3 ml-1" /></TableHead>
                    <TableHead>CPA <ArrowUpDown className="inline h-3 w-3 ml-1" /></TableHead>
                    <TableHead>ROAS <ArrowUpDown className="inline h-3 w-3 ml-1" /></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAdGroups.map((ag) => (
                    <TableRow key={ag.name}>
                      <TableCell className="font-medium">{ag.name}</TableCell>
                      <TableCell>{ag.impressions.toLocaleString()}</TableCell>
                      <TableCell>{ag.clicks.toLocaleString()}</TableCell>
                      <TableCell>{ag.ctr.toFixed(2)}%</TableCell>
                      <TableCell>{ag.conversions}</TableCell>
                      <TableCell>{formatKRW(ag.cpa)}</TableCell>
                      <TableCell>
                        <span className={ag.roas >= 5 ? "text-green-700 font-semibold" : ag.roas >= 3 ? "text-yellow-700" : "text-red-600"}>
                          {ag.roas.toFixed(2)}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations">
          <div className="space-y-3">
            {relatedRecs.length === 0 ? (
              <Card><CardContent className="pt-6 text-center text-muted-foreground py-12">현재 이 캠페인에 대한 추천 액션이 없습니다.</CardContent></Card>
            ) : relatedRecs.map(rec => (
              <Card key={rec.id}>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="info" className="text-xs">{rec.agentName}</Badge>
                        <Badge variant={rec.riskLevel === "low" ? "success" : rec.riskLevel === "medium" ? "warning" : "destructive"} className="text-xs">
                          {rec.riskLevel === "low" ? "저위험" : rec.riskLevel === "medium" ? "중위험" : "고위험"}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-slate-900">{rec.title}</h3>
                      <p className="text-sm text-slate-600 mt-1">{rec.summary}</p>
                    </div>
                    <Badge variant={rec.status === "pending_approval" ? "warning" : rec.status === "approved" ? "success" : "secondary"}>
                      {rec.status === "pending_approval" ? "승인 대기" : rec.status === "approved" ? "승인됨" : "거절됨"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardContent className="pt-4">
              <div className="space-y-3">
                {[
                  { date: "2026-06-29 06:02", action: "Budget Optimization Agent가 예산 분석 완료", type: "info" },
                  { date: "2026-06-28 09:15", action: "제외 키워드 11개 적용 승인됨", type: "success" },
                  { date: "2026-06-27 14:30", action: "자동 입찰 전략 조정 (Target CPA: ₩8,000)", type: "info" },
                  { date: "2026-06-26 08:00", action: "Performance Diagnosis Agent 분석 완료", type: "info" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 py-2 border-b last:border-0">
                    <div className={`h-2 w-2 rounded-full mt-1.5 ${item.type === "success" ? "bg-green-500" : "bg-blue-500"}`} />
                    <div>
                      <p className="text-sm text-slate-900">{item.action}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.date}</p>
                    </div>
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
