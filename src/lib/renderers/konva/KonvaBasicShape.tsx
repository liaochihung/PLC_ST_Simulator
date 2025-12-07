import React from 'react';
import { Rect, Circle, Line, Text } from 'react-konva';
import type { BasicShape } from '@/types/machine-editor';

interface KonvaBasicShapeProps {
    shape: BasicShape;
    selected: boolean;
    mode: 'edit' | 'runtime';
    onSelect: () => void;
    onDragEnd: (x: number, y: number) => void;
    onUpdateElement?: (updates: Partial<BasicShape>) => void;
}

const KonvaBasicShape: React.FC<KonvaBasicShapeProps> = ({
    shape,
    selected,
    mode,
    onSelect,
    onDragEnd,
    onUpdateElement,
}) => {
    const commonProps = {
        onClick: onSelect,
        onTap: onSelect,
        draggable: mode === 'edit',
        onDragEnd: (e: any) => {
            onDragEnd(e.target.x(), e.target.y());
        },
        onTransformEnd: (e: any) => {
            const node = e.target;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();

            node.scaleX(1);
            node.scaleY(1);

            if (onUpdateElement) {
                // Determine updates based on shape type
                const updates: any = {
                    x: node.x(),
                    y: node.y(),
                    // Basic shapes don't have rotation yet in interface, but Konva has it.
                    // If we add rotation to BasicShape interface later, we can sync it.
                };

                if (shape.type === 'circle') {
                    // Circle radius is scaled
                    // Use node.width() which is 2*radius for circle in Konva
                    // effectiveWidth = node.width() * scaleX
                    // newRadius = effectiveWidth / 2
                    const newRadius = (node.width() * scaleX) / 2;
                    updates.radius = newRadius;
                } else if (shape.type === 'rectangle') {
                    updates.width = node.width() * scaleX;
                    updates.height = node.height() * scaleY;
                } else if (shape.type === 'text') {
                    updates.fontSize = (node.fontSize() || 16) * scaleY;
                }

                onUpdateElement(updates);
            }
        },
    };

    const selectionStyle = selected
        ? {
            shadowColor: '#6366f1',
            shadowBlur: 10,
            shadowOpacity: 0.8,
        }
        : {};

    switch (shape.type) {
        case 'rectangle':
            return (
                <Rect
                    id={shape.id}
                    x={shape.x}
                    y={shape.y}
                    width={shape.width || 80}
                    height={shape.height || 60}
                    fill={shape.fill || '#3b82f6'}
                    stroke={shape.stroke || '#1e40af'}
                    strokeWidth={shape.strokeWidth || 2}
                    {...commonProps}
                    {...selectionStyle}
                />
            );

        case 'circle':
            return (
                <Circle
                    id={shape.id}
                    x={shape.x}
                    y={shape.y}
                    radius={shape.radius || 40}
                    fill={shape.fill || '#10b981'}
                    stroke={shape.stroke || '#059669'}
                    strokeWidth={shape.strokeWidth || 2}
                    {...commonProps}
                    {...selectionStyle}
                />
            );

        case 'line':
            return (
                <Line
                    id={shape.id}
                    points={[
                        shape.x,
                        shape.y,
                        shape.endX || shape.x + 80,
                        shape.endY || shape.y,
                    ]}
                    stroke={shape.stroke || '#6366f1'}
                    strokeWidth={shape.strokeWidth || 3}
                    {...commonProps}
                    {...selectionStyle}
                />
            );

        case 'text':
            return (
                <Text
                    id={shape.id}
                    x={shape.x}
                    y={shape.y}
                    text={shape.text || '文字'}
                    fontSize={shape.fontSize || 16}
                    fill={shape.fill || '#ffffff'}
                    {...commonProps}
                    {...selectionStyle}
                />
            );

        default:
            return null;
    }
};

export default KonvaBasicShape;
