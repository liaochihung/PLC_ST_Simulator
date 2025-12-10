
import { createInterpreter } from './src/lib/st-parser';

const interpreter = createInterpreter();
interpreter.start();

const code = `
TYPE MyStruct :
  STRUCT
    x : INT := 10;
    y : BOOL := FALSE;
  END_STRUCT;
END_TYPE

PROGRAM Main
  VAR
    s : MyStruct;
    z : INT;
  END_VAR

  s.x := 20;
  IF s.y THEN
    z := 1;
  ELSE
    z := 2;
  END_IF;
  
  s.y := TRUE;
END_PROGRAM
`;

console.log('Running test code...');
interpreter.executeScan(code);

console.log('Final State:');
const s = interpreter.getVariable('s'); // Should be object
const z = interpreter.getVariable('z'); // Should be 2 (first pass s.y was false)

console.log('s:', s);
console.log('z:', z);

if (s && s.x === 20 && s.y === true && z === 2) {
    console.log('SUCCESS: Struct parsing and member access working!');
} else {
    console.log('FAILURE');
}
