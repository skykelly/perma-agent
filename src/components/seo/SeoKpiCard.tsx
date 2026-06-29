import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface SeoKpiCardProps {
  label: string
  value: string
  change?: number
  changeLabel?: string
  icon?: React.ReactNode
  highlight?: boolean
}

export function SeoKpiCard({ label, value, change, changeLabel, icon, highlight }: SeoKpiCardProps) {
  const isPositive = change !== undefined && change > 0
  const isNegative = change !== undefined && change < 0
  const isNeutral = change === undefined || change === 0

  return (
    <Card className={cn("relative overflow-hidden", highlight && "ring-2 ring-blue-500")}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
            <p className="mt-2 text-2xl font-bold text-foreground">{value}</p>
            {change !== undefined && (
              <div className={cn("mt-1 flex items-center gap-1 text-xs font-medium",
                isPositive && "text-green-600",
                isNegative && "text-red-600",
                isNeutral && "text-muted-foreground"
              )}>
                {isPositive && <TrendingUp className="h-3 w-3" />}
                {isNegative && <TrendingDown className="h-3 w-3" />}
                {isNeutral && <Minus className="h-3 w-3" />}
                <span>{change > 0 ? "+" : ""}{change}% {changeLabel || "전주 대비"}</span>
              </div>
            )}
          </div>
          {icon && <div className="text-muted-foreground/40">{icon}</div>}
        </div>
      </CardContent>
    </Card>
  )
}
