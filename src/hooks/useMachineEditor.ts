import { useState, useCallback } from 'react';
import type {
  MachineLayout,
  MachineStation,
  MachineDisc,
  MachineConveyor,
  MachineFeeder,
  BasicShape,
  MachineElement,
  EditorMode
} from '@/types/machine-editor';

// Default layout matching current visualization
const defaultLayout: MachineLayout = {
  id: 'default',
  name: '預設機台',
  width: 400,
  height: 400,
  stations: [
    { id: 's1', name: '入料', type: 'feed', x: 200, y: 40, angle: 0, width: 50, height: 40 },
    { id: 's2', name: '組裝', type: 'assembly', x: 360, y: 200, angle: 90, width: 50, height: 40 },
    { id: 's3', name: '良品', type: 'ok', x: 200, y: 360, angle: 180, width: 50, height: 40 },
    { id: 's4', name: '不良', type: 'ng', x: 40, y: 200, angle: 270, width: 50, height: 40 },
  ],
  discs: [
    { id: 'd1', x: 200, y: 200, radius: 120, slots: 4 }
  ],
  conveyors: [
    { id: 'c1', type: 'ok', startX: 290, startY: 150, endX: 380, endY: 135, width: 30 },
    { id: 'c2', type: 'ng', startX: 290, startY: 250, endX: 380, endY: 265, width: 30 },
  ],
  feeders: [
    { id: 'f1', name: '震動送料機', x: 50, y: 200, width: 60, height: 80 }
  ],
  shapes: []
};

const MAX_HISTORY = 50;

