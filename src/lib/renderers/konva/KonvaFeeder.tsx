import React from 'react';
import { Rect, Text, Circle, Group } from 'react-konva';
import type { MachineFeeder } from '@/types/machine-editor';

interface KonvaFeederProps {
    feeder: MachineFeeder;
    active: boolean;
    selected: boolean;
    isRunning: boolean;
    mode: 'edit' | 'runtime';
    onSelect: () => void;
    onDragEnd: (x: number, y: number) => void;
    onUpdateElement?: (updates: Partial<MachineFeeder>) => void;
}

const KonvaFeeder: React.FC<KonvaFeederProps> = ({
    feeder,
    active,
    selected,
    isRunning,
    mode,
    onSelect,
    onDragEnd,
    onUpdateElement,
}) => {
    const strokeColor = selected ? '#6366f1' : (active ? '#10b981' : '#27272a');
    const strokeWidth = selected ? 3 : 2;

    return (
        <Group
            id={feeder.id}
            x={feeder.x}
            y={feeder.y}
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

                node.scaleX(1);
                node.scaleY(1);

                if (onUpdateElement) {
                    onUpdateElement({
                        x: node.x(),
                        y: node.y(),
                        // Feeder doesn't have rotation in standard type? Check it. 
                        // If it has angle, add it.
                        // MachineFeeder has x,y,width,height. No angle in type definition I recall?
                        // Let's check type if needed. Assuming width/height resize.
                        width: Math.max(5, feeder.width * scaleX),
                        height: Math.max(5, feeder.height * scaleY),
                    });
                }
            }}
        >
            {/* Main rect */}
            <Rect
                x={-feeder.width / 2}
                y={-feeder.height / 2}
                width={feeder.width}
                height={feeder.height}
                cornerRadius={4}
                fill="#27272a"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                shadowBlur={selected ? 10 : 0}
                shadowColor="#6366f1"
                shadowOpacity={0.8}
            />

            {/* Feeder name - split into two lines */}
            <Text
                x={-feeder.width / 2}
                y={-feeder.height / 2 + 15}
                width={feeder.width}
                text={feeder.name.slice(0, 2)}
                fontSize={10}
                fill="#fafafa"
                align="center"
            />

            <Text
                x={-feeder.width / 2}
                y={-feeder.height / 2 + 30}
                width={feeder.width}
                text={feeder.name.slice(2, 4)}
                fontSize={10}
                fill="#fafafa"
                align="center"
            />

            {/* LED indicator */}
            <Circle
                x={-feeder.width / 2 + 10}
                y={-feeder.height / 2 + 10}
                radius={4}
                fill={active && isRunning ? '#10b981' : '#52525b'}
                shadowBlur={active && isRunning ? 6 : 0}
                shadowColor="#10b981"
                shadowOpacity={1}
            />
        </Group>
    );
};

export default KonvaFeeder;
