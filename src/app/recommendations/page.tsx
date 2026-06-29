"use client"
import { mockRecommendations } from "@/lib/mock-data/marketing"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react"
import { useState } from "react"

type Recommendation = typeof mockRecommendations[0]

function typeLabel(type: string) {
  const map: Record<string, string> = {
    budget_increase: "예산 증액",
    budget_decrease: "예산 감액",
    creative_test: "소재 테스트",
    keyword_exclusion: "키워드 제외",
    seo_content: "SEO 콘텐츠",
  }
  return map[type] || type
}

function ConfidenceBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${score >= 0.8 ? "bg-green-500" : score >= 0.6 ? "bg-yellow-500" : "bg-red-500"}`}
          style={{ width: `${score * 100}%` }}
        />
      </div>
      <span className="text-xs text-muted-foreground">{Math.round(score * 100)}%</span>
    </div>
  )
}

function MetricChip({ label, value }: { label: string; value: string | number }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 rounded text-xs text-slate-700">
      <span className="text-slate-400">{label}</span>
      <span className="font-medium">{value}</span>
    </span>
  )
}

function RecCard({ rec }: { rec: Recommendation }) {
  const [localStatus, setLocalStatus] = useState(rec.status)
  const metrics = rec.currentMetric as Record<string, number>

  return (
    <Card className={localStatus === "approved" ? "border-green-200 bg-green-50/30" : localStatus === "rejected" ? "border-slate-200 opacity-70" : ""}>
      <CardContent className="pt-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="info" className="text-xs">{rec.agentName}</Badge>
            <Badge variant="secondary" className="text-xs">{typeLabel(rec.type)}</Badge>
            <Badge
              variant={rec.riskLevel === "low" ? "success" : rec.riskLevel === "medium" ? "warning" : "destructive"}
              className="text-xs"
            >
              {rec.riskLevel === "low" ? "저위험" : rec.riskLevel === "medium" ? "중위험" : "고위험"}
            </Badge>
          </div>
          <div className="shrink-0">
            {localStatus === "approved" && <Badge variant="success" className="text-xs">승인됨</Badge>}
            {localStatus === "rejected" && <Badge variant="secondary" className="text-xs">거절됨</Badge>}
            {localStatus === "pending_approval" && <Badge variant="warning" className="text-xs">승인 대기</Badge>}
          </div>
        </div>

        {/* Title + Summary */}
        <div>
          <h3 className="font-semibold text-slate-900 text-base">{rec.title}</h3>
          <p className="text-sm text-slate-600 mt-1 leading-relaxed">{rec.summary}</p>
        </div>

        {/* Current Metrics */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(metrics).map(([k, v]) => (
            <MetricChip key={k} label={k} value={typeof v === "number" && v > 1000 ? "₩" + v.toLocaleString() : v} />
          ))}
        </div>

        {/* Expected Impact */}
        <div className="bg-green-50 border border-green-100 rounded-lg px-3 py-2">
          <p className="text-xs text-green-700"><span className="font-semibold">예상 효과:</span> {rec.expectedImpact}</p>
        </div>

        {/* Evidence */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">근거</p>
          <ul className="space-y-1">
            {rec.evidence.map((e, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                <Info className="h-3 w-3 mt-0.5 text-blue-400 shrink-0" />
                {e}
              </li>
            ))}
          </ul>
        </div>

        {/* Confidence */}
        <div>
          <p className="text-xs text-slate-500 mb-1">신뢰도</p>
          <ConfidenceBar score={rec.confidenceScore} />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <p className="text-xs text-slate-400 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            롤백: {rec.rollbackPlan}
          </p>
          {localStatus === "pending_approval" && (
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 gap-1"
                onClick={() => setLocalStatus("rejected")}>
                <XCircle className="h-3 w-3" /> 거절
              </Button>
              <Button size="sm" className="bg-green-600 hover:bg-green-700 gap-1"
                onClick={() => setLocalStatus("approved")}>
                <CheckCircle className="h-3 w-3" /> 승인
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function RecommendationsPage() {
  const pending = mockRecommendations.filter(r => r.status === "pending_approval").length
  const approved = mockRecommendations.filter(r => r.status === "approved").length
  const rejected = mockRecommendations.filter(r => r.status === "rejected").length

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">추천 & 승인</h1>
          <p className="text-sm text-slate-500 mt-0.5">AI Agent가 생성한 최적화 추천을 검토하고 승인하세요</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">전체 거절</Button>
          <Button className="bg-green-600 hover:bg-green-700">전체 승인</Button>
        </div>
      </div>

      {/* Count badges */}
      <div className="flex gap-3">
        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white border rounded-lg text-sm font-medium text-slate-700">
          전체 <span className="bg-slate-100 text-slate-700 px-1.5 rounded text-xs">{mockRecommendations.length}</span>
        </span>
        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white border rounded-lg text-sm font-medium text-yellow-700">
          승인 대기 <span className="bg-yellow-100 text-yellow-800 px-1.5 rounded text-xs">{pending}</span>
        </span>
        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white border rounded-lg text-sm font-medium text-green-700">
          승인됨 <span className="bg-green-100 text-green-800 px-1.5 rounded text-xs">{approved}</span>
        </span>
        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white border rounded-lg text-sm font-medium text-slate-500">
          거절됨 <span className="bg-slate-100 text-slate-500 px-1.5 rounded text-xs">{rejected}</span>
        </span>
      </div>

      {/* Recommendation cards */}
      <div className="space-y-4">
        {mockRecommendations.map(rec => (
          <RecCard key={rec.id} rec={rec} />
        ))}
      </div>
    </div>
  )
}