export function useMachineEditor() {
  const [layout, setLayout] = useState<MachineLayout>(defaultLayout);
  const [mode, setMode] = useState<EditorMode>('runtime');
  const [selectedElement, setSelectedElement] = useState<MachineElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

  // Grid settings
  const [gridVisible, setGridVisible] = useState(true);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [gridSize, setGridSize] = useState(20);

  // Clipboard
  const [clipboard, setClipboard] = useState<MachineElement | null>(null);

  // History management
  const [layoutHistory, setLayoutHistory] = useState<MachineLayout[]>([defaultLayout]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Helper: Record history
  const recordHistory = useCallback((newLayout: MachineLayout) => {
    setLayoutHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(newLayout);
      if (newHistory.length > MAX_HISTORY) {
        newHistory.shift();
        return newHistory;
      }
      return newHistory;
    });
    setHistoryIndex(prev => Math.min(prev + 1, MAX_HISTORY - 1));
  }, [historyIndex]);

  // Helper: Snap to grid
  const snapToGridValue = useCallback((value: number) => {
    if (!snapToGrid) return value;
    return Math.round(value / gridSize) * gridSize;
  }, [snapToGrid, gridSize]);

  // Select element
  const selectElement = useCallback((element: MachineElement | null) => {
    setSelectedElement(element);
  }, []);

  // Add station
  const addStation = useCallback((station: Omit<MachineStation, 'id'>) => {
    const id = `s${Date.now()} `;
    const newLayout = {
      ...layout,
      stations: [...layout.stations, { ...station, id }]
    };
    setLayout(newLayout);
    recordHistory(newLayout);
    return id;
  }, [layout, recordHistory]);

  // Update station
  const updateStation = useCallback((id: string, updates: Partial<MachineStation>) => {
    const newLayout = {
      ...layout,
      stations: layout.stations.map(s => s.id === id ? { ...s, ...updates } : s)
    };
    setLayout(newLayout);
    recordHistory(newLayout);
  }, [layout, recordHistory]);

  // Delete station
  const deleteStation = useCallback((id: string) => {
    const newLayout = {
      ...layout,
      stations: layout.stations.filter(s => s.id !== id)
    };
    setLayout(newLayout);
    recordHistory(newLayout);
    setSelectedElement(null);
  }, [layout, recordHistory]);

  // Add disc
  const addDisc = useCallback((disc: Omit<MachineDisc, 'id'>) => {
    const id = `d${Date.now()} `;
    const newLayout = {
      ...layout,
      discs: [...layout.discs, { ...disc, id }]
    };
    setLayout(newLayout);
    recordHistory(newLayout);
    return id;
  }, [layout, recordHistory]);

  // Update disc
  const updateDisc = useCallback((id: string, updates: Partial<MachineDisc>) => {
    const newLayout = {
      ...layout,
      discs: layout.discs.map(d => d.id === id ? { ...d, ...updates } : d)
    };
    setLayout(newLayout);
    recordHistory(newLayout);
  }, [layout, recordHistory]);

  // Delete disc
  const deleteDisc = useCallback((id: string) => {
    const newLayout = {
      ...layout,
      discs: layout.discs.filter(d => d.id !== id)
    };
    setLayout(newLayout);
    recordHistory(newLayout);
    setSelectedElement(null);
  }, [layout, recordHistory]);

  // Add conveyor
  const addConveyor = useCallback((conveyor: Omit<MachineConveyor, 'id'>) => {
    const id = `c${Date.now()} `;
    const newLayout = {
      ...layout,
      conveyors: [...layout.conveyors, { ...conveyor, id }]
    };
    setLayout(newLayout);
    recordHistory(newLayout);
    return id;
  }, [layout, recordHistory]);

  // Update conveyor
  const updateConveyor = useCallback((id: string, updates: Partial<MachineConveyor>) => {
    const newLayout = {
      ...layout,
      conveyors: layout.conveyors.map(c => c.id === id ? { ...c, ...updates } : c)
    };
    setLayout(newLayout);
    recordHistory(newLayout);
  }, [layout, recordHistory]);

  // Delete conveyor
  const deleteConveyor = useCallback((id: string) => {
    const newLayout = {
      ...layout,
      conveyors: layout.conveyors.filter(c => c.id !== id)
    };
    setLayout(newLayout);
    recordHistory(newLayout);
    setSelectedElement(null);
  }, [layout, recordHistory]);

  // Add feeder
  const addFeeder = useCallback((feeder: Omit<MachineFeeder, 'id'>) => {
    const id = `f${Date.now()} `;
    const newLayout = {
      ...layout,
      feeders: [...layout.feeders, { ...feeder, id }]
    };
    setLayout(newLayout);
    recordHistory(newLayout);
    return id;
  }, [layout, recordHistory]);

  // Update feeder
  const updateFeeder = useCallback((id: string, updates: Partial<MachineFeeder>) => {
    const newLayout = {
      ...layout,
      feeders: layout.feeders.map(f => f.id === id ? { ...f, ...updates } : f)
    };
    setLayout(newLayout);
    recordHistory(newLayout);
  }, [layout, recordHistory]);

  // Delete feeder
  const deleteFeeder = useCallback((id: string) => {
    const newLayout = {
      ...layout,
      feeders: layout.feeders.filter(f => f.id !== id)
    };
    setLayout(newLayout);
    recordHistory(newLayout);
    setSelectedElement(null);
  }, [layout, recordHistory]);

  // Add shape
  const addShape = useCallback((shape: Omit<BasicShape, 'id'>) => {
    const id = `sh${Date.now()} `;
    const newLayout = {
      ...layout,
      shapes: [...layout.shapes, { ...shape, id }]
    };
    setLayout(newLayout);
    recordHistory(newLayout);
    return id;
  }, [layout, recordHistory]);

  // Update shape
  const updateShape = useCallback((id: string, updates: Partial<BasicShape>) => {
    const newLayout = {
      ...layout,
      shapes: layout.shapes.map(s => s.id === id ? { ...s, ...updates } : s)
    };
    setLayout(newLayout);
    recordHistory(newLayout);
  }, [layout, recordHistory]);

  // Delete shape
  const deleteShape = useCallback((id: string) => {
    const newLayout = {
      ...layout,
      shapes: layout.shapes.filter(s => s.id !== id)
    };
    setLayout(newLayout);
    recordHistory(newLayout);
    setSelectedElement(null);
  }, [layout, recordHistory]);

  // Move element (for drag & drop)
  const moveElement = useCallback((element: MachineElement, deltaX: number, deltaY: number) => {
    switch (element.type) {
      case 'station':
        updateStation(element.data.id, {
          x: snapToGridValue(element.data.x + deltaX),
          y: snapToGridValue(element.data.y + deltaY)
        });
        break;
      case 'disc':
        updateDisc(element.data.id, {
          x: snapToGridValue(element.data.x + deltaX),
          y: snapToGridValue(element.data.y + deltaY)
        });
        break;
      case 'feeder':
        updateFeeder(element.data.id, {
          x: snapToGridValue(element.data.x + deltaX),
          y: snapToGridValue(element.data.y + deltaY)
        });
        break;
      case 'conveyor':
        updateConveyor(element.data.id, {
          startX: snapToGridValue(element.data.startX + deltaX),
          startY: snapToGridValue(element.data.startY + deltaY),
          endX: snapToGridValue(element.data.endX + deltaX),
          endY: snapToGridValue(element.data.endY + deltaY)
        });
        break;
      case 'shape':
        updateShape(element.data.id, {
          x: snapToGridValue(element.data.x + deltaX),
          y: snapToGridValue(element.data.y + deltaY),
          ...(element.data.type === 'line' && {
            endX: snapToGridValue((element.data.endX || 0) + deltaX),
            endY: snapToGridValue((element.data.endY || 0) + deltaY)
          })
        });
        break;
    }
  }, [updateStation, updateDisc, updateFeeder, updateConveyor, snapToGridValue]);

  // Delete selected element
  const deleteSelectedElement = useCallback(() => {
    if (!selectedElement) return;

    switch (selectedElement.type) {
      case 'station':
        deleteStation(selectedElement.data.id);
        break;
      case 'disc':
        deleteDisc(selectedElement.data.id);
        break;
      case 'conveyor':
        deleteConveyor(selectedElement.data.id);
        break;
      case 'feeder':
        deleteFeeder(selectedElement.data.id);
        break;
      case 'shape':
        deleteShape(selectedElement.data.id);
        break;
    }
  }, [selectedElement, deleteStation, deleteDisc, deleteConveyor, deleteFeeder, deleteShape]);

  // Clipboard: Copy
  const copyElement = useCallback(() => {
    if (!selectedElement) return;
    setClipboard(selectedElement);
  }, [selectedElement]);

  // Clipboard: Cut
  const cutElement = useCallback(() => {
    if (!selectedElement) return;
    setClipboard(selectedElement);
    deleteSelectedElement();
  }, [selectedElement, deleteSelectedElement]);

  // Clipboard: Paste
  const pasteElement = useCallback(() => {
    if (!clipboard) return;

    const offset = 20; // Offset to avoid overlapping

    switch (clipboard.type) {
      case 'station': {
        const data = clipboard.data as MachineStation;
        addStation({
          name: data.name,
          type: data.type,
          x: data.x + offset,
          y: data.y + offset,
          angle: data.angle,
          width: data.width,
          height: data.height,
          ioMapping: data.ioMapping,
          properties: data.properties
        });
        break;
      }
      case 'disc': {
        const data = clipboard.data as MachineDisc;
        addDisc({
          x: data.x + offset,
          y: data.y + offset,
          radius: data.radius,
          slots: data.slots,
          rotationVariable: data.rotationVariable
        });
        break;
      }
      case 'conveyor': {
        const data = clipboard.data as MachineConveyor;
        addConveyor({
          type: data.type,
          startX: data.startX + offset,
          startY: data.startY + offset,
          endX: data.endX + offset,
          endY: data.endY + offset,
          width: data.width
        });
        break;
      }
      case 'feeder': {
        const data = clipboard.data as MachineFeeder;
        addFeeder({
          name: data.name,
          x: data.x + offset,
          y: data.y + offset,
          width: data.width,
          height: data.height,
          activeVariable: data.activeVariable
        });
        break;
      }
      case 'shape': {
        const data = clipboard.data as BasicShape;
        addShape({
          type: data.type,
          x: data.x + offset,
          y: data.y + offset,
          width: data.width,
          height: data.height,
          radius: data.radius,
          text: data.text,
          fontSize: data.fontSize,
          fill: data.fill,
          stroke: data.stroke,
          strokeWidth: data.strokeWidth,
          ...(data.type === 'line' && {
            endX: (data.endX || 0) + offset,
            endY: (data.endY || 0) + offset
          })
        });
        break;
      }
    }
  }, [clipboard, addStation, addDisc, addConveyor, addFeeder, addShape]);

  // Clipboard: Duplicate
  const duplicateElement = useCallback(() => {
    if (!selectedElement) return;
    setClipboard(selectedElement);
    pasteElement();
  }, [selectedElement, pasteElement]);

  // History: Undo
  const undo = useCallback(() => {
    if (historyIndex <= 0) return;
    const newIndex = historyIndex - 1;
    setHistoryIndex(newIndex);
    setLayout(layoutHistory[newIndex]);
  }, [historyIndex, layoutHistory]);

  // History: Redo
  const redo = useCallback(() => {
    if (historyIndex >= layoutHistory.length - 1) return;
    const newIndex = historyIndex + 1;
    setHistoryIndex(newIndex);
    setLayout(layoutHistory[newIndex]);
  }, [historyIndex, layoutHistory]);

  return {
    layout,
    mode,
    setMode,
    selectedElement,
    selectElement,
    zoom,
    setZoom,
    panOffset,
    setPanOffset,
    // Grid settings
    gridVisible,
    setGridVisible,
    snapToGrid,
    setSnapToGrid,
    gridSize,
    setGridSize,
    // Station
    addStation,
    updateStation,
    deleteStation,
    // Disc
    addDisc,
    updateDisc,
    deleteDisc,
    // Conveyor
    addConveyor,
    updateConveyor,
    deleteConveyor,
    // Feeder
    addFeeder,
    updateFeeder,
    deleteFeeder,
    // Shape
    addShape,
    updateShape,
    deleteShape,
    // Element operations
    moveElement,
    deleteSelectedElement,
    // Clipboard
    clipboard,
    copyElement,
    cutElement,
    pasteElement,
    duplicateElement,
    // History
    canUndo: historyIndex > 0,
    canRedo: historyIndex < layoutHistory.length - 1,
    undo,
    redo,
  };
}
