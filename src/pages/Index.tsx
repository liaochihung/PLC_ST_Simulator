import React, { useState, useEffect } from 'react';
import CodeEditor from '@/components/CodeEditor';
import MachineEditor from '@/components/machine/MachineEditor';
import VariableMonitor from '@/components/VariableMonitor';
import SimulatorControls from '@/components/SimulatorControls';
import ProgramBlockTree from '@/components/ProgramBlockTree';
import { useSimulator } from '@/hooks/useSimulator';
import { useProgramBlocks } from '@/hooks/useProgramBlocks';
import { useMachineEditor } from '@/hooks/useMachineEditor';
import { useIOBinding } from '@/hooks/useIOBinding';
import { Cpu, Code2, Activity, Eye, PanelLeftClose, PanelLeft, BookOpen, Save, Loader2, FolderOpen } from 'lucide-react';
import { LibraryBrowser } from '@/components/LibraryBrowser';
import { ProjectListDialog } from '@/components/ProjectListDialog';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

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
    saveProject,
    loadProject,
    isSaving
  } = useProgramBlocks();

  const [activeTab, setActiveTab] = useState<'visualization' | 'variables' | 'library'>('visualization');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [codeEditorVisible, setCodeEditorVisible] = useState(true);
  const [loadDialogOpen, setLoadDialogOpen] = useState(false);

  // Machine Editor for layout management
  const { layout } = useMachineEditor();

  // I/O Binding - automatically bind PLC variables to machine visualization
  const bindingResult = useIOBinding(interpreter, layout);

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
          {/* Project Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => saveProject()}
              disabled={isSaving}
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
              Save
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLoadDialogOpen(true)}
            >
              <FolderOpen className="w-4 h-4 mr-2" />
              Open
            </Button>

            <ProjectListDialog
              open={loadDialogOpen}
              onOpenChange={setLoadDialogOpen}
              onLoad={loadProject}
            />
          </div>
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
        codeEditorVisible={codeEditorVisible}
        onCodeEditorToggle={() => setCodeEditorVisible(!codeEditorVisible)}
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

        {/* Resizable Content Area */}
        <div className="flex-1 overflow-hidden">
          <ResizablePanelGroup direction="horizontal">
            {codeEditorVisible && (
              <>
                <ResizablePanel defaultSize={65} minSize={30}>
                  {/* Center Panel - Code Editor */}
                  <div className="h-full flex flex-col min-w-0">
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
                </ResizablePanel>
                <ResizableHandle withHandle />
              </>
            )}

            <ResizablePanel defaultSize={codeEditorVisible ? 35 : 100} minSize={20}>
              {/* Right Panel - Visualization / Variables */}
              <div className="h-full flex flex-col min-w-0">
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
                  <button
                    onClick={() => setActiveTab('library')}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors",
                      activeTab === 'library'
                        ? "text-primary border-b-2 border-primary bg-primary/5"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <BookOpen className="w-4 h-4" />
                    Library
                  </button>
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-hidden">
                  {activeTab === 'visualization' && (
                    <MachineEditor
                      discAngle={bindingResult.discAngles.get('d1') ?? discAngle}
                      feederActive={bindingResult.feederStates.get('f1') ?? feederActive}
                      isRunning={isRunning}
                      products={products}
                      stationStates={bindingResult.stationStates}
                    />
                  )}
                  {activeTab === 'variables' && (
                    <VariableMonitor
                      variables={variables}
                      timers={timers}
                      counters={counters}
                      onVariableChange={setVariable}
                    />
                  )}
                  {activeTab === 'library' && (
                    <LibraryBrowser onImport={(fb) => {
                      // Check if block already exists
                      const exists = project.blocks.some(b => b.name === fb.name);
                      if (exists) {
                        alert(`Block ${fb.name} already exists!`);
                        return;
                      }

                      // Add the function block
                      addBlock('function-block');

                      // Find the newly added block (last one) and update its code
                      const newBlockId = `block_${Date.now()}`;
                      setTimeout(() => {
                        renameBlock(newBlockId, fb.name);
                        updateBlockCode(newBlockId, fb.sourceCode);
                      }, 0);

                      // Optional: Switch to the new block or notify
                      console.log(`Imported ${fb.name}`);
                    }} />
                  )}
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
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
