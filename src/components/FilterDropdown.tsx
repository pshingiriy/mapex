import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface FilterDropdownProps {
  label: string;
  options: string[];
  selectedOptions: string[];
  onSelectionChange: (selected: string[]) => void;
  multiSelect?: boolean;
}

export const FilterDropdown = ({
  label,
  options,
  selectedOptions,
  onSelectionChange,
  multiSelect = false,
}: FilterDropdownProps) => {
  const [open, setOpen] = useState(false);

  const handleToggle = (option: string) => {
    if (multiSelect) {
      const newSelected = selectedOptions.includes(option)
        ? selectedOptions.filter((item) => item !== option)
        : [...selectedOptions, option];
      onSelectionChange(newSelected);
    } else {
      onSelectionChange([option]);
      setOpen(false);
    }
  };

  const displayText = selectedOptions.length > 0
    ? selectedOptions.length === 1
      ? selectedOptions[0]
      : `${selectedOptions.length} выбрано`
    : label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs gap-2 bg-background/50 hover:bg-background border-border"
        >
          {displayText}
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2 bg-card border-border z-50" align="start">
        <div className="max-h-64 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option}
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent cursor-pointer"
              onClick={() => handleToggle(option)}
            >
              {multiSelect ? (
                <Checkbox
                  checked={selectedOptions.includes(option)}
                  className="pointer-events-none"
                />
              ) : (
                <div className="w-4 h-4 flex items-center justify-center">
                  {selectedOptions.includes(option) && (
                    <Check className="h-3 w-3 text-primary" />
                  )}
                </div>
              )}
              <span className="text-sm flex-1">{option}</span>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
