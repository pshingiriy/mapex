import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { jvCompanies, getJVTotals, getJVStats, JVCompany } from "@/data/jvData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";
import { ArrowLeft, TrendingUp, TrendingDown, Building2, CheckCircle, AlertTriangle, ChevronRight } from "lucide-react";

interface JVGeneralDashboardProps {
  onSelectJV: (jvId: string) => void;
}

type ViewMode = "dashboard" | "jv-list";
type FilterCategory = "all" | "active" | "closing";
type ClusterFilter = "all" | string;
type YearFilter = "all" | "2024" | "2025";

export const JVGeneralDashboard = ({ onSelectJV }: JVGeneralDashboardProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>("dashboard");
  const [filterCategory, setFilterCategory] = useState<FilterCategory>("all");
  const [clusterFilter, setClusterFilter] = useState<ClusterFilter>("all");
  const [yearFilter, setYearFilter] = useState<YearFilter>("all");
  
  const totals = getJVTotals();
  const stats = getJVStats();

  // Get unique clusters
  const clusters = [...new Set(jvCompanies.map(jv => jv.cluster))];

  const formatNumber = (num: number) => {
    return num.toLocaleString('ru-RU');
  };

  const getGrowthPercent = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  // Filter companies based on category
  const getFilteredCompanies = (): JVCompany[] => {
    let filtered = [...jvCompanies];
    
    if (filterCategory === "active") {
      filtered = filtered.filter(jv => jv.status === "Активный");
    } else if (filterCategory === "closing") {
      filtered = filtered.filter(jv => jv.status === "На паузе" || jv.status === "Закрытие");
    }
    
    if (clusterFilter !== "all") {
      filtered = filtered.filter(jv => jv.cluster === clusterFilter);
    }
    
    return filtered;
  };

  // Calculate totals based on filters
  const getFilteredTotals = () => {
    const filtered = getFilteredCompanies();
    return filtered.reduce((acc, jv) => ({
      revenue2024: acc.revenue2024 + jv.revenue2024,
      revenue2025: acc.revenue2025 + jv.revenue2025,
      oibda2024: acc.oibda2024 + jv.oibda2024,
      oibda2025: acc.oibda2025 + jv.oibda2025,
      dividends2024: acc.dividends2024 + jv.dividends2024,
      dividends2025: acc.dividends2025 + jv.dividends2025,
    }), {
      revenue2024: 0, revenue2025: 0,
      oibda2024: 0, oibda2025: 0,
      dividends2024: 0, dividends2025: 0,
    });
  };

  const filteredTotals = getFilteredTotals();
  const filteredCompanies = getFilteredCompanies();

  // Data by clusters for main chart (filtered)
  const clusterData = filteredCompanies.reduce((acc, jv) => {
    const existing = acc.find(c => c.cluster === jv.cluster);
    if (existing) {
      existing.revenue2024 += jv.revenue2024;
      existing.revenue2025 += jv.revenue2025;
      existing.oibda2024 += jv.oibda2024;
      existing.oibda2025 += jv.oibda2025;
    } else {
      acc.push({
        cluster: jv.cluster,
        shortName: jv.cluster.length > 15 ? jv.cluster.substring(0, 15) + '...' : jv.cluster,
        revenue2024: jv.revenue2024,
        revenue2025: jv.revenue2025,
        oibda2024: jv.oibda2024,
        oibda2025: jv.oibda2025,
      });
    }
    return acc;
  }, [] as { cluster: string; shortName: string; revenue2024: number; revenue2025: number; oibda2024: number; oibda2025: number }[]);

  // Year comparison data (filtered)
  const yearComparisonData = [
    { name: '2024', Выручка: filteredTotals.revenue2024, OIBDA: filteredTotals.oibda2024 },
    { name: '2025', Выручка: filteredTotals.revenue2025, OIBDA: filteredTotals.oibda2025 },
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

  const handleCategoryClick = (category: FilterCategory) => {
    setFilterCategory(category);
    setViewMode("jv-list");
  };

  const handleBackClick = () => {
    setViewMode("dashboard");
    setFilterCategory("all");
  };

  const getCategoryTitle = () => {
    switch (filterCategory) {
      case "active": return "Действующие СП";
      case "closing": return "СП под прекращение партнёрства";
      default: return "Все СП";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Активный": return "bg-success/20 text-success border-success/30";
      case "На паузе": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "Закрытие": return "bg-destructive/20 text-destructive border-destructive/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  // JV List View
  if (viewMode === "jv-list") {
    return (
      <div className="space-y-6 bg-background min-h-screen p-6 animate-fade-in">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handleBackClick}
            className="border-border hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{getCategoryTitle()}</h1>
            <p className="text-sm text-muted-foreground">{filteredCompanies.length} компаний</p>
          </div>
        </div>

        {/* JV Table */}
        <Card className="bg-card border-border">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Название</TableHead>
                  <TableHead className="text-muted-foreground">Кластер</TableHead>
                  <TableHead className="text-muted-foreground">Статус</TableHead>
                  <TableHead className="text-muted-foreground">Куратор</TableHead>
                  <TableHead className="text-muted-foreground text-right">Выручка 2025</TableHead>
                  <TableHead className="text-muted-foreground text-right">OIBDA 2025</TableHead>
                  <TableHead className="text-muted-foreground text-right">Дивиденды</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCompanies.map((jv) => (
                  <TableRow 
                    key={jv.id} 
                    className="border-border hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => onSelectJV(jv.id)}
                  >
                    <TableCell className="font-medium text-foreground">{jv.name}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{jv.cluster}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs border ${getStatusBadgeColor(jv.status)}`}>
                        {jv.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{jv.curator}</TableCell>
                    <TableCell className="text-right text-foreground font-medium">{formatNumber(jv.revenue2025)}</TableCell>
                    <TableCell className="text-right text-foreground font-medium">{formatNumber(jv.oibda2025)}</TableCell>
                    <TableCell className="text-right text-foreground font-medium">{formatNumber(jv.dividends2025)}</TableCell>
                    <TableCell>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Summary Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Общая выручка 2025</p>
              <p className="text-2xl font-bold text-primary">{formatNumber(filteredTotals.revenue2025)}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Общий OIBDA 2025</p>
              <p className="text-2xl font-bold text-success">{formatNumber(filteredTotals.oibda2025)}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Общие дивиденды 2025</p>
              <p className="text-2xl font-bold text-amber-400">{formatNumber(filteredTotals.dividends2025)}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Main Dashboard View
  return (
    <div className="space-y-6 bg-background min-h-screen p-6 animate-fade-in">
      {/* Top Stats Row - Clickable Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card 
          className="bg-card border-border overflow-hidden cursor-pointer transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 group"
          onClick={() => handleCategoryClick("all")}
        >
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Всего СП</p>
                <p className="text-xs text-muted-foreground/70 mt-1">Нажмите для просмотра</p>
              </div>
              <div className="h-16 w-16 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <span className="text-3xl font-bold text-primary">{stats.total}</span>
              </div>
            </div>
            <div className="bg-muted/30 px-5 py-2.5 flex items-center justify-between">
              <div className="flex gap-4 text-xs">
                <span className="text-success flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> {stats.active}
                </span>
                <span className="text-amber-400 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" /> {stats.paused + stats.closing}
                </span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </CardContent>
        </Card>

        <Card 
          className="bg-card border-border overflow-hidden cursor-pointer transition-all hover:border-success/50 hover:shadow-lg hover:shadow-success/10 group"
          onClick={() => handleCategoryClick("active")}
        >
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Действующие СП</p>
                <p className="text-xs text-muted-foreground/70 mt-1">Нажмите для просмотра</p>
              </div>
              <div className="h-16 w-16 rounded-xl bg-success/20 flex items-center justify-center group-hover:bg-success/30 transition-colors">
                <span className="text-3xl font-bold text-success">{stats.active}</span>
              </div>
            </div>
            <div className="bg-muted/30 px-5 py-2.5 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {((stats.active / stats.total) * 100).toFixed(0)}% от общего числа
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-success transition-colors" />
            </div>
          </CardContent>
        </Card>

        <Card 
          className="bg-card border-border overflow-hidden cursor-pointer transition-all hover:border-amber-400/50 hover:shadow-lg hover:shadow-amber-400/10 group"
          onClick={() => handleCategoryClick("closing")}
        >
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">СП под прекращение</p>
                <p className="text-xs text-muted-foreground/70 mt-1">Нажмите для просмотра</p>
              </div>
              <div className="h-16 w-16 rounded-xl bg-amber-400/20 flex items-center justify-center group-hover:bg-amber-400/30 transition-colors">
                <span className="text-3xl font-bold text-amber-400">{stats.closing + stats.paused}</span>
              </div>
            </div>
            <div className="bg-muted/30 px-5 py-2.5 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Требуют внимания</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-amber-400 transition-colors" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Row */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Фильтр:</span>
              <Select value={clusterFilter} onValueChange={(v) => setClusterFilter(v as ClusterFilter)}>
                <SelectTrigger className="w-[220px] bg-background border-border">
                  <SelectValue placeholder="Итого по всем" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all">Итого по всем</SelectItem>
                  {clusters.map(cluster => (
                    <SelectItem key={cluster} value={cluster}>{cluster}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Год:</span>
              <Select value={yearFilter} onValueChange={(v) => setYearFilter(v as YearFilter)}>
                <SelectTrigger className="w-[140px] bg-background border-border">
                  <SelectValue placeholder="Все годы" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all">Все годы</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {(clusterFilter !== "all" || yearFilter !== "all") && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => { setClusterFilter("all"); setYearFilter("all"); }}
                className="text-muted-foreground hover:text-foreground"
              >
                Сбросить фильтры
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Main Bar Chart - By Cluster */}
      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              Показатели по кластерам
              {clusterFilter !== "all" && <span className="text-sm font-normal text-muted-foreground ml-2">({clusterFilter})</span>}
            </h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span>{filteredCompanies.length} компаний</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={clusterData} margin={{ bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="shortName" 
                stroke="hsl(var(--muted-foreground))" 
                angle={-45} 
                textAnchor="end" 
                height={80}
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
              {(yearFilter === "all" || yearFilter === "2025") && (
                <Bar dataKey="revenue2025" name="Выручка 2025" fill="hsl(260, 85%, 65%)" radius={[4, 4, 0, 0]} />
              )}
              {(yearFilter === "all" || yearFilter === "2024") && (
                <Bar dataKey="revenue2024" name="Выручка 2024" fill="hsl(260, 60%, 50%)" radius={[4, 4, 0, 0]} />
              )}
              {(yearFilter === "all" || yearFilter === "2025") && (
                <Bar dataKey="oibda2025" name="OIBDA 2025" fill="hsl(142, 76%, 45%)" radius={[4, 4, 0, 0]} />
              )}
              {(yearFilter === "all" || yearFilter === "2024") && (
                <Bar dataKey="oibda2024" name="OIBDA 2024" fill="hsl(142, 50%, 35%)" radius={[4, 4, 0, 0]} />
              )}
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bottom Row - 4 sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Year Comparison Chart */}
        <Card className="bg-card border-border cursor-pointer hover:border-primary/30 transition-all">
          <CardContent className="pt-4">
            <h4 className="text-sm font-medium text-foreground mb-3">Сравнение по годам</h4>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={yearComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="Выручка" fill="hsl(260, 85%, 65%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="OIBDA" fill="hsl(142, 76%, 45%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded bg-primary" />
                <span className="text-muted-foreground">Выручка</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded bg-success" />
                <span className="text-muted-foreground">OIBDA</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Table */}
        <Card className="bg-card border-border cursor-pointer hover:border-primary/30 transition-all">
          <CardContent className="pt-4">
            <h4 className="text-sm font-medium text-foreground mb-3">Сводные показатели</h4>
            <div className="space-y-2">
              {(yearFilter === "all" || yearFilter === "2024") && (
                <div className="p-2.5 rounded-lg bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-1">2024</p>
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Выручка</span>
                    <span className="text-sm font-semibold text-foreground">{formatNumber(filteredTotals.revenue2024)}</span>
                  </div>
                  <div className="flex justify-between mt-0.5">
                    <span className="text-xs text-muted-foreground">OIBDA</span>
                    <span className="text-sm font-semibold text-foreground">{formatNumber(filteredTotals.oibda2024)}</span>
                  </div>
                </div>
              )}
              {(yearFilter === "all" || yearFilter === "2025") && (
                <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-xs text-primary mb-1">2025</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Выручка</span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold text-foreground">{formatNumber(filteredTotals.revenue2025)}</span>
                      {filteredTotals.revenue2025 > filteredTotals.revenue2024 ? (
                        <TrendingUp className="w-3 h-3 text-success" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-destructive" />
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-0.5">
                    <span className="text-xs text-muted-foreground">OIBDA</span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold text-foreground">{formatNumber(filteredTotals.oibda2025)}</span>
                      {filteredTotals.oibda2025 > filteredTotals.oibda2024 ? (
                        <TrendingUp className="w-3 h-3 text-success" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-destructive" />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Dividends Summary */}
        <Card className="bg-card border-border cursor-pointer hover:border-primary/30 transition-all">
          <CardContent className="pt-4">
            <h4 className="text-sm font-medium text-foreground mb-3">Дивиденды</h4>
            <div className="space-y-2">
              {(yearFilter === "all" || yearFilter === "2024") && (
                <div className="p-2.5 rounded-lg bg-muted/30">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">2024</span>
                    <p className="text-lg font-bold text-foreground">{formatNumber(filteredTotals.dividends2024)}</p>
                  </div>
                </div>
              )}
              {(yearFilter === "all" || yearFilter === "2025") && (
                <div className="p-2.5 rounded-lg bg-success/10 border border-success/20">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-success">2025</span>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-bold text-foreground">{formatNumber(filteredTotals.dividends2025)}</p>
                      {filteredTotals.dividends2025 > filteredTotals.dividends2024 ? (
                        <TrendingUp className="w-4 h-4 text-success" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-destructive" />
                      )}
                    </div>
                  </div>
                </div>
              )}
              <p className="text-xs text-muted-foreground text-center">млн. руб</p>
            </div>
          </CardContent>
        </Card>

        {/* Dividend Status Pie Charts */}
        <Card className="bg-card border-border cursor-pointer hover:border-primary/30 transition-all">
          <CardContent className="pt-4">
            <h4 className="text-sm font-medium text-foreground mb-3">Статус дивидендов</h4>
            <div className="flex gap-2">
              {(yearFilter === "all" || yearFilter === "2024") && (
                <div className="flex-1 text-center">
                  <p className="text-xs text-muted-foreground font-medium mb-1">2024</p>
                  <ResponsiveContainer width="100%" height={70}>
                    <PieChart>
                      <Pie
                        data={dividendStatus2024}
                        cx="50%"
                        cy="50%"
                        innerRadius={15}
                        outerRadius={30}
                        dataKey="value"
                      >
                        {dividendStatus2024.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
              {(yearFilter === "all" || yearFilter === "2025") && (
                <div className="flex-1 text-center">
                  <p className="text-xs text-success font-medium mb-1">2025</p>
                  <ResponsiveContainer width="100%" height={70}>
                    <PieChart>
                      <Pie
                        data={dividendStatus2025}
                        cx="50%"
                        cy="50%"
                        innerRadius={15}
                        outerRadius={30}
                        dataKey="value"
                      >
                        {dividendStatus2025.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
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
