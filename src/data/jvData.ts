export interface JVCompany {
  id: string;
  name: string;
  cluster: string;
  status: "Активный" | "На паузе" | "Закрытие";
  curator: string;
  partner: string;
  ownershipPercent: number;
  revenue2024: number;
  revenue2025: number;
  oibda2024: number;
  oibda2025: number;
  dividends2024: number;
  dividends2025: number;
  events: JVEvent[];
}

export interface JVEvent {
  id: string;
  date: string;
  title: string;
  type: "board" | "budget" | "dividend" | "reorganization" | "management" | "audit" | "report";
  status: "planned" | "completed" | "cancelled";
}

export const jvCompanies: JVCompany[] = [
  {
    id: "jv1",
    name: "СП Цифровые Решения",
    cluster: "Цифровые регионы",
    status: "Активный",
    curator: "Иванов А.А.",
    partner: "РегионТелеком",
    ownershipPercent: 51,
    revenue2024: 2450,
    revenue2025: 2890,
    oibda2024: 612,
    oibda2025: 723,
    dividends2024: 180,
    dividends2025: 210,
    events: [
      { id: "e1", date: "2025-01-15", title: "Заседание Совета Директоров", type: "board", status: "completed" },
      { id: "e2", date: "2025-02-20", title: "Утверждение бюджета на 2025", type: "budget", status: "completed" },
      { id: "e3", date: "2025-03-30", title: "Выплата дивидендов Q4 2024", type: "dividend", status: "completed" },
      { id: "e4", date: "2025-06-15", title: "Заседание Совета Директоров", type: "board", status: "planned" },
      { id: "e5", date: "2025-09-01", title: "Аудиторская проверка", type: "audit", status: "planned" },
      { id: "e6", date: "2025-12-15", title: "Годовой отчет", type: "report", status: "planned" },
    ]
  },
  {
    id: "jv2",
    name: "ТелеМедиа Партнёрс",
    cluster: "Телеком-операторы/B2O",
    status: "Активный",
    curator: "Петров Б.Б.",
    partner: "МедиаГрупп",
    ownershipPercent: 49,
    revenue2024: 5120,
    revenue2025: 5680,
    oibda2024: 1024,
    oibda2025: 1136,
    dividends2024: 320,
    dividends2025: 380,
    events: [
      { id: "e7", date: "2025-01-20", title: "Заседание Совета Директоров", type: "board", status: "completed" },
      { id: "e8", date: "2025-03-15", title: "Смена генерального директора", type: "management", status: "completed" },
      { id: "e9", date: "2025-04-25", title: "Выплата дивидендов Q1 2025", type: "dividend", status: "planned" },
      { id: "e10", date: "2025-07-10", title: "Заседание Совета Директоров", type: "board", status: "planned" },
      { id: "e11", date: "2025-10-20", title: "Реорганизация структуры", type: "reorganization", status: "planned" },
    ]
  },
  {
    id: "jv3",
    name: "КлаудСервис СП",
    cluster: "ЦОД и облачные сервисы",
    status: "Активный",
    curator: "Сидоров В.В.",
    partner: "CloudTech International",
    ownershipPercent: 50,
    revenue2024: 3890,
    revenue2025: 4560,
    oibda2024: 972,
    oibda2025: 1140,
    dividends2024: 250,
    dividends2025: 310,
    events: [
      { id: "e12", date: "2025-02-01", title: "Заседание Совета Директоров", type: "board", status: "completed" },
      { id: "e13", date: "2025-02-28", title: "Утверждение бюджета на 2025", type: "budget", status: "completed" },
      { id: "e14", date: "2025-05-15", title: "Выплата дивидендов", type: "dividend", status: "planned" },
      { id: "e15", date: "2025-08-20", title: "Заседание Совета Директоров", type: "board", status: "planned" },
      { id: "e16", date: "2025-11-10", title: "Аудиторская проверка", type: "audit", status: "planned" },
    ]
  },
  {
    id: "jv4",
    name: "БезопасностьПлюс",
    cluster: "Информационная безопасность",
    status: "На паузе",
    curator: "Козлов Г.Г.",
    partner: "SecureIT",
    ownershipPercent: 45,
    revenue2024: 1280,
    revenue2025: 980,
    oibda2024: 256,
    oibda2025: 147,
    dividends2024: 80,
    dividends2025: 0,
    events: [
      { id: "e17", date: "2025-01-30", title: "Заседание Совета Директоров", type: "board", status: "completed" },
      { id: "e18", date: "2025-04-01", title: "Приостановка операций", type: "reorganization", status: "completed" },
      { id: "e19", date: "2025-09-15", title: "Пересмотр стратегии", type: "board", status: "planned" },
    ]
  },
  {
    id: "jv5",
    name: "ФинТех Венчур",
    cluster: "X.Tech (корпоративный венчурный фонд)",
    status: "Активный",
    curator: "Николаев Д.Д.",
    partner: "VentureCap",
    ownershipPercent: 60,
    revenue2024: 890,
    revenue2025: 1450,
    oibda2024: 178,
    oibda2025: 362,
    dividends2024: 0,
    dividends2025: 100,
    events: [
      { id: "e20", date: "2025-02-15", title: "Заседание Совета Директоров", type: "board", status: "completed" },
      { id: "e21", date: "2025-03-20", title: "Утверждение инвестиционной стратегии", type: "budget", status: "completed" },
      { id: "e22", date: "2025-06-30", title: "Заседание Совета Директоров", type: "board", status: "planned" },
      { id: "e23", date: "2025-10-01", title: "Первая выплата дивидендов", type: "dividend", status: "planned" },
      { id: "e24", date: "2025-12-20", title: "Годовой отчет", type: "report", status: "planned" },
    ]
  },
  {
    id: "jv6",
    name: "ГосЦифра СП",
    cluster: "Государственные цифровые услуги и сервисы",
    status: "Активный",
    curator: "Федоров Е.Е.",
    partner: "ГосИТ",
    ownershipPercent: 55,
    revenue2024: 4200,
    revenue2025: 4850,
    oibda2024: 840,
    oibda2025: 970,
    dividends2024: 200,
    dividends2025: 250,
    events: [
      { id: "e25", date: "2025-01-25", title: "Заседание Совета Директоров", type: "board", status: "completed" },
      { id: "e26", date: "2025-02-10", title: "Утверждение бюджета на 2025", type: "budget", status: "completed" },
      { id: "e27", date: "2025-04-15", title: "Выплата дивидендов", type: "dividend", status: "planned" },
      { id: "e28", date: "2025-07-25", title: "Заседание Совета Директоров", type: "board", status: "planned" },
      { id: "e29", date: "2025-11-30", title: "Аудиторская проверка", type: "audit", status: "planned" },
    ]
  },
  {
    id: "jv7",
    name: "МобильныйМир",
    cluster: "Мобильный бизнес",
    status: "Закрытие",
    curator: "Андреев Ж.Ж.",
    partner: "MobileCorp",
    ownershipPercent: 40,
    revenue2024: 1560,
    revenue2025: 720,
    oibda2024: 234,
    oibda2025: -50,
    dividends2024: 50,
    dividends2025: 0,
    events: [
      { id: "e30", date: "2025-01-10", title: "Заседание Совета Директоров", type: "board", status: "completed" },
      { id: "e31", date: "2025-02-28", title: "Решение о закрытии СП", type: "reorganization", status: "completed" },
      { id: "e32", date: "2025-06-30", title: "Завершение ликвидации", type: "reorganization", status: "planned" },
    ]
  },
];

export const getJVTotals = () => {
  const totals = jvCompanies.reduce((acc, jv) => ({
    revenue2024: acc.revenue2024 + jv.revenue2024,
    revenue2025: acc.revenue2025 + jv.revenue2025,
    oibda2024: acc.oibda2024 + jv.oibda2024,
    oibda2025: acc.oibda2025 + jv.oibda2025,
    dividends2024: acc.dividends2024 + jv.dividends2024,
    dividends2025: acc.dividends2025 + jv.dividends2025,
  }), {
    revenue2024: 0,
    revenue2025: 0,
    oibda2024: 0,
    oibda2025: 0,
    dividends2024: 0,
    dividends2025: 0,
  });
  
  return totals;
};

export const getJVStats = () => {
  const active = jvCompanies.filter(jv => jv.status === "Активный").length;
  const paused = jvCompanies.filter(jv => jv.status === "На паузе").length;
  const closing = jvCompanies.filter(jv => jv.status === "Закрытие").length;
  
  return { active, paused, closing, total: jvCompanies.length };
};
