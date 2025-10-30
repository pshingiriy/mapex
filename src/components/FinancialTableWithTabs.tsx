import { useState } from "react";
import { TrendingUp, TrendingDown, ChevronRight, ChevronDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface FinancialRowData {
  indicator: string;
  plan: number;
  fact: number;
  deviation: number;
  percentage: number;
  level: number;
  children?: FinancialRowData[];
}

// PL Data Structure based on Excel
const plData: FinancialRowData[] = [
  {
    indicator: "Валовая выручка",
    plan: 171000,
    fact: 529000,
    deviation: 358000,
    percentage: 84.5,
    level: 0,
    children: [
      { indicator: "ИНТЕРНЕТ", plan: 45000, fact: 120000, deviation: 75000, percentage: 85.2, level: 1 },
      { indicator: "ТЕЛЕВИДЕНИЕ", plan: 30000, fact: 95000, deviation: 65000, percentage: 83.8, level: 1 },
      { indicator: "ТЕЛЕФОНИЯ", plan: 25000, fact: 80000, deviation: 55000, percentage: 84.1, level: 1 },
      { indicator: "ОПТОВЫЕ УСЛУГИ", plan: 35000, fact: 110000, deviation: 75000, percentage: 86.0, level: 1 },
      { indicator: "ЦИФРОВЫЕ СЕРВИСЫ", plan: 20000, fact: 70000, deviation: 50000, percentage: 82.5, level: 1 },
      { indicator: "МОБИЛЬНАЯ СВЯЗЬ", plan: 10000, fact: 35000, deviation: 25000, percentage: 81.0, level: 1 },
      { indicator: "ПРОЧИЕ УСЛУГИ", plan: 6000, fact: 19000, deviation: 13000, percentage: 80.5, level: 1 },
    ]
  },
  {
    indicator: "Прямые затраты",
    plan: 878000,
    fact: 403000,
    deviation: -475000,
    percentage: 84.4,
    level: 0,
    children: [
      { indicator: "Присоединение и пропуск трафикa (ПиПТ)", plan: 150000, fact: 85000, deviation: -65000, percentage: 88.0, level: 1 },
      { indicator: "Каналы и аренда оборудования", plan: 200000, fact: 110000, deviation: -90000, percentage: 86.5, level: 1 },
      { indicator: "Контент", plan: 180000, fact: 90000, deviation: -90000, percentage: 85.0, level: 1 },
      { indicator: "Товары для реализации", plan: 120000, fact: 48000, deviation: -72000, percentage: 82.0, level: 1 },
      { indicator: "Прочие прямые затраты", plan: 228000, fact: 70000, deviation: -158000, percentage: 81.5, level: 1 },
    ]
  },
  {
    indicator: "Валовая прибыль",
    plan: 293000,
    fact: 875000,
    deviation: 582000,
    percentage: 85.5,
    level: 0,
  },
  {
    indicator: "Коммерческие затраты",
    plan: 937000,
    fact: 761000,
    deviation: -176000,
    percentage: 95.1,
    level: 0,
    children: [
      { indicator: "Реклама и маркетинг", plan: 250000, fact: 200000, deviation: -50000, percentage: 96.0, level: 1 },
      { indicator: "Комиссионные отчисления", plan: 350000, fact: 280000, deviation: -70000, percentage: 95.5, level: 1 },
      { indicator: "Договоры ГПХ (коммерческие)", plan: 180000, fact: 150000, deviation: -30000, percentage: 94.8, level: 1 },
      { indicator: "Субподряд (в рамках гос. контр., комм. дог.)", plan: 100000, fact: 85000, deviation: -15000, percentage: 93.5, level: 1 },
      { indicator: "Прочие коммерческие затраты", plan: 57000, fact: 46000, deviation: -11000, percentage: 94.2, level: 1 },
    ]
  },
  {
    indicator: "Косвенные затраты",
    plan: 738000,
    fact: 449000,
    deviation: -289000,
    percentage: 138.9,
    level: 0,
    children: [
      {
        indicator: "Затраты, связанные с персоналом",
        plan: 400000,
        fact: 250000,
        deviation: -150000,
        percentage: 140.0,
        level: 1,
        children: [
          { indicator: "Фонд оплаты труда", plan: 350000, fact: 220000, deviation: -130000, percentage: 141.0, level: 2 },
          { indicator: "Страховые взносы", plan: 50000, fact: 30000, deviation: -20000, percentage: 135.0, level: 2 },
        ]
      },
      { indicator: "Расходы на сеть связи", plan: 200000, fact: 120000, deviation: -80000, percentage: 138.0, level: 1 },
      { indicator: "Компьютеры, орг. техника", plan: 80000, fact: 48000, deviation: -32000, percentage: 137.5, level: 1 },
      { indicator: "Прочие операционные расходы", plan: 58000, fact: 31000, deviation: -27000, percentage: 136.0, level: 1 },
    ]
  },
  {
    indicator: "EBITDA",
    plan: 514000,
    fact: 747000,
    deviation: 233000,
    percentage: 77.4,
    level: 0,
  },
  {
    indicator: "Прибыль до налогообложения",
    plan: 881000,
    fact: 781000,
    deviation: -100000,
    percentage: 90.0,
    level: 0,
  },
  {
    indicator: "Налог на прибыль",
    plan: 41000,
    fact: 139000,
    deviation: 98000,
    percentage: 87.1,
    level: 0,
  },
  {
    indicator: "Чистая прибыль",
    plan: 134000,
    fact: 413000,
    deviation: 279000,
    percentage: 90.9,
    level: 0,
  },
];

// CF (Cash Flow) Data Structure
const cfData: FinancialRowData[] = [
  {
    indicator: "Операционная деятельность",
    plan: 850000,
    fact: 920000,
    deviation: 70000,
    percentage: 92.4,
    level: 0,
    children: [
      { indicator: "Поступления от клиентов", plan: 1200000, fact: 1350000, deviation: 150000, percentage: 88.9, level: 1 },
      { indicator: "Платежи поставщикам", plan: -250000, fact: -280000, deviation: -30000, percentage: 89.3, level: 1 },
      { indicator: "Платежи по зарплате", plan: -100000, fact: -150000, deviation: -50000, percentage: 66.7, level: 1 },
    ]
  },
  {
    indicator: "Инвестиционная деятельность",
    plan: -450000,
    fact: -380000,
    deviation: 70000,
    percentage: 118.4,
    level: 0,
    children: [
      { indicator: "Приобретение ОС", plan: -500000, fact: -420000, deviation: 80000, percentage: 119.0, level: 1 },
      { indicator: "Поступления от продажи активов", plan: 50000, fact: 40000, deviation: -10000, percentage: 80.0, level: 1 },
    ]
  },
  {
    indicator: "Финансовая деятельность",
    plan: -200000,
    fact: -180000,
    deviation: 20000,
    percentage: 111.1,
    level: 0,
    children: [
      { indicator: "Получение кредитов", plan: 300000, fact: 350000, deviation: 50000, percentage: 85.7, level: 1 },
      { indicator: "Погашение кредитов", plan: -400000, fact: -450000, deviation: -50000, percentage: 88.9, level: 1 },
      { indicator: "Выплата дивидендов", plan: -100000, fact: -80000, deviation: 20000, percentage: 125.0, level: 1 },
    ]
  },
  {
    indicator: "Изменение денежных средств",
    plan: 200000,
    fact: 360000,
    deviation: 160000,
    percentage: 55.6,
    level: 0,
  },
];

// CAPEX Data Structure
const capexData: FinancialRowData[] = [
  {
    indicator: "Сеть и инфраструктура",
    plan: 450000,
    fact: 380000,
    deviation: -70000,
    percentage: 118.4,
    level: 0,
    children: [
      { indicator: "Оборудование связи", plan: 250000, fact: 210000, deviation: -40000, percentage: 119.0, level: 1 },
      { indicator: "Строительство сооружений", plan: 150000, fact: 130000, deviation: -20000, percentage: 115.4, level: 1 },
      { indicator: "ИТ-инфраструктура", plan: 50000, fact: 40000, deviation: -10000, percentage: 125.0, level: 1 },
    ]
  },
  {
    indicator: "Коммерческие инвестиции",
    plan: 180000,
    fact: 150000,
    deviation: -30000,
    percentage: 120.0,
    level: 0,
    children: [
      { indicator: "Точки продаж", plan: 100000, fact: 85000, deviation: -15000, percentage: 117.6, level: 1 },
      { indicator: "Маркетинговое оборудование", plan: 50000, fact: 40000, deviation: -10000, percentage: 125.0, level: 1 },
      { indicator: "Клиентское оборудование", plan: 30000, fact: 25000, deviation: -5000, percentage: 120.0, level: 1 },
    ]
  },
  {
    indicator: "Прочие капитальные вложения",
    plan: 120000,
    fact: 95000,
    deviation: -25000,
    percentage: 126.3,
    level: 0,
    children: [
      { indicator: "Транспорт", plan: 50000, fact: 40000, deviation: -10000, percentage: 125.0, level: 1 },
      { indicator: "Офисное оборудование", plan: 40000, fact: 32000, deviation: -8000, percentage: 125.0, level: 1 },
      { indicator: "Прочее", plan: 30000, fact: 23000, deviation: -7000, percentage: 130.4, level: 1 },
    ]
  },
  {
    indicator: "Итого CAPEX",
    plan: 750000,
    fact: 625000,
    deviation: -125000,
    percentage: 120.0,
    level: 0,
  },
];

interface FinancialRowProps {
  row: FinancialRowData;
  expandedRows: Set<string>;
  onToggle: (indicator: string) => void;
}

const FinancialRow = ({ row, expandedRows, onToggle }: FinancialRowProps) => {
  const hasChildren = row.children && row.children.length > 0;
  const isExpanded = expandedRows.has(row.indicator);
  const isPositiveDeviation = row.deviation > 0;
  const isNegativeDeviation = row.deviation < 0;
  
  const paddingLeft = `${row.level * 1.5}rem`;

  return (
    <>
      <TableRow 
        className={cn(
          "bg-table-row hover:bg-table-hover border-b border-border/50 transition-colors",
          row.level === 0 && "font-semibold bg-table-header/50"
        )}
      >
        <TableCell className="font-medium text-foreground" style={{ paddingLeft }}>
          <div className="flex items-center gap-2">
            {hasChildren && (
              <button
                onClick={() => onToggle(row.indicator)}
                className="p-0.5 hover:bg-muted rounded transition-colors"
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            )}
            <span>{row.indicator}</span>
          </div>
        </TableCell>
        <TableCell className="text-right text-foreground">{row.plan.toLocaleString()}</TableCell>
        <TableCell className="text-right text-foreground">{row.fact.toLocaleString()}</TableCell>
        <TableCell className={`text-right font-medium ${
          isPositiveDeviation ? "text-success" : isNegativeDeviation ? "text-destructive" : "text-muted-foreground"
        }`}>
          <div className="flex items-center justify-end gap-1">
            {isPositiveDeviation ? <TrendingUp className="h-3 w-3" /> : isNegativeDeviation ? <TrendingDown className="h-3 w-3" /> : null}
            {row.deviation > 0 ? "+" : ""}{row.deviation.toLocaleString()}
          </div>
        </TableCell>
        <TableCell className={`text-right font-medium ${
          row.percentage >= 90 ? "text-success" : row.percentage >= 80 ? "text-primary" : "text-destructive"
        }`}>
          {row.percentage}%
        </TableCell>
      </TableRow>
      
      {hasChildren && isExpanded && row.children?.map((child, idx) => (
        <FinancialRow 
          key={`${child.indicator}-${idx}`}
          row={child}
          expandedRows={expandedRows}
          onToggle={onToggle}
        />
      ))}
    </>
  );
};

interface FinancialTableProps {
  data: FinancialRowData[];
  title: string;
  badgeText: string;
}

const FinancialTable = ({ data, title, badgeText }: FinancialTableProps) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (indicator: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(indicator)) {
      newExpanded.delete(indicator);
    } else {
      newExpanded.add(indicator);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 bg-table-header border-b border-border">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium">
            {badgeText}
          </span>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow className="bg-table-header border-b border-border hover:bg-table-header">
            <TableHead className="text-muted-foreground font-medium">Показатель, млн ₽</TableHead>
            <TableHead className="text-right text-muted-foreground font-medium">План'25</TableHead>
            <TableHead className="text-right text-muted-foreground font-medium">Факт'25</TableHead>
            <TableHead className="text-right text-muted-foreground font-medium">Факт vs План</TableHead>
            <TableHead className="text-right text-muted-foreground font-medium">%</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <FinancialRow 
              key={`${row.indicator}-${index}`}
              row={row}
              expandedRows={expandedRows}
              onToggle={toggleRow}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export const FinancialTableWithTabs = () => {
  return (
    <Tabs defaultValue="pl" className="w-full">
      <TabsList className="w-full justify-start bg-muted/50 p-1 mb-4">
        <TabsTrigger value="pl" className="flex-1 max-w-[120px]">PL</TabsTrigger>
        <TabsTrigger value="cf" className="flex-1 max-w-[120px]">CF</TabsTrigger>
        <TabsTrigger value="capex" className="flex-1 max-w-[120px]">CAPEX</TabsTrigger>
      </TabsList>
      
      <TabsContent value="pl" className="mt-0">
        <FinancialTable 
          data={plData}
          title="Отчёт о прибылях и убытках"
          badgeText="PL"
        />
      </TabsContent>
      
      <TabsContent value="cf" className="mt-0">
        <FinancialTable 
          data={cfData}
          title="Отчёт о движении денежных средств"
          badgeText="CF"
        />
      </TabsContent>
      
      <TabsContent value="capex" className="mt-0">
        <FinancialTable 
          data={capexData}
          title="Капитальные вложения"
          badgeText="CAPEX"
        />
      </TabsContent>
    </Tabs>
  );
};
