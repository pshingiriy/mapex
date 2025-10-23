import { FinancialNav } from "@/components/FinancialNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const CorporateStandards = () => {
  const [activeView, setActiveView] = useState<"compliance" | "methodology">("compliance");

  const companies = [
    "ЮМани",
    "Завтра ОФД",
    "Завтра",
    "Школа 21",
    "ЦРТ",
    "ЦР9",
    "ЦРФС",
    "Цифровые технологии",
    "Центр предупреждения коллизий",
    "Флоксл-Ай",
    "Фонсфорд",
    "Трансформ решения",
    "ТАИА8-2",
    "СТК",
    "СТАТУС (АО)",
    "СПГ",
  ];

  const departments = [
    { key: "hr", label: "Финансы" },
    { key: "procurement", label: "Закупки" },
    { key: "corp-management", label: "Корп. управление" },
    { key: "operations", label: "Опер.расходы" },
    { key: "economics", label: "Экономика" },
    { key: "cyber", label: "Кибербезопасность" },
    { key: "marketing", label: "Маркетинг" },
    { key: "hr2", label: "HR" },
    { key: "legal", label: "Юр.расчеты" },
    { key: "it", label: "ИТ" },
  ];

  // Generate random status for each company-department pair
  const generateStatus = () => {
    const statuses = ["green", "orange", "red", "gray"];
    const weights = [0.4, 0.3, 0.2, 0.1]; // 40% green, 30% orange, 20% red, 10% gray
    const random = Math.random();
    let sum = 0;
    for (let i = 0; i < weights.length; i++) {
      sum += weights[i];
      if (random < sum) return statuses[i];
    }
    return statuses[0];
  };

  const complianceData = companies.map((company) => ({
    company,
    statuses: departments.map(() => generateStatus()),
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "green":
        return "bg-emerald-500";
      case "orange":
        return "bg-orange-500";
      case "red":
        return "bg-red-500";
      case "gray":
        return "bg-muted-foreground/30";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <FinancialNav />
      
      <main className="container mx-auto px-6 py-6 animate-fade-in">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Соблюдение групповых стандартов</h1>
          <p className="text-sm text-muted-foreground">БЛ, проверяет вопросы, комплаенс, ДЗО</p>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeView === "compliance" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveView("compliance")}
          >
            Соблюдение групповых стандартов
          </Button>
          <Button
            variant={activeView === "methodology" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveView("methodology")}
          >
            Методология РН
          </Button>
          <Button variant="outline" size="sm">
            За ДЗО/БЮ
          </Button>
          <Button variant="outline" size="sm">
            Документы
          </Button>
        </div>

        {/* Compliance Matrix */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-sm text-foreground">
              Свод по функции "ЧК; Закупки; ИТ; Кибербезопасность; Комплаенс; Корп.управление; Маркетинг; Опер.расходы; Финансы"
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-table-header">
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground border border-border sticky left-0 bg-table-header min-w-[200px]">
                      Компания
                    </th>
                    {departments.map((dept) => (
                      <th
                        key={dept.key}
                        className="px-4 py-3 text-center text-xs font-medium text-muted-foreground border border-border min-w-[120px]"
                      >
                        {dept.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {complianceData.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-muted/10 transition-colors">
                      <td className="px-4 py-3 text-sm text-foreground border border-border sticky left-0 bg-card font-medium">
                        {row.company}
                      </td>
                      {row.statuses.map((status, colIndex) => (
                        <td
                          key={colIndex}
                          className="px-4 py-3 border border-border text-center"
                        >
                          <div className="flex justify-center">
                            <div className={`w-3 h-3 rounded-full ${getStatusColor(status)}`}></div>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 mt-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span>Соответствует</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span>Частично соответствует</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Не соответствует</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted-foreground/30"></div>
                <span>Нет данных</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CorporateStandards;
