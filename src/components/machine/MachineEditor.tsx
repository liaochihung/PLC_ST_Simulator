import React, { useMemo, useEffect } from 'react';
// import MachineCanvas from './MachineCanvas';
import KonvaRenderer from '@/lib/renderers/konva/KonvaRenderer';
import MachineEditorToolbar from './MachineEditorToolbar';
import MachinePropertyPanel from './MachinePropertyPanel';
// import ComponentPalette from './ComponentPalette';
import { useMachineEditor } from '@/hooks/useMachineEditor';
import type { MachineStation, MachineElement } from '@/types/machine-editor';
import type { MachineRuntimeState } from '@/types/renderer';
import MachineToolbox from './MachineToolbox';

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
    selectedElements,
    selectElement,
    selectElements,
    zoom,
    setZoom,
    panOffset,
    setPanOffset,
    isPanMode,
    setIsPanMode,
    // Grid
    gridVisible,
    setGridVisible,
    snapToGrid,
    setSnapToGrid,
    gridSize,
    setGridSize,
    // CRUD operations
    addStation,
    snapToGridValue,
    updateStation,
    addDisc,
    updateDisc,
    addConveyor,
    updateConveyor,
    addFeeder,
    updateFeeder,
    addShape,
    updateShape,
    moveElement,
    deleteSelectedElements,
    // Clipboard
    clipboard,
    copyElement,
    cutElement,
    pasteElement,
    duplicateElement,
    // History
    canUndo,
    canRedo,
    undo,
    redo,
    // Grouping
    groupSelectedElements,
    ungroupSelectedElements,
    alignSelectedElements,
    reorderSelectedElements
  } = useMachineEditor();

  const selectedElement = selectedElements.length === 1 ? selectedElements[0] : null;

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
      name: type === 'feed' ? 'Feed' : type === 'assembly' ? 'Assembly' : type === 'ok' ? 'OK' : type === 'ng' ? 'NG' : 'Custom',
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
      name: 'Feeder',
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
      case 'shape':
        updateShape(selectedElement.data.id, updates);
        break;
    }
  };

  const handleUpdateElement = (id: string, type: string, updates: any) => {
    // Apply snapping to numeric properties if snapToGrid is enabled
    // Note: Use snapToGridValue from hook which respects the snapToGrid state
    const snappedUpdates: any = { ...updates };

    if (snapToGrid) {
      ['x', 'y', 'width', 'height', 'radius', 'startX', 'startY', 'endX', 'endY'].forEach(prop => {
        if (typeof snappedUpdates[prop] === 'number') {
          snappedUpdates[prop] = snapToGridValue(snappedUpdates[prop]);
        }
      });
    }

    switch (type) {
      case 'station':
        updateStation(id, snappedUpdates);
        break;
      case 'disc':
        updateDisc(id, snappedUpdates);
        break;
      case 'conveyor':
        updateConveyor(id, snappedUpdates);
        break;
      case 'feeder':
        updateFeeder(id, snappedUpdates);
        break;
      case 'shape':
        updateShape(id, snappedUpdates);
        break;
    }
  };

  const handleDrop = (type: string, x: number, y: number, data?: any) => {
    let newId: string | null = null;
    let newElement: MachineElement | null = null;

    // Basic defaults
    switch (type) {
      case 'station': {
        const station = {
          name: 'New Station',
          type: 'custom' as const,
          x,
          y,
          angle: 0,
          width: 50,
          height: 40,
          ...data
        };
        newId = addStation(station);
        if (newId) newElement = { type: 'station', data: { ...station, id: newId } };
        break;
      }
      case 'disc': {
        const disc = {
          x,
          y,
          radius: 80,
          slots: 4,
          ...data
        };
        newId = addDisc(disc);
        if (newId) newElement = { type: 'disc', data: { ...disc, id: newId } };
        break;
      }
      case 'conveyor': {
        const conveyor = {
          type: 'custom' as const,
          startX: x - 50,
          startY: y,
          endX: x + 50,
          endY: y,
          width: 20,
          ...data
        };
        newId = addConveyor(conveyor);
        if (newId) newElement = { type: 'conveyor', data: { ...conveyor, id: newId } };
        break;
      }
      case 'feeder': {
        const feeder = {
          name: 'Feeder',
          x,
          y,
          width: 60,
          height: 80,
          ...data
        };
        newId = addFeeder(feeder);
        if (newId) newElement = { type: 'feeder', data: { ...feeder, id: newId } };
        break;
      }
      case 'rectangle':
      case 'circle':
      case 'line':
      case 'text':
      case 'triangle':
      case 'hexagon':
      case 'ellipse':
      case 'image': {
        const shape = {
          type: type as any,
          x,
          y,
          width: 80,
          height: 60,
          fill: '#3b82f6',
          stroke: '#1e40af',
          strokeWidth: 2,
          radius: 40,
          fontSize: 16,
          text: 'Text',
          ...data
        };
        newId = addShape(shape);
        if (newId) newElement = { type: 'shape', data: { ...shape, id: newId } };
        break;
      }
    }

    if (newElement) {
      selectElement(newElement);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle shortcuts in edit mode or for undo/redo
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const cmdKey = isMac ? e.metaKey : e.ctrlKey;

      // Undo (Cmd/Ctrl+Z) - works in both modes
      if (cmdKey && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
        return;
      }

      // Redo (Cmd/Ctrl+Shift+Z) - works in both modes
      if (cmdKey && e.key === 'z' && e.shiftKey) {
        e.preventDefault();
        redo();
        return;
      }

      // Edit mode only shortcuts
      if (mode !== 'edit') return;

      // Copy (Cmd/Ctrl+C)
      if (cmdKey && e.key === 'c') {
        e.preventDefault();
        copyElement();
        return;
      }

      // Cut (Cmd/Ctrl+X)
      if (cmdKey && e.key === 'x') {
        e.preventDefault();
        cutElement();
        return;
      }

      // Paste (Cmd/Ctrl+V)
      if (cmdKey && e.key === 'v') {
        e.preventDefault();
        pasteElement();
        return;
      }

      // Duplicate (Cmd/Ctrl+D)
      if (cmdKey && e.key === 'd') {
        e.preventDefault();
        duplicateElement();
        return;
      }

      // Delete (Delete or Backspace)
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        deleteSelectedElements();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, copyElement, cutElement, pasteElement, duplicateElement, deleteSelectedElements, undo, redo]);

  return (
    <div className="flex flex-col h-full">
      <MachineEditorToolbar
        mode={mode}
        onModeChange={setMode}
        selectedElements={selectedElements}
        onDelete={deleteSelectedElements}
        zoom={zoom}
        onZoomChange={setZoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        isPanMode={isPanMode}
        onPanModeChange={setIsPanMode}
        onAddStation={handleAddStation}
        onAddDisc={handleAddDisc}
        onAddConveyor={handleAddConveyor}
        onAddFeeder={handleAddFeeder}
        isRunning={isRunning}
        // Grid controls
        gridVisible={gridVisible}
        onToggleGrid={() => setGridVisible(!gridVisible)}
        snapToGrid={snapToGrid}
        onToggleSnap={() => setSnapToGrid(!snapToGrid)}
        gridSize={gridSize}
        onGridSizeChange={setGridSize}
        // Clipboard
        hasClipboard={clipboard !== null}
        onCopy={copyElement}
        onCut={cutElement}
        onPaste={pasteElement}
        onDuplicate={duplicateElement}
        // History
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={undo}
        onRedo={redo}
        // Grouping & Alignment
        onGroup={groupSelectedElements}
        onUngroup={ungroupSelectedElements}
        onAlign={alignSelectedElements}
        onReorder={reorderSelectedElements}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Component Palette moved to Left Sidebar (MachineToolbox) */}
        {mode === 'edit' && (
          <div className="w-64 border-r border-border bg-background z-10">
            <MachineToolbox />
          </div>
        )}

        <div className="flex-1 relative overflow-hidden p-2">
          <div className="w-full h-full flex items-center justify-center">
            {/* Using Konva renderer */}
            <KonvaRenderer
              layout={layout}
              state={runtimeState}
              mode={mode}
              zoom={zoom}
              panOffset={panOffset}
              selectedElements={selectedElements}
              onSelectElement={selectElement}
              onSelectElements={selectElements}
              onMoveElement={moveElement}
              onUpdateElement={handleUpdateElement}
              onDrop={handleDrop}
              gridVisible={gridVisible}
              gridSize={gridSize}
              snapToGrid={snapToGrid}
              isPanMode={isPanMode}
              onPanOffsetChange={setPanOffset}
              onNodeDblClick={(node) => {
                if (mode !== 'edit') return;
                // If image, try to find the upload input
                // node here is the shape object from KonvaBasicShape (BasicShape)
                if (node.type === 'image') {
                  const inputId = `image-upload-${node.id}`;
                  const input = document.getElementById(inputId);
                  if (input) {
                    input.click();
                  } else {
                    // Property panel might be mounting
                    setTimeout(() => {
                      document.getElementById(inputId)?.click();
                    }, 50);
                  }
                }
              }}
            />
          </div>

          {/* Property Panel - Only show if exactly one element is selected */}
          {selectedElements.length === 1 && mode === 'edit' && (
            <MachinePropertyPanel
              element={selectedElements[0]}
              onUpdate={handlePropertyUpdate}
              onClose={() => selectElement(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MachineEditor;
