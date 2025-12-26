import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { eventTypes, eventStatuses, CorporateEvent } from "@/data/eventHistoryData";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";

const eventSchema = z.object({
  dateTime: z.date({ required_error: "Выберите дату" }),
  time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Введите время в формате ЧЧ:ММ"),
  company: z.string().min(1, "Введите название компании").max(100, "Максимум 100 символов"),
  eventType: z.string().min(1, "Выберите тип события"),
  description: z.string().min(5, "Минимум 5 символов").max(500, "Максимум 500 символов"),
  initiator: z.string().min(2, "Минимум 2 символа").max(50, "Максимум 50 символов"),
  cluster: z.string().min(1, "Введите название кластера").max(100, "Максимум 100 символов"),
  status: z.enum(["Завершено", "В процессе", "Запланировано"]),
});

interface EventFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (event: CorporateEvent) => void;
  companies: string[];
  curators: string[];
  clusters: string[];
}

export const EventFormDialog = ({
  open,
  onOpenChange,
  onSubmit,
  companies,
  curators,
  clusters,
}: EventFormDialogProps) => {
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState("10:00");
  const [company, setCompany] = useState("");
  const [eventType, setEventType] = useState("");
  const [description, setDescription] = useState("");
  const [initiator, setInitiator] = useState("");
  const [cluster, setCluster] = useState("");
  const [status, setStatus] = useState<CorporateEvent["status"]>("Запланировано");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const resetForm = () => {
    setDate(undefined);
    setTime("10:00");
    setCompany("");
    setEventType("");
    setDescription("");
    setInitiator("");
    setCluster("");
    setStatus("Запланировано");
    setErrors({});
  };

  const handleSubmit = () => {
    const formData = {
      dateTime: date,
      time,
      company: company.trim(),
      eventType,
      description: description.trim(),
      initiator: initiator.trim(),
      cluster: cluster.trim(),
      status,
    };

    const result = eventSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    const newEvent: CorporateEvent = {
      id: Date.now().toString(),
      dateTime: `${format(date!, "yyyy-MM-dd")} ${time}`,
      company: company.trim(),
      eventType,
      description: description.trim(),
      initiator: initiator.trim(),
      cluster: cluster.trim(),
      status,
    };

    onSubmit(newEvent);
    toast({
      title: "Событие создано",
      description: `"${description.substring(0, 50)}..." добавлено в историю`,
    });
    resetForm();
    onOpenChange(false);
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      resetForm();
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            Создать новое событие
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Дата *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                      errors.dateTime && "border-destructive"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "dd.MM.yyyy", { locale: ru }) : "Выберите дату"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-popover" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    locale={ru}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              {errors.dateTime && <p className="text-xs text-destructive">{errors.dateTime}</p>}
            </div>

            <div className="space-y-2">
              <Label>Время *</Label>
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={cn(errors.time && "border-destructive")}
              />
              {errors.time && <p className="text-xs text-destructive">{errors.time}</p>}
            </div>
          </div>

          {/* Company */}
          <div className="space-y-2">
            <Label>Компания *</Label>
            <Select value={company} onValueChange={setCompany}>
              <SelectTrigger className={cn(errors.company && "border-destructive")}>
                <SelectValue placeholder="Выберите или введите компанию" />
              </SelectTrigger>
              <SelectContent className="bg-popover max-h-60">
                {companies.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Или введите название новой компании"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              maxLength={100}
              className="mt-2"
            />
            {errors.company && <p className="text-xs text-destructive">{errors.company}</p>}
          </div>

          {/* Event Type */}
          <div className="space-y-2">
            <Label>Тип события *</Label>
            <Select value={eventType} onValueChange={setEventType}>
              <SelectTrigger className={cn(errors.eventType && "border-destructive")}>
                <SelectValue placeholder="Выберите тип события" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {eventTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.eventType && <p className="text-xs text-destructive">{errors.eventType}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Описание события *</Label>
            <Textarea
              placeholder="Введите подробное описание события..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
              rows={3}
              className={cn(errors.description && "border-destructive")}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              {errors.description ? (
                <p className="text-destructive">{errors.description}</p>
              ) : (
                <span />
              )}
              <span>{description.length}/500</span>
            </div>
          </div>

          {/* Initiator */}
          <div className="space-y-2">
            <Label>Инициатор / Куратор *</Label>
            <Select value={initiator} onValueChange={setInitiator}>
              <SelectTrigger className={cn(errors.initiator && "border-destructive")}>
                <SelectValue placeholder="Выберите или введите ФИО" />
              </SelectTrigger>
              <SelectContent className="bg-popover max-h-60">
                {curators.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Или введите ФИО нового инициатора"
              value={initiator}
              onChange={(e) => setInitiator(e.target.value)}
              maxLength={50}
              className="mt-2"
            />
            {errors.initiator && <p className="text-xs text-destructive">{errors.initiator}</p>}
          </div>

          {/* Cluster */}
          <div className="space-y-2">
            <Label>Кластер / Бизнес-единица *</Label>
            <Select value={cluster} onValueChange={setCluster}>
              <SelectTrigger className={cn(errors.cluster && "border-destructive")}>
                <SelectValue placeholder="Выберите или введите кластер" />
              </SelectTrigger>
              <SelectContent className="bg-popover max-h-60">
                {clusters.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Или введите название нового кластера"
              value={cluster}
              onChange={(e) => setCluster(e.target.value)}
              maxLength={100}
              className="mt-2"
            />
            {errors.cluster && <p className="text-xs text-destructive">{errors.cluster}</p>}
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label>Статус *</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as CorporateEvent["status"])}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {eventStatuses.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => handleClose(false)}>
            Отмена
          </Button>
          <Button onClick={handleSubmit}>
            <Plus className="h-4 w-4 mr-2" />
            Создать событие
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
