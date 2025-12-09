import { EditorCanvas } from './EditorCanvas';
import { PropertyPanel } from './PropertyPanel';
import { Button } from '@/components/ui/button';
import { useEditorStore } from '@/stores/editorStore';

export const EditorLayout = () => {
    const addElement = useEditorStore((state) => state.actions.addElement);

    return (
        <div className="flex h-screen w-full flex-col overflow-hidden">
            {/* Toolbar */}
            <div className="flex h-12 items-center border-b px-4 gap-2 bg-background">
                <span className="font-bold mr-4">Machine Editor V2</span>
                <Button variant="secondary" size="sm" onClick={() => addElement('rect')}>
                    Add Rect
                </Button>
                <Button variant="secondary" size="sm" onClick={() => addElement('circle')}>
                    Add Circle
                </Button>
                <Button variant="secondary" size="sm" onClick={() => addElement('text')}>
                    Add Text
                </Button>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Main Canvas Area */}
                <div className="flex-1 bg-gray-100 relative">
                    <EditorCanvas />
                </div>

                {/* Right Sidebar */}
                <div className="w-80 border-l bg-background">
                    <PropertyPanel />
                </div>
            </div>
        </div>
    );
};
