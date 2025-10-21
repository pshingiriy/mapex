import { TrendingUp, TrendingDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableRowData {
  indicator: string;
  plan: number;
  fact: number;
  deviation: number;
  percentage: number;
}

const data: TableRowData[] = [
  { indicator: "Выручка", plan: 171, fact: 529, deviation: 358, percentage: 84.5 },
  { indicator: "Себестоимость", plan: 878, fact: 403, deviation: -475, percentage: 84.4 },
  { indicator: "Валовая прибыль", plan: 293, fact: 875, deviation: 582, percentage: 85.5 },
  { indicator: "Операционные расходы", plan: 937, fact: 761, deviation: -176, percentage: 95.1 },
  { indicator: "Распределенные непрямые расходы", plan: 738, fact: 449, deviation: -289, percentage: 138.9 },
  { indicator: "Чистый операционный доход", plan: 444, fact: 118, deviation: -326, percentage: 94.4 },
  { indicator: "Прочие доходы/расходы", plan: 807, fact: 143, deviation: -664, percentage: 124.4 },
  { indicator: "EBITDA", plan: 514, fact: 747, deviation: 233, percentage: 77.4 },
  { indicator: "Прибыль до налогообложения", plan: 881, fact: 781, deviation: -100, percentage: 90.0 },
  { indicator: "Налог на прибыль", plan: 41, fact: 139, deviation: 98, percentage: 87.1 },
  { indicator: "Чистая прибыль", plan: 134, fact: 413, deviation: 279, percentage: 90.9 },
];

export const FinancialTable = () => {
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
            <TableHead className="text-right text-muted-foreground font-medium">План БЮТ'25</TableHead>
            <TableHead className="text-right text-muted-foreground font-medium">Факт БЮТ'25</TableHead>
            <TableHead className="text-right text-muted-foreground font-medium">vs План</TableHead>
            <TableHead className="text-right text-muted-foreground font-medium">%</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => {
            const isPositiveDeviation = row.deviation > 0;
            const isNegativeDeviation = row.deviation < 0;
            
            return (
              <TableRow 
                key={index}
                className="bg-table-row hover:bg-table-hover border-b border-border/50 transition-colors"
              >
                <TableCell className="font-medium text-foreground">{row.indicator}</TableCell>
                <TableCell className="text-right text-foreground">{row.plan}</TableCell>
                <TableCell className="text-right text-foreground">{row.fact}</TableCell>
                <TableCell className={`text-right font-medium flex items-center justify-end gap-1 ${
                  isPositiveDeviation ? "text-success" : isNegativeDeviation ? "text-destructive" : "text-muted-foreground"
                }`}>
                  {isPositiveDeviation ? <TrendingUp className="h-3 w-3" /> : isNegativeDeviation ? <TrendingDown className="h-3 w-3" /> : null}
                  {row.deviation > 0 ? "+" : ""}{row.deviation}
                </TableCell>
                <TableCell className={`text-right font-medium ${
                  row.percentage >= 90 ? "text-success" : row.percentage >= 80 ? "text-primary" : "text-destructive"
                }`}>
                  {row.percentage}%
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
