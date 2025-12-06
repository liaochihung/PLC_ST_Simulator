
import { ProgramProject } from '@/types/program-blocks';

// Constants for default code
const GLOBAL_VARS = `VAR_GLOBAL CONSTANT
    OK_STEP : INT := 10000;
    NG_STEP : INT := -1;
    START_STEP : INT := 10;
    TOOL_NG : INT := 900;
    ErrCyOn : WORD := 10; (* Cylinder On Err *)
    ErrCyOff : WORD := 20; (* Cylinder Off Err *)
    ErrCyBoth : WORD := 30; (* Cylinder Both On Err *)
    CONTINUS_NG_TARGET : INT := 3;
    STEP_BUSY : INT := 1;
    STEP_OK : INT := 2;
END_VAR

VAR_GLOBAL
    gLight : dsTowerLight;
    sys : dsSysStatus;
    dwAxis1Pos : DINT; (* SD5500 *)
    dwAxis2Pos : DINT; (* SD5540 *)
    uiSt1Down : BOOL; (* M10 *)
    uiSt1Forward : BOOL; (* M11 *)
    uiSt1Clamp : BOOL; (* M12 *)
    uiSt1ClampRotate : BOOL; (* M13 *)
    uiSt1Seperate : BOOL; (* M14 *)
    uiSt1PF : BOOL; (* M15 *)
    uiSt1LF : BOOL; (* M16 *)
    uiSt3Down : BOOL; (* M30 *)
    uiSt3Forward : BOOL; (* M31 *)
    uiSt3Suck : BOOL; (* M32 *)
    uiSt3StepUp : BOOL; (* M33 *)
    uiSt3StepDown : BOOL; (* M34 *)
    uiSt3NextPos : BOOL; (* M35 *)
    uiSt5Down : BOOL; (* M50 *)
    uiSt5Forward : BOOL; (* M51 *)
    uiSt5Suck : BOOL; (* M52 *)
    uiSt5Seperate : BOOL; (* M53 *)
    uiSt5PF : BOOL; (* M54 *)
    uiSt5LF : BOOL; (* M55 *)
    uiSt6Down : BOOL; (* M60 *)
    uiSt7Down : BOOL; (* M70 *)
    uiSt8Down : BOOL; (* M80 *)
    uiSt8Forward : BOOL; (* M81 *)
    uiSt8Clamp : BOOL; (* M82 *)
    uiSt9Up : BOOL; (* M90 *)
    uiSt9BlowAir : BOOL; (* M91 *)
    cySt1Down : FbCylinder2x1y;
    cySt1Forward : FbCylinder2x1y;
    cySt1Clamp : FbCylinder0x1y;
    cySt1ClampRotate : FbCylinder2x1y;
    cySt1Seperate : FbCylinder2x1y;
    cySt3Down : FbCylinder2x1y;
    cySt3Forward : FbCylinder2x1y;
    cySt3Suck : FbCylinder1x1y;
    cySt5Down : FbCylinder2x1y;
    cySt5Forward : FbCylinder2x1y;
    cySt5Suck : FbCylinder1x1y;
    cySt5Seperate : FbCylinder2x1y;
    cySt6Down : FbCylinder2x1y;
    cySt7Down : FbCylinder2x1y;
    cySt8Down : FbCylinder2x1y;
    cySt8Forward : FbCylinder2x1y;
    cySt8Clamp : FbCylinder0x1y;
    cySt9Up : FbCylinder2x1y;
    cySt9BlowAir : FbCylinder0x1y;
    rfSt1 : FbFeeder;
    rfSt5 : FbFeeder;
    RotateTable : FbRotateTable;
    Axis1Zero : FbAxisZero;
    Axis2Zero : FbAxisZero;
    wSt1ClampOffT : INT; (* D1000 *)
    wSt1ClampOnT : INT; (* D1001 *)
    wSt1ClampRotateOffT : INT; (* D1002 *)
    wSt1ClampRotateOnT : INT; (* D1003 *)
    wSt1ClampRotateTO : INT; (* D1004 *)
    wSt1DownOffT : INT; (* D1005 *)
    wSt1DownOnT : INT; (* D1006 *)
    wSt1DownTO : INT; (* D1007 *)
    wSt1ForwardOffT : INT; (* D1008 *)
    wSt1ForwardOnT : INT; (* D1009 *)
    wSt1ForwardTO : INT; (* D1010 *)
    wSt1SeperateOffT : INT; (* D1011 *)
    wSt1SeperateOnT : INT; (* D1012 *)
    wSt1SeperateTO : INT; (* D1013 *)
    wSt3DownOffT : INT; (* D1014 *)
    wSt3DownOnT : INT; (* D1015 *)
    wSt3DownTO : INT; (* D1016 *)
    wSt3ForwardOffT : INT; (* D1017 *)
    wSt3ForwardOnT : INT; (* D1018 *)
    wSt3ForwardTO : INT; (* D1019 *)
    wSt3SuckOffT : INT; (* D1020 *)
    wSt3SuckOnT : INT; (* D1021 *)
    wSt3SuckTO : INT; (* D1022 *)
    wSt5DownOffT : INT; (* D1023 *)
    wSt5DownOnT : INT; (* D1024 *)
    wSt5DownTO : INT; (* D1025 *)
    wSt5ForwardOffT : INT; (* D1026 *)
    wSt5ForwardOnT : INT; (* D1027 *)
    wSt5ForwardTO : INT; (* D1028 *)
    wSt5SeperateOffT : INT; (* D1029 *)
    wSt5SeperateOnT : INT; (* D1030 *)
    wSt5SeperateTO : INT; (* D1031 *)
    wSt5SuckOffT : INT; (* D1032 *)
    wSt5SuckOnT : INT; (* D1033 *)
    wSt5SuckTO : INT; (* D1034 *)
    wSt6DownOffT : INT; (* D1035 *)
    wSt6DownOnT : INT; (* D1036 *)
    wSt6DownTO : INT; (* D1037 *)
    wSt7DownOffT : INT; (* D1038 *)
    wSt7DownOnT : INT; (* D1039 *)
    wSt7DownTO : INT; (* D1040 *)
    wSt8ClampOffT : INT; (* D1041 *)
    wSt8ClampOnT : INT; (* D1042 *)
    wSt8DownOffT : INT; (* D1043 *)
    wSt8DownOnT : INT; (* D1044 *)
    wSt8DownTO : INT; (* D1045 *)
    wSt8ForwardOffT : INT; (* D1046 *)
    wSt8ForwardOnT : INT; (* D1047 *)
    wSt8ForwardTO : INT; (* D1048 *)
    wSt9BlowAirOffT : INT; (* D1049 *)
    wSt9BlowAirOnT : INT; (* D1050 *)
    wSt9UpOffT : INT; (* D1051 *)
    wSt9UpOnT : INT; (* D1052 *)
    wSt9UpTO : INT; (* D1053 *)
    wSt7WaitChk : INT; (* D1054 *)
    wSt6DownWait : INT; (* D1055 *)
    wSt1FeedInOnT : INT; (* D1060 *)
    wSt1FeedInTO : INT; (* D1061 *)
    wSt1FullOnT : INT; (* D1062 *)
    wSt1FullOffT : INT; (* D1063 *)
    wSt1FullTO : INT; (* D1064 *)
    wSt5FeedInOnT : INT; (* D1065 *)
    wSt5FeedInTO : INT; (* D1066 *)
    wSt5FullOnT : INT; (* D1067 *)
    wSt5FullOffT : INT; (* D1068 *)
    wSt5FullTO : INT; (* D1069 *)
    wSt7AbsNUL : INT; (* D1070 *)
    wSt7AbsPUL : INT; (* D1072 *)
    wSt7RelNUL : INT; (* D1074 *)
    wSt7RelPUL : INT; (* D1076 *)
    wRotateOnPosWaitT : INT; (* D1077 *)
    wRotateTO : INT; (* D1078 *)
    dwA1AbsSpeed : DINT; (* D1080 *)
    dwA2AbsSpeed : DINT; (* D1082 *)
    dwA1JogSpeed : DINT; (* D1084 *)
    dwA2JogSpeed : DINT; (* D1086 *)
    dwSt3ShiftAngle : DINT; (* D1090 *)
    dwSt3SafeHeight : DINT; (* D1092 *)
    dwSt3ToolCheck : DINT; (* D1094 空料檢查高度 *)
    dwAxis2GoUp : DINT; (* D1096 *)
    wTotalOkCnt : DWORD; (* D1100 *)
    wProductOkCount : DWORD; (* D1102 *)
    wProductNgCount : DWORD; (* D1104 *)
    wStopMachineNumber : DWORD; (* D1106 *)
    dwSt3Seperation : DWORD; (* D1110 分割數設定 *)
    wSt3ToolChkT : INT; (* D1112 *)
    wSt3NoToolChkTO : INT; (* D1113 *)
    dwSt3FeedUpSpeed : DINT; (* D1114 *)
    uiSt1Cycle : BOOL; (* M100 *)
    uiSt3Cycle : BOOL; (* M101 *)
    uiSt5Cycle : BOOL; (* M102 *)
    uiSt6Cycle : BOOL; (* M103 *)
    uiSt7Cycle : BOOL; (* M104 *)
    uiSt8Cycle : BOOL; (* M105 *)
    uiSt9Cycle : BOOL; (* M106 *)
    St1Cycle : BOOL; (* M107 *)
    St3Cycle : BOOL; (* M108 *)
    St5Cycle : BOOL; (* M109 *)
    St6Cycle : BOOL; (* M110 *)
    St7Cycle : BOOL; (* M111 *)
    St8Cycle : BOOL; (* M112 *)
    St9Cycle : BOOL; (* M113 *)
    autoSt1Cycle : BOOL; (* M114 *)
    autoSt3Cycle : BOOL; (* M115 *)
    autoSt5Cycle : BOOL; (* M116 *)
    autoSt6Cycle : BOOL; (* M117 *)
    autoSt7Cycle : BOOL; (* M118 *)
    autoSt8Cycle : BOOL; (* M119 *)
    autoSt9Cycle : BOOL; (* M120 *)
    uiSt1Reset : BOOL; (* M121 *)
    uiSt3Reset : BOOL; (* M122 *)
    uiSt5Reset : BOOL; (* M123 *)
    uiSt6Reset : BOOL; (* M124 *)
    uiSt7Reset : BOOL; (* M125 *)
    uiSt8Reset : BOOL; (* M126 *)
    uiSt9Reset : BOOL; (* M127 *)
    St1InOrg : BOOL; (* M128 *)
    St3InOrg : BOOL; (* M129 *)
    St5InOrg : BOOL; (* M130 *)
    St6InOrg : BOOL; (* M131 *)
    St7InOrg : BOOL; (* M132 *)
    St8InOrg : BOOL; (* M133 *)
    St9InOrg : BOOL; (* M134 *)
    St6CanGoNext : BOOL; (* M138 *)
    St7CanGoNext : BOOL; (* M139 *)
    St8CanGoNext : BOOL; (* M140 *)
    St9CanGoNext : BOOL; (* M141 *)
    St6GoNext : BOOL; (* M145 *)
    St7GoNext : BOOL; (* M146 *)
    St8GoNext : BOOL; (* M147 *)
    St9GoNext : BOOL; (* M148 *)
    gSt1Down : BOOL; (* M149 *)
    gSt1Forward : BOOL; (* M150 *)
    gSt1Clamp : BOOL; (* M151 *)
    gSt1ClampRotate : BOOL; (* M152 *)
    gSt1Seperate : BOOL; (* M153 *)
    gSt3Down : BOOL; (* M154 *)
    gSt3Forward : BOOL; (* M155 *)
    gSt3Suck : BOOL; (* M156 *)
    gSt5Down : BOOL; (* M157 *)
    gSt5Forward : BOOL; (* M158 *)
    gSt5Suck : BOOL; (* M159 *)
    gSt5Seperate : BOOL; (* M160 *)
    gSt6Down : BOOL; (* M161 *)
    gSt7Down : BOOL; (* M162 *)
    gSt8Down : BOOL; (* M163 *)
    gSt8Forward : BOOL; (* M164 *)
    gSt8Clamp : BOOL; (* M165 *)
    gSt9Up : BOOL; (* M166 *)
    gSt9BlowAir : BOOL; (* M167 *)
    uiIndexRotate : BOOL; (* M170 *)
    gRotate : BOOL; (* M171 *)
    uiResetAlarm : BOOL; (* M172 *)
    ResetAlarm : BOOL; (* M173 *)
    uiEnBuzzer : BOOL; (* M174 *)
    uiRstTotalOkCnt : BOOL; (* M175 *)
    uiRstOkCnt : BOOL; (* M176 *)
    uiRstNgCnt : BOOL; (* M177 *)
    gCanChangePage : BOOL; (* M178 *)
    gSt7Result : BOOL; (* M179 *)
    gSt7ResetZero : BOOL; (* M180 *)
    uiStartAuto : BOOL; (* M210 *)
    uiStopAuto : BOOL; (* M211 *)
    uiClearTool : BOOL; (* M212 *)
    uiFeeder : BOOL; (* M213 *)
    gA1Zero : BOOL; (* M214 伺服旋轉 *)
    gA2Zero : BOOL; (* M215 步進上下 *)
    uiA1Zero : BOOL; (* M216 *)
    uiA2Zero : BOOL; (* M217 *)
    gCurrentPage : INT; (* D10 *)
    wSt1Index : INT; (* D30 *)
    wSt3Index : INT; (* D31 *)
    wSt5Index : INT; (* D32 *)
    wSt6Index : INT; (* D33 *)
    wSt7Index : INT; (* D34 *)
    wSt8Index : INT; (* D35 *)
    wSt9Index : INT; (* D36 *)
    wSt1LastIndex : INT; (* D37 *)
    wSt3LastIndex : INT; (* D38 *)
    wSt5LastIndex : INT; (* D39 *)
    wSt6LastIndex : INT; (* D40 *)
    wSt7LastIndex : INT; (* D41 *)
    wSt8LastIndex : INT; (* D42 *)
    wSt9LastIndex : INT; (* D43 *)
    wSt7AbsValue : INT; (* D50 *)
    wSt7RelValue : INT; (* D52 *)
    wSt7Base : INT; (* D54 *)
    dwA1MoveDist : DINT;
    dwA1MoveSpeed : DINT;
    dwA1Step : DINT; (* D62 *)
    dwA2MoveDist : DINT;
    dwA2MoveSpeed : DINT;
    dwA2Step : DINT; (* D66 *)
    wA1MoveT : INT; (* D68 軸1位移時間 *)
    wA2MoveT : INT; (* D69 軸2位移時間 *)
    gA1IO : dsAxisIO;
    gA2IO : dsAxisIO;
    gSt1RotatoryFeeder : BOOL;
    gSt5RotatoryFeeder : BOOL;
    gEnStopCount : BOOL; (* M1000 Enable stop machine count *)
    UseSt2 : BOOL; (* M1002 *)
    UseSt3 : BOOL; (* M1003 *)
    UseSt4 : BOOL; (* M1004 *)
    UseSt5 : BOOL; (* M1005 *)
    UseSt6 : BOOL; (* M1006 *)
    UseSt7 : BOOL; (* M1007 *)
    UseSt8 : BOOL; (* M1008 *)
    UseSt9 : BOOL; (* M1009 *)
    gA1ZeroDone : BOOL;
    gA2ZeroDone : BOOL;
    gAllCylinderOff : BOOL;
    gA1InPos1 : BOOL;
    gA2InPos1 : BOOL;
    gAllHomeDone : BOOL; (* M76 *)
    gCanHomeInit : BOOL;
    gA1Abs : BOOL;
    gA1CanMove : BOOL;
    gA1InPos : BOOL;
    gA1Jog : BOOL;
    gA1JogDone : BOOL;
    gA1Move : BOOL;
    gA1MoveDone : BOOL; (* 2bit *)
    gA2Abs : BOOL;
    gA2CanMove : BOOL;
    gA2InPos : BOOL;
    gA2JogDone : BOOL;
    gA2Move : BOOL;
    gA2MoveDone : BOOL; (* 2bit *)
    gStopA1 : BOOL;
    gStopA2 : BOOL;
    gA1TouchLimit : BOOL;
    gA2TouchLimit : BOOL;
    gMoveA1Abs : BOOL;
    gMoveA2Abs : BOOL;
    uiA1StepP : BOOL; (* M218 *)
    uiA1StepN : BOOL; (* M219 *)
    uiA2StepP : BOOL; (* M220 *)
    uiA2StepN : BOOL; (* M221 *)
    uiA1JogP : BOOL; (* M222 *)
    uiA1JogN : BOOL; (* M223 *)
    uiA2JogP : BOOL; (* M224 *)
    uiA2JogN : BOOL; (* M225 *)
    uiA1MoveAbs : BOOL; (* M226 *)
    uiA2MoveAbs : BOOL; (* M227 *)
    uiLight : BOOL; (* M228 *)
    uiStopA1 : BOOL; (* M229 *)
    uiStopA2 : BOOL; (* M230 *)
    uiAllAxisZero : BOOL; (* M231 *)
    gAllAxisZero : BOOL; (* M232 *)
    gAllAxisZeroDone : BOOL; (* M233 *)
    gAllStCanCycle : BOOL; (* M234 *)
    uiGetSt3Angle : BOOL; (* M235 *)
    uiGetSt3Height : BOOL; (* M236 *)
    gSt3RotateSafe : BOOL; (* M237 *)
    manA1Zero : BOOL; (* M238 Servo Rotate *)
    manA2Zero : BOOL; (* M239 Step Up *)
    uiSt3ServoHome : BOOL; (* M240 *)
    uiSt3StepHome : BOOL; (* M241 *)
    gSt3StepSafe : BOOL; (* M242 *)
    uiSt3Feed : BOOL; (* M243 *)
    gSt3Feed : BOOL; (* M244 *)
    gSt3NextPos : BOOL; (* M245 *)
    uiGetSt3ToolChk : BOOL; (* M246 *)
    gWaitStopAuto : BOOL; (* M247 *)
    uiSt1Vacuum : BOOL; (* M248 *)
    uiSt5Air2 : BOOL; (* M249 *)
    gSt1Vacuum : BOOL; (* M250 *)
    gSt5Air2 : BOOL; (* M251 *)
    gSimulate : BOOL; (* M252 *)
    uiSt3GoSafeHeight : BOOL; (* M253 *)
    gSt3GoSafeHeight : BOOL; (* M254 *)
    uiResetAllSt : BOOL; (* M255 *)
    St3CanPick : BOOL; (* M256 *)
    gSt1CanPick : BOOL; (* M258 *)
    gSt5CanPick : BOOL; (* M259 *)
    gAllAxisCanMove : BOOL; (* M260 *)
    gRotateArrived : BOOL; (* M261 Rotate Table Arrived *)
    gBuzzerEnable : BOOL; (* M262 *)
    gClearTool : BOOL; (* M263 *)
    gAllStCycleDone : BOOL; (* M264 *)
    gCalcCycleTime : BOOL; (* M265 *)
    gTargetCounted : BOOL; (* M266 *)
    gAutoCanGoNext : BOOL; (* M267 *)
    manRotate : BOOL; (* M268 *)
    gSt1PF : BOOL; (* M269 *)
    gSt1LF : BOOL; (* M270 *)
    gSt5PF : BOOL; (* M271 *)
    gSt5LF : BOOL; (* M272 *)
    uiSt5VacuumBreak : BOOL; (* M273 *)
    gSt5VacuumBreak : BOOL; (* M274 *)
    St7ResultOK : BOOL; (* M275 *)
    uiSt5SquareVacuum : BOOL; (* M276 Zebra Square Vacuum *)
    gSt5SquareVacuum : BOOL; (* M277 *)
    St8NeedGet : BOOL;
    St8GetDone : BOOL;
    a1Speed : DINT;
    a2Speed : DINT;
    wAutoIdx : INT; (* 0 *)
    wCycleTime : DWORD; (* D150 *)
    wLastCycleTime : DWORD; (* D152 *)
    wDataArray : ARRAY[0..9] OF INT; (* D100 *)
    wAxisZeroIdx : INT; (* 0 *)
    tmrSysInit : TON; (* 0 *)
    gSt3NoTool : BOOL; (* 0 *)
    gSt3NoToolTO : BOOL; (* 0 *)
    tmrSt10Chk : TON; (* 0 *)
    gSt2HasTool : BOOL; (* 0 *)
    gSt4HasTool : BOOL; (* 0 *)
    tmrSt7WaitChk : TON;
    gSt3NextSide : INT; (* D56 St3下一個工件是1-正或2-反或0-還沒檢查 *)
    gSt3CurIsBackSide : BOOL;
    St8GoNg : BOOL; (* 0 *)
    gSt3StepGoPos : BOOL; (* 0 *)
    gClearDataArray : BOOL; (* 0 *)
    st7HasTool : BOOL; (* 0 *)
    st7ToolOk : BOOL; (* 0 *)
    St1PutDone : BOOL; (* 0 *)
    St3PutDone : BOOL; (* 0 *)
    St5PutDone : BOOL; (* 0 *)
    errDoorOpen : BOOL; (* F2 *)
    St2ContNG : BOOL;
    St3ContNG : BOOL;
    St4ContNG : BOOL;
    St7ContNG : BOOL;
    wSt2CountNG : INT;
    wSt3CountNG : INT;
    wSt4CountNG : INT;
    wSt7CountNG : INT;
    St3Done : BOOL; (* 0 *)
    St6Done : BOOL; (* 0 *)
    St7Done : BOOL; (* 0 *)
    St9Done : BOOL; (* 0 *)
    gSt3NeedCheck : BOOL; (* 0 *)
    gA2JogN : BOOL; (* 0 *)
    gA2JogP : BOOL; (* 0 *)
    St3NextPosCount : INT; (* 0 *)
    wPageIndex : INT;
    uiStReset : BOOL; (* 0 *)
    manSt1PF : BOOL; (* 0 *)
    manSt1LF : BOOL; (* 0 *)
END_VAR`;

