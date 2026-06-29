"use client"
import { mockTotals, mockCampaigns, mockDailyMetrics } from "@/lib/mock-data/marketing"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts"
import { ArrowUpRight, ArrowDownRight, AlertTriangle, TrendingUp, Bot, Bell, ChevronRight, ArrowUpDown } from "lucide-react"
import Link from "next/link"

function formatKRW(n: number) {
  return "₩" + n.toLocaleString("ko-KR")
}

function formatShortKRW(n: number) {
  if (n >= 1000000) return "₩" + (n / 1000000).toFixed(1) + "M"
  if (n >= 1000) return "₩" + (n / 1000).toFixed(0) + "K"
  return "₩" + n
}

function ChangeBadge({ value, invert = false }: { value: number; invert?: boolean }) {
  const positive = invert ? value < 0 : value > 0
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${positive ? "text-green-600" : "text-red-600"}`}>
      {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
      {Math.abs(value).toFixed(1)}%
    </span>
  )
}

const kpiCards = [
  { label: "총 광고비", value: formatKRW(mockTotals.totalSpend), change: mockTotals.spendChange, invert: true },
  { label: "총 매출", value: formatKRW(mockTotals.totalRevenue), change: mockTotals.revenueChange },
  { label: "ROAS", value: mockTotals.roas.toFixed(2), change: mockTotals.roasChange },
  { label: "CPA", value: formatKRW(mockTotals.cpa), change: mockTotals.cpaChange, invert: true },
  { label: "전환수", value: mockTotals.totalConversions.toLocaleString(), change: 5.2 },
  { label: "CTR", value: mockTotals.ctr.toFixed(2) + "%", change: 1.8 },
  { label: "CPC", value: formatKRW(mockTotals.cpc), change: -2.1, invert: true },
  { label: "CVR", value: mockTotals.cvr.toFixed(2) + "%", change: 3.4 },
]

const chartData = mockDailyMetrics.map(d => ({
  date: d.date.slice(5),
  매출: Math.round(d.revenue / 10000),
  광고비: Math.round(d.spend / 10000),
}))

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">오늘의 성과</h1>
          <p className="text-sm text-slate-500 mt-0.5">2026년 6월 29일 기준 · 최근 30일</p>
        </div>
        <Button className="gap-2">
          <Bot className="h-4 w-4" />
          Agent 실행
        </Button>
      </div>

      {/* Pending approvals banner */}
      <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
        <div className="flex items-center gap-2 text-blue-800">
          <Bell className="h-4 w-4" />
          <span className="text-sm font-medium">승인 대기 <strong>{mockTotals.pendingApprovals}건</strong>의 AI 추천이 있습니다</span>
        </div>
        <Link href="/recommendations">
          <Button variant="outline" size="sm" className="text-blue-700 border-blue-300 hover:bg-blue-100 gap-1">
            검토하기 <ChevronRight className="h-3 w-3" />
          </Button>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {kpiCards.map((card) => (
          <Card key={card.label}>
            <CardContent className="pt-6">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{card.label}</p>
              <p className="text-2xl font-bold mt-1 text-slate-900">{card.value}</p>
              <div className="mt-1">
                <ChangeBadge value={card.change} invert={card.invert} />
                <span className="text-xs text-muted-foreground ml-1">vs 전월</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <span className="text-sm font-semibold text-red-800">위험 신호</span>
            <Badge variant="destructive" className="text-xs">CPA 초과</Badge>
          </div>
          <p className="text-sm text-red-700 font-medium">쇼핑 캠페인 - 냉장고</p>
          <p className="text-xs text-red-600 mt-0.5">CPA ₩26,643 (목표 대비 +48%)</p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <span className="text-sm font-semibold text-orange-800">위험 신호</span>
            <Badge variant="warning" className="text-xs">CTR 저조</Badge>
          </div>
          <p className="text-sm text-orange-700 font-medium">신규 고객 확보 - 에어컨</p>
          <p className="text-xs text-orange-600 mt-0.5">CTR 0.79% (플랫폼 평균 대비 -34%)</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm font-semibold text-green-800">기회 신호</span>
            <Badge variant="success" className="text-xs">예산 여유</Badge>
          </div>
          <p className="text-sm text-green-700 font-medium">리타겟팅 - 장바구니 이탈</p>
          <p className="text-xs text-green-600 mt-0.5">ROAS 7.78, 예산 여유 17.3%</p>
        </div>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">매출 및 광고비 추이 (30일)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} interval={4} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}만`} />
              <Tooltip formatter={(v, name) => [`${Number(v).toLocaleString()}만원`, name]} />
              <Legend />
              <Line type="monotone" dataKey="매출" stroke="#3b82f6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="광고비" stroke="#f59e0b" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Campaign Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">캠페인 성과 현황</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer hover:text-slate-900">캠페인명 <ArrowUpDown className="inline h-3 w-3 ml-1" /></TableHead>
                <TableHead>플랫폼</TableHead>
                <TableHead>상태</TableHead>
                <TableHead className="cursor-pointer hover:text-slate-900">광고비 <ArrowUpDown className="inline h-3 w-3 ml-1" /></TableHead>
                <TableHead className="cursor-pointer hover:text-slate-900">매출 <ArrowUpDown className="inline h-3 w-3 ml-1" /></TableHead>
                <TableHead className="cursor-pointer hover:text-slate-900">ROAS <ArrowUpDown className="inline h-3 w-3 ml-1" /></TableHead>
                <TableHead className="cursor-pointer hover:text-slate-900">CPA <ArrowUpDown className="inline h-3 w-3 ml-1" /></TableHead>
                <TableHead className="cursor-pointer hover:text-slate-900">CTR <ArrowUpDown className="inline h-3 w-3 ml-1" /></TableHead>
                <TableHead>위험도</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCampaigns.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>
                    <Link href={`/campaigns/${c.id}`} className="font-medium text-blue-600 hover:underline">
                      {c.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600">{c.platform}</span>
                  </TableCell>
                  <TableCell>
                    {c.status === "active"
                      ? <Badge variant="success">활성</Badge>
                      : <Badge variant="secondary">일시중지</Badge>
                    }
                  </TableCell>
                  <TableCell className="font-medium">{c.spend > 0 ? formatShortKRW(c.spend) : "-"}</TableCell>
                  <TableCell className="font-medium">{c.revenue > 0 ? formatShortKRW(c.revenue) : "-"}</TableCell>
                  <TableCell>
                    {c.roas > 0
                      ? <span className={c.roas >= 4 ? "text-green-700 font-semibold" : "text-red-600 font-semibold"}>{c.roas.toFixed(2)}</span>
                      : "-"
                    }
                  </TableCell>
                  <TableCell>{c.cpa > 0 ? formatKRW(c.cpa) : "-"}</TableCell>
                  <TableCell>{c.ctr > 0 ? c.ctr.toFixed(2) + "%" : "-"}</TableCell>
                  <TableCell>
                    {c.riskLevel === "low" && <Badge variant="success">낮음</Badge>}
                    {c.riskLevel === "medium" && <Badge variant="warning">중간</Badge>}
                    {c.riskLevel === "high" && <Badge variant="destructive">높음</Badge>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
