
import { MemoryMap } from './MemoryMap';
import { SymbolTable, ValueType } from './SymbolTable';
import * as AST from '../compiler/AST';
import * as Compiler from '../compiler/ASTBuilder';
import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { SimpleErrorListener } from './SimpleErrorListener';
import { IEC61131Lexer } from '../compiler/generated/IEC61131Lexer';
import { IEC61131Parser } from '../compiler/generated/IEC61131Parser';
import { createStandardFB, FunctionBlock } from './StandardFBs';

export class Interpreter {
    memory: MemoryMap;
    symbolTable: SymbolTable;
    programAST: AST.Program | null = null;
    isRunning: boolean = false;
    scanTime: number = 0;
    lastScanTime: number = 0;

    constructor() {
        this.memory = new MemoryMap();
        this.symbolTable = new SymbolTable(this.memory);
    }

    loadCode(code: string): void {
        let cleanCode = '';
        try {
            this.reset(); // Clear previous state

            // 0. Pre-process: Parse and Extract TYPE definitions
            // This is a Hybrid approach: Manually parse TYPE blocks because ANTLR grammar doesn't support them yet.
            const result = this.extractAndRegisterTypes(code);
            cleanCode = result.cleanCode;

            // 1. Parse remaining code with ANTLR
            const inputStream = CharStreams.fromString(cleanCode);
            const lexer = new IEC61131Lexer(inputStream);
            const tokenStream = new CommonTokenStream(lexer);
            const parser = new IEC61131Parser(tokenStream);

            // Error listeners should be added here
            parser.removeErrorListeners();
            parser.addErrorListener(SimpleErrorListener.INSTANCE);

            const tree = parser.program();

            // 2. Build AST
            const builder = new Compiler.ASTBuilder();
            const ast = builder.visit(tree) as AST.Program; // Assume Program for now
            this.programAST = ast;

            // 3. Initialize Symbols
            this.initializeSymbols(ast);

        } catch (e) {
            console.error('Parse Error:', e);
            console.log('Clean Code used for parsing:', cleanCode);
            throw e;
        }
    }

    private extractAndRegisterTypes(code: string): { cleanCode: string } {
        const typeBlockRegex = /TYPE\s+([\s\S]*?)END_TYPE/gi;
        let match;
        let cleanCode = code;

        // Clone regex to avoid state issues or just use matchAll/exec loop
        // We will replace matches with whitespace to preserve line numbers
        let iterations = 0;
        const MAX_ITERATIONS = 1000;

        while ((match = typeBlockRegex.exec(code)) !== null) {
            iterations++;
            if (iterations > MAX_ITERATIONS) {
                console.error('Possible infinite loop in extractAndRegisterTypes');
                break;
            }

            const blockContent = match[1];
            const fullMatch = match[0];

            // Replace with newlines to keep line counts if possible, or just spaces
            // Simple approach: replace match in cleanCode with spaces/newlines
            // Getting accurate line numbers requires more care, for now just replace with empty string??
            // Better: replace with equivalent number of newlines
            const newlines = fullMatch.split('\n').length - 1;
            const replacement = '\n'.repeat(newlines);
            // This global replace might be risky if duplicated, but usually unique enough
            // Using split/join or specific index replacement is safer but for now:
            cleanCode = cleanCode.replace(fullMatch, replacement);

            this.parseTypeBlock(blockContent);
        }

        return { cleanCode };
    }

