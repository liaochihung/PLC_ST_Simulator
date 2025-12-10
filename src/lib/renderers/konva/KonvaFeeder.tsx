import React from 'react';
import { Rect, Text, Circle, Group } from 'react-konva';
import type { MachineFeeder } from '@/types/machine-editor';
import type { ThemeColors } from '@/hooks/useThemeColors';

interface KonvaFeederProps {
    feeder: MachineFeeder;
    active: boolean;
    selected: boolean;
    isRunning: boolean;
    mode: 'edit' | 'runtime';
    onSelect: () => void;
    onDragEnd: (x: number, y: number) => void;
    onUpdateElement?: (updates: Partial<MachineFeeder>) => void;
    themeColors: ThemeColors;
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
    themeColors,
}) => {
    const strokeColor = selected ? themeColors.selection : (active ? themeColors.stationFeed : themeColors.border);
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
                fill={themeColors.secondary}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                shadowBlur={selected ? 10 : 0}
                shadowColor={themeColors.selection}
                shadowOpacity={0.8}
            />

            {/* Feeder name - split into two lines */}
            <Text
                x={-feeder.width / 2}
                y={-feeder.height / 2 + 15}
                width={feeder.width}
                text={feeder.name.slice(0, 2)}
                fontSize={10}
                fill={themeColors.inactiveText}
                align="center"
            />

            <Text
                x={-feeder.width / 2}
                y={-feeder.height / 2 + 30}
                width={feeder.width}
                text={feeder.name.slice(2, 4)}
                fontSize={10}
                fill={themeColors.inactiveText}
                align="center"
            />

            {/* LED indicator */}
            <Circle
                x={-feeder.width / 2 + 10}
                y={-feeder.height / 2 + 10}
                radius={4}
                fill={active && isRunning ? themeColors.stationFeed : themeColors.ledInactive}
                shadowBlur={active && isRunning ? 6 : 0}
                shadowColor={themeColors.stationFeed}
                shadowOpacity={1}
            />
        </Group>
    );
};

export default KonvaFeeder;
