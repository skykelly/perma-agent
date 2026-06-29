"use client"

import { mockGeoQueries, mockGeoSnapshots } from "@/lib/mock-data/seo"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Brain,
  Bot,
  Camera,
  MessageSquare,
} from "lucide-react"

const platformColors: Record<string, string> = {
  ChatGPT: "bg-green-100 text-green-800 border-green-200",
  Perplexity: "bg-blue-100 text-blue-800 border-blue-200",
  Gemini: "bg-purple-100 text-purple-800 border-purple-200",
}

const coverageConfig: Record<string, { label: string; className: string }> = {
  none: { label: "없음", className: "text-red-600 font-medium" },
  weak: { label: "미흡", className: "text-orange-600 font-medium" },
  partial: { label: "부분 커버", className: "text-yellow-600 font-medium" },
  good: { label: "충분", className: "text-green-600 font-medium" },
}

const queryTypeConfig: Record<string, { label: string; className: string }> = {
  question: { label: "질문형", className: "bg-blue-100 text-blue-800 border-blue-200" },
  comparison: { label: "비교형", className: "bg-purple-100 text-purple-800 border-purple-200" },
  recommendation: { label: "추천형", className: "bg-green-100 text-green-800 border-green-200" },
}

const checklist = [
  { label: "sitemap.xml 최신화", status: "ok" },
  { label: "robots.txt 정상", status: "ok" },
  { label: "llms.txt 없음", status: "error", note: "AI 크롤러용 접근 가이드 파일 필요" },
  { label: "FAQ structured data 미적용", status: "error", note: "FAQPage schema 추가 필요" },
  { label: "Open Graph 태그 적용", status: "ok" },
  { label: "Author/Source 메타데이터 부족", status: "error", note: "E-E-A-T 신호 강화 필요" },
  { label: "HTTPS 적용", status: "ok" },
  { label: "AI 크롤러 허용 여부 미확인", status: "warning", note: "robots.txt에서 GPTBot, PerplexityBot 설정 확인" },
]

