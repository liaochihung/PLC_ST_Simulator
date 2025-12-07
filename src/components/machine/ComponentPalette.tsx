import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
    Square,
    Circle,
    Minus,
    Type,
    Box,
    ArrowRight,
    Disc,
    Package,
} from 'lucide-react';
import type { BasicShape } from '@/types/machine-editor';

// Extensible component configuration
interface ComponentItem {
    id: string;
    name: string;
    icon: React.ReactNode;
    category: 'shapes' | 'machine';
    onAdd: () => void;
}

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
    // Extensible component configuration
    const components: ComponentItem[] = [
        // Basic Shapes
        {
            id: 'rectangle',
            name: '矩形',
            icon: <Square className="w-4 h-4" />,
            category: 'shapes',
            onAdd: () => onAddShape({
                type: 'rectangle',
                x: layoutCenter.x,
                y: layoutCenter.y,
                width: 80,
                height: 60,
                fill: '#3b82f6',
                stroke: '#1e40af',
                strokeWidth: 2,
            }),
        },
        {
            id: 'circle',
            name: '圓形',
            icon: <Circle className="w-4 h-4" />,
            category: 'shapes',
            onAdd: () => onAddShape({
                type: 'circle',
                x: layoutCenter.x,
                y: layoutCenter.y,
                radius: 40,
                fill: '#10b981',
                stroke: '#059669',
                strokeWidth: 2,
            }),
        },
        {
            id: 'line',
            name: '線條',
            icon: <Minus className="w-4 h-4" />,
            category: 'shapes',
            onAdd: () => onAddShape({
                type: 'line',
                x: layoutCenter.x - 40,
                y: layoutCenter.y,
                endX: layoutCenter.x + 40,
                endY: layoutCenter.y,
                stroke: '#6366f1',
                strokeWidth: 3,
            }),
        },
        {
            id: 'text',
            name: '文字',
            icon: <Type className="w-4 h-4" />,
            category: 'shapes',
            onAdd: () => onAddShape({
                type: 'text',
                x: layoutCenter.x,
                y: layoutCenter.y,
                text: '文字',
                fontSize: 16,
                fill: '#ffffff',
            }),
        },
        // Machine Components
        {
            id: 'station',
            name: '工作站',
            icon: <Square className="w-4 h-4 text-station-feed" />,
            category: 'machine',
            onAdd: () => onAddStation('custom'),
        },
        {
            id: 'disc',
            name: '轉盤',
            icon: <Disc className="w-4 h-4" />,
            category: 'machine',
            onAdd: onAddDisc,
        },
        {
            id: 'conveyor',
            name: '輸送帶',
            icon: <ArrowRight className="w-4 h-4" />,
            category: 'machine',
            onAdd: onAddConveyor,
        },
        {
            id: 'feeder',
            name: '送料機',
            icon: <Package className="w-4 h-4" />,
            category: 'machine',
            onAdd: onAddFeeder,
        },
    ];

    const shapeComponents = components.filter(c => c.category === 'shapes');
    const machineComponents = components.filter(c => c.category === 'machine');

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
                                <Button
                                    key={component.id}
                                    variant="ghost"
                                    size="sm"
                                    onClick={component.onAdd}
                                    className="w-full justify-start h-8 px-2 text-xs"
                                >
                                    {component.icon}
                                    <span className="ml-2">{component.name}</span>
                                </Button>
                            ))}
                        </div>
                    </div>

                    <Separator />

                    {/* Machine Components */}
                    <div>
                        <h4 className="text-xs font-medium text-muted-foreground mb-2 px-2">機器元件</h4>
                        <div className="space-y-1">
                            {machineComponents.map(component => (
                                <Button
                                    key={component.id}
                                    variant="ghost"
                                    size="sm"
                                    onClick={component.onAdd}
                                    className="w-full justify-start h-8 px-2 text-xs"
                                >
                                    {component.icon}
                                    <span className="ml-2">{component.name}</span>
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </ScrollArea>

            <div className="p-2 border-t border-border">
                <p className="text-xs text-muted-foreground">
                    點擊元件以新增到畫布
                </p>
            </div>
        </div>
    );
};

export default ComponentPalette;
