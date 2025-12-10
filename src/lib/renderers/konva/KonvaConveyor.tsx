import React from 'react';
import { Line, Rect, Text, Group } from 'react-konva';
import type { MachineConveyor } from '@/types/machine-editor';

interface KonvaConveyorProps {
    conveyor: MachineConveyor;
    selected: boolean;
    isRunning: boolean;
    mode: 'edit' | 'runtime';
    onSelect: () => void;
    onDragEnd: (startX: number, startY: number, endX: number, endY: number) => void;
    onUpdateElement?: (updates: Partial<MachineConveyor>) => void;
}

const KonvaConveyor: React.FC<KonvaConveyorProps> = ({
    conveyor,
    selected,
    isRunning,
    mode,
    onSelect,
    onDragEnd,
    onUpdateElement,
}) => {
    const getConveyorColor = (type: MachineConveyor['type']) => {
        switch (type) {
            case 'ok': return '#22c55e';
            case 'ng': return '#ef4444';
            default: return '#6366f1';
        }
    };

    const color = getConveyorColor(conveyor.type);
    const strokeColor = selected ? '#6366f1' : '#27272a';
    const strokeWidth = selected ? 6 : 4;

    const label = conveyor.type === 'ok' ? 'OK Outfeed' :
        conveyor.type === 'ng' ? 'NG Outfeed' : 'Conveyor';

    return (
        <Group
            id={conveyor.id}
            draggable={mode === 'edit'}
            onClick={onSelect}
            onTap={onSelect}
            onDragEnd={(e) => {
                const node = e.target;
                const deltaX = node.x();
                const deltaY = node.y();
                onDragEnd(
                    conveyor.startX + deltaX,
                    conveyor.startY + deltaY,
                    conveyor.endX + deltaX,
                    conveyor.endY + deltaY
                );
                node.position({ x: 0, y: 0 });
            }}
        >
            {/* Conveyor line */}
            <Line
                points={[conveyor.startX, conveyor.startY, conveyor.endX, conveyor.endY]}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                dash={isRunning ? [5, 5] : undefined}
                shadowBlur={selected ? 10 : 0}
                shadowColor="#6366f1"
                shadowOpacity={0.8}
            />

            {/* Label rect */}
            <Rect
                x={conveyor.endX}
                y={conveyor.endY - 15}
                width={60}
                height={30}
                cornerRadius={4}
                fill="#27272a"
                stroke={color}
                strokeWidth={2}
            />

            {/* Label text */}
            <Text
                x={conveyor.endX}
                y={conveyor.endY - 5}
                width={60}
                text={label}
                fontSize={10}
                fontStyle="600"
                fill={color}
                align="center"
            />
        </Group>
    );
};

export default KonvaConveyor;
