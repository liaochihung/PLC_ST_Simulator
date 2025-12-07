
import { TON, TOF, TP, R_TRIG, F_TRIG, CTU, CTD, CTUD } from './src/lib/runtime/StandardFBs';

function assert(condition: boolean, message: string) {
    if (!condition) {
        throw new Error(`Assertion failed: ${message}`);
    }
    console.log(`PASS: ${message}`);
}

console.log('--- Verifying Standard FBs ---');

// 1. TON (On-Delay)
const ton = new TON();
ton.inputs.PT = 100;
ton.inputs.IN = true;
ton.execute(50);
assert(!ton.outputs.Q && ton.outputs.ET === 50, 'TON: 50ms (Running)');
ton.execute(60);
assert(ton.outputs.Q && ton.outputs.ET === 100, 'TON: 110ms (Done)');
ton.inputs.IN = false;
ton.execute(10);
assert(!ton.outputs.Q && ton.outputs.ET === 0, 'TON: Reset');

// 2. TOF (Off-Delay)
const tof = new TOF();
tof.inputs.PT = 100;
tof.inputs.IN = true;
tof.execute(10);
assert(tof.outputs.Q && tof.outputs.ET === 0, 'TOF: IN=true -> Q=true, ET=0');
tof.inputs.IN = false;
tof.execute(50);
assert(tof.outputs.Q && tof.outputs.ET === 50, 'TOF: IN=false -> Timing (50ms)');
tof.execute(60);
assert(!tof.outputs.Q && tof.outputs.ET === 100, 'TOF: Done (110ms) -> Q=false');

// 3. TP (Pulse)
const tp = new TP();
tp.inputs.PT = 100;
tp.inputs.IN = true;
tp.execute(10);
assert(tp.outputs.Q && tp.outputs.ET === 10, 'TP: Pulse Start');
tp.inputs.IN = false; // Input removed, pulse should continue
tp.execute(50);
assert(tp.outputs.Q && tp.outputs.ET === 60, 'TP: Pulse Continue without IN');
tp.execute(50);
assert(!tp.outputs.Q && tp.outputs.ET === 100, 'TP: Pulse Done');

// 4. R_TRIG
const rtrig = new R_TRIG();
rtrig.inputs.CLK = false; rtrig.execute(10);
assert(!rtrig.outputs.Q, 'R_TRIG: Init False');
rtrig.inputs.CLK = true; rtrig.execute(10);
assert(rtrig.outputs.Q, 'R_TRIG: Rising Edge');
rtrig.execute(10);
assert(!rtrig.outputs.Q, 'R_TRIG: Hold True -> Q=False');

// 5. CTU
const ctu = new CTU();
ctu.inputs.PV = 2;
ctu.inputs.CU = true; ctu.execute(10);
assert(!ctu.outputs.Q && ctu.outputs.CV === 1, 'CTU: Count 1');
ctu.inputs.CU = false; ctu.execute(10);
ctu.inputs.CU = true; ctu.execute(10);
assert(ctu.outputs.Q && ctu.outputs.CV === 2, 'CTU: Count 2 (Done)');

console.log('--- All Tests Passed ---');
