// IEC 61131-3 Structured Text Parser & Interpreter

export interface Variable {
  name: string;
  type: string;
  value: any;
  address?: string;
}

export interface Timer {
  name: string;
  PT: number; // Preset time in ms
  ET: number; // Elapsed time
  IN: boolean;
  Q: boolean;
  startTime?: number;
}

export interface Counter {
  name: string;
  PV: number; // Preset value
  CV: number; // Current value
  CU: boolean; // Count up
  CD: boolean; // Count down
  R: boolean; // Reset
  Q: boolean; // Output
}

export interface PLCState {
  variables: Map<string, Variable>;
  timers: Map<string, Timer>;
  counters: Map<string, Counter>;
  scanTime: number;
  running: boolean;
  error?: string;
}

export type TokenType = 
  | 'KEYWORD' | 'IDENTIFIER' | 'NUMBER' | 'STRING' | 'OPERATOR' 
  | 'PUNCTUATION' | 'COMMENT' | 'TYPE' | 'BOOLEAN' | 'WHITESPACE' | 'NEWLINE';

export interface Token {
  type: TokenType;
  value: string;
  line: number;
  column: number;
}

// ST Keywords
const KEYWORDS = new Set([
  'PROGRAM', 'END_PROGRAM', 'FUNCTION', 'END_FUNCTION', 'FUNCTION_BLOCK', 'END_FUNCTION_BLOCK',
  'VAR', 'VAR_INPUT', 'VAR_OUTPUT', 'VAR_IN_OUT', 'VAR_GLOBAL', 'VAR_EXTERNAL', 'END_VAR',
  'CONSTANT', 'RETAIN', 'NON_RETAIN', 'AT',
  'IF', 'THEN', 'ELSIF', 'ELSE', 'END_IF',
  'CASE', 'OF', 'END_CASE',
  'FOR', 'TO', 'BY', 'DO', 'END_FOR',
  'WHILE', 'END_WHILE',
  'REPEAT', 'UNTIL', 'END_REPEAT',
  'EXIT', 'RETURN', 'CONTINUE',
  'AND', 'OR', 'XOR', 'NOT', 'MOD',
  'STRUCT', 'END_STRUCT', 'ARRAY', 'TYPE', 'END_TYPE',
  'TRUE', 'FALSE'
]);

const DATA_TYPES = new Set([
  'BOOL', 'BYTE', 'WORD', 'DWORD', 'LWORD',
  'SINT', 'INT', 'DINT', 'LINT', 'USINT', 'UINT', 'UDINT', 'ULINT',
  'REAL', 'LREAL', 'TIME', 'DATE', 'TOD', 'DT', 'STRING',
  'TON', 'TOF', 'TP', 'CTU', 'CTD', 'CTUD', 'R_TRIG', 'F_TRIG'
]);

