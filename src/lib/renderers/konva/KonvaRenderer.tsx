import React, { useState, useCallback, useEffect } from 'react';
import { Stage, Layer, Rect, Circle, Text } from 'react-konva';
import KonvaStation from './KonvaStation';
import KonvaDisc from './KonvaDisc';
import KonvaFeeder from './KonvaFeeder';
import KonvaConveyor from './KonvaConveyor';
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
}) => {
    const [stageSize, setStageSize] = useState({ width: 500, height: 500 });

    // Update stage size on mount and resize
    useEffect(() => {
        const updateSize = () => {
            const container = document.getElementById('konva-container');
            if (container) {
                const width = Math.min(container.clientWidth, 500);
                const height = Math.min(container.clientHeight, 500);
                setStageSize({ width, height });
            }
        };

        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
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

    return (
        <div id="konva-container" className="w-full h-full flex items-center justify-center">
            <Stage
                width={stageSize.width}
                height={stageSize.height}
                scaleX={zoom}
                scaleY={zoom}
                onClick={handleStageClick}
                onTap={handleStageClick}
            >
                {/* Background Layer */}
                <Layer>
                    <Rect
                        id="background"
                        x={0}
                        y={0}
                        width={layout.width}
                        height={layout.height}
                        fill="#09090b"
                    />

                    {/* Grid pattern */}
                    {Array.from({ length: Math.floor(layout.width / 20) }).map((_, i) => (
                        <React.Fragment key={`v-${i}`}>
                            <Rect
                                x={i * 20}
                                y={0}
                                width={1}
                                height={layout.height}
                                fill="#27272a"
                                opacity={0.3}
                            />
                        </React.Fragment>
                    ))}
                    {Array.from({ length: Math.floor(layout.height / 20) }).map((_, i) => (
                        <React.Fragment key={`h-${i}`}>
                            <Rect
                                x={0}
                                y={i * 20}
                                width={layout.width}
                                height={1}
                                fill="#27272a"
                                opacity={0.3}
                            />
                        </React.Fragment>
                    ))}
                </Layer>

                {/* Elements Layer */}
                <Layer>
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
                </Layer>

                {/* UI Layer */}
                <Layer>
                    {/* Running indicator */}
                    {state.isRunning && mode === 'runtime' && (
                        <Circle
                            x={layout.width - 20}
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
