"use client"

import { useState } from "react"
import { mockTechnicalIssues } from "@/lib/mock-data/seo"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Play,
  ExternalLink,
} from "lucide-react"

const severityConfig: Record<string, { label: string; badgeClass: string; rowClass: string }> = {
  high: { label: "높음", badgeClass: "bg-red-100 text-red-800 border-red-200", rowClass: "" },
  medium: { label: "중간", badgeClass: "bg-orange-100 text-orange-800 border-orange-200", rowClass: "" },
  low: { label: "낮음", badgeClass: "bg-gray-100 text-gray-700 border-gray-200", rowClass: "" },
}

const statusConfig: Record<string, { label: string; icon: React.ReactNode; className: string }> = {
  open: { label: "열림", icon: <AlertTriangle className="h-3.5 w-3.5" />, className: "text-red-600" },
  in_progress: { label: "진행 중", icon: <Clock className="h-3.5 w-3.5" />, className: "text-orange-600" },
  resolved: { label: "해결됨", icon: <CheckCircle2 className="h-3.5 w-3.5" />, className: "text-green-600" },
}

function getImpactColor(score: number) {
  if (score >= 8) return "text-red-600 font-bold"
  if (score >= 5) return "text-orange-600 font-semibold"
  return "text-gray-500"
}

function getEffortColor(score: number) {
  if (score <= 3) return "text-green-600 font-semibold"
  if (score <= 6) return "text-yellow-600"
  return "text-red-500"
}

