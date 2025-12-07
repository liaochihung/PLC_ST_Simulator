import React, { useEffect, useState } from 'react';
import { ProjectService, ProjectSummary } from '@/lib/services/ProjectService';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, FolderOpen, Trash2, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ProjectListDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onLoad: (id: string) => void;
}

export function ProjectListDialog({ open, onOpenChange, onLoad }: ProjectListDialogProps) {
    const [projects, setProjects] = useState<ProjectSummary[]>([]);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        if (open) {
            loadProjects();
        }
    }, [open]);

    const loadProjects = async () => {
        setLoading(true);
        try {
            const list = await ProjectService.getProjects();
            setProjects(list);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (!confirm('Are you sure you want to delete this project?')) return;

        setDeletingId(id);
        try {
            await ProjectService.deleteProject(id);
            setProjects(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            console.error(err);
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Open Project</DialogTitle>
                    <DialogDescription>
                        Select a saved project to load.
                    </DialogDescription>
                </DialogHeader>

                {loading ? (
                    <div className="flex justify-center p-8">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                ) : (
                    <ScrollArea className="h-[300px] pr-4">
                        <div className="space-y-2">
                            {projects.length === 0 && (
                                <div className="text-center text-sm text-muted-foreground py-8">
                                    No saved projects found.
                                </div>
                            )}
                            {projects.map(project => (
                                <div
                                    key={project.id}
                                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent cursor-pointer group transition-colors"
                                    onClick={() => {
                                        onLoad(project.id);
                                        onOpenChange(false);
                                    }}
                                >
                                    <div className="flex flex-col gap-1 overflow-hidden">
                                        <span className="font-medium truncate">{project.name}</span>
                                        <div className="flex items-center text-xs text-muted-foreground gap-2">
                                            <Clock className="w-3 h-3" />
                                            <span>{formatDistanceToNow(new Date(project.updated_at), { addSuffix: true })}</span>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="opacity-0 group-hover:opacity-100 h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                        onClick={(e) => handleDelete(e, project.id)}
                                        disabled={deletingId === project.id}
                                    >
                                        {deletingId === project.id ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Trash2 className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                )}
            </DialogContent>
        </Dialog>
    );
}
