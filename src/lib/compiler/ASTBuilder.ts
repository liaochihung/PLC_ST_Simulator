
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { IEC61131Visitor } from './generated/IEC61131Visitor';
import * as Parser from './generated/IEC61131Parser';
import * as AST from './AST';

export class ASTBuilder extends AbstractParseTreeVisitor<AST.ASTNode> implements IEC61131Visitor<AST.ASTNode> {
    defaultResult(): AST.ASTNode {
        return { type: 'Literal', valueType: 'BOOL', value: false } as AST.Literal;
    }

    // --- Program Structure ---

    visitProgram(ctx: Parser.ProgramContext): AST.Program {
        // For this simple simulator, we assume the first program_declaration or global_var is what we want
        // But actually 'program' rule returns a list of library_elements.
        // We will return a wrapper or just the first significant Program found.
        // For now, let's look for Program Declaration.

        // This is tricky because the root returns multiple elements.
        // We'll gather them.
        const nodes = ctx.library_element().map(el => this.visit(el));
        const prog = nodes.find(n => n.type === 'Program') as AST.Program | undefined;

        // If no program, look for globals to support the 'Global Variables' block
        const globals = nodes.filter(n => n.type === 'VarDecl') as AST.VarDecl[];

        if (prog) {
            if (globals.length > 0) {
                // Merge globals into program or return a Project object?
                // AST.ts defines Program. Let's assume we return the Program.
                // We might need a Project AST node.
            }
            return prog;
        }

        // Fallback for just parsing a Var Block (global vars)
        return {
            type: 'Program',
            name: 'GlobalVars',
            variables: globals,
            body: []
        };
    }

    visitLibrary_element(ctx: Parser.Library_elementContext): AST.ASTNode {
        if (ctx.program_declaration()) return this.visit(ctx.program_declaration()!);
        if (ctx.function_block_declaration()) return this.visit(ctx.function_block_declaration()!);
        if (ctx.global_var_declarations()) return this.visit(ctx.global_var_declarations()!);
        return this.defaultResult();
    }

    visitProgram_declaration(ctx: Parser.Program_declarationContext): AST.Program {
        const name = ctx.ID().text;
        const body = this.visit(ctx.body()) as AST.Block;
        const varDecls: AST.VarDecl[] = [];

        // Visit variable declarations
        for (const varDeclCtx of ctx.var_declarations()) {
            const decls = this.visit(varDeclCtx) as unknown as AST.VarDecl[];
            varDecls.push(...decls);
        }

        return {
            type: 'Program',
            name,
            variables: varDecls,
            body: body.statements
        };
    }

    visitFunction_block_declaration(ctx: Parser.Function_block_declarationContext): AST.FunctionBlock {
        const name = ctx.ID().text;
        const body = this.visit(ctx.body()) as AST.Block;
        const varDecls: AST.VarDecl[] = [];

        for (const varDeclCtx of ctx.var_declarations()) {
            const decls = this.visit(varDeclCtx) as unknown as AST.VarDecl[];
            varDecls.push(...decls);
        }

        return {
            type: 'FunctionBlock',
            name,
            variables: varDecls,
            body: body.statements
        };
    }

    // --- Variables ---

    visitGlobal_var_declarations(ctx: Parser.Global_var_declarationsContext): AST.ASTNode {
        const listCtx = ctx.var_decl_list();
        const decls = this.buildVarDeclList(listCtx, 'VAR_GLOBAL');
        // Return a dummy node that carries the list? 
        // Since visit expects a single node, we might need to handle this.
        // But for library_element map, we can hack it.
        // Instead of returning list, let's return the first one? No.
        // This implementation pattern needs to handle arrays.

        // Hack: Return the array cast as ASTNode, caller must handle.
        return decls as unknown as AST.ASTNode;
    }

    visitVar_declarations(ctx: Parser.Var_declarationsContext): AST.ASTNode {
        let type: AST.VarDecl['varType'] = 'VAR';
        if (ctx.childCount > 0) {
            const firstToken = ctx.getChild(0).text;
            if (firstToken === 'VAR_INPUT') type = 'VAR_INPUT';
            else if (firstToken === 'VAR_OUTPUT') type = 'VAR_OUTPUT';
            else if (firstToken === 'VAR_IN_OUT') type = 'VAR_IN_OUT';
            else if (firstToken === 'VAR_GLOBAL') type = 'VAR_GLOBAL'; // Should cover above
            else if (firstToken === 'VAR_TEMP') type = 'VAR_TEMP';
        }

        const listCtx = ctx.var_decl_list();
        return this.buildVarDeclList(listCtx, type) as unknown as AST.ASTNode;
    }

    // Helper, not standard visit - renamed to avoid interface conflict
    private buildVarDeclList(ctx: Parser.Var_decl_listContext, type: AST.VarDecl['varType']): AST.VarDecl[] {
        const decls: AST.VarDecl[] = [];
        for (const declCtx of ctx.var_decl()) {
            decls.push(...this.buildVarDecl(declCtx, type));
        }
        return decls;
    }

