import { useState } from "react";
import { FinancialNav } from "@/components/FinancialNav";
import { MetricCard } from "@/components/MetricCard";
import { FinancialTable } from "@/components/FinancialTable";
import { RevenueChart } from "@/components/RevenueChart";

const Index = () => {
  const [selectedIndicator, setSelectedIndicator] = useState<string>("Валовая выручка");
  const [activeTab, setActiveTab] = useState<string>("PL");
  const [selectedClusters, setSelectedClusters] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [planPeriod, setPlanPeriod] = useState<string>("2024 год");
  const [factPeriod, setFactPeriod] = useState<string>("2024 год");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Reset to default indicator for each tab
    if (tab === "CF") {
      setSelectedIndicator("ОСТАТОК НА НАЧАЛО ОТЧЕТНОГО ПЕРИОДА");
    } else if (tab === "PL") {
      setSelectedIndicator("Валовая выручка");
    } else if (tab === "HR") {
      setSelectedIndicator("Среднесписочная численность персонала (ССЧ), чел.");
    }
  };

  const filterText = () => {
    const parts = [];
    if (selectedClusters.length > 0) {
      parts.push(`Кластер: ${selectedClusters.join(", ")}`);
    }
    if (selectedCompanies.length > 0) {
      parts.push(`Юр.лицо: ${selectedCompanies.join(", ")}`);
    }
    return parts.length > 0 ? parts.join(" | ") : "Все данные";
  };

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <FinancialNav 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        page="finance"
        selectedClusters={selectedClusters}
        onClusterChange={setSelectedClusters}
        selectedCompanies={selectedCompanies}
        onCompanyChange={setSelectedCompanies}
      />
      
      <main className="p-6 space-y-6">
        {/* Filter Display */}
        <div className="text-sm text-muted-foreground">
          {filterText()}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column - Financial Table */}
          <div className="animate-fade-in">
            <FinancialTable 
              tableType={activeTab} 
              onRowClick={setSelectedIndicator} 
              selectedIndicator={selectedIndicator}
              planPeriod={planPeriod}
              onPlanPeriodChange={setPlanPeriod}
              factPeriod={factPeriod}
              onFactPeriodChange={setFactPeriod}
            />
          </div>
          
          {/* Right column - Metrics and Chart */}
          <div className="space-y-6">
            {/* Top Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <MetricCard
                title="Выручка"
                value="644"
                change={-34.7}
                subtitle="Факт vs План"
              />
              <MetricCard
                title="EBITDA"
                value="635"
                change={7.6}
                subtitle="Факт vs План"
              />
            </div>
            
            {/* Bottom Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <MetricCard
                title="Операционные расходы"
                value="774"
                change={54.1}
                subtitle="млн ₽"
              />
              <MetricCard
                title="Чистая прибыль"
                value="69"
                change={30.9}
                subtitle="млн ₽"
              />
            </div>
            
            {/* Revenue Chart */}
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <RevenueChart selectedIndicator={selectedIndicator} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
