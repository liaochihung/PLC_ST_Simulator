import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeEditor from '@/components/CodeEditor';
import MachineEditor from '@/components/machine/MachineEditor';
import VariableMonitor from '@/components/VariableMonitor';
import ProgramBlockTree from '@/components/ProgramBlockTree';
import { useSimulator } from '@/hooks/useSimulator';
import { useProgramBlocks } from '@/hooks/useProgramBlocks';
import { useMachineEditor } from '@/hooks/useMachineEditor';
import { useIOBinding } from '@/hooks/useIOBinding';
import { Cpu, Code2, Activity, Eye, PanelLeftClose, PanelLeft, BookOpen, Save, Loader2, FolderOpen, Play, Square, StepForward, RotateCcw } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LibraryBrowser } from '@/components/LibraryBrowser';
import { ProjectListDialog } from '@/components/ProjectListDialog';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { MainLayout } from '@/components/layout/MainLayout';
import { Separator } from "@/components/ui/separator";

const Index: React.FC = () => {
  const {
    interpreter,
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
    duplicateBlock,
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
  const { layout, loadLayout } = useMachineEditor();

  // Load layout when project layout changes (persistence restore)
  useEffect(() => {
    if (project.visualDesign?.layout && project.visualDesign.layout.id !== layout.id) {
      loadLayout(project.visualDesign.layout);
    }
  }, [project.visualDesign, loadLayout]);

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

  const LeftPanelContent = (
    <div className="h-full flex flex-col bg-background">
      <div className="border-b px-3 py-2 bg-muted/20 font-medium text-xs flex items-center gap-2 text-muted-foreground">
        <FolderOpen className="w-3.5 h-3.5" />
        Explorer
      </div>
      <div className="flex-1 overflow-hidden">
        <ProgramBlockTree
          project={project}
          onBlockSelect={selectBlock}
          onBlockAdd={addBlock}
          onBlockDelete={deleteBlock}
          onBlockToggle={toggleBlock}
          onBlockRename={renameBlock}
          onBlockDuplicate={duplicateBlock}
          isRunning={isRunning}
        />
      </div>
    </div>
  );

  const CenterPanelContent = (
    <ResizablePanelGroup direction="horizontal">
      {codeEditorVisible && (
        <>
          <ResizablePanel defaultSize={65} minSize={30}>
            {/* Center Panel - Code Editor */}
            <div className="h-full flex flex-col min-w-0">
              <div className="panel-header flex items-center justify-between h-10 px-2 bg-muted/10 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Code2 className="w-4 h-4 text-primary" />
                    <span className="font-medium text-foreground">
                      {activeBlock ? activeBlock.name : 'No Selection'}
                    </span>
                  </div>
                  {activeBlock?.type === 'scan' && activeBlock.scanInterval && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-mono">
                      {activeBlock.scanInterval}ms
                    </span>
                  )}
                </div>

                {/* Simulation Controls - Relocated here */}
                <div className="flex items-center gap-1">
                  <div className="h-4 w-px bg-border mx-1" />
                  {!isRunning ? (
                    <Button
                      onClick={start}
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-green-600 hover:text-green-700 hover:bg-green-500/10 gap-1.5"
                      title="Run Program"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span className="text-xs font-semibold">Run</span>
                    </Button>
                  ) : (
                    <Button
                      onClick={stop}
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-red-600 hover:text-red-700 hover:bg-red-500/10 gap-1.5"
                      title="Stop Program"
                    >
                      <Square className="w-3.5 h-3.5 fill-current" />
                      <span className="text-xs font-semibold">Stop</span>
                    </Button>
                  )}

                  <Button
                    onClick={step}
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    disabled={isRunning}
                    title="Step Over"
                  >
                    <StepForward className="w-3.5 h-3.5" />
                  </Button>

                  <Button
                    onClick={reset}
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    title="Reset Simulation"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
              <div className="flex-1 overflow-hidden p-0 relative">
                {activeBlock ? (
                  <CodeEditor
                    value={activeBlock.code}
                    onChange={handleCodeChange}
                    readOnly={isRunning}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    <p>Please select a program block from the left</p>
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
        <div className="h-full flex flex-col min-w-0 bg-background">
          {/* Tabs */}
          <div className="flex border-b border-border bg-muted/10">
            <button
              onClick={() => setActiveTab('visualization')}
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-xs font-medium transition-colors border-r border-border/50",
                activeTab === 'visualization'
                  ? "text-primary bg-background border-b-2 border-b-primary -mb-px"
                  : "text-muted-foreground hover:bg-muted/50"
              )}
            >
              <Eye className="w-3.5 h-3.5" />
              Machine
            </button>
            <button
              onClick={() => setActiveTab('variables')}
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-xs font-medium transition-colors border-r border-border/50",
                activeTab === 'variables'
                  ? "text-primary bg-background border-b-2 border-b-primary -mb-px"
                  : "text-muted-foreground hover:bg-muted/50"
              )}
            >
              <Activity className="w-3.5 h-3.5" />
              Variables
            </button>
            <button
              onClick={() => setActiveTab('library')}
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-xs font-medium transition-colors border-r border-border/50",
                activeTab === 'library'
                  ? "text-primary bg-background border-b-2 border-b-primary -mb-px"
                  : "text-muted-foreground hover:bg-muted/50"
              )}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Library
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden relative">
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
                const exists = project.blocks.some(b => b.name === fb.name);
                if (exists) {
                  alert(`Block ${fb.name} already exists!`);
                  return;
                }
                addBlock('function-block');
                const newBlockId = `block_${Date.now()}`;
                setTimeout(() => {
                  renameBlock(newBlockId, fb.name);
                  updateBlockCode(newBlockId, fb.sourceCode);
                }, 0);
              }} />
            )}
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Header */}
      <header className="h-12 flex items-center justify-between px-4 bg-background border-b border-border">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-primary/10 rounded-md">
              <Cpu className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-none tracking-tight">ST Simulator</h1>
              <p className="text-[10px] text-muted-foreground font-mono mt-0.5">IEC 61131-3</p>
            </div>
          </div>

          <div className="h-5 w-px bg-border mx-2" />

          {/* Project Actions - Toolbar Style */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLoadDialogOpen(true)}
              className="h-8 text-xs gap-2"
            >
              <FolderOpen className="w-3.5 h-3.5" />
              Open
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => saveProject(layout)}
              disabled={isSaving}
              className="h-8 text-xs gap-2"
            >
              {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              Save
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          {/* Status Indicators */}
          <div className="flex items-center gap-3 px-3 py-1.5 bg-muted/30 rounded-full border border-border/50">
            <div className="flex items-center gap-1.5">
              <div className={cn("w-2 h-2 rounded-full", isRunning ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-zinc-400")} />
              <span className={cn("font-medium", isRunning ? "text-green-600" : "text-zinc-500")}>
                {isRunning ? "RUNNING" : "STOPPED"}
              </span>
            </div>
            <div className="w-px h-3 bg-border" />
            <span className="text-muted-foreground">SCAN: <span className="text-foreground font-semibold">{scanTime}</span>ms</span>
            <div className="w-px h-3 bg-border" />
            <span className="text-muted-foreground">CYCLE: <span className="text-foreground font-semibold">{cycleCount}</span></span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="opacity-50">|</span>
            <span>{project.name}</span>
          </div>

          <ThemeToggle />
        </div>

        <ProjectListDialog
          open={loadDialogOpen}
          onOpenChange={setLoadDialogOpen}
          onLoad={loadProject}
        />
      </header>

      {/* Error Display */}
      {error && (
        <div className="px-4 py-1.5 bg-red-500/10 border-b border-red-500/20 text-red-600 text-xs flex items-center justify-center">
          <span className="font-semibold mr-2">Error:</span> {error}
        </div>
      )}

      {/* Main Content */}
      <MainLayout
        leftPanel={LeftPanelContent}
        centerPanel={CenterPanelContent}
        rightPanel={null} // Removed Property Panel from here
      />

      {/* Footer */}
      <footer className="h-6 px-3 bg-muted/20 border-t border-border flex items-center justify-between text-[10px] text-muted-foreground">
        <div className="flex items-center gap-4 font-mono">
          <span>VARs: {variables.size}</span>
          <span>TIMERs: {timers.size}</span>
          <div className="flex items-center gap-1 ml-2">
            <span>Cycle Time:</span>
            <select
              value={scanTime}
              onChange={e => setScanTime(Number(e.target.value))}
              className="bg-transparent border-none p-0 h-auto text-[10px] focus:ring-0 cursor-pointer hover:text-foreground"
            >
              <option value={10}>10ms</option>
              <option value={50}>50ms</option>
              <option value={100}>100ms</option>
              <option value={200}>200ms</option>
              <option value={500}>500ms</option>
              <option value={1000}>1000ms</option>
            </select>
          </div>
        </div>
        <span>v1.0.0</span>
      </footer>
    </div>
  );
};

export default Index;
