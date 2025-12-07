import { useMemo } from 'react';
import { Interpreter } from '@/lib/runtime/Interpreter';
import type { MachineLayout } from '@/types/machine-editor';

export interface BindingResult {
    stationStates: Map<string, Record<string, any>>; // stationId -> { varName: value }
    discAngles: Map<string, number>; // discId -> angle
    feederStates: Map<string, boolean>; // feederId -> active
}

/**
 * Hook to automatically bind PLC variables to machine visualization elements
 * based on ioMapping configuration in the machine layout.
 */
export function useIOBinding(
    interpreter: Interpreter | null,
    layout: MachineLayout | null
): BindingResult {
    return useMemo(() => {
        const result: BindingResult = {
            stationStates: new Map(),
            discAngles: new Map(),
            feederStates: new Map(),
        };

        if (!interpreter || !layout) {
            return result;
        }

        // Bind stations
        layout.stations.forEach((station) => {
            const stationData: Record<string, any> = {};

            // Read input variables
            if (station.ioMapping?.inputs) {
                station.ioMapping.inputs.forEach((varName) => {
                    if (varName.trim()) {
                        const value = interpreter.symbolTable.get(varName.trim());
                        stationData[`input_${varName.trim()}`] = value;
                    }
                });
            }

            // Read output variables
            if (station.ioMapping?.outputs) {
                station.ioMapping.outputs.forEach((varName) => {
                    if (varName.trim()) {
                        const value = interpreter.symbolTable.get(varName.trim());
                        stationData[`output_${varName.trim()}`] = value;
                    }
                });
            }

            if (Object.keys(stationData).length > 0) {
                result.stationStates.set(station.id, stationData);
            }
        });

        // Bind discs
        layout.discs.forEach((disc) => {
            if (disc.rotationVariable) {
                const angle = interpreter.symbolTable.get(disc.rotationVariable.trim());
                if (angle !== undefined) {
                    result.discAngles.set(disc.id, Number(angle) || 0);
                }
            }
        });

        // Bind feeders
        layout.feeders.forEach((feeder) => {
            if (feeder.activeVariable) {
                const active = interpreter.symbolTable.get(feeder.activeVariable.trim());
                if (active !== undefined) {
                    result.feederStates.set(feeder.id, Boolean(active));
                }
            }
        });

        return result;
    }, [interpreter, layout]);
}