    private parseTypeBlock(content: string) {
        const cleanBlock = content.trim();
        if (!cleanBlock) return;

        // Extract Name: "MyType : STRUCT ..."
        const colonIndex = cleanBlock.indexOf(':');
        if (colonIndex === -1) return;

        const name = cleanBlock.substring(0, colonIndex).trim();
        let definition = cleanBlock.substring(colonIndex + 1);

        // remove trailing semicolon if present
        if (definition.trim().endsWith(';')) {
            definition = definition.trim().slice(0, -1);
        }

        if (definition.toUpperCase().includes('STRUCT')) {
            // Parse STRUCT
            const members: { name: string; type: string; initialValue?: any }[] = [];
            // Remove STRUCT and END_STRUCT
            const structBody = definition.replace(/STRUCT/i, '').replace(/END_STRUCT/i, '').trim();

            const memberLines = structBody.split(';');
            for (const line of memberLines) {
                const cleanLine = line.trim();
                if (!cleanLine) continue;

                // Member declaration: name : type [:= init];
                const mMatch = cleanLine.match(/(\w+)\s*:\s*(\w+)(?:\s*:=\s*(.+))?/i);
                if (mMatch) {
                    const [, mName, mType, mInit] = mMatch;
                    members.push({
                        name: mName,
                        type: mType.toUpperCase(),
                        initialValue: mInit // Store raw string for now? Or parse?
                    });
                }
            }

            this.symbolTable.defineType({
                name,
                kind: 'STRUCT',
                members
            });

        } else if (definition.includes('(') && definition.includes(')')) {
            // ENUM (Values)
            const content = definition.replace(/[()]/g, '');
            const values = content.split(',').map(v => v.trim());

            this.symbolTable.defineType({
                name,
                kind: 'ENUM',
                values
            });
        } else {
            // Alias: TYPE MyInt : INT; END_TYPE
            const baseType = definition.trim().toUpperCase();
            this.symbolTable.defineType({
                name,
                kind: 'ALIAS',
                baseType
            });
        }
    }

    private initializeSymbols(prog: AST.Program) {
        // Reset Symbol Table logic if needed
        // this.symbolTable = new SymbolTable(this.memory); 

        // Register Global Vars
        if (prog.variables) {
            for (const decl of prog.variables) {
                // Determine initial value
                let initVal: any = undefined;

                // Function Block instantiation
                const fbInstance = createStandardFB(decl.dataType);
                if (fbInstance) {
                    initVal = fbInstance;
                }
                else if (decl.initialValue && decl.initialValue.type === 'Literal') {
                    initVal = decl.initialValue.value;
                } else {
                    // Check if it's a User Defined Type or Standard Type
                    initVal = this.getDefaultValue(decl.dataType as ValueType);
                }

                // Decide types
                let type: ValueType = decl.dataType as ValueType;
                if (this.symbolTable.getType(decl.dataType)) {
                    type = 'USER_DEFINED';
                }

                this.symbolTable.define(
                    decl.name,
                    type, // Pass specific Type?? Or generic? SymbolTable expects known types. 'USER_DEFINED' or actual STRUCT name?
                    // ValueType is union string. We added 'USER_DEFINED'. 
                    initVal,
                    false,
                    decl.address
                );
            }
        }
    }

    private getDefaultValue(type: string): any {
        const uType = type.toUpperCase();

        // 1. Check Standard Types
        switch (uType) {
            case 'BOOL': return false;
            case 'INT':
            case 'DINT':
            case 'WORD':
            case 'DWORD': return 0;
            case 'REAL': return 0.0;
            case 'TIME': return 0;
            case 'STRING': return '';
        }

        // 2. Check User Defined Types
        const userType = this.symbolTable.getType(uType);
        if (userType) {
            if (userType.kind === 'STRUCT' && userType.members) {
                // Recursively build struct
                const obj: any = {};
                for (const m of userType.members) {
                    // Logic to parse init value if string
                    let val = this.getDefaultValue(m.type); // Recursion
                    // TODO: Apply m.initialValue if present (e.g. parse literal)
                    obj[m.name] = val;
                }
                return obj;
            }
            if (userType.kind === 'ENUM') {
                return 0; // Default enum
            }
            if (userType.kind === 'ALIAS') {
                return this.getDefaultValue(userType.baseType || 'INT');
            }
        }

        return 0;
    }

    start(): void {
        this.isRunning = true;
        this.lastScanTime = Date.now();
    }

    stop(): void {
        this.isRunning = false;
    }

    reset(): void {
        this.memory.reset();
        this.symbolTable = new SymbolTable(this.memory);
        this.programAST = null;
        this.isRunning = false;
    }

