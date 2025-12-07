import React, { useRef, useEffect } from 'react';
import { Circle, Line, Group } from 'react-konva';
import type { MachineDisc } from '@/types/machine-editor';
import type Konva from 'konva/lib/Core';

interface KonvaDiscProps {
    disc: MachineDisc;
    angle: number;
    selected: boolean;
    mode: 'edit' | 'runtime';
    onSelect: () => void;
    onDragEnd: (x: number, y: number) => void;
}

const KonvaDisc: React.FC<KonvaDiscProps> = ({
    disc,
    angle,
    selected,
    mode,
    onSelect,
    onDragEnd,
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
            x={disc.x}
            y={disc.y}
            draggable={mode === 'edit'}
            onClick={onSelect}
            onTap={onSelect}
            onDragEnd={(e) => {
                const node = e.target;
                onDragEnd(node.x(), node.y());
            }}
        >
            <Group ref={groupRef}>
                {/* Main disc circle */}
                <Circle
                    x={0}
                    y={0}
                    radius={disc.radius}
                    fill="#18181b" // card
                    stroke={selected ? '#6366f1' : '#27272a'} // primary : border
                    strokeWidth={selected ? 4 : 3}
                    shadowBlur={selected ? 10 : 0}
                    shadowColor="#6366f1"
                    shadowOpacity={0.8}
                />

                {/* Slots */}
                {slots.map((slot, i) => (
                    <React.Fragment key={i}>
                        {/* Segment line */}
                        <Line
                            points={[0, 0, slot.lineX, slot.lineY]}
                            stroke="#27272a"
                            strokeWidth={1}
                            opacity={0.5}
                        />

                        {/* Slot circle */}
                        <Circle
                            x={slot.slotX}
                            y={slot.slotY}
                            radius={12}
                            fill="#52525b"
                            stroke="#27272a"
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
                    fill="#27272a"
                    stroke="#6366f1"
                    strokeWidth={2}
                />
            </Group>
        </Group>
    );
};

export default KonvaDisc;
