import { useState, useMemo } from "react";
import { FinancialNav } from "@/components/FinancialNav";
import { 
  corporateEvents, 
  getUniqueCompanies, 
  getUniqueCurators, 
  getUniqueClusters,
  eventTypes,
  CorporateEvent 
} from "@/data/eventHistoryData";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Search, X, Filter, Building2, User, Layers, Clock, FileText, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import { format, parse, isWithinInterval, startOfDay, endOfDay } from "date-fns";
import { ru } from "date-fns/locale";
import { cn } from "@/lib/utils";

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

const EventHistory = () => {
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const [companyFilter, setCompanyFilter] = useState<string>("all");
  const [curatorFilter, setCuratorFilter] = useState<string>("all");
  const [clusterFilter, setClusterFilter] = useState<string>("all");
  const [eventTypeFilter, setEventTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<CorporateEvent | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const companies = useMemo(() => getUniqueCompanies(), []);
  const curators = useMemo(() => getUniqueCurators(), []);
  const clusters = useMemo(() => getUniqueClusters(), []);

  const filteredEvents = useMemo(() => {
    return corporateEvents.filter(event => {
      // Date range filter
      if (dateFrom || dateTo) {
        const eventDate = parse(event.dateTime, "yyyy-MM-dd HH:mm", new Date());
        if (dateFrom && eventDate < startOfDay(dateFrom)) return false;
        if (dateTo && eventDate > endOfDay(dateTo)) return false;
      }

      // Company filter
      if (companyFilter !== "all" && event.company !== companyFilter) return false;

      // Curator filter
      if (curatorFilter !== "all" && event.initiator !== curatorFilter) return false;

      // Cluster filter
      if (clusterFilter !== "all" && event.cluster !== clusterFilter) return false;

      // Event type filter
      if (eventTypeFilter !== "all" && event.eventType !== eventTypeFilter) return false;

      // Status filter
      if (statusFilter !== "all" && event.status !== statusFilter) return false;

      // Search term
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        return (
          event.description.toLowerCase().includes(search) ||
          event.company.toLowerCase().includes(search) ||
          event.initiator.toLowerCase().includes(search)
        );
      }

      return true;
    }).sort((a, b) => {
      const dateA = parse(a.dateTime, "yyyy-MM-dd HH:mm", new Date());
      const dateB = parse(b.dateTime, "yyyy-MM-dd HH:mm", new Date());
      return dateB.getTime() - dateA.getTime();
    });
  }, [dateFrom, dateTo, companyFilter, curatorFilter, clusterFilter, eventTypeFilter, statusFilter, searchTerm]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredEvents.length / pageSize);
  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredEvents.slice(startIndex, startIndex + pageSize);
  }, [filteredEvents, currentPage, pageSize]);

  // Reset to first page when filters change
  const resetFilters = () => {
    setDateFrom(undefined);
    setDateTo(undefined);
    setCompanyFilter("all");
    setCuratorFilter("all");
    setClusterFilter("all");
    setEventTypeFilter("all");
    setStatusFilter("all");
    setSearchTerm("");
    setCurrentPage(1);
  };

  // Reset page when pageSize changes
  const handlePageSizeChange = (newSize: string) => {
    setPageSize(Number(newSize));
    setCurrentPage(1);
  };

  // Reset page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [dateFrom, dateTo, companyFilter, curatorFilter, clusterFilter, eventTypeFilter, statusFilter, searchTerm]);

  const formatEventDate = (dateTime: string) => {
    const date = parse(dateTime, "yyyy-MM-dd HH:mm", new Date());
    return format(date, "dd.MM.yyyy HH:mm", { locale: ru });
  };

  const getStatusBadge = (status: CorporateEvent["status"]) => {
    const variants: Record<CorporateEvent["status"], string> = {
      "Завершено": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      "В процессе": "bg-amber-500/20 text-amber-400 border-amber-500/30",
      "Запланировано": "bg-blue-500/20 text-blue-400 border-blue-500/30"
    };
    return (
      <Badge variant="outline" className={cn("text-xs font-medium", variants[status])}>
        {status}
      </Badge>
    );
  };

  const getEventTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      "Корпоративное действие": "bg-purple-500/20 text-purple-400 border-purple-500/30",
      "Финансы": "bg-green-500/20 text-green-400 border-green-500/30",
      "M&A транзакция": "bg-red-500/20 text-red-400 border-red-500/30",
      "Операционное событие": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      "СП событие": "bg-orange-500/20 text-orange-400 border-orange-500/30",
      "Регуляторное": "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
      "Кадровое": "bg-pink-500/20 text-pink-400 border-pink-500/30"
    };
    return (
      <Badge variant="outline" className={cn("text-xs", colors[type] || "")}>
        {type}
      </Badge>
    );
  };

  const hasActiveFilters = dateFrom || dateTo || companyFilter !== "all" || curatorFilter !== "all" || 
    clusterFilter !== "all" || eventTypeFilter !== "all" || statusFilter !== "all" || searchTerm;

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <FinancialNav page="events" />
      <div className="container mx-auto px-6 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            История событий
          </h2>
          <p className="text-muted-foreground">
            Хронология корпоративных событий компаний группы
          </p>
        </div>

        {/* Filters Panel */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Фильтры</span>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={resetFilters} className="ml-auto text-xs">
                <X className="h-3 w-3 mr-1" />
                Сбросить
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3">
            {/* Search */}
            <div className="relative xl:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по описанию..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50"
              />
            </div>

            {/* Date From */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal bg-background/50",
                    !dateFrom && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFrom ? format(dateFrom, "dd.MM.yyyy", { locale: ru }) : "Дата от"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-popover" align="start">
                <Calendar
                  mode="single"
                  selected={dateFrom}
                  onSelect={setDateFrom}
                  locale={ru}
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>

            {/* Date To */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal bg-background/50",
                    !dateTo && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateTo ? format(dateTo, "dd.MM.yyyy", { locale: ru }) : "Дата до"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-popover" align="start">
                <Calendar
                  mode="single"
                  selected={dateTo}
                  onSelect={setDateTo}
                  locale={ru}
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>

            {/* Company Filter */}
            <Select value={companyFilter} onValueChange={setCompanyFilter}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Компания" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">Все компании</SelectItem>
                {companies.map(company => (
                  <SelectItem key={company} value={company}>{company}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Curator Filter */}
            <Select value={curatorFilter} onValueChange={setCuratorFilter}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Куратор" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">Все кураторы</SelectItem>
                {curators.map(curator => (
                  <SelectItem key={curator} value={curator}>{curator}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Cluster Filter */}
            <Select value={clusterFilter} onValueChange={setClusterFilter}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Кластер" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">Все кластеры</SelectItem>
                {clusters.map(cluster => (
                  <SelectItem key={cluster} value={cluster}>{cluster}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Second row of filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
            {/* Event Type Filter */}
            <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Тип события" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">Все типы</SelectItem>
                {eventTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="Завершено">Завершено</SelectItem>
                <SelectItem value="В процессе">В процессе</SelectItem>
                <SelectItem value="Запланировано">Запланировано</SelectItem>
              </SelectContent>
            </Select>

            <div className="md:col-span-2 flex items-center justify-end text-sm text-muted-foreground">
              Найдено событий: <span className="ml-1 font-medium text-foreground">{filteredEvents.length}</span>
            </div>
          </div>
        </div>

        {/* Events Table */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-muted/50">
                <TableHead className="text-muted-foreground font-medium w-[140px]">Дата и время</TableHead>
                <TableHead className="text-muted-foreground font-medium w-[180px]">Компания</TableHead>
                <TableHead className="text-muted-foreground font-medium w-[160px]">Тип события</TableHead>
                <TableHead className="text-muted-foreground font-medium">Описание</TableHead>
                <TableHead className="text-muted-foreground font-medium w-[130px]">Инициатор</TableHead>
                <TableHead className="text-muted-foreground font-medium w-[180px]">Кластер</TableHead>
                <TableHead className="text-muted-foreground font-medium w-[110px]">Статус</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                    Нет событий, соответствующих выбранным фильтрам
                  </TableCell>
                </TableRow>
              ) : (
                paginatedEvents.map((event) => (
                  <TableRow 
                    key={event.id} 
                    className="border-border hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <TableCell className="font-mono text-sm text-foreground">
                      {formatEventDate(event.dateTime)}
                    </TableCell>
                    <TableCell className="font-medium text-foreground">
                      {event.company}
                    </TableCell>
                    <TableCell>
                      {getEventTypeBadge(event.eventType)}
                    </TableCell>
                    <TableCell className="text-foreground max-w-md">
                      {event.description}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {event.initiator}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {event.cluster}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(event.status)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {filteredEvents.length > 0 && (
          <div className="flex items-center justify-between mt-4 bg-card/50 backdrop-blur-sm border border-border rounded-lg p-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Показывать по:</span>
                <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
                  <SelectTrigger className="w-[80px] bg-background/50 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {PAGE_SIZE_OPTIONS.map(size => (
                      <SelectItem key={size} value={size.toString()}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <span className="text-sm text-muted-foreground">
                Показано {((currentPage - 1) * pageSize) + 1}–{Math.min(currentPage * pageSize, filteredEvents.length)} из {filteredEvents.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="h-8"
              >
                В начало
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum: number;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className="h-8 w-8 p-0"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>

              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="h-8"
              >
                В конец
              </Button>
            </div>
          </div>
        )}

        {/* Event Detail Dialog */}
        <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
          <DialogContent className="max-w-2xl bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Детали события
              </DialogTitle>
            </DialogHeader>
            
            {selectedEvent && (
              <div className="space-y-6 mt-4">
                {/* Status and Type */}
                <div className="flex items-center gap-3 flex-wrap">
                  {getEventTypeBadge(selectedEvent.eventType)}
                  {getStatusBadge(selectedEvent.status)}
                </div>

                {/* Description */}
                <div className="bg-muted/30 rounded-lg p-4 border border-border">
                  <p className="text-foreground text-lg leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Date & Time */}
                  <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg border border-border/50">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Дата и время</p>
                      <p className="text-foreground font-medium">
                        {formatEventDate(selectedEvent.dateTime)}
                      </p>
                    </div>
                  </div>

                  {/* Company */}
                  <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg border border-border/50">
                    <Building2 className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Компания</p>
                      <p className="text-foreground font-medium">
                        {selectedEvent.company}
                      </p>
                    </div>
                  </div>

                  {/* Initiator */}
                  <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg border border-border/50">
                    <User className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Инициатор / Куратор</p>
                      <p className="text-foreground font-medium">
                        {selectedEvent.initiator}
                      </p>
                    </div>
                  </div>

                  {/* Cluster */}
                  <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg border border-border/50">
                    <Layers className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Кластер / Бизнес-единица</p>
                      <p className="text-foreground font-medium">
                        {selectedEvent.cluster}
                      </p>
                    </div>
                  </div>

                  {/* Event Type */}
                  <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg border border-border/50 md:col-span-2">
                    <Tag className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Тип события</p>
                      <p className="text-foreground font-medium">
                        {selectedEvent.eventType}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Event ID */}
                <div className="text-xs text-muted-foreground text-right">
                  ID события: {selectedEvent.id}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EventHistory;
