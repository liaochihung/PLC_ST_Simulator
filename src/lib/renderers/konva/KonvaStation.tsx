import React from 'react';
import { Rect, Text, Circle, Group } from 'react-konva';
import type { MachineStation } from '@/types/machine-editor';
import type { ThemeColors } from '@/hooks/useThemeColors';

interface KonvaStationProps {
    station: MachineStation;
    active: boolean;
    selected: boolean;
    isRunning: boolean;
    mode: 'edit' | 'runtime';
    onSelect: (e: any) => void;
    onDragEnd: (x: number, y: number) => void;
    onUpdateElement?: (updates: Partial<MachineStation>) => void;
    themeColors: ThemeColors;
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
    themeColors,
}) => {
    const getStationColor = (type: MachineStation['type']) => {
        switch (type) {
            case 'feed': return themeColors.stationFeed;
            case 'assembly': return themeColors.stationAssembly;
            case 'ok': return themeColors.stationOk;
            case 'ng': return themeColors.stationNg;
            default: return themeColors.selection;
        }
    };

    const color = getStationColor(station.type);
    const fillColor = active ? color : themeColors.secondary;
    const strokeColor = selected ? themeColors.selection : color;
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
                shadowColor={selected ? themeColors.selection : color}
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
                fill={active ? themeColors.activeText : themeColors.inactiveText}
                align="center"
            />

            {/* Station name text */}
            <Text
                x={-station.width / 2}
                y={-station.height / 2 + 20}
                width={station.width}
                text={station.name}
                fontSize={8}
                fill={active ? themeColors.activeText : themeColors.inactiveSecondaryText}
                align="center"
            />

            {/* LED indicator */}
            <Circle
                x={station.width / 2 - 8}
                y={-station.height / 2 + 8}
                radius={3}
                fill={active && isRunning ? color : themeColors.ledInactive}
                shadowBlur={active && isRunning ? 6 : 0}
                shadowColor={color}
                shadowOpacity={1}
            />
        </Group>
    );
};

export default KonvaStation;
