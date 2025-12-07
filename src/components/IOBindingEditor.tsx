import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface IOBindingEditorProps {
    bindings: string[];
    onChange: (bindings: string[]) => void;
    label: string;
    placeholder?: string;
}

const IOBindingEditor: React.FC<IOBindingEditorProps> = ({
    bindings,
    onChange,
    label,
    placeholder = '輸入變數名稱 (例: X0, M100)',
}) => {
    const handleAdd = () => {
        onChange([...bindings, '']);
    };

    const handleRemove = (index: number) => {
        const newBindings = bindings.filter((_, i) => i !== index);
        onChange(newBindings);
    };

    const handleChange = (index: number, value: string) => {
        const newBindings = [...bindings];
        newBindings[index] = value;
        onChange(newBindings);
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <Label className="text-xs font-medium">{label}</Label>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleAdd}
                    className="h-6 px-2 text-xs"
                >
                    <Plus className="h-3 w-3 mr-1" />
                    新增
                </Button>
            </div>

            {bindings.length === 0 ? (
                <div className="text-xs text-muted-foreground text-center py-2 border border-dashed rounded">
                    尚無綁定變數
                </div>
            ) : (
                <ScrollArea className="max-h-32">
                    <div className="space-y-1.5">
                        {bindings.map((binding, index) => (
                            <div key={index} className="flex items-center gap-1.5">
                                <Input
                                    value={binding}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    placeholder={placeholder}
                                    className="h-7 text-xs flex-1"
                                />
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRemove(index)}
                                    className="h-7 w-7 p-0"
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            )}
        </div>
    );
};

export default IOBindingEditor;