const GLOBAL_IO = `VAR_GLOBAL
    xSt3ServoOrg : BOOL; (* X0 *)
    xSt3StepPL : BOOL; (* X1 *)
    xSt3StepOrg : BOOL; (* X2 *)
    xSt3StepNL : BOOL; (* X3 *)
    xSt3ServoReady : BOOL; (* X6 *)
    xSt3ServoALM : BOOL; (* X7 *)
    xIndexOrg : BOOL; (* X10 *)
    xIndexAct : BOOL; (* X11 *)
    xEmg : BOOL; (* X12 *)
    xSt1LF_FeedIn : BOOL; (* X13 *)
    xSt1LF_Full : BOOL; (* X14 *)
    xSt1DownOrg : BOOL; (* X15 *)
    xSt1DownAct : BOOL; (* X16 *)
    xSt1ForwardOrg : BOOL; (* X17 *)
    xSt1ForwardAct : BOOL; (* X20 *)
    xSt1ClampRotateAct : BOOL; (* X21 *)
    xSt1ClampRotateOrg : BOOL; (* X22 *)
    xSt1SeperateOrg : BOOL; (* X23 *)
    xSt1SeperateAct : BOOL; (* X24 *)
    xSt2Check : BOOL; (* X25 *)
    xSt3FeedIn : BOOL; (* X27 *)
    xSt3CheckUpDown : BOOL; (* X30 Check front and back of workpiece *)
    xSt3DownOrg : BOOL; (* X31 *)
    xSt3DownAct : BOOL; (* X32 *)
    xSt3ForwardOrg : BOOL; (* X33 *)
    xSt3ForwardAct : BOOL; (* X34 *)
    xSt3SuckOrg : BOOL; (* X35 *)
    xSt4Check : BOOL; (* X36 *)
    xSt5LF_FeedIn : BOOL; (* X37 *)
    xSt5LF_Full : BOOL; (* X40 *)
    xSt5CCDTrig : BOOL; (* X41 *)
    xSt7KeyenceOut1 : BOOL; (* X42 有料 *)
    xSt7KeyenceOut2 : BOOL; (* X43 正面(ok) *)
    xSt5DownOrg : BOOL; (* X44 *)
    xSt5DownAct : BOOL; (* X45 *)
    xSt5ForwardOrg : BOOL; (* X46 *)
    xSt5ForwardAct : BOOL; (* X47 *)
    xSt5SeperateOrg : BOOL; (* X50 *)
    xSt5SeperateAct : BOOL; (* X51 *)
    xSt6DownOrg : BOOL; (* X52 *)
    xSt6DownAct : BOOL; (* X53 *)
    xSt7DownOrg : BOOL; (* X54 *)
    xSt7DownAct : BOOL; (* X55 *)
    xSt8DownOrg : BOOL; (* X56 *)
    xSt8DownAct : BOOL; (* X57 *)
    xSt8ForwardOrg : BOOL; (* X60 *)
    xSt8ForwardAct : BOOL; (* X61 *)
    xSt9UpOrg : BOOL; (* X62 *)
    xSt9UpAct : BOOL; (* X63 *)
    xSt10Check : BOOL; (* X64 *)
    xFrontDoor : BOOL; (* X65 *)
    xBackDoor : BOOL; (* X66 *)
    xSt5SuckOrg : BOOL; (* X67 *)
    ySt3ServoPulse : BOOL; (* Y0 *)
    ySt3StepPulse : BOOL; (* Y1 *)
    ySt3ServoDir : BOOL; (* Y4 *)
    ySt3StepDir : BOOL; (* Y5 *)
    yIndex : BOOL; (* Y10 *)
    ySt1PF : BOOL; (* Y11 *)
    ySt1LF : BOOL; (* Y12 *)
    ySt1Down : BOOL; (* Y13 *)
    ySt1Forward : BOOL; (* Y14 *)
    ySt1Clamp : BOOL; (* Y15 *)
    ySt1ClampRotate : BOOL; (* Y16 *)
    ySt1Seperate : BOOL; (* Y17 *)
    ySt3Down : BOOL; (* Y20 *)
    ySt3Forward : BOOL; (* Y21 *)
    ySt3Suck : BOOL; (* Y22 *)
    ySt5PF : BOOL; (* Y23 *)
    ySt5LF : BOOL; (* Y24 *)
    ySt5Down : BOOL; (* Y25 *)
    ySt5Forward : BOOL; (* Y26 *)
    ySt5SquareVacuum : BOOL; (* Y27 *)
    ySt5Seperate : BOOL; (* Y30 *)
    ySt6Down : BOOL; (* Y31 *)
    ySt7Down : BOOL; (* Y32 *)
    ySt8Down : BOOL; (* Y33 *)
    ySt8Forward : BOOL; (* Y34 *)
    ySt8Clamp : BOOL; (* Y35 *)
    ySt9Up : BOOL; (* Y36 *)
    ySt9BlowAir : BOOL; (* Y37 *)
    ySt3Ccd1 : BOOL; (* Y44 *)
    ySt3Ccd2 : BOOL; (* Y45 *)
    yLight : BOOL; (* Y46 *)
    ySt3ServoServoOn : BOOL; (* Y52 *)
    ySt3ServoServoBrake : BOOL; (* Y53 *)
    ySt1Vacuum : BOOL; (* Y54 *)
    ySt5VacuumBreak : BOOL; (* Y55 *)
    ySt5Vacuum : BOOL; (* Y56 *)
END_VAR`;

