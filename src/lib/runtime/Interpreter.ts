
import { MemoryMap } from './MemoryMap';
import { SymbolTable, ValueType } from './SymbolTable';
import * as AST from '../compiler/AST';
import * as Compiler from '../compiler/ASTBuilder';
import { CharStreams, CommonTokenStream, ConsoleErrorListener } from 'antlr4ts';
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
        try {
            // 1. Parse
            const inputStream = CharStreams.fromString(code);
            const lexer = new IEC61131Lexer(inputStream);
            const tokenStream = new CommonTokenStream(lexer);
            const parser = new IEC61131Parser(tokenStream);

            // Error listeners should be added here
            parser.removeErrorListeners();
            parser.addErrorListener(ConsoleErrorListener.INSTANCE);

            const tree = parser.program();

            // 2. Build AST
            const builder = new Compiler.ASTBuilder();
            const ast = builder.visit(tree) as AST.Program; // Assume Program for now
            this.programAST = ast;

            // 3. Initialize Symbols
            this.initializeSymbols(ast);

        } catch (e) {
            console.error('Parse Error:', e);
            throw e;
        }
    }

    private initializeSymbols(prog: AST.Program) {
        // Reset Symbol Table logic if needed
        // For now, we assume global scope is fresh or we clear it? 
        // Ideally we should reset symbolTable if reloading.
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
                    initVal = this.getDefaultValue(decl.dataType as ValueType);
                }

                this.symbolTable.define(
                    decl.name,
                    decl.dataType as ValueType,
                    initVal,
                    false,
                    decl.address
                );
            }
        }
    }

    private getDefaultValue(type: ValueType): any {
        switch (type) {
            case 'BOOL': return false;
            case 'INT':
            case 'DINT':
            case 'WORD':
            case 'DWORD': return 0;
            case 'REAL': return 0.0;
            case 'TIME': return 0;
            case 'STRING': return '';
            default: return 0;
        }
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
        this.isRunning = false;
        // Re-init symbols?
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

        // Assume it's an FB
        if (root && typeof root === 'object' && 'inputs' in root) {
            const fb = root as FunctionBlock;
            const param = parts[1];

            // Allow setting inputs
            if (param in fb.inputs) {
                fb.inputs[param] = value;
                return;
            }
            // Forcing output? Usually read-only but simulators might allow
            // For strictness we might block, but here we allow
            if (param in fb.outputs) {
                fb.outputs[param] = value;
                return;
            }
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
