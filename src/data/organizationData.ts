import { Building2, Smartphone, Server, Shield, Building, Briefcase, MapPin, Wrench, TrendingUp, Cpu, Heart, Landmark, GraduationCap, MoreHorizontal, LucideIcon } from "lucide-react";

export interface CompanyData {
  id: number;
  name: string;
  parentName1: string | null;
  ownership1: string | null;
  parentName2: string | null;
  ownership2: string | null;
  cluster: string | null;
  supervisor: string;
}

export interface ClusterInfo {
  name: string;
  icon: LucideIcon;
  color: string;
}

export interface SupervisorInfo {
  name: string;
  clusters: string[];
}

export const companies: CompanyData[] = [
  { id: 1, name: "Parent holding company", parentName1: null, ownership1: null, parentName2: null, ownership2: null, cluster: null, supervisor: "CEO" },
  { id: 2, name: "Holding company-1", parentName1: "Parent holding company", ownership1: "100%", parentName2: null, ownership2: null, cluster: null, supervisor: "CEO" },
  { id: 3, name: "Broadband provider (b2c)", parentName1: "Parent holding company", ownership1: "100%", parentName2: null, ownership2: null, cluster: "Телеком-операторы/B2O", supervisor: "А.Платонов" },
  { id: 4, name: "Broadband provider (b2b)", parentName1: "Parent holding company", ownership1: "100%", parentName2: null, ownership2: null, cluster: "Телеком-операторы/B2O", supervisor: "А.Платонов" },
  { id: 5, name: "DCenter parent comp-1", parentName1: "Parent holding company", ownership1: "51%", parentName2: "Holding company-1", ownership2: "49%", cluster: "ЦОД и облачные сервисы", supervisor: "И.Ильф" },
  { id: 6, name: "HDC", parentName1: "DCenter parent comp-1", ownership1: "100%", parentName2: null, ownership2: null, cluster: "ЦОД и облачные сервисы", supervisor: "И.Ильф" },
  { id: 7, name: "NNTS-10", parentName1: "DCenter parent comp-1", ownership1: "99%", parentName2: "HDC", ownership2: "1%", cluster: "ЦОД и облачные сервисы", supervisor: "И.Ильф" },
  { id: 8, name: "DC-Krevetkogo", parentName1: "DCenter parent comp-1", ownership1: "100%", parentName2: null, ownership2: null, cluster: "ЦОД и облачные сервисы", supervisor: "И.Ильф" },
  { id: 9, name: "K3 Mobile", parentName1: "Parent holding company", ownership1: "90%", parentName2: "Holding company-1", ownership2: "10%", cluster: "Мобильный бизнес", supervisor: "Г.Антонов" },
  { id: 10, name: "Tower company", parentName1: "K3 Mobile", ownership1: "100%", parentName2: null, ownership2: null, cluster: "Мобильный бизнес", supervisor: "В.Катаев" },
  { id: 11, name: "NewtechCo", parentName1: "K3 Mobile", ownership1: "100%", parentName2: null, ownership2: null, cluster: "Мобильный бизнес", supervisor: "В.Катаев" },
  { id: 12, name: "TechTDM", parentName1: "NewtechCo", ownership1: "51%", parentName2: "K3 Mobile", ownership2: "49%", cluster: "Мобильный бизнес", supervisor: "В.Катаев" },
  { id: 13, name: "SunSecurity", parentName1: "Parent holding company", ownership1: "100%", parentName2: null, ownership2: null, cluster: "Информационная безопасность", supervisor: "М.Волошин" },
  { id: 14, name: "Anticrime", parentName1: "SunSecurity", ownership1: "100%", parentName2: null, ownership2: null, cluster: "Информационная безопасность", supervisor: "М.Волошин" },
  { id: 15, name: "ForensicSec", parentName1: "SunSecurity", ownership1: "100%", parentName2: null, ownership2: null, cluster: "Информационная безопасность", supervisor: "М.Волошин" },
  { id: 16, name: "GOS Service", parentName1: "Holding company-1", ownership1: "100%", parentName2: null, ownership2: null, cluster: "Государственные цифровые услуги и сервисы", supervisor: "И.Ким" },
  { id: 17, name: "MFC Service", parentName1: "Holding company-1", ownership1: "90%", parentName2: "GOS Service", ownership2: "10%", cluster: "Государственные цифровые услуги и сервисы", supervisor: "И.Ким" },
  { id: 18, name: "Corp IT Cluster Inc.", parentName1: "Holding company-1", ownership1: "100%", parentName2: null, ownership2: null, cluster: "Коммерческий ИТ-кластер", supervisor: "С.Довлатов" },
  { id: 19, name: "Sapsan billing", parentName1: "Corp IT Cluster Inc.", ownership1: "100%", parentName2: null, ownership2: null, cluster: "Коммерческий ИТ-кластер", supervisor: "С.Довлатов" },
  { id: 20, name: "SoftComp", parentName1: "Sapsan billing", ownership1: "80%", parentName2: "Corp IT Cluster Inc.", ownership2: "20%", cluster: "Коммерческий ИТ-кластер", supervisor: "С.Довлатов" },
  { id: 21, name: "CifroRegion Cluster Inc.", parentName1: "Parent holding company", ownership1: "100%", parentName2: null, ownership2: null, cluster: "Цифровые регионы", supervisor: "Г.Попов" },
  { id: 22, name: "Bubat", parentName1: "CifroRegion Cluster Inc.", ownership1: "100%", parentName2: null, ownership2: null, cluster: "Цифровые регионы", supervisor: "Г.Попов" },
  { id: 23, name: "TPP Innovation", parentName1: "CifroRegion Cluster Inc.", ownership1: "100%", parentName2: null, ownership2: null, cluster: "Цифровые регионы", supervisor: "Г.Попов" },
  { id: 24, name: "BTI Holding Co.", parentName1: "Holding company-1", ownership1: "100%", parentName2: null, ownership2: null, cluster: "БТИ (Блок технической инфраструктуры)", supervisor: "Л.Гумилев" },
  { id: 25, name: "Tetris Co.", parentName1: "BTI Holding Co.", ownership1: "100%", parentName2: null, ownership2: null, cluster: "БТИ (Блок технической инфраструктуры)", supervisor: "Л.Гумилев" },
  { id: 26, name: "LinkVoice", parentName1: "BTI Holding Co.", ownership1: "100%", parentName2: null, ownership2: null, cluster: "БТИ (Блок технической инфраструктуры)", supervisor: "Л.Гумилев" },
  { id: 27, name: "Xtech VC", parentName1: "Holding company-1", ownership1: "99%", parentName2: "Parent holding company", ownership2: "1%", cluster: "Х.Tech (корпоративный венчурный фонд)", supervisor: "И.Бунин" },
  { id: 28, name: "BlackHole Travel", parentName1: "Xtech VC", ownership1: "80%", parentName2: "Private investor-1", ownership2: "20%", cluster: "Х.Tech (корпоративный венчурный фонд)", supervisor: "И.Бунин" },
  { id: 29, name: "Palmbook social", parentName1: "Xtech VC", ownership1: "70%", parentName2: "Private investor-2", ownership2: "30%", cluster: "Х.Tech (корпоративный венчурный фонд)", supervisor: "И.Бунин" },
  { id: 30, name: "StormCrew", parentName1: "Xtech VC", ownership1: "60%", parentName2: "Private investor-3", ownership2: "40%", cluster: "Х.Tech (корпоративный венчурный фонд)", supervisor: "И.Бунин" },
  { id: 31, name: "CifroTech Holding Co.", parentName1: "Parent holding company", ownership1: "100%", parentName2: null, ownership2: null, cluster: "Цифротех", supervisor: "М.Зощенко" },
  { id: 32, name: "Documento", parentName1: "CifroTech Holding Co.", ownership1: "100%", parentName2: null, ownership2: null, cluster: "Цифротех", supervisor: "М.Зощенко" },
  { id: 33, name: "Healh Holding Co.", parentName1: "Parent holding company", ownership1: "99%", parentName2: "Holding company-1", ownership2: "1%", cluster: "Здоровье", supervisor: "Е.Замятин" },
  { id: 34, name: "Lab test", parentName1: "Healh Holding Co.", ownership1: "100%", parentName2: null, ownership2: null, cluster: "Здоровье", supervisor: "Е.Замятин" },
  { id: 35, name: "MedSoft", parentName1: "Healh Holding Co.", ownership1: "100%", parentName2: null, ownership2: null, cluster: "Здоровье", supervisor: "Е.Замятин" },
  { id: 36, name: "GosService holding Co.", parentName1: "Parent holding company", ownership1: "100%", parentName2: null, ownership2: null, cluster: "Госсервисы", supervisor: "Д.Бурлюк" },
  { id: 37, name: "TFT-development", parentName1: "GosService holding Co.", ownership1: "100%", parentName2: null, ownership2: null, cluster: "Госсервисы", supervisor: "Д.Бурлюк" },
  { id: 38, name: "TFT-innovation", parentName1: "GosService holding Co.", ownership1: "100%", parentName2: null, ownership2: null, cluster: "Госсервисы", supervisor: "Д.Бурлюк" },
  { id: 39, name: "TFT-Bubna", parentName1: "GosService holding Co.", ownership1: "100%", parentName2: null, ownership2: null, cluster: "Госсервисы", supervisor: "Д.Бурлюк" },
  { id: 40, name: "Education holding Co.", parentName1: "Parent holding company", ownership1: "100%", parentName2: null, ownership2: null, cluster: "Образование", supervisor: "В.Набоков" },
  { id: 41, name: "1Class Co.", parentName1: "Education holding Co.", ownership1: "100%", parentName2: null, ownership2: null, cluster: "Образование", supervisor: "В.Набоков" },
  { id: 42, name: "2Class Co.", parentName1: "Education holding Co.", ownership1: "100%", parentName2: null, ownership2: null, cluster: "Образование", supervisor: "В.Набоков" },
  { id: 43, name: "E-Campus", parentName1: "Education holding Co.", ownership1: "100%", parentName2: null, ownership2: null, cluster: "Образование", supervisor: "В.Набоков" },
  { id: 44, name: "Other-1", parentName1: "Parent holding company", ownership1: "95%", parentName2: "Private investor-4", ownership2: "5%", cluster: "Прочие", supervisor: "CEO" },
  { id: 45, name: "Other-2", parentName1: "Parent holding company", ownership1: "100%", parentName2: null, ownership2: null, cluster: "Прочие", supervisor: "CEO" },
  { id: 46, name: "Other-3", parentName1: "Parent holding company", ownership1: "100%", parentName2: null, ownership2: null, cluster: "Прочие", supervisor: "CEO" },
];

