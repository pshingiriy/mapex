import { Building2, Smartphone, Server, Shield, Building, Briefcase, MapPin, Wrench, TrendingUp, Cpu, Heart, Landmark, GraduationCap, MoreHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";

const clusters = [
  { name: "Телеком-операторы/B2O", icon: Building2, color: "from-blue-500 to-blue-600" },
  { name: "Мобильный бизнес", icon: Smartphone, color: "from-purple-500 to-purple-600" },
  { name: "ЦОД и облачные сервисы", icon: Server, color: "from-indigo-500 to-indigo-600" },
  { name: "Информационная безопасность", icon: Shield, color: "from-green-500 to-green-600" },
  { name: "Государственные цифровые услуги и сервисы", icon: Building, color: "from-cyan-500 to-cyan-600" },
  { name: "Коммерческий ИТ-кластер", icon: Briefcase, color: "from-orange-500 to-orange-600" },
  { name: "Цифровые регионы", icon: MapPin, color: "from-pink-500 to-pink-600" },
  { name: "БТИ (Блок технической инфраструктуры)", icon: Wrench, color: "from-yellow-500 to-yellow-600" },
  { name: "X.Tech (корпоративный венчурный фонд)", icon: TrendingUp, color: "from-emerald-500 to-emerald-600" },
  { name: "Цифротех", icon: Cpu, color: "from-teal-500 to-teal-600" },
  { name: "Здоровье", icon: Heart, color: "from-red-500 to-red-600" },
  { name: "Госсервисы", icon: Landmark, color: "from-violet-500 to-violet-600" },
  { name: "Образование", icon: GraduationCap, color: "from-blue-500 to-cyan-600" },
  { name: "Прочие", icon: MoreHorizontal, color: "from-gray-500 to-gray-600" },
];

export const Clusters = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {clusters.map((cluster) => {
        const Icon = cluster.icon;
        return (
          <Card
            key={cluster.name}
            className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border group"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${cluster.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-sm font-medium text-foreground leading-tight">
                {cluster.name}
              </h3>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
