// Machine Editor Types

export interface MachineStation {
  id: string;
  name: string;
  type: 'feed' | 'assembly' | 'ok' | 'ng' | 'custom';
  x: number;
  y: number;
  angle: number;
  width: number;
  height: number;
  ioMapping?: {
    inputs: string[];
    outputs: string[];
  };
  properties?: Record<string, unknown>;
  // Grouping & Sorting
  groupId?: string;
  zIndex?: number;
}

export interface MachineDisc {
  id: string;
  x: number;
  y: number;
  radius: number;
  slots: number;
  rotationVariable?: string;
  groupId?: string;
  zIndex?: number;
}

export interface MachineConveyor {
  id: string;
  type: 'ok' | 'ng' | 'custom';
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  width: number;
  groupId?: string;
  zIndex?: number;
}

export interface MachineFeeder {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  activeVariable?: string;
  groupId?: string;
  zIndex?: number;
}

// Basic shapes for component palette
export interface BasicShape {
  id: string;
  type: 'rectangle' | 'circle' | 'line' | 'text' | 'triangle' | 'hexagon' | 'ellipse';
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  text?: string;
  fontSize?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  sides?: number;
  // For line type
  endX?: number;
  endY?: number;
  groupId?: string;
  zIndex?: number;
}

export interface MachineGroup {
  id: string;
  type: 'group';
  x: number; // Groups have position (top-left of bounding box)
  y: number;
  rotation?: number;
  scaleX?: number;
  scaleY?: number;
  childIds: string[]; // Reference to children IDs
  groupId?: string; // Nested groups possibilities? Keep it simple for now: maybe 1 level deep or tree.
  zIndex?: number;
}

export interface MachineLayout {
  id: string;
  name: string;
  width: number;
  height: number;
  stations: MachineStation[];
  discs: MachineDisc[];
  conveyors: MachineConveyor[];
  feeders: MachineFeeder[];
  shapes: BasicShape[];
  groups: MachineGroup[]; // Added groups
}

export type MachineElement =
  | { type: 'station'; data: MachineStation }
  | { type: 'disc'; data: MachineDisc }
  | { type: 'conveyor'; data: MachineConveyor }
  | { type: 'feeder'; data: MachineFeeder }
  | { type: 'shape'; data: BasicShape }
  | { type: 'group'; data: MachineGroup };

export type EditorMode = 'edit' | 'runtime';

export interface EditorState {
  mode: EditorMode;
  selectedElement: MachineElement | null;
  isDragging: boolean;
  zoom: number;
  panOffset: { x: number; y: number };
}

// Grid settings
export interface GridSettings {
  visible: boolean;
  snapToGrid: boolean;
  gridSize: number;
}
