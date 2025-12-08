import React, { createContext, useContext, ReactNode } from 'react';
import { useMachineLogic } from '@/hooks/useMachineLogic';

type MachineContextType = ReturnType<typeof useMachineLogic>;

const MachineContext = createContext<MachineContextType | null>(null);

export const MachineProvider = ({ children }: { children: ReactNode }) => {
    const logic = useMachineLogic();
    return <MachineContext.Provider value={logic}>{children}</MachineContext.Provider>;
};

export const useMachineContext = () => {
    const context = useContext(MachineContext);
    if (!context) {
        throw new Error('useMachineContext must be used within a MachineProvider');
    }
    return context;
};
