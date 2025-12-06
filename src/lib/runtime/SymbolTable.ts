
import { MemoryMap } from './MemoryMap';

export type ValueType = 'BOOL' | 'INT' | 'DINT' | 'REAL' | 'STRING' | 'TIME' | 'WORD' | 'DWORD' | 'TON' | 'TOF' | 'UNKNOWN';

export interface VariableSymbol {
    name: string;
    type: ValueType;
    value: any;
    isConstant: boolean;
    address?: string; // e.g. %IX0.0 or X0
}

export class SymbolTable {
    private scopes: Map<string, VariableSymbol>[] = [];
    private memory: MemoryMap;

    constructor(memory: MemoryMap) {
        this.memory = memory;
        this.scopes.push(new Map()); // Global scope
    }

    pushScope() {
        this.scopes.push(new Map());
    }

    popScope() {
        if (this.scopes.length > 1) {
            this.scopes.pop();
        } else {
            console.warn('Cannot pop global scope');
        }
    }

    /**
     * Define a variable in the current scope.
     */
    define(name: string, type: ValueType, value: any, isConstant: boolean = false, address?: string): void {
        const currentScope = this.scopes[this.scopes.length - 1];
        const normalizedName = name.toUpperCase();

        if (currentScope.has(normalizedName)) {
            // In ST, re-declaring might be an error or shadowing. We'll assume error for now in same scope.
            throw new Error(`Variable ${name} already defined in current scope`);
        }

        const symbol: VariableSymbol = { name, type, value, isConstant, address };
        currentScope.set(normalizedName, symbol);

        // If it has an address and an initial value, should we write to memory?
        // Usually YES for initialization.
        if (address && value !== undefined) {
            this.writeToAddress(address, type, value);
        }
    }

    /**
     * Resolve a variable by name, searching from innermost scope to global.
     */
    resolve(name: string): VariableSymbol | undefined {
        const normalizedName = name.toUpperCase();
        for (let i = this.scopes.length - 1; i >= 0; i--) {
            if (this.scopes[i].has(normalizedName)) {
                return this.scopes[i].get(normalizedName);
            }
        }
        return undefined;
    }

    /**
     * Get the current value of a variable.
     * If mapped to memory, reads from MemoryMap.
     */
    get(name: string): any {
        const symbol = this.resolve(name);
        if (!symbol) {
            return undefined;
            // throw new Error(`Variable ${name} not found`);
        }

        if (symbol.address) {
            return this.readFromAddress(symbol.address, symbol.type);
        }
        return symbol.value;
    }

    /**
     * Set the value of a variable.
     * If mapped to memory, writes to MemoryMap.
     */
    set(name: string, value: any): void {
        const symbol = this.resolve(name);
        if (!symbol) {
            throw new Error(`Variable ${name} not found`);
        }
        if (symbol.isConstant) {
            throw new Error(`Cannot assign to constant ${name}`);
        }

        // TODO: Strict type checking could go here

        if (symbol.address) {
            this.writeToAddress(symbol.address, symbol.type, value);
        }

        // Update internal cache as well (optional but good for debugging)
        symbol.value = value;
    }

    // --- Memory Helpers ---

    private readFromAddress(addr: string, type: ValueType): any {
        // Parsing logic similar to legacy but robust
        // Support %IX0.0, X0, D100, etc.
        const cleanAddr = addr.replace(/^%[IQM]/, '').replace(/^%/, ''); // Simple strip
        // Heuristic:
        // X, Y, M, S, D, R, W
        const prefix = cleanAddr.match(/^[a-zA-Z]+/)?.[0];
        const offsetStr = cleanAddr.match(/[0-9.]+/)?.[0];

        if (!prefix || !offsetStr) return undefined;

        // Handle X0.0 style for bits if needed, but MemoryMap takes integer index.
        // Assuming X0, Y0, M0, D0 for now. 
        // If X0.0 is passed, we might need to parse bit index?
        // For this simulator, X/Y are flat maps index 0..N.

        const offset = parseInt(offsetStr, 10);
        if (isNaN(offset)) return undefined;

        switch (prefix.toUpperCase()) {
            case 'X': return this.memory.getBit('X', offset);
            case 'Y': return this.memory.getBit('Y', offset);
            case 'M': return this.memory.getBit('M', offset);
            case 'D':
                if (type === 'DINT' || type === 'DWORD' || type === 'REAL') {
                    return this.memory.getDoubleWord('D', offset);
                }
                return this.memory.getWord('D', offset);
            default: return 0;
        }
    }

    private writeToAddress(addr: string, type: ValueType, value: any): void {
        const cleanAddr = addr.replace(/^%[IQM]/, '').replace(/^%/, '');
        const prefix = cleanAddr.match(/^[a-zA-Z]+/)?.[0];
        const offsetStr = cleanAddr.match(/[0-9.]+/)?.[0];

        if (!prefix || !offsetStr) return;

        const offset = parseInt(offsetStr, 10);
        if (isNaN(offset)) return;

        switch (prefix.toUpperCase()) {
            case 'X': this.memory.setBit('X', offset, !!value); break;
            case 'Y': this.memory.setBit('Y', offset, !!value); break;
            case 'M': this.memory.setBit('M', offset, !!value); break;
            case 'D':
                if (type === 'DINT' || type === 'DWORD' || type === 'REAL') {
                    this.memory.setDoubleWord('D', offset, Number(value));
                } else {
                    this.memory.setWord('D', offset, Number(value));
                }
                break;
        }
    }
}
