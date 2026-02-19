import { Search, Bell, Settings, User, ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useLocation } from "react-router-dom";
import { FilterDropdown } from "@/components/FilterDropdown";
import { companies } from "@/data/organizationData";

interface FinancialNavProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  page?: string;
  subPage?: string;
  onSubPageChange?: (subPage: string) => void;
  selectedClusters?: string[];
  onClusterChange?: (clusters: string[]) => void;
  selectedCompanies?: string[];
  onCompanyChange?: (companies: string[]) => void;
}

export const FinancialNav = ({ 
  activeTab = "PL", 
  onTabChange, 
  page, 
  subPage, 
  onSubPageChange,
  selectedClusters = [],
  onClusterChange,
  selectedCompanies = [],
  onCompanyChange,
}: FinancialNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const clusterOptions = [
    "Телеком-операторы/B2O",
    "Мобильный бизнес",
    "ЦОД и облачные сервисы",
    "Информационная безопасность",
    "Государственные цифровые услуги и сервисы",
    "Коммерческий ИТ-кластер",
    "Цифровые регионы",
    "БТИ (Блок технической инфраструктуры)",
    "X.Tech (корпоративный венчурный фонд)",
    "Цифротех",
    "Здоровье",
    "Госсервисы",
    "Образование",
    "Прочие",
  ];

  const companyOptions = companies.map(c => c.name);

  const renderSecondLevelMenu = () => {
    if (page === "finance") {
      return (
        <div className="flex items-center gap-4 text-xs">
          <FilterDropdown
            label="По Кластеру"
            options={clusterOptions}
            selectedOptions={selectedClusters}
            onSelectionChange={onClusterChange || (() => {})}
            multiSelect
          />
          <FilterDropdown
            label="По юр.лицу"
            options={companyOptions}
            selectedOptions={selectedCompanies}
            onSelectionChange={onCompanyChange || (() => {})}
            multiSelect={false}
          />
        </div>
      );
    }
    if (page === "structure") {
      return (
        <div className="flex items-center gap-6 text-xs">
          <button 
            onClick={() => onSubPageChange?.("tree")}
            className={`${subPage === "tree" ? "text-primary font-medium border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"} transition-colors pb-2`}
          >
            Структура Группы
          </button>
          <button 
            onClick={() => onSubPageChange?.("clusters")}
            className={`${subPage === "clusters" ? "text-primary font-medium border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"} transition-colors pb-2`}
          >
            Кластеры
          </button>
          <button 
            onClick={() => onSubPageChange?.("curators")}
            className={`${subPage === "curators" ? "text-primary font-medium border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"} transition-colors pb-2`}
          >
            Кураторы
          </button>
        </div>
      );
    }
    if (page === "partnerships") {
      return (
        <div className="flex items-center gap-6 text-xs">
          <button 
            onClick={() => onSubPageChange?.("general")}
            className={`${subPage === "general" ? "text-primary font-medium border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"} transition-colors pb-2`}
          >
            Общий дашборд СП
          </button>
          <button 
            onClick={() => onSubPageChange?.("detail")}
            className={`${subPage === "detail" ? "text-primary font-medium border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"} transition-colors pb-2`}
          >
            СП
          </button>
        </div>
      );
    }

    return null;
  };

  const renderThirdLevelMenu = () => {
    if (page === "finance") {
      return (
        <div className="flex items-center gap-6 text-xs">
          <button className="text-muted-foreground hover:text-foreground transition-colors pb-2">
            Ключевые показатели
          </button>
          <button 
            onClick={() => onTabChange?.("PL")}
            className={`${activeTab === "PL" ? "text-primary font-medium border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"} transition-colors pb-2`}
          >
            PL
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
        </div>
      );
    }
    return null;
  };

  return (
    <nav className="bg-dashboard-nav border-b border-border">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <img src="/mapex_logo_bw.png" alt="MAPEX ВІ ДЗО" className="h-28 w-auto dark:invert dark:brightness-100" />
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`text-xs ${page === 'finance' ? 'bg-primary/10 text-primary' : ''}`}
                onClick={() => {
                  navigate('/');
                }}
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
                className={`text-xs ${location.pathname === '/partnerships' ? 'bg-primary/10 text-primary' : ''}`}
                onClick={() => navigate('/partnerships')}
              >
                Партнёрства
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
              <Button 
                variant="ghost" 
                size="sm" 
                className={`text-xs ${location.pathname === '/event-history' ? 'bg-primary/10 text-primary' : ''}`}
                onClick={() => navigate('/event-history')}
              >
                История событий
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
            <ThemeToggle />
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
        {renderSecondLevelMenu()}
      </div>
      
      {renderThirdLevelMenu() && (
        <div className="px-6 py-2 border-t border-border/50">
          {renderThirdLevelMenu()}
        </div>
      )}
    </nav>
  );
};
