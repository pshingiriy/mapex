import { Card, CardContent } from "@/components/ui/card";
import { jvCompanies, getJVTotals, getJVStats } from "@/data/jvData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";
import { TrendingUp } from "lucide-react";

interface JVGeneralDashboardProps {
  onSelectJV: (jvId: string) => void;
}

export const JVGeneralDashboard = ({ onSelectJV }: JVGeneralDashboardProps) => {
  const totals = getJVTotals();
  const stats = getJVStats();

  const formatNumber = (num: number) => {
    return num.toLocaleString('ru-RU');
  };

  const getGrowthPercent = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous * 100).toFixed(2);
  };

  // Data by clusters for main chart
  const clusterData = jvCompanies.reduce((acc, jv) => {
    const existing = acc.find(c => c.cluster === jv.cluster);
    if (existing) {
      existing.revenue2024 += jv.revenue2024;
      existing.revenue2025 += jv.revenue2025;
      existing.oibda2024 += jv.oibda2024;
      existing.oibda2025 += jv.oibda2025;
    } else {
      acc.push({
        cluster: jv.cluster,
        shortName: jv.cluster.length > 12 ? jv.cluster.substring(0, 12) + '...' : jv.cluster,
        revenue2024: jv.revenue2024,
        revenue2025: jv.revenue2025,
        oibda2024: jv.oibda2024,
        oibda2025: jv.oibda2025,
      });
    }
    return acc;
  }, [] as { cluster: string; shortName: string; revenue2024: number; revenue2025: number; oibda2024: number; oibda2025: number }[]);

  const yearComparisonData = [
    { name: '2024', Выручка: totals.revenue2024, OIBDA: totals.oibda2024 },
    { name: '2025', Выручка: totals.revenue2025, OIBDA: totals.oibda2025 },
  ];

  // Dividend status data
  const dividendStatus2024 = [
    { name: 'Выплачено', value: 66, color: 'hsl(260, 85%, 65%)' },
    { name: 'Определена сумма', value: 8, color: 'hsl(45, 93%, 47%)' },
    { name: 'Не выплачено', value: 5, color: 'hsl(215, 20%, 50%)' },
  ];

  const dividendStatus2025 = [
    { name: 'Выплачено', value: 71, color: 'hsl(260, 85%, 65%)' },
    { name: 'Определена сумма', value: 3, color: 'hsl(45, 93%, 47%)' },
    { name: 'Частично выплачено', value: 2, color: 'hsl(142, 76%, 45%)' },
    { name: 'Не выплачено', value: 3, color: 'hsl(215, 20%, 50%)' },
  ];

  return (
    <div className="space-y-6 bg-background min-h-screen p-6 animate-fade-in">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card border-border overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Всего СП</p>
                <p className="text-4xl font-bold text-primary mt-1">{stats.total}</p>
              </div>
              <div className="h-16 w-16 rounded-xl bg-primary/20 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">{stats.total}</span>
              </div>
            </div>
            <div className="bg-muted/30 px-4 py-2 flex gap-4 text-xs">
              <span className="text-success">{stats.active} активных</span>
              <span className="text-amber-400">{stats.paused} на паузе</span>
              <span className="text-destructive">{stats.closing} закрытие</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Действующие СП</p>
                <p className="text-4xl font-bold text-success mt-1">{stats.active}</p>
              </div>
              <div className="h-16 w-16 rounded-xl bg-success/20 flex items-center justify-center">
                <span className="text-2xl font-bold text-success">{stats.active}</span>
              </div>
            </div>
            <div className="bg-muted/30 px-4 py-2">
              <span className="text-xs text-muted-foreground">
                {((stats.active / stats.total) * 100).toFixed(0)}% от общего числа
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">СП под прекращение</p>
                <p className="text-4xl font-bold text-amber-400 mt-1">{stats.closing + stats.paused}</p>
              </div>
              <div className="h-16 w-16 rounded-xl bg-amber-400/20 flex items-center justify-center">
                <span className="text-2xl font-bold text-amber-400">{stats.closing + stats.paused}</span>
              </div>
            </div>
            <div className="bg-muted/30 px-4 py-2">
              <span className="text-xs text-muted-foreground">Требуют внимания</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Bar Chart - By Cluster */}
      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Показатели по кластерам</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={clusterData} margin={{ bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="shortName" 
                stroke="hsl(var(--muted-foreground))" 
                angle={-45} 
                textAnchor="end" 
                height={60}
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))'
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                formatter={(value) => <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>}
              />
              <Bar dataKey="revenue2025" name="Выручка 2025" fill="hsl(260, 85%, 65%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="revenue2024" name="Выручка 2024" fill="hsl(25, 95%, 53%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="oibda2025" name="OIBDA 2025" fill="hsl(142, 76%, 45%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="oibda2024" name="OIBDA 2024" fill="hsl(45, 93%, 47%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bottom Row - 4 sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Year Comparison Chart */}
        <Card className="bg-card border-border">
          <CardContent className="pt-4">
            <h4 className="text-sm font-medium text-foreground mb-3">Сравнение по годам</h4>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={yearComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="Выручка" fill="hsl(260, 85%, 65%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="OIBDA" fill="hsl(25, 95%, 53%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-primary" />
                <span className="text-muted-foreground">Выручка</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-orange-500" />
                <span className="text-muted-foreground">OIBDA</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Table */}
        <Card className="bg-card border-border">
          <CardContent className="pt-4">
            <h4 className="text-sm font-medium text-foreground mb-3">Сводные показатели</h4>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-muted/30">
                <p className="text-xs text-muted-foreground">2024</p>
                <div className="flex justify-between mt-1">
                  <span className="text-sm text-muted-foreground">Выручка</span>
                  <span className="text-sm font-semibold text-foreground">{formatNumber(totals.revenue2024)}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-sm text-muted-foreground">OIBDA</span>
                  <span className="text-sm font-semibold text-foreground">{formatNumber(totals.oibda2024)}</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-xs text-primary">2025</p>
                <div className="flex justify-between mt-1">
                  <span className="text-sm text-muted-foreground">Выручка</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-foreground">{formatNumber(totals.revenue2025)}</span>
                    <TrendingUp className="w-3 h-3 text-success" />
                    <span className="text-xs text-success">{getGrowthPercent(totals.revenue2025, totals.revenue2024)}%</span>
                  </div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-sm text-muted-foreground">OIBDA</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-foreground">{formatNumber(totals.oibda2025)}</span>
                    <TrendingUp className="w-3 h-3 text-success" />
                    <span className="text-xs text-success">{getGrowthPercent(totals.oibda2025, totals.oibda2024)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dividends Summary */}
        <Card className="bg-card border-border">
          <CardContent className="pt-4">
            <h4 className="text-sm font-medium text-foreground mb-3">Дивиденды</h4>
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-xs text-primary mb-1">2024</p>
                <p className="text-xs text-muted-foreground">Всего выплачено</p>
                <p className="text-xl font-bold text-foreground">{formatNumber(totals.dividends2024 * 1000)}</p>
                <p className="text-xs text-muted-foreground">тыс. руб</p>
              </div>
              <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                <p className="text-xs text-success mb-1">2025</p>
                <p className="text-xs text-muted-foreground">Всего выплачено</p>
                <p className="text-xl font-bold text-foreground">{formatNumber(totals.dividends2025 * 1000)}</p>
                <p className="text-xs text-muted-foreground">тыс. руб</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dividend Status Pie Charts */}
        <Card className="bg-card border-border">
          <CardContent className="pt-4">
            <h4 className="text-sm font-medium text-foreground mb-3">Статус дивидендов</h4>
            <div className="flex gap-2">
              <div className="flex-1 text-center">
                <p className="text-xs text-primary font-medium mb-1">2024</p>
                <ResponsiveContainer width="100%" height={80}>
                  <PieChart>
                    <Pie
                      data={dividendStatus2024}
                      cx="50%"
                      cy="50%"
                      innerRadius={20}
                      outerRadius={35}
                      dataKey="value"
                    >
                      {dividendStatus2024.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 text-center">
                <p className="text-xs text-success font-medium mb-1">2025</p>
                <ResponsiveContainer width="100%" height={80}>
                  <PieChart>
                    <Pie
                      data={dividendStatus2025}
                      cx="50%"
                      cy="50%"
                      innerRadius={20}
                      outerRadius={35}
                      dataKey="value"
                    >
                      {dividendStatus2025.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1 mt-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-muted-foreground">Выплачено</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-muted-foreground">Определена</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span className="text-muted-foreground">Частично</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                <span className="text-muted-foreground">Не выплачено</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};