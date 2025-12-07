import React, { useState, useCallback, useEffect } from 'react';
import { Stage, Layer, Rect, Circle, Text } from 'react-konva';
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
    selectedElement: MachineElement | null;
    onSelectElement: (element: MachineElement | null) => void;
    onMoveElement: (element: MachineElement, deltaX: number, deltaY: number) => void;
    gridVisible: boolean;
    gridSize: number;
}

const KonvaRenderer: React.FC<KonvaRendererProps> = ({
    layout,
    state,
    mode,
    zoom,
    panOffset,
    selectedElement,
    onSelectElement,
    onMoveElement,
    gridVisible,
    gridSize,
}) => {
    const [stageSize, setStageSize] = useState({ width: 500, height: 500 });

    // Update stage size on mount and resize
    // Update stage size on mount and resize
    useEffect(() => {
        const updateSize = () => {
            const container = document.getElementById('konva-container');
            if (container) {
                // Use a larger max size or remove the limit if appropriate
                // For now, increasing to a reasonable large value to support full screen
                const width = container.clientWidth;
                const height = container.clientHeight;
                setStageSize({ width, height });
            }
        };

        // Initial size
        updateSize();

        // Use ResizeObserver to detect container size changes
        const resizeObserver = new ResizeObserver(() => {
            updateSize();
        });

        const container = document.getElementById('konva-container');
        if (container) {
            resizeObserver.observe(container);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    const isSelected = useCallback((type: string, id: string) => {
        return selectedElement?.type === type && selectedElement?.data?.id === id;
    }, [selectedElement]);

    const handleStageClick = useCallback((e: any) => {
        // Deselect if clicking on stage background
        if (e.target === e.target.getStage() || e.target.attrs.id === 'background') {
            onSelectElement(null);
        }
    }, [onSelectElement]);

    // Calculate offset to center the layout
    const centerX = (stageSize.width - layout.width * zoom) / 2;
    const centerY = (stageSize.height - layout.height * zoom) / 2;

    // Combined offset (centering + panning)
    // Note: We apply zoom to layout dimensions for centering, but Konva Scale applies to the whole layer.
    // Simpler approach: Center the unscaled layout, then let Scale handle zoom.
    const offsetX = Math.max(0, (stageSize.width / zoom - layout.width) / 2);
    const offsetY = Math.max(0, (stageSize.height / zoom - layout.height) / 2);

    return (
        <div id="konva-container" className="w-full h-full flex items-center justify-center bg-zinc-950">
            <Stage
                width={stageSize.width}
                height={stageSize.height}
                scaleX={zoom}
                scaleY={zoom}
                onClick={handleStageClick}
                onTap={handleStageClick}
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
                            onSelect={() => onSelectElement({ type: 'feeder', data: feeder })}
                            onDragEnd={(x, y) => {
                                const deltaX = x - feeder.x;
                                const deltaY = y - feeder.y;
                                onMoveElement({ type: 'feeder', data: feeder }, deltaX, deltaY);
                            }}
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
                            onSelect={() => onSelectElement({ type: 'disc', data: disc })}
                            onDragEnd={(x, y) => {
                                const deltaX = x - disc.x;
                                const deltaY = y - disc.y;
                                onMoveElement({ type: 'disc', data: disc }, deltaX, deltaY);
                            }}
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
                            onSelect={() => onSelectElement({ type: 'conveyor', data: conveyor })}
                            onDragEnd={(startX, startY, endX, endY) => {
                                const deltaX = startX - conveyor.startX;
                                const deltaY = startY - conveyor.startY;
                                onMoveElement({ type: 'conveyor', data: conveyor }, deltaX, deltaY);
                            }}
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
                                onSelect={() => onSelectElement({ type: 'station', data: station })}
                                onDragEnd={(x, y) => {
                                    const deltaX = x - station.x;
                                    const deltaY = y - station.y;
                                    onMoveElement({ type: 'station', data: station }, deltaX, deltaY);
                                }}
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
                            onSelect={() => onSelectElement({ type: 'shape', data: shape })}
                            onDragEnd={(x, y) => {
                                const deltaX = x - shape.x;
                                const deltaY = y - shape.y;
                                onMoveElement({ type: 'shape', data: shape }, deltaX, deltaY);
                            }}
                        />
                    ))}
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
