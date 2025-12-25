import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  PieChart, 
  BarChart3, 
  Activity, 
  Target, 
  Wallet, 
  Building2, 
  Server, 
  Shield, 
  Smartphone,
  Percent,
  Clock,
  Database,
  Cpu,
  Zap,
  Award,
  FileText,
  MapPin,
  LineChart,
  Box,
  LucideIcon
} from "lucide-react";

export interface KpiMetric {
  id: string;
  name: string;
  icon: LucideIcon;
  value: string | number;
  change?: number;
  changeLabel?: string;
  unit?: string;
  type: 'financial' | 'operational' | 'quantitative';
  hasSelector?: boolean;
  selectorOptions?: string[];
  chartType?: 'bar' | 'pie' | 'line' | 'area';
}

export interface ClusterKpiData {
  clusterName: string;
  metrics: KpiMetric[];
  financialMetrics: KpiMetric[];
  operationalMetrics: KpiMetric[];
  chartData?: {
    revenueStructure: { name: string; value: number }[];
    opexStructure: { name: string; value: number }[];
    capexStructure: { name: string; value: number }[];
  };
}

// Sample data for demonstration - to be replaced with real data
const generateRandomChange = () => Math.round((Math.random() - 0.5) * 30);

export const clusterKpiDataMap: Record<string, ClusterKpiData> = {
  "Телеком-операторы/B2O": {
    clusterName: "Телеком-операторы/B2O",
    metrics: [
      { id: "pl", name: "P&L кластера", icon: DollarSign, value: "12.5B", change: 8.5, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["РСБУ", "МСФО"], chartType: "bar" },
      { id: "cf", name: "Cash Flow", icon: Wallet, value: "3.2B", change: 5.2, unit: "₽", type: "financial", chartType: "line" },
      { id: "revenue", name: "Структура выручки", icon: PieChart, value: "15.8B", change: 12.3, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["По услугам", "По ДЗО"], chartType: "pie" },
      { id: "opex", name: "Структура OPEX", icon: BarChart3, value: "8.4B", change: -3.1, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["По расходам", "По ДЗО"], chartType: "pie" },
      { id: "capex", name: "CAPEX", icon: TrendingUp, value: "2.1B", change: 15.7, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["Структура", "По ДЗО"], chartType: "bar" },
    ],
    financialMetrics: [
      { id: "ssch", name: "ССЧ", icon: Users, value: 2450, change: 3.2, unit: "чел.", type: "operational" },
      { id: "fot", name: "ФОТ", icon: Wallet, value: "890M", change: 5.1, unit: "₽", type: "operational" },
    ],
    operationalMetrics: [
      { id: "arpu", name: "ARPU", icon: Activity, value: 485, change: 7.8, unit: "₽", type: "operational", hasSelector: true, selectorOptions: ["По услугам"] },
      { id: "churn", name: "Churn Rate", icon: Percent, value: "2.3%", change: -0.5, type: "operational" },
      { id: "mou", name: "MoU, MboU (ШПД)", icon: Clock, value: 320, unit: "мин", change: -2.1, type: "operational" },
      { id: "penetration", name: "Проникновение в ДХ", icon: Target, value: "68%", change: 4.2, type: "quantitative", hasSelector: true, selectorOptions: ["Телефония", "ШПД", "IPTV"] },
      { id: "subscribers", name: "Количество абонентов", icon: Users, value: "3.2M", change: 5.5, type: "quantitative", hasSelector: true, selectorOptions: ["B2C", "B2B", "MVNO"] },
      { id: "market_share", name: "Доля рынка", icon: PieChart, value: "18.5%", change: 1.2, type: "quantitative", chartType: "pie" },
    ],
    chartData: {
      revenueStructure: [
        { name: "Интернет", value: 45 },
        { name: "Телефония", value: 25 },
        { name: "ТВ", value: 20 },
        { name: "Прочее", value: 10 },
      ],
      opexStructure: [
        { name: "ФОТ", value: 35 },
        { name: "Амортизация", value: 25 },
        { name: "Контент", value: 20 },
        { name: "Прочее", value: 20 },
      ],
      capexStructure: [
        { name: "Сеть", value: 50 },
        { name: "ИТ", value: 30 },
        { name: "Оборудование", value: 20 },
      ],
    },
  },
  "Мобильный бизнес": {
    clusterName: "Мобильный бизнес",
    metrics: [
      { id: "pl", name: "P&L кластера", icon: DollarSign, value: "28.3B", change: 11.2, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["РСБУ", "МСФО"], chartType: "bar" },
      { id: "cf", name: "Cash Flow", icon: Wallet, value: "8.1B", change: 9.4, unit: "₽", type: "financial", chartType: "line" },
      { id: "revenue", name: "Структура выручки", icon: PieChart, value: "35.2B", change: 14.1, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["По услугам", "По ДЗО"], chartType: "pie" },
      { id: "opex", name: "Структура OPEX", icon: BarChart3, value: "18.9B", change: -2.3, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["По расходам", "По ДЗО"], chartType: "pie" },
      { id: "capex", name: "CAPEX (структура)", icon: TrendingUp, value: "5.8B", change: 22.1, unit: "₽", type: "financial", chartType: "bar" },
    ],
    financialMetrics: [
      { id: "ssch", name: "ССЧ", icon: Users, value: 5840, change: 4.8, unit: "чел.", type: "operational" },
      { id: "fot", name: "ФОТ", icon: Wallet, value: "2.1B", change: 6.3, unit: "₽", type: "operational" },
    ],
    operationalMetrics: [
      { id: "arpu", name: "ARPU", icon: Activity, value: 385, change: 5.2, unit: "₽", type: "operational" },
      { id: "churn", name: "Churn Rate", icon: Percent, value: "1.8%", change: -0.3, type: "operational" },
      { id: "mou", name: "MoU, MboU", icon: Clock, value: 280, unit: "мин", change: -4.2, type: "operational" },
      { id: "subscribers", name: "Количество абонентов", icon: Users, value: "12.5M", change: 8.3, type: "quantitative", hasSelector: true, selectorOptions: ["B2C", "B2B", "MVNO", "IoT", "Голос", "Данные"] },
      { id: "market_share", name: "Доля рынка (тепловая карта)", icon: MapPin, value: "24.2%", change: 2.1, type: "quantitative", chartType: "pie" },
      { id: "advtech", name: "Метрики AdvTech", icon: Cpu, value: "Active", type: "quantitative" },
    ],
    chartData: {
      revenueStructure: [
        { name: "Голос", value: 30 },
        { name: "Данные", value: 45 },
        { name: "VAS", value: 15 },
        { name: "Роуминг", value: 10 },
      ],
      opexStructure: [
        { name: "ФОТ", value: 30 },
        { name: "Интерконнект", value: 25 },
        { name: "Инфраструктура", value: 25 },
        { name: "Прочее", value: 20 },
      ],
      capexStructure: [
        { name: "RAN", value: 45 },
        { name: "Core", value: 25 },
        { name: "ИТ", value: 20 },
        { name: "Прочее", value: 10 },
      ],
    },
  },
  "ЦОД и облачные сервисы": {
    clusterName: "ЦОД и облачные сервисы",
    metrics: [
      { id: "pl", name: "P&L кластера", icon: DollarSign, value: "8.7B", change: 18.5, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["РСБУ", "МСФО"], chartType: "bar" },
      { id: "cf", name: "Cash Flow", icon: Wallet, value: "2.4B", change: 15.2, unit: "₽", type: "financial", chartType: "line" },
      { id: "revenue", name: "Структура выручки", icon: PieChart, value: "10.2B", change: 22.1, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["IaaS", "PaaS", "SaaS", "CDN", "По ДЗО"], chartType: "pie" },
      { id: "opex", name: "Структура OPEX", icon: BarChart3, value: "5.8B", change: -1.8, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["По расходам", "По ДЗО"], chartType: "pie" },
      { id: "capex", name: "CAPEX (структура)", icon: TrendingUp, value: "3.2B", change: 28.4, unit: "₽", type: "financial", chartType: "bar" },
    ],
    financialMetrics: [
      { id: "ssch", name: "ССЧ", icon: Users, value: 1250, change: 12.5, unit: "чел.", type: "operational" },
      { id: "fot", name: "ФОТ", icon: Wallet, value: "680M", change: 8.2, unit: "₽", type: "operational" },
    ],
    operationalMetrics: [
      { id: "area", name: "Площадь машинных залов", icon: Box, value: 45000, unit: "кв.м", change: 15.3, type: "operational" },
      { id: "fill_rate", name: "Заполненность ЦОД", icon: Percent, value: "78%", change: 8.2, type: "operational" },
      { id: "racks", name: "Количество стоек/ВМ/контейнеров", icon: Server, value: 8500, change: 22.1, type: "quantitative" },
      { id: "rack_revenue", name: "Выручка на стойко-место", icon: DollarSign, value: "85K", unit: "₽", change: 12.4, type: "quantitative" },
      { id: "power", name: "Общая мощность", icon: Zap, value: 120, unit: "МВт", change: 18.5, type: "operational" },
      { id: "pue", name: "PUE", icon: Activity, value: "1.45", change: -3.2, type: "operational" },
      { id: "bandwidth", name: "Пропускная способность", icon: LineChart, value: 12.5, unit: "Тбит/с", change: 35.2, type: "operational" },
      { id: "certification", name: "Уровень сертификации", icon: Award, value: "Tier III", type: "quantitative" },
      { id: "market_share", name: "Доля рынка", icon: PieChart, value: "15.8%", change: 3.5, type: "quantitative", chartType: "pie" },
    ],
    chartData: {
      revenueStructure: [
        { name: "IaaS", value: 40 },
        { name: "PaaS", value: 25 },
        { name: "SaaS", value: 20 },
        { name: "CDN", value: 10 },
        { name: "Прочее", value: 5 },
      ],
      opexStructure: [
        { name: "Электроэнергия", value: 35 },
        { name: "ФОТ", value: 25 },
        { name: "Обслуживание", value: 25 },
        { name: "Прочее", value: 15 },
      ],
      capexStructure: [
        { name: "Оборудование", value: 45 },
        { name: "Инфраструктура", value: 35 },
        { name: "ПО", value: 20 },
      ],
    },
  },
  "Информационная безопасность": {
    clusterName: "Информационная безопасность",
    metrics: [
      { id: "pl", name: "P&L кластера", icon: DollarSign, value: "4.2B", change: 25.3, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["РСБУ", "МСФО"], chartType: "bar" },
      { id: "cf", name: "Cash Flow", icon: Wallet, value: "1.1B", change: 18.7, unit: "₽", type: "financial", chartType: "line" },
      { id: "revenue", name: "Структура выручки", icon: PieChart, value: "5.1B", change: 28.4, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["По услугам", "По ДЗО"], chartType: "pie" },
      { id: "opex", name: "Структура OPEX", icon: BarChart3, value: "2.8B", change: 5.2, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["По расходам", "По ДЗО"], chartType: "pie" },
      { id: "capex", name: "CAPEX (структура)", icon: TrendingUp, value: "820M", change: 32.1, unit: "₽", type: "financial", chartType: "bar" },
    ],
    financialMetrics: [
      { id: "ssch", name: "ССЧ", icon: Users, value: 890, change: 18.2, unit: "чел.", type: "operational" },
      { id: "fot", name: "ФОТ", icon: Wallet, value: "520M", change: 12.5, unit: "₽", type: "operational" },
    ],
    operationalMetrics: [
      { id: "endpoints", name: "Защищаемые endpoints/компании", icon: Shield, value: 125000, change: 35.2, type: "quantitative" },
      { id: "ltv_cac", name: "LTV/CAC", icon: Target, value: "4.2x", change: 8.5, type: "operational" },
      { id: "market_share", name: "Доля рынка", icon: PieChart, value: "12.3%", change: 4.8, type: "quantitative", chartType: "pie" },
    ],
    chartData: {
      revenueStructure: [
        { name: "SOC", value: 35 },
        { name: "Консалтинг", value: 25 },
        { name: "Продукты", value: 30 },
        { name: "Прочее", value: 10 },
      ],
      opexStructure: [
        { name: "ФОТ", value: 55 },
        { name: "Лицензии", value: 20 },
        { name: "Инфраструктура", value: 15 },
        { name: "Прочее", value: 10 },
      ],
      capexStructure: [
        { name: "R&D", value: 50 },
        { name: "Инфраструктура", value: 30 },
        { name: "Прочее", value: 20 },
      ],
    },
  },
  "Государственные цифровые услуги и сервисы": {
    clusterName: "Государственные цифровые услуги и сервисы",
    metrics: [
      { id: "pl", name: "P&L кластера", icon: DollarSign, value: "6.8B", change: 14.2, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["РСБУ", "МСФО"], chartType: "bar" },
      { id: "cf", name: "Cash Flow", icon: Wallet, value: "1.8B", change: 11.5, unit: "₽", type: "financial", chartType: "line" },
      { id: "revenue", name: "Структура выручки", icon: PieChart, value: "8.2B", change: 16.8, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["По ключевым проектам", "По ДЗО"], chartType: "pie" },
      { id: "opex", name: "Структура OPEX", icon: BarChart3, value: "4.5B", change: 3.1, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["По расходам", "По ДЗО"], chartType: "pie" },
      { id: "capex", name: "CAPEX (структура)", icon: TrendingUp, value: "1.2B", change: 18.5, unit: "₽", type: "financial", chartType: "bar" },
    ],
    financialMetrics: [
      { id: "ssch", name: "ССЧ", icon: Users, value: 1580, change: 8.5, unit: "чел.", type: "operational" },
      { id: "fot", name: "ФОТ", icon: Wallet, value: "780M", change: 9.2, unit: "₽", type: "operational" },
    ],
    operationalMetrics: [
      { id: "gov_orgs", name: "Подключенные госорганы", icon: Building2, value: 245, change: 18.5, type: "quantitative", hasSelector: true, selectorOptions: ["ФОИВ", "РОИВ"] },
      { id: "project_completion", name: "Выполняемость проектов", icon: Target, value: "92%", change: 5.2, type: "operational" },
    ],
    chartData: {
      revenueStructure: [
        { name: "Госуслуги", value: 40 },
        { name: "Цифровизация", value: 30 },
        { name: "Интеграция", value: 20 },
        { name: "Прочее", value: 10 },
      ],
      opexStructure: [
        { name: "ФОТ", value: 45 },
        { name: "Инфраструктура", value: 25 },
        { name: "Лицензии", value: 15 },
        { name: "Прочее", value: 15 },
      ],
      capexStructure: [
        { name: "Разработка", value: 45 },
        { name: "Оборудование", value: 35 },
        { name: "Прочее", value: 20 },
      ],
    },
  },
  "Коммерческий ИТ-кластер": {
    clusterName: "Коммерческий ИТ-кластер",
    metrics: [
      { id: "pl", name: "P&L кластера", icon: DollarSign, value: "5.4B", change: 16.8, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["РСБУ", "МСФО"], chartType: "bar" },
      { id: "cf", name: "Cash Flow", icon: Wallet, value: "1.4B", change: 12.3, unit: "₽", type: "financial", chartType: "line" },
      { id: "revenue", name: "Структура выручки", icon: PieChart, value: "6.8B", change: 19.2, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["По услугам", "По ДЗО"], chartType: "pie" },
      { id: "opex", name: "Структура OPEX", icon: BarChart3, value: "3.6B", change: 4.5, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["По расходам", "По ДЗО"], chartType: "pie" },
      { id: "capex", name: "CAPEX (структура)", icon: TrendingUp, value: "950M", change: 21.4, unit: "₽", type: "financial", chartType: "bar" },
    ],
    financialMetrics: [
      { id: "ssch", name: "ССЧ", icon: Users, value: 1120, change: 10.2, unit: "чел.", type: "operational" },
      { id: "fot", name: "ФОТ", icon: Wallet, value: "620M", change: 7.8, unit: "₽", type: "operational" },
    ],
    operationalMetrics: [],
    chartData: {
      revenueStructure: [
        { name: "Разработка", value: 40 },
        { name: "Интеграция", value: 30 },
        { name: "Поддержка", value: 20 },
        { name: "Прочее", value: 10 },
      ],
      opexStructure: [
        { name: "ФОТ", value: 55 },
        { name: "Инфраструктура", value: 20 },
        { name: "Лицензии", value: 15 },
        { name: "Прочее", value: 10 },
      ],
      capexStructure: [
        { name: "Разработка", value: 50 },
        { name: "Оборудование", value: 30 },
        { name: "Прочее", value: 20 },
      ],
    },
  },
  "Цифровые регионы": {
    clusterName: "Цифровые регионы",
    metrics: [
      { id: "pl", name: "P&L кластера", icon: DollarSign, value: "3.2B", change: 12.5, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["РСБУ", "МСФО"], chartType: "bar" },
      { id: "cf", name: "Cash Flow", icon: Wallet, value: "850M", change: 8.2, unit: "₽", type: "financial", chartType: "line" },
      { id: "revenue", name: "Структура выручки", icon: PieChart, value: "4.1B", change: 15.3, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["По услугам", "По ДЗО"], chartType: "pie" },
      { id: "opex", name: "Структура OPEX", icon: BarChart3, value: "2.2B", change: 2.8, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["По расходам", "По ДЗО"], chartType: "pie" },
      { id: "capex", name: "CAPEX (структура)", icon: TrendingUp, value: "580M", change: 18.2, unit: "₽", type: "financial", chartType: "bar" },
    ],
    financialMetrics: [
      { id: "ssch", name: "ССЧ", icon: Users, value: 680, change: 6.5, unit: "чел.", type: "operational" },
      { id: "fot", name: "ФОТ", icon: Wallet, value: "380M", change: 5.2, unit: "₽", type: "operational" },
    ],
    operationalMetrics: [],
    chartData: {
      revenueStructure: [
        { name: "Умный город", value: 35 },
        { name: "Региональные сервисы", value: 35 },
        { name: "Интеграция", value: 20 },
        { name: "Прочее", value: 10 },
      ],
      opexStructure: [
        { name: "ФОТ", value: 50 },
        { name: "Инфраструктура", value: 25 },
        { name: "Прочее", value: 25 },
      ],
      capexStructure: [
        { name: "Разработка", value: 45 },
        { name: "Оборудование", value: 35 },
        { name: "Прочее", value: 20 },
      ],
    },
  },
  "БТИ (Блок технической инфраструктуры)": {
    clusterName: "БТИ (Блок технической инфраструктуры)",
    metrics: [
      { id: "pl", name: "P&L кластера", icon: DollarSign, value: "2.8B", change: 9.2, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["РСБУ", "МСФО"], chartType: "bar" },
      { id: "cf", name: "Cash Flow", icon: Wallet, value: "720M", change: 6.8, unit: "₽", type: "financial", chartType: "line" },
      { id: "revenue", name: "Структура выручки", icon: PieChart, value: "3.5B", change: 11.5, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["По услугам", "По ДЗО"], chartType: "pie" },
      { id: "opex", name: "Структура OPEX", icon: BarChart3, value: "1.9B", change: 1.8, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["По расходам", "По ДЗО"], chartType: "pie" },
      { id: "capex", name: "CAPEX (структура)", icon: TrendingUp, value: "420M", change: 14.5, unit: "₽", type: "financial", chartType: "bar" },
    ],
    financialMetrics: [
      { id: "ssch", name: "ССЧ", icon: Users, value: 520, change: 4.2, unit: "чел.", type: "operational" },
      { id: "fot", name: "ФОТ", icon: Wallet, value: "290M", change: 3.8, unit: "₽", type: "operational" },
    ],
    operationalMetrics: [],
    chartData: {
      revenueStructure: [
        { name: "Обслуживание", value: 40 },
        { name: "Строительство", value: 35 },
        { name: "Прочее", value: 25 },
      ],
      opexStructure: [
        { name: "ФОТ", value: 45 },
        { name: "Материалы", value: 30 },
        { name: "Прочее", value: 25 },
      ],
      capexStructure: [
        { name: "Оборудование", value: 50 },
        { name: "Инструменты", value: 30 },
        { name: "Прочее", value: 20 },
      ],
    },
  },
  "Х.Tech (корпоративный венчурный фонд)": {
    clusterName: "Х.Tech (корпоративный венчурный фонд)",
    metrics: [
      { id: "pl", name: "P&L кластера", icon: DollarSign, value: "1.5B", change: 42.5, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["РСБУ", "МСФО"], chartType: "bar" },
      { id: "cf", name: "Cash Flow", icon: Wallet, value: "380M", change: 28.2, unit: "₽", type: "financial", chartType: "line" },
      { id: "revenue", name: "Структура выручки", icon: PieChart, value: "1.8B", change: 55.3, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["По услугам", "По ДЗО"], chartType: "pie" },
      { id: "opex", name: "Структура OPEX", icon: BarChart3, value: "950M", change: 12.5, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["По расходам", "По ДЗО"], chartType: "pie" },
      { id: "capex", name: "CAPEX (структура)", icon: TrendingUp, value: "280M", change: 35.2, unit: "₽", type: "financial", chartType: "bar" },
    ],
    financialMetrics: [
      { id: "ssch", name: "ССЧ", icon: Users, value: 180, change: 22.5, unit: "чел.", type: "operational" },
      { id: "fot", name: "ФОТ", icon: Wallet, value: "120M", change: 18.2, unit: "₽", type: "operational" },
    ],
    operationalMetrics: [],
    chartData: {
      revenueStructure: [
        { name: "Портфельные компании", value: 60 },
        { name: "Дивиденды", value: 25 },
        { name: "Прочее", value: 15 },
      ],
      opexStructure: [
        { name: "ФОТ", value: 40 },
        { name: "Инвестиции", value: 35 },
        { name: "Прочее", value: 25 },
      ],
      capexStructure: [
        { name: "Инвестиции", value: 70 },
        { name: "Прочее", value: 30 },
      ],
    },
  },
  "Цифротех": {
    clusterName: "Цифротех",
    metrics: [
      { id: "pl", name: "P&L кластера", icon: DollarSign, value: "2.1B", change: 18.5, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["РСБУ", "МСФО"], chartType: "bar" },
      { id: "cf", name: "Cash Flow", icon: Wallet, value: "540M", change: 14.2, unit: "₽", type: "financial", chartType: "line" },
      { id: "revenue", name: "Структура выручки", icon: PieChart, value: "2.6B", change: 21.8, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["По услугам", "По ДЗО"], chartType: "pie" },
      { id: "opex", name: "Структура OPEX", icon: BarChart3, value: "1.4B", change: 5.2, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["По расходам", "По ДЗО"], chartType: "pie" },
      { id: "capex", name: "CAPEX (структура)", icon: TrendingUp, value: "350M", change: 25.5, unit: "₽", type: "financial", chartType: "bar" },
    ],
    financialMetrics: [
      { id: "ssch", name: "ССЧ", icon: Users, value: 420, change: 15.2, unit: "чел.", type: "operational" },
      { id: "fot", name: "ФОТ", icon: Wallet, value: "240M", change: 12.5, unit: "₽", type: "operational" },
    ],
    operationalMetrics: [],
    chartData: {
      revenueStructure: [
        { name: "Платформы", value: 45 },
        { name: "Сервисы", value: 35 },
        { name: "Прочее", value: 20 },
      ],
      opexStructure: [
        { name: "ФОТ", value: 50 },
        { name: "Инфраструктура", value: 25 },
        { name: "Прочее", value: 25 },
      ],
      capexStructure: [
        { name: "Разработка", value: 55 },
        { name: "Оборудование", value: 25 },
        { name: "Прочее", value: 20 },
      ],
    },
  },
  "Здоровье": {
    clusterName: "Здоровье",
    metrics: [
      { id: "pl", name: "P&L кластера", icon: DollarSign, value: "1.8B", change: 22.5, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["РСБУ", "МСФО"], chartType: "bar" },
      { id: "cf", name: "Cash Flow", icon: Wallet, value: "450M", change: 18.2, unit: "₽", type: "financial", chartType: "line" },
      { id: "revenue", name: "Структура выручки", icon: PieChart, value: "2.2B", change: 28.5, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["По услугам", "По ДЗО"], chartType: "pie" },
      { id: "opex", name: "Структура OPEX", icon: BarChart3, value: "1.2B", change: 8.5, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["По расходам", "По ДЗО"], chartType: "pie" },
      { id: "capex", name: "CAPEX (структура)", icon: TrendingUp, value: "280M", change: 32.1, unit: "₽", type: "financial", chartType: "bar" },
    ],
    financialMetrics: [
      { id: "ssch", name: "ССЧ", icon: Users, value: 350, change: 18.5, unit: "чел.", type: "operational" },
      { id: "fot", name: "ФОТ", icon: Wallet, value: "195M", change: 15.2, unit: "₽", type: "operational" },
    ],
    operationalMetrics: [],
    chartData: {
      revenueStructure: [
        { name: "Телемедицина", value: 40 },
        { name: "Лаборатории", value: 35 },
        { name: "Прочее", value: 25 },
      ],
      opexStructure: [
        { name: "ФОТ", value: 45 },
        { name: "Оборудование", value: 30 },
        { name: "Прочее", value: 25 },
      ],
      capexStructure: [
        { name: "Оборудование", value: 50 },
        { name: "Разработка", value: 30 },
        { name: "Прочее", value: 20 },
      ],
    },
  },
  "Госсервисы": {
    clusterName: "Госсервисы",
    metrics: [
      { id: "pl", name: "P&L кластера", icon: DollarSign, value: "4.5B", change: 15.2, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["РСБУ", "МСФО"], chartType: "bar" },
      { id: "cf", name: "Cash Flow", icon: Wallet, value: "1.2B", change: 12.5, unit: "₽", type: "financial", chartType: "line" },
      { id: "revenue", name: "Структура выручки", icon: PieChart, value: "5.4B", change: 18.2, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["По услугам", "По ДЗО"], chartType: "pie" },
      { id: "opex", name: "Структура OPEX", icon: BarChart3, value: "2.9B", change: 4.2, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["По расходам", "По ДЗО"], chartType: "pie" },
      { id: "capex", name: "CAPEX (структура)", icon: TrendingUp, value: "720M", change: 22.5, unit: "₽", type: "financial", chartType: "bar" },
    ],
    financialMetrics: [
      { id: "ssch", name: "ССЧ", icon: Users, value: 920, change: 8.2, unit: "чел.", type: "operational" },
      { id: "fot", name: "ФОТ", icon: Wallet, value: "480M", change: 6.5, unit: "₽", type: "operational" },
    ],
    operationalMetrics: [],
    chartData: {
      revenueStructure: [
        { name: "Госуслуги", value: 45 },
        { name: "Интеграция", value: 30 },
        { name: "Прочее", value: 25 },
      ],
      opexStructure: [
        { name: "ФОТ", value: 50 },
        { name: "Инфраструктура", value: 25 },
        { name: "Прочее", value: 25 },
      ],
      capexStructure: [
        { name: "Разработка", value: 45 },
        { name: "Оборудование", value: 35 },
        { name: "Прочее", value: 20 },
      ],
    },
  },
  "Образование": {
    clusterName: "Образование",
    metrics: [
      { id: "pl", name: "P&L кластера", icon: DollarSign, value: "2.4B", change: 19.5, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["РСБУ", "МСФО"], chartType: "bar" },
      { id: "cf", name: "Cash Flow", icon: Wallet, value: "620M", change: 15.8, unit: "₽", type: "financial", chartType: "line" },
      { id: "revenue", name: "Структура выручки", icon: PieChart, value: "3.0B", change: 22.5, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["По услугам", "По ДЗО"], chartType: "pie" },
      { id: "opex", name: "Структура OPEX", icon: BarChart3, value: "1.6B", change: 6.2, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["По расходам", "По ДЗО"], chartType: "pie" },
      { id: "capex", name: "CAPEX (структура)", icon: TrendingUp, value: "380M", change: 28.5, unit: "₽", type: "financial", chartType: "bar" },
    ],
    financialMetrics: [
      { id: "ssch", name: "ССЧ", icon: Users, value: 580, change: 12.5, unit: "чел.", type: "operational" },
      { id: "fot", name: "ФОТ", icon: Wallet, value: "320M", change: 9.8, unit: "₽", type: "operational" },
    ],
    operationalMetrics: [],
    chartData: {
      revenueStructure: [
        { name: "EdTech", value: 45 },
        { name: "Платформы", value: 30 },
        { name: "Прочее", value: 25 },
      ],
      opexStructure: [
        { name: "ФОТ", value: 50 },
        { name: "Контент", value: 25 },
        { name: "Прочее", value: 25 },
      ],
      capexStructure: [
        { name: "Разработка", value: 50 },
        { name: "Контент", value: 30 },
        { name: "Прочее", value: 20 },
      ],
    },
  },
  "Прочие": {
    clusterName: "Прочие",
    metrics: [
      { id: "pl", name: "P&L кластера", icon: DollarSign, value: "1.2B", change: 8.5, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["РСБУ", "МСФО"], chartType: "bar" },
      { id: "cf", name: "Cash Flow", icon: Wallet, value: "280M", change: 5.2, unit: "₽", type: "financial", chartType: "line" },
      { id: "revenue", name: "Структура выручки", icon: PieChart, value: "1.5B", change: 10.5, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["По услугам", "По ДЗО"], chartType: "pie" },
      { id: "opex", name: "Структура OPEX", icon: BarChart3, value: "820M", change: 2.5, unit: "₽", type: "financial", hasSelector: true, selectorOptions: ["По расходам", "По ДЗО"], chartType: "pie" },
      { id: "capex", name: "CAPEX (структура)", icon: TrendingUp, value: "180M", change: 12.5, unit: "₽", type: "financial", chartType: "bar" },
    ],
    financialMetrics: [
      { id: "ssch", name: "ССЧ", icon: Users, value: 220, change: 3.5, unit: "чел.", type: "operational" },
      { id: "fot", name: "ФОТ", icon: Wallet, value: "125M", change: 4.2, unit: "₽", type: "operational" },
    ],
    operationalMetrics: [],
    chartData: {
      revenueStructure: [
        { name: "Услуги", value: 50 },
        { name: "Прочее", value: 50 },
      ],
      opexStructure: [
        { name: "ФОТ", value: 45 },
        { name: "Прочее", value: 55 },
      ],
      capexStructure: [
        { name: "Оборудование", value: 50 },
        { name: "Прочее", value: 50 },
      ],
    },
  },
};

export const getClusterKpiData = (clusterName: string): ClusterKpiData | null => {
  return clusterKpiDataMap[clusterName] || null;
};
