import { Search, Bell, Settings, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const DashboardNav = () => {
  return (
    <nav className="bg-dashboard-nav border-b border-border px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-semibold text-foreground">Corporate Structure</h1>
          <div className="flex items-center gap-6 text-sm">
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              Overview
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              Documents
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              Projects
            </button>
            <button className="text-primary font-medium border-b-2 border-primary pb-3">
              Structure
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              Analytics
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-10 w-64 bg-secondary border-border"
            />
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};
