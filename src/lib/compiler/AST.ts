
// Abstract Syntax Tree Definitions for IEC 61131-3 AST

export type NodeType =
    | 'Program'
    | 'FunctionBlock'
    | 'VarDecl'
    | 'Assignment'
    | 'If'
    | 'Case'
    | 'For'
    | 'While'
    | 'Repeat'
    | 'FbCall'
    | 'Block' // Added Block
    | 'BinaryOp'
    | 'UnaryOp'
    | 'Identifier'
    | 'Literal';

export interface ASTNode {
    type: NodeType;
    line?: number;
    column?: number;
}

export interface Block extends ASTNode {
    type: 'Block';
    statements: Statement[];
}

export interface Program extends ASTNode {
    type: 'Program';
    name: string;
    variables: VarDecl[];
    body: Statement[];
}

export interface FunctionBlock extends ASTNode {
    type: 'FunctionBlock';
    name: string;
    variables: VarDecl[];
    body: Statement[];
}

export interface VarDecl extends ASTNode {
    type: 'VarDecl';
    name: string;
    varType: 'VAR' | 'VAR_INPUT' | 'VAR_OUTPUT' | 'VAR_IN_OUT' | 'VAR_TEMP' | 'VAR_GLOBAL';
    dataType: string; // e.g., 'BOOL', 'INT', 'ARRAY...'
    address?: string; // e.g., 'X0', 'D100'
    initialValue?: Expression;
    isConstant?: boolean;
}

export type Statement =
    | Assignment
    | IfStatement
    | CaseStatement
    | ForStatement
    | WhileStatement
    | RepeatStatement
    | FbCall;

export interface Assignment extends ASTNode {
    type: 'Assignment';
    variable: Identifier;
    expression: Expression;
}

export interface IfStatement extends ASTNode {
    type: 'If';
    condition: Expression;
    thenBranch: Statement[];
    elseIfBranches?: { condition: Expression; body: Statement[] }[];
    elseBranch?: Statement[];
}

export interface CaseStatement extends ASTNode {
    type: 'Case';
    expression: Expression;
    cases: { values: (number | { start: number, end: number })[]; body: Statement[] }[];
    elseBranch?: Statement[];
}

export interface ForStatement extends ASTNode {
    type: 'For';
    variable: string;
    start: Expression;
    to: Expression;
    by?: Expression;
    body: Statement[];
}

export interface WhileStatement extends ASTNode {
    type: 'While';
    condition: Expression;
    body: Statement[];
}

export interface RepeatStatement extends ASTNode {
    type: 'Repeat';
    condition: Expression;
    body: Statement[];
}

export interface FbCall extends ASTNode {
    type: 'FbCall';
    fbName: string; // The instance name
    params: { name?: string; value: Expression | Identifier }[]; // Positional or named
}

export type Expression =
    | BinaryOp
    | UnaryOp
    | Identifier
    | Literal
    | FbCall; // FB call can return value if it's a FUNCTION (but usually Statement)

export interface BinaryOp extends ASTNode {
    type: 'BinaryOp';
    operator: '+' | '-' | '*' | '/' | 'MOD' | 'AND' | 'OR' | 'XOR' | '=' | '<>' | '<' | '>' | '<=' | '>=';
    left: Expression;
    right: Expression;
}

export interface UnaryOp extends ASTNode {
    type: 'UnaryOp';
    operator: '-' | 'NOT';
    operand: Expression;
}

export interface Identifier extends ASTNode {
    type: 'Identifier';
    name: string;
    // Handle array access or struct access: name.subField[index]
    // Simplified: just full name string for now, or structured
    parts?: (string | Expression)[];
}

export interface Literal extends ASTNode {
    type: 'Literal';
    valueType: 'BOOL' | 'INT' | 'REAL' | 'STRING' | 'TIME';
    value: any;
}