    private buildVarDecl(ctx: Parser.Var_declContext, type: AST.VarDecl['varType'] = 'VAR'): AST.VarDecl[] {
        const ids = ctx.identifier_list().ID().map(node => node.text);
        const dataType = ctx.data_type().text;

        let address: string | undefined;
        if (ctx.location()) {
            address = ctx.location()!.text.replace(/^%/, ''); // Remove % prefix if present
        }

        let initialValue: AST.Expression | undefined;
        if (ctx.expression()) {
            initialValue = this.visit(ctx.expression()!) as AST.Expression;
        }

        return ids.map(name => ({
            type: 'VarDecl',
            name,
            varType: type,
            dataType,
            address,
            initialValue
        }));
    }

    // --- Logic ---

    visitBody(ctx: Parser.BodyContext): any {
        return this.visit(ctx.statement_list());
    }

    visitStatement_list(ctx: Parser.Statement_listContext): AST.Block {
        const statements = ctx.statement().map(s => this.visit(s) as AST.Statement);
        return {
            type: 'Block',
            statements
        };
    }

    // Statements

    visitAssignment_statement(ctx: Parser.Assignment_statementContext): AST.Assignment {
        const variable = this.visit(ctx.variable()) as AST.Identifier;
        const expression = this.visit(ctx.expression()) as AST.Expression;

        return {
            type: 'Assignment',
            variable,
            expression
        };
    }

    visitIf_statement(ctx: Parser.If_statementContext): AST.IfStatement {
        const condition = this.visit(ctx.expression(0)) as AST.Expression;
        const thenBranch = (this.visit(ctx.statement_list(0)) as AST.Block).statements;

        const elseIfBranches: { condition: AST.Expression; body: AST.Statement[] }[] = [];
        let elseBranch: AST.Statement[] | undefined;

        const exprs = ctx.expression();
        const stmtLists = ctx.statement_list();

        for (let i = 1; i < exprs.length; i++) {
            elseIfBranches.push({
                condition: this.visit(exprs[i]) as AST.Expression,
                body: (this.visit(stmtLists[i]) as AST.Block).statements
            });
        }

        if (stmtLists.length > exprs.length) {
            elseBranch = (this.visit(stmtLists[stmtLists.length - 1]) as AST.Block).statements;
        }

        return {
            type: 'If',
            condition,
            thenBranch,
            elseIfBranches,
            elseBranch
        };
    }

    visitFor_statement(ctx: Parser.For_statementContext): AST.ForStatement {
        const variable = ctx.ID().text;
        const start = this.visit(ctx.expression(0)) as AST.Expression;
        const to = this.visit(ctx.expression(1)) as AST.Expression;
        let by: AST.Expression | undefined;

        if (ctx.expression().length > 2) {
            by = this.visit(ctx.expression(2)) as AST.Expression;
        }

        const body = (this.visit(ctx.statement_list()) as AST.Block).statements;

        return {
            type: 'For',
            variable,
            start,
            to,
            by,
            body
        };
    }

    visitWhile_statement(ctx: Parser.While_statementContext): AST.WhileStatement {
        const condition = this.visit(ctx.expression()) as AST.Expression;
        const body = (this.visit(ctx.statement_list()) as AST.Block).statements;

        return {
            type: 'While',
            condition,
            body
        };
    }

    visitRepeat_statement(ctx: Parser.Repeat_statementContext): AST.RepeatStatement {
        const body = (this.visit(ctx.statement_list()) as AST.Block).statements;
        const condition = this.visit(ctx.expression()) as AST.Expression;

        return {
            type: 'Repeat',
            condition,
            body
        };
    }

    // FB Call
    // FB Call
    visitFb_call(ctx: Parser.Fb_callContext): AST.FbCall {
        const fbName = ctx.ID().text;
        const params: AST.FbCall['params'] = [];

        for (const paramCtx of ctx.param_assignment()) {
            // param_assignment : (ID ASSIGN expression) | (ID '=>' variable) | expression
            if (paramCtx.ASSIGN()) {
                const name = paramCtx.ID()!.text;
                const value = this.visit(paramCtx.expression()!) as AST.Expression;
                params.push({ name, value });
            } else if (paramCtx.text.includes('=>')) {
                // Output parameter mapping: ID => variable
                // TODO: Handle output parameters. For now treat as value access?
                // AST node expects value to be Expression | Identifier.
                // variable() visits to Identifier usually.
                const name = paramCtx.ID()!.text;
                const value = this.visit(paramCtx.variable()!) as AST.Identifier; // Variable is identifier-like
                params.push({ name, value });
            } else {
                // Positional
                const value = this.visit(paramCtx.expression()!) as AST.Expression;
                params.push({ value });
            }
        }

        return {
            type: 'FbCall',
            fbName,
            params
        };
    }

    visitSubprogram_control_statement(ctx: Parser.Subprogram_control_statementContext): AST.Statement {
        if (ctx.fb_call()) return this.visitFb_call(ctx.fb_call()!);
        // RETURN not implemented in AST yet as statement, maybe ignored
        return { type: 'Assignment', variable: { type: 'Identifier', name: 'RETURN_DUMMY' }, expression: { type: 'Literal', valueType: 'BOOL', value: false } } as any;
    }

