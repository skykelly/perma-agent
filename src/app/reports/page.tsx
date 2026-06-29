"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts"
import {
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Download, FileText,
  DollarSign, Target, Eye
} from "lucide-react"

const weeklyData = [
  { week: "6/1", 매출: 8200, 광고비: 1820, roas: 4.5 },
  { week: "6/8", 매출: 9140, 광고비: 1940, roas: 4.71 },
  { week: "6/15", 매출: 8870, 광고비: 1870, roas: 4.74 },
  { week: "6/22", 매출: 10200, 광고비: 2040, roas: 5.00 },
]

const topChanges = [
  { campaign: "리타겟팅 - 장바구니 이탈", metric: "ROAS", prev: "6.12", curr: "7.78", change: "+27.1%", dir: "up" },
  { campaign: "쇼핑 캠페인 - 냉장고", metric: "CPA", prev: "₩18,200", curr: "₩26,643", change: "+46.4%", dir: "down" },
  { campaign: "브랜드 검색 캠페인", metric: "CVR", prev: "1.98%", curr: "2.40%", change: "+21.2%", dir: "up" },
  { campaign: "신규 고객 확보 - 에어컨", metric: "CTR", prev: "1.08%", curr: "0.79%", change: "-26.9%", dir: "down" },
]

export default function ReportsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">리포트</h1>
          <p className="text-sm text-slate-500 mt-0.5">AI 생성 성과 분석 리포트</p>
        </div>
      </div>

      <Tabs defaultValue="daily">
        <TabsList>
          <TabsTrigger value="daily">Daily Brief</TabsTrigger>
          <TabsTrigger value="weekly">주간 리포트</TabsTrigger>
          <TabsTrigger value="monthly">월간 리포트</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <FileText className="h-4 w-4" />
              생성 시각: 2026년 6월 29일 07:00 · Performance Diagnosis Agent
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" /> Markdown 다운로드
            </Button>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                어제 성과 요약
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 text-center">
                {[
                  { label: "광고비", value: "₩4,203,550", change: "+3.2%", up: false },
                  { label: "매출", value: "₩21,480,000", change: "+8.4%", up: true },
                  { label: "ROAS", value: "5.11", change: "+5.0%", up: true },
                  { label: "전환수", value: "412건", change: "+11.2%", up: true },
                ].map(item => (
                  <div key={item.label} className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-xl font-bold mt-1">{item.value}</p>
                    <span className={`text-xs font-medium ${item.up ? "text-green-600" : "text-red-600"}`}>{item.change}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Eye className="h-4 w-4 text-purple-600" />
                주요 변화
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  <span>리타겟팅 캠페인 ROAS <strong>7.78</strong> — 전일 대비 +0.34 상승. 장바구니 이탈 사용자 재유입율 상승 중.</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <TrendingDown className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                  <span>에어컨 캠페인 CTR <strong>0.79%</strong> — 소재 피로도로 인한 하락. 소재 교체 검토 필요.</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  <span>브랜드 캠페인 CVR <strong>2.40%</strong> — 사이트 개선 효과로 전환율 상승 추세 지속.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-orange-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-orange-600" />
                예산 이슈
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-orange-800">쇼핑 캠페인 - 냉장고: 예산 99.6% 소진</p>
                  <p className="text-xs text-orange-700 mt-0.5">일 예산 ₩5,000,000 거의 소진. CPA 목표 대비 48% 초과 상태로 예산 증액보다 효율 개선 우선 필요.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-red-600" />
                ROAS 하락 캠페인
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">신규 고객 확보 - 에어컨: ROAS <strong className="text-red-600">2.86</strong> (목표 4.0 대비 미달). 지속 하락 추세로 소재 및 타겟팅 재검토 필요.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Target className="h-4 w-4 text-green-600" />
                신규 기회
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  <span>&apos;에어컨 전기세 절약&apos; 검색 트렌드 급상승 (+340%). 관련 키워드 및 소재 추가 기회.</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  <span>리타겟팅 캠페인 예산 여유 17.3% — ROAS 7.78로 증액 시 ROI 즉각 개선 기대.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2 text-blue-800">
                <CheckCircle className="h-4 w-4" />
                오늘 승인 필요 액션 (3건)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  "리타겟팅 캠페인 예산 20% 증액 → 예상 전환 +82건",
                  "쇼핑 캠페인 - 냉장고 예산 30% 감액 → CPA 효율화",
                  "에어컨 캠페인 소재 교체 A/B 테스트 시작",
                ].map((action, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-blue-800">
                    <span className="h-5 w-5 rounded-full bg-blue-200 text-blue-800 text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                    {action}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">2026년 6월 22일 ~ 28일 · 주간 성과 요약</p>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" /> Excel 내보내기
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">주별 매출 및 광고비 추이</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={weeklyData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}만`} />
                  <Tooltip formatter={(v, name) => [`${Number(v).toLocaleString()}만원`, name]} />
                  <Legend />
                  <Bar dataKey="매출" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="광고비" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">주요 지표 변화</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>캠페인</TableHead>
                    <TableHead>지표</TableHead>
                    <TableHead>전주</TableHead>
                    <TableHead>이번주</TableHead>
                    <TableHead>변화</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topChanges.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium text-sm">{row.campaign}</TableCell>
                      <TableCell><Badge variant="secondary" className="text-xs">{row.metric}</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{row.prev}</TableCell>
                      <TableCell className="font-medium text-sm">{row.curr}</TableCell>
                      <TableCell>
                        <span className={`flex items-center gap-1 text-sm font-medium ${row.dir === "up" ? "text-green-600" : "text-red-600"}`}>
                          {row.dir === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          {row.change}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">핵심 추천사항</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  { title: "리타겟팅 예산 확대", desc: "지속적인 고성과로 예산 확대 시 즉각적인 매출 증가 기대. 20% 증액 추천.", tag: "기회" },
                  { title: "냉장고 쇼핑 캠페인 최적화", desc: "CPA 지속 상승으로 입찰 전략 재검토 및 저성과 제품 그룹 제외 필요.", tag: "위험" },
                  { title: "에어컨 시즌 소재 갱신", desc: "여름 시즌 특수에 맞는 에너지 절약 메시지 소재 투입으로 CTR 회복 기대.", tag: "개선" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <Badge variant={item.tag === "기회" ? "success" : item.tag === "위험" ? "destructive" : "info"} className="mt-0.5">{item.tag}</Badge>
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly">
          <Card>
            <CardContent className="pt-6 text-center py-16">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">6월 월간 리포트는 6월 30일 자동 생성됩니다</p>
              <p className="text-sm text-muted-foreground mt-1">Reporting Agent가 익일 07:00에 생성 예정</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