export default function GeoPage() {
  return (
    <div className="p-6 space-y-6 max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-foreground">GEO / AI 검색 대응</h1>
            <span className="inline-flex items-center rounded-full bg-purple-100 text-purple-800 border border-purple-200 px-2.5 py-0.5 text-xs font-semibold">
              Beta
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            ChatGPT · Perplexity · Gemini AI 검색 최적화
          </p>
        </div>
        <Button className="gap-2 bg-purple-600 hover:bg-purple-700 text-white">
          <Bot className="h-4 w-4" />
          GEO 분석 실행
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* GEO Readiness Score */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Brain className="h-4 w-4 text-purple-500" />
              GEO 준비도 점수
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-4">
              <div className="text-6xl font-bold text-orange-600">42</div>
              <div className="text-lg text-muted-foreground mt-1">/ 100</div>
              <div className="mt-3">
                <span className="inline-flex items-center rounded-full bg-orange-100 text-orange-800 border border-orange-200 px-3 py-1 text-sm font-semibold">
                  기초 구축 중
                </span>
              </div>
              <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full transition-all" style={{ width: "42%" }} />
              </div>
              <p className="text-xs text-muted-foreground mt-2">점수 41-70: 기초 구축 중</p>
            </div>

            <div className="space-y-3 pt-2 border-t">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">세부 점수</h4>
              {[
                { label: "구조화 데이터", score: 60, color: "bg-blue-500" },
                { label: "Q&A 콘텐츠", score: 35, color: "bg-orange-500" },
                { label: "내부 링크 구조", score: 55, color: "bg-blue-400" },
                { label: "브랜드 언급", score: 28, color: "bg-red-400" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-semibold">{item.score}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", item.color)} style={{ width: `${item.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Readiness Checklist */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">GEO 준비 체크리스트</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {checklist.map((item, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg border",
                    item.status === "ok" && "bg-green-50 border-green-100",
                    item.status === "error" && "bg-red-50 border-red-100",
                    item.status === "warning" && "bg-orange-50 border-orange-100"
                  )}
                >
                  {item.status === "ok" && <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />}
                  {item.status === "error" && <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />}
                  {item.status === "warning" && <AlertCircle className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />}
                  <div>
                    <p className={cn(
                      "text-sm font-medium",
                      item.status === "ok" && "text-green-700",
                      item.status === "error" && "text-red-700",
                      item.status === "warning" && "text-orange-700"
                    )}>
                      {item.label}
                    </p>
                    {item.note && (
                      <p className="text-xs text-muted-foreground mt-0.5">{item.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* GEO Query Candidates */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-purple-500" />
            GEO 쿼리 후보 ({mockGeoQueries.length}개)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="pl-6 py-3 text-xs font-semibold min-w-[240px]">질문 쿼리</TableHead>
                <TableHead className="text-xs font-semibold">유형</TableHead>
                <TableHead className="text-xs font-semibold">AI 답변 후보</TableHead>
                <TableHead className="text-xs font-semibold">현재 커버리지</TableHead>
                <TableHead className="text-xs font-semibold">브랜드 언급</TableHead>
                <TableHead className="text-xs font-semibold">플랫폼</TableHead>
                <TableHead className="text-xs font-semibold pr-6">대응 액션</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockGeoQueries.map((q) => {
                const typeCfg = queryTypeConfig[q.type]
                const coverageCfg = coverageConfig[q.currentCoverage]
                return (
                  <TableRow key={q.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-6 py-3 text-sm font-medium">{q.query}</TableCell>
                    <TableCell className="py-3">
                      {typeCfg && (
                        <span className={cn("inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium", typeCfg.className)}>
                          {typeCfg.label}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="py-3">
                      {q.aiAnswerCandidate ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-muted-foreground" />
                      )}
                    </TableCell>
                    <TableCell className="py-3">
                      {coverageCfg && (
                        <span className={coverageCfg.className}>{coverageCfg.label}</span>
                      )}
                    </TableCell>
                    <TableCell className="py-3">
                      {q.brandMentioned ? (
                        <span className="text-xs font-medium text-green-600">언급됨 ({q.mentions}회)</span>
                      ) : (
                        <span className="text-xs font-medium text-red-600">없음</span>
                      )}
                    </TableCell>
                    <TableCell className="py-3">
                      <span className={cn(
                        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
                        platformColors[q.platform] || "bg-gray-100 text-gray-700 border-gray-200"
                      )}>
                        {q.platform}
                      </span>
                    </TableCell>
                    <TableCell className="pr-6 py-3">
                      <Button
                        size="sm"
                        className="text-xs h-7 bg-purple-600 hover:bg-purple-700 text-white whitespace-nowrap"
                      >
                        Brand Answer 브리프
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* AI Answer Snapshots */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold flex items-center gap-2">
            <Camera className="h-4 w-4 text-purple-500" />
            AI 답변 스냅샷
          </h2>
          <Button variant="outline" size="sm" className="text-xs gap-1">
            <Camera className="h-3.5 w-3.5" />
            스냅샷 등록
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockGeoSnapshots.map((snap) => (
            <Card key={snap.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">&ldquo;{snap.query}&rdquo;</p>
                    <p className="text-xs text-muted-foreground mt-0.5">수집일: {snap.capturedAt}</p>
                  </div>
                  <span className={cn(
                    "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
                    platformColors[snap.platform] || "bg-gray-100 text-gray-700 border-gray-200"
                  )}>
                    {snap.platform}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">브랜드 언급:</span>
                    {snap.brandMentioned ? (
                      <span className="text-xs font-semibold text-green-600 flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        언급됨
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-red-600 flex items-center gap-1">
                        <XCircle className="h-3.5 w-3.5" />
                        없음
                      </span>
                    )}
                    <span className={cn(
                      "ml-auto text-xs font-medium",
                      snap.sentiment === "positive" ? "text-green-600" : "text-muted-foreground"
                    )}>
                      감성: {snap.sentiment === "positive" ? "긍정" : "중립"}
                    </span>
                  </div>

                  {snap.citedUrls.length > 0 && (
                    <div>
                      <span className="text-xs text-muted-foreground">인용 URL: </span>
                      {snap.citedUrls.map((url, i) => (
                        <span key={i} className="text-xs font-mono text-blue-600 ml-1">{url}</span>
                      ))}
                    </div>
                  )}

                  <div>
                    <span className="text-xs text-muted-foreground">경쟁사 언급: </span>
                    <span className="text-xs text-foreground">{snap.competitors.join(", ")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
