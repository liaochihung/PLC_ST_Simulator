import { useState, useCallback } from 'react';
import type {
  MachineLayout,
  MachineStation,
  MachineDisc,
  MachineConveyor,
  MachineFeeder,
  BasicShape,
  MachineElement,
  EditorMode,
  MachineGroup
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
  shapes: [],
  groups: []
};

const MAX_HISTORY = 50;

export function useMachineLogic() {
  const [layout, setLayout] = useState<MachineLayout>(defaultLayout);
  const [mode, setMode] = useState<EditorMode>('runtime');
  const [selectedElements, setSelectedElements] = useState<MachineElement[]>([]);
  // Derived state for backward compatibility and single-item editing
  const selectedElement = selectedElements.length === 1 ? selectedElements[0] : null;
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

  // Grid settings
  const [gridVisible, setGridVisible] = useState(true);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [gridSize, setGridSize] = useState(20);

  // Clipboard
  // Clipboard - stored as Array
  const [clipboard, setClipboard] = useState<MachineElement[]>([]);

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

  const selectElement = useCallback((element: MachineElement | null, multi = false) => {
    if (!element) {
      if (!multi) setSelectedElements([]);
      return;
    }

    if (multi) {
      setSelectedElements(prev => {
        const index = prev.findIndex(e => e.data.id === element.data.id);
        if (index >= 0) {
          // Deselect
          return prev.filter((_, i) => i !== index);
        } else {
          // Select
          return [...prev, element];
        }
      });
    } else {
      setSelectedElements([element]);
    }
  }, []);

  // Select multiple elements directly (e.g. for rubber band)
  const selectElements = useCallback((elements: MachineElement[]) => {
    setSelectedElements(elements);
  }, []);

  // Add station
  const addStation = useCallback((station: Omit<MachineStation, 'id'>) => {
    const id = `s${Date.now()}`;
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
    setSelectedElements([]);
  }, [layout, recordHistory]);

  // Add disc
  const addDisc = useCallback((disc: Omit<MachineDisc, 'id'>) => {
    const id = `d${Date.now()}`;
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
    setSelectedElements([]);
  }, [layout, recordHistory]);

  // Add conveyor
  const addConveyor = useCallback((conveyor: Omit<MachineConveyor, 'id'>) => {
    const id = `c${Date.now()}`;
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
    setSelectedElements([]);
  }, [layout, recordHistory]);

  // Add feeder
  const addFeeder = useCallback((feeder: Omit<MachineFeeder, 'id'>) => {
    const id = `f${Date.now()}`;
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
    setSelectedElements([]);
  }, [layout, recordHistory]);

  // Add shape
  const addShape = useCallback((shape: Omit<BasicShape, 'id'>) => {
    const id = `sh${Date.now()}`;
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
    setSelectedElements([]);
  }, [layout, recordHistory]);

  // Move element (for drag & drop and nudge)
  const moveElement = useCallback((element: MachineElement, deltaX: number, deltaY: number) => {
    // If the element is part of the selection, move ALL selected elements
    // Otherwise, just move that one element (and implicitly select it if not multi) - 
    // Logic here might need to be "moveElements" to be cleaner, but for now we adapt.

    // Check if the moved element is in the selection
    const isSelected = selectedElements.some(e => e.data.id === element.data.id);
    const elementsToMove = isSelected ? selectedElements : [element];

    const updates: { type: string; id: string; update: any }[] = [];

    elementsToMove.forEach(el => {
      let update = {};
      switch (el.type) {
        case 'station':
          update = {
            x: snapToGridValue(el.data.x + deltaX),
            y: snapToGridValue(el.data.y + deltaY)
          };
          // We can't batch call updateStation/etc easily without refactoring state to be more unified or batch-aware.
          // For now, we will just call the update functions sequentially. This might trigger multiple re-renders.
          // BETTER: Create a batch update function or just update them one by one. given the small number, one by one is "okay" but not efficient.
          // We'll update the layout state ONCE.
          break;
        case 'disc':
          update = {
            x: snapToGridValue(el.data.x + deltaX),
            y: snapToGridValue(el.data.y + deltaY)
          };
          break;
        case 'feeder':
          update = {
            x: snapToGridValue(el.data.x + deltaX),
            y: snapToGridValue(el.data.y + deltaY)
          };
          break;
        case 'conveyor':
          update = {
            startX: snapToGridValue(el.data.startX + deltaX),
            startY: snapToGridValue(el.data.startY + deltaY),
            endX: snapToGridValue(el.data.endX + deltaX),
            endY: snapToGridValue(el.data.endY + deltaY)
          };
          break;
        case 'shape':
          update = {
            x: snapToGridValue(el.data.x + deltaX),
            y: snapToGridValue(el.data.y + deltaY),
            ...(el.data.type === 'line' && {
              endX: snapToGridValue((el.data.endX || 0) + deltaX),
              endY: snapToGridValue((el.data.endY || 0) + deltaY)
            })
          };
          break;
      }
      updates.push({ type: el.type, id: el.data.id, update });
    });

    // Apply all updates to a new layout
    setLayout(prev => {
      let newLayout = { ...prev };
      updates.forEach(({ type, id, update }) => {
        switch (type) {
          case 'station':
            newLayout.stations = newLayout.stations.map(s => s.id === id ? { ...s, ...update } : s);
            break;
          case 'disc':
            newLayout.discs = newLayout.discs.map(d => d.id === id ? { ...d, ...update } : d);
            break;
          case 'feeder':
            newLayout.feeders = newLayout.feeders.map(f => f.id === id ? { ...f, ...update } : f);
            break;
          case 'conveyor':
            newLayout.conveyors = newLayout.conveyors.map(c => c.id === id ? { ...c, ...update } : c);
            break;
          case 'shape':
            newLayout.shapes = newLayout.shapes.map(s => s.id === id ? { ...s, ...update } : s);
            break;
        }
      });
      return newLayout;
    });

    // We don't record history for every drag frame, ideally. But these functions are usually called on DragEnd.
    // If this is DragEnd, we should record history.
    // However, `moveElement` usage in KonvaRenderer is `onDragEnd`.
    // So YES, we should record history.
    // But we can't access `newLayout` easily inside setLayout. 
    // Let's rely on the fact that `onDragEnd` calls this once.
    // We need to properly invoke `recordHistory`.

    // Issue: `recordHistory` depends on `layout` state or we pass the new layout to it.
    // My previous batch update inside `setLayout` makes it hard to get the new layout out for `recordHistory`.
    // Let's reconstruct the new layout first.

    const newLayout = { ...layout }; // Cloned from current layout scope (closure) - might be stale if strict mode? No, closure.
    updates.forEach(({ type, id, update }) => {
      switch (type) {
        case 'station':
          newLayout.stations = newLayout.stations.map(s => s.id === id ? { ...s, ...update } : s);
          break;
        case 'disc':
          newLayout.discs = newLayout.discs.map(d => d.id === id ? { ...d, ...update } : d);
          break;
        case 'feeder':
          newLayout.feeders = newLayout.feeders.map(f => f.id === id ? { ...f, ...update } : f);
          break;
        case 'conveyor':
          newLayout.conveyors = newLayout.conveyors.map(c => c.id === id ? { ...c, ...update } : c);
          break;
        case 'shape':
          newLayout.shapes = newLayout.shapes.map(s => s.id === id ? { ...s, ...update } : s);
          break;
      }
    });
    setLayout(newLayout);
    recordHistory(newLayout);

  }, [layout, selectedElements, snapToGridValue, recordHistory]);

  // Delete selected element
  const deleteSelectedElements = useCallback(() => {
    if (selectedElements.length === 0) return;

    let newLayout = { ...layout };

    selectedElements.forEach(element => {
      switch (element.type) {
        case 'station':
          newLayout.stations = newLayout.stations.filter(s => s.id !== element.data.id);
          break;
        case 'disc':
          newLayout.discs = newLayout.discs.filter(d => d.id !== element.data.id);
          break;
        case 'conveyor':
          newLayout.conveyors = newLayout.conveyors.filter(c => c.id !== element.data.id);
          break;
        case 'feeder':
          newLayout.feeders = newLayout.feeders.filter(f => f.id !== element.data.id);
          break;
        case 'shape':
          newLayout.shapes = newLayout.shapes.filter(s => s.id !== element.data.id);
          break;
      }
    });

    setLayout(newLayout);
    recordHistory(newLayout);
    setSelectedElements([]);
  }, [selectedElements, layout, recordHistory]);

  // Clipboard: Copy
  const copyElement = useCallback(() => {
    if (selectedElements.length === 0) return;
    setClipboard(selectedElements);
  }, [selectedElements]);

  // Clipboard: Cut
  const cutElement = useCallback(() => {
    if (selectedElements.length === 0) return;
    setClipboard(selectedElements);
    deleteSelectedElements();
  }, [selectedElements, deleteSelectedElements]);

  // Clipboard: Paste
  const pasteElement = useCallback(() => {
    if (clipboard.length === 0) return;

    const offset = 20; // Offset to avoid overlapping

    // Process each item in clipboard
    const newIds: string[] = [];
    let currentLayout = { ...layout };

    clipboard.forEach(item => {
      let newId = '';
      switch (item.type) {
        case 'station': {
          const data = item.data as MachineStation;
          newId = `s${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
          currentLayout.stations = [...currentLayout.stations, {
            ...data,
            id: newId,
            x: data.x + offset,
            y: data.y + offset
          }];
          break;
        }
        case 'disc': {
          const data = item.data as MachineDisc;
          newId = `d${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
          currentLayout.discs = [...currentLayout.discs, {
            ...data,
            id: newId,
            x: data.x + offset,
            y: data.y + offset
          }];
          break;
        }
        case 'conveyor': {
          const data = item.data as MachineConveyor;
          newId = `c${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
          currentLayout.conveyors = [...currentLayout.conveyors, {
            ...data,
            id: newId,
            startX: data.startX + offset,
            startY: data.startY + offset,
            endX: data.endX + offset,
            endY: data.endY + offset
          }];
          break;
        }
        case 'feeder': {
          const data = item.data as MachineFeeder;
          newId = `f${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
          currentLayout.feeders = [...currentLayout.feeders, {
            ...data,
            id: newId,
            x: data.x + offset,
            y: data.y + offset
          }];
          break;
        }
        case 'shape': {
          const data = item.data as BasicShape;
          newId = `sh${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
          currentLayout.shapes = [...currentLayout.shapes, {
            ...data,
            id: newId,
            x: data.x + offset,
            y: data.y + offset,
            ...(data.type === 'line' && {
              endX: (data.endX || 0) + offset,
              endY: (data.endY || 0) + offset
            })
          }];
          break;
        }
      }
      newIds.push(newId);
    });

    setLayout(currentLayout);
    recordHistory(currentLayout);

    // Select newly pasted items
    // We need to reconstruct MachineElements from IDs
    // This is getting complicated to do efficiently without helper lookup
    // For now, let's just clear selection or not select. 
    // Ideally we select them.
    // ... logic to find them ...
    // Let's skip auto-select for now to save complexity or implement finding logic.
    // Actually, users expect pasted items to be selected.
    // Let's rely on internal knowledge that we just added them.
    const newSelection: MachineElement[] = [];
    newIds.forEach(id => {
      // Search in currentLayout lists...
      // Actually currentLayout is updated.
      const s = currentLayout.stations.find(x => x.id === id);
      if (s) newSelection.push({ type: 'station', data: s });
      const d = currentLayout.discs.find(x => x.id === id);
      if (d) newSelection.push({ type: 'disc', data: d });
      // ... etc
      const c = currentLayout.conveyors.find(x => x.id === id);
      if (c) newSelection.push({ type: 'conveyor', data: c });
      const f = currentLayout.feeders.find(x => x.id === id);
      if (f) newSelection.push({ type: 'feeder', data: f });
      const sh = currentLayout.shapes.find(x => x.id === id);
      if (sh) newSelection.push({ type: 'shape', data: sh });
    });
    setSelectedElements(newSelection);

  }, [clipboard, layout, recordHistory]);

  // Clipboard: Duplicate
  const duplicateElement = useCallback(() => {
    if (selectedElements.length === 0) return;
    setClipboard(selectedElements);
    // Paste logic is async in useEffect? No, it's direct.
    // But we need to paste WHAT we just set.
    // Since setClipboard is state update, it won't be immediate.
    // So we should pass the elements directly to a helper or just duplicating logic here.
    // For simplicity, let's reuse paste logic but pass data directly?
    // Or just implement duplicate logic since we have the data.

    // Reuse paste logic needs state to update.
    // Let's wait for next render? No, user expects immediate.
    // Let's just implement duplicate manually using the selectedElements

    // Same logic as paste but source is selectedElements
    const newIds: string[] = [];
    const offset = 20;
    let currentLayout = { ...layout };

    selectedElements.forEach(item => {
      let newId = '';
      switch (item.type) {
        case 'station': {
          const data = item.data as MachineStation;
          newId = `s${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
          currentLayout.stations = [...currentLayout.stations, {
            ...data,
            id: newId,
            x: data.x + offset,
            y: data.y + offset
          }];
          break;
        }
        case 'disc': {
          const data = item.data as MachineDisc;
          newId = `d${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
          currentLayout.discs = [...currentLayout.discs, {
            ...data,
            id: newId,
            x: data.x + offset,
            y: data.y + offset
          }];
          break;
        }
        case 'conveyor': {
          const data = item.data as MachineConveyor;
          newId = `c${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
          currentLayout.conveyors = [...currentLayout.conveyors, {
            ...data,
            id: newId,
            startX: data.startX + offset,
            startY: data.startY + offset,
            endX: data.endX + offset,
            endY: data.endY + offset
          }];
          break;
        }
        case 'feeder': {
          const data = item.data as MachineFeeder;
          newId = `f${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
          currentLayout.feeders = [...currentLayout.feeders, {
            ...data,
            id: newId,
            x: data.x + offset,
            y: data.y + offset
          }];
          break;
        }
        case 'shape': {
          const data = item.data as BasicShape;
          newId = `sh${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
          currentLayout.shapes = [...currentLayout.shapes, {
            ...data,
            id: newId,
            x: data.x + offset,
            y: data.y + offset,
            ...(data.type === 'line' && {
              endX: (data.endX || 0) + offset,
              endY: (data.endY || 0) + offset
            })
          }];
          break;
        }
      }
      newIds.push(newId);
    });

    setLayout(currentLayout);
    recordHistory(currentLayout);

    const newSelection: MachineElement[] = [];
    newIds.forEach(id => {
      const s = currentLayout.stations.find(x => x.id === id);
      if (s) newSelection.push({ type: 'station', data: s });
      const d = currentLayout.discs.find(x => x.id === id);
      if (d) newSelection.push({ type: 'disc', data: d });
      const c = currentLayout.conveyors.find(x => x.id === id);
      if (c) newSelection.push({ type: 'conveyor', data: c });
      const f = currentLayout.feeders.find(x => x.id === id);
      if (f) newSelection.push({ type: 'feeder', data: f });
      const sh = currentLayout.shapes.find(x => x.id === id);
      if (sh) newSelection.push({ type: 'shape', data: sh });
    });
    setSelectedElements(newSelection);

  }, [selectedElements, layout, recordHistory]);

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
    selectedElements,
    selectedElement,
    selectElement,
    selectElements,
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
    deleteSelectedElements,
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
    // Grid helper
    snapToGridValue,

    // Grouping
    groupSelectedElements: () => {
      if (selectedElements.length < 2) return;

      const newLayout = { ...layout };
      const timestamp = Date.now();
      const groupId = `g${timestamp}`;

      // Calculate Bounding Box of selection
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

      selectedElements.forEach(el => {
        let ex = 0, ey = 0, ew = 0, eh = 0;
        switch (el.type) {
          case 'station':
            ex = el.data.x; ey = el.data.y; ew = el.data.width; eh = el.data.height; break;
          case 'disc':
            // Center to TopLeft for bounding box
            ex = el.data.x - el.data.radius; ey = el.data.y - el.data.radius;
            ew = el.data.radius * 2; eh = el.data.radius * 2; break;
          case 'feeder':
            ex = el.data.x; ey = el.data.y; ew = el.data.width; eh = el.data.height; break;
          case 'conveyor':
            const minCX = Math.min(el.data.startX, el.data.endX);
            const minCY = Math.min(el.data.startY, el.data.endY);
            ex = minCX - el.data.width / 2; ey = minCY - el.data.width / 2;
            ew = Math.abs(el.data.endX - el.data.startX) + el.data.width;
            eh = Math.abs(el.data.endY - el.data.startY) + el.data.width;
            break;
          case 'shape':
            ex = el.data.x; ey = el.data.y; ew = el.data.width ?? 0; eh = el.data.height ?? 0; break;
          case 'group':
            ex = el.data.x; ey = el.data.y; ew = 100; eh = 100; break;
        }

        if (ex < minX) minX = ex;
        if (ey < minY) minY = ey;
        if (ex + ew > maxX) maxX = ex + ew;
        if (ey + eh > maxY) maxY = ey + eh;
      });

      const groupX = minX;
      const groupY = minY;

      const childIds: string[] = [];
      const updateRelative = (item: any) => {
        return {
          ...item,
          groupId: groupId,
          x: item.x !== undefined ? item.x - groupX : undefined,
          y: item.y !== undefined ? item.y - groupY : undefined,
          startX: item.startX !== undefined ? item.startX - groupX : undefined,
          startY: item.startY !== undefined ? item.startY - groupY : undefined,
          endX: item.endX !== undefined ? item.endX - groupX : undefined,
          endY: item.endY !== undefined ? item.endY - groupY : undefined,
        };
      };

      selectedElements.forEach(el => {
        childIds.push(el.data.id);
        switch (el.type) {
          case 'station':
            newLayout.stations = newLayout.stations.map(s => s.id === el.data.id ? updateRelative(s) : s);
            break;
          case 'disc':
            newLayout.discs = newLayout.discs.map(d => d.id === el.data.id ? updateRelative(d) : d);
            break;
          case 'feeder':
            newLayout.feeders = newLayout.feeders.map(f => f.id === el.data.id ? updateRelative(f) : f);
            break;
          case 'conveyor':
            newLayout.conveyors = newLayout.conveyors.map(c => c.id === el.data.id ? updateRelative(c) : c);
            break;
          case 'shape':
            newLayout.shapes = newLayout.shapes.map(s => s.id === el.data.id ? updateRelative(s) : s);
            break;
          case 'group':
            newLayout.groups = newLayout.groups.map(g => g.id === el.data.id ? updateRelative(g) : g);
            break;
        }
      });

      newLayout.groups.push({
        id: groupId,
        type: 'group',
        x: groupX,
        y: groupY,
        childIds: childIds,
        zIndex: 100
      });

      setLayout(newLayout);
      recordHistory(newLayout);
      // Select the new group
      // We need to wait for render, but we can optimistically try
      // Actually we need to reconstruct the MachineGroup object for selection
      // But we can just clear selection for now or select the new group
      const newGroup = newLayout.groups[newLayout.groups.length - 1];
      if (newGroup) {
        setSelectedElements([{ type: 'group', data: newGroup }]);
      }
    },

    ungroupSelectedElements: () => {
      if (selectedElements.length !== 1 || selectedElements[0].type !== 'group') return;
      const group = selectedElements[0].data as MachineGroup;

      const newLayout = { ...layout };
      newLayout.groups = newLayout.groups.filter(g => g.id !== group.id);

      const groupX = group.x;
      const groupY = group.y;

      // Restore children to absolute
      const updateAbsolute = (item: any) => {
        if (item.groupId !== group.id) return item;

        return {
          ...item,
          groupId: undefined,
          x: item.x !== undefined ? item.x + groupX : undefined,
          y: item.y !== undefined ? item.y + groupY : undefined,
          startX: item.startX !== undefined ? item.startX + groupX : undefined,
          startY: item.startY !== undefined ? item.startY + groupY : undefined,
          endX: item.endX !== undefined ? item.endX + groupX : undefined,
          endY: item.endY !== undefined ? item.endY + groupY : undefined,
        };
      };

      const childrenElements: MachineElement[] = [];

      newLayout.stations = newLayout.stations.map(s => {
        const updated = updateAbsolute(s);
        if (s.groupId === group.id) childrenElements.push({ type: 'station', data: updated });
        return updated;
      });
      newLayout.discs = newLayout.discs.map(d => {
        const updated = updateAbsolute(d);
        if (d.groupId === group.id) childrenElements.push({ type: 'disc', data: updated });
        return updated;
      });
      newLayout.feeders = newLayout.feeders.map(f => {
        const updated = updateAbsolute(f);
        if (f.groupId === group.id) childrenElements.push({ type: 'feeder', data: updated });
        return updated;
      });
      newLayout.conveyors = newLayout.conveyors.map(c => {
        const updated = updateAbsolute(c);
        if (c.groupId === group.id) childrenElements.push({ type: 'conveyor', data: updated });
        return updated;
      });
      newLayout.shapes = newLayout.shapes.map(s => {
        const updated = updateAbsolute(s);
        if (s.groupId === group.id) childrenElements.push({ type: 'shape', data: updated });
        return updated;
      });

      setLayout(newLayout);
      recordHistory(newLayout);
      selectElements(childrenElements);
    },

    alignSelectedElements: (align: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => {
      if (selectedElements.length < 2) return;

      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

      selectedElements.forEach(el => {
        let ex = 0, ey = 0, ew = 0, eh = 0;
        switch (el.type) {
          case 'station':
            ex = el.data.x; ey = el.data.y; ew = el.data.width; eh = el.data.height; break;
          case 'disc':
            ex = el.data.x - el.data.radius; ey = el.data.y - el.data.radius;
            ew = el.data.radius * 2; eh = el.data.radius * 2; break;
          case 'feeder':
            ex = el.data.x; ey = el.data.y; ew = el.data.width; eh = el.data.height; break;
          case 'conveyor':
            const minCX = Math.min(el.data.startX, el.data.endX);
            const minCY = Math.min(el.data.startY, el.data.endY);
            ex = minCX - el.data.width / 2; ey = minCY - el.data.width / 2;
            ew = Math.abs(el.data.endX - el.data.startX) + el.data.width;
            eh = Math.abs(el.data.endY - el.data.startY) + el.data.width;
            break;
          case 'shape':
            ex = el.data.x; ey = el.data.y; ew = el.data.width || 0; eh = el.data.height || 0; break;
          case 'group':
            ex = el.data.x; ey = el.data.y; ew = 100; eh = 100; break;
        }

        if (ex < minX) minX = ex;
        if (ey < minY) minY = ey;
        if (ex + ew > maxX) maxX = ex + ew;
        if (ey + eh > maxY) maxY = ey + eh;
      });

      const centerLineX = (minX + maxX) / 2;
      const centerLineY = (minY + maxY) / 2;

      const newLayout = { ...layout };

      const updatePosition = (item: any, type: string) => {
        let ew = 0, eh = 0;
        if (type === 'station' || type === 'feeder' || type === 'shape') { ew = item.width || 0; eh = item.height || 0; }
        if (type === 'disc') { ew = item.radius * 2; eh = item.radius * 2; }
        if (type === 'conveyor') return item;

        let newX = item.x;
        let newY = item.y;

        const isTopLeft = type !== 'disc';

        if (!isTopLeft) { // Disc
          if (align === 'left') newX = minX + item.radius;
          if (align === 'center') newX = centerLineX;
          if (align === 'right') newX = maxX - item.radius;
          if (align === 'top') newY = minY + item.radius;
          if (align === 'middle') newY = centerLineY;
          if (align === 'bottom') newY = maxY - item.radius;
        } else {
          if (align === 'left') newX = minX;
          if (align === 'center') newX = centerLineX - ew / 2;
          if (align === 'right') newX = maxX - ew;
          if (align === 'top') newY = minY;
          if (align === 'middle') newY = centerLineY - eh / 2;
          if (align === 'bottom') newY = maxY - eh;
        }
        return { ...item, x: newX, y: newY };
      };

      const isSelected = (id: string, type: string) => selectedElements.some(e => e.data.id === id && e.type === type);

      newLayout.stations = newLayout.stations.map(s => isSelected(s.id, 'station') ? updatePosition(s, 'station') : s);
      newLayout.discs = newLayout.discs.map(d => isSelected(d.id, 'disc') ? updatePosition(d, 'disc') : d);
      newLayout.feeders = newLayout.feeders.map(f => isSelected(f.id, 'feeder') ? updatePosition(f, 'feeder') : f);
      newLayout.shapes = newLayout.shapes.map(s => isSelected(s.id, 'shape') ? updatePosition(s, 'shape') : s);
      newLayout.groups = newLayout.groups.map(g => isSelected(g.id, 'group') ? updatePosition(g, 'group') : g);

      setLayout(newLayout);
      recordHistory(newLayout);
    },

    reorderSelectedElements: (action: 'front' | 'back' | 'forward' | 'backward') => {
      if (selectedElements.length === 0) return;

      const allElements: { id: string, zIndex: number, type: string }[] = [];
      const add = (arr: any[], type: string) => arr.forEach(x => allElements.push({ id: x.id, zIndex: x.zIndex || 0, type }));

      add(layout.stations, 'station');
      add(layout.discs, 'disc');
      add(layout.feeders, 'feeder');
      add(layout.conveyors, 'conveyor');
      add(layout.shapes, 'shape');
      add(layout.groups, 'group');

      allElements.sort((a, b) => a.zIndex - b.zIndex);

      const selectedIds = new Set(selectedElements.map(e => e.data.id));

      if (action === 'front') {
        const topZ = allElements.length > 0 ? allElements[allElements.length - 1].zIndex : 0;
        let nextZ = topZ + 1;
        const updates = new Map<string, number>();
        allElements.forEach(el => {
          if (selectedIds.has(el.id)) updates.set(el.id, nextZ++);
        });

        const newLayout = { ...layout };
        const apply = (arr: any[]) => arr.map(x => updates.has(x.id) ? { ...x, zIndex: updates.get(x.id) } : x);
        newLayout.stations = apply(newLayout.stations);
        newLayout.discs = apply(newLayout.discs);
        newLayout.feeders = apply(newLayout.feeders);
        newLayout.conveyors = apply(newLayout.conveyors);
        newLayout.shapes = apply(newLayout.shapes);
        newLayout.groups = apply(newLayout.groups);

        setLayout(newLayout);
        recordHistory(newLayout);
      } else if (action === 'back') {
        const bottomZ = allElements.length > 0 ? allElements[0].zIndex : 0;
        let nextZ = bottomZ - 1;
        const updates = new Map<string, number>();
        allElements.forEach(el => {
          if (selectedIds.has(el.id)) updates.set(el.id, nextZ--);
        });

        const newLayout = { ...layout };
        const apply = (arr: any[]) => arr.map(x => updates.has(x.id) ? { ...x, zIndex: updates.get(x.id) } : x);
        newLayout.stations = apply(newLayout.stations);
        newLayout.discs = apply(newLayout.discs);
        newLayout.feeders = apply(newLayout.feeders);
        newLayout.conveyors = apply(newLayout.conveyors);
        newLayout.shapes = apply(newLayout.shapes);
        newLayout.groups = apply(newLayout.groups);
        setLayout(newLayout);
        recordHistory(newLayout);
      }
    },

  };
}
