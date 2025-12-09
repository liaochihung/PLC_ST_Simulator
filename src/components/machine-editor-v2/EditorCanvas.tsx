import { Stage, Layer, Rect, Circle, Text, Transformer } from 'react-konva';
import { useEditorStore } from '@/stores/editorStore';
import { useRef, useEffect } from 'react';
import Konva from 'konva';
import { GridLayer } from './GridLayer';

export const EditorCanvas = () => {
    const elements = useEditorStore((state) => state.elements);
    const selectedIds = useEditorStore((state) => state.selectedIds);
    const actions = useEditorStore((state) => state.actions);

    const stageRef = useRef<Konva.Stage>(null);
    const trRef = useRef<Konva.Transformer>(null);

    useEffect(() => {
        if (trRef.current && stageRef.current) {
            const selectedNodes = stageRef.current.find((node: Konva.Node) => {
                return selectedIds.includes(node.id());
            });
            trRef.current.nodes(selectedNodes);
            trRef.current.getLayer()?.batchDraw();
        }
    }, [selectedIds, elements]);

    const checkDeselect = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            actions.clearSelection();
        }
    };

    const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
        e.evt.preventDefault();
        const stage = stageRef.current;
        if (!stage) return;

        const scaleBy = 1.1;
        const oldScale = stage.scaleX();
        const pointer = stage.getPointerPosition();

        if (!pointer) return;

        const mousePointTo = {
            x: (pointer.x - stage.x()) / oldScale,
            y: (pointer.y - stage.y()) / oldScale,
        };

        const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;

        stage.scale({ x: newScale, y: newScale });

        const newPos = {
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale,
        };

        stage.position(newPos);
        actions.setCanvasConfig({ scale: newScale, position: newPos });
    };

    const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
        // Stage drag end
        if (e.target === e.target.getStage()) {
            actions.setCanvasConfig({
                position: { x: e.target.x(), y: e.target.y() }
            });
        }
    };

    return (
        <Stage
            width={window.innerWidth - 320}
            height={window.innerHeight - 50}
            draggable
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
            onWheel={handleWheel}
            onDragEnd={handleDragEnd}
            ref={stageRef}
            style={{ background: '#f0f0f0' }}
        >
            <GridLayer />
            <Layer>
                {elements.map((el) => {
                    const commonProps = {
                        key: el.id,
                        id: el.id,
                        x: el.x,
                        y: el.y,
                        rotation: el.rotation,
                        fill: el.fill,
                        draggable: el.draggable,
                        onClick: (e: Konva.KonvaEventObject<MouseEvent>) => {
                            e.cancelBubble = true;
                            actions.selectElement(el.id, e.evt.shiftKey);
                        },
                        onDragEnd: (e: Konva.KonvaEventObject<DragEvent>) => {
                            actions.updateElement(el.id, {
                                x: e.target.x(),
                                y: e.target.y()
                            });
                        },
                        onTransformEnd: (e: Konva.KonvaEventObject<Event>) => {
                            const node = e.target;
                            const scaleX = node.scaleX();
                            const scaleY = node.scaleY();

                            node.scaleX(1);
                            node.scaleY(1);

                            const newAttrs: Partial<import('@/stores/editorStore').EditorElement> = {
                                x: node.x(),
                                y: node.y(),
                                rotation: node.rotation(),
                            };

                            if (el.type === 'rect') {
                                newAttrs.width = Math.max(5, (el.width || 0) * scaleX);
                                newAttrs.height = Math.max(5, (el.height || 0) * scaleY);
                            } else if (el.type === 'circle') {
                                newAttrs.radius = Math.max(5, (el.radius || 0) * scaleX);
                            }

                            actions.updateElement(el.id, newAttrs);
                        }
                    };

                    if (el.type === 'rect') {
                        return <Rect {...commonProps} width={el.width} height={el.height} />;
                    } else if (el.type === 'circle') {
                        return <Circle {...commonProps} radius={el.radius} />;
                    } else if (el.type === 'text') {
                        return <Text {...commonProps} text={el.text} fontSize={el.fontSize} />;
                    }
                    return null;
                })}

                <Transformer ref={trRef} />
            </Layer>
        </Stage>
    );
};
