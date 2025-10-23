import { FinancialNav } from "@/components/FinancialNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { ChevronDown } from "lucide-react";

const NonOrganic = () => {
  const [withAdjustments, setWithAdjustments] = useState<boolean>(true);

  const keyMetrics = [
    { 
      title: "Closed deals", 
      value: "14", 
      change: "+1.02%",
      trend: [
        { x: 0, y: 20 },
        { x: 1, y: 25 },
        { x: 2, y: 22 },
        { x: 3, y: 28 },
        { x: 4, y: 30 }
      ]
    },
    { 
      title: "Sum of closed deals", 
      value: "48.6", 
      unit: "bln ₽",
      change: "+1.2%",
      trend: [
        { x: 0, y: 40 },
        { x: 1, y: 42 },
        { x: 2, y: 41 },
        { x: 3, y: 45 },
        { x: 4, y: 48.6 }
      ]
    },
    { 
      title: "Revenue of acquired companies", 
      value: "36", 
      unit: "bln ₽",
      change: "+1.5%",
      trend: [
        { x: 0, y: 30 },
        { x: 1, y: 32 },
        { x: 2, y: 33 },
        { x: 3, y: 34 },
        { x: 4, y: 36 }
      ]
    },
    { 
      title: "OIBDA of acquired companies", 
      value: "10", 
      unit: "bln ₽",
      change: "+1.8%",
      trend: [
        { x: 0, y: 8 },
        { x: 1, y: 8.5 },
        { x: 2, y: 9 },
        { x: 3, y: 9.5 },
        { x: 4, y: 10 }
      ]
    },
    { 
      title: "FCF of acquired companies", 
      value: "36", 
      unit: "bln ₽",
      change: "+1.8%",
      trend: [
        { x: 0, y: 30 },
        { x: 1, y: 32 },
        { x: 2, y: 33 },
        { x: 3, y: 34.5 },
        { x: 4, y: 36 }
      ]
    },
  ];

  const evEbitdaMetric = {
    title: "EV/EBITDA",
    value: "4.6",
    change: "+1.9%",
    trend: [
      { x: 0, y: 4.0 },
      { x: 1, y: 4.2 },
      { x: 2, y: 4.3 },
      { x: 3, y: 4.5 },
      { x: 4, y: 4.6 }
    ]
  };

  const pieChartData = [
    { name: "B2C/B2B", value: 18, color: "hsl(280, 100%, 50%)" },
    { name: "Segment 1", value: 33, color: "hsl(260, 100%, 60%)" },
    { name: "Segment 2", value: 10, color: "hsl(40, 100%, 50%)" },
    { name: "Segment 3", value: 12, color: "hsl(30, 100%, 60%)" },
    { name: "Segment 4", value: 6, color: "hsl(10, 100%, 50%)" },
    { name: "Segment 5", value: 8, color: "hsl(0, 80%, 50%)" },
    { name: "Console", value: 18, color: "hsl(340, 70%, 40%)" },
    { name: "CC", value: 15, color: "hsl(200, 70%, 50%)" },
    { name: "Segment 6", value: 15, color: "hsl(180, 60%, 40%)" },
    { name: "Other", value: 2, color: "hsl(0, 0%, 60%)" },
  ];

  const filterSections = [
    { label: "mln. rub.", value: "млн. руб." },
    { label: "Consolidation", value: "Консолидация" },
    { label: "Segment", value: "Сегмент" },
    { label: "Cluster", value: "Кластер" },
    { label: "Company", value: "Компания" },
    { label: "Indicator", value: "Показатель" },
    { label: "Curator", value: "Куратор" },
  ];

  const yearlyData = [
    { 
      year: "2022", 
      organic: 70, 
      inorganic: 15,
      total: 85
    },
    { 
      year: "2023", 
      organic: 85, 
      inorganic: 25,
      total: 110
    },
    { 
      year: "2024", 
      organic: 125, 
      inorganic: 55,
      total: 180
    },
    { 
      year: "2025", 
      organic: 90, 
      inorganic: 40,
      total: 130
    },
  ];

  const companyData = [
    { 
      id: 1, 
      name: "Company 1", 
      revenuePlan: 94,
      revenueFact: 126,
      revenueExecution: 135,
      oibdaPlan: 10,
      oibdaFact: 18,
      oibdaExecution: 181,
      fcfPlan: 11,
      fcfFact: 14,
      fcfExecution: 154
    },
    { 
      id: 2, 
      name: "Company 2", 
      revenuePlan: 481,
      revenueFact: null,
      revenueExecution: 0,
      oibdaPlan: 284,
      oibdaFact: -8,
      oibdaExecution: 3,
      fcfPlan: 283,
      fcfFact: -16,
      fcfExecution: 6
    },
    { 
      id: 3, 
      name: "Company 3", 
      revenuePlan: 347,
      revenueFact: 160,
      revenueExecution: 46,
      oibdaPlan: 1,
      oibdaFact: -76,
      oibdaExecution: 8.473,
      fcfPlan: 23,
      fcfFact: -170,
      fcfExecution: 745
    },
    { 
      id: 4, 
      name: "Company 4", 
      revenuePlan: 46,
      revenueFact: 12,
      revenueExecution: 26,
      oibdaPlan: -113,
      oibdaFact: -59,
      oibdaExecution: 191,
      fcfPlan: -56,
      fcfFact: -90,
      fcfExecution: 62
    },
    { 
      id: 5, 
      name: "Company 5", 
      revenuePlan: 260,
      revenueFact: 193,
      revenueExecution: 74,
      oibdaPlan: -1,
      oibdaFact: -1,
      oibdaExecution: 63,
      fcfPlan: -1,
      fcfFact: -1,
      fcfExecution: 56
    },
    { 
      id: 6, 
      name: "Company 6", 
      revenuePlan: 0,
      revenueFact: null,
      revenueExecution: null,
      oibdaPlan: 99,
      oibdaFact: 58,
      oibdaExecution: 58,
      fcfPlan: -206,
      fcfFact: -78,
      fcfExecution: 265
    },
  ];

  const getExecutionColor = (execution: number | null) => {
    if (execution === null) return "bg-muted/50";
    if (execution >= 100) return "bg-emerald-500/80";
    if (execution >= 50) return "bg-orange-500/60";
    return "bg-red-500/70";
  };

  const getExecutionTextColor = (execution: number | null) => {
    if (execution === null) return "text-muted-foreground";
    return "text-white";
  };

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <FinancialNav />
      
      <main className="container mx-auto px-6 py-6 animate-fade-in">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-1">Non-organic growth dashboard</h1>
        </div>

        {/* Top Section: Pie Chart + Metric Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
          {/* Pie Chart */}
          <Card className="lg:col-span-3 bg-card border-border">
            <CardContent className="pt-6">
              <div className="relative">
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={1}
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className="text-4xl font-bold text-foreground">137</div>
                  <div className="text-xs text-muted-foreground text-center px-4">Projects in funnel<br />2024</div>
                </div>
              </div>
              {/* Legend */}
              <div className="grid grid-cols-2 gap-1 mt-4 text-xs">
                {pieChartData.map((item, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: item.color }}></div>
                    <span className="text-muted-foreground truncate">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Metric Cards - Top Row */}
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-4">
            {keyMetrics.slice(0, 3).map((metric, index) => (
              <Card key={index} className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="text-xs text-muted-foreground mb-2">{metric.title}</div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <div className="text-3xl font-bold text-primary">{metric.value}</div>
                    {metric.unit && <div className="text-sm text-muted-foreground">{metric.unit}</div>}
                    <div className="text-sm text-success ml-2">{metric.change}</div>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">vs previous period</div>
                  <ResponsiveContainer width="100%" height={40}>
                    <LineChart data={metric.trend}>
                      <Line 
                        type="monotone" 
                        dataKey="y" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Second Row: OIBDA, FCF + EV/EBITDA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
          <div className="lg:col-span-3"></div>
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-4">
            {keyMetrics.slice(3, 5).map((metric, index) => (
              <Card key={index} className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="text-xs text-muted-foreground mb-2">{metric.title}</div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <div className="text-3xl font-bold text-primary">{metric.value}</div>
                    {metric.unit && <div className="text-sm text-muted-foreground">{metric.unit}</div>}
                    <div className="text-sm text-success ml-2">{metric.change}</div>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">vs previous period</div>
                  <ResponsiveContainer width="100%" height={40}>
                    <LineChart data={metric.trend}>
                      <Line 
                        type="monotone" 
                        dataKey="y" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            ))}
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="text-xs text-muted-foreground mb-2">{evEbitdaMetric.title}</div>
                <div className="flex items-baseline gap-1 mb-1">
                  <div className="text-3xl font-bold text-primary">{evEbitdaMetric.value}</div>
                  <div className="text-sm text-success ml-2">{evEbitdaMetric.change}</div>
                </div>
                <div className="text-xs text-muted-foreground mb-2">vs previous period</div>
                <ResponsiveContainer width="100%" height={40}>
                  <LineChart data={evEbitdaMetric.trend}>
                    <Line 
                      type="monotone" 
                      dataKey="y" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Middle Section: Filters + Bar Chart + Toggle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
          {/* Left Sidebar Filters */}
          <div className="lg:col-span-2 space-y-2">
            {filterSections.map((filter, index) => (
              <Card key={index} className="bg-card border-border cursor-pointer hover:bg-card/80 transition-colors">
                <CardContent className="p-3 flex items-center justify-between">
                  <span className="text-sm text-foreground italic">{filter.label}</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bar Chart */}
          <Card className="lg:col-span-7 bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm text-foreground">Contribution of inorganic to subsidiary revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px',
                      color: 'hsl(var(--foreground))'
                    }} 
                  />
                  <Legend 
                    wrapperStyle={{ color: 'hsl(var(--foreground))' }}
                    formatter={(value) => (
                      <span className="text-foreground text-xs">
                        {value === 'inorganic' ? 'Inorganic contribution' : value === 'organic' ? 'Organic' : value}
                      </span>
                    )}
                  />
                  <Bar dataKey="inorganic" stackId="a" fill="hsl(var(--primary))" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="organic" stackId="a" fill="hsl(170, 60%, 50%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Right Side - Toggle Buttons */}
          <div className="lg:col-span-3 flex flex-col items-end gap-4">
            <div className="w-full max-w-xs">
              <div className="text-sm text-muted-foreground mb-2 italic">Preset</div>
              <div className="flex flex-col gap-2">
                <Button
                  variant={withAdjustments ? "default" : "outline"}
                  size="sm"
                  onClick={() => setWithAdjustments(true)}
                  className="w-full justify-center"
                >
                  With adjustments
                </Button>
                <Button
                  variant={!withAdjustments ? "default" : "outline"}
                  size="sm"
                  onClick={() => setWithAdjustments(false)}
                  className="w-full justify-center"
                >
                  Without adjustments
                </Button>
              </div>
            </div>
            <div className="text-sm text-muted-foreground italic">Rating?</div>
          </div>
        </div>

        {/* Results Table */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground text-base">
              Asset results for 8th month 2025, in mln rub.
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-table-header">
                    <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground border border-border">
                      № п/п
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground border border-border">
                      Company
                    </th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-muted-foreground border border-border" colSpan={2}>
                      Revenue
                    </th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-muted-foreground border border-border" rowSpan={2}>
                      Execution
                    </th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-muted-foreground border border-border" colSpan={2}>
                      OIBDA
                    </th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-muted-foreground border border-border" rowSpan={2}>
                      Execution
                    </th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-muted-foreground border border-border" colSpan={2}>
                      FCF
                    </th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-muted-foreground border border-border" rowSpan={2}>
                      Execution
                    </th>
                  </tr>
                  <tr className="bg-table-header">
                    <th className="border border-border"></th>
                    <th className="border border-border"></th>
                    <th className="px-3 py-1 text-center text-xs text-muted-foreground border border-border">Plan</th>
                    <th className="px-3 py-1 text-center text-xs text-muted-foreground border border-border">Fact</th>
                    <th className="px-3 py-1 text-center text-xs text-muted-foreground border border-border">Plan</th>
                    <th className="px-3 py-1 text-center text-xs text-muted-foreground border border-border">Fact</th>
                    <th className="px-3 py-1 text-center text-xs text-muted-foreground border border-border">Plan</th>
                    <th className="px-3 py-1 text-center text-xs text-muted-foreground border border-border">Fact</th>
                  </tr>
                </thead>
                <tbody>
                  {companyData.map((company) => (
                    <tr key={company.id} className="hover:bg-table-hover transition-colors">
                      <td className="px-3 py-2 text-sm text-center text-muted-foreground border border-border">{company.id}</td>
                      <td className="px-3 py-2 text-sm font-medium text-foreground border border-border">{company.name}</td>
                      
                      {/* Revenue */}
                      <td className="px-3 py-2 text-sm text-center text-foreground border border-border">
                        {company.revenuePlan}
                      </td>
                      <td className="px-3 py-2 text-sm text-center text-foreground border border-border">
                        {company.revenueFact !== null ? company.revenueFact : "N/A"}
                      </td>
                      <td className={`px-3 py-2 text-sm text-center font-medium border border-border ${getExecutionColor(company.revenueExecution)} ${getExecutionTextColor(company.revenueExecution)}`}>
                        {company.revenueExecution !== null && company.revenueExecution > 0 ? `${company.revenueExecution}%` : "N/A"}
                      </td>
                      
                      {/* OIBDA */}
                      <td className="px-3 py-2 text-sm text-center text-foreground border border-border">{company.oibdaPlan}</td>
                      <td className="px-3 py-2 text-sm text-center text-foreground border border-border">{company.oibdaFact}</td>
                      <td className={`px-3 py-2 text-sm text-center font-medium border border-border ${getExecutionColor(company.oibdaExecution)} ${getExecutionTextColor(company.oibdaExecution)}`}>
                        {typeof company.oibdaExecution === 'number' ? `${company.oibdaExecution}%` : company.oibdaExecution}
                      </td>
                      
                      {/* FCF */}
                      <td className="px-3 py-2 text-sm text-center text-foreground border border-border">{company.fcfPlan}</td>
                      <td className="px-3 py-2 text-sm text-center text-foreground border border-border">{company.fcfFact}</td>
                      <td className={`px-3 py-2 text-sm text-center font-medium border border-border ${getExecutionColor(company.fcfExecution)} ${getExecutionTextColor(company.fcfExecution)}`}>
                        {company.fcfExecution}%
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
