import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { jvCompanies, JVEvent } from "@/data/jvData";
import { Calendar, Users, Building2, TrendingUp, TrendingDown, DollarSign, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";

interface JVDetailDashboardProps {
  selectedJVId: string | null;
  onSelectJV: (jvId: string | null) => void;
}

export const JVDetailDashboard = ({ selectedJVId, onSelectJV }: JVDetailDashboardProps) => {
  const selectedJV = selectedJVId ? jvCompanies.find(jv => jv.id === selectedJVId) : jvCompanies[0];

  const formatNumber = (num: number) => {
    return num.toLocaleString('ru-RU');
  };

  const getGrowthPercent = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Активный":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Активный</Badge>;
      case "На паузе":
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">На паузе</Badge>;
      case "Закрытие":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Закрытие</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getEventIcon = (type: JVEvent['type']) => {
    const iconClass = "h-4 w-4";
    switch (type) {
      case "board": return <Users className={iconClass} />;
      case "budget": return <BarChart3 className={iconClass} />;
      case "dividend": return <DollarSign className={iconClass} />;
      case "reorganization": return <Building2 className={iconClass} />;
      case "management": return <Users className={iconClass} />;
      case "audit": return <BarChart3 className={iconClass} />;
      case "report": return <BarChart3 className={iconClass} />;
      default: return <Calendar className={iconClass} />;
    }
  };

  const getEventStatusColor = (status: JVEvent['status']) => {
    switch (status) {
      case "completed": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "planned": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "cancelled": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getEventTypeLabel = (type: JVEvent['type']) => {
    switch (type) {
      case "board": return "Совет директоров";
      case "budget": return "Бюджет";
      case "dividend": return "Дивиденды";
      case "reorganization": return "Реорганизация";
      case "management": return "Менеджмент";
      case "audit": return "Аудит";
      case "report": return "Отчёт";
      default: return type;
    }
  };

  if (!selectedJV) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Выберите СП для просмотра</p>
      </div>
    );
  }

  const chartData = [
    { name: '2024', Выручка: selectedJV.revenue2024, OIBDA: selectedJV.oibda2024 },
    { name: '2025', Выручка: selectedJV.revenue2025, OIBDA: selectedJV.oibda2025 },
  ];

  const quarterlyData = [
    { quarter: 'Q1', revenue: Math.round(selectedJV.revenue2025 * 0.22), oibda: Math.round(selectedJV.oibda2025 * 0.20) },
    { quarter: 'Q2', revenue: Math.round(selectedJV.revenue2025 * 0.25), oibda: Math.round(selectedJV.oibda2025 * 0.24) },
    { quarter: 'Q3', revenue: Math.round(selectedJV.revenue2025 * 0.27), oibda: Math.round(selectedJV.oibda2025 * 0.28) },
    { quarter: 'Q4', revenue: Math.round(selectedJV.revenue2025 * 0.26), oibda: Math.round(selectedJV.oibda2025 * 0.28) },
  ];

  return (
    <div className="space-y-6">
      {/* Header with selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Дашборд СП</h2>
        <Select value={selectedJV.id} onValueChange={(value) => onSelectJV(value)}>
          <SelectTrigger className="w-[300px] bg-card border-border">
            <SelectValue placeholder="Выберите СП" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            {jvCompanies.map((jv) => (
              <SelectItem key={jv.id} value={jv.id} className="text-foreground">
                {jv.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Company Info Card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-foreground">{selectedJV.name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{selectedJV.cluster}</p>
            </div>
            {getStatusBadge(selectedJV.status)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Партнёр</p>
              <p className="text-sm font-medium text-foreground">{selectedJV.partner}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Куратор</p>
              <p className="text-sm font-medium text-foreground">{selectedJV.curator}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Доля владения</p>
              <p className="text-sm font-medium text-foreground">{selectedJV.ownershipPercent}%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Кластер</p>
              <p className="text-sm font-medium text-foreground">{selectedJV.cluster}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Выручка 2025</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{formatNumber(selectedJV.revenue2025)}</div>
            <div className="flex items-center gap-1 mt-1 text-xs">
              {Number(getGrowthPercent(selectedJV.revenue2025, selectedJV.revenue2024)) >= 0 ? (
                <TrendingUp className="h-3 w-3 text-emerald-400" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-400" />
              )}
              <span className={Number(getGrowthPercent(selectedJV.revenue2025, selectedJV.revenue2024)) >= 0 ? "text-emerald-400" : "text-red-400"}>
                {getGrowthPercent(selectedJV.revenue2025, selectedJV.revenue2024)}%
              </span>
              <span className="text-muted-foreground">vs 2024</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">OIBDA 2025</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${selectedJV.oibda2025 < 0 ? 'text-red-400' : 'text-foreground'}`}>
              {formatNumber(selectedJV.oibda2025)}
            </div>
            <div className="flex items-center gap-1 mt-1 text-xs">
              {Number(getGrowthPercent(selectedJV.oibda2025, selectedJV.oibda2024)) >= 0 ? (
                <TrendingUp className="h-3 w-3 text-emerald-400" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-400" />
              )}
              <span className={Number(getGrowthPercent(selectedJV.oibda2025, selectedJV.oibda2024)) >= 0 ? "text-emerald-400" : "text-red-400"}>
                {getGrowthPercent(selectedJV.oibda2025, selectedJV.oibda2024)}%
              </span>
              <span className="text-muted-foreground">vs 2024</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Маржа OIBDA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {selectedJV.revenue2025 > 0 ? (selectedJV.oibda2025 / selectedJV.revenue2025 * 100).toFixed(1) : 0}%
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              vs {selectedJV.revenue2024 > 0 ? (selectedJV.oibda2024 / selectedJV.revenue2024 * 100).toFixed(1) : 0}% в 2024
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Дивиденды 2025</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{formatNumber(selectedJV.dividends2025)}</div>
            <div className="flex items-center gap-1 mt-1 text-xs">
              {Number(getGrowthPercent(selectedJV.dividends2025, selectedJV.dividends2024)) >= 0 ? (
                <TrendingUp className="h-3 w-3 text-emerald-400" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-400" />
              )}
              <span className={Number(getGrowthPercent(selectedJV.dividends2025, selectedJV.dividends2024)) >= 0 ? "text-emerald-400" : "text-red-400"}>
                {selectedJV.dividends2024 > 0 ? getGrowthPercent(selectedJV.dividends2025, selectedJV.dividends2024) : 'N/A'}%
              </span>
              <span className="text-muted-foreground">vs 2024</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Calendar Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Year-over-Year Chart */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-foreground">Динамика по годам</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Legend />
                <Bar dataKey="Выручка" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="OIBDA" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quarterly Chart */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-foreground">Квартальная динамика 2025</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={quarterlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="quarter" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Legend />
                <Line type="monotone" dataKey="revenue" name="Выручка" stroke="hsl(var(--primary))" strokeWidth={2} />
                <Line type="monotone" dataKey="oibda" name="OIBDA" stroke="hsl(var(--chart-2))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Event Calendar */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-foreground flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Календарь событий
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {selectedJV.events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((event) => (
              <div 
                key={event.id} 
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {getEventIcon(event.type)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{event.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {new Date(event.date).toLocaleDateString('ru-RU', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {getEventTypeLabel(event.type)}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Badge className={getEventStatusColor(event.status)}>
                  {event.status === 'completed' ? 'Завершено' : event.status === 'planned' ? 'Запланировано' : 'Отменено'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
