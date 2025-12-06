
export interface FunctionBlock {
    type: string;
    inputs: Record<string, any>;
    outputs: Record<string, any>;
    execute(scanTime: number): void;
    // Internal state
    state?: any;
}

export class TON implements FunctionBlock {
    type = 'TON';
    inputs = {
        IN: false,
        PT: 0 // ms
    };
    outputs = {
        Q: false,
        ET: 0
    };

    private startTime: number = 0;
    private running: boolean = false;

    execute(scanTime: number): void { // scanTime is delta time in ms
        // In a real PLC, timers check system clock. 
        // Here we accumulate time or use delta.
        // Simplified: If IN is true, increase ET by scanTime.

        if (this.inputs.IN) {
            if (!this.running) {
                this.running = true;
                this.outputs.ET = 0;
            }

            // Increment ET (Accumulating scanTime might drift, but is ok for sim)
            // Better: use system timestamps if we had absolute time context? 
            // The Interpreter passes 'scanTime' (delta). 
            // NOTE: If scanTime is variable, this works.

            // Check if already Done
            if (this.outputs.ET < this.inputs.PT) {
                this.outputs.ET += scanTime;
                if (this.outputs.ET >= this.inputs.PT) {
                    this.outputs.ET = this.inputs.PT;
                    this.outputs.Q = true;
                }
            }
        } else {
            // Reset
            this.running = false;
            this.outputs.ET = 0;
            this.outputs.Q = false;
        }
    }
}

export function createStandardFB(type: string): FunctionBlock | undefined {
    switch (type) {
        case 'TON': return new TON();
        default: return undefined;
    }
}
