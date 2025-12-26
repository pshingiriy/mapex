export interface CorporateEvent {
  id: string;
  dateTime: string;
  company: string;
  eventType: string;
  description: string;
  initiator: string;
  cluster: string;
  status: "Завершено" | "В процессе" | "Запланировано";
}

export const eventTypes = [
  "Корпоративное действие",
  "Финансы",
  "M&A транзакция",
  "Операционное событие",
  "СП событие",
  "Регуляторное",
  "Кадровое",
];

export const eventStatuses = ["Завершено", "В процессе", "Запланировано"] as const;

export const corporateEvents: CorporateEvent[] = [
  {
    id: "1",
    dateTime: "2024-12-15 14:30",
    company: "ТехноИнновация ООО",
    eventType: "Корпоративное действие",
    description: "Проведено внеочередное общее собрание акционеров",
    initiator: "Иванов А.С.",
    cluster: "Коммерческий ИТ-кластер",
    status: "Завершено"
  },
  {
    id: "2",
    dateTime: "2024-12-14 10:00",
    company: "ЦифроМед АО",
    eventType: "Финансы",
    description: "Загружен ежемесячный отчет УСН за ноябрь 2024",
    initiator: "Петрова М.В.",
    cluster: "Здоровье",
    status: "Завершено"
  },
  {
    id: "3",
    dateTime: "2024-12-13 16:45",
    company: "ГосТех Сервисы",
    eventType: "M&A транзакция",
    description: "Подписано письмо о намерениях по приобретению доли в СофтВектор",
    initiator: "Сидоров К.П.",
    cluster: "Госсервисы",
    status: "В процессе"
  },
  {
    id: "4",
    dateTime: "2024-12-12 09:15",
    company: "Облачные Решения ООО",
    eventType: "Операционное событие",
    description: "Введена в эксплуатацию новая система IT-мониторинга",
    initiator: "Козлова Е.А.",
    cluster: "ЦОД и облачные сервисы",
    status: "Завершено"
  },
  {
    id: "5",
    dateTime: "2024-12-11 11:30",
    company: "ТелеСвязь",
    eventType: "СП событие",
    description: "Подписана резолюция о выплате дивидендов за год",
    initiator: "Михайлов Д.О.",
    cluster: "Телеком-операторы/B2O",
    status: "Завершено"
  },
  {
    id: "6",
    dateTime: "2024-12-10 15:00",
    company: "КиберЩит АО",
    eventType: "Регуляторное",
    description: "Получена лицензия ФСТЭК на новый продукт",
    initiator: "Новикова А.И.",
    cluster: "Информационная безопасность",
    status: "Завершено"
  },
  {
    id: "7",
    dateTime: "2024-12-09 13:20",
    company: "МобильПлюс",
    eventType: "Кадровое",
    description: "Назначен новый технический директор",
    initiator: "Волков С.Н.",
    cluster: "Мобильный бизнес",
    status: "Завершено"
  },
  {
    id: "8",
    dateTime: "2024-12-08 10:45",
    company: "ЭдуТех Платформа",
    eventType: "Финансы",
    description: "Проведен аудит годовой финансовой отчетности",
    initiator: "Федорова Л.М.",
    cluster: "Образование",
    status: "Завершено"
  },
  {
    id: "9",
    dateTime: "2024-12-07 17:00",
    company: "ЦифроРегион",
    eventType: "Операционное событие",
    description: "Запущен новый продукт на рынок",
    initiator: "Алексеев В.Г.",
    cluster: "Цифровые регионы",
    status: "Завершено"
  },
  {
    id: "10",
    dateTime: "2024-12-06 08:30",
    company: "БТИ Инфраструктура",
    eventType: "Корпоративное действие",
    description: "Утверждена новая редакция Устава компании",
    initiator: "Григорьев П.А.",
    cluster: "БТИ (Блок технической инфраструктуры)",
    status: "Завершено"
  },
  {
    id: "11",
    dateTime: "2024-12-05 14:15",
    company: "X.Ventures",
    eventType: "M&A транзакция",
    description: "Сделка по приобретению активов получила одобрение ФАС",
    initiator: "Кузнецов И.С.",
    cluster: "X.Tech (корпоративный венчурный фонд)",
    status: "В процессе"
  },
  {
    id: "12",
    dateTime: "2024-12-04 12:00",
    company: "ЦифроТех Холдинг",
    eventType: "Финансы",
    description: "Утвержден бюджет на 2025 год",
    initiator: "Белова Н.К.",
    cluster: "Цифротех",
    status: "Завершено"
  },
  {
    id: "13",
    dateTime: "2024-12-03 16:30",
    company: "ТехноИнновация ООО",
    eventType: "СП событие",
    description: "Инициирована процедура выхода партнера из СП",
    initiator: "Иванов А.С.",
    cluster: "Коммерческий ИТ-кластер",
    status: "В процессе"
  },
  {
    id: "14",
    dateTime: "2024-12-02 09:45",
    company: "ЦифроМед АО",
    eventType: "Операционное событие",
    description: "Заключено ключевое партнерское соглашение с поставщиком",
    initiator: "Петрова М.В.",
    cluster: "Здоровье",
    status: "Завершено"
  },
  {
    id: "15",
    dateTime: "2024-12-01 11:00",
    company: "ГосТех Сервисы",
    eventType: "Корпоративное действие",
    description: "Изменения в составе Совета директоров",
    initiator: "Сидоров К.П.",
    cluster: "Госсервисы",
    status: "Завершено"
  },
  {
    id: "16",
    dateTime: "2024-11-30 15:30",
    company: "Облачные Решения ООО",
    eventType: "Регуляторное",
    description: "Пройдена сертификация ISO 27001",
    initiator: "Козлова Е.А.",
    cluster: "ЦОД и облачные сервисы",
    status: "Завершено"
  },
  {
    id: "17",
    dateTime: "2024-11-29 10:20",
    company: "ТелеСвязь",
    eventType: "Финансы",
    description: "Завершена квартальная консолидация отчетности",
    initiator: "Михайлов Д.О.",
    cluster: "Телеком-операторы/B2O",
    status: "Завершено"
  },
  {
    id: "18",
    dateTime: "2024-11-28 14:00",
    company: "КиберЩит АО",
    eventType: "Операционное событие",
    description: "Развернут SOC-центр для мониторинга угроз",
    initiator: "Новикова А.И.",
    cluster: "Информационная безопасность",
    status: "Завершено"
  },
  {
    id: "19",
    dateTime: "2024-11-27 09:00",
    company: "МобильПлюс",
    eventType: "M&A транзакция",
    description: "Завершена сделка по выходу из АО Вектор",
    initiator: "Волков С.Н.",
    cluster: "Мобильный бизнес",
    status: "Завершено"
  },
  {
    id: "20",
    dateTime: "2024-11-26 16:45",
    company: "ЭдуТех Платформа",
    eventType: "СП событие",
    description: "Завершена интеграция бизнес-процессов с партнером",
    initiator: "Федорова Л.М.",
    cluster: "Образование",
    status: "Завершено"
  },
  {
    id: "21",
    dateTime: "2025-01-15 10:00",
    company: "ЦифроРегион",
    eventType: "Корпоративное действие",
    description: "Запланировано годовое собрание акционеров",
    initiator: "Алексеев В.Г.",
    cluster: "Цифровые регионы",
    status: "Запланировано"
  },
  {
    id: "22",
    dateTime: "2025-01-20 14:00",
    company: "БТИ Инфраструктура",
    eventType: "Финансы",
    description: "Запланирован аудит за 2024 год",
    initiator: "Григорьев П.А.",
    cluster: "БТИ (Блок технической инфраструктуры)",
    status: "Запланировано"
  },
  {
    id: "23",
    dateTime: "2025-01-25 11:30",
    company: "X.Ventures",
    eventType: "M&A транзакция",
    description: "Запланировано подписание сделки по приобретению стартапа",
    initiator: "Кузнецов И.С.",
    cluster: "X.Tech (корпоративный венчурный фонд)",
    status: "Запланировано"
  },
  {
    id: "24",
    dateTime: "2024-11-25 13:15",
    company: "ЦифроТех Холдинг",
    eventType: "Кадровое",
    description: "Проведена реорганизация управленческой структуры",
    initiator: "Белова Н.К.",
    cluster: "Цифротех",
    status: "Завершено"
  },
  {
    id: "25",
    dateTime: "2024-11-24 10:30",
    company: "ТехноИнновация ООО",
    eventType: "Регуляторное",
    description: "Подана заявка на получение патента",
    initiator: "Иванов А.С.",
    cluster: "Коммерческий ИТ-кластер",
    status: "В процессе"
  },
  {
    id: "26",
    dateTime: "2024-11-23 15:45",
    company: "ЦифроМед АО",
    eventType: "Операционное событие",
    description: "Запущена программа цифровой трансформации",
    initiator: "Петрова М.В.",
    cluster: "Здоровье",
    status: "В процессе"
  },
  {
    id: "27",
    dateTime: "2024-11-22 09:00",
    company: "ГосТех Сервисы",
    eventType: "Финансы",
    description: "Проведена инвентаризация основных средств",
    initiator: "Сидоров К.П.",
    cluster: "Госсервисы",
    status: "Завершено"
  },
  {
    id: "28",
    dateTime: "2024-11-21 12:30",
    company: "Облачные Решения ООО",
    eventType: "СП событие",
    description: "Согласованы условия нового партнерского соглашения",
    initiator: "Козлова Е.А.",
    cluster: "ЦОД и облачные сервисы",
    status: "В процессе"
  }
];

// Get unique values for filters
export const getUniqueCompanies = () => [...new Set(corporateEvents.map(e => e.company))];
export const getUniqueCurators = () => [...new Set(corporateEvents.map(e => e.initiator))];
export const getUniqueClusters = () => [...new Set(corporateEvents.map(e => e.cluster))];
