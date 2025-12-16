import { useState } from "react";
import { FinancialNav } from "@/components/FinancialNav";
import { JVGeneralDashboard } from "@/components/JVGeneralDashboard";
import { JVDetailDashboard } from "@/components/JVDetailDashboard";

const Partnerships = () => {
  const [subPage, setSubPage] = useState<"general" | "detail">("general");
  const [selectedJV, setSelectedJV] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <FinancialNav 
        page="partnerships" 
        subPage={subPage}
        onSubPageChange={(page) => setSubPage(page as "general" | "detail")}
      />
      
      <div className="p-6">
        {subPage === "general" ? (
          <JVGeneralDashboard 
            onSelectJV={(jvId) => {
              setSelectedJV(jvId);
              setSubPage("detail");
            }}
          />
        ) : (
          <JVDetailDashboard 
            selectedJVId={selectedJV}
            onSelectJV={setSelectedJV}
          />
        )}
      </div>
    </div>
  );
};

export default Partnerships;
