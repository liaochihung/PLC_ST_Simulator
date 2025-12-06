
import { MemoryMap } from './MemoryMap';
import { SymbolTable } from './SymbolTable';
import * as AST from '../compiler/AST';
import * as Compiler from '../compiler/ASTBuilder';
import { CharStreams, CommonTokenStream, ConsoleErrorListener } from 'antlr4ts';
import { IEC61131Lexer } from '../compiler/generated/IEC61131Lexer';
import { IEC61131Parser } from '../compiler/generated/IEC61131Parser';

export class Interpreter {
    memory: MemoryMap;
    symbolTable: SymbolTable;
    programAST: AST.Program | null = null;
    isRunning: boolean = false;
    scanTime: number = 0;
    lastScanTime: number = 0;

    // Standard FBs (simplified registry)
    // In Phase 3 we will make this a proper library
    standardFBs: Map<string, any> = new Map();

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
        // Reset Symbol Table? Maybe not if we want to keep values?
        // For now, simple reset
        // this.symbolTable = new SymbolTable(this.memory); 

        // Register Global Vars
        if (prog.variables) {
            for (const decl of prog.variables) {
                this.symbolTable.declare(decl.name, decl.dataType as any, decl.address);
                // Handle Init Value
                if (decl.initialValue && decl.initialValue.type === 'Literal') {
                    this.symbolTable.set(decl.name, decl.initialValue.value);
                }
            }
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
    }

    executeScan(): void {
        if (!this.isRunning || !this.programAST) return;

        const now = Date.now();
        this.scanTime = now - this.lastScanTime;
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

        // Validate variable existence
        if (!this.symbolTable.has(stmt.variable.name)) {
            throw new Error(`Runtime Error: Variable '${stmt.variable.name}' not defined.`);
        }

        this.symbolTable.set(stmt.variable.name, value);
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
        const MAX_LOOP = 1000;

        while (true) {
            const current = this.symbolTable.get(varName);
            if (by > 0) {
                if (current > to) break;
            } else {
                if (current < to) break;
            }

            if (loopCount++ > MAX_LOOP) {
                console.warn("Infinite Loop detected");
                break;
            }

            this.executeBlock(stmt.body);

            const nextVal = this.symbolTable.get(varName) + by;
            this.symbolTable.set(varName, nextVal);
        }
    }

    private executeWhile(stmt: AST.WhileStatement) {
        const MAX_LOOP = 1000;
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
        const MAX_LOOP = 1000;
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
        // TODO: Implement actual FB lookup and execution
        // For now, handling basics or mock
        const fbName = stmt.fbName;

        // 1. Evaluate Input Params
        const inputs: Record<string, any> = {};
        for (const param of stmt.params) {
            // If value is expression, evaluate it
            if (param.value && (param.value as AST.Expression).type) {
                // If it's a simple assignment :=
                // Params can be positional or named. 
                // AST FbCall params has name? and value.
                if (param.name) {
                    inputs[param.name] = this.evaluate(param.value as AST.Expression);
                } else {
                    // Positional - logic depends on FB definition
                }
            }
        }

        // 2. Execute FB (Mock)
        if (this.standardFBs.has(fbName)) {
            const fbFunc = this.standardFBs.get(fbName);
            // fbFunc(inputs)? Logic needs state. 
            // Phase 3 will handle this properly.
        }

        // 3. Output mapping => (Handled in step 1 if we parsed => specifically?)
        // In ST: MyFB(In1:=10, Out1=>MyVar);
        // My Param parser puts this in params list.
        // We need to distinguish IN vs OUT in AST params?
        // Current AST structure: { name?: string, value: Expression | Identifier }
        // We might need 'direction' or 'operator' in AST param to distinguish := and =>
    }

    private evaluate(expr: AST.Expression): any {
        switch (expr.type) {
            case 'Literal':
                return expr.value;
            case 'Identifier':
                const val = this.symbolTable.get(expr.name);
                if (val === undefined) {
                    throw new Error(`Runtime Error: Variable '${expr.name}' not defined.`);
                }
                return val;
            case 'BinaryOp':
                return this.evaluateBinary(expr);
            case 'UnaryOp':
                return this.evaluateUnary(expr);
            case 'FbCall':
                // Function execution
                // TODO: Return actual value
                return 0;
            default:
                return 0;
        }
    }

    private evaluateBinary(expr: AST.BinaryOp): any {
        const left = this.evaluate(expr.left);
        const right = this.evaluate(expr.right);

        switch (expr.operator) {
            case '+': return left + right;
            case '-': return left - right;
            case '*': return left * right;
            case '/': return left / right; // Float?
            case 'MOD': return left % right;
            case 'AND': return left && right; // Boolean or Bitwise? ST is typed. Assume logic for now.
            case 'OR': return left || right;
            case 'XOR': return !!left !== !!right;
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
