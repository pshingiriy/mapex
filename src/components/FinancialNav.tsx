import { Search, Bell, Settings, User, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const FinancialNav = () => {
  return (
    <nav className="bg-dashboard-nav border-b border-border">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-lg font-bold text-foreground">TelCompany</h1>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="text-xs">
                Финансы
              </Button>
              <Button variant="ghost" size="sm" className="text-xs">
                Показатели
              </Button>
              <Badge variant="secondary" className="bg-primary text-primary-foreground">
                15 дек 18:28
              </Badge>
              <Button variant="default" size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Далее
              </Button>
              <Button variant="ghost" size="sm" className="text-xs">
                Принято
              </Button>
              <span className="text-xs text-muted-foreground">БИУ'25</span>
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
          <button className="text-primary font-medium border-b-2 border-primary pb-2">
            PL
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors pb-2">
            Продукты
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors pb-2">
            ВО
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors pb-2">
            CF
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors pb-2">
            CAPEX
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
