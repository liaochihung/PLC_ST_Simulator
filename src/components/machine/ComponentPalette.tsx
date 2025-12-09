import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import PaletteIcon from '@/components/ui/PaletteIcon';
import { DEFAULT_COMPONENTS } from '@/lib/registry/default-components';
import type { BasicShape } from '@/types/machine-editor';
import { ComponentDefinition } from '@/types/component-registry';

interface ComponentPaletteProps {
    onAddShape: (shape: Omit<BasicShape, 'id'>) => void;
    onAddStation: (type: 'feed' | 'assembly' | 'ok' | 'ng' | 'custom') => void;
    onAddDisc: () => void;
    onAddConveyor: () => void;
    onAddFeeder: () => void;
    layoutCenter: { x: number; y: number };
}

const ComponentPalette: React.FC<ComponentPaletteProps> = ({
    onAddShape,
    onAddStation,
    onAddDisc,
    onAddConveyor,
    onAddFeeder,
    layoutCenter,
}) => {
    const handleAddComponent = (component: ComponentDefinition) => {
        if (component.actionType === 'createShape' && component.shapeType) {
            // Default properties for shapes
            const defaultShapeProps = {
                x: layoutCenter.x,
                y: layoutCenter.y,
                strokeWidth: 2,
            };

            switch (component.shapeType) {
                case 'rectangle':
                    onAddShape({
                        ...defaultShapeProps,
                        type: 'rectangle',
                        width: 80,
                        height: 60,
                        fill: '#3b82f6',
                        stroke: '#1e40af',
                    });
                    break;
                case 'circle':
                    onAddShape({
                        ...defaultShapeProps,
                        type: 'circle',
                        radius: 40,
                        fill: '#10b981',
                        stroke: '#059669',
                    });
                    break;
                case 'line':
                    onAddShape({
                        ...defaultShapeProps,
                        type: 'line',
                        x: layoutCenter.x - 40,
                        y: layoutCenter.y,
                        endX: layoutCenter.x + 40,
                        endY: layoutCenter.y,
                        stroke: '#6366f1',
                        strokeWidth: 3,
                    });
                    break;
                case 'text':
                    onAddShape({
                        ...defaultShapeProps,
                        type: 'text',
                        text: '文字',
                        fontSize: 16,
                        fill: '#ffffff',
                    });
                    break;
                default:
                    console.warn(`Unknown shapeType: ${component.shapeType}`);
            }
        } else if (component.actionType === 'createMachinePart' && component.machinePartType) {
            switch (component.machinePartType) {
                case 'station':
                    onAddStation('custom');
                    break;
                case 'disc':
                    onAddDisc();
                    break;
                case 'conveyor':
                    onAddConveyor();
                    break;
                case 'feeder':
                    onAddFeeder();
                    break;
                default:
                    console.warn(`Unknown machinePartType: ${component.machinePartType}`);
            }
        }
    };

    const handleDragStart = (e: React.DragEvent, component: ComponentDefinition) => {
        // When dragging, we only care about the type of component to create,
        // not its specific properties, as these will be determined on drop.
        e.dataTransfer.setData('application/json', JSON.stringify({
            actionType: component.actionType,
            shapeType: component.shapeType,
            machinePartType: component.machinePartType,
        }));
        e.dataTransfer.effectAllowed = 'copy';
    };

    const shapeComponents = DEFAULT_COMPONENTS.filter(c => c.actionType === 'createShape');
    const machineComponents = DEFAULT_COMPONENTS.filter(c => c.actionType === 'createMachinePart');

    return (
        <div className="w-56 bg-card border-r border-border flex flex-col h-full">
            <div className="p-3 border-b border-border">
                <h3 className="font-semibold text-sm">元件面板</h3>
            </div>

            <ScrollArea className="flex-1">
                <div className="p-2 space-y-4">
                    {/* Basic Shapes */}
                    <div>
                        <h4 className="text-xs font-medium text-muted-foreground mb-2 px-2">基本形狀</h4>
                        <div className="space-y-1">
                            {shapeComponents.map(component => (
                                <div
                                    key={component.id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, component)}
                                    className="cursor-move"
                                >
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleAddComponent(component)}
                                        className="w-full justify-start h-8 px-2 text-xs pointer-events-none"
                                    >
                                        <PaletteIcon icon={component.icon} />
                                        <span className="ml-2">{component.name}</span>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Separator />

                    {/* Machine Components */}
                    <div>
                        <h4 className="text-xs font-medium text-muted-foreground mb-2 px-2">機器元件</h4>
                        <div className="space-y-1">
                            {machineComponents.map(component => (
                                <div
                                    key={component.id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, component)}
                                    className="cursor-move"
                                >
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleAddComponent(component)}
                                        className="w-full justify-start h-8 px-2 text-xs pointer-events-none"
                                    >
                                        <PaletteIcon icon={component.icon} />
                                        <span className="ml-2">{component.name}</span>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </ScrollArea>

            <div className="p-2 border-t border-border">
                <p className="text-xs text-muted-foreground">
                    點擊或拖曳元件到畫布
                </p>
            </div>
        </div>
    );
};

export default ComponentPalette;
