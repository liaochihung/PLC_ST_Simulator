import { useState, useCallback } from 'react';
import type { 
  MachineLayout, 
  MachineStation, 
  MachineDisc, 
  MachineConveyor, 
  MachineFeeder,
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
  ]
};

export function useMachineEditor() {
  const [layout, setLayout] = useState<MachineLayout>(defaultLayout);
  const [mode, setMode] = useState<EditorMode>('runtime');
  const [selectedElement, setSelectedElement] = useState<MachineElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

  // Select element
  const selectElement = useCallback((element: MachineElement | null) => {
    setSelectedElement(element);
  }, []);

  // Add station
  const addStation = useCallback((station: Omit<MachineStation, 'id'>) => {
    const id = `s${Date.now()}`;
    setLayout(prev => ({
      ...prev,
      stations: [...prev.stations, { ...station, id }]
    }));
    return id;
  }, []);

  // Update station
  const updateStation = useCallback((id: string, updates: Partial<MachineStation>) => {
    setLayout(prev => ({
      ...prev,
      stations: prev.stations.map(s => s.id === id ? { ...s, ...updates } : s)
    }));
  }, []);

  // Delete station
  const deleteStation = useCallback((id: string) => {
    setLayout(prev => ({
      ...prev,
      stations: prev.stations.filter(s => s.id !== id)
    }));
    setSelectedElement(null);
  }, []);

  // Add disc
  const addDisc = useCallback((disc: Omit<MachineDisc, 'id'>) => {
    const id = `d${Date.now()}`;
    setLayout(prev => ({
      ...prev,
      discs: [...prev.discs, { ...disc, id }]
    }));
    return id;
  }, []);

  // Update disc
  const updateDisc = useCallback((id: string, updates: Partial<MachineDisc>) => {
    setLayout(prev => ({
      ...prev,
      discs: prev.discs.map(d => d.id === id ? { ...d, ...updates } : d)
    }));
  }, []);

  // Delete disc
  const deleteDisc = useCallback((id: string) => {
    setLayout(prev => ({
      ...prev,
      discs: prev.discs.filter(d => d.id !== id)
    }));
    setSelectedElement(null);
  }, []);

  // Add conveyor
  const addConveyor = useCallback((conveyor: Omit<MachineConveyor, 'id'>) => {
    const id = `c${Date.now()}`;
    setLayout(prev => ({
      ...prev,
      conveyors: [...prev.conveyors, { ...conveyor, id }]
    }));
    return id;
  }, []);

  // Update conveyor
  const updateConveyor = useCallback((id: string, updates: Partial<MachineConveyor>) => {
    setLayout(prev => ({
      ...prev,
      conveyors: prev.conveyors.map(c => c.id === id ? { ...c, ...updates } : c)
    }));
  }, []);

  // Delete conveyor
  const deleteConveyor = useCallback((id: string) => {
    setLayout(prev => ({
      ...prev,
      conveyors: prev.conveyors.filter(c => c.id !== id)
    }));
    setSelectedElement(null);
  }, []);

  // Add feeder
  const addFeeder = useCallback((feeder: Omit<MachineFeeder, 'id'>) => {
    const id = `f${Date.now()}`;
    setLayout(prev => ({
      ...prev,
      feeders: [...prev.feeders, { ...feeder, id }]
    }));
    return id;
  }, []);

  // Update feeder
  const updateFeeder = useCallback((id: string, updates: Partial<MachineFeeder>) => {
    setLayout(prev => ({
      ...prev,
      feeders: prev.feeders.map(f => f.id === id ? { ...f, ...updates } : f)
    }));
  }, []);

  // Delete feeder
  const deleteFeeder = useCallback((id: string) => {
    setLayout(prev => ({
      ...prev,
      feeders: prev.feeders.filter(f => f.id !== id)
    }));
    setSelectedElement(null);
  }, []);

  // Move element (for drag & drop)
  const moveElement = useCallback((element: MachineElement, deltaX: number, deltaY: number) => {
    switch (element.type) {
      case 'station':
        updateStation(element.data.id, {
          x: element.data.x + deltaX,
          y: element.data.y + deltaY
        });
        break;
      case 'disc':
        updateDisc(element.data.id, {
          x: element.data.x + deltaX,
          y: element.data.y + deltaY
        });
        break;
      case 'feeder':
        updateFeeder(element.data.id, {
          x: element.data.x + deltaX,
          y: element.data.y + deltaY
        });
        break;
      case 'conveyor':
        updateConveyor(element.data.id, {
          startX: element.data.startX + deltaX,
          startY: element.data.startY + deltaY,
          endX: element.data.endX + deltaX,
          endY: element.data.endY + deltaY
        });
        break;
    }
  }, [updateStation, updateDisc, updateFeeder, updateConveyor]);

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
    }
  }, [selectedElement, deleteStation, deleteDisc, deleteConveyor, deleteFeeder]);

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
    addStation,
    updateStation,
    deleteStation,
    addDisc,
    updateDisc,
    deleteDisc,
    addConveyor,
    updateConveyor,
    deleteConveyor,
    addFeeder,
    updateFeeder,
    deleteFeeder,
    moveElement,
    deleteSelectedElement,
  };
}
