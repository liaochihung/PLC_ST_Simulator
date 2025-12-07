import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  MousePointer2, 
  Plus, 
  Trash2, 
  ZoomIn, 
  ZoomOut,
  Circle,
  Square,
  ArrowRight,
  Box,
  Play,
  Pencil
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { EditorMode, MachineElement } from '@/types/machine-editor';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface MachineEditorToolbarProps {
  mode: EditorMode;
  onModeChange: (mode: EditorMode) => void;
  selectedElement: MachineElement | null;
  onDelete: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onAddStation: (type: 'feed' | 'assembly' | 'ok' | 'ng' | 'custom') => void;
  onAddDisc: () => void;
  onAddConveyor: () => void;
  onAddFeeder: () => void;
  isRunning: boolean;
}

const MachineEditorToolbar: React.FC<MachineEditorToolbarProps> = ({
  mode,
  onModeChange,
  selectedElement,
  onDelete,
  onZoomIn,
  onZoomOut,
  onAddStation,
  onAddDisc,
  onAddConveyor,
  onAddFeeder,
  isRunning,
}) => {
  return (
    <div className="flex items-center gap-2 p-2 bg-card border-b border-border">
      {/* Mode Toggle */}
      <div className="flex items-center bg-muted rounded-md p-0.5">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onModeChange('edit')}
          disabled={isRunning}
          className={cn(
            "h-7 px-3 text-xs",
            mode === 'edit' && "bg-background shadow-sm"
          )}
        >
          <Pencil className="w-3 h-3 mr-1" />
          編輯
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onModeChange('runtime')}
          className={cn(
            "h-7 px-3 text-xs",
            mode === 'runtime' && "bg-background shadow-sm"
          )}
        >
          <Play className="w-3 h-3 mr-1" />
          執行
        </Button>
      </div>

      <div className="w-px h-6 bg-border" />

      {/* Edit Mode Tools */}
      {mode === 'edit' && (
        <>
          {/* Add Elements */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                <Plus className="w-3 h-3 mr-1" />
                新增
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => onAddStation('feed')}>
                <Square className="w-4 h-4 mr-2 text-station-feed" />
                入料站
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAddStation('assembly')}>
                <Square className="w-4 h-4 mr-2 text-station-assembly" />
                組裝站
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAddStation('ok')}>
                <Square className="w-4 h-4 mr-2 text-station-ok" />
                良品站
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAddStation('ng')}>
                <Square className="w-4 h-4 mr-2 text-station-ng" />
                不良品站
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAddStation('custom')}>
                <Square className="w-4 h-4 mr-2" />
                自定義站
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onAddDisc}>
                <Circle className="w-4 h-4 mr-2" />
                轉盤
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onAddConveyor}>
                <ArrowRight className="w-4 h-4 mr-2" />
                輸送帶
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onAddFeeder}>
                <Box className="w-4 h-4 mr-2" />
                送料機
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Delete */}
          <Button
            variant="outline"
            size="sm"
            onClick={onDelete}
            disabled={!selectedElement}
            className="h-7 px-2 text-xs text-destructive hover:text-destructive"
          >
            <Trash2 className="w-3 h-3 mr-1" />
            刪除
          </Button>

          <div className="w-px h-6 bg-border" />
        </>
      )}

      {/* Zoom Controls */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" onClick={onZoomOut} className="h-7 w-7">
          <ZoomOut className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onZoomIn} className="h-7 w-7">
          <ZoomIn className="w-3 h-3" />
        </Button>
      </div>

      {/* Selection Info */}
      {selectedElement && mode === 'edit' && (
        <>
          <div className="w-px h-6 bg-border" />
          <span className="text-xs text-muted-foreground">
            已選擇: {selectedElement.type === 'station' && selectedElement.data.name}
            {selectedElement.type === 'disc' && '轉盤'}
            {selectedElement.type === 'conveyor' && '輸送帶'}
            {selectedElement.type === 'feeder' && selectedElement.data.name}
          </span>
        </>
      )}
    </div>
  );
};

export default MachineEditorToolbar;