    executeScan(): void {
        if (!this.isRunning || !this.programAST) return;

        const now = Date.now();
        this.scanTime = now - this.lastScanTime;
        if (this.scanTime <= 0) this.scanTime = 1; // Sanity check
        this.lastScanTime = now;

        // 1. Input Scan (handled externally or checking inputs)

        // 2. Logic Execution
        this.executeBlock(this.programAST.body);

        // 3. Output Scan (handled by React binding reading memory)
    }

    private executeBlock(statements: AST.Statement[]) {
        for (const stmt of statements) {
            this.executeStatement(stmt);
        }
    }

    private executeStatement(stmt: AST.Statement) {
        switch (stmt.type) {
            case 'Assignment':
                this.executeAssignment(stmt);
                break;
            case 'If':
                this.executeIf(stmt);
                break;
            case 'For':
                this.executeFor(stmt);
                break;
            case 'While':
                this.executeWhile(stmt);
                break;
            case 'Repeat':
                this.executeRepeat(stmt);
                break;
            case 'FbCall':
                this.executeFbCall(stmt);
                break;
        }
    }

    private executeAssignment(stmt: AST.Assignment) {
        const value = this.evaluate(stmt.expression);

        try {
            // Handle Dot Notation for FB outputs? 
            // Usually we assign TO variables. 
            // Evaluating ST: MyTimer.IN := TRUE
            // My Parser might handle this as Assignment to valid Variable AST
            // Variable name is "MyTimer.IN"

            // Check if name has dot
            if (stmt.variable.name.includes('.')) {
                this.setDotVariable(stmt.variable.name, value);
            } else {
                this.symbolTable.set(stmt.variable.name, value);
            }

        } catch (e: any) {
            throw new Error(`Runtime Error: ${e.message}`);
        }
    }

    private setDotVariable(accessPath: string, value: any) {
        const parts = accessPath.split('.');
        const rootName = parts[0];
        const root = this.symbolTable.get(rootName);

        if (!root) throw new Error(`Variable ${rootName} not found`);

        // Check if it's a Function Block
        if (root && typeof root === 'object' && 'inputs' in root) {
            const fb = root as FunctionBlock;
            const param = parts[1];

            // Allow setting inputs
            if (param in fb.inputs) {
                fb.inputs[param] = value;
                return;
            }
            // Forcing output (Simulator usage)
            if (param in fb.outputs) {
                fb.outputs[param] = value;
                return;
            }
            // Fallback: check if it has internal vars or other props?
        }

        // Handle regular Objects (Structs) or nested properties
        // Loop through parts to find the target property
        let current = root;
        for (let i = 1; i < parts.length - 1; i++) {
            const prop = parts[i];
            if (current && typeof current === 'object' && prop in current) {
                current = current[prop];
            } else {
                throw new Error(`Property ${prop} not found in ${parts.slice(0, i + 1).join('.')}`);
            }
        }

        const lastProp = parts[parts.length - 1];
        if (current && typeof current === 'object') {
            // We can check if property exists to be strict, or just assign
            // For ST Structs, it should exist if initialized correctly
            // if (lastProp in current) {
            current[lastProp] = value;
            return;
            // }
        }

        throw new Error(`Cannot write to property ${accessPath}`);
    }

    private executeIf(stmt: AST.IfStatement) {
        if (this.evaluate(stmt.condition)) {
            this.executeBlock(stmt.thenBranch);
            return;
        }

        if (stmt.elseIfBranches) {
            for (const branch of stmt.elseIfBranches) {
                if (this.evaluate(branch.condition)) {
                    this.executeBlock(branch.body);
                    return;
                }
            }
        }

        if (stmt.elseBranch) {
            this.executeBlock(stmt.elseBranch);
        }
    }

    private executeFor(stmt: AST.ForStatement) {
        const start = this.evaluate(stmt.start);
        const to = this.evaluate(stmt.to);
        const by = stmt.by ? this.evaluate(stmt.by) : 1;

        const varName = stmt.variable;
        this.symbolTable.set(varName, start);

        let loopCount = 0;
        const MAX_LOOP = 5000;

        while (true) {
            const current = this.symbolTable.get(varName);

            if (by > 0) {
                if (current > to) break;
            } else {
                if (current < to) break;
            }

            if (loopCount++ > MAX_LOOP) {
                console.warn("Infinite Loop detected in FOR");
                break;
            }

            this.executeBlock(stmt.body);

            const nextVal = this.symbolTable.get(varName) + by;
            this.symbolTable.set(varName, nextVal);
        }
    }

