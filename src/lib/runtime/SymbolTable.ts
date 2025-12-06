
import { MemoryMap } from './MemoryMap';

export type VariableType = 'BOOL' | 'INT' | 'DINT' | 'WORD' | 'DWORD' | 'TIME' | 'STRING' | 'STRUCT' | 'FB';

export interface VariableSymbol {
    name: string;
    type: VariableType;
    address?: string; // e.g., 'X0', 'D100'
    initialValue?: any;
    value?: any; // Current value (cached or for non-mapped vars)
    isConstant?: boolean;
}

export class SymbolTable {
    private variables: Map<string, VariableSymbol>;
    private memory: MemoryMap;

    constructor(memory: MemoryMap) {
        this.variables = new Map();
        this.memory = memory;
    }

    declare(name: string, type: VariableType, address?: string, initialValue?: any): void {
        const symbol: VariableSymbol = {
            name,
            type,
            address,
            initialValue: initialValue ?? this.getDefaultValue(type),
            value: initialValue ?? this.getDefaultValue(type),
        };
        this.variables.set(name.toUpperCase(), symbol); // Case-insensitive storage

        // If it has an address, sync initial value to MemoryMap?
        // Maybe not, usually variable init happens at 'START'
    }

    has(name: string): boolean {
        return this.variables.has(name.toUpperCase());
    }

    get(name: string): any {
        const symbol = this.variables.get(name.toUpperCase());
        if (!symbol) return undefined; // Or throw error

        // If mapped to address, read from MemoryMap
        if (symbol.address) {
            return this.readFromAddress(symbol.address, symbol.type);
        }

        // Otherwise return internal value
        return symbol.value;
    }

    set(name: string, value: any): void {
        const symbol = this.variables.get(name.toUpperCase());
        if (!symbol) {
            console.warn(`Variable ${name} not defined.`);
            return;
        }

        if (symbol.isConstant) {
            console.warn(`Cannot assign to constant ${name}.`);
            return;
        }

        // If mapped to address, write to MemoryMap
        if (symbol.address) {
            this.writeToAddress(symbol.address, symbol.type, value);
        }

        // Always update internal cache/value for debugging
        symbol.value = value;
    }

    private readFromAddress(addr: string, type: VariableType): any {
        const typeCode = addr.charAt(0).toUpperCase();
        const offset = parseInt(addr.substring(1), 10); // Simplified parsing

        if (isNaN(offset)) return 0;

        switch (typeCode) {
            case 'X': return this.memory.getBit('X', offset);
            case 'Y': return this.memory.getBit('Y', offset);
            case 'M': return this.memory.getBit('M', offset);
            case 'D':
                if (type === 'DINT' || type === 'DWORD') {
                    return this.memory.getDoubleWord('D', offset);
                }
                return this.memory.getWord('D', offset);
            default: return 0;
        }
    }

    private writeToAddress(addr: string, type: VariableType, value: any): void {
        const typeCode = addr.charAt(0).toUpperCase();
        const offset = parseInt(addr.substring(1), 10);

        if (isNaN(offset)) return;

        switch (typeCode) {
            case 'X': this.memory.setBit('X', offset, !!value); break;
            case 'Y': this.memory.setBit('Y', offset, !!value); break;
            case 'M': this.memory.setBit('M', offset, !!value); break;
            case 'D':
                if (type === 'DINT' || type === 'DWORD') {
                    this.memory.setDoubleWord('D', offset, Number(value));
                } else {
                    this.memory.setWord('D', offset, Number(value));
                }
                break;
        }
    }

    private getDefaultValue(type: VariableType): any {
        switch (type) {
            case 'BOOL': return false;
            case 'INT':
            case 'DINT':
            case 'WORD':
            case 'DWORD': return 0;
            case 'TIME': return 0;
            case 'STRING': return '';
            default: return null;
        }
    }

    getAllVariables(): VariableSymbol[] {
        return Array.from(this.variables.values());
    }
}
