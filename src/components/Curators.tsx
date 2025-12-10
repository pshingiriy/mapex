import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User } from "lucide-react";
import { getSupervisors, getCompaniesBySupervisor, clusterInfo } from "@/data/organizationData";
import { CompanyTable } from "@/components/CompanyTable";

export const Curators = () => {
  const [selectedCurator, setSelectedCurator] = useState<string | null>(null);
  const supervisors = getSupervisors();

  if (selectedCurator) {
    const companies = getCompaniesBySupervisor(selectedCurator);
    
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedCurator(null)}
            className="gap-2"
          >
            <ArrowLeft size={16} />
            Назад к кураторам
          </Button>
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">{selectedCurator}</h3>
        </div>
        <CompanyTable 
          companies={companies} 
          title={`Компании куратора "${selectedCurator}"`} 
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {supervisors.map((supervisor) => {
        const clusterIcons = supervisor.clusters
          .map(clusterName => clusterInfo[clusterName])
          .filter(Boolean);
        
        return (
          <Card
            key={supervisor.name}
            onClick={() => setSelectedCurator(supervisor.name)}
            className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border group"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <User className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground leading-tight">
                {supervisor.name}
              </h3>
              <div className="flex flex-wrap justify-center gap-1.5">
                {clusterIcons.slice(0, 4).map((cluster, idx) => {
                  const Icon = cluster.icon;
                  return (
                    <div 
                      key={idx}
                      className={`w-6 h-6 rounded bg-gradient-to-br ${cluster.color} flex items-center justify-center`}
                      title={cluster.name}
                    >
                      <Icon className="w-3 h-3 text-white" />
                    </div>
                  );
                })}
                {clusterIcons.length > 4 && (
                  <div className="w-6 h-6 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">
                    +{clusterIcons.length - 4}
                  </div>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
