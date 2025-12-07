
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

export class TOF implements FunctionBlock {
    type = 'TOF';
    inputs = {
        IN: false,
        PT: 0 // ms
    };
    outputs = {
        Q: false,
        ET: 0
    };

    private running: boolean = false;

    execute(scanTime: number): void {
        // TOF: Off-Delay Timer
        // Q is TRUE when IN is TRUE.
        // When IN drops to FALSE, Q stays TRUE for PT duration.
        // ET increments while IN is FALSE and Q is TRUE (timer running).

        if (this.inputs.IN) {
            // Reset
            this.outputs.Q = true;
            this.outputs.ET = 0;
            this.running = false;
        } else {
            // IN is FALSE
            if (this.outputs.ET < this.inputs.PT) {
                // Start or Continue timing
                this.running = true; // Technically running
                this.outputs.ET += scanTime;
                this.outputs.Q = true; // Q stays true while timing
                if (this.outputs.ET >= this.inputs.PT) {
                    this.outputs.ET = this.inputs.PT;
                    this.outputs.Q = false; // Timer done
                    this.running = false;
                }
            } else {
                // Done
                this.outputs.Q = false;
                this.outputs.ET = this.inputs.PT;
            }
        }
    }
}

export class TP implements FunctionBlock {
    type = 'TP';
    inputs = {
        IN: false,
        PT: 0 // ms
    };
    outputs = {
        Q: false,
        ET: 0
    };

    private running: boolean = false;

    execute(scanTime: number): void {
        // TP: Pulse Timer
        // Q goes TRUE for PT duration as soon as IN goes TRUE.
        // Ignoring IN changes during the pulse.

        if (!this.running) {
            if (this.inputs.IN && this.outputs.ET === 0) {
                // Start Pulse
                this.running = true;
                this.outputs.Q = true;
                this.outputs.ET = 0;
            } else if (!this.inputs.IN) {
                // Reset if not running and IN is false (ready for next)
                this.outputs.ET = 0;
                this.outputs.Q = false;
            }
        }

        if (this.running) {
            this.outputs.ET += scanTime;
            this.outputs.Q = true;
            if (this.outputs.ET >= this.inputs.PT) {
                this.outputs.ET = this.inputs.PT;
                this.outputs.Q = false;
                this.running = false;
            }
        }
    }
}

export class R_TRIG implements FunctionBlock {
    type = 'R_TRIG';
    inputs = { CLK: false };
    outputs = { Q: false };
    private lastCLK: boolean = false;

    execute(scanTime: number): void {
        this.outputs.Q = this.inputs.CLK && !this.lastCLK;
        this.lastCLK = this.inputs.CLK;
    }
}

export class F_TRIG implements FunctionBlock {
    type = 'F_TRIG';
    inputs = { CLK: false };
    outputs = { Q: false };
    private lastCLK: boolean = false;

    execute(scanTime: number): void {
        this.outputs.Q = !this.inputs.CLK && this.lastCLK;
        this.lastCLK = this.inputs.CLK;
    }
}

export class CTU implements FunctionBlock {
    type = 'CTU';
    inputs = {
        CU: false,
        R: false,
        PV: 0
    };
    outputs = {
        Q: false,
        CV: 0
    };
    private lastCU: boolean = false;

    execute(scanTime: number): void {
        if (this.inputs.R) {
            this.outputs.CV = 0;
            this.outputs.Q = false;
        } else {
            if (this.inputs.CU && !this.lastCU) {
                if (this.outputs.CV < 32767) { // INT max usually
                    this.outputs.CV++;
                }
            }
            this.outputs.Q = this.outputs.CV >= this.inputs.PV;
        }
        this.lastCU = this.inputs.CU;
    }
}

export class CTD implements FunctionBlock {
    type = 'CTD';
    inputs = {
        CD: false,
        LD: false,
        PV: 0
    };
    outputs = {
        Q: false,
        CV: 0
    };
    private lastCD: boolean = false;

    execute(scanTime: number): void {
        if (this.inputs.LD) {
            this.outputs.CV = this.inputs.PV;
            this.outputs.Q = this.outputs.CV <= 0;
        } else {
            if (this.inputs.CD && !this.lastCD) {
                if (this.outputs.CV > -32768) {
                    this.outputs.CV--;
                }
            }
            this.outputs.Q = this.outputs.CV <= 0;
        }
        this.lastCD = this.inputs.CD;
    }
}

export class CTUD implements FunctionBlock {
    type = 'CTUD';
    inputs = {
        CU: false,
        CD: false,
        R: false,
        LD: false,
        PV: 0
    };
    outputs = {
        QU: false,
        QD: false,
        CV: 0
    };
    private lastCU: boolean = false;
    private lastCD: boolean = false;

    execute(scanTime: number): void {
        if (this.inputs.R) {
            this.outputs.CV = 0;
        } else if (this.inputs.LD) {
            this.outputs.CV = this.inputs.PV;
        } else {
            // CU priority usually not defined but standard practice: process both edges
            // Or assume only one happens? Let's process both safely.

            if (this.inputs.CU && !this.lastCU) {
                if (this.outputs.CV < 32767) this.outputs.CV++;
            }
            if (this.inputs.CD && !this.lastCD) {
                if (this.outputs.CV > -32768) this.outputs.CV--;
            }
        }

        this.outputs.QU = this.outputs.CV >= this.inputs.PV;
        this.outputs.QD = this.outputs.CV <= 0;

        this.lastCU = this.inputs.CU;
        this.lastCD = this.inputs.CD;
    }
}

export function createStandardFB(type: string): FunctionBlock | undefined {
    switch (type) {
        case 'TON': return new TON();
        case 'TOF': return new TOF();
        case 'TP': return new TP();
        case 'R_TRIG': return new R_TRIG();
        case 'F_TRIG': return new F_TRIG();
        case 'CTU': return new CTU();
        case 'CTD': return new CTD();
        case 'CTUD': return new CTUD();
        default: return undefined;
    }
}
