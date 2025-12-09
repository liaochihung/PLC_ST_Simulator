export type IconDefinition =
  | { type: 'lucide'; name: string }
  | { type: 'svg'; content: string };

export interface ComponentDefinition {
  id: string;
  name: string;
  icon: IconDefinition;
  actionType: 'createShape' | 'createMachinePart';
  // You might want to add more properties here for specific component creation data
  // For example, for createShape:
  shapeType?: 'rectangle' | 'circle' | 'line' | 'text';
  // For createMachinePart:
  machinePartType?: 'station' | 'disc' | 'conveyor' | 'feeder';
}
