import React, { useMemo } from 'react';
import { Group, Rect } from 'react-konva';
import type { MachineGroup, MachineElement } from '@/types/machine-editor';

interface KonvaGroupProps {
    group: MachineGroup;
    selected: boolean;
    onSelect: (e: any) => void;
    onDragEnd: (x: number, y: number) => void;
    children: React.ReactNode;
}

const KonvaGroup: React.FC<KonvaGroupProps> = ({
    group,
    selected,
    onSelect,
    onDragEnd,
    children
}) => {
    return (
        <Group
            id={group.id}
            x={group.x}
            y={group.y}
            draggable
            onClick={onSelect}
            onTap={onSelect}
            onDragEnd={(e) => {
                onDragEnd(e.target.x(), e.target.y());
            }}
        >
            {/* Transparent background to capture clicks/drags for the whole group? 
                Or rely on children? 
                If we rely on children, clicking empty space inside group won't select it.
                Let's add a bounding box that is transparent but clickable.
            */}
            {/* 
                Bounding box calculation is complex here without knowing children sizes. 
                But grouping usually implies children move together.
                Konva Group handles children transforms.
                If selected, the Transformer will attach to this Group.
             */}
            {children}

            {/* Debug or Selection Outline? Handled by Transformer */}
        </Group>
    );
};

export default KonvaGroup;
