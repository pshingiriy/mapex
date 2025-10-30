import { FinancialNav } from "@/components/FinancialNav";
import { MetricCard } from "@/components/MetricCard";
import { FinancialTableWithTabs } from "@/components/FinancialTableWithTabs";
import { RevenueChart } from "@/components/RevenueChart";

const Index = () => {
  return (
    <div className="min-h-screen bg-dashboard-bg">
      <FinancialNav />
      
      <main className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column - Financial Table with Tabs */}
          <div className="animate-fade-in">
            <FinancialTableWithTabs />
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
              <RevenueChart />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
