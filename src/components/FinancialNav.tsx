import { Search, Bell, Settings, User, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useLocation } from "react-router-dom";

interface FinancialNavProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const FinancialNav = ({ activeTab = "PL", onTabChange }: FinancialNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="bg-dashboard-nav border-b border-border">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-lg font-bold text-foreground">TelCompany</h1>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`text-xs ${location.pathname === '/' ? 'bg-primary/10 text-primary' : ''}`}
                onClick={() => navigate('/')}
              >
                Финансы
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`text-xs ${location.pathname === '/structure' ? 'bg-primary/10 text-primary' : ''}`}
                onClick={() => navigate('/structure')}
              >
                Структура Группы
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`text-xs ${location.pathname === '/inorganic' ? 'bg-primary/10 text-primary' : ''}`}
                onClick={() => navigate('/inorganic')}
              >
                НеОрганик
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`text-xs ${location.pathname === '/corporate-standards' ? 'bg-primary/10 text-primary' : ''}`}
                onClick={() => navigate('/corporate-standards')}
              >
                Корп.Стандарты
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск..."
                className="pl-10 w-48 bg-background/50 border-border h-8 text-sm"
              />
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 h-8">
              <User className="h-4 w-4" />
              <ChevronDown className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-2 border-t border-border/50">
        <div className="flex items-center gap-6 text-xs">
          <button className="text-muted-foreground hover:text-foreground transition-colors pb-2">
            Ключевые показатели
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors pb-2">
            Сводные
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors pb-2">
            Цены
          </button>
          <button 
            onClick={() => onTabChange?.("PL")}
            className={`${activeTab === "PL" ? "text-primary font-medium border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"} transition-colors pb-2`}
          >
            PL
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors pb-2">
            Продукты
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors pb-2">
            ВО
          </button>
          <button 
            onClick={() => onTabChange?.("CF")}
            className={`${activeTab === "CF" ? "text-primary font-medium border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"} transition-colors pb-2`}
          >
            CF
          </button>
          <button 
            onClick={() => onTabChange?.("CAPEX")}
            className={`${activeTab === "CAPEX" ? "text-primary font-medium border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"} transition-colors pb-2`}
          >
            CAPEX
          </button>
          <button 
            onClick={() => onTabChange?.("HR")}
            className={`${activeTab === "HR" ? "text-primary font-medium border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"} transition-colors pb-2`}
          >
            HR
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors pb-2">
            Рыночные доли
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors pb-2">
            Ежедневная динамика
          </button>
        </div>
      </div>
    </nav>
  );
};
