import { ComponentDefinition } from '@/types/component-registry';

export const DEFAULT_COMPONENTS: ComponentDefinition[] = [
  // Basic Shapes
  {
    id: 'rectangle',
    name: '矩形',
    icon: { type: 'lucide', name: 'Square' },
    actionType: 'createShape',
    shapeType: 'rectangle',
  },
  {
    id: 'circle',
    name: '圓形',
    icon: { type: 'lucide', name: 'Circle' },
    actionType: 'createShape',
    shapeType: 'circle',
  },
  {
    id: 'line',
    name: '線條',
    icon: { type: 'lucide', name: 'Minus' },
    actionType: 'createShape',
    shapeType: 'line',
  },
  {
    id: 'text',
    name: '文字',
    icon: { type: 'lucide', name: 'Type' },
    actionType: 'createShape',
    shapeType: 'text',
  },
  // Machine Components
  {
    id: 'station',
    name: '工作站',
    icon: { type: 'lucide', name: 'Square' }, // Using Square for station icon
    actionType: 'createMachinePart',
    machinePartType: 'station',
  },
  {
    id: 'disc',
    name: '轉盤',
    icon: { type: 'lucide', name: 'Disc' },
    actionType: 'createMachinePart',
    machinePartType: 'disc',
  },
  {
    id: 'conveyor',
    name: '輸送帶',
    icon: { type: 'lucide', name: 'ArrowRight' },
    actionType: 'createMachinePart',
    machinePartType: 'conveyor',
  },
  {
    id: 'feeder',
    name: '送料機',
    icon: { type: 'lucide', name: 'Package' },
    actionType: 'createMachinePart',
    machinePartType: 'feeder',
  },
];
