import React, { useRef, useEffect } from 'react';
import { Circle, Line, Group } from 'react-konva';
import type { MachineDisc } from '@/types/machine-editor';
import type Konva from 'konva/lib/Core';
import type { ThemeColors } from '@/hooks/useThemeColors';

interface KonvaDiscProps {
    disc: MachineDisc;
    angle: number;
    selected: boolean;
    mode: 'edit' | 'runtime';
    onSelect: () => void;
    onDragEnd: (x: number, y: number) => void;
    onUpdateElement?: (updates: Partial<MachineDisc>) => void;
    themeColors: ThemeColors;
}

const KonvaDisc: React.FC<KonvaDiscProps> = ({
    disc,
    angle,
    selected,
    mode,
    onSelect,
    onDragEnd,
    onUpdateElement,
    themeColors,
}) => {
    const groupRef = useRef<Konva.Group>(null);

    // Apply rotation animation
    useEffect(() => {
        if (groupRef.current) {
            groupRef.current.rotation(angle);
        }
    }, [angle]);

    const anglePerSlot = 360 / disc.slots;
    const slots = Array.from({ length: disc.slots }, (_, i) => {
        const slotAngle = i * anglePerSlot - 90;
        const rad = (slotAngle * Math.PI) / 180;
        const slotX = Math.cos(rad) * (disc.radius - 30);
        const slotY = Math.sin(rad) * (disc.radius - 30);
        const lineX = Math.cos(rad) * disc.radius;
        const lineY = Math.sin(rad) * disc.radius;

        return { slotX, slotY, lineX, lineY };
    });

    return (
        <Group
            id={disc.id}
            x={disc.x}
            y={disc.y}
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
                node.scaleX(1);
                node.scaleY(1);
                onDragEnd(node.x(), node.y());
            }}
        >
            <Group ref={groupRef}>
                {/* Main disc circle */}
                <Circle
                    x={0}
                    y={0}
                    radius={disc.radius}
                    fill={themeColors.card}
                    stroke={selected ? themeColors.selection : themeColors.border}
                    strokeWidth={selected ? 4 : 3}
                    shadowBlur={selected ? 10 : 0}
                    shadowColor={themeColors.selection}
                    shadowOpacity={0.8}
                />

                {/* Slots */}
                {slots.map((slot, i) => (
                    <React.Fragment key={i}>
                        {/* Segment line */}
                        <Line
                            points={[0, 0, slot.lineX, slot.lineY]}
                            stroke={themeColors.border}
                            strokeWidth={1}
                            opacity={0.5}
                        />

                        {/* Slot circle */}
                        <Circle
                            x={slot.slotX}
                            y={slot.slotY}
                            radius={12}
                            fill={themeColors.muted}
                            stroke={themeColors.border}
                            strokeWidth={1}
                            opacity={0.5}
                        />
                    </React.Fragment>
                ))}

                {/* Center hub */}
                <Circle
                    x={0}
                    y={0}
                    radius={20}
                    fill={themeColors.secondary}
                    stroke={themeColors.selection}
                    strokeWidth={2}
                />
            </Group>
        </Group>
    );
};

export default KonvaDisc;
