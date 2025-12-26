import { useState, useRef, useEffect, useMemo } from 'react';
import { Search, X, Building2, Users, Layers } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { companies, clusterInfo, getSupervisors } from '@/data/organizationData';

interface SearchResult {
  type: 'company' | 'cluster' | 'supervisor';
  value: string;
  label: string;
}

interface SearchWithAutocompleteProps {
  onSearch: (results: SearchResult[]) => void;
  selectedFilters: SearchResult[];
  onFilterRemove: (filter: SearchResult) => void;
  onClearAll: () => void;
}

export const SearchWithAutocomplete = ({
  onSearch,
  selectedFilters,
  onFilterRemove,
  onClearAll,
}: SearchWithAutocompleteProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const supervisors = getSupervisors();
  const clusterNames = Object.keys(clusterInfo);

  const suggestions = useMemo(() => {
    if (!inputValue.trim()) return [];
    
    const searchLower = inputValue.toLowerCase();
    const results: SearchResult[] = [];
    
    // Search companies
    companies.forEach(company => {
      if (company.name.toLowerCase().includes(searchLower)) {
        if (!selectedFilters.find(f => f.type === 'company' && f.value === company.name)) {
          results.push({
            type: 'company',
            value: company.name,
            label: company.name,
          });
        }
      }
    });
    
    // Search clusters
    clusterNames.forEach(cluster => {
      if (cluster.toLowerCase().includes(searchLower)) {
        if (!selectedFilters.find(f => f.type === 'cluster' && f.value === cluster)) {
          results.push({
            type: 'cluster',
            value: cluster,
            label: cluster,
          });
        }
      }
    });
    
    // Search supervisors
    supervisors.forEach(s => {
      if (s.name.toLowerCase().includes(searchLower)) {
        if (!selectedFilters.find(f => f.type === 'supervisor' && f.value === s.name)) {
          results.push({
            type: 'supervisor',
            value: s.name,
            label: s.name,
          });
        }
      }
    });
    
    return results.slice(0, 10);
  }, [inputValue, selectedFilters, clusterNames, supervisors]);

  useEffect(() => {
    setHighlightedIndex(0);
  }, [suggestions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (result: SearchResult) => {
    const newFilters = [...selectedFilters, result];
    onSearch(newFilters);
    setInputValue('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && suggestions[highlightedIndex]) {
      e.preventDefault();
      handleSelect(suggestions[highlightedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Backspace' && !inputValue && selectedFilters.length > 0) {
      onFilterRemove(selectedFilters[selectedFilters.length - 1]);
    }
  };

  const getIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'company':
        return <Building2 className="h-3 w-3" />;
      case 'cluster':
        return <Layers className="h-3 w-3" />;
      case 'supervisor':
        return <Users className="h-3 w-3" />;
    }
  };

  const getTypeLabel = (type: SearchResult['type']) => {
    switch (type) {
      case 'company':
        return 'Компания';
      case 'cluster':
        return 'Кластер';
      case 'supervisor':
        return 'Куратор';
    }
  };

  const getBadgeVariant = (type: SearchResult['type']) => {
    switch (type) {
      case 'company':
        return 'default';
      case 'cluster':
        return 'secondary';
      case 'supervisor':
        return 'outline';
    }
  };

  return (
    <div className="relative flex-1 min-w-[300px] max-w-[500px]">
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 pl-9 pr-8 min-h-[40px] bg-background/50 border border-border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        
        {selectedFilters.map((filter, index) => (
          <Badge
            key={`${filter.type}-${filter.value}-${index}`}
            variant={getBadgeVariant(filter.type)}
            className="flex items-center gap-1 px-2 py-0.5 text-xs cursor-default"
          >
            {getIcon(filter.type)}
            <span className="max-w-[120px] truncate">{filter.label}</span>
            <X
              className="h-3 w-3 cursor-pointer hover:text-destructive transition-colors"
              onClick={() => onFilterRemove(filter)}
            />
          </Badge>
        ))}
        
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={selectedFilters.length === 0 ? "Поиск по компании, кластеру, куратору..." : "Добавить фильтр..."}
          className="flex-1 min-w-[150px] bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
        />
        
        {(selectedFilters.length > 0 || inputValue) && (
          <button
            onClick={() => {
              setInputValue('');
              onClearAll();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded transition-colors"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>
      
      {isOpen && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-[99999] w-full mt-1 py-1 bg-popover border border-border rounded-md shadow-lg max-h-[300px] overflow-y-auto"
        >
          {suggestions.map((result, index) => (
            <div
              key={`${result.type}-${result.value}`}
              onClick={() => handleSelect(result)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors",
                index === highlightedIndex 
                  ? "bg-accent text-accent-foreground" 
                  : "hover:bg-muted"
              )}
            >
              <div className={cn(
                "flex items-center justify-center w-7 h-7 rounded-full",
                result.type === 'company' && "bg-primary/10 text-primary",
                result.type === 'cluster' && "bg-secondary text-secondary-foreground",
                result.type === 'supervisor' && "bg-muted text-muted-foreground"
              )}>
                {getIcon(result.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{result.label}</div>
                <div className="text-xs text-muted-foreground">{getTypeLabel(result.type)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};