// Lexer
export function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  let pos = 0;
  let line = 1;
  let column = 1;

  while (pos < code.length) {
    let matched = false;

    // Skip whitespace (but track newlines)
    if (/\s/.test(code[pos])) {
      if (code[pos] === '\n') {
        line++;
        column = 1;
      } else {
        column++;
      }
      pos++;
      continue;
    }

    // Comments
    if (code.substring(pos, pos + 2) === '(*') {
      const start = pos;
      const startCol = column;
      pos += 2;
      while (pos < code.length && code.substring(pos, pos + 2) !== '*)') {
        if (code[pos] === '\n') {
          line++;
          column = 1;
        }
        pos++;
      }
      pos += 2;
      tokens.push({ type: 'COMMENT', value: code.substring(start, pos), line, column: startCol });
      continue;
    }

    if (code.substring(pos, pos + 2) === '//') {
      const start = pos;
      const startCol = column;
      while (pos < code.length && code[pos] !== '\n') {
        pos++;
      }
      tokens.push({ type: 'COMMENT', value: code.substring(start, pos), line, column: startCol });
      continue;
    }

    // Operators (multi-char first)
    const operators = [':=', '>=', '<=', '<>', '**', '=>', '..'];
    for (const op of operators) {
      if (code.substring(pos, pos + op.length) === op) {
        tokens.push({ type: 'OPERATOR', value: op, line, column });
        pos += op.length;
        column += op.length;
        matched = true;
        break;
      }
    }
    if (matched) continue;

    // Single-char operators
    if (/[+\-*\/%=<>&|^~]/.test(code[pos])) {
      tokens.push({ type: 'OPERATOR', value: code[pos], line, column });
      pos++;
      column++;
      continue;
    }

    // Punctuation
    if (/[(),;:\[\].]/.test(code[pos])) {
      tokens.push({ type: 'PUNCTUATION', value: code[pos], line, column });
      pos++;
      column++;
      continue;
    }

    // Strings
    if (code[pos] === "'" || code[pos] === '"') {
      const quote = code[pos];
      const start = pos;
      const startCol = column;
      pos++;
      while (pos < code.length && code[pos] !== quote) {
        if (code[pos] === '\n') {
          line++;
          column = 1;
        }
        pos++;
      }
      pos++;
      tokens.push({ type: 'STRING', value: code.substring(start, pos), line, column: startCol });
      continue;
    }

    // Numbers (including time literals)
    if (/[0-9]/.test(code[pos]) || (code[pos] === 'T' && code[pos + 1] === '#')) {
      const start = pos;
      const startCol = column;
      
      // Time literal
      if (code[pos] === 'T' && code[pos + 1] === '#') {
        pos += 2;
        while (pos < code.length && /[0-9smhd_]/.test(code[pos])) {
          pos++;
        }
      } else {
        // Regular number
        while (pos < code.length && /[0-9._eE+\-]/.test(code[pos])) {
          pos++;
        }
      }
      tokens.push({ type: 'NUMBER', value: code.substring(start, pos), line, column: startCol });
      column += pos - start;
      continue;
    }

    // Identifiers and keywords
    if (/[a-zA-Z_]/.test(code[pos])) {
      const start = pos;
      const startCol = column;
      while (pos < code.length && /[a-zA-Z0-9_]/.test(code[pos])) {
        pos++;
      }
      const value = code.substring(start, pos);
      const upperValue = value.toUpperCase();
      
      let type: TokenType = 'IDENTIFIER';
      if (upperValue === 'TRUE' || upperValue === 'FALSE') {
        type = 'BOOLEAN';
      } else if (KEYWORDS.has(upperValue)) {
        type = 'KEYWORD';
      } else if (DATA_TYPES.has(upperValue)) {
        type = 'TYPE';
      }
      
      tokens.push({ type, value, line, column: startCol });
      column += pos - start;
      continue;
    }

    // Unknown character
    pos++;
    column++;
  }

  return tokens;
}

