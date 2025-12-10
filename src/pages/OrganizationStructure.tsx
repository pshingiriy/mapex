import { useState } from "react";
import { FinancialNav } from "@/components/FinancialNav";
import { OrganizationTree } from "@/components/OrganizationTree";
import { Clusters } from "@/components/Clusters";
import { Curators } from "@/components/Curators";

const OrganizationStructure = () => {
  const [subPage, setSubPage] = useState<string>("tree");

  const getTitle = () => {
    switch (subPage) {
      case "tree":
        return "Структура Группы";
      case "clusters":
        return "Кластеры";
      case "curators":
        return "Кураторы";
      default:
        return "Структура Группы";
    }
  };

  const getDescription = () => {
    switch (subPage) {
      case "tree":
        return "Консолидированная финансовая структура";
      case "clusters":
        return "Бизнес-кластеры компании";
      case "curators":
        return "Кураторы и их компании";
      default:
        return "";
    }
  };

  const renderContent = () => {
    switch (subPage) {
      case "tree":
        return <OrganizationTree />;
      case "clusters":
        return <Clusters />;
      case "curators":
        return <Curators />;
      default:
        return <OrganizationTree />;
    }
  };

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
            {getTitle()}
          </h2>
          <p className="text-muted-foreground">
            {getDescription()}
          </p>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default OrganizationStructure;
