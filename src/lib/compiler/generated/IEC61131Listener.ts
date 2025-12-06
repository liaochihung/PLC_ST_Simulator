// Generated from src/lib/compiler/IEC61131.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

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
 * This interface defines a complete listener for a parse tree produced by
 * `IEC61131Parser`.
 */
export interface IEC61131Listener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by the `OrExpr`
	 * labeled alternative in `IEC61131Parser.expression`.
	 * @param ctx the parse tree
	 */
	enterOrExpr?: (ctx: OrExprContext) => void;
	/**
	 * Exit a parse tree produced by the `OrExpr`
	 * labeled alternative in `IEC61131Parser.expression`.
	 * @param ctx the parse tree
	 */
	exitOrExpr?: (ctx: OrExprContext) => void;

	/**
	 * Enter a parse tree produced by the `XorExpr`
	 * labeled alternative in `IEC61131Parser.expression`.
	 * @param ctx the parse tree
	 */
	enterXorExpr?: (ctx: XorExprContext) => void;
	/**
	 * Exit a parse tree produced by the `XorExpr`
	 * labeled alternative in `IEC61131Parser.expression`.
	 * @param ctx the parse tree
	 */
	exitXorExpr?: (ctx: XorExprContext) => void;

	/**
	 * Enter a parse tree produced by the `AndExpr`
	 * labeled alternative in `IEC61131Parser.expression`.
	 * @param ctx the parse tree
	 */
	enterAndExpr?: (ctx: AndExprContext) => void;
	/**
	 * Exit a parse tree produced by the `AndExpr`
	 * labeled alternative in `IEC61131Parser.expression`.
	 * @param ctx the parse tree
	 */
	exitAndExpr?: (ctx: AndExprContext) => void;

	/**
	 * Enter a parse tree produced by the `NotExpr`
	 * labeled alternative in `IEC61131Parser.expression`.
	 * @param ctx the parse tree
	 */
	enterNotExpr?: (ctx: NotExprContext) => void;
	/**
	 * Exit a parse tree produced by the `NotExpr`
	 * labeled alternative in `IEC61131Parser.expression`.
	 * @param ctx the parse tree
	 */
	exitNotExpr?: (ctx: NotExprContext) => void;

	/**
	 * Enter a parse tree produced by the `EqualityExpr`
	 * labeled alternative in `IEC61131Parser.expression`.
	 * @param ctx the parse tree
	 */
	enterEqualityExpr?: (ctx: EqualityExprContext) => void;
	/**
	 * Exit a parse tree produced by the `EqualityExpr`
	 * labeled alternative in `IEC61131Parser.expression`.
	 * @param ctx the parse tree
	 */
	exitEqualityExpr?: (ctx: EqualityExprContext) => void;

	/**
	 * Enter a parse tree produced by the `RelationalExpr`
	 * labeled alternative in `IEC61131Parser.expression`.
	 * @param ctx the parse tree
	 */
	enterRelationalExpr?: (ctx: RelationalExprContext) => void;
	/**
	 * Exit a parse tree produced by the `RelationalExpr`
	 * labeled alternative in `IEC61131Parser.expression`.
	 * @param ctx the parse tree
	 */
	exitRelationalExpr?: (ctx: RelationalExprContext) => void;

	/**
	 * Enter a parse tree produced by the `AdditiveExpr`
	 * labeled alternative in `IEC61131Parser.expression`.
	 * @param ctx the parse tree
	 */
	enterAdditiveExpr?: (ctx: AdditiveExprContext) => void;
	/**
	 * Exit a parse tree produced by the `AdditiveExpr`
	 * labeled alternative in `IEC61131Parser.expression`.
	 * @param ctx the parse tree
	 */
	exitAdditiveExpr?: (ctx: AdditiveExprContext) => void;

	/**
	 * Enter a parse tree produced by the `MultiplicativeExpr`
	 * labeled alternative in `IEC61131Parser.expression`.
	 * @param ctx the parse tree
	 */
	enterMultiplicativeExpr?: (ctx: MultiplicativeExprContext) => void;
	/**
	 * Exit a parse tree produced by the `MultiplicativeExpr`
	 * labeled alternative in `IEC61131Parser.expression`.
	 * @param ctx the parse tree
	 */
	exitMultiplicativeExpr?: (ctx: MultiplicativeExprContext) => void;

	/**
	 * Enter a parse tree produced by the `PowerExpr`
	 * labeled alternative in `IEC61131Parser.expression`.
	 * @param ctx the parse tree
	 */
	enterPowerExpr?: (ctx: PowerExprContext) => void;
	/**
	 * Exit a parse tree produced by the `PowerExpr`
	 * labeled alternative in `IEC61131Parser.expression`.
	 * @param ctx the parse tree
	 */
	exitPowerExpr?: (ctx: PowerExprContext) => void;

	/**
	 * Enter a parse tree produced by the `UnaryExpr`
	 * labeled alternative in `IEC61131Parser.expression`.
	 * @param ctx the parse tree
	 */
	enterUnaryExpr?: (ctx: UnaryExprContext) => void;
	/**
	 * Exit a parse tree produced by the `UnaryExpr`
	 * labeled alternative in `IEC61131Parser.expression`.
	 * @param ctx the parse tree
	 */
	exitUnaryExpr?: (ctx: UnaryExprContext) => void;

	/**
	 * Enter a parse tree produced by the `AtomExpr`
	 * labeled alternative in `IEC61131Parser.expression`.
	 * @param ctx the parse tree
	 */
	enterAtomExpr?: (ctx: AtomExprContext) => void;
	/**
	 * Exit a parse tree produced by the `AtomExpr`
	 * labeled alternative in `IEC61131Parser.expression`.
	 * @param ctx the parse tree
	 */
	exitAtomExpr?: (ctx: AtomExprContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.program`.
	 * @param ctx the parse tree
	 */
	enterProgram?: (ctx: ProgramContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.program`.
	 * @param ctx the parse tree
	 */
	exitProgram?: (ctx: ProgramContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.library_element`.
	 * @param ctx the parse tree
	 */
	enterLibrary_element?: (ctx: Library_elementContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.library_element`.
	 * @param ctx the parse tree
	 */
	exitLibrary_element?: (ctx: Library_elementContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.global_var_declarations`.
	 * @param ctx the parse tree
	 */
	enterGlobal_var_declarations?: (ctx: Global_var_declarationsContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.global_var_declarations`.
	 * @param ctx the parse tree
	 */
	exitGlobal_var_declarations?: (ctx: Global_var_declarationsContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.program_declaration`.
	 * @param ctx the parse tree
	 */
	enterProgram_declaration?: (ctx: Program_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.program_declaration`.
	 * @param ctx the parse tree
	 */
	exitProgram_declaration?: (ctx: Program_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.function_block_declaration`.
	 * @param ctx the parse tree
	 */
	enterFunction_block_declaration?: (ctx: Function_block_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.function_block_declaration`.
	 * @param ctx the parse tree
	 */
	exitFunction_block_declaration?: (ctx: Function_block_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.configuration_declaration`.
	 * @param ctx the parse tree
	 */
	enterConfiguration_declaration?: (ctx: Configuration_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.configuration_declaration`.
	 * @param ctx the parse tree
	 */
	exitConfiguration_declaration?: (ctx: Configuration_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.resource_declaration`.
	 * @param ctx the parse tree
	 */
	enterResource_declaration?: (ctx: Resource_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.resource_declaration`.
	 * @param ctx the parse tree
	 */
	exitResource_declaration?: (ctx: Resource_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.task_configuration`.
	 * @param ctx the parse tree
	 */
	enterTask_configuration?: (ctx: Task_configurationContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.task_configuration`.
	 * @param ctx the parse tree
	 */
	exitTask_configuration?: (ctx: Task_configurationContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.program_configuration`.
	 * @param ctx the parse tree
	 */
	enterProgram_configuration?: (ctx: Program_configurationContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.program_configuration`.
	 * @param ctx the parse tree
	 */
	exitProgram_configuration?: (ctx: Program_configurationContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.var_declarations`.
	 * @param ctx the parse tree
	 */
	enterVar_declarations?: (ctx: Var_declarationsContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.var_declarations`.
	 * @param ctx the parse tree
	 */
	exitVar_declarations?: (ctx: Var_declarationsContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.constant_qualifier`.
	 * @param ctx the parse tree
	 */
	enterConstant_qualifier?: (ctx: Constant_qualifierContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.constant_qualifier`.
	 * @param ctx the parse tree
	 */
	exitConstant_qualifier?: (ctx: Constant_qualifierContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.retain_qualifier`.
	 * @param ctx the parse tree
	 */
	enterRetain_qualifier?: (ctx: Retain_qualifierContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.retain_qualifier`.
	 * @param ctx the parse tree
	 */
	exitRetain_qualifier?: (ctx: Retain_qualifierContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.var_decl_list`.
	 * @param ctx the parse tree
	 */
	enterVar_decl_list?: (ctx: Var_decl_listContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.var_decl_list`.
	 * @param ctx the parse tree
	 */
	exitVar_decl_list?: (ctx: Var_decl_listContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.var_decl`.
	 * @param ctx the parse tree
	 */
	enterVar_decl?: (ctx: Var_declContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.var_decl`.
	 * @param ctx the parse tree
	 */
	exitVar_decl?: (ctx: Var_declContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.identifier_list`.
	 * @param ctx the parse tree
	 */
	enterIdentifier_list?: (ctx: Identifier_listContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.identifier_list`.
	 * @param ctx the parse tree
	 */
	exitIdentifier_list?: (ctx: Identifier_listContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.location`.
	 * @param ctx the parse tree
	 */
	enterLocation?: (ctx: LocationContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.location`.
	 * @param ctx the parse tree
	 */
	exitLocation?: (ctx: LocationContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.data_type`.
	 * @param ctx the parse tree
	 */
	enterData_type?: (ctx: Data_typeContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.data_type`.
	 * @param ctx the parse tree
	 */
	exitData_type?: (ctx: Data_typeContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.elementary_data_type`.
	 * @param ctx the parse tree
	 */
	enterElementary_data_type?: (ctx: Elementary_data_typeContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.elementary_data_type`.
	 * @param ctx the parse tree
	 */
	exitElementary_data_type?: (ctx: Elementary_data_typeContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.derived_data_type`.
	 * @param ctx the parse tree
	 */
	enterDerived_data_type?: (ctx: Derived_data_typeContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.derived_data_type`.
	 * @param ctx the parse tree
	 */
	exitDerived_data_type?: (ctx: Derived_data_typeContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.array_data_type`.
	 * @param ctx the parse tree
	 */
	enterArray_data_type?: (ctx: Array_data_typeContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.array_data_type`.
	 * @param ctx the parse tree
	 */
	exitArray_data_type?: (ctx: Array_data_typeContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.subrange`.
	 * @param ctx the parse tree
	 */
	enterSubrange?: (ctx: SubrangeContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.subrange`.
	 * @param ctx the parse tree
	 */
	exitSubrange?: (ctx: SubrangeContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.body`.
	 * @param ctx the parse tree
	 */
	enterBody?: (ctx: BodyContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.body`.
	 * @param ctx the parse tree
	 */
	exitBody?: (ctx: BodyContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.statement_list`.
	 * @param ctx the parse tree
	 */
	enterStatement_list?: (ctx: Statement_listContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.statement_list`.
	 * @param ctx the parse tree
	 */
	exitStatement_list?: (ctx: Statement_listContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.statement`.
	 * @param ctx the parse tree
	 */
	enterStatement?: (ctx: StatementContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.statement`.
	 * @param ctx the parse tree
	 */
	exitStatement?: (ctx: StatementContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.assignment_statement`.
	 * @param ctx the parse tree
	 */
	enterAssignment_statement?: (ctx: Assignment_statementContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.assignment_statement`.
	 * @param ctx the parse tree
	 */
	exitAssignment_statement?: (ctx: Assignment_statementContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.subprogram_control_statement`.
	 * @param ctx the parse tree
	 */
	enterSubprogram_control_statement?: (ctx: Subprogram_control_statementContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.subprogram_control_statement`.
	 * @param ctx the parse tree
	 */
	exitSubprogram_control_statement?: (ctx: Subprogram_control_statementContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.fb_call`.
	 * @param ctx the parse tree
	 */
	enterFb_call?: (ctx: Fb_callContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.fb_call`.
	 * @param ctx the parse tree
	 */
	exitFb_call?: (ctx: Fb_callContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.param_assignment`.
	 * @param ctx the parse tree
	 */
	enterParam_assignment?: (ctx: Param_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.param_assignment`.
	 * @param ctx the parse tree
	 */
	exitParam_assignment?: (ctx: Param_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.selection_statement`.
	 * @param ctx the parse tree
	 */
	enterSelection_statement?: (ctx: Selection_statementContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.selection_statement`.
	 * @param ctx the parse tree
	 */
	exitSelection_statement?: (ctx: Selection_statementContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.if_statement`.
	 * @param ctx the parse tree
	 */
	enterIf_statement?: (ctx: If_statementContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.if_statement`.
	 * @param ctx the parse tree
	 */
	exitIf_statement?: (ctx: If_statementContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.case_statement`.
	 * @param ctx the parse tree
	 */
	enterCase_statement?: (ctx: Case_statementContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.case_statement`.
	 * @param ctx the parse tree
	 */
	exitCase_statement?: (ctx: Case_statementContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.case_element`.
	 * @param ctx the parse tree
	 */
	enterCase_element?: (ctx: Case_elementContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.case_element`.
	 * @param ctx the parse tree
	 */
	exitCase_element?: (ctx: Case_elementContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.case_list`.
	 * @param ctx the parse tree
	 */
	enterCase_list?: (ctx: Case_listContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.case_list`.
	 * @param ctx the parse tree
	 */
	exitCase_list?: (ctx: Case_listContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.case_list_element`.
	 * @param ctx the parse tree
	 */
	enterCase_list_element?: (ctx: Case_list_elementContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.case_list_element`.
	 * @param ctx the parse tree
	 */
	exitCase_list_element?: (ctx: Case_list_elementContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.iteration_statement`.
	 * @param ctx the parse tree
	 */
	enterIteration_statement?: (ctx: Iteration_statementContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.iteration_statement`.
	 * @param ctx the parse tree
	 */
	exitIteration_statement?: (ctx: Iteration_statementContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.for_statement`.
	 * @param ctx the parse tree
	 */
	enterFor_statement?: (ctx: For_statementContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.for_statement`.
	 * @param ctx the parse tree
	 */
	exitFor_statement?: (ctx: For_statementContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.while_statement`.
	 * @param ctx the parse tree
	 */
	enterWhile_statement?: (ctx: While_statementContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.while_statement`.
	 * @param ctx the parse tree
	 */
	exitWhile_statement?: (ctx: While_statementContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.repeat_statement`.
	 * @param ctx the parse tree
	 */
	enterRepeat_statement?: (ctx: Repeat_statementContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.repeat_statement`.
	 * @param ctx the parse tree
	 */
	exitRepeat_statement?: (ctx: Repeat_statementContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.expression`.
	 * @param ctx the parse tree
	 */
	enterExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.expression`.
	 * @param ctx the parse tree
	 */
	exitExpression?: (ctx: ExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.atom`.
	 * @param ctx the parse tree
	 */
	enterAtom?: (ctx: AtomContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.atom`.
	 * @param ctx the parse tree
	 */
	exitAtom?: (ctx: AtomContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.function_call`.
	 * @param ctx the parse tree
	 */
	enterFunction_call?: (ctx: Function_callContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.function_call`.
	 * @param ctx the parse tree
	 */
	exitFunction_call?: (ctx: Function_callContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.variable`.
	 * @param ctx the parse tree
	 */
	enterVariable?: (ctx: VariableContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.variable`.
	 * @param ctx the parse tree
	 */
	exitVariable?: (ctx: VariableContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.constant`.
	 * @param ctx the parse tree
	 */
	enterConstant?: (ctx: ConstantContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.constant`.
	 * @param ctx the parse tree
	 */
	exitConstant?: (ctx: ConstantContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.numeric_literal`.
	 * @param ctx the parse tree
	 */
	enterNumeric_literal?: (ctx: Numeric_literalContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.numeric_literal`.
	 * @param ctx the parse tree
	 */
	exitNumeric_literal?: (ctx: Numeric_literalContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.boolean_literal`.
	 * @param ctx the parse tree
	 */
	enterBoolean_literal?: (ctx: Boolean_literalContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.boolean_literal`.
	 * @param ctx the parse tree
	 */
	exitBoolean_literal?: (ctx: Boolean_literalContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.string_literal`.
	 * @param ctx the parse tree
	 */
	enterString_literal?: (ctx: String_literalContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.string_literal`.
	 * @param ctx the parse tree
	 */
	exitString_literal?: (ctx: String_literalContext) => void;

	/**
	 * Enter a parse tree produced by `IEC61131Parser.time_literal`.
	 * @param ctx the parse tree
	 */
	enterTime_literal?: (ctx: Time_literalContext) => void;
	/**
	 * Exit a parse tree produced by `IEC61131Parser.time_literal`.
	 * @param ctx the parse tree
	 */
	exitTime_literal?: (ctx: Time_literalContext) => void;
}

