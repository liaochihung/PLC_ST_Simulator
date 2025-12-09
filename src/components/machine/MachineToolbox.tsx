import React, { useState } from 'react';
import {
    Square,
    Circle,
    Minus,
    Type,
    Package,
    ArrowRight,
    Disc,
    Box,
    ToggleLeft,
    CheckSquare,
    Gauge,
    Link,
    Image,
    LayoutTemplate,
    List,
    LayoutGrid,
    Triangle,
    Hexagon,
    Orbit
} from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ComponentItem {
    id: string;
    name: string;
    icon: React.ReactNode;
    type: string;
    extraData?: any;
    // Fuxa categories
    category: 'machine' | 'shapes' | 'controls' | 'widgets' | 'views';
}

const MachineToolbox = () => {
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');

    // Defines available components mimicking Fuxa categories
    // Note: Some of these are placeholders for future implementation
    const components: ComponentItem[] = [
        // --- 1. VIEWS ---
        {
            id: 'view',
            name: 'View',
            type: 'view',
            icon: <LayoutTemplate className="w-4 h-4" />,
            category: 'views'
        },
        // --- 2. MACHINE (Our Core) ---
        {
            id: 'station',
            name: 'Station',
            type: 'station',
            icon: <Box className="w-4 h-4 text-orange-500" />,
            category: 'machine'
        },
        {
            id: 'disc',
            name: 'Disc',
            type: 'disc',
            icon: <Disc className="w-4 h-4 text-blue-500" />,
            category: 'machine'
        },
        {
            id: 'conveyor',
            name: 'Conveyor',
            type: 'conveyor',
            icon: <ArrowRight className="w-4 h-4 text-green-500" />,
            category: 'machine'
        },
        {
            id: 'feeder',
            name: 'Feeder',
            type: 'feeder',
            icon: <Package className="w-4 h-4 text-yellow-500" />,
            category: 'machine'
        },
        // --- 3. SHAPES ---
        {
            id: 'rectangle',
            name: 'Rectangle',
            type: 'rectangle',
            icon: <Square className="w-4 h-4" />,
            category: 'shapes',
            extraData: { width: 80, height: 60, fill: '#3b82f6' }
        },
        {
            id: 'circle',
            name: 'Circle',
            type: 'circle',
            icon: <Circle className="w-4 h-4" />,
            category: 'shapes',
            extraData: { radius: 40, fill: '#10b981' }
        },
        {
            id: 'line',
            name: 'Line',
            type: 'line',
            icon: <Minus className="w-4 h-4" />,
            category: 'shapes',
            extraData: { strokeWidth: 3, endX: 40, endY: 0 }
        },
        {
            id: 'text',
            name: 'Text',
            type: 'text',
            icon: <Type className="w-4 h-4" />,
            category: 'shapes',
            extraData: { text: 'Text', fontSize: 16 }
        },
        {
            id: 'triangle',
            name: 'Triangle',
            type: 'triangle',
            icon: <Triangle className="w-4 h-4" />,
            category: 'shapes',
            extraData: { radius: 40, fill: '#8b5cf6', sides: 3 }
        },
        {
            id: 'hexagon',
            name: 'Hexagon',
            type: 'hexagon',
            icon: <Hexagon className="w-4 h-4" />,
            category: 'shapes',
            extraData: { radius: 40, fill: '#ec4899', sides: 6 }
        },
        {
            id: 'ellipse',
            name: 'Ellipse',
            type: 'ellipse',
            icon: <Circle className="w-4 h-4 scale-x-150" />, // Using Circle with transform for ellipse
            category: 'shapes',
            extraData: { width: 80, height: 40, fill: '#06b6d4' }
        },
        // --- 4. CONTROLS (Placeholder) ---
        {
            id: 'button',
            name: 'Button',
            type: 'button',
            icon: <Square className="w-4 h-4 bg-muted" />,
            category: 'controls'
        },
        {
            id: 'switch',
            name: 'Switch',
            type: 'switch',
            icon: <ToggleLeft className="w-4 h-4" />,
            category: 'controls'
        },
        {
            id: 'checkbox',
            name: 'CheckBox',
            type: 'checkbox',
            icon: <CheckSquare className="w-4 h-4" />,
            category: 'controls'
        },
        // --- 5. WIDGETS (Placeholder) ---
        {
            id: 'gauge',
            name: 'Gauge',
            type: 'gauge',
            icon: <Gauge className="w-4 h-4" />,
            category: 'widgets'
        },
        {
            id: 'input',
            name: 'Input',
            type: 'input',
            icon: <Box className="w-4 h-4 border border-dashed" />,
            category: 'widgets'
        },
        // --- 6. RESOURCES ---
        {
            id: 'image',
            name: 'Image',
            type: 'image',
            icon: <Image className="w-4 h-4" />,
            category: 'shapes',
            extraData: { width: 100, height: 100, src: 'https://placehold.co/100' }
        },
    ];

    const getComponentsByCategory = (cat: string) => components.filter(c => c.category === cat);

    const handleDragStart = (e: React.DragEvent, item: ComponentItem) => {
        // Prepare data for Konva Drop
        const dropData = {
            type: item.type,
            ...item.extraData
        };
        e.dataTransfer.setData('application/json', JSON.stringify(dropData));
        e.dataTransfer.effectAllowed = 'copy';
    };

    const categories = [
        { id: 'views', label: 'Views' },
        { id: 'machine', label: 'Machine' },
        { id: 'shapes', label: 'Shapes' },
        { id: 'controls', label: 'Controls' },
        { id: 'widgets', label: 'Widgets' },
    ];

    return (
        <div className="h-full flex flex-col bg-background">
            <div className="p-3 border-b border-border bg-muted/20 flex items-center justify-between">
                <h3 className="font-semibold text-sm">Toolbox</h3>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => setViewMode(prev => prev === 'list' ? 'grid' : 'list')}
                    title={viewMode === 'list' ? 'Switch to Grid View' : 'Switch to List View'}
                >
                    {viewMode === 'list' ? <LayoutGrid className="h-4 w-4" /> : <List className="h-4 w-4" />}
                </Button>
            </div>

            <ScrollArea className="flex-1">
                <div className="p-2">
                    <Accordion type="multiple" defaultValue={['machine', 'shapes', 'views']} className="w-full">
                        {categories.map(cat => (
                            <AccordionItem value={cat.id} key={cat.id} className="border-b-0 space-y-1 mb-2">
                                <AccordionTrigger className="py-2 px-1 hover:no-underline hover:bg-muted/50 rounded-md text-xs font-semibold uppercase tracking-wider text-muted-foreground group">
                                    {cat.label}
                                </AccordionTrigger>
                                <AccordionContent className="pb-2">
                                    <div className={`grid gap-2 p-1 ${viewMode === 'list' ? 'grid-cols-2' : 'grid-cols-4'}`}>
                                        {getComponentsByCategory(cat.id).map(item => (
                                            <div
                                                key={item.id}
                                                draggable
                                                onDragStart={(e) => handleDragStart(e, item)}
                                                className="cursor-move"
                                                title={viewMode === 'grid' ? item.name : undefined}
                                            >
                                                <Button
                                                    variant="outline"
                                                    className={`w-full text-xs flex items-center gap-2 bg-card hover:bg-accent hover:border-accent-foreground/50 transition-all shadow-sm ${viewMode === 'list'
                                                            ? 'justify-start h-9 px-2'
                                                            : 'justify-center h-9 px-0'
                                                        }`}
                                                >
                                                    {item.icon}
                                                    {viewMode === 'list' && <span className="truncate">{item.name}</span>}
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                    {getComponentsByCategory(cat.id).length === 0 && (
                                        <div className="text-xs text-muted-foreground px-2 py-1 italic opacity-50">
                                            Empty category
                                        </div>
                                    )}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </ScrollArea>
        </div>
    );
};

export default MachineToolbox;