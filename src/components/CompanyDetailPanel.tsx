import { X, Building2, User, Users, GitBranch, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { companies, clusterInfo, CompanyData } from '@/data/organizationData';

interface CompanyDetailPanelProps {
  companyId: string | null;
  onClose: () => void;
}

export const CompanyDetailPanel = ({ companyId, onClose }: CompanyDetailPanelProps) => {
  if (!companyId) return null;
  
  const company = companies.find(c => c.id.toString() === companyId);
  if (!company) return null;
  
  const cluster = company.cluster ? clusterInfo[company.cluster] : null;
  const ClusterIcon = cluster?.icon;
  
  // Get parent companies
  const parent1 = company.parentName1 ? companies.find(c => c.name === company.parentName1) : null;
  const parent2 = company.parentName2 ? companies.find(c => c.name === company.parentName2) : null;
  
  // Get child companies
  const children = companies.filter(c => c.parentName1 === company.name || c.parentName2 === company.name);
  
  // Get sibling companies (same parent)
  const siblings = company.parentName1 
    ? companies.filter(c => c.parentName1 === company.parentName1 && c.id !== company.id)
    : [];

  return (
    <div className="w-[350px] h-full border-l border-border bg-card/80 backdrop-blur-sm overflow-hidden flex flex-col animate-in slide-in-from-right duration-300">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Building2 className="h-4 w-4 text-primary" />
          Детали компании
        </h3>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Company Name */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-4">
            <div className="flex items-start gap-3">
              {ClusterIcon && (
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cluster?.color} flex items-center justify-center flex-shrink-0`}>
                  <ClusterIcon size={20} className="text-white" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground text-lg leading-tight">
                  {company.name}
                </h4>
                {company.cluster && (
                  <Badge variant="secondary" className="mt-2 text-xs">
                    {company.cluster}
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Supervisor */}
        {company.supervisor && (
          <Card>
            <CardHeader className="pb-2 pt-3 px-4">
              <CardTitle className="text-sm flex items-center gap-2 text-muted-foreground font-medium">
                <User className="h-4 w-4" />
                Куратор
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-3">
              <span className="text-foreground font-medium">{company.supervisor}</span>
            </CardContent>
          </Card>
        )}
        
        {/* Ownership Structure */}
        {(parent1 || parent2) && (
          <Card>
            <CardHeader className="pb-2 pt-3 px-4">
              <CardTitle className="text-sm flex items-center gap-2 text-muted-foreground font-medium">
                <GitBranch className="h-4 w-4" />
                Владельцы
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-3 space-y-2">
              {parent1 && (
                <div className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                  <span className="text-sm text-foreground truncate flex-1">
                    {company.parentName1}
                  </span>
                  <Badge variant="outline" className="ml-2 flex-shrink-0">
                    {company.ownership1}
                  </Badge>
                </div>
              )}
              {parent2 && (
                <div className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                  <span className="text-sm text-foreground truncate flex-1">
                    {company.parentName2}
                  </span>
                  <Badge variant="outline" className="ml-2 flex-shrink-0">
                    {company.ownership2}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        )}
        
        {/* Children */}
        {children.length > 0 && (
          <Card>
            <CardHeader className="pb-2 pt-3 px-4">
              <CardTitle className="text-sm flex items-center gap-2 text-muted-foreground font-medium">
                <Layers className="h-4 w-4" />
                Дочерние компании ({children.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-3">
              <div className="space-y-1 max-h-[150px] overflow-y-auto">
                {children.map(child => {
                  const ownership = child.parentName1 === company.name ? child.ownership1 : child.ownership2;
                  return (
                    <div key={child.id} className="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-muted/50 transition-colors">
                      <span className="text-sm text-foreground truncate flex-1">{child.name}</span>
                      {ownership && (
                        <Badge variant="secondary" className="ml-2 flex-shrink-0 text-xs">
                          {ownership}
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Siblings */}
        {siblings.length > 0 && (
          <Card>
            <CardHeader className="pb-2 pt-3 px-4">
              <CardTitle className="text-sm flex items-center gap-2 text-muted-foreground font-medium">
                <Users className="h-4 w-4" />
                Компании того же уровня ({siblings.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-3">
              <div className="space-y-1 max-h-[120px] overflow-y-auto">
                {siblings.slice(0, 10).map(sibling => (
                  <div key={sibling.id} className="py-1.5 px-2 rounded-md hover:bg-muted/50 transition-colors">
                    <span className="text-sm text-foreground">{sibling.name}</span>
                  </div>
                ))}
                {siblings.length > 10 && (
                  <span className="text-xs text-muted-foreground px-2">
                    и ещё {siblings.length - 10}...
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Statistics */}
        <Card>
          <CardHeader className="pb-2 pt-3 px-4">
            <CardTitle className="text-sm text-muted-foreground font-medium">
              Статистика
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-2 rounded-md bg-muted/30">
                <div className="text-lg font-semibold text-foreground">{children.length}</div>
                <div className="text-xs text-muted-foreground">Дочерних</div>
              </div>
              <div className="text-center p-2 rounded-md bg-muted/30">
                <div className="text-lg font-semibold text-foreground">{siblings.length}</div>
                <div className="text-xs text-muted-foreground">На уровне</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
