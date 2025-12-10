import React from 'react';
import { Rect, Circle, Line, Text, RegularPolygon, Ellipse, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';
import type { BasicShape } from '@/types/machine-editor';
import type { ThemeColors } from '@/hooks/useThemeColors';

interface KonvaBasicShapeProps {
    shape: BasicShape;
    selected: boolean;
    mode: 'edit' | 'runtime';
    onSelect: () => void;
    onDragEnd: (x: number, y: number) => void;
    onUpdateElement?: (updates: Partial<BasicShape>) => void;
    onNodeDblClick?: (shape: BasicShape) => void;
    themeColors: ThemeColors;
}

// Helper component for Image to use hook efficiently
const KonvaMainImage = ({ shape, commonProps, selectionStyle }: { shape: BasicShape, commonProps: any, selectionStyle: any }) => {
    // Determine source, fallback to placeholder if empty
    const src = shape.src || 'https://placehold.co/100x100?text=Image';
    const [image] = useImage(src);

    return (
        <KonvaImage
            id={shape.id}
            image={image}
            x={shape.x}
            y={shape.y}
            width={shape.width || 100}
            height={shape.height || 100}
            {...commonProps}
            {...selectionStyle}
        />
    );
};

const KonvaBasicShape: React.FC<KonvaBasicShapeProps> = ({
    shape,
    selected,
    mode,
    onSelect,
    onDragEnd,
    onUpdateElement,
    onNodeDblClick,
    themeColors,
}) => {
    const commonProps = {
        onClick: onSelect,
        onTap: onSelect,
        onDblClick: () => onNodeDblClick?.(shape),
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

                if (shape.type === 'circle' || shape.type === 'triangle' || shape.type === 'hexagon') {
                    // Use radius() * scaleX for accuracy (especially for polygons where width != 2*radius)
                    const unscaledRadius = (node as any).radius ? (node as any).radius() : (node.width() / 2);
                    const newRadius = unscaledRadius * scaleX;
                    updates.radius = newRadius;
                } else if (shape.type === 'rectangle' || shape.type === 'ellipse' || shape.type === 'image') {
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
            shadowColor: themeColors.selection,
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

        case 'triangle':
        case 'hexagon':
            return (
                <RegularPolygon
                    id={shape.id}
                    x={shape.x}
                    y={shape.y}
                    sides={shape.sides || (shape.type === 'triangle' ? 3 : 6)}
                    radius={shape.radius || 40}
                    fill={shape.fill || '#8b5cf6'}
                    stroke={shape.stroke || '#7c3aed'}
                    strokeWidth={shape.strokeWidth || 2}
                    {...commonProps}
                    {...selectionStyle}
                />
            );

        case 'ellipse':
            return (
                <Ellipse
                    id={shape.id}
                    x={shape.x}
                    y={shape.y}
                    radiusX={(shape.width || 80) / 2}
                    radiusY={(shape.height || 60) / 2}
                    fill={shape.fill || '#06b6d4'}
                    stroke={shape.stroke || '#0891b2'}
                    strokeWidth={shape.strokeWidth || 2}
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
                    text={shape.text || 'Text'}
                    fontSize={shape.fontSize || 16}
                    fill={shape.fill || '#ffffff'}
                    {...commonProps}
                    {...selectionStyle}
                />
            );

        case 'image':
            return (
                <KonvaMainImage
                    shape={shape}
                    commonProps={commonProps}
                    selectionStyle={selectionStyle}
                />
            );

        default:
            return null;
    }
};

export default KonvaBasicShape;
