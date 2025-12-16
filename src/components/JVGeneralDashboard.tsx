import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { jvCompanies, getJVTotals, getJVStats } from "@/data/jvData";
import { TrendingUp, TrendingDown, Users, Building2, Pause, XCircle } from "lucide-react";

interface JVGeneralDashboardProps {
  onSelectJV: (jvId: string) => void;
}

export const JVGeneralDashboard = ({ onSelectJV }: JVGeneralDashboardProps) => {
  const totals = getJVTotals();
  const stats = getJVStats();

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

  const formatNumber = (num: number) => {
    return num.toLocaleString('ru-RU');
  };

  const getGrowthPercent = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Общий дашборд СП</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Всего СП
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.total}</div>
            <div className="flex gap-2 mt-2 text-xs">
              <span className="text-emerald-400">{stats.active} активных</span>
              <span className="text-amber-400">{stats.paused} на паузе</span>
              <span className="text-red-400">{stats.closing} закрытие</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Выручка 2025</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{formatNumber(totals.revenue2025)}</div>
            <div className="flex items-center gap-1 mt-2 text-xs">
              {Number(getGrowthPercent(totals.revenue2025, totals.revenue2024)) >= 0 ? (
                <TrendingUp className="h-3 w-3 text-emerald-400" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-400" />
              )}
              <span className={Number(getGrowthPercent(totals.revenue2025, totals.revenue2024)) >= 0 ? "text-emerald-400" : "text-red-400"}>
                {getGrowthPercent(totals.revenue2025, totals.revenue2024)}% к 2024
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">OIBDA 2025</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{formatNumber(totals.oibda2025)}</div>
            <div className="flex items-center gap-1 mt-2 text-xs">
              {Number(getGrowthPercent(totals.oibda2025, totals.oibda2024)) >= 0 ? (
                <TrendingUp className="h-3 w-3 text-emerald-400" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-400" />
              )}
              <span className={Number(getGrowthPercent(totals.oibda2025, totals.oibda2024)) >= 0 ? "text-emerald-400" : "text-red-400"}>
                {getGrowthPercent(totals.oibda2025, totals.oibda2024)}% к 2024
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Дивиденды 2025</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{formatNumber(totals.dividends2025)}</div>
            <div className="flex items-center gap-1 mt-2 text-xs">
              {Number(getGrowthPercent(totals.dividends2025, totals.dividends2024)) >= 0 ? (
                <TrendingUp className="h-3 w-3 text-emerald-400" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-400" />
              )}
              <span className={Number(getGrowthPercent(totals.dividends2025, totals.dividends2024)) >= 0 ? "text-emerald-400" : "text-red-400"}>
                {getGrowthPercent(totals.dividends2025, totals.dividends2024)}% к 2024
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* JV Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-foreground">Список совместных предприятий</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Название СП</TableHead>
                <TableHead className="text-muted-foreground">Кластер</TableHead>
                <TableHead className="text-muted-foreground">Статус</TableHead>
                <TableHead className="text-muted-foreground">Куратор</TableHead>
                <TableHead className="text-muted-foreground">Партнёр</TableHead>
                <TableHead className="text-muted-foreground text-right">Доля, %</TableHead>
                <TableHead className="text-muted-foreground text-right">Выручка 2024</TableHead>
                <TableHead className="text-muted-foreground text-right">Выручка 2025</TableHead>
                <TableHead className="text-muted-foreground text-right">OIBDA 2024</TableHead>
                <TableHead className="text-muted-foreground text-right">OIBDA 2025</TableHead>
                <TableHead className="text-muted-foreground text-right">Дивиденды 2025</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jvCompanies.map((jv) => (
                <TableRow 
                  key={jv.id} 
                  className="border-border hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => onSelectJV(jv.id)}
                >
                  <TableCell className="font-medium text-foreground">{jv.name}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{jv.cluster}</TableCell>
                  <TableCell>{getStatusBadge(jv.status)}</TableCell>
                  <TableCell className="text-muted-foreground">{jv.curator}</TableCell>
                  <TableCell className="text-muted-foreground">{jv.partner}</TableCell>
                  <TableCell className="text-right text-foreground">{jv.ownershipPercent}%</TableCell>
                  <TableCell className="text-right text-muted-foreground">{formatNumber(jv.revenue2024)}</TableCell>
                  <TableCell className="text-right text-foreground">{formatNumber(jv.revenue2025)}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{formatNumber(jv.oibda2024)}</TableCell>
                  <TableCell className={`text-right ${jv.oibda2025 < 0 ? 'text-red-400' : 'text-foreground'}`}>
                    {formatNumber(jv.oibda2025)}
                  </TableCell>
                  <TableCell className="text-right text-foreground">{formatNumber(jv.dividends2025)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
