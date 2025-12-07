import React from 'react';
import { Rect, Circle, Line, Text } from 'react-konva';
import type { BasicShape } from '@/types/machine-editor';

interface KonvaBasicShapeProps {
    shape: BasicShape;
    selected: boolean;
    mode: 'edit' | 'runtime';
    onSelect: () => void;
    onDragEnd: (x: number, y: number) => void;
}

const KonvaBasicShape: React.FC<KonvaBasicShapeProps> = ({
    shape,
    selected,
    mode,
    onSelect,
    onDragEnd,
}) => {
    const commonProps = {
        onClick: onSelect,
        onTap: onSelect,
        draggable: mode === 'edit',
        onDragEnd: (e: any) => {
            onDragEnd(e.target.x(), e.target.y());
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