export const clusterInfo: Record<string, ClusterInfo> = {
  "Телеком-операторы/B2O": { name: "Телеком-операторы/B2O", icon: Building2, color: "from-blue-500 to-blue-600" },
  "Мобильный бизнес": { name: "Мобильный бизнес", icon: Smartphone, color: "from-purple-500 to-purple-600" },
  "ЦОД и облачные сервисы": { name: "ЦОД и облачные сервисы", icon: Server, color: "from-indigo-500 to-indigo-600" },
  "Информационная безопасность": { name: "Информационная безопасность", icon: Shield, color: "from-green-500 to-green-600" },
  "Государственные цифровые услуги и сервисы": { name: "Государственные цифровые услуги и сервисы", icon: Building, color: "from-cyan-500 to-cyan-600" },
  "Коммерческий ИТ-кластер": { name: "Коммерческий ИТ-кластер", icon: Briefcase, color: "from-orange-500 to-orange-600" },
  "Цифровые регионы": { name: "Цифровые регионы", icon: MapPin, color: "from-pink-500 to-pink-600" },
  "БТИ (Блок технической инфраструктуры)": { name: "БТИ (Блок технической инфраструктуры)", icon: Wrench, color: "from-yellow-500 to-yellow-600" },
  "Х.Tech (корпоративный венчурный фонд)": { name: "Х.Tech (корпоративный венчурный фонд)", icon: TrendingUp, color: "from-emerald-500 to-emerald-600" },
  "Цифротех": { name: "Цифротех", icon: Cpu, color: "from-teal-500 to-teal-600" },
  "Здоровье": { name: "Здоровье", icon: Heart, color: "from-red-500 to-red-600" },
  "Госсервисы": { name: "Госсервисы", icon: Landmark, color: "from-violet-500 to-violet-600" },
  "Образование": { name: "Образование", icon: GraduationCap, color: "from-blue-500 to-cyan-600" },
  "Прочие": { name: "Прочие", icon: MoreHorizontal, color: "from-gray-500 to-gray-600" },
};

export const getCompanyClusterIcon = (companyName: string) => {
  const company = companies.find(c => c.name === companyName);
  if (company?.cluster && clusterInfo[company.cluster]) {
    return clusterInfo[company.cluster];
  }
  return null;
};

export const getCompaniesByCluster = (clusterName: string) => {
  return companies.filter(c => c.cluster === clusterName);
};

export const getCompaniesBySupervisor = (supervisorName: string) => {
  return companies.filter(c => c.supervisor === supervisorName);
};

export const getSupervisors = (): SupervisorInfo[] => {
  const supervisorMap = new Map<string, Set<string>>();
  
  companies.forEach(company => {
    if (company.supervisor && company.supervisor !== "CEO") {
      if (!supervisorMap.has(company.supervisor)) {
        supervisorMap.set(company.supervisor, new Set());
      }
      if (company.cluster) {
        supervisorMap.get(company.supervisor)!.add(company.cluster);
      }
    }
  });
  
  return Array.from(supervisorMap.entries()).map(([name, clusters]) => ({
    name,
    clusters: Array.from(clusters),
  }));
};

export const isPrivateInvestor = (name: string | null): boolean => {
  return name?.toLowerCase().includes('private investor') || false;
};
