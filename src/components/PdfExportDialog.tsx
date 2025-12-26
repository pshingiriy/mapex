import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { FileDown } from 'lucide-react';

interface PdfExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onExport: (settings: PdfExportSettings) => void;
  isExporting: boolean;
}

export interface PdfExportSettings {
  orientation: 'portrait' | 'landscape';
  scale: number;
  paperSize: 'a4' | 'a3' | 'a2' | 'a1';
}

const paperSizes = {
  a4: { label: 'A4 (210 × 297 мм)', width: 210, height: 297 },
  a3: { label: 'A3 (297 × 420 мм)', width: 297, height: 420 },
  a2: { label: 'A2 (420 × 594 мм)', width: 420, height: 594 },
  a1: { label: 'A1 (594 × 841 мм)', width: 594, height: 841 },
};

export const PdfExportDialog = ({ open, onOpenChange, onExport, isExporting }: PdfExportDialogProps) => {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('landscape');
  const [scale, setScale] = useState([100]);
  const [paperSize, setPaperSize] = useState<'a4' | 'a3' | 'a2' | 'a1'>('a3');

  const handleExport = () => {
    onExport({
      orientation,
      scale: scale[0] / 100,
      paperSize,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileDown className="h-5 w-5" />
            Экспорт в PDF
          </DialogTitle>
          <DialogDescription>
            Настройте параметры экспорта структуры организации
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="paper-size">Размер бумаги</Label>
            <Select value={paperSize} onValueChange={(v) => setPaperSize(v as any)}>
              <SelectTrigger id="paper-size">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(paperSizes).map(([key, value]) => (
                  <SelectItem key={key} value={key}>{value.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="orientation">Ориентация страницы</Label>
            <Select value={orientation} onValueChange={(v) => setOrientation(v as 'portrait' | 'landscape')}>
              <SelectTrigger id="orientation">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="portrait">Книжная (портрет)</SelectItem>
                <SelectItem value="landscape">Альбомная (ландшафт)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="scale">Масштаб</Label>
              <span className="text-sm text-muted-foreground">{scale[0]}%</span>
            </div>
            <Slider
              id="scale"
              min={25}
              max={200}
              step={5}
              value={scale}
              onValueChange={setScale}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>25%</span>
              <span>100%</span>
              <span>200%</span>
            </div>
          </div>

          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Размер страницы:</strong>{' '}
              {orientation === 'landscape' 
                ? `${paperSizes[paperSize].height} × ${paperSizes[paperSize].width} мм`
                : `${paperSizes[paperSize].width} × ${paperSizes[paperSize].height} мм`
              }
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isExporting}>
            Отмена
          </Button>
          <Button onClick={handleExport} disabled={isExporting}>
            {isExporting ? 'Экспорт...' : 'Экспортировать'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