// Syntax highlighter
export function highlightCode(code: string): string {
  const tokens = tokenize(code);
  let result = '';
  let lastPos = 0;
  let currentLine = 1;
  let currentCol = 1;

  // Build position map
  const lines = code.split('\n');
  const lineStarts: number[] = [0];
  for (let i = 0; i < lines.length - 1; i++) {
    lineStarts.push(lineStarts[i] + lines[i].length + 1);
  }

  for (const token of tokens) {
    const tokenStart = lineStarts[token.line - 1] + token.column - 1;
    
    // Add any whitespace before this token
    if (tokenStart > lastPos) {
      result += escapeHtml(code.substring(lastPos, tokenStart));
    }

    const escapedValue = escapeHtml(token.value);
    
    switch (token.type) {
      case 'KEYWORD':
        result += `<span class="syntax-keyword">${escapedValue}</span>`;
        break;
      case 'TYPE':
        result += `<span class="syntax-type">${escapedValue}</span>`;
        break;
      case 'STRING':
        result += `<span class="syntax-string">${escapedValue}</span>`;
        break;
      case 'NUMBER':
        result += `<span class="syntax-number">${escapedValue}</span>`;
        break;
      case 'BOOLEAN':
        result += `<span class="syntax-number">${escapedValue}</span>`;
        break;
      case 'COMMENT':
        result += `<span class="syntax-comment">${escapedValue}</span>`;
        break;
      case 'OPERATOR':
        result += `<span class="syntax-operator">${escapedValue}</span>`;
        break;
      default:
        result += escapedValue;
    }

    lastPos = tokenStart + token.value.length;
  }

  // Add remaining text
  if (lastPos < code.length) {
    result += escapeHtml(code.substring(lastPos));
  }

  return result;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Parse time literal (T#1s, T#100ms, etc.)
export function parseTimeLiteral(value: string): number {
  const match = value.match(/T#(\d+)(ms|s|m|h|d)/i);
  if (!match) return 0;
  
  const num = parseInt(match[1]);
  const unit = match[2].toLowerCase();
  
  switch (unit) {
    case 'ms': return num;
    case 's': return num * 1000;
    case 'm': return num * 60000;
    case 'h': return num * 3600000;
    case 'd': return num * 86400000;
    default: return num;
  }
}

// Simple ST Interpreter
export class STInterpreter {
  state: PLCState;
  private ast: any = null;

  constructor() {
    this.state = {
      variables: new Map(),
      timers: new Map(),
      counters: new Map(),
      scanTime: 10,
      running: false
    };
  }

  // Parse variable declarations
  parseVariables(code: string): void {
    const varBlockRegex = /VAR(?:_INPUT|_OUTPUT|_IN_OUT)?\s*([\s\S]*?)END_VAR/gi;
    let match;

    while ((match = varBlockRegex.exec(code)) !== null) {
      const block = match[1];
      const varLines = block.split(';').filter(l => l.trim());

      for (const line of varLines) {
        const varMatch = line.match(/(\w+)\s*(?:AT\s+%([IQMX][\d.]+))?\s*:\s*(\w+)(?:\s*:=\s*(.+))?/i);
        if (varMatch) {
          const [, name, address, type, initialValue] = varMatch;
          let value: any = this.getDefaultValue(type.toUpperCase());
          
          if (initialValue) {
            value = this.parseValue(initialValue.trim(), type.toUpperCase());
          }

          // Handle timer/counter types
          if (['TON', 'TOF', 'TP'].includes(type.toUpperCase())) {
            this.state.timers.set(name, {
              name,
              PT: 0,
              ET: 0,
              IN: false,
              Q: false
            });
          } else if (['CTU', 'CTD', 'CTUD'].includes(type.toUpperCase())) {
            this.state.counters.set(name, {
              name,
              PV: 0,
              CV: 0,
              CU: false,
              CD: false,
              R: false,
              Q: false
            });
          } else {
            this.state.variables.set(name, {
              name,
              type: type.toUpperCase(),
              value,
              address
            });
          }
        }
      }
    }
  }

  private getDefaultValue(type: string): any {
    switch (type) {
      case 'BOOL': return false;
      case 'INT': case 'SINT': case 'DINT': case 'LINT':
      case 'UINT': case 'USINT': case 'UDINT': case 'ULINT':
      case 'BYTE': case 'WORD': case 'DWORD': case 'LWORD':
        return 0;
      case 'REAL': case 'LREAL': return 0.0;
      case 'STRING': return '';
      case 'TIME': return 0;
      default: return null;
    }
  }

  private parseValue(value: string, type: string): any {
    value = value.trim();
    
    if (type === 'BOOL') {
      return value.toUpperCase() === 'TRUE' || value === '1';
    }
    if (type === 'STRING') {
      return value.replace(/^['"]|['"]$/g, '');
    }
    if (type === 'TIME') {
      return parseTimeLiteral(value);
    }
    if (['REAL', 'LREAL'].includes(type)) {
      return parseFloat(value);
    }
    return parseInt(value);
  }

  // Execute a single scan cycle
  executeScan(code: string): void {
    if (!this.state.running) return;

    try {
      // Remove comments
      const cleanCode = code
        .replace(/\(\*[\s\S]*?\*\)/g, '')
        .replace(/\/\/.*/g, '');

      // Find the program body
      const bodyMatch = cleanCode.match(/(?:PROGRAM\s+\w+[\s\S]*?END_VAR\s*)([\s\S]*?)(?:END_PROGRAM)/i);
      const body = bodyMatch ? bodyMatch[1] : cleanCode;

      // Execute statements
      this.executeStatements(body);

      // Update timers
      this.updateTimers();

    } catch (error) {
      this.state.error = error instanceof Error ? error.message : 'Unknown error';
    }
  }

  private executeStatements(code: string): void {
    const statements = this.splitStatements(code);
    
    for (const stmt of statements) {
      this.executeStatement(stmt.trim());
    }
  }

  private splitStatements(code: string): string[] {
    const statements: string[] = [];
    let current = '';
    let depth = 0;

    for (let i = 0; i < code.length; i++) {
      const char = code[i];
      const upper = code.substring(i, i + 10).toUpperCase();

      // Track block depth
      if (upper.startsWith('IF ') || upper.startsWith('FOR ') || 
          upper.startsWith('WHILE ') || upper.startsWith('CASE ')) {
        depth++;
      }
      if (upper.startsWith('END_IF') || upper.startsWith('END_FOR') || 
          upper.startsWith('END_WHILE') || upper.startsWith('END_CASE')) {
        depth--;
      }

      current += char;

      if (char === ';' && depth === 0) {
        statements.push(current);
        current = '';
      }
    }

    if (current.trim()) {
      statements.push(current);
    }

    return statements;
  }

  private executeStatement(stmt: string): void {
    if (!stmt.trim()) return;

    // Assignment
    const assignMatch = stmt.match(/^(\w+(?:\.\w+)?)\s*:=\s*(.+);?$/i);
    if (assignMatch) {
      const [, varName, expr] = assignMatch;
      const value = this.evaluateExpression(expr);
      this.setVariable(varName, value);
      return;
    }

    // Timer call
    const timerMatch = stmt.match(/^(\w+)\s*\(\s*IN\s*:=\s*(.+?)\s*,\s*PT\s*:=\s*(.+?)\s*\)/i);
    if (timerMatch) {
      const [, name, inExpr, ptExpr] = timerMatch;
      const timer = this.state.timers.get(name);
      if (timer) {
        timer.IN = this.evaluateExpression(inExpr);
        timer.PT = this.evaluateExpression(ptExpr);
      }
      return;
    }

    // IF statement
    const ifMatch = stmt.match(/^IF\s+(.+?)\s+THEN\s+([\s\S]*?)(?:ELSE\s+([\s\S]*?))?END_IF;?$/i);
    if (ifMatch) {
      const [, condition, thenBlock, elseBlock] = ifMatch;
      if (this.evaluateExpression(condition)) {
        this.executeStatements(thenBlock);
      } else if (elseBlock) {
        this.executeStatements(elseBlock);
      }
      return;
    }

    // FOR loop
    const forMatch = stmt.match(/^FOR\s+(\w+)\s*:=\s*(.+?)\s+TO\s+(.+?)(?:\s+BY\s+(.+?))?\s+DO\s+([\s\S]*?)END_FOR;?$/i);
    if (forMatch) {
      const [, varName, startExpr, endExpr, stepExpr, body] = forMatch;
      const start = this.evaluateExpression(startExpr);
      const end = this.evaluateExpression(endExpr);
      const step = stepExpr ? this.evaluateExpression(stepExpr) : 1;

      for (let i = start; step > 0 ? i <= end : i >= end; i += step) {
        this.setVariable(varName, i);
        this.executeStatements(body);
      }
      return;
    }

    // WHILE loop
    const whileMatch = stmt.match(/^WHILE\s+(.+?)\s+DO\s+([\s\S]*?)END_WHILE;?$/i);
    if (whileMatch) {
      const [, condition, body] = whileMatch;
      let iterations = 0;
      while (this.evaluateExpression(condition) && iterations < 10000) {
        this.executeStatements(body);
        iterations++;
      }
      return;
    }
  }

  private evaluateExpression(expr: string): any {
    expr = expr.trim();

    // Boolean literals
    if (expr.toUpperCase() === 'TRUE') return true;
    if (expr.toUpperCase() === 'FALSE') return false;

    // Number literals
    if (/^-?\d+\.?\d*$/.test(expr)) {
      return expr.includes('.') ? parseFloat(expr) : parseInt(expr);
    }

    // Time literals
    if (/^T#/i.test(expr)) {
      return parseTimeLiteral(expr);
    }

    // String literals
    if (/^['"].*['"]$/.test(expr)) {
      return expr.slice(1, -1);
    }

    // Timer/counter member access
    const memberMatch = expr.match(/^(\w+)\.(Q|ET|CV)$/i);
    if (memberMatch) {
      const [, name, member] = memberMatch;
      const timer = this.state.timers.get(name);
      if (timer) {
        return member.toUpperCase() === 'Q' ? timer.Q : timer.ET;
      }
      const counter = this.state.counters.get(name);
      if (counter) {
        if (member.toUpperCase() === 'Q') return counter.Q;
        if (member.toUpperCase() === 'CV') return counter.CV;
      }
    }

    // Variable reference
    const variable = this.state.variables.get(expr);
    if (variable) {
      return variable.value;
    }

    // NOT operator
    if (expr.toUpperCase().startsWith('NOT ')) {
      return !this.evaluateExpression(expr.substring(4));
    }

    // Binary operators
    const operators = [
      { pattern: /\s+OR\s+/i, fn: (a: any, b: any) => a || b },
      { pattern: /\s+XOR\s+/i, fn: (a: any, b: any) => (a || b) && !(a && b) },
      { pattern: /\s+AND\s+/i, fn: (a: any, b: any) => a && b },
      { pattern: /\s*>=\s*/, fn: (a: any, b: any) => a >= b },
      { pattern: /\s*<=\s*/, fn: (a: any, b: any) => a <= b },
      { pattern: /\s*<>\s*/, fn: (a: any, b: any) => a !== b },
      { pattern: /\s*>\s*/, fn: (a: any, b: any) => a > b },
      { pattern: /\s*<\s*/, fn: (a: any, b: any) => a < b },
      { pattern: /\s*=\s*/, fn: (a: any, b: any) => a === b },
      { pattern: /\s*\+\s*/, fn: (a: any, b: any) => a + b },
      { pattern: /\s*-\s*/, fn: (a: any, b: any) => a - b },
      { pattern: /\s*\*\s*/, fn: (a: any, b: any) => a * b },
      { pattern: /\s*\/\s*/, fn: (a: any, b: any) => a / b },
      { pattern: /\s+MOD\s+/i, fn: (a: any, b: any) => a % b },
    ];

    for (const { pattern, fn } of operators) {
      const parts = expr.split(pattern);
      if (parts.length >= 2) {
        let result = this.evaluateExpression(parts[0]);
        for (let i = 1; i < parts.length; i++) {
          result = fn(result, this.evaluateExpression(parts[i]));
        }
        return result;
      }
    }

    // Parentheses
    if (expr.startsWith('(') && expr.endsWith(')')) {
      return this.evaluateExpression(expr.slice(1, -1));
    }

    return 0;
  }

  private setVariable(name: string, value: any): void {
    // Handle member access for timers/counters
    const memberMatch = name.match(/^(\w+)\.(\w+)$/);
    if (memberMatch) {
      const [, objName, member] = memberMatch;
      const timer = this.state.timers.get(objName);
      if (timer) {
        if (member.toUpperCase() === 'IN') timer.IN = value;
        if (member.toUpperCase() === 'PT') timer.PT = value;
        return;
      }
    }

    const variable = this.state.variables.get(name);
    if (variable) {
      variable.value = value;
    }
  }

  private updateTimers(): void {
    const now = Date.now();
    
    for (const timer of this.state.timers.values()) {
      if (timer.IN) {
        if (!timer.startTime) {
          timer.startTime = now;
        }
        timer.ET = now - timer.startTime;
        timer.Q = timer.ET >= timer.PT;
        if (timer.Q) {
          timer.ET = timer.PT; // Clamp to PT
        }
      } else {
        timer.startTime = undefined;
        timer.ET = 0;
        timer.Q = false;
      }
    }
  }

  getVariable(name: string): any {
    return this.state.variables.get(name)?.value;
  }

  setInput(name: string, value: any): void {
    const variable = this.state.variables.get(name);
    if (variable) {
      variable.value = value;
    }
  }

  start(): void {
    this.state.running = true;
    this.state.error = undefined;
  }

  stop(): void {
    this.state.running = false;
  }

  reset(): void {
    this.state.running = false;
    this.state.error = undefined;
    
    for (const variable of this.state.variables.values()) {
      variable.value = this.getDefaultValue(variable.type);
    }
    
    for (const timer of this.state.timers.values()) {
      timer.ET = 0;
      timer.Q = false;
      timer.startTime = undefined;
    }
    
    for (const counter of this.state.counters.values()) {
      counter.CV = 0;
      counter.Q = false;
    }
  }
}

export const createInterpreter = () => new STInterpreter();
