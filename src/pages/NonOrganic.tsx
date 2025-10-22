import { FinancialNav } from "@/components/FinancialNav";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Users, DollarSign, Target } from "lucide-react";

const NonOrganic = () => {
  const marketingMetrics = [
    { title: "Marketing Spend", value: "$2.4M", change: 15.3 },
    { title: "CAC", value: "$245", change: -8.2 },
    { title: "Paid Users", value: "12,450", change: 22.7 },
    { title: "ROAS", value: "3.2x", change: 12.5 },
  ];

  const channelData = [
    { channel: "Google Ads", spend: "$850K", conversions: 3420, cac: "$248", roas: "3.5x" },
    { channel: "Facebook Ads", spend: "$620K", conversions: 2890, cac: "$214", roas: "3.8x" },
    { channel: "LinkedIn Ads", spend: "$410K", conversions: 1240, cac: "$330", roas: "2.4x" },
    { channel: "Display Network", spend: "$320K", conversions: 980, cac: "$326", roas: "2.6x" },
    { channel: "Influencer", spend: "$200K", conversions: 920, cac: "$217", roas: "3.9x" },
  ];

  const campaignData = [
    { campaign: "Q4 Brand Awareness", budget: "$450K", spent: "$423K", leads: 2340, status: "Active" },
    { campaign: "Product Launch 2024", budget: "$380K", spent: "$380K", leads: 1890, status: "Completed" },
    { campaign: "Retargeting Campaign", budget: "$280K", spent: "$267K", leads: 3120, status: "Active" },
    { campaign: "Holiday Promotion", budget: "$520K", spent: "$498K", leads: 4230, status: "Active" },
  ];

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <FinancialNav />
      
      <main className="container mx-auto px-6 py-8 animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Non-Organic Growth</h1>
            <p className="text-muted-foreground">Paid marketing & acquisition metrics</p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {marketingMetrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
            />
          ))}
        </div>

        <Tabs defaultValue="channels" className="space-y-6">
          <TabsList>
            <TabsTrigger value="channels">Marketing Channels</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="channels">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Channel Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-table-header text-left">
                        <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Channel</th>
                        <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">Total Spend</th>
                        <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">Conversions</th>
                        <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">CAC</th>
                        <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">ROAS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {channelData.map((row, index) => (
                        <tr key={index} className="bg-table-row hover:bg-table-hover transition-colors border-t border-border">
                          <td className="px-4 py-4 text-sm font-medium text-foreground">{row.channel}</td>
                          <td className="px-4 py-4 text-sm text-foreground text-right">{row.spend}</td>
                          <td className="px-4 py-4 text-sm text-foreground text-right">{row.conversions.toLocaleString()}</td>
                          <td className="px-4 py-4 text-sm text-foreground text-right">{row.cac}</td>
                          <td className="px-4 py-4 text-sm text-foreground text-right">
                            <span className="text-success font-medium">{row.roas}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Active Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-table-header text-left">
                        <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Campaign Name</th>
                        <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">Budget</th>
                        <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">Spent</th>
                        <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">Leads</th>
                        <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaignData.map((row, index) => (
                        <tr key={index} className="bg-table-row hover:bg-table-hover transition-colors border-t border-border">
                          <td className="px-4 py-4 text-sm font-medium text-foreground">{row.campaign}</td>
                          <td className="px-4 py-4 text-sm text-foreground text-right">{row.budget}</td>
                          <td className="px-4 py-4 text-sm text-foreground text-right">{row.spent}</td>
                          <td className="px-4 py-4 text-sm text-foreground text-right">{row.leads.toLocaleString()}</td>
                          <td className="px-4 py-4 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              row.status === "Active" ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
                            }`}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Conversion Funnel
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Impressions</span>
                      <span className="text-lg font-semibold text-foreground">2.4M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Clicks</span>
                      <span className="text-lg font-semibold text-foreground">142K</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Leads</span>
                      <span className="text-lg font-semibold text-foreground">18.2K</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Conversions</span>
                      <span className="text-lg font-semibold text-success">12.5K</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    User Acquisition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">New Users</span>
                      <span className="text-lg font-semibold text-foreground">12,450</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Avg. LTV</span>
                      <span className="text-lg font-semibold text-foreground">$847</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Retention (30d)</span>
                      <span className="text-lg font-semibold text-foreground">68%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">LTV/CAC Ratio</span>
                      <span className="text-lg font-semibold text-success">3.45x</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default NonOrganic;
