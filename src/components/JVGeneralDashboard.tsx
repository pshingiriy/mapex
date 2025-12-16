import { Card, CardContent } from "@/components/ui/card";
import { jvCompanies, getJVTotals, getJVStats } from "@/data/jvData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";

interface JVGeneralDashboardProps {
  onSelectJV: (jvId: string) => void;
}

export const JVGeneralDashboard = ({ onSelectJV }: JVGeneralDashboardProps) => {
  const totals = getJVTotals();
  const stats = getJVStats();

  const formatNumber = (num: number) => {
    return num.toLocaleString('ru-RU');
  };

  const getGrowthPercent = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous * 100).toFixed(2);
  };

  // Data by clusters for main chart
  const clusterData = jvCompanies.reduce((acc, jv) => {
    const existing = acc.find(c => c.cluster === jv.cluster);
    if (existing) {
      existing.revenue2024 += jv.revenue2024;
      existing.revenue2025 += jv.revenue2025;
      existing.oibda2024 += jv.oibda2024;
      existing.oibda2025 += jv.oibda2025;
    } else {
      acc.push({
        cluster: jv.cluster,
        shortName: jv.cluster.split(' ')[0],
        revenue2024: jv.revenue2024,
        revenue2025: jv.revenue2025,
        oibda2024: jv.oibda2024,
        oibda2025: jv.oibda2025,
      });
    }
    return acc;
  }, [] as { cluster: string; shortName: string; revenue2024: number; revenue2025: number; oibda2024: number; oibda2025: number }[]);

  const yearComparisonData = [
    { name: '2024', Выручка: totals.revenue2024, OIBDA: totals.oibda2024 },
    { name: '2025', Выручка: totals.revenue2025, OIBDA: totals.oibda2025 },
  ];

  // Dividend status data (mock)
  const dividendStatus2024 = [
    { name: 'Выплачено', value: 66, color: '#6366f1' },
    { name: 'Определена сумма', value: 8, color: '#f59e0b' },
    { name: 'Не выплачено', value: 5, color: '#94a3b8' },
  ];

  const dividendStatus2025 = [
    { name: 'Выплачено', value: 71, color: '#6366f1' },
    { name: 'Определена сумма', value: 3, color: '#f59e0b' },
    { name: 'Частично выплачено', value: 2, color: '#22c55e' },
    { name: 'Не выплачено', value: 3, color: '#94a3b8' },
  ];

  return (
    <div className="space-y-6 bg-white min-h-screen p-6">
      {/* Top Stats Row */}
      <div className="grid grid-cols-3 gap-8">
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold text-purple-600 uppercase tracking-wide">ВСЕГО СП</span>
          <div className="bg-gray-100 px-6 py-2 rounded">
            <span className="text-3xl font-bold text-gray-800">{stats.total}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold text-green-600 uppercase tracking-wide">ДЕЙСТВУЮЩИЕ СП</span>
          <div className="bg-gray-100 px-6 py-2 rounded">
            <span className="text-3xl font-bold text-gray-800">{stats.active}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold text-gray-700 uppercase tracking-wide">СП ПОД ПРЕКРАЩЕНИЕ ПАРТНЕРСТВА</span>
          <div className="bg-gray-100 px-6 py-2 rounded">
            <span className="text-3xl font-bold text-gray-800">{stats.closing + stats.paused}</span>
          </div>
        </div>
      </div>

      {/* Main Bar Chart - By Cluster */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="pt-6">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={clusterData} margin={{ bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="shortName" 
                stroke="#6b7280" 
                angle={-45} 
                textAnchor="end" 
                height={80}
                tick={{ fontSize: 11 }}
              />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend verticalAlign="top" align="right" />
              <Bar dataKey="revenue2025" name="Выручка 2025П" fill="#6366f1" />
              <Bar dataKey="revenue2024" name="Выручка 2024П" fill="#f97316" />
              <Bar dataKey="oibda2025" name="OIBDA 2025П" fill="#22c55e" />
              <Bar dataKey="oibda2024" name="OIBDA 2024П" fill="#eab308" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bottom Row - 4 sections */}
      <div className="grid grid-cols-4 gap-4">
        {/* Year Comparison Chart */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={yearComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" hide />
                <Tooltip />
                <Legend />
                <Bar dataKey="Выручка" fill="#6366f1" />
                <Bar dataKey="OIBDA" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-indigo-500 rounded" />
                <span className="text-gray-600">Выручка</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-orange-500 rounded" />
                <span className="text-gray-600">OIBDA</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Table */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="pt-4">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 text-gray-600">Выручка</td>
                  <td className="py-2 text-right font-semibold text-gray-800">{formatNumber(totals.revenue2024)}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 text-gray-600">OIBDA</td>
                  <td className="py-2 text-right font-semibold text-gray-800">{formatNumber(totals.oibda2024)}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 text-gray-500 text-xs" colSpan={2}>2024</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 text-gray-600">Выручка</td>
                  <td className="py-2 text-right">
                    <span className="font-semibold text-gray-800">{formatNumber(totals.revenue2025)}</span>
                    <span className="ml-2 text-green-600 text-xs">▲ {getGrowthPercent(totals.revenue2025, totals.revenue2024)}%</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 text-gray-600">OIBDA</td>
                  <td className="py-2 text-right">
                    <span className="font-semibold text-gray-800">{formatNumber(totals.oibda2025)}</span>
                    <span className="ml-2 text-green-600 text-xs">▲ {getGrowthPercent(totals.oibda2025, totals.oibda2024)}%</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-500 text-xs" colSpan={2}>2025</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Dividends Summary */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="pt-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Дивиденды</h3>
            <div className="space-y-3">
              <div>
                <div className="text-purple-600 font-semibold">2024</div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Всего выплачено, тыс руб</span>
                  <span className="font-bold text-gray-800">{formatNumber(totals.dividends2024 * 1000)}</span>
                </div>
              </div>
              <div>
                <div className="text-green-600 font-semibold">2025</div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Всего выплачено, тыс руб</span>
                  <span className="font-bold text-gray-800">{formatNumber(totals.dividends2025 * 1000)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dividend Status Pie Charts */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="pt-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="text-center text-sm font-semibold text-gray-800 mb-2">2024</div>
                <ResponsiveContainer width="100%" height={100}>
                  <PieChart>
                    <Pie
                      data={dividendStatus2024}
                      cx="50%"
                      cy="50%"
                      innerRadius={25}
                      outerRadius={40}
                      dataKey="value"
                    >
                      {dividendStatus2024.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1">
                <div className="text-center text-sm font-semibold text-gray-800 mb-2">2025</div>
                <ResponsiveContainer width="100%" height={100}>
                  <PieChart>
                    <Pie
                      data={dividendStatus2025}
                      cx="50%"
                      cy="50%"
                      innerRadius={25}
                      outerRadius={40}
                      dataKey="value"
                    >
                      {dividendStatus2025.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                <span className="text-gray-600">Выплачено</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-amber-500 rounded-full" />
                <span className="text-gray-600">Определена сумма</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-gray-600">Частично</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full" />
                <span className="text-gray-600">Не выплачено</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};