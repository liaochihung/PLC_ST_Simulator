import React, { useState, useEffect } from 'react';
import CodeEditor from '@/components/CodeEditor';
import MachineEditor from '@/components/machine/MachineEditor';
import VariableMonitor from '@/components/VariableMonitor';
import SimulatorControls from '@/components/SimulatorControls';
import ProgramBlockTree from '@/components/ProgramBlockTree';
import { useSimulator } from '@/hooks/useSimulator';
import { useProgramBlocks } from '@/hooks/useProgramBlocks';
import { Cpu, Code2, Activity, Eye, PanelLeftClose, PanelLeft, PanelRightClose, PanelRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Index: React.FC = () => {
  const {
    interpreter, // Keep for debugging if needed, or remove if unused
    variables,
    timers,
    counters,
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

  const {
    project,
    getActiveBlock,
    selectBlock,
    addBlock,
    deleteBlock,
    toggleBlock,
    renameBlock,
    updateBlockCode,
    getCombinedCode,
  } = useProgramBlocks();

  const [activeTab, setActiveTab] = useState<'visualization' | 'variables'>('visualization');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [codeEditorVisible, setCodeEditorVisible] = useState(true);

  const activeBlock = getActiveBlock();

  // 當切換區塊或程式碼變更時，更新解譯器
  useEffect(() => {
    const combinedCode = getCombinedCode();
    loadCode(combinedCode);
  }, [project.blocks, getCombinedCode, loadCode]);

  // 處理程式碼變更
  const handleCodeChange = (newCode: string) => {
    if (activeBlock) {
      updateBlockCode(activeBlock.id, newCode);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 bg-card border-b border-border">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="h-8 w-8"
          >
            {sidebarOpen ? (
              <PanelLeftClose className="w-4 h-4" />
            ) : (
              <PanelLeft className="w-4 h-4" />
            )}
          </Button>
          <div className="p-2 bg-primary/10 rounded-lg">
            <Cpu className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-base font-semibold">ST 模擬器</h1>
            <p className="text-xs text-muted-foreground">IEC 61131-3 結構化文本</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="hidden md:inline">週期: {cycleCount}</span>
          <span>|</span>
          <span>{project.name}</span>
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
        {/* Left Sidebar - Program Block Tree */}
        <div
          className={cn(
            "border-r border-border transition-all duration-300 overflow-hidden",
            sidebarOpen ? "w-64" : "w-0"
          )}
        >
          {sidebarOpen && (
            <ProgramBlockTree
              project={project}
              onBlockSelect={selectBlock}
              onBlockAdd={addBlock}
              onBlockDelete={deleteBlock}
              onBlockToggle={toggleBlock}
              onBlockRename={renameBlock}
              isRunning={isRunning}
            />
          )}
        </div>

        {/* Center Panel - Code Editor */}
        {codeEditorVisible && (
          <div className="flex-1 flex flex-col border-r border-border min-w-0">
            <div className="panel-header flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-primary" />
                <span className="panel-title">
                  {activeBlock ? activeBlock.name : '請選擇區塊'}
                </span>
                {activeBlock?.type === 'scan' && activeBlock.scanInterval && (
                  <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                    {activeBlock.scanInterval}ms
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {activeBlock && (
                  <span className="text-xs text-muted-foreground">
                    {activeBlock.type === 'init' ? '初始化區塊' :
                      activeBlock.type === 'scan' ? '掃描區塊' :
                        activeBlock.type === 'subroutine' ? '子程式' : '功能塊'}
                  </span>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCodeEditorVisible(false)}
                  className="h-6 w-6"
                  title="隱藏程式碼編輯器"
                >
                  <PanelRightClose className="w-3 h-3" />
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden p-2">
              {activeBlock ? (
                <CodeEditor
                  value={activeBlock.code}
                  onChange={handleCodeChange}
                  readOnly={isRunning}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  <p>請從左側選擇一個程式區塊</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Show Code Editor Button (when hidden) */}
        {!codeEditorVisible && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCodeEditorVisible(true)}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <PanelRight className="w-4 h-4 mr-2" />
            顯示程式碼
          </Button>
        )}

        {/* Right Panel - Visualization / Variables */}
        <div className="w-[400px] flex flex-col min-w-0">
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
              機台
            </button>
            <button
              onClick={() => setActiveTab('variables')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors",
                activeTab === 'variables'
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Activity className="w-4 h-4" />
              變數
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden">
            {activeTab === 'visualization' ? (
              <MachineEditor
                discAngle={discAngle}
                feederActive={feederActive}
                isRunning={isRunning}
                products={products}
              />
            ) : (
              <VariableMonitor
                variables={variables}
                timers={timers}
                counters={counters}
                onVariableChange={setVariable}
              />
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-4 py-1.5 bg-card border-t border-border flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>掃描週期: {scanTime}ms</span>
          <span>|</span>
          <span>變數: {variables.size}</span>
          <span>|</span>
          <span>計時器: {timers.size}</span>
        </div>
        <span>IEC 61131-3 ST Simulator v1.0</span>
      </footer>
    </div>
  );
};

export default Index;
