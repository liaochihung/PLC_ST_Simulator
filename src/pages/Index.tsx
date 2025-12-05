import React, { useState, useEffect } from 'react';
import CodeEditor from '@/components/CodeEditor';
import MachineVisualization from '@/components/MachineVisualization';
import VariableMonitor from '@/components/VariableMonitor';
import SimulatorControls from '@/components/SimulatorControls';
import { useSimulator } from '@/hooks/useSimulator';
import { Cpu, Code2, Activity, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample ST code for rotary indexing machine
const SAMPLE_CODE = `PROGRAM RotaryMachine
(* 圓盤分度機 - Rotary Indexing Machine *)
(* 6站點: 進料, 組裝1, 組裝2, 檢測, OK出料, NG出料 *)

VAR
    (* 輸入 *)
    StartButton : BOOL := FALSE;
    StopButton : BOOL := FALSE;
    FeederSensor : BOOL := FALSE;
    Station1Sensor : BOOL := FALSE;
    Station2Sensor : BOOL := FALSE;
    Station3Sensor : BOOL := FALSE;
    Station4Sensor : BOOL := FALSE;
    InspectionResult : BOOL := TRUE;
    
    (* 輸出 *)
    FeederOn : BOOL := FALSE;
    Indexing : BOOL := FALSE;
    Station1Active : BOOL := FALSE;
    Station2Active : BOOL := FALSE;
    Station3Active : BOOL := FALSE;
    Station4Active : BOOL := FALSE;
    OKOutput : BOOL := FALSE;
    NGOutput : BOOL := FALSE;
    
    (* 內部變數 *)
    MachineRunning : BOOL := FALSE;
    CurrentStation : INT := 1;
    CycleComplete : BOOL := FALSE;
    PartCount : INT := 0;
    OKCount : INT := 0;
    NGCount : INT := 0;
    
    (* 計時器 *)
    IndexTimer : TON;
    StationTimer : TON;
    FeederTimer : TON;
END_VAR

(* 主程序 *)

(* 啟動/停止控制 *)
IF StartButton AND NOT StopButton THEN
    MachineRunning := TRUE;
END_IF;

IF StopButton THEN
    MachineRunning := FALSE;
END_IF;

(* 機器運行邏輯 *)
IF MachineRunning THEN
    (* 震動送料機控制 *)
    FeederOn := TRUE;
    
    (* 站點序列控制 *)
    CASE CurrentStation OF
        1: (* 進料站 *)
            Station1Active := TRUE;
            Station2Active := FALSE;
            Station3Active := FALSE;
            Station4Active := FALSE;
            
            IF FeederSensor THEN
                PartCount := PartCount + 1;
                CurrentStation := 2;
            END_IF;
            
        2: (* 組裝站1 *)
            Station1Active := FALSE;
            Station2Active := TRUE;
            
            (* 模擬組裝動作 *)
            StationTimer(IN := TRUE, PT := T#500ms);
            IF StationTimer.Q THEN
                StationTimer(IN := FALSE, PT := T#500ms);
                CurrentStation := 3;
            END_IF;
            
        3: (* 組裝站2 *)
            Station2Active := FALSE;
            Station3Active := TRUE;
            
            StationTimer(IN := TRUE, PT := T#500ms);
            IF StationTimer.Q THEN
                StationTimer(IN := FALSE, PT := T#500ms);
                CurrentStation := 4;
            END_IF;
            
        4: (* 檢測站 *)
            Station3Active := FALSE;
            Station4Active := TRUE;
            
            StationTimer(IN := TRUE, PT := T#300ms);
            IF StationTimer.Q THEN
                StationTimer(IN := FALSE, PT := T#300ms);
                
                IF InspectionResult THEN
                    CurrentStation := 5;
                    OKCount := OKCount + 1;
                ELSE
                    CurrentStation := 6;
                    NGCount := NGCount + 1;
                END_IF;
            END_IF;
            
        5: (* OK出料 *)
            Station4Active := FALSE;
            OKOutput := TRUE;
            NGOutput := FALSE;
            
            IndexTimer(IN := TRUE, PT := T#200ms);
            IF IndexTimer.Q THEN
                IndexTimer(IN := FALSE, PT := T#200ms);
                OKOutput := FALSE;
                CurrentStation := 1;
                CycleComplete := TRUE;
            END_IF;
            
        6: (* NG出料 *)
            Station4Active := FALSE;
            OKOutput := FALSE;
            NGOutput := TRUE;
            
            IndexTimer(IN := TRUE, PT := T#200ms);
            IF IndexTimer.Q THEN
                IndexTimer(IN := FALSE, PT := T#200ms);
                NGOutput := FALSE;
                CurrentStation := 1;
                CycleComplete := TRUE;
            END_IF;
    END_CASE;
    
    (* 分度動作 *)
    Indexing := CurrentStation > 1 AND CurrentStation < 5;
    
ELSE
    (* 停止時重置輸出 *)
    FeederOn := FALSE;
    Indexing := FALSE;
    Station1Active := FALSE;
    Station2Active := FALSE;
    Station3Active := FALSE;
    Station4Active := FALSE;
    OKOutput := FALSE;
    NGOutput := FALSE;
END_IF;

END_PROGRAM`;

const Index: React.FC = () => {
  const {
    interpreter,
    isRunning,
    scanTime,
    cycleCount,
    error,
    stations,
    discAngle,
    feederActive,
    products,
    loadCode,
    start,
    stop,
    reset,
    step,
    setScanTime,
    setVariable,
  } = useSimulator();

  const [code, setCode] = useState(SAMPLE_CODE);
  const [activeTab, setActiveTab] = useState<'code' | 'visualization'>('code');

  // Load code into interpreter when it changes
  useEffect(() => {
    loadCode(code);
  }, [code, loadCode]);

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 bg-card border-b border-border">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Cpu className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">ST 模擬器</h1>
            <p className="text-xs text-muted-foreground">IEC 61131-3 結構化文本模擬</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>圓盤分度機模擬</span>
        </div>
      </header>

      {/* Controls */}
      <SimulatorControls
        isRunning={isRunning}
        scanTime={scanTime}
        cycleCount={cycleCount}
        onStart={start}
        onStop={stop}
        onReset={reset}
        onStep={step}
        onScanTimeChange={setScanTime}
      />

      {/* Error Display */}
      {error && (
        <div className="px-4 py-2 bg-destructive/10 border-b border-destructive/30 text-destructive text-sm">
          <span className="font-semibold">錯誤:</span> {error}
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Code Editor */}
        <div className="w-1/2 flex flex-col border-r border-border">
          <div className="panel-header">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-primary" />
              <span className="panel-title">ST 程式碼編輯器</span>
            </div>
          </div>
          <div className="flex-1 overflow-hidden p-2">
            <CodeEditor
              value={code}
              onChange={setCode}
              readOnly={isRunning}
            />
          </div>
        </div>

        {/* Right Panel - Split View */}
        <div className="w-1/2 flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab('visualization')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors",
                activeTab === 'visualization'
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Eye className="w-4 h-4" />
              機台視覺化
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors",
                activeTab === 'code'
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Activity className="w-4 h-4" />
              變數監控
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden">
            {activeTab === 'visualization' ? (
              <div className="h-full p-4">
                <MachineVisualization
                  stations={stations}
                  discAngle={discAngle}
                  feederActive={feederActive}
                  isRunning={isRunning}
                  products={products}
                />
              </div>
            ) : (
              <VariableMonitor
                variables={interpreter.state.variables}
                timers={interpreter.state.timers}
                counters={interpreter.state.counters}
                onVariableChange={setVariable}
              />
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-4 py-2 bg-card border-t border-border flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>掃描週期: {scanTime}ms</span>
          <span>|</span>
          <span>變數: {interpreter.state.variables.size}</span>
          <span>|</span>
          <span>計時器: {interpreter.state.timers.size}</span>
        </div>
        <span>IEC 61131-3 ST Simulator v1.0</span>
      </footer>
    </div>
  );
};

export default Index;
