import { useEditorStore } from '@/stores/editorStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export const PropertyPanel = () => {
    const selectedIds = useEditorStore((state) => state.selectedIds);
    const elements = useEditorStore((state) => state.elements);
    const updateElement = useEditorStore((state) => state.actions.updateElement);
    const deleteSelected = useEditorStore((state) => state.actions.deleteSelected);

    const selectedElement = elements.find(el => selectedIds.includes(el.id));

    if (!selectedElement) {
        return (
            <div className="p-4 text-muted-foreground text-sm">
                No element selected
            </div>
        );
    }

    const handleChange = (key: string, value: string | number) => {
        updateElement(selectedElement.id, { [key]: value });
    };

    return (
        <div className="p-4 flex flex-col gap-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm">Properties</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-1">
                        <Label>ID</Label>
                        <div className="text-xs text-muted-foreground">{selectedElement.id.slice(0, 8)}...</div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                            <Label>X</Label>
                            <Input
                                type="number"
                                value={selectedElement.x}
                                onChange={(e) => handleChange('x', Number(e.target.value))}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label>Y</Label>
                            <Input
                                type="number"
                                value={selectedElement.y}
                                onChange={(e) => handleChange('y', Number(e.target.value))}
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <Label>Fill Color</Label>
                        <Input
                            type="color"
                            value={selectedElement.fill}
                            onChange={(e) => handleChange('fill', e.target.value)}
                        />
                    </div>

                    {selectedElement.type === 'rect' && (
                        <>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1">
                                    <Label>Width</Label>
                                    <Input
                                        type="number"
                                        value={selectedElement.width || 0}
                                        onChange={(e) => handleChange('width', Number(e.target.value))}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label>Height</Label>
                                    <Input
                                        type="number"
                                        value={selectedElement.height || 0}
                                        onChange={(e) => handleChange('height', Number(e.target.value))}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {selectedElement.type === 'circle' && (
                        <div className="space-y-1">
                            <Label>Radius</Label>
                            <Input
                                type="number"
                                value={selectedElement.radius || 0}
                                onChange={(e) => handleChange('radius', Number(e.target.value))}
                            />
                        </div>
                    )}

                    {selectedElement.type === 'text' && (
                        <>
                            <div className="space-y-1">
                                <Label>Text</Label>
                                <Input
                                    type="text"
                                    value={selectedElement.text || ''}
                                    onChange={(e) => handleChange('text', e.target.value)}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label>Font Size</Label>
                                <Input
                                    type="number"
                                    value={selectedElement.fontSize || 20}
                                    onChange={(e) => handleChange('fontSize', Number(e.target.value))}
                                />
                            </div>
                        </>
                    )}

                    <div className="space-y-1">
                        <Label>Rotation</Label>
                        <Input
                            type="number"
                            value={selectedElement.rotation}
                            onChange={(e) => handleChange('rotation', Number(e.target.value))}
                        />
                    </div>

                    <div className="space-y-1">
                        <Label>PLC Tag</Label>
                        <Input
                            type="text"
                            value={selectedElement.plcTag || ''}
                            placeholder="e.g. GVL.MotorRunning"
                            onChange={(e) => handleChange('plcTag', e.target.value)}
                        />
                    </div>

                    <Button variant="destructive" className="w-full" onClick={deleteSelected}>
                        Delete
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};
