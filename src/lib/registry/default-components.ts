import { ComponentDefinition } from '@/types/component-registry';

export const DEFAULT_COMPONENTS: ComponentDefinition[] = [
  // Basic Shapes
  {
    id: 'rectangle',
    name: 'Rectangle',
    icon: { type: 'lucide', name: 'Square' },
    actionType: 'createShape',
    shapeType: 'rectangle',
  },
  {
    id: 'circle',
    name: 'Circle',
    icon: { type: 'lucide', name: 'Circle' },
    actionType: 'createShape',
    shapeType: 'circle',
  },
  {
    id: 'line',
    name: 'Line',
    icon: { type: 'lucide', name: 'Minus' },
    actionType: 'createShape',
    shapeType: 'line',
  },
  {
    id: 'text',
    name: 'Text',
    icon: { type: 'lucide', name: 'Type' },
    actionType: 'createShape',
    shapeType: 'text',
  },
  // Machine Components
  {
    id: 'station',
    name: 'Station',
    icon: { type: 'lucide', name: 'Square' }, // Using Square for station icon
    actionType: 'createMachinePart',
    machinePartType: 'station',
  },
  {
    id: 'disc',
    name: 'Disc',
    icon: { type: 'lucide', name: 'Disc' },
    actionType: 'createMachinePart',
    machinePartType: 'disc',
  },
  {
    id: 'conveyor',
    name: 'Conveyor',
    icon: { type: 'lucide', name: 'ArrowRight' },
    actionType: 'createMachinePart',
    machinePartType: 'conveyor',
  },
  {
    id: 'feeder',
    name: 'Feeder',
    icon: { type: 'lucide', name: 'Package' },
    actionType: 'createMachinePart',
    machinePartType: 'feeder',
  },
];
