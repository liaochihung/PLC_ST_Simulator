import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Stage, Layer, Rect, Circle, Text, Transformer } from 'react-konva';
import Konva from 'konva';
import KonvaStation from './KonvaStation';
import KonvaDisc from './KonvaDisc';
import KonvaFeeder from './KonvaFeeder';
import KonvaConveyor from './KonvaConveyor';
import KonvaBasicShape from './KonvaBasicShape';
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
    snapToGrid: boolean; // Add this prop
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
}) => {
    const [stageSize, setStageSize] = useState({ width: 500, height: 500 });
    const stageRef = useRef<Konva.Stage>(null);
    const trRef = useRef<Konva.Transformer>(null);

    // Rubber band selection state
    const [selectionBox, setSelectionBox] = useState<{ startX: number; startY: number; width: number; height: number } | null>(null);
    const isSelecting = useRef(false);

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

    const handleStageClick = useCallback((e: any) => {
        // If clicking on empty stage and NOT dragging selection
        if (selectionBox) {
            // End of selection drag, handled in MouseUp
            return;
        }

        if (e.target === e.target.getStage() || e.target.attrs.id === 'background') {
            onSelectElement(null);
        }
    }, [onSelectElement, selectionBox]);

    const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
        if (e.target !== e.target.getStage() && e.target.attrs.id !== 'background') return;

        // Start rubber band selection
        const stage = e.target.getStage();
        if (!stage) return;

        const pos = stage.getPointerPosition();
        if (!pos) return;

        // Convert to stage coordinates (taking pan/zoom into account if needed, but for drawing Rect on top layer we might want absolute? 
        // Actually, let's draw the selection box in stage coords (relative to zoom) so it matches the scene)
        // But usually selection box is screen space.
        // Let's implement logic: 
        // We track StartX/Y in "Page" or "Stage" logic.
        // Since we want to select items in the "Layer" which is transformed by offsetX/Y, we need to be careful.
        // Let's store raw pointer position relative to stage top-left (untransformed by stage scale?)
        // Stage scale is applied to everything.

        // Let's work in "Stage local" coordinates (before Zoom?) No, Stage has scale.
        // pointerPos is relative to stage container top-left.
        // To draw a Rect on a Layer that is NOT scaled, we can just use pointerPos.
        // But our Layers ARE scaled (or stage is).

        // Let's use `model` coordinates for logic, but draw rect using relevant transform.
        // OR: simpler, put Selection Rect on a top Layer that has NO transform (scale=1, x=0, y=0).
        // But Stage has scale.
        // So we need to invert scale for the selection rect if we put it in a non-scaled layer?
        // Let's put it in a Layer that shares Stage scale/position?
        // Actually the easiest is to calculate everything in Model Space.

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
        if (!isSelecting.current || !selectionBox) return;

        const stage = e.target.getStage();
        if (!stage) return;

        const pos = stage.getPointerPosition();
        if (!pos) return;

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
        if (isSelecting.current && selectionBox) {
            // Perform selection
            // Calculate absolute box
            const box = {
                x: Math.min(selectionBox.startX, selectionBox.startX + selectionBox.width),
                y: Math.min(selectionBox.startY, selectionBox.startY + selectionBox.height),
                width: Math.abs(selectionBox.width),
                height: Math.abs(selectionBox.height)
            };

            // Check intersections with layout elements
            const newSelection: MachineElement[] = [];

            // Helper to check intersection
            const intersects = (itemX: number, itemY: number, itemW: number, itemH: number) => {
                return (
                    box.x < itemX + itemW &&
                    box.x + box.width > itemX &&
                    box.y < itemY + itemH &&
                    box.y + box.height > itemY
                );
            };

            // Iterate all elements
            layout.stations.forEach(s => {
                if (intersects(s.x, s.y, s.width, s.height)) newSelection.push({ type: 'station', data: s });
            });
            layout.discs.forEach(d => {
                // Approximate circle as square for selection
                if (intersects(d.x - d.radius, d.y - d.radius, d.radius * 2, d.radius * 2)) newSelection.push({ type: 'disc', data: d });
            });
            layout.conveyors.forEach(c => {
                // Simplified: check bounding box of start/end
                const minX = Math.min(c.startX, c.endX);
                const minY = Math.min(c.startY, c.endY);
                const w = Math.abs(c.endX - c.startX) + c.width; // rough approx
                const h = Math.abs(c.endY - c.startY) + c.width;
                if (intersects(minX - c.width / 2, minY - c.width / 2, w, h)) newSelection.push({ type: 'conveyor', data: c });
            });
            layout.feeders.forEach(f => {
                if (intersects(f.x, f.y, f.width, f.height)) newSelection.push({ type: 'feeder', data: f });
            });
            layout.shapes.forEach(s => {
                // rough approx for all
                if (intersects(s.x, s.y, s.width || 50, s.height || 50)) newSelection.push({ type: 'shape', data: s });
            });

            onSelectElements(newSelection);

            setSelectionBox(null);
            isSelecting.current = false;
        }
    };

    // Calculate offset to center the layout
    const offsetX = Math.max(0, (stageSize.width / zoom - layout.width) / 2);
    const offsetY = Math.max(0, (stageSize.height / zoom - layout.height) / 2);

    // Transformer logic
    useEffect(() => {
        if (trRef.current && stageRef.current) {
            const nodes = selectedElements.map(el => stageRef.current?.findOne('#' + el.data.id)).filter(Boolean) as Konva.Node[];

            if (nodes.length > 0) {
                trRef.current.nodes(nodes);
                trRef.current.getLayer()?.batchDraw();
            } else {
                trRef.current.nodes([]);
                trRef.current.getLayer()?.batchDraw();
            }
        }
    }, [selectedElements, mode, layout]); // Add layout to dep to refind node if re-rendered

    // Drop handler
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

            // Get pointer position relative to container
            // e.nativeEvent.offsetX does not work reliably with React synthetic events sometimes on drops?
            // Use getBoundingClientRect
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Convert to model coordinates
            // ScreenX -> StageX -> ModelX
            // StageX = ScreenX / Zoom
            // ModelX = StageX - OffsetX
            const modelX = (x / zoom) - offsetX;
            const modelY = (y / zoom) - offsetY;

            onDrop(type, modelX, modelY, extraData);
        } catch (err) {
            console.error('Drop error:', err);
        }
    };

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
                onClick={handleStageClick}
                onTap={handleStageClick}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                {/* Background Layer (Static relative to view, unaffected by zoom/pan if we want it fixed, but usually we want it to zoom) 
                    Actually, for an infinite canvas feel, we might want the grid to always fill.
                    However, `layout` defines the "working area". 
                    If we want the background to fill the *window*, we should draw a large rect.
                */}
                <Layer>
                    <Rect
                        id="background"
                        x={-offsetX * 10} // Extend far beyond
                        y={-offsetY * 10}
                        width={stageSize.width / zoom + offsetX * 20} // Make it huge
                        height={stageSize.height / zoom + offsetY * 20}
                        fill="#09090b"
                    />

                    {/* Grid pattern */}
                    {gridVisible && (
                        <>
                            {Array.from({ length: Math.ceil((stageSize.width / zoom) / gridSize) + 20 }).map((_, i) => (
                                <React.Fragment key={`v-${i}`}>
                                    <Rect
                                        x={(i * gridSize) - (offsetX % gridSize)} // Align grid
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

                {/* Elements Layer - Centered */}
                <Layer x={offsetX} y={offsetY}>
                    {/* Outline of the defined layout area */}
                    <Rect
                        x={0}
                        y={0}
                        width={layout.width}
                        height={layout.height}
                        stroke="#27272a"
                        strokeWidth={2}
                        dash={[5, 5]}
                        opacity={0.5}
                    />

                    {/* Feeders */}
                    {layout.feeders.map((feeder) => (
                        <KonvaFeeder
                            key={feeder.id}
                            feeder={feeder}
                            active={state.feederStates.get(feeder.id) || false}
                            selected={isSelected('feeder', feeder.id)}
                            isRunning={state.isRunning}
                            mode={mode}
                            onSelect={(e) => {
                                const multi = e?.evt?.shiftKey;
                                onSelectElement({ type: 'feeder', data: feeder }, multi);
                                // Stop propagation? Konva event bubbling might trigger stage click
                                if (e) e.cancelBubble = true;
                            }}
                            onDragEnd={(x, y) => {
                                const deltaX = x - feeder.x;
                                const deltaY = y - feeder.y;
                                onMoveElement({ type: 'feeder', data: feeder }, deltaX, deltaY);
                            }}
                            onUpdateElement={(updates) => onUpdateElement?.(feeder.id, 'feeder', updates)}
                        />
                    ))}

                    {/* Discs */}
                    {layout.discs.map((disc) => (
                        <KonvaDisc
                            key={disc.id}
                            disc={disc}
                            angle={state.discAngles.get(disc.id) || 0}
                            selected={isSelected('disc', disc.id)}
                            mode={mode}
                            onSelect={(e) => {
                                const multi = e?.evt?.shiftKey;
                                onSelectElement({ type: 'disc', data: disc }, multi);
                                if (e) e.cancelBubble = true;
                            }}
                            onDragEnd={(x, y) => {
                                const deltaX = x - disc.x;
                                const deltaY = y - disc.y;
                                onMoveElement({ type: 'disc', data: disc }, deltaX, deltaY);
                            }}
                            onUpdateElement={(updates) => onUpdateElement?.(disc.id, 'disc', updates)}
                        />
                    ))}

                    {/* Conveyors */}
                    {layout.conveyors.map((conveyor) => (
                        <KonvaConveyor
                            key={conveyor.id}
                            conveyor={conveyor}
                            selected={isSelected('conveyor', conveyor.id)}
                            isRunning={state.isRunning}
                            mode={mode}
                            onSelect={(e) => {
                                const multi = e?.evt?.shiftKey;
                                onSelectElement({ type: 'conveyor', data: conveyor }, multi);
                                if (e) e.cancelBubble = true;
                            }}
                            onDragEnd={(startX, startY, endX, endY) => {
                                const deltaX = startX - conveyor.startX;
                                const deltaY = startY - conveyor.startY;
                                onMoveElement({ type: 'conveyor', data: conveyor }, deltaX, deltaY);
                            }}
                            onUpdateElement={(updates) => onUpdateElement?.(conveyor.id, 'conveyor', updates)}
                        />
                    ))}

                    {/* Stations */}
                    {layout.stations.map((station) => {
                        const stationState = state.stationStates.get(station.id);
                        const active = stationState ? Object.values(stationState).some(v => v === true) : false;

                        return (
                            <KonvaStation
                                key={station.id}
                                station={station}
                                active={active}
                                selected={isSelected('station', station.id)}
                                isRunning={state.isRunning}
                                mode={mode}
                                onSelect={(e) => {
                                    const multi = e?.evt?.shiftKey;
                                    onSelectElement({ type: 'station', data: station }, multi);
                                    if (e) e.cancelBubble = true;
                                }}
                                onDragEnd={(x, y) => {
                                    const deltaX = x - station.x;
                                    const deltaY = y - station.y;
                                    onMoveElement({ type: 'station', data: station }, deltaX, deltaY);
                                }}
                                onUpdateElement={(updates) => onUpdateElement?.(station.id, 'station', updates)}
                            />
                        );
                    })}

                    {/* Shapes */}
                    {layout.shapes.map((shape) => (
                        <KonvaBasicShape
                            key={shape.id}
                            shape={shape}
                            selected={isSelected('shape', shape.id)}
                            mode={mode}
                            onSelect={(e) => {
                                const multi = e?.evt?.shiftKey;
                                onSelectElement({ type: 'shape', data: shape }, multi);
                                if (e) e.cancelBubble = true;
                            }}
                            onDragEnd={(x, y) => {
                                const deltaX = x - shape.x;
                                const deltaY = y - shape.y;
                                onMoveElement({ type: 'shape', data: shape }, deltaX, deltaY);
                            }}
                            onUpdateElement={(updates) => onUpdateElement?.(shape.id, 'shape', updates)}
                        />
                    ))}

                    {/* Transformer */}
                    <Transformer
                        ref={trRef}
                        boundBoxFunc={(oldBox, newBox) => {
                            // Limit minimum size
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

                {/* Selection Layer */}
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

                {/* UI Layer - Static overlays */}
                <Layer>
                    {/* Running indicator */}
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

                    {/* Edit mode indicator */}
                    {mode === 'edit' && (
                        <Text
                            x={10}
                            y={20}
                            text="編輯模式"
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
