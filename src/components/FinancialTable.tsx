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
import { TableRowData } from "@/data/tableTypes";
import { plData } from "@/data/plData";
import { cfData } from "@/data/cfData";
import { hrData } from "@/data/hrData";
import { PeriodSelector } from "@/components/PeriodSelector";

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
  tableType: string;
  onRowClick: (indicator: string) => void;
  selectedIndicator: string;
  planPeriod?: string;
  onPlanPeriodChange?: (period: string) => void;
  factPeriod?: string;
  onFactPeriodChange?: (period: string) => void;
}

export const FinancialTable = ({ 
  tableType, 
  onRowClick, 
  selectedIndicator,
  planPeriod = "2024 год",
  onPlanPeriodChange = () => {},
  factPeriod = "2024 год",
  onFactPeriodChange = () => {},
}: FinancialTableProps) => {
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

  const data = tableType === "CF" ? cfData : tableType === "HR" ? hrData : plData;
  const tableTitle = tableType === "CF" ? "Отчёт о движении денежных средств" : tableType === "HR" ? "Среднесписочная численность персонала" : "Отчёт о прибылях и убытках";
  const tableLabel = tableType === "CF" ? "CF" : tableType === "HR" ? "HR" : "PL";
  const tableUnit = tableType === "HR" ? "чел." : "млн ₽";

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 bg-table-header border-b border-border">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium">
            {tableLabel}
          </span>
          <h3 className="text-sm font-semibold text-foreground">{tableTitle}</h3>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow className="bg-table-header border-b border-border hover:bg-table-header">
            <TableHead className="text-muted-foreground font-medium">Показатель, {tableUnit}</TableHead>
            <TableHead className="text-right text-muted-foreground font-medium">
              {tableType !== "HR" ? (
                <PeriodSelector
                  type="plan"
                  selectedPeriod={planPeriod}
                  onPeriodChange={onPlanPeriodChange}
                />
              ) : (
                "План'25"
              )}
            </TableHead>
            <TableHead className="text-right text-muted-foreground font-medium">
              {tableType !== "HR" ? (
                <PeriodSelector
                  type="fact"
                  selectedPeriod={factPeriod}
                  onPeriodChange={onFactPeriodChange}
                />
              ) : (
                "Факт'25"
              )}
            </TableHead>
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