export default function TechnicalPage() {
  const [severityFilter, setSeverityFilter] = useState("all")
  const [ownerFilter, setOwnerFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const highCount = mockTechnicalIssues.filter((i) => i.severity === "high" && i.status !== "resolved").length
  const mediumCount = mockTechnicalIssues.filter((i) => i.severity === "medium" && i.status !== "resolved").length
  const lowCount = mockTechnicalIssues.filter((i) => i.severity === "low" && i.status !== "resolved").length
  const resolvedCount = mockTechnicalIssues.filter((i) => i.status === "resolved").length

  const filtered = mockTechnicalIssues.filter((i) => {
    const matchSeverity = severityFilter === "all" || i.severity === severityFilter
    const matchOwner = ownerFilter === "all" || i.owner === ownerFilter
    const matchStatus = statusFilter === "all" || i.status === statusFilter
    return matchSeverity && matchOwner && matchStatus
  })

  return (
    <div className="p-6 space-y-6 max-w-screen-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">기술 SEO 감사</h1>
          <p className="text-sm text-muted-foreground mt-0.5">마지막 감사: 2026-06-28</p>
        </div>
        <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
          <Play className="h-4 w-4" />
          크롤링 실행
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">전체 이슈</p>
            <p className="mt-2 text-3xl font-bold text-foreground">47건</p>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50/50">
          <CardContent className="p-5">
            <p className="text-xs font-medium text-red-700 uppercase tracking-wide">높음 (High)</p>
            <p className="mt-2 text-3xl font-bold text-red-600">{highCount}건</p>
            <p className="text-xs text-red-600 mt-1">즉시 조치 필요</p>
          </CardContent>
        </Card>
        <Card className="border-orange-200 bg-orange-50/50">
          <CardContent className="p-5">
            <p className="text-xs font-medium text-orange-700 uppercase tracking-wide">중간 (Medium)</p>
            <p className="mt-2 text-3xl font-bold text-orange-600">{mediumCount}건</p>
            <p className="text-xs text-orange-600 mt-1">이번 주 처리 권장</p>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="p-5">
            <p className="text-xs font-medium text-green-700 uppercase tracking-wide">낮음 / 해결됨</p>
            <p className="mt-2 text-3xl font-bold text-green-600">{lowCount + resolvedCount}건</p>
            <p className="text-xs text-green-600 mt-1">해결됨 {resolvedCount}건 포함</p>
          </CardContent>
        </Card>
      </div>

      {/* Priority Matrix Hint */}
      <Card className="border-dashed">
        <CardContent className="p-4">
          <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Impact / Effort 매트릭스</p>
          <div className="grid grid-cols-2 gap-2 max-w-sm">
            <div className="rounded-md bg-green-50 border border-green-200 p-2 text-center">
              <div className="text-xs font-bold text-green-700">Quick Win</div>
              <div className="text-xs text-green-600">높은 Impact + 낮은 Effort</div>
            </div>
            <div className="rounded-md bg-blue-50 border border-blue-200 p-2 text-center">
              <div className="text-xs font-bold text-blue-700">Major Project</div>
              <div className="text-xs text-blue-600">높은 Impact + 높은 Effort</div>
            </div>
            <div className="rounded-md bg-yellow-50 border border-yellow-200 p-2 text-center">
              <div className="text-xs font-bold text-yellow-700">Fill-In</div>
              <div className="text-xs text-yellow-600">낮은 Impact + 낮은 Effort</div>
            </div>
            <div className="rounded-md bg-gray-50 border border-gray-200 p-2 text-center">
              <div className="text-xs font-bold text-gray-600">Thankless Task</div>
              <div className="text-xs text-gray-500">낮은 Impact + 높은 Effort</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Select value={severityFilter} onValueChange={setSeverityFilter}>
          <SelectTrigger className="w-36 h-9 text-sm">
            <SelectValue placeholder="심각도" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 심각도</SelectItem>
            <SelectItem value="high">높음</SelectItem>
            <SelectItem value="medium">중간</SelectItem>
            <SelectItem value="low">낮음</SelectItem>
          </SelectContent>
        </Select>
        <Select value={ownerFilter} onValueChange={setOwnerFilter}>
          <SelectTrigger className="w-36 h-9 text-sm">
            <SelectValue placeholder="담당자" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 담당자</SelectItem>
            <SelectItem value="dev">개발팀</SelectItem>
            <SelectItem value="content">콘텐츠팀</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36 h-9 text-sm">
            <SelectValue placeholder="상태" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 상태</SelectItem>
            <SelectItem value="open">열림</SelectItem>
            <SelectItem value="in_progress">진행 중</SelectItem>
            <SelectItem value="resolved">해결됨</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Issues Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">이슈 목록 ({filtered.length}건)</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="pl-6 py-3 text-xs font-semibold min-w-[180px]">URL</TableHead>
                  <TableHead className="text-xs font-semibold min-w-[200px]">이슈 내용</TableHead>
                  <TableHead className="text-xs font-semibold">심각도</TableHead>
                  <TableHead className="text-xs font-semibold text-right">영향 URL</TableHead>
                  <TableHead className="text-xs font-semibold text-right">Impact</TableHead>
                  <TableHead className="text-xs font-semibold text-right">Effort</TableHead>
                  <TableHead className="text-xs font-semibold">담당자</TableHead>
                  <TableHead className="text-xs font-semibold min-w-[200px]">권장 조치</TableHead>
                  <TableHead className="text-xs font-semibold">상태</TableHead>
                  <TableHead className="text-xs font-semibold pr-6">액션</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((issue) => {
                  const sevCfg = severityConfig[issue.severity]
                  const statCfg = statusConfig[issue.status]
                  return (
                    <TableRow
                      key={issue.id}
                      className={cn(
                        "hover:bg-muted/30 transition-colors align-top",
                        issue.status === "resolved" && "opacity-60"
                      )}
                    >
                      <TableCell className="pl-6 py-3">
                        <span className={cn(
                          "text-xs font-mono",
                          issue.status === "resolved" ? "line-through text-muted-foreground" : "text-blue-600"
                        )}>
                          {issue.url}
                        </span>
                      </TableCell>
                      <TableCell className="py-3">
                        <p className="text-xs text-foreground leading-relaxed">{issue.issue}</p>
                      </TableCell>
                      <TableCell className="py-3">
                        {sevCfg && (
                          <span className={cn("inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium", sevCfg.badgeClass)}>
                            {sevCfg.label}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right text-sm py-3">{issue.affectedUrls}</TableCell>
                      <TableCell className="text-right py-3">
                        <span className={cn("text-sm", getImpactColor(issue.impactScore))}>
                          {issue.impactScore}/10
                        </span>
                      </TableCell>
                      <TableCell className="text-right py-3">
                        <span className={cn("text-sm", getEffortColor(issue.effortScore))}>
                          {issue.effortScore}/10
                        </span>
                      </TableCell>
                      <TableCell className="py-3">
                        <span className={cn(
                          "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
                          issue.owner === "dev"
                            ? "bg-blue-100 text-blue-800 border-blue-200"
                            : "bg-purple-100 text-purple-800 border-purple-200"
                        )}>
                          {issue.owner === "dev" ? "개발팀" : "콘텐츠팀"}
                        </span>
                      </TableCell>
                      <TableCell className="py-3">
                        <p className="text-xs text-muted-foreground leading-relaxed">{issue.recommendedAction}</p>
                      </TableCell>
                      <TableCell className="py-3">
                        {statCfg && (
                          <span className={cn("flex items-center gap-1 text-xs font-medium", statCfg.className)}>
                            {statCfg.icon}
                            {statCfg.label}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="pr-6 py-3">
                        {issue.owner === "dev" && issue.status !== "resolved" && (
                          <Button variant="outline" size="sm" className="text-xs h-7 gap-1">
                            <ExternalLink className="h-3 w-3" />
                            개발 요청
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