const MAIN_PROGRAM = `PROGRAM Main
VAR
    calcA1Speed : BOOL;
    calcA2Speed : BOOL;
    a2HadDone : BOOL;
    axis2ZeroIdx : INT;
    axis1ZeroIdx : INT;
    tmpBool : BOOL;
    st3NextPosIdx : INT;
    manSt5PF : BOOL;
    manSt5LF : BOOL;
    st3StepGoPosIdx : INT;
    idx : INT;
    tmrWaitLetAxis2Down : TON;
END_VAR

    (* Init Area: Run only once when system starting up *)
    yLight := TRUE;
    sys.ManMode := TRUE;
    (* gCanChangePage := TRUE; *)
    
    ySt3ServoServoBrake := TRUE;
    ySt3ServoServoOn := TRUE;
    
    IF dwSt3Seperation = 0 THEN
        dwSt3Seperation := 4;
    END_IF;
    
    SM8049 := TRUE;

    (* Scan Code *)
    tmrSysInit(IN := SM8000, PT:= T#10s);
    
    sys.EMG := NOT xEmg OR F0;
    
    IF NOT tmrSysInit.Q THEN
        RETURN;
    END_IF;
     
    IF sys.EMG THEN
        gSt3NextSide := 0;
        gSt3NeedCheck := TRUE;
    END_IF;
    
    IF LDP(TRUE, sys.ManMode) THEN		
        St1PutDone := FALSE;
        St3Done := FALSE;
        St5PutDone := FALSE;
        St6Done := FALSE;
        St7Done := FALSE;
        St8GetDone := FALSE;
        St8NeedGet := FALSE;
        
        gSt1Seperate := FALSE;
        gSt5Seperate := FALSE;
        
        St8GetDone := FALSE;
    END_IF;
    
    ALTP(uiLight, yLight);
    
    gAutoCanGoNext := NOT sys.HasError;
    
    gCanChangePage := gAllStCanCycle;
    
    tmrSt10Chk(IN:=xSt10Check AND gRotateArrived, PT:=T#0.5s);
    IF gRotateArrived THEN
        IF tmrSt10Chk.Q THEN
            F3 := TRUE;
        END_IF;
    END_IF;
    
    IF ((uiStartAuto AND (NOT sys.AutoMode)) OR gClearTool) AND 
        NOT F3 THEN
        
        IF NOT sys.HasError AND 
            NOT gWaitStopAuto AND gAllStCanCycle AND 
            NOT F6 AND 
            NOT F7 THEN
            sys.AutoMode := TRUE;
            sys.ManMode := FALSE;
        END_IF;
    END_IF;
    
    gWaitStopAuto := sys.AutoMode AND uiStopAuto AND NOT gWaitStopAuto;
    gClearTool := gClearTool AND NOT (sys.AutoMode AND uiStopAuto);

    (*
    IF uiClearTool AND NOT F3 THEN
        IF CheckHasTool(wDataArray) THEN
            gClearTool := TRUE;
        END_IF;
    END_IF;
    *)
    
    gAllStCycleDone := 
        (NOT St1Cycle OR St1PutDone) AND 
        (NOT St3Cycle (* OR St3Done*)) AND
        (NOT St5Cycle OR St5PutDone) AND
        
        ((NOT UseSt6) OR 
        (UseSt6 AND NOT St6Cycle)) AND 
        
        NOT St7Cycle AND 
        (NOT St8NeedGet OR (St8NeedGet AND St8GetDone)) AND 
        NOT St9Cycle;
    
    gAllStCanCycle := 
        St1InOrg AND 
        St3InOrg AND 
        St5InOrg AND 
        
        ((NOT UseSt6) OR 
        (UseSt6 AND St6InOrg)) AND 
        
        (* St7InOrg AND *)
        St8InOrg AND 
        St9InOrg;
    
    (*
    gLight.Yellow := 
        F54 OR 
        F55 OR
        F56 OR
        F57;
    
    gLight.Green := 
        (sys.ManMode AND SM8013) OR 
        (sys.AutoMode);
    
    gLight.Red := 
        SM8013 AND (sys.EMG OR sys.HasError OR sys.HasWarning);
    *)
    
    gBuzzerEnable := NOT uiEnBuzzer;
    gLight.Buzzer := gBuzzerEnable AND 
        SM8013 AND (sys.HasWarning OR sys.HasError);
    
    IF manRotate THEN
        gRotate := TRUE;
        manRotate := FALSE;
    END_IF;
    
    IF LDP(TRUE, uiFeeder) THEN
        gSt1RotatoryFeeder := TRUE;
        gSt5RotatoryFeeder := TRUE;
        
        gSt3Feed := gAllAxisZeroDone AND gA1IO.xReady;
    END_IF;
    
    IF LDF(TRUE, uiFeeder) THEN
        gSt1RotatoryFeeder := FALSE;
        gSt5RotatoryFeeder := FALSE;
        gSt3Feed := FALSE;
            
        gSt1Vacuum := FALSE;
        gSt5SquareVacuum := FALSE;
    END_IF;
    
    IF gClearDataArray THEN
        FOR idx := 0 TO 9 BY 1 DO
            wDataArray[idx] := 0;
        END_FOR;
        gClearDataArray := FALSE;
    END_IF;

    (*
    RotateTable(
        iOrigPos:= xIndexOrg,
        iActPos:= xIndexAct,
        iRun:= gRotate AND (NOT sys.Error),
        iRotateTO:= wRotateTO,
        iInPosWaitTime:= wRotateOnPosWaitT,
        iReset := ResetAlarm,
        oDevice => yIndex);
        
    gRotate := FALSE;	
    gRotateArrived := RotateTable.oArrived;
    *)

    (* Cylinder function block calls here (omitted for brevity, assume similar structure) *)
    
END_PROGRAM`;

