import React, { useMemo } from 'react';
// import MachineCanvas from './MachineCanvas';
import KonvaRenderer from '@/lib/renderers/konva/KonvaRenderer';
import MachineEditorToolbar from './MachineEditorToolbar';
import MachinePropertyPanel from './MachinePropertyPanel';
import { useMachineEditor } from '@/hooks/useMachineEditor';
import type { MachineStation, MachineElement } from '@/types/machine-editor';
import type { MachineRuntimeState } from '@/types/renderer';

interface MachineEditorProps {
  // Runtime props from simulator
  discAngle?: number;
  feederActive?: boolean;
  isRunning?: boolean;
  products?: { stationId: number; status: 'pending' | 'ok' | 'ng' }[];
  stationStates?: Map<string, Record<string, any>>; // Updated to match BindingResult
}

const MachineEditor: React.FC<MachineEditorProps> = ({
  discAngle = 0,
  feederActive = false,
  isRunning = false,
  products = [],
  stationStates = new Map(),
}) => {
  const {
    layout,
    mode,
    setMode,
    selectedElement,
    selectElement,
    zoom,
    setZoom,
    addStation,
    updateStation,
    addDisc,
    updateDisc,
    addConveyor,
    updateConveyor,
    addFeeder,
    updateFeeder,
    moveElement,
    deleteSelectedElement,
  } = useMachineEditor();

  // Prepare runtime state for renderer (for future Konva use)
  const runtimeState: MachineRuntimeState = useMemo(() => {
    const discAngles = new Map<string, number>();
    const feederStates = new Map<string, boolean>();
    const conveyorStates = new Map<string, boolean>();

    // Map disc angles
    layout.discs.forEach(disc => {
      discAngles.set(disc.id, discAngle);
    });

    // Map feeder states
    layout.feeders.forEach(feeder => {
      feederStates.set(feeder.id, feederActive);
    });

    // Map conveyor states (all inactive for now)
    layout.conveyors.forEach(conveyor => {
      conveyorStates.set(conveyor.id, false);
    });

    return {
      discAngles,
      stationStates,
      feederStates,
      conveyorStates,
      products,
      isRunning,
    };
  }, [discAngle, feederActive, isRunning, products, stationStates, layout]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));

  const handleAddStation = (type: MachineStation['type']) => {
    addStation({
      name: type === 'feed' ? '入料' : type === 'assembly' ? '組裝' : type === 'ok' ? '良品' : type === 'ng' ? '不良' : '自定義',
      type,
      x: layout.width / 2,
      y: layout.height / 2,
      angle: 0,
      width: 50,
      height: 40,
    });
  };

  const handleAddDisc = () => {
    addDisc({
      x: layout.width / 2,
      y: layout.height / 2,
      radius: 80,
      slots: 4,
    });
  };

  const handleAddConveyor = () => {
    addConveyor({
      type: 'custom',
      startX: layout.width / 2 - 50,
      startY: layout.height / 2,
      endX: layout.width / 2 + 50,
      endY: layout.height / 2,
      width: 20,
    });
  };

  const handleAddFeeder = () => {
    addFeeder({
      name: '送料機',
      x: 50,
      y: layout.height / 2,
      width: 60,
      height: 80,
    });
  };

  const handlePropertyUpdate = (updates: Record<string, unknown>) => {
    if (!selectedElement) return;

    switch (selectedElement.type) {
      case 'station':
        updateStation(selectedElement.data.id, updates as Partial<MachineStation>);
        break;
      case 'disc':
        updateDisc(selectedElement.data.id, updates);
        break;
      case 'conveyor':
        updateConveyor(selectedElement.data.id, updates);
        break;
      case 'feeder':
        updateFeeder(selectedElement.data.id, updates);
        break;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <MachineEditorToolbar
        mode={mode}
        onModeChange={setMode}
        selectedElement={selectedElement}
        onDelete={deleteSelectedElement}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onAddStation={handleAddStation}
        onAddDisc={handleAddDisc}
        onAddConveyor={handleAddConveyor}
        onAddFeeder={handleAddFeeder}
        isRunning={isRunning}
      />

      <div className="flex-1 relative overflow-hidden p-2">
        <div className="w-full h-full flex items-center justify-center">
          {/* Using Konva renderer */}
          <KonvaRenderer
            layout={layout}
            state={runtimeState}
            mode={mode}
            zoom={zoom}
            panOffset={{ x: 0, y: 0 }}
            selectedElement={selectedElement}
            onSelectElement={selectElement}
            onMoveElement={moveElement}
          />
          {/* SVG fallback (commented out)
          <MachineCanvas
            layout={layout}
            mode={mode}
            selectedElement={selectedElement}
            onSelectElement={selectElement}
            onMoveElement={moveElement}
            zoom={zoom}
            panOffset={{ x: 0, y: 0 }}
            discAngle={discAngle}
            feederActive={feederActive}
            isRunning={isRunning}
            products={products}
            stationStates={stationStates}
          />
          */}
        </div>

        {/* Property Panel */}
        {selectedElement && mode === 'edit' && (
          <MachinePropertyPanel
            element={selectedElement}
            onUpdate={handlePropertyUpdate}
            onClose={() => selectElement(null)}
          />
        )}
      </div>
    </div>
  );
};

export default MachineEditor;
