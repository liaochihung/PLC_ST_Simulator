
import React, { useEffect, useState } from 'react';
import { LibraryService } from '@/lib/services/LibraryService';
import { LibrarySummary, Library, FunctionBlockDefinition } from '@/lib/types/Library';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Download, BookOpen, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface LibraryBrowserProps {
    onImport: (fb: FunctionBlockDefinition) => void;
}

export function LibraryBrowser({ onImport }: LibraryBrowserProps) {
    const [libraries, setLibraries] = useState<LibrarySummary[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedLib, setSelectedLib] = useState<Library | null>(null);
    const [detailLoading, setDetailLoading] = useState(false);

    useEffect(() => {
        loadLibraries();
    }, []);

    const loadLibraries = async () => {
        setLoading(true);
        // Try to seed first (dev only)
        await LibraryService.seedStandardLibrary();

        const libs = await LibraryService.getPublicLibraries();
        setLibraries(libs);
        setLoading(false);
    };

    const handleViewLibrary = async (id: string) => {
        setDetailLoading(true);
        const lib = await LibraryService.getLibraryDetails(id);
        setSelectedLib(lib);
        setDetailLoading(false);
    };

    return (
        <div className="flex flex-col h-full space-y-4 p-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                FB Libraries
            </h3>

            {loading ? (
                <div className="flex justify-center p-4"><Loader2 className="animate-spin" /></div>
            ) : (
                <ScrollArea className="flex-1 pr-4">
                    <div className="space-y-3">
                        {libraries.map(lib => (
                            <Card key={lib.id} className="cursor-pointer hover:bg-accent" onClick={() => handleViewLibrary(lib.id)}>
                                <CardHeader className="p-4">
                                    <CardTitle className="text-sm font-medium">{lib.name}</CardTitle>
                                    <CardDescription className="text-xs truncate">{lib.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                        {libraries.length === 0 && <div className="text-sm text-muted-foreground text-center">No libraries found.</div>}
                    </div>
                </ScrollArea>
            )}

            {/* Library Detail Dialog */}
            <Dialog open={!!selectedLib} onOpenChange={(open) => !open && setSelectedLib(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{selectedLib?.name}</DialogTitle>
                        <DialogDescription>{selectedLib?.description}</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <h4 className="text-sm font-medium">Included Function Blocks:</h4>
                        <div className="space-y-2">
                            {selectedLib?.content.functionBlocks.map((fb, idx) => (
                                <div key={idx} className="flex items-center justify-between p-2 border rounded-md">
                                    <div className="text-sm font-mono">{fb.name}</div>
                                    <Button size="sm" variant="secondary" onClick={() => onImport(fb)}>
                                        <Download className="h-4 w-4 mr-2" />
                                        Import
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
