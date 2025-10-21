import { DashboardNav } from "@/components/DashboardNav";
import { OrganizationFlow } from "@/components/OrganizationFlow";

const Index = () => {
  return (
    <div className="min-h-screen bg-dashboard-bg">
      <DashboardNav />
      <OrganizationFlow />
    </div>
  );
};

export default Index;
