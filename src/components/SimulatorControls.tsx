import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Square, RotateCcw, StepForward, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SimulatorControlsProps {
  isRunning: boolean;
  scanTime: number;
  cycleCount: number;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onStep: () => void;
  onScanTimeChange: (time: number) => void;
}

const SimulatorControls: React.FC<SimulatorControlsProps> = ({
  isRunning,
  scanTime,
  cycleCount,
  onStart,
  onStop,
  onReset,
  onStep,
  onScanTimeChange
}) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-card border-b border-border">
      {/* Main Controls */}
      <div className="flex items-center gap-2">
        {!isRunning ? (
          <Button
            onClick={onStart}
            variant="default"
            size="sm"
            className="gap-2 bg-success hover:bg-success/90 text-success-foreground"
          >
            <Play className="w-4 h-4" />
            執行
          </Button>
        ) : (
          <Button
            onClick={onStop}
            variant="default"
            size="sm"
            className="gap-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          >
            <Square className="w-4 h-4" />
            停止
          </Button>
        )}
        
        <Button
          onClick={onStep}
          variant="secondary"
          size="sm"
          className="gap-2"
          disabled={isRunning}
        >
          <StepForward className="w-4 h-4" />
          單步
        </Button>
        
        <Button
          onClick={onReset}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          重置
        </Button>
      </div>

      <div className="h-8 w-px bg-border" />

      {/* Scan Time Control */}
      <div className="flex items-center gap-2">
        <Settings className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">掃描週期:</span>
        <select
          value={scanTime}
          onChange={(e) => onScanTimeChange(Number(e.target.value))}
          className="bg-input text-foreground text-sm px-2 py-1 rounded border border-border focus:outline-none focus:ring-1 focus:ring-ring"
        >
          <option value={10}>10ms</option>
          <option value={50}>50ms</option>
          <option value={100}>100ms</option>
          <option value={200}>200ms</option>
          <option value={500}>500ms</option>
          <option value={1000}>1000ms</option>
        </select>
      </div>

      <div className="h-8 w-px bg-border" />

      {/* Status Display */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className={cn(
            "led",
            isRunning ? "led-on" : "led-off"
          )} />
          <span className="text-sm">
            {isRunning ? '運行中' : '已停止'}
          </span>
        </div>
        
        <div className="text-sm text-muted-foreground">
          週期: <span className="font-mono text-primary">{cycleCount}</span>
        </div>
      </div>
    </div>
  );
};

export default SimulatorControls;
