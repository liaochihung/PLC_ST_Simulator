
import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { IEC61131Lexer } from './generated/IEC61131Lexer';
import { IEC61131Parser } from './generated/IEC61131Parser';
import { ASTBuilder } from './ASTBuilder';

const ST_CODE = `
VAR_GLOBAL CONSTANT
    OK_STEP : INT := 10000;
END_VAR

VAR_GLOBAL
    gLight : dsTowerLight;
    uiSt1Down : BOOL; (* M10 *)
END_VAR

PROGRAM Main
VAR
    idx : INT;
END_VAR
    
    idx := 10;
    
    IF idx > 5 THEN
        idx := idx + 1;
    ELSE
        idx := 0;
    END_IF;

END_PROGRAM
`;

function testParser() {
    console.log('--- Testing IEC 61131-3 Parser ---');

    // Create Lexer
    const inputStream = CharStreams.fromString(ST_CODE);
    const lexer = new IEC61131Lexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);

    // Create Parser
    const parser = new IEC61131Parser(tokenStream);

    // Parse Entry Point (program rule)
    const tree = parser.program();

    console.log('Parse Tree created. Visiting...');

    // Visit
    const visitor = new ASTBuilder();
    const result = visitor.visit(tree); // Should return Program or list?

    // The grammar 'program' rule returns library_element+
    // My visitor visitProgram currently returns the FIRST program it finds.
    // Let's see what it returns.

    console.log('--- AST Result ---');
    console.log(JSON.stringify(result, null, 2));
}

testParser();
