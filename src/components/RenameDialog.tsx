import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface RenameDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    currentName: string;
    onConfirm: (newName: string) => void;
    title?: string;
    description?: string;
}

const RenameDialog: React.FC<RenameDialogProps> = ({
    open,
    onOpenChange,
    currentName,
    onConfirm,
    title = 'Rename',
    description = 'Enter a new name for this item.',
}) => {
    const [newName, setNewName] = useState(currentName);
    const [error, setError] = useState('');

    useEffect(() => {
        if (open) {
            setNewName(currentName);
            setError('');
        }
    }, [open, currentName]);

    const handleConfirm = () => {
        const trimmedName = newName.trim();

        if (!trimmedName) {
            setError('Name cannot be empty');
            return;
        }

        if (trimmedName === currentName) {
            setError('Name must be different');
            return;
        }

        // Close dialog first, then call onConfirm to avoid state update conflicts
        onOpenChange(false);

        // Use setTimeout to ensure dialog closes before triggering rename
        setTimeout(() => {
            onConfirm(trimmedName);
        }, 0);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleConfirm();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={newName}
                            onChange={(e) => {
                                setNewName(e.target.value);
                                setError('');
                            }}
                            onKeyDown={handleKeyDown}
                            placeholder="Enter new name"
                            autoFocus
                        />
                        {error && (
                            <p className="text-sm text-destructive">{error}</p>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm}>
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default RenameDialog;
