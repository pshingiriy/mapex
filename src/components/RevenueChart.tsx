import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const data = [
  { month: "2024-01", value: 380 },
  { month: "2024-02", value: 420 },
  { month: "2024-03", value: 510 },
  { month: "2024-04", value: 580 },
  { month: "2024-05", value: 640 },
  { month: "2024-06", value: 680 },
  { month: "2024-07", value: 520 },
  { month: "2024-08", value: 560 },
  { month: "2024-09", value: 620 },
  { month: "2024-10", value: 720 },
  { month: "2024-11", value: 810 },
  { month: "2024-12", value: 880 },
];

export const RevenueChart = () => {
  return (
    <Card className="bg-chart-bg border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-1">Выручка</h3>
          <p className="text-xs text-muted-foreground">млн ₽</p>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis 
            dataKey="month" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString('ru', { month: 'short' });
            }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              color: "hsl(var(--foreground))",
            }}
            labelFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString('ru', { month: 'long', year: 'numeric' });
            }}
          />
          <Bar 
            dataKey="value" 
            fill="hsl(var(--primary))"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
