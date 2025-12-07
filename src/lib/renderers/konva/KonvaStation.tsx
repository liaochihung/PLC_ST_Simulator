import React from 'react';
import { Rect, Text, Circle, Group } from 'react-konva';
import type { MachineStation } from '@/types/machine-editor';

interface KonvaStationProps {
    station: MachineStation;
    active: boolean;
    selected: boolean;
    isRunning: boolean;
    mode: 'edit' | 'runtime';
    onSelect: () => void;
    onDragEnd: (x: number, y: number) => void;
    onUpdateElement?: (updates: Partial<MachineStation>) => void;
}

const KonvaStation: React.FC<KonvaStationProps> = ({
    station,
    active,
    selected,
    isRunning,
    mode,
    onSelect,
    onDragEnd,
    onUpdateElement,
}) => {
    const getStationColor = (type: MachineStation['type']) => {
        switch (type) {
            case 'feed': return '#10b981'; // green
            case 'assembly': return '#3b82f6'; // blue
            case 'ok': return '#22c55e'; // green
            case 'ng': return '#ef4444'; // red
            default: return '#6366f1'; // primary
        }
    };

    const color = getStationColor(station.type);
    const fillColor = active ? color : '#27272a'; // secondary
    const strokeColor = selected ? '#6366f1' : color;
    const strokeWidth = selected ? 3 : 2;
    const opacity = active ? 1 : 0.6;

    return (
        <Group
            id={station.id}
            x={station.x}
            y={station.y}
            rotation={station.angle}
            draggable={mode === 'edit'}
            onClick={onSelect}
            onTap={onSelect}
            onDragEnd={(e) => {
                const node = e.target;
                onDragEnd(node.x(), node.y());
            }}
            onTransformEnd={(e) => {
                const node = e.target;
                const scaleX = node.scaleX();
                const scaleY = node.scaleY();

                // Reset scale
                node.scaleX(1);
                node.scaleY(1);

                if (onUpdateElement) {
                    onUpdateElement({
                        x: node.x(),
                        y: node.y(),
                        angle: node.rotation(),
                        width: Math.max(5, station.width * scaleX),
                        height: Math.max(5, station.height * scaleY),
                    });
                }
            }}
        >
            {/* Main rect */}
            <Rect
                width={station.width}
                height={station.height}
                offsetX={station.width / 2}
                offsetY={station.height / 2}
                cornerRadius={4}
                fill={fillColor}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                opacity={opacity}
                shadowBlur={selected ? 10 : (active && isRunning ? 8 : 0)}
                shadowColor={selected ? '#6366f1' : color}
                shadowOpacity={0.8}
            />

            {/* Station ID text */}
            <Text
                x={-station.width / 2}
                y={-station.height / 2 + 8}
                width={station.width}
                text={station.id.toUpperCase()}
                fontSize={10}
                fontStyle="600"
                fill={active ? '#ffffff' : '#fafafa'}
                align="center"
            />

            {/* Station name text */}
            <Text
                x={-station.width / 2}
                y={-station.height / 2 + 20}
                width={station.width}
                text={station.name}
                fontSize={8}
                fill={active ? '#ffffff' : '#a1a1aa'}
                align="center"
            />

            {/* LED indicator */}
            <Circle
                x={station.width / 2 - 8}
                y={-station.height / 2 + 8}
                radius={3}
                fill={active && isRunning ? color : '#52525b'}
                shadowBlur={active && isRunning ? 6 : 0}
                shadowColor={color}
                shadowOpacity={1}
            />
        </Group>
    );
};

export default KonvaStation;
