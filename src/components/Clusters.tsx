import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { clusterInfo, getCompaniesByCluster } from "@/data/organizationData";
import { CompanyTable } from "@/components/CompanyTable";

export const Clusters = () => {
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null);

  const clusters = Object.values(clusterInfo);

  if (selectedCluster) {
    const companies = getCompaniesByCluster(selectedCluster);
    const cluster = clusterInfo[selectedCluster];
    const Icon = cluster?.icon;
    
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedCluster(null)}
            className="gap-2"
          >
            <ArrowLeft size={16} />
            Назад к кластерам
          </Button>
          {Icon && (
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${cluster.color} flex items-center justify-center`}>
              <Icon className="w-4 h-4 text-white" />
            </div>
          )}
          <h3 className="text-lg font-semibold text-foreground">{selectedCluster}</h3>
        </div>
        <CompanyTable 
          companies={companies} 
          title={`Компании кластера "${selectedCluster}"`} 
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {clusters.map((cluster) => {
        const Icon = cluster.icon;
        return (
          <Card
            key={cluster.name}
            onClick={() => setSelectedCluster(cluster.name)}
            className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border group"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${cluster.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-sm font-medium text-foreground leading-tight">
                {cluster.name}
              </h3>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
