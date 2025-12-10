import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  MousePointer2,
  Hand,
  Plus,
  Trash2,
  ZoomIn,
  ZoomOut,
  Circle,
  Square,
  ArrowRight,
  Box,
  Play,
  Pencil,
  Grid3x3,
  Magnet,
  Copy,
  Scissors,
  Clipboard,
  CopyPlus,
  Undo,
  Redo,
  Group,
  Ungroup,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ArrowUpToLine,
  AlignVerticalJustifyCenter, // Middle
  ArrowDownToLine,
  BringToFront,
  SendToBack,
  Layers
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
  selectedElements: MachineElement[];
  onDelete: () => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  isPanMode: boolean;
  onPanModeChange: (isPanMode: boolean) => void;
  onAddStation: (type: 'feed' | 'assembly' | 'ok' | 'ng' | 'custom') => void;
  onAddDisc: () => void;
  onAddConveyor: () => void;
  onAddFeeder: () => void;
  isRunning: boolean;
  // Grid controls
  gridVisible: boolean;
  onToggleGrid: () => void;
  snapToGrid: boolean;
  onToggleSnap: () => void;
  gridSize: number;
  onGridSizeChange: (size: number) => void;
  // Clipboard
  hasClipboard: boolean;
  onCopy: () => void;
  onCut: () => void;
  onPaste: () => void;
  onDuplicate: () => void;
  // History
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  // Grouping & Alignment
  onGroup: () => void;
  onUngroup: () => void;
  onAlign: (align: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => void;
  onReorder: (action: 'front' | 'back' | 'forward' | 'backward') => void;
}

