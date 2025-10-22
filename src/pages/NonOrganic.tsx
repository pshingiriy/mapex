import { FinancialNav } from "@/components/FinancialNav";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const NonOrganic = () => {
  const [selectedSegment, setSelectedSegment] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("2025");
  const [withAdjustments, setWithAdjustments] = useState<boolean>(true);

  const keyMetrics = [
    { title: "Закрытые сделки", value: "45", change: 1.02 },
    { title: "Сумма закрытых сделок", value: "48.6 млрд ₽", change: 1.2 },
    { title: "Выручка приобретенных компаний", value: "36 млрд ₽", change: 1.5 },
    { title: "OIBDA приобретенных компаний", value: "10 млрд ₽", change: 1.8 },
    { title: "FCF приобретенных компаний", value: "36 млрд ₽", change: 1.8 },
  ];

  const segments = [
    { id: "all", name: "Все", count: 137 },
    { id: "solar", name: "Солар", count: 33 },
    { id: "xtech", name: "X.Tech", count: 53 },
    { id: "bit", name: "БИТ", count: 6 },
    { id: "gostech", name: "ГосТех", count: 8 },
    { id: "chd", name: "ЦХД", count: 15 },
    { id: "other", name: "Прочие", count: 22 },
  ];

  const companyData = [
    { 
      id: 1, 
      name: "КОРТЕОС ООО", 
      revenue: { plan: 126, fact: 94, execution: 135 },
      oibda: { plan: 10, fact: 18, execution: 181 },
      fcf: { plan: 11, fact: 14, execution: 134 }
    },
    { 
      id: 2, 
      name: "КоммИТ Кэпитал", 
      revenue: { plan: null, fact: 481, execution: 0 },
      oibda: { plan: 284, fact: -8, execution: 3 },
      fcf: { plan: 283, fact: -16, execution: 6 }
    },
    { 
      id: 3, 
      name: "Медиа Сервис", 
      revenue: { plan: 160, fact: 347, execution: 46 },
      oibda: { plan: 1, fact: -76, execution: 8 },
      fcf: { plan: 475, fact: 23, execution: 745 }
    },
    { 
      id: 4, 
      name: "Система бронирования отелей", 
      revenue: { plan: 12, fact: 46, execution: 25 },
      oibda: { plan: -113, fact: -59, execution: 191 },
      fcf: { plan: -56, fact: -90, execution: 62 }
    },
    { 
      id: 5, 
      name: "ФАЗЗИ ЛОДЖИК ЛАБС ООО", 
      revenue: { plan: 193, fact: 260, execution: 74 },
      oibda: { plan: -1, fact: -1, execution: 63 },
      fcf: { plan: -1, fact: -1, execution: 56 }
    },
    { 
      id: 6, 
      name: "Фабрика цифровых продуктов", 
      revenue: { plan: null, fact: 0, execution: null },
      oibda: { plan: 99, fact: 58, execution: 58 },
      fcf: { plan: -206, fact: -78, execution: 265 }
    },
  ];

  const getExecutionColor = (execution: number | null) => {
    if (execution === null) return "text-muted-foreground";
    if (execution >= 100) return "text-success";
    if (execution >= 50) return "text-foreground";
    return "text-destructive";
  };

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <FinancialNav />
      
      <main className="container mx-auto px-6 py-6 animate-fade-in">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-1">Дашборд неорганического роста</h1>
          <p className="text-sm text-muted-foreground">M&A активность и результаты приобретенных компаний</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          {keyMetrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
            />
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Сегмент:</span>
            <div className="flex flex-wrap gap-2">
              {segments.map((segment) => (
                <Button
                  key={segment.id}
                  variant={selectedSegment === segment.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSegment(segment.id)}
                  className="h-8 text-xs"
                >
                  {segment.name}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {segment.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Период:</span>
            <div className="flex gap-2">
              {["2022", "2023", "2024", "2025"].map((year) => (
                <Button
                  key={year}
                  variant={selectedYear === year ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedYear(year)}
                  className="h-8 text-xs"
                >
                  {year}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={withAdjustments ? "default" : "outline"}
              size="sm"
              onClick={() => setWithAdjustments(true)}
              className="h-8 text-xs"
            >
              С корректировками
            </Button>
            <Button
              variant={!withAdjustments ? "default" : "outline"}
              size="sm"
              onClick={() => setWithAdjustments(false)}
              className="h-8 text-xs"
            >
              Без корректировок
            </Button>
          </div>
        </div>

        {/* Results Table */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground text-lg">
              Результаты активов за 8-й мес. 2025 г., в млн руб.
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-table-header">
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      № п/п
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Компания
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider" colSpan={3}>
                      Выручка
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider" colSpan={3}>
                      OIBDA
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider" colSpan={3}>
                      FCF
                    </th>
                  </tr>
                  <tr className="bg-table-header border-t border-border/50">
                    <th className="px-4 py-2"></th>
                    <th className="px-4 py-2"></th>
                    <th className="px-4 py-2 text-right text-xs text-muted-foreground">План</th>
                    <th className="px-4 py-2 text-right text-xs text-muted-foreground">Факт</th>
                    <th className="px-4 py-2 text-right text-xs text-muted-foreground">Исп-е</th>
                    <th className="px-4 py-2 text-right text-xs text-muted-foreground">План</th>
                    <th className="px-4 py-2 text-right text-xs text-muted-foreground">Факт</th>
                    <th className="px-4 py-2 text-right text-xs text-muted-foreground">Исп-е</th>
                    <th className="px-4 py-2 text-right text-xs text-muted-foreground">План</th>
                    <th className="px-4 py-2 text-right text-xs text-muted-foreground">Факт</th>
                    <th className="px-4 py-2 text-right text-xs text-muted-foreground">Исп-е</th>
                  </tr>
                </thead>
                <tbody>
                  {companyData.map((company) => (
                    <tr key={company.id} className="bg-table-row hover:bg-table-hover transition-colors border-t border-border">
                      <td className="px-4 py-3 text-sm text-muted-foreground">{company.id}</td>
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{company.name}</td>
                      
                      {/* Revenue */}
                      <td className="px-4 py-3 text-sm text-right text-foreground">
                        {company.revenue.plan !== null ? company.revenue.plan : "N/A"}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-foreground">{company.revenue.fact}</td>
                      <td className={`px-4 py-3 text-sm text-right font-medium ${getExecutionColor(company.revenue.execution)}`}>
                        {company.revenue.execution !== null ? `${company.revenue.execution}%` : "N/A"}
                      </td>
                      
                      {/* OIBDA */}
                      <td className="px-4 py-3 text-sm text-right text-foreground">{company.oibda.plan}</td>
                      <td className="px-4 py-3 text-sm text-right text-foreground">{company.oibda.fact}</td>
                      <td className={`px-4 py-3 text-sm text-right font-medium ${getExecutionColor(company.oibda.execution)}`}>
                        {company.oibda.execution}%
                      </td>
                      
                      {/* FCF */}
                      <td className="px-4 py-3 text-sm text-right text-foreground">{company.fcf.plan}</td>
                      <td className="px-4 py-3 text-sm text-right text-foreground">{company.fcf.fact}</td>
                      <td className={`px-4 py-3 text-sm text-right font-medium ${getExecutionColor(company.fcf.execution)}`}>
                        {company.fcf.execution}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default NonOrganic;
