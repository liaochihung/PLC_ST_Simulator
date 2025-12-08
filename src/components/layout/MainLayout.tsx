import React from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
    leftPanel: React.ReactNode;
    centerPanel: React.ReactNode;
    rightPanel: React.ReactNode;
    className?: string;
}

export const MainLayout = ({ leftPanel, centerPanel, rightPanel, className }: MainLayoutProps) => {
    return (
        <div className={cn("h-screen w-full overflow-hidden bg-background", className)}>
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="border-r">
                    <div className="h-full w-full overflow-hidden bg-secondary/10">
                        {leftPanel}
                    </div>
                </ResizablePanel>

                <ResizableHandle />

                <ResizablePanel defaultSize={60} minSize={30}>
                    <div className="h-full w-full relative">
                        {centerPanel}
                    </div>
                </ResizablePanel>

                <ResizableHandle />

                <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="border-l">
                    <div className="h-full w-full overflow-hidden bg-secondary/10">
                        {rightPanel}
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};
