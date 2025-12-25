import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getClusterKpiData, KpiMetric } from "@/data/clusterKpiData";
import { TrendingUp, TrendingDown } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

interface ClusterIndicatorsProps {
  clusterName: string;
}

const COLORS = ['hsl(260, 85%, 65%)', 'hsl(190, 85%, 50%)', 'hsl(142, 76%, 45%)', 'hsl(45, 93%, 47%)', 'hsl(0, 84%, 60%)'];

const MetricCard = ({ metric }: { metric: KpiMetric }) => {
  const Icon = metric.icon;
  const isPositive = (metric.change ?? 0) >= 0;
  
  return (
    <Card className="p-4 bg-card border-border hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        {metric.hasSelector && metric.selectorOptions && (
          <Select defaultValue={metric.selectorOptions[0]}>
            <SelectTrigger className="w-auto h-7 text-xs bg-secondary/50 border-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-50">
              {metric.selectorOptions.map(opt => (
                <SelectItem key={opt} value={opt} className="text-xs">{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      <div className="text-2xl font-bold text-foreground mb-1">{metric.value}{metric.unit && <span className="text-sm font-normal ml-1">{metric.unit}</span>}</div>
      <div className="text-sm text-muted-foreground mb-2">{metric.name}</div>
      {metric.change !== undefined && (
        <div className={`flex items-center gap-1 text-xs ${isPositive ? 'text-success' : 'text-destructive'}`}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span>{isPositive ? '+' : ''}{metric.change}%</span>
        </div>
      )}
    </Card>
  );
};

export const ClusterIndicators = ({ clusterName }: ClusterIndicatorsProps) => {
  const kpiData = getClusterKpiData(clusterName);
  
  if (!kpiData) {
    return <div className="text-muted-foreground p-8 text-center">Данные по показателям не найдены</div>;
  }

  return (
    <div className="space-y-6">
      {/* Financial Metrics */}
      <div>
        <h4 className="text-sm font-semibold text-muted-foreground mb-3">Финансовые показатели</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {kpiData.metrics.map(metric => <MetricCard key={metric.id} metric={metric} />)}
        </div>
      </div>

      {/* Staff Metrics */}
      <div>
        <h4 className="text-sm font-semibold text-muted-foreground mb-3">Персонал</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpiData.financialMetrics.map(metric => <MetricCard key={metric.id} metric={metric} />)}
        </div>
      </div>

      {/* Operational Metrics */}
      {kpiData.operationalMetrics.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground mb-3">Операционные показатели</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {kpiData.operationalMetrics.map(metric => <MetricCard key={metric.id} metric={metric} />)}
          </div>
        </div>
      )}

      {/* Charts */}
      {kpiData.chartData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 bg-card border-border">
            <h4 className="text-sm font-semibold text-foreground mb-4">Структура выручки</h4>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={kpiData.chartData.revenueStructure} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label={({ name, value }) => `${value}%`}>
                  {kpiData.chartData.revenueStructure.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: 'hsl(255, 25%, 15%)', border: 'none', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
          <Card className="p-4 bg-card border-border">
            <h4 className="text-sm font-semibold text-foreground mb-4">Структура OPEX</h4>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={kpiData.chartData.opexStructure} layout="vertical">
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" width={80} tick={{ fill: 'hsl(215, 20%, 65%)', fontSize: 11 }} />
                <Bar dataKey="value" fill="hsl(190, 85%, 50%)" radius={[0, 4, 4, 0]} />
                <Tooltip contentStyle={{ background: 'hsl(255, 25%, 15%)', border: 'none', borderRadius: '8px' }} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card className="p-4 bg-card border-border">
            <h4 className="text-sm font-semibold text-foreground mb-4">Структура CAPEX</h4>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={kpiData.chartData.capexStructure} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={30} outerRadius={60} label={({ value }) => `${value}%`}>
                  {kpiData.chartData.capexStructure.map((_, i) => <Cell key={i} fill={COLORS[(i + 2) % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: 'hsl(255, 25%, 15%)', border: 'none', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}
    </div>
  );
};
