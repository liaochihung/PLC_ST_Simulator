import React from 'react';
import { Variable, Timer, Counter } from '@/lib/st-parser';
import { cn } from '@/lib/utils';

interface VariableMonitorProps {
  variables: Map<string, Variable>;
  timers: Map<string, Timer>;
  counters: Map<string, Counter>;
  onVariableChange?: (name: string, value: any) => void;
}

const VariableMonitor: React.FC<VariableMonitorProps> = ({
  variables,
  timers,
  counters,
  onVariableChange
}) => {
  const formatValue = (value: any, type: string): string => {
    if (type === 'BOOL') return value ? 'TRUE' : 'FALSE';
    if (type === 'TIME') return `${value}ms`;
    if (type === 'REAL' || type === 'LREAL') return value.toFixed(2);
    return String(value);
  };

  const toggleBool = (name: string, currentValue: boolean) => {
    if (onVariableChange) {
      onVariableChange(name, !currentValue);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-auto custom-scrollbar space-y-4 p-4">
        {/* Variables */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            變數 Variables
          </h4>
          <div className="space-y-1">
            {Array.from(variables.values()).map(variable => (
              <div
                key={variable.name}
                className="flex items-center justify-between py-1.5 px-2 bg-muted/30 rounded text-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground font-mono text-xs">
                    {variable.type}
                  </span>
                  <span className="font-medium">{variable.name}</span>
                  {variable.address && (
                    <span className="text-xs text-primary/70">@{variable.address}</span>
                  )}
                </div>
                
                {variable.type === 'BOOL' ? (
                  <button
                    onClick={() => toggleBool(variable.name, variable.value)}
                    className={cn(
                      "px-3 py-0.5 rounded text-xs font-semibold transition-colors",
                      variable.value
                        ? "bg-success text-success-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    {variable.value ? 'TRUE' : 'FALSE'}
                  </button>
                ) : (
                  <span className="font-mono text-primary">
                    {formatValue(variable.value, variable.type)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Timers */}
        {timers.size > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              計時器 Timers
            </h4>
            <div className="space-y-2">
              {Array.from(timers.values()).map(timer => (
                <div
                  key={timer.name}
                  className="p-2 bg-muted/30 rounded"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{timer.name}</span>
                    <div className={cn(
                      "led",
                      timer.Q ? "led-on" : "led-off"
                    )} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">IN:</span>
                      <span className={cn(
                        timer.IN ? "text-success" : "text-muted-foreground"
                      )}>
                        {timer.IN ? 'TRUE' : 'FALSE'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Q:</span>
                      <span className={cn(
                        timer.Q ? "text-success" : "text-muted-foreground"
                      )}>
                        {timer.Q ? 'TRUE' : 'FALSE'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">PT:</span>
                      <span className="font-mono text-primary">{timer.PT}ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ET:</span>
                      <span className="font-mono text-primary">{timer.ET}ms</span>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-100"
                      style={{ width: `${timer.PT > 0 ? (timer.ET / timer.PT) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Counters */}
        {counters.size > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              計數器 Counters
            </h4>
            <div className="space-y-2">
              {Array.from(counters.values()).map(counter => (
                <div
                  key={counter.name}
                  className="p-2 bg-muted/30 rounded"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{counter.name}</span>
                    <div className={cn(
                      "led",
                      counter.Q ? "led-on" : "led-off"
                    )} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">PV:</span>
                      <span className="font-mono text-primary">{counter.PV}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">CV:</span>
                      <span className="font-mono text-primary">{counter.CV}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VariableMonitor;
