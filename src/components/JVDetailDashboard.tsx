import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { jvCompanies, JVCompany } from "@/data/jvData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useState, useMemo } from "react";
import { Search, TrendingUp, TrendingDown, Calendar, Clock } from "lucide-react";

interface JVDetailDashboardProps {
  selectedJVId: string | null;
  onSelectJV: (jvId: string | null) => void;
}

export const JVDetailDashboard = ({ selectedJVId, onSelectJV }: JVDetailDashboardProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  
  const selectedJV = selectedJVId ? jvCompanies.find(jv => jv.id === selectedJVId) : jvCompanies[0];

  const filteredCompanies = useMemo(() => {
    if (!searchQuery) return jvCompanies;
    return jvCompanies.filter(jv => 
      jv.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const formatNumber = (num: number) => {
    return num.toLocaleString('ru-RU');
  };

  const getGrowthPercent = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? "100.00" : "0.00";
    return ((current - previous) / previous * 100).toFixed(2);
  };

  const handleSelectCompany = (jv: JVCompany) => {
    onSelectJV(jv.id);
    setSearchQuery(jv.name);
    setShowDropdown(false);
  };

  if (!selectedJV) {
    return (
      <div className="flex items-center justify-center h-64 bg-background">
        <p className="text-muted-foreground">Выберите СП для просмотра</p>
      </div>
    );
  }

  const chartData = [
    { name: '2024', Выручка: selectedJV.revenue2024, OIBDA: selectedJV.oibda2024 },
    { name: '2025', Выручка: selectedJV.revenue2025, OIBDA: selectedJV.oibda2025 },
  ];

  // Corporate events
  const corporateEvents = [
    { label: "Реализация Опциона / реорганизация", value: "-", status: "neutral" },
    { label: "Прекращение партнерства", value: selectedJV.status === "Закрытие" ? "Запланировано" : "Не планируется", status: selectedJV.status === "Закрытие" ? "warning" : "neutral" },
    { label: "Выплата дивидендов", value: selectedJV.dividends2025 > 0 ? "Запланировано" : "-", status: selectedJV.dividends2025 > 0 ? "success" : "neutral" },
    { label: "Утвержденный бюджет", value: "-", status: "highlight" },
    { label: "Утвержденная стратегия", value: "-", status: "highlight" },
    { label: "Изменения по ТОП-менеджменту", value: "-", status: "neutral" },
    { label: "Прочие важные корп. события СП", value: "-", status: "highlight" },
  ];

  // Upcoming events
  const upcomingEvents = selectedJV.events
    .filter(e => e.status === 'planned')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3)
    .map((e) => {
      const daysLeft = Math.ceil((new Date(e.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      return {
        title: e.title,
        date: new Date(e.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
        daysLeft,
        urgent: daysLeft <= 7 && daysLeft > 0
      };
    });

  const currentMonth = new Date().toLocaleString('ru-RU', { month: 'long' });
  const capitalizedMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Активный":
        return <Badge className="bg-success/20 text-success border-success/30">Активный</Badge>;
      case "На паузе":
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">На паузе</Badge>;
      case "Закрытие":
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30">Закрытие</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="bg-background min-h-screen p-6 space-y-6 animate-fade-in">
      {/* Header Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Company Selector */}
        <div className="lg:col-span-3 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery || selectedJV.name}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              className="pl-10 bg-card border-border text-foreground"
              placeholder="Поиск компании..."
            />
            {showDropdown && filteredCompanies.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-lg shadow-xl max-h-60 overflow-auto">
                {filteredCompanies.map(jv => (
                  <div
                    key={jv.id}
                    className="px-4 py-2.5 hover:bg-muted cursor-pointer text-foreground transition-colors"
                    onClick={() => handleSelectCompany(jv)}
                  >
                    <p className="font-medium">{jv.name}</p>
                    <p className="text-xs text-muted-foreground">{jv.cluster}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-foreground">{selectedJV.name}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{selectedJV.cluster}</p>
                </div>
                {getStatusBadge(selectedJV.status)}
              </div>
              <div className="mt-4 pt-4 border-t border-border space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Куратор</span>
                  <span className="text-sm font-medium text-foreground">{selectedJV.curator}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Партнёр</span>
                  <span className="text-sm font-medium text-foreground">{selectedJV.partner}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Effective Share */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border h-full">
            <CardContent className="p-4 flex flex-col justify-center h-full">
              <p className="text-xs text-muted-foreground text-center">Эффективная доля в УК</p>
              <p className="text-4xl font-bold text-primary text-center mt-2">{selectedJV.ownershipPercent.toFixed(2)}%</p>
              <p className="text-xs text-muted-foreground text-center mt-1">голосов</p>
            </CardContent>
          </Card>
        </div>

        {/* Dividends Table */}
        <div className="lg:col-span-3">
          <Card className="bg-card border-border h-full">
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">Дивиденды</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-xs text-primary font-medium">2024</p>
                  <p className="text-lg font-bold text-foreground mt-1">
                    {selectedJV.dividends2024 > 0 ? formatNumber(selectedJV.dividends2024) : '-'}
                  </p>
                  <p className="text-xs text-muted-foreground">тыс. руб</p>
                </div>
                <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                  <p className="text-xs text-success font-medium">2025</p>
                  <p className="text-lg font-bold text-foreground mt-1">
                    {selectedJV.dividends2025 > 0 ? formatNumber(selectedJV.dividends2025) : '-'}
                  </p>
                  <p className="text-xs text-muted-foreground">тыс. руб</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar */}
        <div className="lg:col-span-4">
          <Card className="bg-card border-border h-full">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Календарь событий</h3>
              </div>
              <div className="bg-primary rounded-t-lg text-center py-2">
                <span className="text-sm font-medium text-primary-foreground">{capitalizedMonth}</span>
              </div>
              <div className="border border-t-0 border-border rounded-b-lg p-3 min-h-[80px]">
                {upcomingEvents.length > 0 ? (
                  <div className="space-y-2">
                    {upcomingEvents.map((event, i) => (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <span className="text-foreground truncate flex-1">{event.title}</span>
                        <span className="text-muted-foreground ml-2">{event.date}</span>
                        {event.urgent && (
                          <Badge className="ml-2 bg-success/20 text-success text-xs">
                            {event.daysLeft}д
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground text-center">Нет событий</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Middle Row - Metrics and Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* JV Indicators */}
        <div className="lg:col-span-3">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-foreground mb-4 text-center">Показатели СП</h3>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-xs text-muted-foreground text-center mb-2">2024</p>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Выручка</span>
                    <span className="text-sm font-semibold text-foreground">{formatNumber(selectedJV.revenue2024)}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-sm text-muted-foreground">OIBDA</span>
                    <span className="text-sm font-semibold text-foreground">{formatNumber(selectedJV.oibda2024)}</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-xs text-primary text-center mb-2">2025</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Выручка</span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold text-foreground">{formatNumber(selectedJV.revenue2025)}</span>
                      {Number(getGrowthPercent(selectedJV.revenue2025, selectedJV.revenue2024)) >= 0 ? (
                        <TrendingUp className="w-3 h-3 text-success" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-destructive" />
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-muted-foreground">OIBDA</span>
                    <div className="flex items-center gap-1">
                      <span className={`text-sm font-semibold ${selectedJV.oibda2025 < 0 ? 'text-destructive' : 'text-foreground'}`}>
                        {formatNumber(selectedJV.oibda2025)}
                      </span>
                      {Number(getGrowthPercent(selectedJV.oibda2025, selectedJV.oibda2024)) >= 0 ? (
                        <TrendingUp className="w-3 h-3 text-success" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-destructive" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <div className="lg:col-span-5">
          <Card className="bg-card border-border h-full">
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">Динамика показателей</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Legend formatter={(value) => <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>} />
                  <Bar dataKey="Выручка" fill="hsl(260, 85%, 65%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="OIBDA" fill="hsl(25, 95%, 53%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events & Notes */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Ближайшие события</h3>
              </div>
              <div className="space-y-2">
                {upcomingEvents.length > 0 ? upcomingEvents.map((event, i) => (
                  <div key={i} className="p-2 rounded-lg bg-muted/30 flex items-center justify-between">
                    <span className="text-sm text-foreground truncate flex-1">{event.title}</span>
                    <div className="flex items-center gap-2 ml-2">
                      <span className="text-xs text-muted-foreground">{event.date}</span>
                      {event.urgent && (
                        <Badge className="bg-success/20 text-success text-xs">
                          {event.daysLeft}д
                        </Badge>
                      )}
                    </div>
                  </div>
                )) : (
                  <p className="text-sm text-muted-foreground text-center py-4">Нет запланированных событий</p>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-card border-border">
              <CardContent className="p-3">
                <p className="text-xs text-muted-foreground">Перспектива</p>
                <p className="text-sm text-foreground mt-1">-</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-3">
                <p className="text-xs text-muted-foreground">Комментарий</p>
                <p className="text-sm text-foreground mt-1">-</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Row - Corporate Events */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">Корпоративные события</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {corporateEvents.map((event, i) => (
              <div 
                key={i} 
                className={`p-3 rounded-lg flex items-center justify-between ${
                  event.status === 'highlight' ? 'bg-amber-500/10 border border-amber-500/20' :
                  event.status === 'warning' ? 'bg-destructive/10 border border-destructive/20' :
                  event.status === 'success' ? 'bg-success/10 border border-success/20' :
                  'bg-muted/30'
                }`}
              >
                <span className="text-sm text-foreground">{event.label}</span>
                <span className={`text-sm font-medium ${
                  event.status === 'warning' ? 'text-amber-400' :
                  event.status === 'success' ? 'text-success' :
                  'text-muted-foreground'
                }`}>
                  {event.value}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};