const FBS = [
    {
        id: 'fb_cylinder_0x1y',
        name: 'FbCylinder0x1y',
        type: 'function_block' as const,
        code: `FUNCTION_BLOCK FbCylinder0x1y
VAR_INPUT
    iAct : BOOL; (* Action Cmd *)
    iOnDelay : INT; (* Sensor On Delay *)
    iOffDelay : INT; (* Sensor Off Delay *)
END_VAR
VAR_OUTPUT
    oDevice : BOOL; (* Target Device *)
    oOn : BOOL;
    oOff : BOOL;
END_VAR
VAR
    tmrOnDelay : TON;
    tmrOffDelay : TON;
END_VAR

    oDevice := iAct;
    
    tmrOnDelay(IN := oDevice, PT := INT_TO_TIME(iOnDelay*10));
    oOn := tmrOnDelay.Q;
    
    tmrOffDelay(IN := NOT oDevice, PT := INT_TO_TIME(iOffDelay*10));
    oOff := tmrOffDelay.Q;

END_FUNCTION_BLOCK`
    },
    {
        id: 'fb_cylinder_1x1y',
        name: 'FbCylinder1x1y',
        type: 'function_block' as const,
        code: `FUNCTION_BLOCK FbCylinder1x1y
VAR_INPUT
    iAct : BOOL;
    iRst : BOOL;
    iOnDelay : INT;
    iOffDelay : INT;
    iOnTO : INT;
    iOffTO : INT;
    iLimit1 : BOOL;
END_VAR
VAR_OUTPUT
    oDevice : BOOL;
    oOn : BOOL;
    oOff : BOOL;
    oErr : BOOL;
    oErrId : INT;
END_VAR
VAR
    tmrOn : TON;
    tmrOff : TON;
    tmrOnDelay : TON;
    tmrOffDelay : TON;
END_VAR

    oDevice := iAct;
    
    tmrOn(IN := oDevice AND NOT iLimit1, PT:= INT_TO_TIME(iOnTO*10));
    tmrOff(IN := NOT oDevice AND iLimit1, PT:= INT_TO_TIME(iOffTO*10));
    
    IF iRst AND oErr THEN
      oErr := FALSE;
    END_IF;
    
    IF tmrOn.Q OR tmrOff.Q THEN
      oErr := TRUE;
    END_IF;
    
    IF oErr THEN
        IF tmrOff.Q THEN
            oErrId := 20;
        ELSIF tmrOn.Q THEN
            oErrId := 10;
        END_IF;
    ELSE	
        oErrId := 0;
    END_IF;
    
    tmrOnDelay(IN := oDevice AND iLimit1, PT := INT_TO_TIME(iOnDelay*10));
    oOn := tmrOnDelay.Q;
    
    tmrOffDelay(IN := NOT oDevice, PT := INT_TO_TIME(iOffDelay*10));
    oOff := tmrOffDelay.Q;

END_FUNCTION_BLOCK`
    },
    {
        id: 'fb_cylinder_2x1y',
        name: 'FbCylinder2x1y',
        type: 'function_block' as const,
        code: `FUNCTION_BLOCK FbCylinder2x1y
VAR_INPUT
    iAct : BOOL;
    iRst : BOOL;
    iOnDelay : INT;
    iOffDelay : INT;
    iOnTO : INT;
    iOffTO : INT;
    iLimit1 : BOOL;
    iLimit2 : BOOL;
END_VAR
VAR_OUTPUT
    oDevice : BOOL;
    oOn : BOOL;
    oOff : BOOL;
    oErr : BOOL;
    oErrId : INT;
END_VAR
VAR
    tmrOn : TON;
    tmrOff : TON;
    tmrErr : TON;
    tmrOnDelay : TON;
    tmrOffDelay : TON;
END_VAR

    oDevice := iAct;
    
    tmrOn(IN := oDevice AND NOT iLimit2, PT:= INT_TO_TIME(iOnTO * 10));
    tmrOff(IN := NOT oDevice AND NOT iLimit1, PT := INT_TO_TIME(iOffTO * 10));
    tmrErr(IN := iLimit1 AND iLimit2, PT := T#10s);
    
    IF iRst AND oErr THEN
       oErr := FALSE;
    END_IF;

    IF tmrOn.Q OR tmrOff.Q OR tmrErr.Q THEN
       oErr := TRUE;
    END_IF;
    
    IF (oErr) THEN
        IF tmrOn.Q THEN
            oErrId := 10;
        ELSIF  tmrOff.Q THEN
            oErrId := 20;
        END_IF;
        
        IF tmrErr.Q THEN
            oErrId := 30;
        END_IF;
    ELSE
        oErrId := 0;
    END_IF;
    
    tmrOnDelay(IN := oDevice AND iLimit2, PT := INT_TO_TIME(iOnDelay*10));
    oOn := tmrOnDelay.Q;
    
    tmrOffDelay(IN := NOT oDevice AND iLimit1, PT := INT_TO_TIME(iOffDelay*10));
    oOff := tmrOffDelay.Q;

END_FUNCTION_BLOCK`
    },
    {
        id: 'fb_rotate_table',
        name: 'FbRotateTable',
        type: 'function_block' as const,
        code: `FUNCTION_BLOCK FbRotateTable
VAR_INPUT
    iOrigPos : BOOL;
    iActPos : BOOL;
    iStop : BOOL;
    iRun : BOOL;
    iReset : BOOL;
    iRotateTO : INT;
    iInPosWaitTime : INT;
END_VAR
VAR_OUTPUT
    oDevice : BOOL;
    oBusy : BOOL;
    oErr : BOOL;
    oArrived : BOOL;
END_VAR
VAR
    rotating : BOOL;
    tmrWaitInPos : TON;
    inPos : BOOL;
    waitInPos : BOOL;
    arrived : BOOL;
    rotate : BOOL;
    reset : BOOL;
    tmrTimeOut : TON;
    tmp : BOOL;
END_VAR

    (* Logic based on sample, converted roughly *)
    IF iRun AND NOT rotate THEN
        rotate := TRUE;
    ELSE
        rotate := FALSE;
    END_IF;
    
    tmp := (NOT arrived) AND (NOT iStop) AND (rotate OR rotating);
    rotating := tmp;
    oDevice := (NOT oErr) AND tmp;
    
    reset := iReset;
    tmrTimeOut(IN := oDevice AND NOT reset, PT := INT_TO_TIME(iRotateTO * 100));
    
    oErr := NOT reset AND (tmrTimeOut.Q OR oErr);
    
    IF tmrWaitInPos.Q THEN 
       oArrived := TRUE;
    END_IF;
    
    IF rotate THEN
       oArrived := FALSE;
    END_IF;

END_FUNCTION_BLOCK`
    }
];


export const DEFAULT_PROJECT: ProgramProject = {
    id: 'project-default',
    name: '圓盤分度機',
    activeBlockId: 'main-program',
    blocks: [
        {
            id: 'global-vars',
            name: '全域變數',
            type: 'init',
            code: GLOBAL_VARS + '\n\n' + GLOBAL_IO,
            enabled: true
        },
        ...FBS.map(fb => ({
            ...fb,
            type: 'function-block' as const,
            enabled: true,
            parentId: undefined
        })),
        {
            id: 'main-program',
            name: '主程式',
            type: 'scan',
            code: MAIN_PROGRAM,
            scanInterval: 10,
            enabled: true
        }
    ]
};
