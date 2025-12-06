// Generated from src/lib/compiler/IEC61131.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { OrExprContext } from "./IEC61131Parser";
import { XorExprContext } from "./IEC61131Parser";
import { AndExprContext } from "./IEC61131Parser";
import { NotExprContext } from "./IEC61131Parser";
import { EqualityExprContext } from "./IEC61131Parser";
import { RelationalExprContext } from "./IEC61131Parser";
import { AdditiveExprContext } from "./IEC61131Parser";
import { MultiplicativeExprContext } from "./IEC61131Parser";
import { PowerExprContext } from "./IEC61131Parser";
import { UnaryExprContext } from "./IEC61131Parser";
import { AtomExprContext } from "./IEC61131Parser";
import { ProgramContext } from "./IEC61131Parser";
import { Library_elementContext } from "./IEC61131Parser";
import { Global_var_declarationsContext } from "./IEC61131Parser";
import { Program_declarationContext } from "./IEC61131Parser";
import { Function_block_declarationContext } from "./IEC61131Parser";
import { Configuration_declarationContext } from "./IEC61131Parser";
import { Resource_declarationContext } from "./IEC61131Parser";
import { Task_configurationContext } from "./IEC61131Parser";
import { Program_configurationContext } from "./IEC61131Parser";
import { Var_declarationsContext } from "./IEC61131Parser";
import { Constant_qualifierContext } from "./IEC61131Parser";
import { Retain_qualifierContext } from "./IEC61131Parser";
import { Var_decl_listContext } from "./IEC61131Parser";
import { Var_declContext } from "./IEC61131Parser";
import { Identifier_listContext } from "./IEC61131Parser";
import { LocationContext } from "./IEC61131Parser";
import { Data_typeContext } from "./IEC61131Parser";
import { Elementary_data_typeContext } from "./IEC61131Parser";
import { Derived_data_typeContext } from "./IEC61131Parser";
import { Array_data_typeContext } from "./IEC61131Parser";
import { SubrangeContext } from "./IEC61131Parser";
import { BodyContext } from "./IEC61131Parser";
import { Statement_listContext } from "./IEC61131Parser";
import { StatementContext } from "./IEC61131Parser";
import { Assignment_statementContext } from "./IEC61131Parser";
import { Subprogram_control_statementContext } from "./IEC61131Parser";
import { Fb_callContext } from "./IEC61131Parser";
import { Param_assignmentContext } from "./IEC61131Parser";
import { Selection_statementContext } from "./IEC61131Parser";
import { If_statementContext } from "./IEC61131Parser";
import { Case_statementContext } from "./IEC61131Parser";
import { Case_elementContext } from "./IEC61131Parser";
import { Case_listContext } from "./IEC61131Parser";
import { Case_list_elementContext } from "./IEC61131Parser";
import { Iteration_statementContext } from "./IEC61131Parser";
import { For_statementContext } from "./IEC61131Parser";
import { While_statementContext } from "./IEC61131Parser";
import { Repeat_statementContext } from "./IEC61131Parser";
import { ExpressionContext } from "./IEC61131Parser";
import { AtomContext } from "./IEC61131Parser";
import { Function_callContext } from "./IEC61131Parser";
import { VariableContext } from "./IEC61131Parser";
import { ConstantContext } from "./IEC61131Parser";
import { Numeric_literalContext } from "./IEC61131Parser";
import { Boolean_literalContext } from "./IEC61131Parser";
import { String_literalContext } from "./IEC61131Parser";
import { Time_literalContext } from "./IEC61131Parser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `IEC61131Parser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface IEC61131Visitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by the `OrExpr`
	 * labeled alternative in `IEC61131Parser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOrExpr?: (ctx: OrExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `XorExpr`
	 * labeled alternative in `IEC61131Parser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitXorExpr?: (ctx: XorExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `AndExpr`
	 * labeled alternative in `IEC61131Parser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAndExpr?: (ctx: AndExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `NotExpr`
	 * labeled alternative in `IEC61131Parser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNotExpr?: (ctx: NotExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `EqualityExpr`
	 * labeled alternative in `IEC61131Parser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEqualityExpr?: (ctx: EqualityExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `RelationalExpr`
	 * labeled alternative in `IEC61131Parser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRelationalExpr?: (ctx: RelationalExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `AdditiveExpr`
	 * labeled alternative in `IEC61131Parser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAdditiveExpr?: (ctx: AdditiveExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `MultiplicativeExpr`
	 * labeled alternative in `IEC61131Parser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMultiplicativeExpr?: (ctx: MultiplicativeExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `PowerExpr`
	 * labeled alternative in `IEC61131Parser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPowerExpr?: (ctx: PowerExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `UnaryExpr`
	 * labeled alternative in `IEC61131Parser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnaryExpr?: (ctx: UnaryExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `AtomExpr`
	 * labeled alternative in `IEC61131Parser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAtomExpr?: (ctx: AtomExprContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.program`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgram?: (ctx: ProgramContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.library_element`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLibrary_element?: (ctx: Library_elementContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.global_var_declarations`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGlobal_var_declarations?: (ctx: Global_var_declarationsContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.program_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgram_declaration?: (ctx: Program_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.function_block_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_block_declaration?: (ctx: Function_block_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.configuration_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConfiguration_declaration?: (ctx: Configuration_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.resource_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitResource_declaration?: (ctx: Resource_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.task_configuration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTask_configuration?: (ctx: Task_configurationContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.program_configuration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgram_configuration?: (ctx: Program_configurationContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.var_declarations`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVar_declarations?: (ctx: Var_declarationsContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.constant_qualifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstant_qualifier?: (ctx: Constant_qualifierContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.retain_qualifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRetain_qualifier?: (ctx: Retain_qualifierContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.var_decl_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVar_decl_list?: (ctx: Var_decl_listContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.var_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVar_decl?: (ctx: Var_declContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.identifier_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifier_list?: (ctx: Identifier_listContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.location`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLocation?: (ctx: LocationContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.data_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitData_type?: (ctx: Data_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.elementary_data_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitElementary_data_type?: (ctx: Elementary_data_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.derived_data_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDerived_data_type?: (ctx: Derived_data_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.array_data_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArray_data_type?: (ctx: Array_data_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.subrange`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubrange?: (ctx: SubrangeContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.body`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBody?: (ctx: BodyContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.statement_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatement_list?: (ctx: Statement_listContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatement?: (ctx: StatementContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.assignment_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignment_statement?: (ctx: Assignment_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.subprogram_control_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubprogram_control_statement?: (ctx: Subprogram_control_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.fb_call`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFb_call?: (ctx: Fb_callContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.param_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParam_assignment?: (ctx: Param_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.selection_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelection_statement?: (ctx: Selection_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.if_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIf_statement?: (ctx: If_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.case_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCase_statement?: (ctx: Case_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.case_element`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCase_element?: (ctx: Case_elementContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.case_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCase_list?: (ctx: Case_listContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.case_list_element`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCase_list_element?: (ctx: Case_list_elementContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.iteration_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIteration_statement?: (ctx: Iteration_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.for_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFor_statement?: (ctx: For_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.while_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWhile_statement?: (ctx: While_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.repeat_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRepeat_statement?: (ctx: Repeat_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.atom`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAtom?: (ctx: AtomContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.function_call`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_call?: (ctx: Function_callContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.variable`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariable?: (ctx: VariableContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.constant`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstant?: (ctx: ConstantContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.numeric_literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumeric_literal?: (ctx: Numeric_literalContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.boolean_literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBoolean_literal?: (ctx: Boolean_literalContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.string_literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitString_literal?: (ctx: String_literalContext) => Result;

	/**
	 * Visit a parse tree produced by `IEC61131Parser.time_literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTime_literal?: (ctx: Time_literalContext) => Result;
}

