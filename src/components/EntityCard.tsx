import { Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface EntityCardProps {
  name: string;
  type: string;
  ownership?: string;
  id: string;
}

export const EntityCard = ({ name, type, ownership }: EntityCardProps) => {
  return (
    <Card className="bg-entity-card hover:bg-entity-hover border-border transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 cursor-pointer group">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
            <Building2 className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-foreground truncate mb-1">
              {name}
            </h3>
            <p className="text-xs text-muted-foreground">{type}</p>
            {ownership && (
              <p className="text-xs text-primary mt-2 font-medium">{ownership}</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
