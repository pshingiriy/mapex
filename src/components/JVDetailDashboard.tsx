import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { jvCompanies, JVCompany } from "@/data/jvData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";

interface JVDetailDashboardProps {
  selectedJVId: string | null;
  onSelectJV: (jvId: string | null) => void;
}

export const JVDetailDashboard = ({ selectedJVId, onSelectJV }: JVDetailDashboardProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  
  const selectedJV = selectedJVId ? jvCompanies.find(jv => jv.id === selectedJVId) : jvCompanies[0];

  const filteredCompanies = useMemo(() => {
    if (!searchQuery) return jvCompanies;
    return jvCompanies.filter(jv => 
      jv.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const formatNumber = (num: number) => {
    return num.toLocaleString('ru-RU');
  };

  const getGrowthPercent = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? "100.00" : "0.00";
    return ((current - previous) / previous * 100).toFixed(2);
  };

  const handleSelectCompany = (jv: JVCompany) => {
    onSelectJV(jv.id);
    setSearchQuery(jv.name);
    setShowDropdown(false);
  };

  if (!selectedJV) {
    return (
      <div className="flex items-center justify-center h-64 bg-white">
        <p className="text-gray-500">Выберите СП для просмотра</p>
      </div>
    );
  }

  const chartData = [
    { name: '2024', Выручка: selectedJV.revenue2024, OIBDA: selectedJV.oibda2024 },
    { name: '2025', Выручка: selectedJV.revenue2025, OIBDA: selectedJV.oibda2025 },
  ];

  // Corporate events for the selected JV
  const corporateEvents = [
    { label: "Реализация Опциона\\реорганизация", value: "-" },
    { label: "Прекращение партнерства", value: "Не планируется" },
    { label: "Выплата дивидендов", value: "-" },
    { label: "Утвержденный бюджет", value: "-", highlight: true },
    { label: "Утвержденная стратегия", value: "-", highlight: true },
    { label: "Изменения по ТОП-менеджменту (смена\\пролонгация ГД, предложения по ЗГД)", value: "-" },
    { label: "Прочие важные корп.события СП", value: "-", highlight: true },
  ];

  // Upcoming events
  const upcomingEvents = selectedJV.events
    .filter(e => e.status === 'planned')
    .slice(0, 3)
    .map((e, i) => ({
      name: `Событие ${i + 1}`,
      date: new Date(e.date).toLocaleDateString('ru-RU'),
      daysLeft: Math.ceil((new Date(e.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    }));

  const currentMonth = new Date().toLocaleString('ru-RU', { month: 'long' });
  const capitalizedMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);

  return (
    <div className="bg-white min-h-screen p-6 space-y-4">
      {/* Top Row - Company Selector and Main Info */}
      <div className="grid grid-cols-12 gap-4">
        {/* Company Selector */}
        <div className="col-span-3">
          <div className="text-sm text-gray-600 mb-1">Введите название компании</div>
          <div className="relative">
            <Input
              value={searchQuery || selectedJV.name}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              className="bg-white border-gray-300 text-gray-800"
              placeholder="Поиск..."
            />
            {showDropdown && filteredCompanies.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                {filteredCompanies.map(jv => (
                  <div
                    key={jv.id}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                    onClick={() => handleSelectCompany(jv)}
                  >
                    {jv.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <Card className="mt-4 border border-gray-200">
            <CardContent className="p-4">
              <div className="font-bold text-lg text-gray-800">{selectedJV.name}</div>
            </CardContent>
          </Card>
          <Card className="mt-2 border border-gray-200">
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Кластер</span>
                <span className="text-gray-800">{selectedJV.cluster}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Куратор</span>
                <span className="text-gray-800">{selectedJV.curator}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Tag */}
        <div className="col-span-1 flex items-start pt-6">
          <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded text-sm">
            {selectedJV.name.split(' ')[0].toLowerCase()}
          </div>
        </div>

        {/* Effective Share */}
        <div className="col-span-2">
          <Card className="border border-gray-200 h-full">
            <CardContent className="p-4 flex flex-col justify-center h-full">
              <div className="text-xs text-gray-600 text-center">Эффективная доля Группы Ростелеком в УК (голосов)</div>
              <div className="text-3xl font-bold text-gray-800 text-center mt-2">{selectedJV.ownershipPercent.toFixed(2)}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Dividends Table */}
        <div className="col-span-3">
          <Card className="border border-gray-200">
            <CardContent className="p-4">
              <div className="font-bold text-gray-800 mb-2">Дивиденды</div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-1"></th>
                    <th className="text-center py-1 text-purple-600">2024</th>
                    <th className="text-center py-1 text-green-600">2025</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-1 text-gray-600">Сумма, тыс руб</td>
                    <td className="text-center text-gray-800">{selectedJV.dividends2024 > 0 ? formatNumber(selectedJV.dividends2024) : '-'}</td>
                    <td className="text-center text-gray-800">{selectedJV.dividends2025 > 0 ? formatNumber(selectedJV.dividends2025) : '-'}</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-gray-600">Статус</td>
                    <td className="text-center text-gray-800">-</td>
                    <td className="text-center text-gray-800">-</td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* Calendar */}
        <div className="col-span-3">
          <Card className="border border-gray-200">
            <CardContent className="p-4">
              <div className="font-bold text-gray-800 mb-2">Календарь событий</div>
              <div className="bg-purple-600 text-white text-center py-2 rounded-t font-medium">
                {capitalizedMonth}
              </div>
              <div className="border border-gray-200 border-t-0 p-2 min-h-[60px]">
                {/* Calendar grid placeholder */}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-12 gap-4">
        {/* JV Indicators */}
        <div className="col-span-2">
          <Card className="border border-gray-200">
            <CardContent className="p-4">
              <div className="font-bold text-gray-800 mb-3 text-center">Показатели СП</div>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-600">Выручка</td>
                    <td className="text-right font-semibold text-gray-800">{formatNumber(selectedJV.revenue2024)}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-600">OIBDA</td>
                    <td className="text-right font-semibold text-gray-800">{formatNumber(selectedJV.oibda2024)}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td colSpan={2} className="py-1 text-center text-gray-500 text-xs">2024</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-600">Выручка</td>
                    <td className="text-right">
                      <span className="font-semibold text-gray-800">{formatNumber(selectedJV.revenue2025)}</span>
                      <span className="ml-1 text-green-600 text-xs">
                        {Number(getGrowthPercent(selectedJV.revenue2025, selectedJV.revenue2024)) >= 0 ? '▲' : '▼'} 
                        {getGrowthPercent(selectedJV.revenue2025, selectedJV.revenue2024)}%
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-600">OIBDA</td>
                    <td className="text-right">
                      <span className="font-semibold text-gray-800">{formatNumber(selectedJV.oibda2025)}</span>
                      <span className="ml-1 text-green-600 text-xs">
                        {Number(getGrowthPercent(selectedJV.oibda2025, selectedJV.oibda2024)) >= 0 ? '▲' : '▼'} 
                        {getGrowthPercent(selectedJV.oibda2025, selectedJV.oibda2024)}%
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="py-1 text-center text-gray-500 text-xs">2025</td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* Competency */}
        <div className="col-span-2">
          <Card className="border border-gray-200 h-full">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-bold text-gray-800">Компетенция</span>
                <span className="text-gray-500">0</span>
              </div>
              <div className="border border-gray-200 rounded min-h-[100px]">
                {/* Empty competency chart placeholder */}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <div className="col-span-3">
          <Card className="border border-gray-200 h-full">
            <CardContent className="p-4">
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Выручка" fill="#6366f1" />
                  <Bar dataKey="OIBDA" fill="#f97316" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Perspective and Commentary */}
        <div className="col-span-2">
          <Card className="border border-gray-200 mb-2">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-800">Перспектива</span>
                <span className="text-gray-500">-</span>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-gray-200">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-800">Комментарий</span>
                <span className="text-gray-500">-</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events */}
        <div className="col-span-3">
          <Card className="border border-gray-200">
            <CardContent className="p-4">
              <div className="font-bold text-gray-800 mb-2">Ближайшие события</div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-1 text-gray-600"></th>
                    <th className="text-center py-1 text-gray-600">Дата</th>
                    <th className="text-right py-1 text-gray-600"></th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingEvents.length > 0 ? upcomingEvents.map((event, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="py-2 text-gray-800">{event.name}</td>
                      <td className="text-center text-gray-600">{event.date}</td>
                      <td className="text-right">
                        {event.daysLeft > 0 && event.daysLeft <= 7 && (
                          <span className="text-green-600 text-xs">Осталось {event.daysLeft} дня</span>
                        )}
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={3} className="py-2 text-center text-gray-500">Нет запланированных событий</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Row - Corporate Events */}
      <div className="grid grid-cols-1">
        <Card className="border border-gray-200">
          <CardContent className="p-4">
            <table className="w-full text-sm">
              <tbody>
                {corporateEvents.map((event, i) => (
                  <tr key={i} className={event.highlight ? "bg-yellow-50" : ""}>
                    <td className="py-2 px-3 text-gray-700 border-b border-gray-100 font-medium">
                      {event.label}
                    </td>
                    <td className="py-2 px-3 text-gray-600 border-b border-gray-100 text-right">
                      {event.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};