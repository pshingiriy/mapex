export interface TableRowData {
  indicator: string;
  plan: number;
  fact: number;
  deviation: number;
  percentage: number;
  level: number;
  children?: TableRowData[];
}
