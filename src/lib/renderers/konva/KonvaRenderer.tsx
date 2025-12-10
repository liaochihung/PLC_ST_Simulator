import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Stage, Layer, Rect, Circle, Text, Transformer } from 'react-konva';
import Konva from 'konva';
import KonvaStation from './KonvaStation';
import KonvaDisc from './KonvaDisc';
import KonvaFeeder from './KonvaFeeder';
import KonvaConveyor from './KonvaConveyor';
import KonvaBasicShape from './KonvaBasicShape';
import KonvaGroup from './KonvaGroup';
import type { MachineLayout, MachineElement, EditorMode } from '@/types/machine-editor';
import type { MachineRuntimeState } from '@/types/renderer';

interface KonvaRendererProps {
    layout: MachineLayout;
    state: MachineRuntimeState;
    mode: EditorMode;
    zoom: number;
    panOffset: { x: number; y: number };
    selectedElements: MachineElement[];
    onSelectElement: (element: MachineElement | null, multi?: boolean) => void;
    onSelectElements: (elements: MachineElement[]) => void;
    onMoveElement: (element: MachineElement, deltaX: number, deltaY: number) => void;
    onUpdateElement?: (id: string, type: string, updates: any) => void;
    onDrop?: (type: string, x: number, y: number, data?: any) => void;
    gridVisible: boolean;
    gridSize: number;
    snapToGrid: boolean;
    isPanMode?: boolean;
    onPanOffsetChange?: (offset: { x: number; y: number }) => void;
    onNodeDblClick?: (node: any) => void;
}

