import { mockAgentRuns } from "@/lib/mock-data/marketing"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bot, Play, CheckCircle, XCircle, Clock } from "lucide-react"

function getDuration(start: string, end: string) {
  const ms = new Date(end).getTime() - new Date(start).getTime()
  const secs = Math.round(ms / 1000)
  if (secs < 60) return `${secs}초`
  return `${Math.floor(secs / 60)}분 ${secs % 60}초`
}

function formatDateTime(iso: string) {
  const d = new Date(iso)
  return d.toLocaleString("ko-KR", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })
}

export default function AgentRunsPage() {
  const completed = mockAgentRuns.filter(r => r.status === "completed").length
  const failed = mockAgentRuns.filter(r => r.status === "failed").length
  const totalRecs = mockAgentRuns.reduce((a, r) => a + r.recommendations, 0)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Agent 실행 로그</h1>
          <p className="text-sm text-slate-500 mt-0.5">AI Agent 실행 이력 및 결과 현황</p>
        </div>
        <Button className="gap-2">
          <Play className="h-4 w-4" />
          수동 실행
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">총 실행</p>
            <p className="text-2xl font-bold mt-1">{mockAgentRuns.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">완료</p>
            <p className="text-2xl font-bold mt-1 text-green-700">{completed}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">실패</p>
            <p className="text-2xl font-bold mt-1 text-red-600">{failed}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">생성된 추천</p>
            <p className="text-2xl font-bold mt-1 text-blue-700">{totalRecs}</p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Bot className="h-4 w-4" />
            실행 이력
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent명</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>시작시간</TableHead>
                <TableHead>소요시간</TableHead>
                <TableHead>입력 요약</TableHead>
                <TableHead>출력 요약</TableHead>
                <TableHead>추천수</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAgentRuns.map((run) => (
                <TableRow key={run.id} className={run.status === "failed" ? "bg-red-50" : ""}>
                  <TableCell className="font-medium">{run.agentName}</TableCell>
                  <TableCell>
                    {run.status === "completed" && (
                      <span className="flex items-center gap-1.5 text-green-700 text-sm">
                        <CheckCircle className="h-4 w-4" /> 완료
                      </span>
                    )}
                    {run.status === "failed" && (
                      <span className="flex items-center gap-1.5 text-red-700 text-sm">
                        <XCircle className="h-4 w-4" /> 실패
                      </span>
                    )}
                    {run.status === "running" && (
                      <span className="flex items-center gap-1.5 text-blue-700 text-sm">
                        <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" /> 실행중
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">{formatDateTime(run.startedAt)}</TableCell>
                  <TableCell className="text-sm">
                    <span className="flex items-center gap-1 text-slate-600">
                      <Clock className="h-3 w-3" />
                      {getDuration(run.startedAt, run.completedAt)}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-slate-600 max-w-[200px]">
                    <span className="line-clamp-1">{run.inputSummary}</span>
                  </TableCell>
                  <TableCell className="text-sm max-w-[200px]">
                    {run.outputSummary
                      ? <span className="line-clamp-1 text-slate-600">{run.outputSummary}</span>
                      : <span className="text-red-600 text-xs">{run.errorMessage}</span>
                    }
                  </TableCell>
                  <TableCell>
                    {run.recommendations > 0
                      ? <Badge variant="info">{run.recommendations}건</Badge>
                      : <span className="text-xs text-muted-foreground">-</span>
                    }
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="text-xs">상세 보기</Button>
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
