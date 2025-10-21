import { FinancialNav } from "@/components/FinancialNav";
import { OrganizationTree } from "@/components/OrganizationTree";

const OrganizationStructure = () => {
  return (
    <div className="min-h-screen bg-dashboard-bg">
      <FinancialNav />
      <div className="container mx-auto px-6 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Структура Группы</h2>
          <p className="text-muted-foreground">Консолидированная финансовая структура</p>
        </div>
        <OrganizationTree />
      </div>
    </div>
  );
};

export default OrganizationStructure;