    private executeWhile(stmt: AST.WhileStatement) {
        const MAX_LOOP = 5000;
        let loopCount = 0;

        while (this.evaluate(stmt.condition)) {
            if (loopCount++ > MAX_LOOP) {
                console.warn("Infinite Loop detected in WHILE");
                break;
            }
            this.executeBlock(stmt.body);
        }
    }

    private executeRepeat(stmt: AST.RepeatStatement) {
        const MAX_LOOP = 5000;
        let loopCount = 0;

        do {
            if (loopCount++ > MAX_LOOP) {
                console.warn("Infinite Loop detected in REPEAT");
                break;
            }
            this.executeBlock(stmt.body);
        } while (!this.evaluate(stmt.condition));
    }

    private executeFbCall(stmt: AST.FbCall) {
        const result = this.symbolTable.resolve(stmt.fbName);
        if (!result || !result.value) {
            console.warn(`Function Block ${stmt.fbName} not found or undefined.`);
            return;
        }

        const fbInstance = result.value as FunctionBlock;

        // 1. Evaluate Input Params
        for (const param of stmt.params) {
            if (param.value && (param.value as AST.Expression).type) {
                if (param.name) {
                    const val = this.evaluate(param.value as AST.Expression);
                    if (param.name in fbInstance.inputs) {
                        fbInstance.inputs[param.name] = val;
                    }
                }
            }
        }

        // 2. Execute FB
        fbInstance.execute(this.scanTime);

        // 3. Outputs are updated inside FB instance
    }

    private evaluate(expr: AST.Expression): any {
        switch (expr.type) {
            case 'Literal':
                return expr.value;
            case 'Identifier':
                if (expr.name.includes('.')) {
                    return this.evaluateDot(expr.name);
                }
                const val = this.symbolTable.get(expr.name);
                if (val === undefined) {
                    throw new Error(`Runtime Error: Variable '${expr.name}' not defined.`);
                }
                return val;
            case 'BinaryOp':
                return this.evaluateBinary(expr);
            case 'UnaryOp':
                return this.evaluateUnary(expr);
            case 'FbCall': // Function call as expression
                return 0; // TODO impl
            default:
                return 0;
        }
    }

    private evaluateDot(accessPath: string): any {
        const parts = accessPath.split('.');
        const rootName = parts[0];
        const val = this.symbolTable.get(rootName);

        if (!val) throw new Error(`Variable ${rootName} not found`);

        if (typeof val === 'object' && 'outputs' in val && 'inputs' in val) {
            const fb = val as FunctionBlock;
            const prop = parts[1];
            if (prop in fb.outputs) return fb.outputs[prop];
            if (prop in fb.inputs) return fb.inputs[prop];
        }

        return undefined; // Or throw
    }

    private evaluateBinary(expr: AST.BinaryOp): any {
        const left = this.evaluate(expr.left);
        const right = this.evaluate(expr.right);

        switch (expr.operator) {
            case '+': return left + right;
            case '-': return left - right;
            case '*': return left * right;
            case '/': return left / right;
            case 'MOD': return left % right;
            case 'AND':
                if (typeof left === 'boolean') return left && right;
                return left & right;
            case 'OR':
                if (typeof left === 'boolean') return left || right;
                return left | right;
            case 'XOR':
                if (typeof left === 'boolean') return !!left !== !!right;
                return left ^ right;
            case '=': return left === right;
            case '<>': return left !== right;
            case '<': return left < right;
            case '>': return left > right;
            case '<=': return left <= right;
            case '>=': return left >= right;
            default: return 0;
        }
    }

    private evaluateUnary(expr: AST.UnaryOp): any {
        const val = this.evaluate(expr.operand);
        if (expr.operator === 'NOT') return !val;
        if (expr.operator === '-') return -val;
        return val;
    }
}
