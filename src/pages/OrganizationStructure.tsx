import { useState } from "react";
import { FinancialNav } from "@/components/FinancialNav";
import { OrganizationTree } from "@/components/OrganizationTree";
import { Clusters } from "@/components/Clusters";

const OrganizationStructure = () => {
  const [subPage, setSubPage] = useState<string>("tree");

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <FinancialNav 
        page="structure" 
        subPage={subPage} 
        onSubPageChange={setSubPage}
      />
      <div className="container mx-auto px-6 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {subPage === "tree" ? "Структура Группы" : "Кластеры"}
          </h2>
          <p className="text-muted-foreground">
            {subPage === "tree" ? "Консолидированная финансовая структура" : "Бизнес-кластеры компании"}
          </p>
        </div>
        {subPage === "tree" ? <OrganizationTree /> : <Clusters />}
      </div>
    </div>
  );
};

export default OrganizationStructure;
