
import { Interpreter } from './Interpreter';

const TEST_CODE = `
PROGRAM Test
VAR
    a : INT := 10;
    b : INT;
    c : BOOL;
    i : INT;
END_VAR

    (* Basic Assignment *)
    b := a + 5;
    
    (* IF Statement *)
    IF b > 10 THEN
        c := TRUE;
    ELSE
        c := FALSE;
    END_IF;

    (* WHILE Loop *)
    WHILE a < 15 DO
        a := a + 1;
    END_WHILE;

    (* FOR Loop *)
    FOR i := 1 TO 3 DO
        b := b + 1;
    END_FOR;

END_PROGRAM
`;

async function runTest() {
    console.log('--- Testing ST Interpreter ---');

    const interpreter = new Interpreter();

    try {
        console.log('1. Loading Code...');
        interpreter.loadCode(TEST_CODE);
        console.log('Code Loaded.');

        console.log('2. starting Interpreter...');
        interpreter.start();

        console.log('3. Executing Scan...');
        interpreter.executeScan();

        // Verify Results
        const a = interpreter.symbolTable.get('a');
        const b = interpreter.symbolTable.get('b');
        const c = interpreter.symbolTable.get('c');
        const i = interpreter.symbolTable.get('i');

        console.log(`Result a (Expected 15): ${a}`);
        console.log(`Result b (Expected 18): ${b}`); // 15 + 3
        console.log(`Result c (Expected true): ${c}`);
        console.log(`Result i (Expected 4): ${i}`); // Loop ends when > 3

        if (a === 15 && b === 18 && c === true && i === 4) {
            console.log('✅ PASS: Basic Logic & Control Flow');
        } else {
            console.error('❌ FAIL: Basic Logic & Control Flow');
        }

        // Test Memory Mapping
        console.log('--- Testing Memory Mapping ---');
        const MAP_CODE = `
        PROGRAM MapTest
        VAR
            in1 AT %M0 : BOOL;
            out1 AT %M1 : BOOL;
        END_VAR
        
        in1 := TRUE;
        out1 := in1;
        END_PROGRAM
        `;

        interpreter.reset();
        interpreter.loadCode(MAP_CODE);
        interpreter.start();
        interpreter.executeScan();

        const m0 = interpreter.memory.getBit('M', 0);
        const m1 = interpreter.memory.getBit('M', 1);

        console.log(`M0 (Expected true): ${m0}`);
        console.log(`M1 (Expected true): ${m1}`);

        if (m0 === true && m1 === true) {
            console.log('✅ PASS: Memory Mapping');
        } else {
            console.error('❌ FAIL: Memory Mapping');
        }

    } catch (e) {
        console.error('❌ CRASH:', e);
    }
}

// Test Runtime Error (Missing Variable)
function testError() {
    console.log('\n--- Testing Error Handling ---');
    const interpreter = new Interpreter();
    // Variable 'z' is not defined
    const BAD_CODE = `
    PROGRAM Bad
    VAR
       x : INT;
    END_VAR
       x := z + 1;
    END_PROGRAM
    `;

    try {
        interpreter.loadCode(BAD_CODE);
        interpreter.start();
        interpreter.executeScan();
        console.error('❌ FAIL: Should have thrown error for missing variable');
    } catch (e: any) {
        if (e.message.includes('not defined')) {
            console.log('✅ PASS: Caught missing variable error');
        } else {
            console.error('❌ FAIL: Wrong error message:', e.message);
        }
    }
}

runTest().then(() => testError());
