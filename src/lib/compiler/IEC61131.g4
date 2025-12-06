grammar IEC61131;

/*
 * IEC 61131-3 Structured Text Grammar for ANTLR4
 * Simplified for this Simulator Project
 */

// Entry Point
program : library_element+ EOF ;

library_element
    : function_block_declaration
    | program_declaration
    | configuration_declaration
    | global_var_declarations // For simple sample support
    ;

// Variable Declarations
global_var_declarations : 'VAR_GLOBAL' (constant_qualifier)? (retain_qualifier)? var_decl_list 'END_VAR' ;
program_declaration : 'PROGRAM' ID var_declarations* body 'END_PROGRAM' ;
function_block_declaration : 'FUNCTION_BLOCK' ID var_declarations* body 'END_FUNCTION_BLOCK' ;
configuration_declaration : 'CONFIGURATION' ID resource_declaration+ 'END_CONFIGURATION' ;
resource_declaration : 'RESOURCE' ID 'ON' ID task_configuration* program_configuration* 'END_RESOURCE' ;

task_configuration : 'TASK' ID '(' 'INTERVAL' ASSIGN time_literal ',' 'PRIORITY' ASSIGN INT ')' ';' ;
program_configuration : 'PROGRAM' ID ('WITH' ID)? ':' ID ('(' (param_assignment (',' param_assignment)*)? ')')? ';' ;

var_declarations
    : 'VAR_INPUT' var_decl_list 'END_VAR'
    | 'VAR_OUTPUT' var_decl_list 'END_VAR'
    | 'VAR_IN_OUT' var_decl_list 'END_VAR'
    | 'VAR' (constant_qualifier)? (retain_qualifier)? var_decl_list 'END_VAR'
    | 'VAR_TEMP' var_decl_list 'END_VAR'
    ;

constant_qualifier : 'CONSTANT' ;
retain_qualifier : 'RETAIN' ;

var_decl_list : (var_decl ';')+ ;

var_decl
    : identifier_list (AT location)? ':' data_type (ASSIGN expression)? // Simple declaration
    ;

identifier_list : ID (',' ID)* ;
location : '%' (ID | INT | 'I' | 'Q' | 'M')* ; // Simplified location

data_type
    : elementary_data_type
    | derived_data_type
    | array_data_type // Simplified
    ;

elementary_data_type
    : 'BOOL' | 'SINT' | 'INT' | 'DINT' | 'LINT' | 'USINT' | 'UINT' | 'UDINT' | 'ULINT'
    | 'REAL' | 'LREAL' | 'TIME' | 'DATE' | 'TIME_OF_DAY' | 'TOD' | 'DATE_AND_TIME' | 'DT'
    | 'STRING' | 'BYTE' | 'WORD' | 'DWORD' | 'LWORD'
    | 'WSTRING' // Added for completion
    ;

derived_data_type : ID ;

array_data_type : 'ARRAY' '[' subrange (',' subrange)* ']' 'OF' data_type ;
subrange : (INT | '-')? INT '..' (INT | '-')? INT ;

// Logic Body
body : statement_list ;

statement_list : (statement ';')* ;

statement
    : assignment_statement
    | subprogram_control_statement
    | selection_statement
    | iteration_statement
    ;

assignment_statement : variable ASSIGN expression ;

subprogram_control_statement
    : fb_call
    | 'RETURN'
    ;

// FB Call: Instance(IN:=Val, OUT=>Var)
fb_call : ID '(' (param_assignment (',' param_assignment)*)? ')' ;

param_assignment
    : (ID ASSIGN expression)
    | (ID '=>' variable) 
    | expression // Positional argument
    ;

selection_statement
    : if_statement
    | case_statement
    ;

if_statement
    : 'IF' expression 'THEN' statement_list
      ('ELSIF' expression 'THEN' statement_list)*
      ('ELSE' statement_list)?
      'END_IF'
    ;

case_statement : 'CASE' expression 'OF' case_element+ ('ELSE' statement_list)? 'END_CASE' ;
case_element : case_list ':' statement_list ;
case_list : case_list_element (',' case_list_element)* ;
case_list_element : subrange | INT ; // Simplified

iteration_statement
    : for_statement
    | while_statement
    | repeat_statement
    ;

for_statement : 'FOR' ID ASSIGN expression 'TO' expression ('BY' expression)? 'DO' statement_list 'END_FOR' ;
while_statement : 'WHILE' expression 'DO' statement_list 'END_WHILE' ;
repeat_statement : 'REPEAT' statement_list 'UNTIL' expression 'END_REPEAT' ;

// Expressions
expression
    : expression OR expression       # OrExpr
    | expression XOR expression      # XorExpr
    | expression AND expression      # AndExpr
    | NOT expression                 # NotExpr
    | expression (EQ | NE) expression # EqualityExpr
    | expression (LT | GT | LE | GE) expression # RelationalExpr
    | expression (PLUS | MINUS) expression # AdditiveExpr
    | expression (MULT | DIV | MOD) expression # MultiplicativeExpr
    | expression POWER expression    # PowerExpr
    | (MINUS | PLUS) expression      # UnaryExpr
    | atom                           # AtomExpr
    ;

atom
    : constant
    | variable
    | '(' expression ')'
    | function_call
    ;

function_call : ID '(' (param_assignment (',' param_assignment)*)? ')' ;

variable
    : ID ('.' ID)* ( '[' expression (',' expression)* ']' )?
    ;

constant
    : numeric_literal
    | string_literal
    | time_literal
    | boolean_literal
    ;

numeric_literal : (MINUS)? (INT | REAL_NUM | HEX_INT) ;
boolean_literal : 'TRUE' | 'FALSE' ;
string_literal : STRING_LITERAL ;
time_literal : TIME_LITERAL ;

// Lexer Rules

ASSIGN : ':=' ;
EQ : '=' ;
NE : '<>' ;
LT : '<' ;
GT : '>' ;
LE : '<=' ;
GE : '>=' ;
PLUS : '+' ;
MINUS : '-' ;
MULT : '*' ;
DIV : '/' ;
MOD : 'MOD' ;
POWER : '**' ;

OR : 'OR' ;
XOR : 'XOR' ;
AND : 'AND' ;
NOT : 'NOT' ;
AT : 'AT' ;

// Generic rules last
ID : [a-zA-Z_] [a-zA-Z0-9_]* ;
INT : [0-9]+ ;
HEX_INT : '16#' [0-9a-fA-F]+ ;
REAL_NUM : [0-9]+ '.' [0-9]+ ;
STRING_LITERAL : '\'' (~['\r\n])* '\'' ;
TIME_LITERAL : 'T#' [a-zA-Z0-9_.]+ ;

WS : [ \t\r\n]+ -> skip ;
COMMENT : '(*' .*? '*)' -> skip ;
LINE_COMMENT : '//' ~[\r\n]* -> skip ;
