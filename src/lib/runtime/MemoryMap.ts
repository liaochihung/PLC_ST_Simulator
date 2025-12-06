
/**
 * PLC Memory Map Simulation
 * Simulates standard PLC memory areas: Input (X), Output (Y), Internal Relay (M), Data Register (D).
 * 
 * Addressing is simplified:
 * X/Y/M are bit-addressable (indexed by integer).
 * D is word-addressable (16-bit signed integer).
 */
export class MemoryMap {
    // Bit Memories
    private X: Map<number, boolean>; // Input
    private Y: Map<number, boolean>; // Output
    private M: Map<number, boolean>; // Internal Relay
    private S: Map<number, boolean>; // State/Step Relay (for SFC)

    // Word Memories
    private D: Int16Array; // Data Register (10000 words)
    private R: Int16Array; // File Register
    private W: Int16Array; // Link Register

    // Timer/Counter specific memory (Simplified)
    // In real PLC, T/C have both coils (bit) and current values (word)
    // We'll manage them in a separate 'Device' structure in the Interpreter, 
    // but we can map their bits/values here if needed.

    constructor() {
        this.X = new Map();
        this.Y = new Map();
        this.M = new Map();
        this.S = new Map();
        this.D = new Int16Array(10000); // D0 - D9999
        this.R = new Int16Array(32768);
        this.W = new Int16Array(10000);
    }

    // --- Bit Access ---

    getBit(type: 'X' | 'Y' | 'M' | 'S', address: number): boolean {
        switch (type) {
            case 'X': return this.X.get(address) || false;
            case 'Y': return this.Y.get(address) || false;
            case 'M': return this.M.get(address) || false;
            case 'S': return this.S.get(address) || false;
            default: return false;
        }
    }

    setBit(type: 'X' | 'Y' | 'M' | 'S', address: number, value: boolean): void {
        switch (type) {
            case 'X': this.X.set(address, value); break;
            case 'Y': this.Y.set(address, value); break;
            case 'M': this.M.set(address, value); break;
            case 'S': this.S.set(address, value); break;
        }
    }

    // --- Word Access ---

    getWord(type: 'D' | 'R' | 'W', address: number): number {
        switch (type) {
            case 'D': return this.D[address] || 0;
            case 'R': return this.R[address] || 0;
            case 'W': return this.W[address] || 0;
            default: return 0;
        }
    }

    setWord(type: 'D' | 'R' | 'W', address: number, value: number): void {
        // Ensure 16-bit integer range
        const int16 = value & 0xFFFF;
        // Store as signed for JS convenience if needed, but TypedArray handles wrapping
        switch (type) {
            case 'D': this.D[address] = value; break;
            case 'R': this.R[address] = value; break;
            case 'W': this.W[address] = value; break;
        }
    }

    getDoubleWord(type: 'D', address: number): number {
        // Little-endian combination of D[n] and D[n+1]
        const low = this.D[address] & 0xFFFF;
        const high = this.D[address + 1] & 0xFFFF;
        // Combine to 32-bit (handling sign bit correctly is tricky in JS bitwise, using DataView is safer)
        const buffer = new ArrayBuffer(4);
        const view = new DataView(buffer);
        view.setInt16(0, low, true); // Little endian
        view.setInt16(2, high, true);
        return view.getInt32(0, true);
    }

    setDoubleWord(type: 'D', address: number, value: number): void {
        const buffer = new ArrayBuffer(4);
        const view = new DataView(buffer);
        view.setInt32(0, value, true);
        this.D[address] = view.getInt16(0, true);
        this.D[address + 1] = view.getInt16(2, true);
    }

    // --- Batch Operations (for I/O Update) ---

    reset(): void {
        this.X.clear();
        this.Y.clear();
        this.M.clear();
        this.S.clear();
        this.D.fill(0);
        this.R.fill(0);
        this.W.fill(0);
    }
}
