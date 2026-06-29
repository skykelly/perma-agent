"use client"

import { useState } from "react"
import { mockQueries } from "@/lib/mock-data/seo"
import { OpportunityBadge } from "@/components/seo/OpportunityBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { Search, TrendingUp, TrendingDown, Bot } from "lucide-react"
import { cn } from "@/lib/utils"

const intentConfig = {
  informational: { label: "정보형", className: "bg-blue-100 text-blue-800 border-blue-200" },
  commercial: { label: "상업형", className: "bg-green-100 text-green-800 border-green-200" },
  transactional: { label: "구매형", className: "bg-purple-100 text-purple-800 border-purple-200" },
}

const scatterColors = {
  low_ctr: "#f97316",
  page2_to_page1: "#3b82f6",
  declining: "#ef4444",
  growing: "#22c55e",
  geo_candidate: "#a855f7",
  cannibalization: "#eab308",
}

function getPositionColor(pos: number) {
  if (pos <= 3) return "text-green-600 font-bold"
  if (pos <= 10) return "text-blue-600 font-semibold"
  return "text-orange-600"
}

export default function QueriesPage() {
  const [search, setSearch] = useState("")
  const [intentFilter, setIntentFilter] = useState("all")
  const [opportunityFilter, setOpportunityFilter] = useState("all")
  const [valueFilter, setValueFilter] = useState("all")

  const filtered = mockQueries.filter((q) => {
    const matchSearch =
      !search ||
      q.query.toLowerCase().includes(search.toLowerCase()) ||
      q.url.toLowerCase().includes(search.toLowerCase())
    const matchIntent = intentFilter === "all" || q.intent === intentFilter
    const matchOpportunity = opportunityFilter === "all" || q.opportunityType === opportunityFilter
    const matchValue = valueFilter === "all" || q.businessValue === valueFilter
    return matchSearch && matchIntent && matchOpportunity && matchValue
  })

  const lowCtrCount = mockQueries.filter((q) => q.opportunityType === "low_ctr").length
  const page2Count = mockQueries.filter((q) => q.opportunityType === "page2_to_page1").length
  const geoCount = mockQueries.filter((q) => q.opportunityType === "geo_candidate").length

  const scatterByType: Record<string, { x: number; y: number; name: string }[]> = {}
  mockQueries.forEach((q) => {
    if (!scatterByType[q.opportunityType]) scatterByType[q.opportunityType] = []
    scatterByType[q.opportunityType].push({ x: q.position, y: q.ctr, name: q.query })
  })

  const opportunityLabels: Record<string, string> = {
    low_ctr: "Low CTR",
    page2_to_page1: "Page 2→1",
    declining: "클릭 감소",
    growing: "성장 중",
    geo_candidate: "GEO 후보",
  }

  return (
    <div className="p-6 space-y-6 max-w-screen-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">검색어 기회 분석</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Google Search Console 쿼리 데이터 기반</p>
        </div>
        <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
          <Bot className="h-4 w-4" />
          쿼리 분석 실행
        </Button>
      </div>

      {/* Summary chips */}
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
          총 {mockQueries.length}개 쿼리
        </span>
        <span className="inline-flex items-center rounded-full bg-orange-100 text-orange-800 px-3 py-1 text-xs font-medium">
          Low CTR {lowCtrCount}건
        </span>
        <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-800 px-3 py-1 text-xs font-medium">
          Page2→1 {page2Count}건
        </span>
        <span className="inline-flex items-center rounded-full bg-purple-100 text-purple-800 px-3 py-1 text-xs font-medium">
          GEO 후보 {geoCount}건
        </span>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="검색어 또는 URL 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-sm"
          />
        </div>
        <Select value={intentFilter} onValueChange={setIntentFilter}>
          <SelectTrigger className="w-40 h-9 text-sm">
            <SelectValue placeholder="검색 인텐트" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 인텐트</SelectItem>
            <SelectItem value="informational">정보형</SelectItem>
            <SelectItem value="commercial">상업형</SelectItem>
            <SelectItem value="transactional">구매형</SelectItem>
          </SelectContent>
        </Select>
        <Select value={opportunityFilter} onValueChange={setOpportunityFilter}>
          <SelectTrigger className="w-40 h-9 text-sm">
            <SelectValue placeholder="기회 유형" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 기회</SelectItem>
            <SelectItem value="low_ctr">Low CTR</SelectItem>
            <SelectItem value="page2_to_page1">Page 2→1</SelectItem>
            <SelectItem value="declining">클릭 감소</SelectItem>
            <SelectItem value="geo_candidate">GEO 후보</SelectItem>
          </SelectContent>
        </Select>
        <Select value={valueFilter} onValueChange={setValueFilter}>
          <SelectTrigger className="w-36 h-9 text-sm">
            <SelectValue placeholder="비즈니스 가치" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 가치</SelectItem>
            <SelectItem value="high">높음</SelectItem>
            <SelectItem value="medium">중간</SelectItem>
            <SelectItem value="low">낮음</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Scatter Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">포지션 vs CTR 분포 (낮은 순위번호 = 상위 노출)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <ScatterChart margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="x"
                name="포지션"
                type="number"
                domain={[1, 15]}
                label={{ value: "포지션 (낮을수록 상위)", position: "insideBottom", offset: -5, fontSize: 11 }}
                tick={{ fontSize: 11 }}
                tickLine={false}
              />
              <YAxis
                dataKey="y"
                name="CTR"
                unit="%"
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                label={{ value: "CTR (%)", angle: -90, position: "insideLeft", fontSize: 11 }}
              />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload
                    return (
                      <div className="rounded-md border bg-white p-2 shadow text-xs">
                        <p className="font-medium">{d.name}</p>
                        <p>포지션: {d.x}</p>
                        <p>CTR: {d.y}%</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend
                formatter={(value) => opportunityLabels[value] || value}
                wrapperStyle={{ fontSize: 11 }}
              />
              {Object.entries(scatterByType).map(([type, data]) => (
                <Scatter
                  key={type}
                  name={type}
                  data={data}
                  fill={scatterColors[type as keyof typeof scatterColors] || "#94a3b8"}
                  opacity={0.8}
                />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Queries Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">
            검색어 목록 ({filtered.length}개)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="pl-6 py-3 text-xs font-semibold">검색어</TableHead>
                <TableHead className="text-xs font-semibold">타입</TableHead>
                <TableHead className="text-xs font-semibold text-right">포지션</TableHead>
                <TableHead className="text-xs font-semibold text-right">노출</TableHead>
                <TableHead className="text-xs font-semibold text-right">클릭</TableHead>
                <TableHead className="text-xs font-semibold text-right">CTR</TableHead>
                <TableHead className="text-xs font-semibold text-right">전주 대비</TableHead>
                <TableHead className="text-xs font-semibold">기회유형</TableHead>
                <TableHead className="text-xs font-semibold pr-6">액션</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((q) => {
                const clickChange = q.clicks - q.prevClicks
                const clickChangePct = ((clickChange / q.prevClicks) * 100).toFixed(1)
                const isUp = clickChange > 0
                const intentCfg = intentConfig[q.intent as keyof typeof intentConfig]
                return (
                  <TableRow key={q.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-6 py-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">{q.query}</p>
                        <p className="text-xs text-muted-foreground font-mono mt-0.5">{q.url}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {intentCfg && (
                        <span className={cn("inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium", intentCfg.className)}>
                          {intentCfg.label}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={cn("text-sm font-semibold", getPositionColor(q.position))}>
                        {q.position}
                      </span>
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">
                      {q.impressions.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right text-sm font-medium">
                      {q.clicks.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right text-sm font-medium">
                      {q.ctr}%
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={cn("text-xs font-medium flex items-center justify-end gap-1",
                        isUp ? "text-green-600" : "text-red-600"
                      )}>
                        {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {isUp ? "+" : ""}{clickChangePct}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <OpportunityBadge type={q.opportunityType} />
                    </TableCell>
                    <TableCell className="pr-6">
                      <Button
                        size="sm"
                        className="text-xs h-7 bg-green-600 hover:bg-green-700 text-white"
                      >
                        브리프 생성
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
