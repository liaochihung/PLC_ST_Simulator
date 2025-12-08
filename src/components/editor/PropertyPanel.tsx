import React from 'react';
import { useMachineEditor } from "@/hooks/useMachineEditor";
import MachinePropertyPanel from "@/components/machine/MachinePropertyPanel";
// import { MachineStation } from "@/types/machine-editor"; // Types inferred usually

export const PropertyPanel = () => {
    const {
        selectedElements,
        selectElement,
        updateStation,
        updateDisc,
        updateFeeder,
        updateConveyor,
        updateShape,
    } = useMachineEditor();

    const selectedElement = selectedElements.length === 1 ? selectedElements[0] : null;
    const hasMultiple = selectedElements.length > 1;

    const handleUpdate = (updates: any) => {
        if (!selectedElement) return;
        switch (selectedElement.type) {
            case 'station':
                updateStation(selectedElement.data.id, updates);
                break;
            case 'disc':
                updateDisc(selectedElement.data.id, updates);
                break;
            case 'feeder':
                updateFeeder(selectedElement.data.id, updates);
                break;
            case 'conveyor':
                updateConveyor(selectedElement.data.id, updates);
                break;
            case 'shape':
                updateShape(selectedElement.data.id, updates);
                break;
        }
    };

    return (
        <div className="h-full flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-3 border-b border-border bg-muted/20">
                <h2 className="text-sm font-semibold">屬性面板</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-3">
                {selectedElements.length === 0 && (
                    <div className="text-muted-foreground text-xs text-center mt-10">
                        未選擇任何物件
                    </div>
                )}

                {selectedElement && (
                    <div className="space-y-4">
                        <div className="text-xs text-muted-foreground mb-2">
                            ID: <code className="bg-muted px-1 rounded">{selectedElement.data.id}</code>
                        </div>
                        <MachinePropertyPanel
                            element={selectedElement}
                            onUpdate={handleUpdate}
                            onClose={() => selectElement(null)}
                            className="w-full space-y-4"
                        />
                    </div>
                )}

                {hasMultiple && (
                    <div className="space-y-4">
                        <div className="text-sm font-medium">
                            已選擇 {selectedElements.length} 個物件
                        </div>
                        <div className="text-xs text-muted-foreground">
                            請使用上方工具列進行群組或對齊操作。
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
