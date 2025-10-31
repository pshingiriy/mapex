import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

interface PeriodSelectorProps {
  type: "plan" | "fact";
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
}

export const PeriodSelector = ({
  type,
  selectedPeriod,
  onPeriodChange,
}: PeriodSelectorProps) => {
  const [open, setOpen] = useState(false);

  const periods = [
    "2024 год",
    "2023 год",
    "2022 год",
    "Январь 2024",
    "Февраль 2024",
    "Март 2024",
    "Апрель 2024",
    "Май 2024",
    "Июнь 2024",
    "Июль 2024",
    "Август 2024",
    "Сентябрь 2024",
    "Октябрь 2024",
    "Ноябрь 2024",
    "Декабрь 2024",
  ];

  const handleSelect = (period: string) => {
    onPeriodChange(period);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-auto p-0 hover:bg-transparent group"
        >
          <div className="flex items-center gap-1">
            <span className="text-xs font-medium group-hover:text-primary transition-colors">
              {type === "plan" ? "План" : "Факт"}
            </span>
            <ChevronDown className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2 bg-card border-border z-50" align="center">
        <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
          Выберите период
        </div>
        <div className="max-h-64 overflow-y-auto">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => handleSelect(period)}
              className={`w-full text-left px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors ${
                selectedPeriod === period
                  ? "bg-primary/10 text-primary font-medium"
                  : ""
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