    visitFunction_call(ctx: Parser.Function_callContext): AST.FbCall {
        const fbName = ctx.ID().text;
        const params: AST.FbCall['params'] = [];

        if (ctx.param_assignment()) {
            for (const paramCtx of ctx.param_assignment()) {
                if (paramCtx.ASSIGN()) {
                    const name = paramCtx.ID()!.text;
                    const value = this.visit(paramCtx.expression()!) as AST.Expression;
                    params.push({ name, value });
                } else if (paramCtx.text.includes('=>')) {
                    // Function calls dont usually have output mapping but if they do:
                    const name = paramCtx.ID()!.text;
                    const value = this.visit(paramCtx.variable()!) as AST.Identifier;
                    params.push({ name, value });
                } else {
                    const value = this.visit(paramCtx.expression()!) as AST.Expression;
                    params.push({ value });
                }
            }
        }

        return {
            type: 'FbCall',
            fbName,
            params
        };
    }

    // --- Expressions ---

    visitOrExpr(ctx: Parser.OrExprContext): AST.BinaryOp {
        return this.visitBinary(ctx, 'OR');
    }

    visitXorExpr(ctx: Parser.XorExprContext): AST.BinaryOp {
        return this.visitBinary(ctx, 'XOR');
    }

    visitAndExpr(ctx: Parser.AndExprContext): AST.BinaryOp {
        return this.visitBinary(ctx, 'AND');
    }

    visitEqualityExpr(ctx: Parser.EqualityExprContext): AST.BinaryOp {
        const op = ctx.EQ() ? '=' : '<>';
        return this.visitBinary(ctx, op);
    }

    visitRelationalExpr(ctx: Parser.RelationalExprContext): AST.BinaryOp {
        let op: AST.BinaryOp['operator'] = '<';
        if (ctx.GT()) op = '>';
        else if (ctx.LE()) op = '<=';
        else if (ctx.GE()) op = '>=';
        return this.visitBinary(ctx, op);
    }

    visitAdditiveExpr(ctx: Parser.AdditiveExprContext): AST.BinaryOp {
        const op = ctx.PLUS() ? '+' : '-';
        return this.visitBinary(ctx, op);
    }

    visitMultiplicativeExpr(ctx: Parser.MultiplicativeExprContext): AST.BinaryOp {
        let op: AST.BinaryOp['operator'] = '*';
        if (ctx.DIV()) op = '/';
        else if (ctx.MOD()) op = 'MOD';
        return this.visitBinary(ctx, op);
    }

    // Power not in AST yet? AST.BinaryOp doesn't have ** ?
    // AST.ts has 'MOD' but not '**'. Let's assume unsupported or map to function?
    // Checking AST.ts... it has no **. I will skip or add TODO.
    // Actually AST definition has 'MOD'.
    // I'll skip PowerExpr for now or add to AST. 
    // I'll add TODO.

    visitUnaryExpr(ctx: Parser.UnaryExprContext): AST.UnaryOp {
        return {
            type: 'UnaryOp',
            operator: '-',
            operand: this.visit(ctx.expression()) as AST.Expression
        };
    }

    visitNotExpr(ctx: Parser.NotExprContext): AST.UnaryOp {
        return {
            type: 'UnaryOp',
            operator: 'NOT',
            operand: this.visit(ctx.expression()) as AST.Expression
        };
    }

    visitAtomExpr(ctx: Parser.AtomExprContext): AST.Expression {
        return this.visit(ctx.atom()) as AST.Expression;
    }

    private visitBinary(ctx: any, op: AST.BinaryOp['operator']): AST.BinaryOp {
        return {
            type: 'BinaryOp',
            operator: op,
            left: this.visit(ctx.expression(0)) as AST.Expression,
            right: this.visit(ctx.expression(1)) as AST.Expression
        };
    }

    visitAtom(ctx: Parser.AtomContext): AST.Expression {
        if (ctx.constant()) return this.visit(ctx.constant()!) as AST.Literal;
        if (ctx.variable()) return this.visit(ctx.variable()!) as AST.Identifier;
        if (ctx.function_call()) return this.visit(ctx.function_call()!) as unknown as AST.Expression; // Logic needed
        if (ctx.expression()) return this.visit(ctx.expression()!) as AST.Expression; // ( expr )
        return this.defaultResult() as AST.Expression;
    }

    visitVariable(ctx: Parser.VariableContext): AST.Identifier {
        // Simplified variable identifier
        const text = ctx.text;
        return {
            type: 'Identifier',
            name: text
        };
    }

    visitConstant(ctx: Parser.ConstantContext): AST.Literal {
        const text = ctx.text;
        if (ctx.boolean_literal()) {
            return { type: 'Literal', valueType: 'BOOL', value: text.toUpperCase() === 'TRUE' };
        }
        if (ctx.numeric_literal()) {
            return { type: 'Literal', valueType: 'INT', value: parseInt(text) }; // Simplified
        }
        // String, Time...
        return { type: 'Literal', valueType: 'STRING', value: text };
    }
}
