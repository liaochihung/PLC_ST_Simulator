// Generated from src/lib/compiler/IEC61131.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { IEC61131Listener } from "./IEC61131Listener";
import { IEC61131Visitor } from "./IEC61131Visitor";


export class IEC61131Parser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly T__9 = 10;
	public static readonly T__10 = 11;
	public static readonly T__11 = 12;
	public static readonly T__12 = 13;
	public static readonly T__13 = 14;
	public static readonly T__14 = 15;
	public static readonly T__15 = 16;
	public static readonly T__16 = 17;
	public static readonly T__17 = 18;
	public static readonly T__18 = 19;
	public static readonly T__19 = 20;
	public static readonly T__20 = 21;
	public static readonly T__21 = 22;
	public static readonly T__22 = 23;
	public static readonly T__23 = 24;
	public static readonly T__24 = 25;
	public static readonly T__25 = 26;
	public static readonly T__26 = 27;
	public static readonly T__27 = 28;
	public static readonly T__28 = 29;
	public static readonly T__29 = 30;
	public static readonly T__30 = 31;
	public static readonly T__31 = 32;
	public static readonly T__32 = 33;
	public static readonly T__33 = 34;
	public static readonly T__34 = 35;
	public static readonly T__35 = 36;
	public static readonly T__36 = 37;
	public static readonly T__37 = 38;
	public static readonly T__38 = 39;
	public static readonly T__39 = 40;
	public static readonly T__40 = 41;
	public static readonly T__41 = 42;
	public static readonly T__42 = 43;
	public static readonly T__43 = 44;
	public static readonly T__44 = 45;
	public static readonly T__45 = 46;
	public static readonly T__46 = 47;
	public static readonly T__47 = 48;
	public static readonly T__48 = 49;
	public static readonly T__49 = 50;
	public static readonly T__50 = 51;
	public static readonly T__51 = 52;
	public static readonly T__52 = 53;
	public static readonly T__53 = 54;
	public static readonly T__54 = 55;
	public static readonly T__55 = 56;
	public static readonly T__56 = 57;
	public static readonly T__57 = 58;
	public static readonly T__58 = 59;
	public static readonly T__59 = 60;
	public static readonly T__60 = 61;
	public static readonly T__61 = 62;
	public static readonly T__62 = 63;
	public static readonly T__63 = 64;
	public static readonly T__64 = 65;
	public static readonly T__65 = 66;
	public static readonly T__66 = 67;
	public static readonly T__67 = 68;
	public static readonly T__68 = 69;
	public static readonly T__69 = 70;
	public static readonly T__70 = 71;
	public static readonly T__71 = 72;
	public static readonly T__72 = 73;
	public static readonly T__73 = 74;
	public static readonly T__74 = 75;
	public static readonly T__75 = 76;
	public static readonly T__76 = 77;
	public static readonly T__77 = 78;
	public static readonly ASSIGN = 79;
	public static readonly EQ = 80;
	public static readonly NE = 81;
	public static readonly LT = 82;
	public static readonly GT = 83;
	public static readonly LE = 84;
	public static readonly GE = 85;
	public static readonly PLUS = 86;
	public static readonly MINUS = 87;
	public static readonly MULT = 88;
	public static readonly DIV = 89;
	public static readonly MOD = 90;
	public static readonly POWER = 91;
	public static readonly OR = 92;
	public static readonly XOR = 93;
	public static readonly AND = 94;
	public static readonly NOT = 95;
	public static readonly AT = 96;
	public static readonly ID = 97;
	public static readonly INT = 98;
	public static readonly HEX_INT = 99;
	public static readonly REAL_NUM = 100;
	public static readonly STRING_LITERAL = 101;
	public static readonly TIME_LITERAL = 102;
	public static readonly WS = 103;
	public static readonly COMMENT = 104;
	public static readonly LINE_COMMENT = 105;
	public static readonly RULE_program = 0;
	public static readonly RULE_library_element = 1;
	public static readonly RULE_global_var_declarations = 2;
	public static readonly RULE_program_declaration = 3;
	public static readonly RULE_function_block_declaration = 4;
	public static readonly RULE_configuration_declaration = 5;
	public static readonly RULE_resource_declaration = 6;
	public static readonly RULE_task_configuration = 7;
	public static readonly RULE_program_configuration = 8;
	public static readonly RULE_var_declarations = 9;
	public static readonly RULE_constant_qualifier = 10;
	public static readonly RULE_retain_qualifier = 11;
	public static readonly RULE_var_decl_list = 12;
	public static readonly RULE_var_decl = 13;
	public static readonly RULE_identifier_list = 14;
	public static readonly RULE_location = 15;
	public static readonly RULE_data_type = 16;
	public static readonly RULE_elementary_data_type = 17;
	public static readonly RULE_derived_data_type = 18;
	public static readonly RULE_array_data_type = 19;
	public static readonly RULE_subrange = 20;
	public static readonly RULE_body = 21;
	public static readonly RULE_statement_list = 22;
	public static readonly RULE_statement = 23;
	public static readonly RULE_assignment_statement = 24;
	public static readonly RULE_subprogram_control_statement = 25;
	public static readonly RULE_fb_call = 26;
	public static readonly RULE_param_assignment = 27;
	public static readonly RULE_selection_statement = 28;
	public static readonly RULE_if_statement = 29;
	public static readonly RULE_case_statement = 30;
	public static readonly RULE_case_element = 31;
	public static readonly RULE_case_list = 32;
	public static readonly RULE_case_list_element = 33;
	public static readonly RULE_iteration_statement = 34;
	public static readonly RULE_for_statement = 35;
	public static readonly RULE_while_statement = 36;
	public static readonly RULE_repeat_statement = 37;
	public static readonly RULE_expression = 38;
	public static readonly RULE_atom = 39;
	public static readonly RULE_function_call = 40;
	public static readonly RULE_variable = 41;
	public static readonly RULE_constant = 42;
	public static readonly RULE_numeric_literal = 43;
	public static readonly RULE_boolean_literal = 44;
	public static readonly RULE_string_literal = 45;
	public static readonly RULE_time_literal = 46;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"program", "library_element", "global_var_declarations", "program_declaration", 
		"function_block_declaration", "configuration_declaration", "resource_declaration", 
		"task_configuration", "program_configuration", "var_declarations", "constant_qualifier", 
		"retain_qualifier", "var_decl_list", "var_decl", "identifier_list", "location", 
		"data_type", "elementary_data_type", "derived_data_type", "array_data_type", 
		"subrange", "body", "statement_list", "statement", "assignment_statement", 
		"subprogram_control_statement", "fb_call", "param_assignment", "selection_statement", 
		"if_statement", "case_statement", "case_element", "case_list", "case_list_element", 
		"iteration_statement", "for_statement", "while_statement", "repeat_statement", 
		"expression", "atom", "function_call", "variable", "constant", "numeric_literal", 
		"boolean_literal", "string_literal", "time_literal",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'VAR_GLOBAL'", "'END_VAR'", "'PROGRAM'", "'END_PROGRAM'", 
		"'FUNCTION_BLOCK'", "'END_FUNCTION_BLOCK'", "'CONFIGURATION'", "'END_CONFIGURATION'", 
		"'RESOURCE'", "'ON'", "'END_RESOURCE'", "'TASK'", "'('", "'INTERVAL'", 
		"','", "'PRIORITY'", "')'", "';'", "'WITH'", "':'", "'VAR_INPUT'", "'VAR_OUTPUT'", 
		"'VAR_IN_OUT'", "'VAR'", "'VAR_TEMP'", "'CONSTANT'", "'RETAIN'", "'%'", 
		"'BOOL'", "'SINT'", "'INT'", "'DINT'", "'LINT'", "'USINT'", "'UINT'", 
		"'UDINT'", "'ULINT'", "'REAL'", "'LREAL'", "'TIME'", "'DATE'", "'TIME_OF_DAY'", 
		"'TOD'", "'DATE_AND_TIME'", "'DT'", "'STRING'", "'BYTE'", "'WORD'", "'DWORD'", 
		"'LWORD'", "'WSTRING'", "'ARRAY'", "'['", "']'", "'OF'", "'..'", "'RETURN'", 
		"'=>'", "'IF'", "'THEN'", "'ELSIF'", "'ELSE'", "'END_IF'", "'CASE'", "'END_CASE'", 
		"'FOR'", "'TO'", "'BY'", "'DO'", "'END_FOR'", "'WHILE'", "'END_WHILE'", 
		"'REPEAT'", "'UNTIL'", "'END_REPEAT'", "'.'", "'TRUE'", "'FALSE'", "':='", 
		"'='", "'<>'", "'<'", "'>'", "'<='", "'>='", "'+'", "'-'", "'*'", "'/'", 
		"'MOD'", "'**'", "'OR'", "'XOR'", "'AND'", "'NOT'", "'AT'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, "ASSIGN", "EQ", "NE", "LT", "GT", "LE", "GE", "PLUS", 
		"MINUS", "MULT", "DIV", "MOD", "POWER", "OR", "XOR", "AND", "NOT", "AT", 
		"ID", "INT", "HEX_INT", "REAL_NUM", "STRING_LITERAL", "TIME_LITERAL", 
		"WS", "COMMENT", "LINE_COMMENT",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(IEC61131Parser._LITERAL_NAMES, IEC61131Parser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return IEC61131Parser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "IEC61131.g4"; }

	// @Override
	public get ruleNames(): string[] { return IEC61131Parser.ruleNames; }

	// @Override
	public get serializedATN(): string { return IEC61131Parser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(IEC61131Parser._ATN, this);
	}
	// @RuleVersion(0)
	public program(): ProgramContext {
		let _localctx: ProgramContext = new ProgramContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, IEC61131Parser.RULE_program);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 95;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 94;
				this.library_element();
				}
				}
				this.state = 97;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << IEC61131Parser.T__0) | (1 << IEC61131Parser.T__2) | (1 << IEC61131Parser.T__4) | (1 << IEC61131Parser.T__6))) !== 0));
			this.state = 99;
			this.match(IEC61131Parser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public library_element(): Library_elementContext {
		let _localctx: Library_elementContext = new Library_elementContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, IEC61131Parser.RULE_library_element);
		try {
			this.state = 105;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case IEC61131Parser.T__4:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 101;
				this.function_block_declaration();
				}
				break;
			case IEC61131Parser.T__2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 102;
				this.program_declaration();
				}
				break;
			case IEC61131Parser.T__6:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 103;
				this.configuration_declaration();
				}
				break;
			case IEC61131Parser.T__0:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 104;
				this.global_var_declarations();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public global_var_declarations(): Global_var_declarationsContext {
		let _localctx: Global_var_declarationsContext = new Global_var_declarationsContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, IEC61131Parser.RULE_global_var_declarations);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 107;
			this.match(IEC61131Parser.T__0);
			this.state = 109;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IEC61131Parser.T__25) {
				{
				this.state = 108;
				this.constant_qualifier();
				}
			}

			this.state = 112;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IEC61131Parser.T__26) {
				{
				this.state = 111;
				this.retain_qualifier();
				}
			}

			this.state = 114;
			this.var_decl_list();
			this.state = 115;
			this.match(IEC61131Parser.T__1);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public program_declaration(): Program_declarationContext {
		let _localctx: Program_declarationContext = new Program_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, IEC61131Parser.RULE_program_declaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 117;
			this.match(IEC61131Parser.T__2);
			this.state = 118;
			this.match(IEC61131Parser.ID);
			this.state = 122;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << IEC61131Parser.T__20) | (1 << IEC61131Parser.T__21) | (1 << IEC61131Parser.T__22) | (1 << IEC61131Parser.T__23) | (1 << IEC61131Parser.T__24))) !== 0)) {
				{
				{
				this.state = 119;
				this.var_declarations();
				}
				}
				this.state = 124;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 125;
			this.body();
			this.state = 126;
			this.match(IEC61131Parser.T__3);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public function_block_declaration(): Function_block_declarationContext {
		let _localctx: Function_block_declarationContext = new Function_block_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, IEC61131Parser.RULE_function_block_declaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 128;
			this.match(IEC61131Parser.T__4);
			this.state = 129;
			this.match(IEC61131Parser.ID);
			this.state = 133;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << IEC61131Parser.T__20) | (1 << IEC61131Parser.T__21) | (1 << IEC61131Parser.T__22) | (1 << IEC61131Parser.T__23) | (1 << IEC61131Parser.T__24))) !== 0)) {
				{
				{
				this.state = 130;
				this.var_declarations();
				}
				}
				this.state = 135;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 136;
			this.body();
			this.state = 137;
			this.match(IEC61131Parser.T__5);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public configuration_declaration(): Configuration_declarationContext {
		let _localctx: Configuration_declarationContext = new Configuration_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, IEC61131Parser.RULE_configuration_declaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 139;
			this.match(IEC61131Parser.T__6);
			this.state = 140;
			this.match(IEC61131Parser.ID);
			this.state = 142;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 141;
				this.resource_declaration();
				}
				}
				this.state = 144;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === IEC61131Parser.T__8);
			this.state = 146;
			this.match(IEC61131Parser.T__7);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public resource_declaration(): Resource_declarationContext {
		let _localctx: Resource_declarationContext = new Resource_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, IEC61131Parser.RULE_resource_declaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 148;
			this.match(IEC61131Parser.T__8);
			this.state = 149;
			this.match(IEC61131Parser.ID);
			this.state = 150;
			this.match(IEC61131Parser.T__9);
			this.state = 151;
			this.match(IEC61131Parser.ID);
			this.state = 155;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === IEC61131Parser.T__11) {
				{
				{
				this.state = 152;
				this.task_configuration();
				}
				}
				this.state = 157;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 161;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === IEC61131Parser.T__2) {
				{
				{
				this.state = 158;
				this.program_configuration();
				}
				}
				this.state = 163;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 164;
			this.match(IEC61131Parser.T__10);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public task_configuration(): Task_configurationContext {
		let _localctx: Task_configurationContext = new Task_configurationContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, IEC61131Parser.RULE_task_configuration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 166;
			this.match(IEC61131Parser.T__11);
			this.state = 167;
			this.match(IEC61131Parser.ID);
			this.state = 168;
			this.match(IEC61131Parser.T__12);
			this.state = 169;
			this.match(IEC61131Parser.T__13);
			this.state = 170;
			this.match(IEC61131Parser.ASSIGN);
			this.state = 171;
			this.time_literal();
			this.state = 172;
			this.match(IEC61131Parser.T__14);
			this.state = 173;
			this.match(IEC61131Parser.T__15);
			this.state = 174;
			this.match(IEC61131Parser.ASSIGN);
			this.state = 175;
			this.match(IEC61131Parser.INT);
			this.state = 176;
			this.match(IEC61131Parser.T__16);
			this.state = 177;
			this.match(IEC61131Parser.T__17);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public program_configuration(): Program_configurationContext {
		let _localctx: Program_configurationContext = new Program_configurationContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, IEC61131Parser.RULE_program_configuration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 179;
			this.match(IEC61131Parser.T__2);
			this.state = 180;
			this.match(IEC61131Parser.ID);
			this.state = 183;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IEC61131Parser.T__18) {
				{
				this.state = 181;
				this.match(IEC61131Parser.T__18);
				this.state = 182;
				this.match(IEC61131Parser.ID);
				}
			}

			this.state = 185;
			this.match(IEC61131Parser.T__19);
			this.state = 186;
			this.match(IEC61131Parser.ID);
			this.state = 199;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IEC61131Parser.T__12) {
				{
				this.state = 187;
				this.match(IEC61131Parser.T__12);
				this.state = 196;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === IEC61131Parser.T__12 || ((((_la - 77)) & ~0x1F) === 0 && ((1 << (_la - 77)) & ((1 << (IEC61131Parser.T__76 - 77)) | (1 << (IEC61131Parser.T__77 - 77)) | (1 << (IEC61131Parser.PLUS - 77)) | (1 << (IEC61131Parser.MINUS - 77)) | (1 << (IEC61131Parser.NOT - 77)) | (1 << (IEC61131Parser.ID - 77)) | (1 << (IEC61131Parser.INT - 77)) | (1 << (IEC61131Parser.HEX_INT - 77)) | (1 << (IEC61131Parser.REAL_NUM - 77)) | (1 << (IEC61131Parser.STRING_LITERAL - 77)) | (1 << (IEC61131Parser.TIME_LITERAL - 77)))) !== 0)) {
					{
					this.state = 188;
					this.param_assignment();
					this.state = 193;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la === IEC61131Parser.T__14) {
						{
						{
						this.state = 189;
						this.match(IEC61131Parser.T__14);
						this.state = 190;
						this.param_assignment();
						}
						}
						this.state = 195;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
				}

				this.state = 198;
				this.match(IEC61131Parser.T__16);
				}
			}

			this.state = 201;
			this.match(IEC61131Parser.T__17);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public var_declarations(): Var_declarationsContext {
		let _localctx: Var_declarationsContext = new Var_declarationsContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, IEC61131Parser.RULE_var_declarations);
		let _la: number;
		try {
			this.state = 229;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case IEC61131Parser.T__20:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 203;
				this.match(IEC61131Parser.T__20);
				this.state = 204;
				this.var_decl_list();
				this.state = 205;
				this.match(IEC61131Parser.T__1);
				}
				break;
			case IEC61131Parser.T__21:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 207;
				this.match(IEC61131Parser.T__21);
				this.state = 208;
				this.var_decl_list();
				this.state = 209;
				this.match(IEC61131Parser.T__1);
				}
				break;
			case IEC61131Parser.T__22:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 211;
				this.match(IEC61131Parser.T__22);
				this.state = 212;
				this.var_decl_list();
				this.state = 213;
				this.match(IEC61131Parser.T__1);
				}
				break;
			case IEC61131Parser.T__23:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 215;
				this.match(IEC61131Parser.T__23);
				this.state = 217;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === IEC61131Parser.T__25) {
					{
					this.state = 216;
					this.constant_qualifier();
					}
				}

				this.state = 220;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === IEC61131Parser.T__26) {
					{
					this.state = 219;
					this.retain_qualifier();
					}
				}

				this.state = 222;
				this.var_decl_list();
				this.state = 223;
				this.match(IEC61131Parser.T__1);
				}
				break;
			case IEC61131Parser.T__24:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 225;
				this.match(IEC61131Parser.T__24);
				this.state = 226;
				this.var_decl_list();
				this.state = 227;
				this.match(IEC61131Parser.T__1);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public constant_qualifier(): Constant_qualifierContext {
		let _localctx: Constant_qualifierContext = new Constant_qualifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, IEC61131Parser.RULE_constant_qualifier);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 231;
			this.match(IEC61131Parser.T__25);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public retain_qualifier(): Retain_qualifierContext {
		let _localctx: Retain_qualifierContext = new Retain_qualifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, IEC61131Parser.RULE_retain_qualifier);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 233;
			this.match(IEC61131Parser.T__26);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public var_decl_list(): Var_decl_listContext {
		let _localctx: Var_decl_listContext = new Var_decl_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, IEC61131Parser.RULE_var_decl_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 238;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 235;
				this.var_decl();
				this.state = 236;
				this.match(IEC61131Parser.T__17);
				}
				}
				this.state = 240;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === IEC61131Parser.ID);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public var_decl(): Var_declContext {
		let _localctx: Var_declContext = new Var_declContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, IEC61131Parser.RULE_var_decl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 242;
			this.identifier_list();
			this.state = 245;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IEC61131Parser.AT) {
				{
				this.state = 243;
				this.match(IEC61131Parser.AT);
				this.state = 244;
				this.location();
				}
			}

			this.state = 247;
			this.match(IEC61131Parser.T__19);
			this.state = 248;
			this.data_type();
			this.state = 251;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IEC61131Parser.ASSIGN) {
				{
				this.state = 249;
				this.match(IEC61131Parser.ASSIGN);
				this.state = 250;
				this.expression(0);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public identifier_list(): Identifier_listContext {
		let _localctx: Identifier_listContext = new Identifier_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, IEC61131Parser.RULE_identifier_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 253;
			this.match(IEC61131Parser.ID);
			this.state = 258;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === IEC61131Parser.T__14) {
				{
				{
				this.state = 254;
				this.match(IEC61131Parser.T__14);
				this.state = 255;
				this.match(IEC61131Parser.ID);
				}
				}
				this.state = 260;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public location(): LocationContext {
		let _localctx: LocationContext = new LocationContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, IEC61131Parser.RULE_location);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 261;
			this.match(IEC61131Parser.T__27);
			this.state = 265;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === IEC61131Parser.ID || _la === IEC61131Parser.INT) {
				{
				{
				this.state = 262;
				_la = this._input.LA(1);
				if (!(_la === IEC61131Parser.ID || _la === IEC61131Parser.INT)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
				}
				this.state = 267;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public data_type(): Data_typeContext {
		let _localctx: Data_typeContext = new Data_typeContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, IEC61131Parser.RULE_data_type);
		try {
			this.state = 271;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case IEC61131Parser.T__28:
			case IEC61131Parser.T__29:
			case IEC61131Parser.T__30:
			case IEC61131Parser.T__31:
			case IEC61131Parser.T__32:
			case IEC61131Parser.T__33:
			case IEC61131Parser.T__34:
			case IEC61131Parser.T__35:
			case IEC61131Parser.T__36:
			case IEC61131Parser.T__37:
			case IEC61131Parser.T__38:
			case IEC61131Parser.T__39:
			case IEC61131Parser.T__40:
			case IEC61131Parser.T__41:
			case IEC61131Parser.T__42:
			case IEC61131Parser.T__43:
			case IEC61131Parser.T__44:
			case IEC61131Parser.T__45:
			case IEC61131Parser.T__46:
			case IEC61131Parser.T__47:
			case IEC61131Parser.T__48:
			case IEC61131Parser.T__49:
			case IEC61131Parser.T__50:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 268;
				this.elementary_data_type();
				}
				break;
			case IEC61131Parser.ID:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 269;
				this.derived_data_type();
				}
				break;
			case IEC61131Parser.T__51:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 270;
				this.array_data_type();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public elementary_data_type(): Elementary_data_typeContext {
		let _localctx: Elementary_data_typeContext = new Elementary_data_typeContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, IEC61131Parser.RULE_elementary_data_type);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 273;
			_la = this._input.LA(1);
			if (!(((((_la - 29)) & ~0x1F) === 0 && ((1 << (_la - 29)) & ((1 << (IEC61131Parser.T__28 - 29)) | (1 << (IEC61131Parser.T__29 - 29)) | (1 << (IEC61131Parser.T__30 - 29)) | (1 << (IEC61131Parser.T__31 - 29)) | (1 << (IEC61131Parser.T__32 - 29)) | (1 << (IEC61131Parser.T__33 - 29)) | (1 << (IEC61131Parser.T__34 - 29)) | (1 << (IEC61131Parser.T__35 - 29)) | (1 << (IEC61131Parser.T__36 - 29)) | (1 << (IEC61131Parser.T__37 - 29)) | (1 << (IEC61131Parser.T__38 - 29)) | (1 << (IEC61131Parser.T__39 - 29)) | (1 << (IEC61131Parser.T__40 - 29)) | (1 << (IEC61131Parser.T__41 - 29)) | (1 << (IEC61131Parser.T__42 - 29)) | (1 << (IEC61131Parser.T__43 - 29)) | (1 << (IEC61131Parser.T__44 - 29)) | (1 << (IEC61131Parser.T__45 - 29)) | (1 << (IEC61131Parser.T__46 - 29)) | (1 << (IEC61131Parser.T__47 - 29)) | (1 << (IEC61131Parser.T__48 - 29)) | (1 << (IEC61131Parser.T__49 - 29)) | (1 << (IEC61131Parser.T__50 - 29)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public derived_data_type(): Derived_data_typeContext {
		let _localctx: Derived_data_typeContext = new Derived_data_typeContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, IEC61131Parser.RULE_derived_data_type);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 275;
			this.match(IEC61131Parser.ID);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public array_data_type(): Array_data_typeContext {
		let _localctx: Array_data_typeContext = new Array_data_typeContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, IEC61131Parser.RULE_array_data_type);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 277;
			this.match(IEC61131Parser.T__51);
			this.state = 278;
			this.match(IEC61131Parser.T__52);
			this.state = 279;
			this.subrange();
			this.state = 284;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === IEC61131Parser.T__14) {
				{
				{
				this.state = 280;
				this.match(IEC61131Parser.T__14);
				this.state = 281;
				this.subrange();
				}
				}
				this.state = 286;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 287;
			this.match(IEC61131Parser.T__53);
			this.state = 288;
			this.match(IEC61131Parser.T__54);
			this.state = 289;
			this.data_type();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public subrange(): SubrangeContext {
		let _localctx: SubrangeContext = new SubrangeContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, IEC61131Parser.RULE_subrange);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 292;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 23, this._ctx) ) {
			case 1:
				{
				this.state = 291;
				_la = this._input.LA(1);
				if (!(_la === IEC61131Parser.MINUS || _la === IEC61131Parser.INT)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
				break;
			}
			this.state = 294;
			this.match(IEC61131Parser.INT);
			this.state = 295;
			this.match(IEC61131Parser.T__55);
			this.state = 297;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 24, this._ctx) ) {
			case 1:
				{
				this.state = 296;
				_la = this._input.LA(1);
				if (!(_la === IEC61131Parser.MINUS || _la === IEC61131Parser.INT)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
				break;
			}
			this.state = 299;
			this.match(IEC61131Parser.INT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public body(): BodyContext {
		let _localctx: BodyContext = new BodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, IEC61131Parser.RULE_body);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 301;
			this.statement_list();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public statement_list(): Statement_listContext {
		let _localctx: Statement_listContext = new Statement_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, IEC61131Parser.RULE_statement_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 308;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & ((1 << (IEC61131Parser.T__56 - 57)) | (1 << (IEC61131Parser.T__58 - 57)) | (1 << (IEC61131Parser.T__63 - 57)) | (1 << (IEC61131Parser.T__65 - 57)) | (1 << (IEC61131Parser.T__70 - 57)) | (1 << (IEC61131Parser.T__72 - 57)))) !== 0) || _la === IEC61131Parser.ID) {
				{
				{
				this.state = 303;
				this.statement();
				this.state = 304;
				this.match(IEC61131Parser.T__17);
				}
				}
				this.state = 310;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public statement(): StatementContext {
		let _localctx: StatementContext = new StatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, IEC61131Parser.RULE_statement);
		try {
			this.state = 315;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 26, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 311;
				this.assignment_statement();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 312;
				this.subprogram_control_statement();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 313;
				this.selection_statement();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 314;
				this.iteration_statement();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public assignment_statement(): Assignment_statementContext {
		let _localctx: Assignment_statementContext = new Assignment_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, IEC61131Parser.RULE_assignment_statement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 317;
			this.variable();
			this.state = 318;
			this.match(IEC61131Parser.ASSIGN);
			this.state = 319;
			this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public subprogram_control_statement(): Subprogram_control_statementContext {
		let _localctx: Subprogram_control_statementContext = new Subprogram_control_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, IEC61131Parser.RULE_subprogram_control_statement);
		try {
			this.state = 323;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case IEC61131Parser.ID:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 321;
				this.fb_call();
				}
				break;
			case IEC61131Parser.T__56:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 322;
				this.match(IEC61131Parser.T__56);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public fb_call(): Fb_callContext {
		let _localctx: Fb_callContext = new Fb_callContext(this._ctx, this.state);
		this.enterRule(_localctx, 52, IEC61131Parser.RULE_fb_call);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 325;
			this.match(IEC61131Parser.ID);
			this.state = 326;
			this.match(IEC61131Parser.T__12);
			this.state = 335;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IEC61131Parser.T__12 || ((((_la - 77)) & ~0x1F) === 0 && ((1 << (_la - 77)) & ((1 << (IEC61131Parser.T__76 - 77)) | (1 << (IEC61131Parser.T__77 - 77)) | (1 << (IEC61131Parser.PLUS - 77)) | (1 << (IEC61131Parser.MINUS - 77)) | (1 << (IEC61131Parser.NOT - 77)) | (1 << (IEC61131Parser.ID - 77)) | (1 << (IEC61131Parser.INT - 77)) | (1 << (IEC61131Parser.HEX_INT - 77)) | (1 << (IEC61131Parser.REAL_NUM - 77)) | (1 << (IEC61131Parser.STRING_LITERAL - 77)) | (1 << (IEC61131Parser.TIME_LITERAL - 77)))) !== 0)) {
				{
				this.state = 327;
				this.param_assignment();
				this.state = 332;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === IEC61131Parser.T__14) {
					{
					{
					this.state = 328;
					this.match(IEC61131Parser.T__14);
					this.state = 329;
					this.param_assignment();
					}
					}
					this.state = 334;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 337;
			this.match(IEC61131Parser.T__16);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public param_assignment(): Param_assignmentContext {
		let _localctx: Param_assignmentContext = new Param_assignmentContext(this._ctx, this.state);
		this.enterRule(_localctx, 54, IEC61131Parser.RULE_param_assignment);
		try {
			this.state = 346;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 30, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				{
				this.state = 339;
				this.match(IEC61131Parser.ID);
				this.state = 340;
				this.match(IEC61131Parser.ASSIGN);
				this.state = 341;
				this.expression(0);
				}
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				{
				this.state = 342;
				this.match(IEC61131Parser.ID);
				this.state = 343;
				this.match(IEC61131Parser.T__57);
				this.state = 344;
				this.variable();
				}
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 345;
				this.expression(0);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public selection_statement(): Selection_statementContext {
		let _localctx: Selection_statementContext = new Selection_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 56, IEC61131Parser.RULE_selection_statement);
		try {
			this.state = 350;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case IEC61131Parser.T__58:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 348;
				this.if_statement();
				}
				break;
			case IEC61131Parser.T__63:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 349;
				this.case_statement();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public if_statement(): If_statementContext {
		let _localctx: If_statementContext = new If_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 58, IEC61131Parser.RULE_if_statement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 352;
			this.match(IEC61131Parser.T__58);
			this.state = 353;
			this.expression(0);
			this.state = 354;
			this.match(IEC61131Parser.T__59);
			this.state = 355;
			this.statement_list();
			this.state = 363;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === IEC61131Parser.T__60) {
				{
				{
				this.state = 356;
				this.match(IEC61131Parser.T__60);
				this.state = 357;
				this.expression(0);
				this.state = 358;
				this.match(IEC61131Parser.T__59);
				this.state = 359;
				this.statement_list();
				}
				}
				this.state = 365;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 368;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IEC61131Parser.T__61) {
				{
				this.state = 366;
				this.match(IEC61131Parser.T__61);
				this.state = 367;
				this.statement_list();
				}
			}

			this.state = 370;
			this.match(IEC61131Parser.T__62);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public case_statement(): Case_statementContext {
		let _localctx: Case_statementContext = new Case_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 60, IEC61131Parser.RULE_case_statement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 372;
			this.match(IEC61131Parser.T__63);
			this.state = 373;
			this.expression(0);
			this.state = 374;
			this.match(IEC61131Parser.T__54);
			this.state = 376;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 375;
				this.case_element();
				}
				}
				this.state = 378;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === IEC61131Parser.MINUS || _la === IEC61131Parser.INT);
			this.state = 382;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IEC61131Parser.T__61) {
				{
				this.state = 380;
				this.match(IEC61131Parser.T__61);
				this.state = 381;
				this.statement_list();
				}
			}

			this.state = 384;
			this.match(IEC61131Parser.T__64);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public case_element(): Case_elementContext {
		let _localctx: Case_elementContext = new Case_elementContext(this._ctx, this.state);
		this.enterRule(_localctx, 62, IEC61131Parser.RULE_case_element);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 386;
			this.case_list();
			this.state = 387;
			this.match(IEC61131Parser.T__19);
			this.state = 388;
			this.statement_list();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public case_list(): Case_listContext {
		let _localctx: Case_listContext = new Case_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 64, IEC61131Parser.RULE_case_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 390;
			this.case_list_element();
			this.state = 395;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === IEC61131Parser.T__14) {
				{
				{
				this.state = 391;
				this.match(IEC61131Parser.T__14);
				this.state = 392;
				this.case_list_element();
				}
				}
				this.state = 397;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public case_list_element(): Case_list_elementContext {
		let _localctx: Case_list_elementContext = new Case_list_elementContext(this._ctx, this.state);
		this.enterRule(_localctx, 66, IEC61131Parser.RULE_case_list_element);
		try {
			this.state = 400;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 37, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 398;
				this.subrange();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 399;
				this.match(IEC61131Parser.INT);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public iteration_statement(): Iteration_statementContext {
		let _localctx: Iteration_statementContext = new Iteration_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 68, IEC61131Parser.RULE_iteration_statement);
		try {
			this.state = 405;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case IEC61131Parser.T__65:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 402;
				this.for_statement();
				}
				break;
			case IEC61131Parser.T__70:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 403;
				this.while_statement();
				}
				break;
			case IEC61131Parser.T__72:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 404;
				this.repeat_statement();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public for_statement(): For_statementContext {
		let _localctx: For_statementContext = new For_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 70, IEC61131Parser.RULE_for_statement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 407;
			this.match(IEC61131Parser.T__65);
			this.state = 408;
			this.match(IEC61131Parser.ID);
			this.state = 409;
			this.match(IEC61131Parser.ASSIGN);
			this.state = 410;
			this.expression(0);
			this.state = 411;
			this.match(IEC61131Parser.T__66);
			this.state = 412;
			this.expression(0);
			this.state = 415;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IEC61131Parser.T__67) {
				{
				this.state = 413;
				this.match(IEC61131Parser.T__67);
				this.state = 414;
				this.expression(0);
				}
			}

			this.state = 417;
			this.match(IEC61131Parser.T__68);
			this.state = 418;
			this.statement_list();
			this.state = 419;
			this.match(IEC61131Parser.T__69);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public while_statement(): While_statementContext {
		let _localctx: While_statementContext = new While_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 72, IEC61131Parser.RULE_while_statement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 421;
			this.match(IEC61131Parser.T__70);
			this.state = 422;
			this.expression(0);
			this.state = 423;
			this.match(IEC61131Parser.T__68);
			this.state = 424;
			this.statement_list();
			this.state = 425;
			this.match(IEC61131Parser.T__71);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public repeat_statement(): Repeat_statementContext {
		let _localctx: Repeat_statementContext = new Repeat_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 74, IEC61131Parser.RULE_repeat_statement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 427;
			this.match(IEC61131Parser.T__72);
			this.state = 428;
			this.statement_list();
			this.state = 429;
			this.match(IEC61131Parser.T__73);
			this.state = 430;
			this.expression(0);
			this.state = 431;
			this.match(IEC61131Parser.T__74);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public expression(): ExpressionContext;
	public expression(_p: number): ExpressionContext;
	// @RuleVersion(0)
	public expression(_p?: number): ExpressionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, _parentState);
		let _prevctx: ExpressionContext = _localctx;
		let _startState: number = 76;
		this.enterRecursionRule(_localctx, 76, IEC61131Parser.RULE_expression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 439;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 40, this._ctx) ) {
			case 1:
				{
				_localctx = new NotExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 434;
				this.match(IEC61131Parser.NOT);
				this.state = 435;
				this.expression(8);
				}
				break;

			case 2:
				{
				_localctx = new UnaryExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 436;
				_la = this._input.LA(1);
				if (!(_la === IEC61131Parser.PLUS || _la === IEC61131Parser.MINUS)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 437;
				this.expression(2);
				}
				break;

			case 3:
				{
				_localctx = new AtomExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 438;
				this.atom();
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 467;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 42, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 465;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 41, this._ctx) ) {
					case 1:
						{
						_localctx = new OrExprContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, IEC61131Parser.RULE_expression);
						this.state = 441;
						if (!(this.precpred(this._ctx, 11))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 11)");
						}
						this.state = 442;
						this.match(IEC61131Parser.OR);
						this.state = 443;
						this.expression(12);
						}
						break;

					case 2:
						{
						_localctx = new XorExprContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, IEC61131Parser.RULE_expression);
						this.state = 444;
						if (!(this.precpred(this._ctx, 10))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 10)");
						}
						this.state = 445;
						this.match(IEC61131Parser.XOR);
						this.state = 446;
						this.expression(11);
						}
						break;

					case 3:
						{
						_localctx = new AndExprContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, IEC61131Parser.RULE_expression);
						this.state = 447;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 448;
						this.match(IEC61131Parser.AND);
						this.state = 449;
						this.expression(10);
						}
						break;

					case 4:
						{
						_localctx = new EqualityExprContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, IEC61131Parser.RULE_expression);
						this.state = 450;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 451;
						_la = this._input.LA(1);
						if (!(_la === IEC61131Parser.EQ || _la === IEC61131Parser.NE)) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 452;
						this.expression(8);
						}
						break;

					case 5:
						{
						_localctx = new RelationalExprContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, IEC61131Parser.RULE_expression);
						this.state = 453;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 454;
						_la = this._input.LA(1);
						if (!(((((_la - 82)) & ~0x1F) === 0 && ((1 << (_la - 82)) & ((1 << (IEC61131Parser.LT - 82)) | (1 << (IEC61131Parser.GT - 82)) | (1 << (IEC61131Parser.LE - 82)) | (1 << (IEC61131Parser.GE - 82)))) !== 0))) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 455;
						this.expression(7);
						}
						break;

					case 6:
						{
						_localctx = new AdditiveExprContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, IEC61131Parser.RULE_expression);
						this.state = 456;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 457;
						_la = this._input.LA(1);
						if (!(_la === IEC61131Parser.PLUS || _la === IEC61131Parser.MINUS)) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 458;
						this.expression(6);
						}
						break;

					case 7:
						{
						_localctx = new MultiplicativeExprContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, IEC61131Parser.RULE_expression);
						this.state = 459;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 460;
						_la = this._input.LA(1);
						if (!(((((_la - 88)) & ~0x1F) === 0 && ((1 << (_la - 88)) & ((1 << (IEC61131Parser.MULT - 88)) | (1 << (IEC61131Parser.DIV - 88)) | (1 << (IEC61131Parser.MOD - 88)))) !== 0))) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 461;
						this.expression(5);
						}
						break;

					case 8:
						{
						_localctx = new PowerExprContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, IEC61131Parser.RULE_expression);
						this.state = 462;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 463;
						this.match(IEC61131Parser.POWER);
						this.state = 464;
						this.expression(4);
						}
						break;
					}
					}
				}
				this.state = 469;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 42, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public atom(): AtomContext {
		let _localctx: AtomContext = new AtomContext(this._ctx, this.state);
		this.enterRule(_localctx, 78, IEC61131Parser.RULE_atom);
		try {
			this.state = 477;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 43, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 470;
				this.constant();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 471;
				this.variable();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 472;
				this.match(IEC61131Parser.T__12);
				this.state = 473;
				this.expression(0);
				this.state = 474;
				this.match(IEC61131Parser.T__16);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 476;
				this.function_call();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public function_call(): Function_callContext {
		let _localctx: Function_callContext = new Function_callContext(this._ctx, this.state);
		this.enterRule(_localctx, 80, IEC61131Parser.RULE_function_call);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 479;
			this.match(IEC61131Parser.ID);
			this.state = 480;
			this.match(IEC61131Parser.T__12);
			this.state = 489;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IEC61131Parser.T__12 || ((((_la - 77)) & ~0x1F) === 0 && ((1 << (_la - 77)) & ((1 << (IEC61131Parser.T__76 - 77)) | (1 << (IEC61131Parser.T__77 - 77)) | (1 << (IEC61131Parser.PLUS - 77)) | (1 << (IEC61131Parser.MINUS - 77)) | (1 << (IEC61131Parser.NOT - 77)) | (1 << (IEC61131Parser.ID - 77)) | (1 << (IEC61131Parser.INT - 77)) | (1 << (IEC61131Parser.HEX_INT - 77)) | (1 << (IEC61131Parser.REAL_NUM - 77)) | (1 << (IEC61131Parser.STRING_LITERAL - 77)) | (1 << (IEC61131Parser.TIME_LITERAL - 77)))) !== 0)) {
				{
				this.state = 481;
				this.param_assignment();
				this.state = 486;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === IEC61131Parser.T__14) {
					{
					{
					this.state = 482;
					this.match(IEC61131Parser.T__14);
					this.state = 483;
					this.param_assignment();
					}
					}
					this.state = 488;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 491;
			this.match(IEC61131Parser.T__16);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public variable(): VariableContext {
		let _localctx: VariableContext = new VariableContext(this._ctx, this.state);
		this.enterRule(_localctx, 82, IEC61131Parser.RULE_variable);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 493;
			this.match(IEC61131Parser.ID);
			this.state = 498;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 46, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 494;
					this.match(IEC61131Parser.T__75);
					this.state = 495;
					this.match(IEC61131Parser.ID);
					}
					}
				}
				this.state = 500;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 46, this._ctx);
			}
			this.state = 512;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 48, this._ctx) ) {
			case 1:
				{
				this.state = 501;
				this.match(IEC61131Parser.T__52);
				this.state = 502;
				this.expression(0);
				this.state = 507;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === IEC61131Parser.T__14) {
					{
					{
					this.state = 503;
					this.match(IEC61131Parser.T__14);
					this.state = 504;
					this.expression(0);
					}
					}
					this.state = 509;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 510;
				this.match(IEC61131Parser.T__53);
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public constant(): ConstantContext {
		let _localctx: ConstantContext = new ConstantContext(this._ctx, this.state);
		this.enterRule(_localctx, 84, IEC61131Parser.RULE_constant);
		try {
			this.state = 518;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case IEC61131Parser.MINUS:
			case IEC61131Parser.INT:
			case IEC61131Parser.HEX_INT:
			case IEC61131Parser.REAL_NUM:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 514;
				this.numeric_literal();
				}
				break;
			case IEC61131Parser.STRING_LITERAL:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 515;
				this.string_literal();
				}
				break;
			case IEC61131Parser.TIME_LITERAL:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 516;
				this.time_literal();
				}
				break;
			case IEC61131Parser.T__76:
			case IEC61131Parser.T__77:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 517;
				this.boolean_literal();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public numeric_literal(): Numeric_literalContext {
		let _localctx: Numeric_literalContext = new Numeric_literalContext(this._ctx, this.state);
		this.enterRule(_localctx, 86, IEC61131Parser.RULE_numeric_literal);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 521;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IEC61131Parser.MINUS) {
				{
				this.state = 520;
				this.match(IEC61131Parser.MINUS);
				}
			}

			this.state = 523;
			_la = this._input.LA(1);
			if (!(((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & ((1 << (IEC61131Parser.INT - 98)) | (1 << (IEC61131Parser.HEX_INT - 98)) | (1 << (IEC61131Parser.REAL_NUM - 98)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public boolean_literal(): Boolean_literalContext {
		let _localctx: Boolean_literalContext = new Boolean_literalContext(this._ctx, this.state);
		this.enterRule(_localctx, 88, IEC61131Parser.RULE_boolean_literal);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 525;
			_la = this._input.LA(1);
			if (!(_la === IEC61131Parser.T__76 || _la === IEC61131Parser.T__77)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public string_literal(): String_literalContext {
		let _localctx: String_literalContext = new String_literalContext(this._ctx, this.state);
		this.enterRule(_localctx, 90, IEC61131Parser.RULE_string_literal);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 527;
			this.match(IEC61131Parser.STRING_LITERAL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public time_literal(): Time_literalContext {
		let _localctx: Time_literalContext = new Time_literalContext(this._ctx, this.state);
		this.enterRule(_localctx, 92, IEC61131Parser.RULE_time_literal);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 529;
			this.match(IEC61131Parser.TIME_LITERAL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 38:
			return this.expression_sempred(_localctx as ExpressionContext, predIndex);
		}
		return true;
	}
	private expression_sempred(_localctx: ExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 11);

		case 1:
			return this.precpred(this._ctx, 10);

		case 2:
			return this.precpred(this._ctx, 9);

		case 3:
			return this.precpred(this._ctx, 7);

		case 4:
			return this.precpred(this._ctx, 6);

		case 5:
			return this.precpred(this._ctx, 5);

		case 6:
			return this.precpred(this._ctx, 4);

		case 7:
			return this.precpred(this._ctx, 3);
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03k\u0216\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04" +
		"\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04#" +
		"\t#\x04$\t$\x04%\t%\x04&\t&\x04\'\t\'\x04(\t(\x04)\t)\x04*\t*\x04+\t+" +
		"\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x03\x02\x06\x02b\n\x02\r\x02" +
		"\x0E\x02c\x03\x02\x03\x02\x03\x03\x03\x03\x03\x03\x03\x03\x05\x03l\n\x03" +
		"\x03\x04\x03\x04\x05\x04p\n\x04\x03\x04\x05\x04s\n\x04\x03\x04\x03\x04" +
		"\x03\x04\x03\x05\x03\x05\x03\x05\x07\x05{\n\x05\f\x05\x0E\x05~\v\x05\x03" +
		"\x05\x03\x05\x03\x05\x03\x06\x03\x06\x03\x06\x07\x06\x86\n\x06\f\x06\x0E" +
		"\x06\x89\v\x06\x03\x06\x03\x06\x03\x06\x03\x07\x03\x07\x03\x07\x06\x07" +
		"\x91\n\x07\r\x07\x0E\x07\x92\x03\x07\x03\x07\x03\b\x03\b\x03\b\x03\b\x03" +
		"\b\x07\b\x9C\n\b\f\b\x0E\b\x9F\v\b\x03\b\x07\b\xA2\n\b\f\b\x0E\b\xA5\v" +
		"\b\x03\b\x03\b\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03" +
		"\t\x03\t\x03\t\x03\t\x03\n\x03\n\x03\n\x03\n\x05\n\xBA\n\n\x03\n\x03\n" +
		"\x03\n\x03\n\x03\n\x03\n\x07\n\xC2\n\n\f\n\x0E\n\xC5\v\n\x05\n\xC7\n\n" +
		"\x03\n\x05\n\xCA\n\n\x03\n\x03\n\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03" +
		"\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x05\v\xDC\n\v\x03\v\x05\v" +
		"\xDF\n\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x05\v\xE8\n\v\x03\f" +
		"\x03\f\x03\r\x03\r\x03\x0E\x03\x0E\x03\x0E\x06\x0E\xF1\n\x0E\r\x0E\x0E" +
		"\x0E\xF2\x03\x0F\x03\x0F\x03\x0F\x05\x0F\xF8\n\x0F\x03\x0F\x03\x0F\x03" +
		"\x0F\x03\x0F\x05\x0F\xFE\n\x0F\x03\x10\x03\x10\x03\x10\x07\x10\u0103\n" +
		"\x10\f\x10\x0E\x10\u0106\v\x10\x03\x11\x03\x11\x07\x11\u010A\n\x11\f\x11" +
		"\x0E\x11\u010D\v\x11\x03\x12\x03\x12\x03\x12\x05\x12\u0112\n\x12\x03\x13" +
		"\x03\x13\x03\x14\x03\x14\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x07\x15" +
		"\u011D\n\x15\f\x15\x0E\x15\u0120\v\x15\x03\x15\x03\x15\x03\x15\x03\x15" +
		"\x03\x16\x05\x16\u0127\n\x16\x03\x16\x03\x16\x03\x16\x05\x16\u012C\n\x16" +
		"\x03\x16\x03\x16\x03\x17\x03\x17\x03\x18\x03\x18\x03\x18\x07\x18\u0135" +
		"\n\x18\f\x18\x0E\x18\u0138\v\x18\x03\x19\x03\x19\x03\x19\x03\x19\x05\x19" +
		"\u013E\n\x19\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1B\x03\x1B\x05\x1B\u0146" +
		"\n\x1B\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x07\x1C\u014D\n\x1C\f\x1C" +
		"\x0E\x1C\u0150\v\x1C\x05\x1C\u0152\n\x1C\x03\x1C\x03\x1C\x03\x1D\x03\x1D" +
		"\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x05\x1D\u015D\n\x1D\x03\x1E\x03" +
		"\x1E\x05\x1E\u0161\n\x1E\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F" +
		"\x03\x1F\x03\x1F\x03\x1F\x07\x1F\u016C\n\x1F\f\x1F\x0E\x1F\u016F\v\x1F" +
		"\x03\x1F\x03\x1F\x05\x1F\u0173\n\x1F\x03\x1F\x03\x1F\x03 \x03 \x03 \x03" +
		" \x06 \u017B\n \r \x0E \u017C\x03 \x03 \x05 \u0181\n \x03 \x03 \x03!\x03" +
		"!\x03!\x03!\x03\"\x03\"\x03\"\x07\"\u018C\n\"\f\"\x0E\"\u018F\v\"\x03" +
		"#\x03#\x05#\u0193\n#\x03$\x03$\x03$\x05$\u0198\n$\x03%\x03%\x03%\x03%" +
		"\x03%\x03%\x03%\x03%\x05%\u01A2\n%\x03%\x03%\x03%\x03%\x03&\x03&\x03&" +
		"\x03&\x03&\x03&\x03\'\x03\'\x03\'\x03\'\x03\'\x03\'\x03(\x03(\x03(\x03" +
		"(\x03(\x03(\x05(\u01BA\n(\x03(\x03(\x03(\x03(\x03(\x03(\x03(\x03(\x03" +
		"(\x03(\x03(\x03(\x03(\x03(\x03(\x03(\x03(\x03(\x03(\x03(\x03(\x03(\x03" +
		"(\x03(\x07(\u01D4\n(\f(\x0E(\u01D7\v(\x03)\x03)\x03)\x03)\x03)\x03)\x03" +
		")\x05)\u01E0\n)\x03*\x03*\x03*\x03*\x03*\x07*\u01E7\n*\f*\x0E*\u01EA\v" +
		"*\x05*\u01EC\n*\x03*\x03*\x03+\x03+\x03+\x07+\u01F3\n+\f+\x0E+\u01F6\v" +
		"+\x03+\x03+\x03+\x03+\x07+\u01FC\n+\f+\x0E+\u01FF\v+\x03+\x03+\x05+\u0203" +
		"\n+\x03,\x03,\x03,\x03,\x05,\u0209\n,\x03-\x05-\u020C\n-\x03-\x03-\x03" +
		".\x03.\x03/\x03/\x030\x030\x030\x02\x02\x03N1\x02\x02\x04\x02\x06\x02" +
		"\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A" +
		"\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x022\x02" +
		"4\x026\x028\x02:\x02<\x02>\x02@\x02B\x02D\x02F\x02H\x02J\x02L\x02N\x02" +
		"P\x02R\x02T\x02V\x02X\x02Z\x02\\\x02^\x02\x02\v\x03\x02cd\x03\x02\x1F" +
		"5\x04\x02YYdd\x03\x02XY\x03\x02RS\x03\x02TW\x03\x02Z\\\x03\x02df\x03\x02" +
		"OP\x02\u022E\x02a\x03\x02\x02\x02\x04k\x03\x02\x02\x02\x06m\x03\x02\x02" +
		"\x02\bw\x03\x02\x02\x02\n\x82\x03\x02\x02\x02\f\x8D\x03\x02\x02\x02\x0E" +
		"\x96\x03\x02\x02\x02\x10\xA8\x03\x02\x02\x02\x12\xB5\x03\x02\x02\x02\x14" +
		"\xE7\x03\x02\x02\x02\x16\xE9\x03\x02\x02\x02\x18\xEB\x03\x02\x02\x02\x1A" +
		"\xF0\x03\x02\x02\x02\x1C\xF4\x03\x02\x02\x02\x1E\xFF\x03\x02\x02\x02 " +
		"\u0107\x03\x02\x02\x02\"\u0111\x03\x02\x02\x02$\u0113\x03\x02\x02\x02" +
		"&\u0115\x03\x02\x02\x02(\u0117\x03\x02\x02\x02*\u0126\x03\x02\x02\x02" +
		",\u012F\x03\x02\x02\x02.\u0136\x03\x02\x02\x020\u013D\x03\x02\x02\x02" +
		"2\u013F\x03\x02\x02\x024\u0145\x03\x02\x02\x026\u0147\x03\x02\x02\x02" +
		"8\u015C\x03\x02\x02\x02:\u0160\x03\x02\x02\x02<\u0162\x03\x02\x02\x02" +
		">\u0176\x03\x02\x02\x02@\u0184\x03\x02\x02\x02B\u0188\x03\x02\x02\x02" +
		"D\u0192\x03\x02\x02\x02F\u0197\x03\x02\x02\x02H\u0199\x03\x02\x02\x02" +
		"J\u01A7\x03\x02\x02\x02L\u01AD\x03\x02\x02\x02N\u01B9\x03\x02\x02\x02" +
		"P\u01DF\x03\x02\x02\x02R\u01E1\x03\x02\x02\x02T\u01EF\x03\x02\x02\x02" +
		"V\u0208\x03\x02\x02\x02X\u020B\x03\x02\x02\x02Z\u020F\x03\x02\x02\x02" +
		"\\\u0211\x03\x02\x02\x02^\u0213\x03\x02\x02\x02`b\x05\x04\x03\x02a`\x03" +
		"\x02\x02\x02bc\x03\x02\x02\x02ca\x03\x02\x02\x02cd\x03\x02\x02\x02de\x03" +
		"\x02\x02\x02ef\x07\x02\x02\x03f\x03\x03\x02\x02\x02gl\x05\n\x06\x02hl" +
		"\x05\b\x05\x02il\x05\f\x07\x02jl\x05\x06\x04\x02kg\x03\x02\x02\x02kh\x03" +
		"\x02\x02\x02ki\x03\x02\x02\x02kj\x03\x02\x02\x02l\x05\x03\x02\x02\x02" +
		"mo\x07\x03\x02\x02np\x05\x16\f\x02on\x03\x02\x02\x02op\x03\x02\x02\x02" +
		"pr\x03\x02\x02\x02qs\x05\x18\r\x02rq\x03\x02\x02\x02rs\x03\x02\x02\x02" +
		"st\x03\x02\x02\x02tu\x05\x1A\x0E\x02uv\x07\x04\x02\x02v\x07\x03\x02\x02" +
		"\x02wx\x07\x05\x02\x02x|\x07c\x02\x02y{\x05\x14\v\x02zy\x03\x02\x02\x02" +
		"{~\x03\x02\x02\x02|z\x03\x02\x02\x02|}\x03\x02\x02\x02}\x7F\x03\x02\x02" +
		"\x02~|\x03\x02\x02\x02\x7F\x80\x05,\x17\x02\x80\x81\x07\x06\x02\x02\x81" +
		"\t\x03\x02\x02\x02\x82\x83\x07\x07\x02\x02\x83\x87\x07c\x02\x02\x84\x86" +
		"\x05\x14\v\x02\x85\x84\x03\x02\x02\x02\x86\x89\x03\x02\x02\x02\x87\x85" +
		"\x03\x02\x02\x02\x87\x88\x03\x02\x02\x02\x88\x8A\x03\x02\x02\x02\x89\x87" +
		"\x03\x02\x02\x02\x8A\x8B\x05,\x17\x02\x8B\x8C\x07\b\x02\x02\x8C\v\x03" +
		"\x02\x02\x02\x8D\x8E\x07\t\x02\x02\x8E\x90\x07c\x02\x02\x8F\x91\x05\x0E" +
		"\b\x02\x90\x8F\x03\x02\x02\x02\x91\x92\x03\x02\x02\x02\x92\x90\x03\x02" +
		"\x02\x02\x92\x93\x03\x02\x02\x02\x93\x94\x03\x02\x02\x02\x94\x95\x07\n" +
		"\x02\x02\x95\r\x03\x02\x02\x02\x96\x97\x07\v\x02\x02\x97\x98\x07c\x02" +
		"\x02\x98\x99\x07\f\x02\x02\x99\x9D\x07c\x02\x02\x9A\x9C\x05\x10\t\x02" +
		"\x9B\x9A\x03\x02\x02\x02\x9C\x9F\x03\x02\x02\x02\x9D\x9B\x03\x02\x02\x02" +
		"\x9D\x9E\x03\x02\x02\x02\x9E\xA3\x03\x02\x02\x02\x9F\x9D\x03\x02\x02\x02" +
		"\xA0\xA2\x05\x12\n\x02\xA1\xA0\x03\x02\x02\x02\xA2\xA5\x03\x02\x02\x02" +
		"\xA3\xA1\x03\x02\x02\x02\xA3\xA4\x03\x02\x02\x02\xA4\xA6\x03\x02\x02\x02" +
		"\xA5\xA3\x03\x02\x02\x02\xA6\xA7\x07\r\x02\x02\xA7\x0F\x03\x02\x02\x02" +
		"\xA8\xA9\x07\x0E\x02\x02\xA9\xAA\x07c\x02\x02\xAA\xAB\x07\x0F\x02\x02" +
		"\xAB\xAC\x07\x10\x02\x02\xAC\xAD\x07Q\x02\x02\xAD\xAE\x05^0\x02\xAE\xAF" +
		"\x07\x11\x02\x02\xAF\xB0\x07\x12\x02\x02\xB0\xB1\x07Q\x02\x02\xB1\xB2" +
		"\x07d\x02\x02\xB2\xB3\x07\x13\x02\x02\xB3\xB4\x07\x14\x02\x02\xB4\x11" +
		"\x03\x02\x02\x02\xB5\xB6\x07\x05\x02\x02\xB6\xB9\x07c\x02\x02\xB7\xB8" +
		"\x07\x15\x02\x02\xB8\xBA\x07c\x02\x02\xB9\xB7\x03\x02\x02\x02\xB9\xBA" +
		"\x03\x02\x02\x02\xBA\xBB\x03\x02\x02\x02\xBB\xBC\x07\x16\x02\x02\xBC\xC9" +
		"\x07c\x02\x02\xBD\xC6\x07\x0F\x02\x02\xBE\xC3\x058\x1D\x02\xBF\xC0\x07" +
		"\x11\x02\x02\xC0\xC2\x058\x1D\x02\xC1\xBF\x03\x02\x02\x02\xC2\xC5\x03" +
		"\x02\x02\x02\xC3\xC1\x03\x02\x02\x02\xC3\xC4\x03\x02\x02\x02\xC4\xC7\x03" +
		"\x02\x02\x02\xC5\xC3\x03\x02\x02\x02\xC6\xBE\x03\x02\x02\x02\xC6\xC7\x03" +
		"\x02\x02\x02\xC7\xC8\x03\x02\x02\x02\xC8\xCA\x07\x13\x02\x02\xC9\xBD\x03" +
		"\x02\x02\x02\xC9\xCA\x03\x02\x02\x02\xCA\xCB\x03\x02\x02\x02\xCB\xCC\x07" +
		"\x14\x02\x02\xCC\x13\x03\x02\x02\x02\xCD\xCE\x07\x17\x02\x02\xCE\xCF\x05" +
		"\x1A\x0E\x02\xCF\xD0\x07\x04\x02\x02\xD0\xE8\x03\x02\x02\x02\xD1\xD2\x07" +
		"\x18\x02\x02\xD2\xD3\x05\x1A\x0E\x02\xD3\xD4\x07\x04\x02\x02\xD4\xE8\x03" +
		"\x02\x02\x02\xD5\xD6\x07\x19\x02\x02\xD6\xD7\x05\x1A\x0E\x02\xD7\xD8\x07" +
		"\x04\x02\x02\xD8\xE8\x03\x02\x02\x02\xD9\xDB\x07\x1A\x02\x02\xDA\xDC\x05" +
		"\x16\f\x02\xDB\xDA\x03\x02\x02\x02\xDB\xDC\x03\x02\x02\x02\xDC\xDE\x03" +
		"\x02\x02\x02\xDD\xDF\x05\x18\r\x02\xDE\xDD\x03\x02\x02\x02\xDE\xDF\x03" +
		"\x02\x02\x02\xDF\xE0\x03\x02\x02\x02\xE0\xE1\x05\x1A\x0E\x02\xE1\xE2\x07" +
		"\x04\x02\x02\xE2\xE8\x03\x02\x02\x02\xE3\xE4\x07\x1B\x02\x02\xE4\xE5\x05" +
		"\x1A\x0E\x02\xE5\xE6\x07\x04\x02\x02\xE6\xE8\x03\x02\x02\x02\xE7\xCD\x03" +
		"\x02\x02\x02\xE7\xD1\x03\x02\x02\x02\xE7\xD5\x03\x02\x02\x02\xE7\xD9\x03" +
		"\x02\x02\x02\xE7\xE3\x03\x02\x02\x02\xE8\x15\x03\x02\x02\x02\xE9\xEA\x07" +
		"\x1C\x02\x02\xEA\x17\x03\x02\x02\x02\xEB\xEC\x07\x1D\x02\x02\xEC\x19\x03" +
		"\x02\x02\x02\xED\xEE\x05\x1C\x0F\x02\xEE\xEF\x07\x14\x02\x02\xEF\xF1\x03" +
		"\x02\x02\x02\xF0\xED\x03\x02\x02\x02\xF1\xF2\x03\x02\x02\x02\xF2\xF0\x03" +
		"\x02\x02\x02\xF2\xF3\x03\x02\x02\x02\xF3\x1B\x03\x02\x02\x02\xF4\xF7\x05" +
		"\x1E\x10\x02\xF5\xF6\x07b\x02\x02\xF6\xF8\x05 \x11\x02\xF7\xF5\x03\x02" +
		"\x02\x02\xF7\xF8\x03\x02\x02\x02\xF8\xF9\x03\x02\x02\x02\xF9\xFA\x07\x16" +
		"\x02\x02\xFA\xFD\x05\"\x12\x02\xFB\xFC\x07Q\x02\x02\xFC\xFE\x05N(\x02" +
		"\xFD\xFB\x03\x02\x02\x02\xFD\xFE\x03\x02\x02\x02\xFE\x1D\x03\x02\x02\x02" +
		"\xFF\u0104\x07c\x02\x02\u0100\u0101\x07\x11\x02\x02\u0101\u0103\x07c\x02" +
		"\x02\u0102\u0100\x03\x02\x02\x02\u0103\u0106\x03\x02\x02\x02\u0104\u0102" +
		"\x03\x02\x02\x02\u0104\u0105\x03\x02\x02\x02\u0105\x1F\x03\x02\x02\x02" +
		"\u0106\u0104\x03\x02\x02\x02\u0107\u010B\x07\x1E\x02\x02\u0108\u010A\t" +
		"\x02\x02\x02\u0109\u0108\x03\x02\x02\x02\u010A\u010D\x03\x02\x02\x02\u010B" +
		"\u0109\x03\x02\x02\x02\u010B\u010C\x03\x02\x02\x02\u010C!\x03\x02\x02" +
		"\x02\u010D\u010B\x03\x02\x02\x02\u010E\u0112\x05$\x13\x02\u010F\u0112" +
		"\x05&\x14\x02\u0110\u0112\x05(\x15\x02\u0111\u010E\x03\x02\x02\x02\u0111" +
		"\u010F\x03\x02\x02\x02\u0111\u0110\x03\x02\x02\x02\u0112#\x03\x02\x02" +
		"\x02\u0113\u0114\t\x03\x02\x02\u0114%\x03\x02\x02\x02\u0115\u0116\x07" +
		"c\x02\x02\u0116\'\x03\x02\x02\x02\u0117\u0118\x076\x02\x02\u0118\u0119" +
		"\x077\x02\x02\u0119\u011E\x05*\x16\x02\u011A\u011B\x07\x11\x02\x02\u011B" +
		"\u011D\x05*\x16\x02\u011C\u011A\x03\x02\x02\x02\u011D\u0120\x03\x02\x02" +
		"\x02\u011E\u011C\x03\x02\x02\x02\u011E\u011F\x03\x02\x02\x02\u011F\u0121" +
		"\x03\x02\x02\x02\u0120\u011E\x03\x02\x02\x02\u0121\u0122\x078\x02\x02" +
		"\u0122\u0123\x079\x02\x02\u0123\u0124\x05\"\x12\x02\u0124)\x03\x02\x02" +
		"\x02\u0125\u0127\t\x04\x02\x02\u0126\u0125\x03\x02\x02\x02\u0126\u0127" +
		"\x03\x02\x02\x02\u0127\u0128\x03\x02\x02\x02\u0128\u0129\x07d\x02\x02" +
		"\u0129\u012B\x07:\x02\x02\u012A\u012C\t\x04\x02\x02\u012B\u012A\x03\x02" +
		"\x02\x02\u012B\u012C\x03\x02\x02\x02\u012C\u012D\x03\x02\x02\x02\u012D" +
		"\u012E\x07d\x02\x02\u012E+\x03\x02\x02\x02\u012F\u0130\x05.\x18\x02\u0130" +
		"-\x03\x02\x02\x02\u0131\u0132\x050\x19\x02\u0132\u0133\x07\x14\x02\x02" +
		"\u0133\u0135\x03\x02\x02\x02\u0134\u0131\x03\x02\x02\x02\u0135\u0138\x03" +
		"\x02\x02\x02\u0136\u0134\x03\x02\x02\x02\u0136\u0137\x03\x02\x02\x02\u0137" +
		"/\x03\x02\x02\x02\u0138\u0136\x03\x02\x02\x02\u0139\u013E\x052\x1A\x02" +
		"\u013A\u013E\x054\x1B\x02\u013B\u013E\x05:\x1E\x02\u013C\u013E\x05F$\x02" +
		"\u013D\u0139\x03\x02\x02\x02\u013D\u013A\x03\x02\x02\x02\u013D\u013B\x03" +
		"\x02\x02\x02\u013D\u013C\x03\x02\x02\x02\u013E1\x03\x02\x02\x02\u013F" +
		"\u0140\x05T+\x02\u0140\u0141\x07Q\x02\x02\u0141\u0142\x05N(\x02\u0142" +
		"3\x03\x02\x02\x02\u0143\u0146\x056\x1C\x02\u0144\u0146\x07;\x02\x02\u0145" +
		"\u0143\x03\x02\x02\x02\u0145\u0144\x03\x02\x02\x02\u01465\x03\x02\x02" +
		"\x02\u0147\u0148\x07c\x02\x02\u0148\u0151\x07\x0F\x02\x02\u0149\u014E" +
		"\x058\x1D\x02\u014A\u014B\x07\x11\x02\x02\u014B\u014D\x058\x1D\x02\u014C" +
		"\u014A\x03\x02\x02\x02\u014D\u0150\x03\x02\x02\x02\u014E\u014C\x03\x02" +
		"\x02\x02\u014E\u014F\x03\x02\x02\x02\u014F\u0152\x03\x02\x02\x02\u0150" +
		"\u014E\x03\x02\x02\x02\u0151\u0149\x03\x02\x02\x02\u0151\u0152\x03\x02" +
		"\x02\x02\u0152\u0153\x03\x02\x02\x02\u0153\u0154\x07\x13\x02\x02\u0154" +
		"7\x03\x02\x02\x02\u0155\u0156\x07c\x02\x02\u0156\u0157\x07Q\x02\x02\u0157" +
		"\u015D\x05N(\x02\u0158\u0159\x07c\x02\x02\u0159\u015A\x07<\x02\x02\u015A" +
		"\u015D\x05T+\x02\u015B\u015D\x05N(\x02\u015C\u0155\x03\x02\x02\x02\u015C" +
		"\u0158\x03\x02\x02\x02\u015C\u015B\x03\x02\x02\x02\u015D9\x03\x02\x02" +
		"\x02\u015E\u0161\x05<\x1F\x02\u015F\u0161\x05> \x02\u0160\u015E\x03\x02" +
		"\x02\x02\u0160\u015F\x03\x02\x02\x02\u0161;\x03\x02\x02\x02\u0162\u0163" +
		"\x07=\x02\x02\u0163\u0164\x05N(\x02\u0164\u0165\x07>\x02\x02\u0165\u016D" +
		"\x05.\x18\x02\u0166\u0167\x07?\x02\x02\u0167\u0168\x05N(\x02\u0168\u0169" +
		"\x07>\x02\x02\u0169\u016A\x05.\x18\x02\u016A\u016C\x03\x02\x02\x02\u016B" +
		"\u0166\x03\x02\x02\x02\u016C\u016F\x03\x02\x02\x02\u016D\u016B\x03\x02" +
		"\x02\x02\u016D\u016E\x03\x02\x02\x02\u016E\u0172\x03\x02\x02\x02\u016F" +
		"\u016D\x03\x02\x02\x02\u0170\u0171\x07@\x02\x02\u0171\u0173\x05.\x18\x02" +
		"\u0172\u0170\x03\x02\x02\x02\u0172\u0173\x03\x02\x02\x02\u0173\u0174\x03" +
		"\x02\x02\x02\u0174\u0175\x07A\x02\x02\u0175=\x03\x02\x02\x02\u0176\u0177" +
		"\x07B\x02\x02\u0177\u0178\x05N(\x02\u0178\u017A\x079\x02\x02\u0179\u017B" +
		"\x05@!\x02\u017A\u0179\x03\x02\x02\x02\u017B\u017C\x03\x02\x02\x02\u017C" +
		"\u017A\x03\x02\x02\x02\u017C\u017D\x03\x02\x02\x02\u017D\u0180\x03\x02" +
		"\x02\x02\u017E\u017F\x07@\x02\x02\u017F\u0181\x05.\x18\x02\u0180\u017E" +
		"\x03\x02\x02\x02\u0180\u0181\x03\x02\x02\x02\u0181\u0182\x03\x02\x02\x02" +
		"\u0182\u0183\x07C\x02\x02\u0183?\x03\x02\x02\x02\u0184\u0185\x05B\"\x02" +
		"\u0185\u0186\x07\x16\x02\x02\u0186\u0187\x05.\x18\x02\u0187A\x03\x02\x02" +
		"\x02\u0188\u018D\x05D#\x02\u0189\u018A\x07\x11\x02\x02\u018A\u018C\x05" +
		"D#\x02\u018B\u0189\x03\x02\x02\x02\u018C\u018F\x03\x02\x02\x02\u018D\u018B" +
		"\x03\x02\x02\x02\u018D\u018E\x03\x02\x02\x02\u018EC\x03\x02\x02\x02\u018F" +
		"\u018D\x03\x02\x02\x02\u0190\u0193\x05*\x16\x02\u0191\u0193\x07d\x02\x02" +
		"\u0192\u0190\x03\x02\x02\x02\u0192\u0191\x03\x02\x02\x02\u0193E\x03\x02" +
		"\x02\x02\u0194\u0198\x05H%\x02\u0195\u0198\x05J&\x02\u0196\u0198\x05L" +
		"\'\x02\u0197\u0194\x03\x02\x02\x02\u0197\u0195\x03\x02\x02\x02\u0197\u0196" +
		"\x03\x02\x02\x02\u0198G\x03\x02\x02\x02\u0199\u019A\x07D\x02\x02\u019A" +
		"\u019B\x07c\x02\x02\u019B\u019C\x07Q\x02\x02\u019C\u019D\x05N(\x02\u019D" +
		"\u019E\x07E\x02\x02\u019E\u01A1\x05N(\x02\u019F\u01A0\x07F\x02\x02\u01A0" +
		"\u01A2\x05N(\x02\u01A1\u019F\x03\x02\x02\x02\u01A1\u01A2\x03\x02\x02\x02" +
		"\u01A2\u01A3\x03\x02\x02\x02\u01A3\u01A4\x07G\x02\x02\u01A4\u01A5\x05" +
		".\x18\x02\u01A5\u01A6\x07H\x02\x02\u01A6I\x03\x02\x02\x02\u01A7\u01A8" +
		"\x07I\x02\x02\u01A8\u01A9\x05N(\x02\u01A9\u01AA\x07G\x02\x02\u01AA\u01AB" +
		"\x05.\x18\x02\u01AB\u01AC\x07J\x02\x02\u01ACK\x03\x02\x02\x02\u01AD\u01AE" +
		"\x07K\x02\x02\u01AE\u01AF\x05.\x18\x02\u01AF\u01B0\x07L\x02\x02\u01B0" +
		"\u01B1\x05N(\x02\u01B1\u01B2\x07M\x02\x02\u01B2M\x03\x02\x02\x02\u01B3" +
		"\u01B4\b(\x01\x02\u01B4\u01B5\x07a\x02\x02\u01B5\u01BA\x05N(\n\u01B6\u01B7" +
		"\t\x05\x02\x02\u01B7\u01BA\x05N(\x04\u01B8\u01BA\x05P)\x02\u01B9\u01B3" +
		"\x03\x02\x02\x02\u01B9\u01B6\x03\x02\x02\x02\u01B9\u01B8\x03\x02\x02\x02" +
		"\u01BA\u01D5\x03\x02\x02\x02\u01BB\u01BC\f\r\x02\x02\u01BC\u01BD\x07^" +
		"\x02\x02\u01BD\u01D4\x05N(\x0E\u01BE\u01BF\f\f\x02\x02\u01BF\u01C0\x07" +
		"_\x02\x02\u01C0\u01D4\x05N(\r\u01C1\u01C2\f\v\x02\x02\u01C2\u01C3\x07" +
		"`\x02\x02\u01C3\u01D4\x05N(\f\u01C4\u01C5\f\t\x02\x02\u01C5\u01C6\t\x06" +
		"\x02\x02\u01C6\u01D4\x05N(\n\u01C7\u01C8\f\b\x02\x02\u01C8\u01C9\t\x07" +
		"\x02\x02\u01C9\u01D4\x05N(\t\u01CA\u01CB\f\x07\x02\x02\u01CB\u01CC\t\x05" +
		"\x02\x02\u01CC\u01D4\x05N(\b\u01CD\u01CE\f\x06\x02\x02\u01CE\u01CF\t\b" +
		"\x02\x02\u01CF\u01D4\x05N(\x07\u01D0\u01D1\f\x05\x02\x02\u01D1\u01D2\x07" +
		"]\x02\x02\u01D2\u01D4\x05N(\x06\u01D3\u01BB\x03\x02\x02\x02\u01D3\u01BE" +
		"\x03\x02\x02\x02\u01D3\u01C1\x03\x02\x02\x02\u01D3\u01C4\x03\x02\x02\x02" +
		"\u01D3\u01C7\x03\x02\x02\x02\u01D3\u01CA\x03\x02\x02\x02\u01D3\u01CD\x03" +
		"\x02\x02\x02\u01D3\u01D0\x03\x02\x02\x02\u01D4\u01D7\x03\x02\x02\x02\u01D5" +
		"\u01D3\x03\x02\x02\x02\u01D5\u01D6\x03\x02\x02\x02\u01D6O\x03\x02\x02" +
		"\x02\u01D7\u01D5\x03\x02\x02\x02\u01D8\u01E0\x05V,\x02\u01D9\u01E0\x05" +
		"T+\x02\u01DA\u01DB\x07\x0F\x02\x02\u01DB\u01DC\x05N(\x02\u01DC\u01DD\x07" +
		"\x13\x02\x02\u01DD\u01E0\x03\x02\x02\x02\u01DE\u01E0\x05R*\x02\u01DF\u01D8" +
		"\x03\x02\x02\x02\u01DF\u01D9\x03\x02\x02\x02\u01DF\u01DA\x03\x02\x02\x02" +
		"\u01DF\u01DE\x03\x02\x02\x02\u01E0Q\x03\x02\x02\x02\u01E1\u01E2\x07c\x02" +
		"\x02\u01E2\u01EB\x07\x0F\x02\x02\u01E3\u01E8\x058\x1D\x02\u01E4\u01E5" +
		"\x07\x11\x02\x02\u01E5\u01E7\x058\x1D\x02\u01E6\u01E4\x03\x02\x02\x02" +
		"\u01E7\u01EA\x03\x02\x02\x02\u01E8\u01E6\x03\x02\x02\x02\u01E8\u01E9\x03" +
		"\x02\x02\x02\u01E9\u01EC\x03\x02\x02\x02\u01EA\u01E8\x03\x02\x02\x02\u01EB" +
		"\u01E3\x03\x02\x02\x02\u01EB\u01EC\x03\x02\x02\x02\u01EC\u01ED\x03\x02" +
		"\x02\x02\u01ED\u01EE\x07\x13\x02\x02\u01EES\x03\x02\x02\x02\u01EF\u01F4" +
		"\x07c\x02\x02\u01F0\u01F1\x07N\x02\x02\u01F1\u01F3\x07c\x02\x02\u01F2" +
		"\u01F0\x03\x02\x02\x02\u01F3\u01F6\x03\x02\x02\x02\u01F4\u01F2\x03\x02" +
		"\x02\x02\u01F4\u01F5\x03\x02\x02\x02\u01F5\u0202\x03\x02\x02\x02\u01F6" +
		"\u01F4\x03\x02\x02\x02\u01F7\u01F8\x077\x02\x02\u01F8\u01FD\x05N(\x02" +
		"\u01F9\u01FA\x07\x11\x02\x02\u01FA\u01FC\x05N(\x02\u01FB\u01F9\x03\x02" +
		"\x02\x02\u01FC\u01FF\x03\x02\x02\x02\u01FD\u01FB\x03\x02\x02\x02\u01FD" +
		"\u01FE\x03\x02\x02\x02\u01FE\u0200\x03\x02\x02\x02\u01FF\u01FD\x03\x02" +
		"\x02\x02\u0200\u0201\x078\x02\x02\u0201\u0203\x03\x02\x02\x02\u0202\u01F7" +
		"\x03\x02\x02\x02\u0202\u0203\x03\x02\x02\x02\u0203U\x03\x02\x02\x02\u0204" +
		"\u0209\x05X-\x02\u0205\u0209\x05\\/\x02\u0206\u0209\x05^0\x02\u0207\u0209" +
		"\x05Z.\x02\u0208\u0204\x03\x02\x02\x02\u0208\u0205\x03\x02\x02\x02\u0208" +
		"\u0206\x03\x02\x02\x02\u0208\u0207\x03\x02\x02\x02\u0209W\x03\x02\x02" +
		"\x02\u020A\u020C\x07Y\x02\x02\u020B\u020A\x03\x02\x02\x02\u020B\u020C" +
		"\x03\x02\x02\x02\u020C\u020D\x03\x02\x02\x02\u020D\u020E\t\t\x02\x02\u020E" +
		"Y\x03\x02\x02\x02\u020F\u0210\t\n\x02\x02\u0210[\x03\x02\x02\x02\u0211" +
		"\u0212\x07g\x02\x02\u0212]\x03\x02\x02\x02\u0213\u0214\x07h\x02\x02\u0214" +
		"_\x03\x02\x02\x025ckor|\x87\x92\x9D\xA3\xB9\xC3\xC6\xC9\xDB\xDE\xE7\xF2" +
		"\xF7\xFD\u0104\u010B\u0111\u011E\u0126\u012B\u0136\u013D\u0145\u014E\u0151" +
		"\u015C\u0160\u016D\u0172\u017C\u0180\u018D\u0192\u0197\u01A1\u01B9\u01D3" +
		"\u01D5\u01DF\u01E8\u01EB\u01F4\u01FD\u0202\u0208\u020B";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!IEC61131Parser.__ATN) {
			IEC61131Parser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(IEC61131Parser._serializedATN));
		}

		return IEC61131Parser.__ATN;
	}

}

export class ProgramContext extends ParserRuleContext {
	public EOF(): TerminalNode { return this.getToken(IEC61131Parser.EOF, 0); }
	public library_element(): Library_elementContext[];
	public library_element(i: number): Library_elementContext;
	public library_element(i?: number): Library_elementContext | Library_elementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Library_elementContext);
		} else {
			return this.getRuleContext(i, Library_elementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_program; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterProgram) {
			listener.enterProgram(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitProgram) {
			listener.exitProgram(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitProgram) {
			return visitor.visitProgram(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Library_elementContext extends ParserRuleContext {
	public function_block_declaration(): Function_block_declarationContext | undefined {
		return this.tryGetRuleContext(0, Function_block_declarationContext);
	}
	public program_declaration(): Program_declarationContext | undefined {
		return this.tryGetRuleContext(0, Program_declarationContext);
	}
	public configuration_declaration(): Configuration_declarationContext | undefined {
		return this.tryGetRuleContext(0, Configuration_declarationContext);
	}
	public global_var_declarations(): Global_var_declarationsContext | undefined {
		return this.tryGetRuleContext(0, Global_var_declarationsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_library_element; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterLibrary_element) {
			listener.enterLibrary_element(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitLibrary_element) {
			listener.exitLibrary_element(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitLibrary_element) {
			return visitor.visitLibrary_element(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Global_var_declarationsContext extends ParserRuleContext {
	public var_decl_list(): Var_decl_listContext {
		return this.getRuleContext(0, Var_decl_listContext);
	}
	public constant_qualifier(): Constant_qualifierContext | undefined {
		return this.tryGetRuleContext(0, Constant_qualifierContext);
	}
	public retain_qualifier(): Retain_qualifierContext | undefined {
		return this.tryGetRuleContext(0, Retain_qualifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_global_var_declarations; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterGlobal_var_declarations) {
			listener.enterGlobal_var_declarations(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitGlobal_var_declarations) {
			listener.exitGlobal_var_declarations(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitGlobal_var_declarations) {
			return visitor.visitGlobal_var_declarations(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Program_declarationContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(IEC61131Parser.ID, 0); }
	public body(): BodyContext {
		return this.getRuleContext(0, BodyContext);
	}
	public var_declarations(): Var_declarationsContext[];
	public var_declarations(i: number): Var_declarationsContext;
	public var_declarations(i?: number): Var_declarationsContext | Var_declarationsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Var_declarationsContext);
		} else {
			return this.getRuleContext(i, Var_declarationsContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_program_declaration; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterProgram_declaration) {
			listener.enterProgram_declaration(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitProgram_declaration) {
			listener.exitProgram_declaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitProgram_declaration) {
			return visitor.visitProgram_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Function_block_declarationContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(IEC61131Parser.ID, 0); }
	public body(): BodyContext {
		return this.getRuleContext(0, BodyContext);
	}
	public var_declarations(): Var_declarationsContext[];
	public var_declarations(i: number): Var_declarationsContext;
	public var_declarations(i?: number): Var_declarationsContext | Var_declarationsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Var_declarationsContext);
		} else {
			return this.getRuleContext(i, Var_declarationsContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_function_block_declaration; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterFunction_block_declaration) {
			listener.enterFunction_block_declaration(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitFunction_block_declaration) {
			listener.exitFunction_block_declaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitFunction_block_declaration) {
			return visitor.visitFunction_block_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Configuration_declarationContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(IEC61131Parser.ID, 0); }
	public resource_declaration(): Resource_declarationContext[];
	public resource_declaration(i: number): Resource_declarationContext;
	public resource_declaration(i?: number): Resource_declarationContext | Resource_declarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Resource_declarationContext);
		} else {
			return this.getRuleContext(i, Resource_declarationContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_configuration_declaration; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterConfiguration_declaration) {
			listener.enterConfiguration_declaration(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitConfiguration_declaration) {
			listener.exitConfiguration_declaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitConfiguration_declaration) {
			return visitor.visitConfiguration_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Resource_declarationContext extends ParserRuleContext {
	public ID(): TerminalNode[];
	public ID(i: number): TerminalNode;
	public ID(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IEC61131Parser.ID);
		} else {
			return this.getToken(IEC61131Parser.ID, i);
		}
	}
	public task_configuration(): Task_configurationContext[];
	public task_configuration(i: number): Task_configurationContext;
	public task_configuration(i?: number): Task_configurationContext | Task_configurationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Task_configurationContext);
		} else {
			return this.getRuleContext(i, Task_configurationContext);
		}
	}
	public program_configuration(): Program_configurationContext[];
	public program_configuration(i: number): Program_configurationContext;
	public program_configuration(i?: number): Program_configurationContext | Program_configurationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Program_configurationContext);
		} else {
			return this.getRuleContext(i, Program_configurationContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_resource_declaration; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterResource_declaration) {
			listener.enterResource_declaration(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitResource_declaration) {
			listener.exitResource_declaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitResource_declaration) {
			return visitor.visitResource_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Task_configurationContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(IEC61131Parser.ID, 0); }
	public ASSIGN(): TerminalNode[];
	public ASSIGN(i: number): TerminalNode;
	public ASSIGN(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IEC61131Parser.ASSIGN);
		} else {
			return this.getToken(IEC61131Parser.ASSIGN, i);
		}
	}
	public time_literal(): Time_literalContext {
		return this.getRuleContext(0, Time_literalContext);
	}
	public INT(): TerminalNode { return this.getToken(IEC61131Parser.INT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_task_configuration; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterTask_configuration) {
			listener.enterTask_configuration(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitTask_configuration) {
			listener.exitTask_configuration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitTask_configuration) {
			return visitor.visitTask_configuration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Program_configurationContext extends ParserRuleContext {
	public ID(): TerminalNode[];
	public ID(i: number): TerminalNode;
	public ID(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IEC61131Parser.ID);
		} else {
			return this.getToken(IEC61131Parser.ID, i);
		}
	}
	public param_assignment(): Param_assignmentContext[];
	public param_assignment(i: number): Param_assignmentContext;
	public param_assignment(i?: number): Param_assignmentContext | Param_assignmentContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Param_assignmentContext);
		} else {
			return this.getRuleContext(i, Param_assignmentContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_program_configuration; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterProgram_configuration) {
			listener.enterProgram_configuration(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitProgram_configuration) {
			listener.exitProgram_configuration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitProgram_configuration) {
			return visitor.visitProgram_configuration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Var_declarationsContext extends ParserRuleContext {
	public var_decl_list(): Var_decl_listContext {
		return this.getRuleContext(0, Var_decl_listContext);
	}
	public constant_qualifier(): Constant_qualifierContext | undefined {
		return this.tryGetRuleContext(0, Constant_qualifierContext);
	}
	public retain_qualifier(): Retain_qualifierContext | undefined {
		return this.tryGetRuleContext(0, Retain_qualifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_var_declarations; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterVar_declarations) {
			listener.enterVar_declarations(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitVar_declarations) {
			listener.exitVar_declarations(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitVar_declarations) {
			return visitor.visitVar_declarations(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Constant_qualifierContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_constant_qualifier; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterConstant_qualifier) {
			listener.enterConstant_qualifier(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitConstant_qualifier) {
			listener.exitConstant_qualifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitConstant_qualifier) {
			return visitor.visitConstant_qualifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Retain_qualifierContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_retain_qualifier; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterRetain_qualifier) {
			listener.enterRetain_qualifier(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitRetain_qualifier) {
			listener.exitRetain_qualifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitRetain_qualifier) {
			return visitor.visitRetain_qualifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Var_decl_listContext extends ParserRuleContext {
	public var_decl(): Var_declContext[];
	public var_decl(i: number): Var_declContext;
	public var_decl(i?: number): Var_declContext | Var_declContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Var_declContext);
		} else {
			return this.getRuleContext(i, Var_declContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_var_decl_list; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterVar_decl_list) {
			listener.enterVar_decl_list(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitVar_decl_list) {
			listener.exitVar_decl_list(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitVar_decl_list) {
			return visitor.visitVar_decl_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Var_declContext extends ParserRuleContext {
	public identifier_list(): Identifier_listContext {
		return this.getRuleContext(0, Identifier_listContext);
	}
	public data_type(): Data_typeContext {
		return this.getRuleContext(0, Data_typeContext);
	}
	public AT(): TerminalNode | undefined { return this.tryGetToken(IEC61131Parser.AT, 0); }
	public location(): LocationContext | undefined {
		return this.tryGetRuleContext(0, LocationContext);
	}
	public ASSIGN(): TerminalNode | undefined { return this.tryGetToken(IEC61131Parser.ASSIGN, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_var_decl; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterVar_decl) {
			listener.enterVar_decl(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitVar_decl) {
			listener.exitVar_decl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitVar_decl) {
			return visitor.visitVar_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Identifier_listContext extends ParserRuleContext {
	public ID(): TerminalNode[];
	public ID(i: number): TerminalNode;
	public ID(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IEC61131Parser.ID);
		} else {
			return this.getToken(IEC61131Parser.ID, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_identifier_list; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterIdentifier_list) {
			listener.enterIdentifier_list(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitIdentifier_list) {
			listener.exitIdentifier_list(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitIdentifier_list) {
			return visitor.visitIdentifier_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LocationContext extends ParserRuleContext {
	public ID(): TerminalNode[];
	public ID(i: number): TerminalNode;
	public ID(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IEC61131Parser.ID);
		} else {
			return this.getToken(IEC61131Parser.ID, i);
		}
	}
	public INT(): TerminalNode[];
	public INT(i: number): TerminalNode;
	public INT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IEC61131Parser.INT);
		} else {
			return this.getToken(IEC61131Parser.INT, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_location; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterLocation) {
			listener.enterLocation(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitLocation) {
			listener.exitLocation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitLocation) {
			return visitor.visitLocation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Data_typeContext extends ParserRuleContext {
	public elementary_data_type(): Elementary_data_typeContext | undefined {
		return this.tryGetRuleContext(0, Elementary_data_typeContext);
	}
	public derived_data_type(): Derived_data_typeContext | undefined {
		return this.tryGetRuleContext(0, Derived_data_typeContext);
	}
	public array_data_type(): Array_data_typeContext | undefined {
		return this.tryGetRuleContext(0, Array_data_typeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_data_type; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterData_type) {
			listener.enterData_type(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitData_type) {
			listener.exitData_type(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitData_type) {
			return visitor.visitData_type(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Elementary_data_typeContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_elementary_data_type; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterElementary_data_type) {
			listener.enterElementary_data_type(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitElementary_data_type) {
			listener.exitElementary_data_type(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitElementary_data_type) {
			return visitor.visitElementary_data_type(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Derived_data_typeContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(IEC61131Parser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_derived_data_type; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterDerived_data_type) {
			listener.enterDerived_data_type(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitDerived_data_type) {
			listener.exitDerived_data_type(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitDerived_data_type) {
			return visitor.visitDerived_data_type(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Array_data_typeContext extends ParserRuleContext {
	public subrange(): SubrangeContext[];
	public subrange(i: number): SubrangeContext;
	public subrange(i?: number): SubrangeContext | SubrangeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SubrangeContext);
		} else {
			return this.getRuleContext(i, SubrangeContext);
		}
	}
	public data_type(): Data_typeContext {
		return this.getRuleContext(0, Data_typeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_array_data_type; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterArray_data_type) {
			listener.enterArray_data_type(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitArray_data_type) {
			listener.exitArray_data_type(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitArray_data_type) {
			return visitor.visitArray_data_type(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SubrangeContext extends ParserRuleContext {
	public INT(): TerminalNode[];
	public INT(i: number): TerminalNode;
	public INT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IEC61131Parser.INT);
		} else {
			return this.getToken(IEC61131Parser.INT, i);
		}
	}
	public MINUS(): TerminalNode[];
	public MINUS(i: number): TerminalNode;
	public MINUS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IEC61131Parser.MINUS);
		} else {
			return this.getToken(IEC61131Parser.MINUS, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_subrange; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterSubrange) {
			listener.enterSubrange(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitSubrange) {
			listener.exitSubrange(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitSubrange) {
			return visitor.visitSubrange(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BodyContext extends ParserRuleContext {
	public statement_list(): Statement_listContext {
		return this.getRuleContext(0, Statement_listContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_body; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterBody) {
			listener.enterBody(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitBody) {
			listener.exitBody(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitBody) {
			return visitor.visitBody(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Statement_listContext extends ParserRuleContext {
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_statement_list; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterStatement_list) {
			listener.enterStatement_list(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitStatement_list) {
			listener.exitStatement_list(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitStatement_list) {
			return visitor.visitStatement_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatementContext extends ParserRuleContext {
	public assignment_statement(): Assignment_statementContext | undefined {
		return this.tryGetRuleContext(0, Assignment_statementContext);
	}
	public subprogram_control_statement(): Subprogram_control_statementContext | undefined {
		return this.tryGetRuleContext(0, Subprogram_control_statementContext);
	}
	public selection_statement(): Selection_statementContext | undefined {
		return this.tryGetRuleContext(0, Selection_statementContext);
	}
	public iteration_statement(): Iteration_statementContext | undefined {
		return this.tryGetRuleContext(0, Iteration_statementContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_statement; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterStatement) {
			listener.enterStatement(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitStatement) {
			listener.exitStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitStatement) {
			return visitor.visitStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Assignment_statementContext extends ParserRuleContext {
	public variable(): VariableContext {
		return this.getRuleContext(0, VariableContext);
	}
	public ASSIGN(): TerminalNode { return this.getToken(IEC61131Parser.ASSIGN, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_assignment_statement; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterAssignment_statement) {
			listener.enterAssignment_statement(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitAssignment_statement) {
			listener.exitAssignment_statement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitAssignment_statement) {
			return visitor.visitAssignment_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Subprogram_control_statementContext extends ParserRuleContext {
	public fb_call(): Fb_callContext | undefined {
		return this.tryGetRuleContext(0, Fb_callContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_subprogram_control_statement; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterSubprogram_control_statement) {
			listener.enterSubprogram_control_statement(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitSubprogram_control_statement) {
			listener.exitSubprogram_control_statement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitSubprogram_control_statement) {
			return visitor.visitSubprogram_control_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Fb_callContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(IEC61131Parser.ID, 0); }
	public param_assignment(): Param_assignmentContext[];
	public param_assignment(i: number): Param_assignmentContext;
	public param_assignment(i?: number): Param_assignmentContext | Param_assignmentContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Param_assignmentContext);
		} else {
			return this.getRuleContext(i, Param_assignmentContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_fb_call; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterFb_call) {
			listener.enterFb_call(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitFb_call) {
			listener.exitFb_call(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitFb_call) {
			return visitor.visitFb_call(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Param_assignmentContext extends ParserRuleContext {
	public ID(): TerminalNode | undefined { return this.tryGetToken(IEC61131Parser.ID, 0); }
	public ASSIGN(): TerminalNode | undefined { return this.tryGetToken(IEC61131Parser.ASSIGN, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public variable(): VariableContext | undefined {
		return this.tryGetRuleContext(0, VariableContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_param_assignment; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterParam_assignment) {
			listener.enterParam_assignment(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitParam_assignment) {
			listener.exitParam_assignment(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitParam_assignment) {
			return visitor.visitParam_assignment(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Selection_statementContext extends ParserRuleContext {
	public if_statement(): If_statementContext | undefined {
		return this.tryGetRuleContext(0, If_statementContext);
	}
	public case_statement(): Case_statementContext | undefined {
		return this.tryGetRuleContext(0, Case_statementContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_selection_statement; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterSelection_statement) {
			listener.enterSelection_statement(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitSelection_statement) {
			listener.exitSelection_statement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitSelection_statement) {
			return visitor.visitSelection_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class If_statementContext extends ParserRuleContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public statement_list(): Statement_listContext[];
	public statement_list(i: number): Statement_listContext;
	public statement_list(i?: number): Statement_listContext | Statement_listContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Statement_listContext);
		} else {
			return this.getRuleContext(i, Statement_listContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_if_statement; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterIf_statement) {
			listener.enterIf_statement(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitIf_statement) {
			listener.exitIf_statement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitIf_statement) {
			return visitor.visitIf_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Case_statementContext extends ParserRuleContext {
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public case_element(): Case_elementContext[];
	public case_element(i: number): Case_elementContext;
	public case_element(i?: number): Case_elementContext | Case_elementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Case_elementContext);
		} else {
			return this.getRuleContext(i, Case_elementContext);
		}
	}
	public statement_list(): Statement_listContext | undefined {
		return this.tryGetRuleContext(0, Statement_listContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_case_statement; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterCase_statement) {
			listener.enterCase_statement(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitCase_statement) {
			listener.exitCase_statement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitCase_statement) {
			return visitor.visitCase_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Case_elementContext extends ParserRuleContext {
	public case_list(): Case_listContext {
		return this.getRuleContext(0, Case_listContext);
	}
	public statement_list(): Statement_listContext {
		return this.getRuleContext(0, Statement_listContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_case_element; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterCase_element) {
			listener.enterCase_element(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitCase_element) {
			listener.exitCase_element(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitCase_element) {
			return visitor.visitCase_element(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Case_listContext extends ParserRuleContext {
	public case_list_element(): Case_list_elementContext[];
	public case_list_element(i: number): Case_list_elementContext;
	public case_list_element(i?: number): Case_list_elementContext | Case_list_elementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Case_list_elementContext);
		} else {
			return this.getRuleContext(i, Case_list_elementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_case_list; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterCase_list) {
			listener.enterCase_list(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitCase_list) {
			listener.exitCase_list(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitCase_list) {
			return visitor.visitCase_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Case_list_elementContext extends ParserRuleContext {
	public subrange(): SubrangeContext | undefined {
		return this.tryGetRuleContext(0, SubrangeContext);
	}
	public INT(): TerminalNode | undefined { return this.tryGetToken(IEC61131Parser.INT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_case_list_element; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterCase_list_element) {
			listener.enterCase_list_element(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitCase_list_element) {
			listener.exitCase_list_element(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitCase_list_element) {
			return visitor.visitCase_list_element(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Iteration_statementContext extends ParserRuleContext {
	public for_statement(): For_statementContext | undefined {
		return this.tryGetRuleContext(0, For_statementContext);
	}
	public while_statement(): While_statementContext | undefined {
		return this.tryGetRuleContext(0, While_statementContext);
	}
	public repeat_statement(): Repeat_statementContext | undefined {
		return this.tryGetRuleContext(0, Repeat_statementContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_iteration_statement; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterIteration_statement) {
			listener.enterIteration_statement(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitIteration_statement) {
			listener.exitIteration_statement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitIteration_statement) {
			return visitor.visitIteration_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class For_statementContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(IEC61131Parser.ID, 0); }
	public ASSIGN(): TerminalNode { return this.getToken(IEC61131Parser.ASSIGN, 0); }
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public statement_list(): Statement_listContext {
		return this.getRuleContext(0, Statement_listContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_for_statement; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterFor_statement) {
			listener.enterFor_statement(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitFor_statement) {
			listener.exitFor_statement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitFor_statement) {
			return visitor.visitFor_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class While_statementContext extends ParserRuleContext {
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public statement_list(): Statement_listContext {
		return this.getRuleContext(0, Statement_listContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_while_statement; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterWhile_statement) {
			listener.enterWhile_statement(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitWhile_statement) {
			listener.exitWhile_statement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitWhile_statement) {
			return visitor.visitWhile_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Repeat_statementContext extends ParserRuleContext {
	public statement_list(): Statement_listContext {
		return this.getRuleContext(0, Statement_listContext);
	}
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_repeat_statement; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterRepeat_statement) {
			listener.enterRepeat_statement(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitRepeat_statement) {
			listener.exitRepeat_statement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitRepeat_statement) {
			return visitor.visitRepeat_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_expression; }
	public copyFrom(ctx: ExpressionContext): void {
		super.copyFrom(ctx);
	}
}
export class OrExprContext extends ExpressionContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public OR(): TerminalNode { return this.getToken(IEC61131Parser.OR, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterOrExpr) {
			listener.enterOrExpr(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitOrExpr) {
			listener.exitOrExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitOrExpr) {
			return visitor.visitOrExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class XorExprContext extends ExpressionContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public XOR(): TerminalNode { return this.getToken(IEC61131Parser.XOR, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterXorExpr) {
			listener.enterXorExpr(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitXorExpr) {
			listener.exitXorExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitXorExpr) {
			return visitor.visitXorExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AndExprContext extends ExpressionContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public AND(): TerminalNode { return this.getToken(IEC61131Parser.AND, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterAndExpr) {
			listener.enterAndExpr(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitAndExpr) {
			listener.exitAndExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitAndExpr) {
			return visitor.visitAndExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NotExprContext extends ExpressionContext {
	public NOT(): TerminalNode { return this.getToken(IEC61131Parser.NOT, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterNotExpr) {
			listener.enterNotExpr(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitNotExpr) {
			listener.exitNotExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitNotExpr) {
			return visitor.visitNotExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class EqualityExprContext extends ExpressionContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public EQ(): TerminalNode | undefined { return this.tryGetToken(IEC61131Parser.EQ, 0); }
	public NE(): TerminalNode | undefined { return this.tryGetToken(IEC61131Parser.NE, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterEqualityExpr) {
			listener.enterEqualityExpr(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitEqualityExpr) {
			listener.exitEqualityExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitEqualityExpr) {
			return visitor.visitEqualityExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class RelationalExprContext extends ExpressionContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public LT(): TerminalNode | undefined { return this.tryGetToken(IEC61131Parser.LT, 0); }
	public GT(): TerminalNode | undefined { return this.tryGetToken(IEC61131Parser.GT, 0); }
	public LE(): TerminalNode | undefined { return this.tryGetToken(IEC61131Parser.LE, 0); }
	public GE(): TerminalNode | undefined { return this.tryGetToken(IEC61131Parser.GE, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterRelationalExpr) {
			listener.enterRelationalExpr(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitRelationalExpr) {
			listener.exitRelationalExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitRelationalExpr) {
			return visitor.visitRelationalExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AdditiveExprContext extends ExpressionContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(IEC61131Parser.PLUS, 0); }
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(IEC61131Parser.MINUS, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterAdditiveExpr) {
			listener.enterAdditiveExpr(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitAdditiveExpr) {
			listener.exitAdditiveExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitAdditiveExpr) {
			return visitor.visitAdditiveExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MultiplicativeExprContext extends ExpressionContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public MULT(): TerminalNode | undefined { return this.tryGetToken(IEC61131Parser.MULT, 0); }
	public DIV(): TerminalNode | undefined { return this.tryGetToken(IEC61131Parser.DIV, 0); }
	public MOD(): TerminalNode | undefined { return this.tryGetToken(IEC61131Parser.MOD, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterMultiplicativeExpr) {
			listener.enterMultiplicativeExpr(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitMultiplicativeExpr) {
			listener.exitMultiplicativeExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitMultiplicativeExpr) {
			return visitor.visitMultiplicativeExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PowerExprContext extends ExpressionContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public POWER(): TerminalNode { return this.getToken(IEC61131Parser.POWER, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterPowerExpr) {
			listener.enterPowerExpr(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitPowerExpr) {
			listener.exitPowerExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitPowerExpr) {
			return visitor.visitPowerExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class UnaryExprContext extends ExpressionContext {
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(IEC61131Parser.MINUS, 0); }
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(IEC61131Parser.PLUS, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterUnaryExpr) {
			listener.enterUnaryExpr(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitUnaryExpr) {
			listener.exitUnaryExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitUnaryExpr) {
			return visitor.visitUnaryExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AtomExprContext extends ExpressionContext {
	public atom(): AtomContext {
		return this.getRuleContext(0, AtomContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterAtomExpr) {
			listener.enterAtomExpr(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitAtomExpr) {
			listener.exitAtomExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitAtomExpr) {
			return visitor.visitAtomExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AtomContext extends ParserRuleContext {
	public constant(): ConstantContext | undefined {
		return this.tryGetRuleContext(0, ConstantContext);
	}
	public variable(): VariableContext | undefined {
		return this.tryGetRuleContext(0, VariableContext);
	}
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public function_call(): Function_callContext | undefined {
		return this.tryGetRuleContext(0, Function_callContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_atom; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterAtom) {
			listener.enterAtom(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitAtom) {
			listener.exitAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitAtom) {
			return visitor.visitAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Function_callContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(IEC61131Parser.ID, 0); }
	public param_assignment(): Param_assignmentContext[];
	public param_assignment(i: number): Param_assignmentContext;
	public param_assignment(i?: number): Param_assignmentContext | Param_assignmentContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Param_assignmentContext);
		} else {
			return this.getRuleContext(i, Param_assignmentContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_function_call; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterFunction_call) {
			listener.enterFunction_call(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitFunction_call) {
			listener.exitFunction_call(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitFunction_call) {
			return visitor.visitFunction_call(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VariableContext extends ParserRuleContext {
	public ID(): TerminalNode[];
	public ID(i: number): TerminalNode;
	public ID(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IEC61131Parser.ID);
		} else {
			return this.getToken(IEC61131Parser.ID, i);
		}
	}
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_variable; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterVariable) {
			listener.enterVariable(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitVariable) {
			listener.exitVariable(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitVariable) {
			return visitor.visitVariable(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConstantContext extends ParserRuleContext {
	public numeric_literal(): Numeric_literalContext | undefined {
		return this.tryGetRuleContext(0, Numeric_literalContext);
	}
	public string_literal(): String_literalContext | undefined {
		return this.tryGetRuleContext(0, String_literalContext);
	}
	public time_literal(): Time_literalContext | undefined {
		return this.tryGetRuleContext(0, Time_literalContext);
	}
	public boolean_literal(): Boolean_literalContext | undefined {
		return this.tryGetRuleContext(0, Boolean_literalContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_constant; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterConstant) {
			listener.enterConstant(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitConstant) {
			listener.exitConstant(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitConstant) {
			return visitor.visitConstant(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Numeric_literalContext extends ParserRuleContext {
	public INT(): TerminalNode | undefined { return this.tryGetToken(IEC61131Parser.INT, 0); }
	public REAL_NUM(): TerminalNode | undefined { return this.tryGetToken(IEC61131Parser.REAL_NUM, 0); }
	public HEX_INT(): TerminalNode | undefined { return this.tryGetToken(IEC61131Parser.HEX_INT, 0); }
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(IEC61131Parser.MINUS, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_numeric_literal; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterNumeric_literal) {
			listener.enterNumeric_literal(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitNumeric_literal) {
			listener.exitNumeric_literal(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitNumeric_literal) {
			return visitor.visitNumeric_literal(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Boolean_literalContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_boolean_literal; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterBoolean_literal) {
			listener.enterBoolean_literal(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitBoolean_literal) {
			listener.exitBoolean_literal(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitBoolean_literal) {
			return visitor.visitBoolean_literal(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class String_literalContext extends ParserRuleContext {
	public STRING_LITERAL(): TerminalNode { return this.getToken(IEC61131Parser.STRING_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_string_literal; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterString_literal) {
			listener.enterString_literal(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitString_literal) {
			listener.exitString_literal(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitString_literal) {
			return visitor.visitString_literal(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Time_literalContext extends ParserRuleContext {
	public TIME_LITERAL(): TerminalNode { return this.getToken(IEC61131Parser.TIME_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IEC61131Parser.RULE_time_literal; }
	// @Override
	public enterRule(listener: IEC61131Listener): void {
		if (listener.enterTime_literal) {
			listener.enterTime_literal(this);
		}
	}
	// @Override
	public exitRule(listener: IEC61131Listener): void {
		if (listener.exitTime_literal) {
			listener.exitTime_literal(this);
		}
	}
	// @Override
	public accept<Result>(visitor: IEC61131Visitor<Result>): Result {
		if (visitor.visitTime_literal) {
			return visitor.visitTime_literal(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


