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
import { cn } from "@/lib/utils";

interface TableRowData {
  indicator: string;
  plan: number;
  fact: number;
  deviation: number;
  percentage: number;
  level: number;
  children?: TableRowData[];
}

const data: TableRowData[] = [
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
      { 
        indicator: "Расходы по предоставлению услуг Комплексных цифровых решений",
        plan: 120000,
        fact: 48000,
        deviation: -72000,
        percentage: 82.0,
        level: 1,
        children: [
          { indicator: "Прикладные проекты (регулярная услуга)", plan: 70000, fact: 28000, deviation: -42000, percentage: 83.0, level: 2 },
          { indicator: "Прикладные проекты (разовая услуга)", plan: 50000, fact: 20000, deviation: -30000, percentage: 81.0, level: 2 },
        ]
      },
      { 
        indicator: "Формирование, печать и доставка счетов",
        plan: 100000,
        fact: 40000,
        deviation: -60000,
        percentage: 84.0,
        level: 1
      },
      { indicator: "Товары для реализации", plan: 80000, fact: 32000, deviation: -48000, percentage: 83.5, level: 1 },
      { indicator: "Прочие прямые затраты", plan: 48000, fact: 18000, deviation: -30000, percentage: 81.5, level: 1 },
    ]
  },
  {
    indicator: "Валовая прибыль (GM 1)",
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
    indicator: "GM 2",
    plan: 444000,
    fact: 118000,
    deviation: -326000,
    percentage: 94.4,
    level: 0,
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
          { 
            indicator: "Фонд оплаты труда",
            plan: 350000,
            fact: 220000,
            deviation: -130000,
            percentage: 141.0,
            level: 2,
            children: [
              { indicator: "Оклады, доплаты, надбавки", plan: 200000, fact: 130000, deviation: -70000, percentage: 142.0, level: 3 },
              { indicator: "Премии", plan: 150000, fact: 90000, deviation: -60000, percentage: 140.0, level: 3 },
            ]
          },
          { indicator: "Страховые взносы", plan: 50000, fact: 30000, deviation: -20000, percentage: 135.0, level: 2 },
        ]
      },
      { 
        indicator: "Расходы на сеть связи",
        plan: 200000,
        fact: 120000,
        deviation: -80000,
        percentage: 138.0,
        level: 1,
        children: [
          { indicator: "Размещение оборудования сети связи", plan: 80000, fact: 48000, deviation: -32000, percentage: 139.0, level: 2 },
          { indicator: "Ремонт и ТО сооружений связи", plan: 70000, fact: 42000, deviation: -28000, percentage: 137.5, level: 2 },
          { indicator: "Запасные части", plan: 30000, fact: 18000, deviation: -12000, percentage: 138.5, level: 2 },
          { indicator: "Прочие затраты на сеть связи", plan: 20000, fact: 12000, deviation: -8000, percentage: 136.0, level: 2 },
        ]
      },
      { indicator: "Компьютеры, орг. техника (ремонт, ТО, зап. части)", plan: 80000, fact: 48000, deviation: -32000, percentage: 137.5, level: 1 },
      { indicator: "Безопасность", plan: 40000, fact: 24000, deviation: -16000, percentage: 136.5, level: 1 },
      { indicator: "Охрана труда", plan: 18000, fact: 7000, deviation: -11000, percentage: 135.0, level: 1 },
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

interface FinancialRowProps {
  row: TableRowData;
  expandedRows: Set<string>;
  onToggle: (indicator: string) => void;
  onRowClick: (indicator: string) => void;
  selectedIndicator: string;
}

const FinancialRow = ({ row, expandedRows, onToggle, onRowClick, selectedIndicator }: FinancialRowProps) => {
  const hasChildren = row.children && row.children.length > 0;
  const isExpanded = expandedRows.has(row.indicator);
  const isPositiveDeviation = row.deviation > 0;
  const isNegativeDeviation = row.deviation < 0;
  const isSelected = selectedIndicator === row.indicator;
  
  const paddingLeft = `${row.level * 1.5}rem`;

  return (
    <>
      <TableRow 
        onClick={() => onRowClick(row.indicator)}
        className={cn(
          "bg-table-row hover:bg-table-hover border-b border-border/50 transition-colors cursor-pointer",
          row.level === 0 && "font-semibold bg-table-header/50",
          isSelected && "bg-primary/10 hover:bg-primary/15"
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
          onRowClick={onRowClick}
          selectedIndicator={selectedIndicator}
        />
      ))}
    </>
  );
};

interface FinancialTableProps {
  onRowClick: (indicator: string) => void;
  selectedIndicator: string;
}

export const FinancialTable = ({ onRowClick, selectedIndicator }: FinancialTableProps) => {
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
            PL
          </span>
          <h3 className="text-sm font-semibold text-foreground">Отчёт о прибылях и убытках</h3>
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
              onRowClick={onRowClick}
              selectedIndicator={selectedIndicator}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
