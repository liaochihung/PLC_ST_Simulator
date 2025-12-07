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
}

export interface MachineDisc {
  id: string;
  x: number;
  y: number;
  radius: number;
  slots: number;
  rotationVariable?: string;
}

export interface MachineConveyor {
  id: string;
  type: 'ok' | 'ng' | 'custom';
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  width: number;
}

export interface MachineFeeder {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  activeVariable?: string;
}

// Basic shapes for component palette
export interface BasicShape {
  id: string;
  type: 'rectangle' | 'circle' | 'line' | 'text';
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
  // For line type
  endX?: number;
  endY?: number;
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
}

export type MachineElement =
  | { type: 'station'; data: MachineStation }
  | { type: 'disc'; data: MachineDisc }
  | { type: 'conveyor'; data: MachineConveyor }
  | { type: 'feeder'; data: MachineFeeder }
  | { type: 'shape'; data: BasicShape };

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
