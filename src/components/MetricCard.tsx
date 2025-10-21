import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  subtitle?: string;
}

export const MetricCard = ({ title, value, change, subtitle }: MetricCardProps) => {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <Card className="bg-gradient-metric border-border p-4 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground uppercase tracking-wide">{title}</span>
          {change !== undefined && (
            <span className={`text-xs font-medium flex items-center gap-1 ${
              isPositive ? "text-success" : isNegative ? "text-destructive" : "text-muted-foreground"
            }`}>
              {isPositive ? <TrendingUp className="h-3 w-3" /> : isNegative ? <TrendingDown className="h-3 w-3" /> : null}
              {change > 0 ? "+" : ""}{change}%
            </span>
          )}
        </div>
        <div className="text-3xl font-bold text-foreground">{value}</div>
        {subtitle && <div className="text-xs text-muted-foreground">{subtitle}</div>}
      </div>
    </Card>
  );
};