const MachineEditorToolbar: React.FC<MachineEditorToolbarProps> = ({
  mode,
  onModeChange,
  selectedElements,
  onDelete,
  zoom,
  onZoomChange,
  onZoomIn,
  onZoomOut,
  isPanMode,
  onPanModeChange,
  onAddStation,
  onAddDisc,
  onAddConveyor,
  onAddFeeder,
  isRunning,
  gridVisible,
  onToggleGrid,
  snapToGrid,
  onToggleSnap,
  gridSize,
  onGridSizeChange,
  hasClipboard,
  onCopy,
  onCut,
  onPaste,
  onDuplicate,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onGroup,
  onUngroup,
  onAlign,
  onReorder,
}) => {
  const hasSelection = selectedElements.length > 0;

  return (
    <div className="flex items-center gap-2 p-2 bg-card border-b border-border h-12 flex-nowrap overflow-x-auto scrollbar-hide">
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
           Edit
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
          View
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
                Add
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => onAddStation('feed')}>
                <Square className="w-4 h-4 mr-2 text-station-feed" />
                Feed Station
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAddStation('assembly')}>
                <Square className="w-4 h-4 mr-2 text-station-assembly" />
                Assembly Station
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAddStation('ok')}>
                <Square className="w-4 h-4 mr-2 text-station-ok" />
                OK Station
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAddStation('ng')}>
                <Square className="w-4 h-4 mr-2 text-station-ng" />
                NG Station
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAddStation('custom')}>
                <Square className="w-4 h-4 mr-2" />
                Custom Station
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onAddDisc}>
                <Circle className="w-4 h-4 mr-2" />
                Rotary Disc
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onAddConveyor}>
                <ArrowRight className="w-4 h-4 mr-2" />
                Conveyor
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onAddFeeder}>
                <Box className="w-4 h-4 mr-2" />
                Feeder
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Delete */}
          <Button
            variant="outline"
            size="sm"
            onClick={onDelete}
            disabled={!hasSelection}
            className="h-7 px-2 text-xs text-destructive hover:text-destructive"
          >
            <Trash2 className="w-3 h-3 mr-1" />
            Delete
          </Button>

          <div className="w-px h-6 bg-border" />
        </>
      )}

      {/* Grid Controls (Edit mode only) */}
      {mode === 'edit' && (
        <>
          <div className="flex bg-muted rounded-md p-0.5">
            <Button
              variant={gridVisible ? "default" : "outline"}
              size="sm"
              onClick={onToggleGrid}
              className="h-7 px-2 text-xs"
              title="Show/Hide Grid"
            >
              <Grid3x3 className="w-3 h-3" />
            </Button>
            <Button
              variant={snapToGrid ? "default" : "outline"}
              size="sm"
              onClick={onToggleSnap}
              className="h-7 px-2 text-xs"
              title="Snap to Grid"
            >
              <Magnet className="w-3 h-3" />
            </Button>
          </div>

          {/* Grid Size Selector */}
          {gridVisible && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-7 px-2 text-xs w-[4.5rem] font-mono justify-between">
                  {gridSize}px
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onGridSizeChange(10)}>10px</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onGridSizeChange(20)}>20px</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onGridSizeChange(50)}>50px</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onGridSizeChange(100)}>100px</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <div className="w-px h-6 bg-border" />
        </>
      )}

      {/* Clipboard Operations (Edit mode only) */}
      {mode === 'edit' && (
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={onCopy}
            disabled={!hasSelection}
            className="h-7 px-2 text-xs"
            title="Copy (Cmd+C)"
          >
            <Copy className="w-3 h-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onCut}
            disabled={!hasSelection}
            className="h-7 px-2 text-xs"
            title="Cut (Cmd+X)"
          >
            <Scissors className="w-3 h-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onPaste}
            disabled={!hasClipboard}
            className="h-7 px-2 text-xs"
            title="Paste (Cmd+V)"
          >
            <Clipboard className="w-3 h-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onDuplicate}
            disabled={!hasSelection}
            className="h-7 px-2 text-xs"
            title="Duplicate (Cmd+D)"
          >
            <CopyPlus className="w-3 h-3" />
          </Button>

          <div className="w-px h-6 bg-border" />
        </>
      )}

      {/* Group & Align (Edit mode only) */}
      {mode === 'edit' && hasSelection && (
        <>
          <Button variant="outline" size="sm" onClick={onGroup} className="h-7 px-2 text-xs" title="Group">
            <Group className="w-3 h-3" />
          </Button>
          <Button variant="outline" size="sm" onClick={onUngroup} className="h-7 px-2 text-xs" title="Ungroup">
            <Ungroup className="w-3 h-3" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 px-2 text-xs" title="Align">
                <AlignLeft className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onAlign('left')}><AlignLeft className="w-4 h-4 mr-2" />Align Left</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAlign('center')}><AlignCenter className="w-4 h-4 mr-2" />Align Center</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAlign('right')}><AlignRight className="w-4 h-4 mr-2" />Align Right</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAlign('top')}><ArrowUpToLine className="w-4 h-4 mr-2" />Align Top</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAlign('middle')}><AlignVerticalJustifyCenter className="w-4 h-4 mr-2" />Align Middle</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAlign('bottom')}><ArrowDownToLine className="w-4 h-4 mr-2" />Align Bottom</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 px-2 text-xs" title="Order">
                <Layers className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onReorder('front')}><BringToFront className="w-4 h-4 mr-2" />Bring to Front</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onReorder('back')}><SendToBack className="w-4 h-4 mr-2" />Send to Back</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="w-px h-6 bg-border" />
        </>
      )}

      {/* History Controls */}
      <Button
        variant="outline"
        size="sm"
        onClick={onUndo}
        disabled={!canUndo}
        className="h-7 px-2 text-xs"
        title="Undo (Cmd+Z)"
      >
        <Undo className="w-3 h-3" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onRedo}
        disabled={!canRedo}
        className="h-7 px-2 text-xs"
        title="Redo (Cmd+Shift+Z)"
      >
        <Redo className="w-3 h-3" />
      </Button>

      <div className="w-px h-6 bg-border" />

      {/* Cursor/Hand Mode Toggle */}
      <div className="flex items-center bg-muted rounded-md p-0.5">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPanModeChange(false)}
          className={cn(
            "h-7 px-2 text-xs",
            !isPanMode && "bg-background shadow-sm"
          )}
          title="Select Mode (V)"
        >
          <MousePointer2 className="w-3 h-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPanModeChange(true)}
          className={cn(
            "h-7 px-2 text-xs",
            isPanMode && "bg-background shadow-sm"
          )}
          title="Pan Mode (H)"
        >
          <Hand className="w-3 h-3" />
        </Button>
      </div>

      <div className="w-px h-6 bg-border" />

      {/* Zoom Controls */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onZoomOut} className="h-7 w-7" title="Zoom Out">
          <ZoomOut className="w-3 h-3" />
        </Button>
        <div className="flex items-center gap-2 min-w-[120px]">
          <Slider
            value={[zoom * 100]}
            onValueChange={(values) => onZoomChange(values[0] / 100)}
            min={50}
            max={200}
            step={10}
            className="w-20"
          />
          <span className="text-xs font-mono text-muted-foreground w-10 text-right">
            {Math.round(zoom * 100)}%
          </span>
        </div>
        <Button variant="ghost" size="icon" onClick={onZoomIn} className="h-7 w-7" title="Zoom In">
          <ZoomIn className="w-3 h-3" />
        </Button>
      </div>

      {/* Selection Info */}
      {hasSelection && mode === 'edit' && (
        <>
          <div className="w-px h-6 bg-border" />
          <span className="text-xs text-muted-foreground">
            {selectedElements.length === 1 ? (
              <>
                Selected: {selectedElements[0].type === 'station' && selectedElements[0].data.name}
                {selectedElements[0].type === 'disc' && 'Rotary Disc'}
                {selectedElements[0].type === 'conveyor' && 'Conveyor'}
                {selectedElements[0].type === 'feeder' && selectedElements[0].data.name}
                {selectedElements[0].type === 'shape' && `Shape (${selectedElements[0].data.type})`}
                {selectedElements[0].type === 'group' && 'Group'}
              </>
            ) : (
              `${selectedElements.length} items selected`
            )}
          </span>
        </>
      )}
    </div>
  );
};

export default MachineEditorToolbar;