const KonvaRenderer: React.FC<KonvaRendererProps> = ({
    layout,
    state,
    mode,
    zoom,
    panOffset,
    selectedElements,
    onSelectElement,
    onSelectElements,
    onMoveElement,
    onUpdateElement,
    onDrop,
    gridVisible,
    gridSize,
    snapToGrid,
    isPanMode = false,
    onPanOffsetChange,
    onNodeDblClick,
}) => {
    const [stageSize, setStageSize] = useState({ width: 500, height: 500 });
    const stageRef = useRef<Konva.Stage>(null);
    const trRef = useRef<Konva.Transformer>(null);

    // Rubber band selection state
    const [selectionBox, setSelectionBox] = useState<{ startX: number; startY: number; width: number; height: number } | null>(null);
    const isSelecting = useRef(false);

    // Pan mode state
    const [isPanning, setIsPanning] = useState(false);
    const panStart = useRef<{ x: number; y: number } | null>(null);

    // Update stage size on mount and resize
    useEffect(() => {
        const updateSize = () => {
            const container = document.getElementById('konva-container');
            if (container) {
                const width = container.clientWidth;
                const height = container.clientHeight;
                setStageSize({ width, height });
            }
        };

        updateSize();
        const resizeObserver = new ResizeObserver(() => updateSize());
        const container = document.getElementById('konva-container');
        if (container) resizeObserver.observe(container);
        return () => resizeObserver.disconnect();
    }, []);

    const isSelected = useCallback((type: string, id: string) => {
        return selectedElements.some(el => el.type === type && el.data.id === id);
    }, [selectedElements]);

    const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
        const target = e.target;
        const isBackground = target === target.getStage() || target.attrs.id === 'background' || target.attrs.name === 'layout-boundary';

        if (!isBackground) return;

        const stage = e.target.getStage();
        if (!stage) return;

        const pos = stage.getPointerPosition();
        if (!pos) return;

        // Pan mode: start panning
        if (isPanMode) {
            setIsPanning(true);
            const stagePos = stage.position();
            panStart.current = {
                x: pos.x - stagePos.x,
                y: pos.y - stagePos.y
            };
            return;
        }

        // Edit mode: start rubber band selection
        if (mode !== 'edit') return;

        const transform = e.target.getStage()?.getAbsoluteTransform().copy();
        transform?.invert();
        const pointerPos = transform?.point(pos);

        if (pointerPos) {
            setSelectionBox({
                startX: pointerPos.x,
                startY: pointerPos.y,
                width: 0,
                height: 0
            });
            isSelecting.current = true;
        }
    };

    const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
        const stage = e.target.getStage();
        if (!stage) return;

        const pos = stage.getPointerPosition();
        if (!pos) return;

        // Handle panning
        if (isPanning && panStart.current) {
            const newPos = {
                x: pos.x - panStart.current.x,
                y: pos.y - panStart.current.y
            };
            stage.position(newPos);
            stage.batchDraw();
            return;
        }

        // Handle rubber band selection
        if (!isSelecting.current || !selectionBox) return;

        const transform = stage.getAbsoluteTransform().copy();
        transform.invert();
        const pointerPos = transform.point(pos);

        setSelectionBox(prev => prev ? ({
            ...prev,
            width: pointerPos.x - prev.startX,
            height: pointerPos.y - prev.startY
        }) : null);
    };

    const handleMouseUp = (e: Konva.KonvaEventObject<MouseEvent>) => {
        const stage = e.target.getStage();

        // Handle pan end
        if (isPanning) {
            setIsPanning(false);
            panStart.current = null;
            // Update pan offset via callback
            if (stage && onPanOffsetChange) {
                const pos = stage.position();
                onPanOffsetChange({ x: pos.x, y: pos.y });
            }
            return;
        }

        // Handle selection box end
        if (isSelecting.current && selectionBox) {
            const box = {
                x: Math.min(selectionBox.startX, selectionBox.startX + selectionBox.width),
                y: Math.min(selectionBox.startY, selectionBox.startY + selectionBox.height),
                width: Math.abs(selectionBox.width),
                height: Math.abs(selectionBox.height)
            };

            // Check if this was just a click (minimal drag) vs actual rubber band selection
            const isMinimalDrag = box.width < 5 && box.height < 5;

            if (!isMinimalDrag) {
                // Actual rubber band selection
                const newSelection: MachineElement[] = [];

                const intersects = (itemX: number, itemY: number, itemW: number, itemH: number) => {
                    return (
                        box.x < itemX + itemW &&
                        box.x + box.width > itemX &&
                        box.y < itemY + itemH &&
                        box.y + box.height > itemY
                    );
                };

                // Check all top-level items (not in groups)
                layout.stations.forEach(s => {
                    if (!s.groupId && intersects(s.x, s.y, s.width, s.height)) {
                        newSelection.push({ type: 'station', data: s });
                    }
                });

                layout.discs.forEach(d => {
                    if (!d.groupId && intersects(d.x - d.radius, d.y - d.radius, d.radius * 2, d.radius * 2)) {
                        newSelection.push({ type: 'disc', data: d });
                    }
                });

                layout.feeders.forEach(f => {
                    if (!f.groupId && intersects(f.x, f.y, f.width, f.height)) {
                        newSelection.push({ type: 'feeder', data: f });
                    }
                });

                layout.conveyors.forEach(c => {
                    if (!c.groupId) {
                        const minX = Math.min(c.startX, c.endX);
                        const minY = Math.min(c.startY, c.endY);
                        const maxX = Math.max(c.startX, c.endX);
                        const maxY = Math.max(c.startY, c.endY);
                        if (intersects(minX, minY, maxX - minX, maxY - minY)) {
                            newSelection.push({ type: 'conveyor', data: c });
                        }
                    }
                });

                layout.shapes.forEach(s => {
                    if (!s.groupId && intersects(s.x, s.y, s.width || 0, s.height || 0)) {
                        newSelection.push({ type: 'shape', data: s });
                    }
                });

                // Check groups
                layout.groups.forEach(g => {
                    // For groups, check if any child intersects
                    const childIds = new Set(g.childIds);
                    let groupIntersects = false;

                    [...layout.stations, ...layout.discs, ...layout.conveyors, ...layout.feeders, ...layout.shapes].forEach(child => {
                        if (childIds.has(child.id)) {
                            // Type guard for elements with x, y properties
                            if ('x' in child && 'y' in child && 'width' in child && 'height' in child) {
                                const cx = g.x + child.x;
                                const cy = g.y + child.y;
                                if (intersects(cx, cy, child.width, child.height)) {
                                    groupIntersects = true;
                                }
                            } else if ('startX' in child && 'startY' in child) {
                                // Handle conveyor
                                const minX = Math.min(child.startX, child.endX);
                                const minY = Math.min(child.startY, child.endY);
                                const maxX = Math.max(child.startX, child.endX);
                                const maxY = Math.max(child.startY, child.endY);
                                if (intersects(g.x + minX, g.y + minY, maxX - minX, maxY - minY)) {
                                    groupIntersects = true;
                                }
                            }
                        }
                    });

                    if (groupIntersects) {
                        newSelection.push({ type: 'group', data: g });
                    }
                });

                // Apply selection
                if (newSelection.length > 0) {
                    onSelectElements(newSelection);
                } else {
                    // Empty selection box - deselect all
                    onSelectElement(null);
                }
            } else {
                // Minimal drag - treat as click on empty space, deselect
                onSelectElement(null);
            }

            setSelectionBox(null);
            isSelecting.current = false;
            return;
        }

        // Handle click on empty space to deselect (only in edit mode)
        if (mode === 'edit' && !isPanMode) {
            const target = e.target;
            const clickedOnEmpty =
                target === target.getStage() ||
                target.attrs.id === 'background' ||
                target.attrs.name === 'layout-boundary';

            if (clickedOnEmpty) {
                onSelectElement(null);
            }
        }
    };

    const offsetX = Math.max(0, (stageSize.width / zoom - layout.width) / 2);
    const offsetY = Math.max(0, (stageSize.height / zoom - layout.height) / 2);

    useEffect(() => {
        // Only show transformer in edit mode
        if (trRef.current && stageRef.current && mode === 'edit') {
            const nodes = selectedElements.map(el => stageRef.current?.findOne('#' + el.data.id)).filter(Boolean) as Konva.Node[];

            if (nodes.length > 0) {
                trRef.current.nodes(nodes);
                trRef.current.getLayer()?.batchDraw();
            } else {
                trRef.current.nodes([]);
                trRef.current.getLayer()?.batchDraw();
            }
        } else if (trRef.current) {
            // Hide transformer in runtime mode
            trRef.current.nodes([]);
            trRef.current.getLayer()?.batchDraw();
        }
    }, [selectedElements, mode, layout]);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (!onDrop) return;

        try {
            const json = e.dataTransfer.getData('application/json');
            if (!json) return;
            const { type, ...extraData } = JSON.parse(json);

            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const modelX = (x / zoom) - offsetX;
            const modelY = (y / zoom) - offsetY;

            onDrop(type, modelX, modelY, extraData);
        } catch (err) {
            console.error('Drop error:', err);
        }
    };

    // --- Recursive Render Helper ---
    const renderItem = (item: any) => {
        const commonProps = {
            // key property removed to be passed explicitly
            selected: isSelected(item.elementType, item.id),
            mode: mode,
            isRunning: state.isRunning,
            onSelect: (e?: any) => {
                const multi = e?.evt?.shiftKey;
                // If item found, dispatch select
                // Note: KonvaGroup might handle this too
                onSelectElement({ type: item.elementType, data: item }, multi);
                if (e) e.cancelBubble = true;
            },
            onDragEnd: (x: any, y: any) => {
                // For nested items, x/y are relative if inside group?
                // Konva drag gives absolute position usually, unless we use dragBoundFunc?
                // Wait, if we use <Group draggable>, children shouldn't be draggable independently?
                // If item is 'station' inside 'group', dragging 'group' moves 'station'.
                // We shouldn't enable draggable on children if they are in a group.

                // However, we passed 'draggable={mode === "edit"}' to KonvaStation.
                // We should disable draggable if it has a groupId?

                // DragEnd handling:
                // Group drag: updates group x/y.
                // Item drag: updates item x/y.

                if (item.elementType === 'conveyor') {
                    const deltaX = x - item.startX;
                    const deltaY = y - item.startY;
                    onMoveElement({ type: item.elementType, data: item }, deltaX, deltaY);
                } else {
                    const deltaX = x - item.x;
                    const deltaY = y - item.y;
                    onMoveElement({ type: item.elementType, data: item }, deltaX, deltaY);
                }
            },
            onUpdateElement: (updates: any) => onUpdateElement?.(item.id, item.elementType, updates),
            onNodeDblClick: onNodeDblClick
        };

        // Disable draggable if inside group
        const isChild = !!item.groupId;
        // NOTE: KonvaStation props usually include draggable control inside based on mode. 
        // We might need to pass `draggable={!isChild && mode === 'edit'}`.
        // But KonvaStation uses `draggable={mode === 'edit'}` internally.
        // We should fix this potentially, but for now let's assume Groups are draggable and Children are not?
        // Or if we select a child in a group, we select the GROUP really.

        switch (item.elementType) {
            case 'station':
                const stationState = state.stationStates.get(item.id);
                const active = stationState ? Object.values(stationState).some(v => v === true) : false;
                return <KonvaStation key={item.id} {...commonProps} station={item} active={active} />;
            case 'disc':
                return <KonvaDisc key={item.id} {...commonProps} disc={item} angle={state.discAngles.get(item.id) || 0} />;
            case 'feeder':
                return <KonvaFeeder key={item.id} {...commonProps} feeder={item} active={state.feederStates.get(item.id) || false} />;
            case 'conveyor':
                return <KonvaConveyor key={item.id} {...commonProps} conveyor={item} />;
            case 'shape':
                return <KonvaBasicShape key={item.id} {...commonProps} shape={item} />;
            case 'group':
                // Find children
                const children = [
                    ...layout.stations.map(s => ({ ...s, elementType: 'station' })),
                    ...layout.discs.map(d => ({ ...d, elementType: 'disc' })),
                    ...layout.feeders.map(f => ({ ...f, elementType: 'feeder' })),
                    ...layout.conveyors.map(c => ({ ...c, elementType: 'conveyor' })),
                    ...layout.shapes.map(s => ({ ...s, elementType: 'shape' })),
                    // nested groups? ...layout.groups.map(...)
                ].filter(child => child.groupId === item.id)
                    .sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));

                return (
                    <KonvaGroup
                        key={item.id}
                        group={item}
                        selected={isSelected('group', item.id)}
                        onSelect={(e) => {
                            const multi = e?.evt?.shiftKey;
                            onSelectElement({ type: 'group', data: item }, multi);
                            if (e) e.cancelBubble = true;
                        }}
                        onDragEnd={(x, y) => {
                            const deltaX = x - item.x;
                            const deltaY = y - item.y;
                            onMoveElement({ type: 'group', data: item }, deltaX, deltaY);
                        }}
                    >
                        {children.map(child => renderItem(child))}
                    </KonvaGroup>
                );
            default: return null;
        }
    };

    // Gather Top Level Items
    const topLevelItems = [
        ...layout.stations.map(s => ({ ...s, elementType: 'station' })),
        ...layout.discs.map(d => ({ ...d, elementType: 'disc' })),
        ...layout.feeders.map(f => ({ ...f, elementType: 'feeder' })),
        ...layout.conveyors.map(c => ({ ...c, elementType: 'conveyor' })),
        ...layout.shapes.map(s => ({ ...s, elementType: 'shape' })),
        ...layout.groups.map(g => ({ ...g, elementType: 'group' }))
    ].filter(item => !item.groupId)
        .sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));

    return (
        <div
            id="konva-container"
            className="w-full h-full flex items-center justify-center bg-zinc-950"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <Stage
                ref={stageRef}
                width={stageSize.width}
                height={stageSize.height}
                scaleX={zoom}
                scaleY={zoom}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                <Layer>
                    <Rect
                        id="background"
                        x={-offsetX * 10}
                        y={-offsetY * 10}
                        width={stageSize.width / zoom + offsetX * 20}
                        height={stageSize.height / zoom + offsetY * 20}
                        fill="#09090b"
                    />
                    {gridVisible && (
                        <>
                            {Array.from({ length: Math.ceil((stageSize.width / zoom) / gridSize) + 20 }).map((_, i) => (
                                <React.Fragment key={`v-${i}`}>
                                    <Rect
                                        x={(i * gridSize) - (offsetX % gridSize)}
                                        y={-offsetY}
                                        width={1}
                                        height={stageSize.height / zoom + offsetY * 2}
                                        fill="#27272a"
                                        opacity={0.3}
                                    />
                                </React.Fragment>
                            ))}
                            {Array.from({ length: Math.ceil((stageSize.height / zoom) / gridSize) + 20 }).map((_, i) => (
                                <React.Fragment key={`h-${i}`}>
                                    <Rect
                                        x={-offsetX}
                                        y={(i * gridSize) - (offsetY % gridSize)}
                                        width={stageSize.width / zoom + offsetX * 2}
                                        height={1}
                                        fill="#27272a"
                                        opacity={0.3}
                                    />
                                </React.Fragment>
                            ))}
                        </>
                    )}
                </Layer>

                <Layer x={offsetX} y={offsetY}>
                    <Rect
                        name="layout-boundary"
                        x={0}
                        y={0}
                        width={layout.width}
                        height={layout.height}
                        stroke="#27272a"
                        strokeWidth={2}
                        dash={[5, 5]}
                        opacity={0.5}
                    />

                    {/* Render All Items Recursively */}
                    {topLevelItems.map(item => renderItem(item))}

                    <Transformer
                        ref={trRef}
                        boundBoxFunc={(oldBox, newBox) => {
                            if (newBox.width < 5 || newBox.height < 5) {
                                return oldBox;
                            }
                            return newBox;
                        }}
                        anchorDragBoundFunc={(oldPos, newPos, event) => {
                            if (!snapToGrid) return newPos;
                            return {
                                x: Math.round(newPos.x / gridSize) * gridSize,
                                y: Math.round(newPos.y / gridSize) * gridSize,
                            };
                        }}
                    />
                </Layer>

                <Layer>
                    {selectionBox && (
                        <Rect
                            x={selectionBox.startX}
                            y={selectionBox.startY}
                            width={selectionBox.width}
                            height={selectionBox.height}
                            fill="rgba(0, 161, 255, 0.3)"
                            stroke="#00a1ff"
                            strokeWidth={1}
                        />
                    )}
                </Layer>

                <Layer>
                    {state.isRunning && mode === 'runtime' && (
                        <Circle
                            x={stageSize.width / zoom - 20}
                            y={20}
                            radius={8}
                            fill="#22c55e"
                            shadowBlur={8}
                            shadowColor="#22c55e"
                            shadowOpacity={1}
                        />
                    )}
                    {mode === 'edit' && (
                        <Text
                            x={10}
                            y={20}
                            text="Edit Mode"
                            fontSize={12}
                            fontStyle="600"
                            fill="#6366f1"
                        />
                    )}
                </Layer>
            </Stage>
        </div>
    );
};

export default KonvaRenderer;
