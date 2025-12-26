import { CompanyData } from "@/data/organizationData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CompanyTableProps {
  companies: CompanyData[];
  title: string;
}

export const CompanyTable = ({ companies, title }: CompanyTableProps) => {
  const navigate = useNavigate();

  const isPrivateInvestor = (name: string | null): boolean => {
    return name?.toLowerCase().includes('private investor') || false;
  };

  const handleCompanyClick = (companyName: string) => {
    navigate('/', { state: { selectedCompany: companyName } });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <Table>
        <TableHeader>
          <TableRow className="border-border">
            <TableHead className="text-muted-foreground">Компания</TableHead>
            <TableHead className="text-muted-foreground">Владелец 1</TableHead>
            <TableHead className="text-muted-foreground">Доля 1</TableHead>
            <TableHead className="text-muted-foreground">Владелец 2</TableHead>
            <TableHead className="text-muted-foreground">Доля 2</TableHead>
            <TableHead className="text-muted-foreground">Куратор</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company) => (
            <TableRow key={company.id} className="border-border hover:bg-muted/50">
              <TableCell className="font-medium">
                <button
                  onClick={() => handleCompanyClick(company.name)}
                  className={cn(
                    "text-left text-primary hover:text-primary/80 hover:underline",
                    "inline-flex items-center gap-1.5 transition-colors"
                  )}
                  title="Перейти к финансам компании"
                >
                  {company.name}
                  <ExternalLink className="h-3 w-3 opacity-50" />
                </button>
              </TableCell>
              <TableCell className="text-muted-foreground">
                <div className="flex items-center gap-2">
                  {isPrivateInvestor(company.parentName1) && (
                    <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center">
                      <User size={12} className="text-muted-foreground" />
                    </div>
                  )}
                  {company.parentName1 || '-'}
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{company.ownership1 || '-'}</TableCell>
              <TableCell className="text-muted-foreground">
                <div className="flex items-center gap-2">
                  {isPrivateInvestor(company.parentName2) && (
                    <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center">
                      <User size={12} className="text-muted-foreground" />
                    </div>
                  )}
                  {company.parentName2 || '-'}
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{company.ownership2 || '-'}</TableCell>
              <TableCell className="text-muted-foreground">{company.supervisor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
