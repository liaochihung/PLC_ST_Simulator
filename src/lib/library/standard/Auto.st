VAR
    autoGoNext : BOOL;
    idx : INT;
    trigAutoMode : R_TRIG;
    trigSM8012 : R_TRIG;
END_VAR

    IF NOT tmrSysInit.Q THEN
        RETURN;
    END_IF; 
    
    IF NOT xBackDoor AND NOT ResetAlarm THEN
        errDoorOpen := TRUE;
    END_IF;
    
    trigAutoMode(CLK := sys.AutoMode);
    IF trigAutoMode.Q THEN
        wAutoIdx := 10;
        uiFeeder := TRUE;
    END_IF;
    
    IF NOT sys.AutoMode THEN
        RETURN;
    END_IF;
    
    trigSM8012(CLK := SM8012);
    IF NOT errDoorOpen THEN
        IF gCalcCycleTime AND trigSM8012.Q THEN
            wCycleTime := wCycleTime + 1;
        END_IF;
    END_IF;
    
    CASE wAutoIdx OF
    10:
        (* rotate plate *)
        gRotate := TRUE;
        gRotateArrived := FALSE;
        
        autoGoNext := TRUE;
    20:
        IF RotateTable.oBusy THEN
            gRotate := FALSE;
            
            (* shift data *)
            FOR idx := 1 TO 9 BY 1 DO
                wDataArray[10-idx] := wDataArray[9-idx];
            END_FOR;
            
            wDataArray[0] := 0;
            
            autoGoNext := TRUE;
        ELSIF RotateTable.oErr THEN
            wAutoIdx := NG_STEP;
        END_IF;
    30:
        (* index table rotating, check which station should act. *)
        (* station 1 *)
        IF NOT gClearTool THEN
            wDataArray[0] := 10;
            autoSt1Cycle := NOT gClearTool;
        END_IF;
        
        (* station 3 *)
        IF (wDataArray[2] = (20+ STEP_OK)) THEN
            autoSt3Cycle := TRUE;
        END_IF;
        
        (* station 5 *)
        IF wDataArray[4] = (40+STEP_OK) THEN
             autoSt5Cycle := TRUE;
        END_IF;
        
        autoGoNext := TRUE;
    40:
        (* index table arrived, check which station should act. *)
        IF gRotateArrived  THEN		
            (* station 6 *)
            IF wDataArray[5] = (50+STEP_OK) THEN
                IF UseSt6 THEN
                    autoSt6Cycle := TRUE;
                ELSE
                    wDataArray[5] := 60+STEP_OK;
                END_IF;
            END_IF;
                    
            (* station 8 - ok *)
            IF wDataArray[7] = (70+STEP_OK) OR St7ResultOK THEN
                St7ResultOK := FALSE;
                
                St8GetDone := FALSE;
                St8NeedGet := TRUE;
            ELSE
                St8NeedGet := FALSE;
            END_IF;
                    
            (* station 9 - ng *)
            IF (wDataArray[8] >= TOOL_NG) THEN
                autoSt9Cycle := TRUE;
            END_IF;
            
            autoGoNext := TRUE;
        END_IF;
    50:	
        IF gAllStCycleDone THEN
            
            IF St1PutDone THEN
                wDataArray[0] := 10+STEP_OK;
            END_IF;		
                    
            (* IF gSt2HasTool THEN *)
            IF xSt2Check THEN
                wDataArray[1] := 20+STEP_OK;
            END_IF;
            
            IF St3Done THEN			
                IF gSt3CurIsBackSide THEN
                    wDataArray[2] := 903;
                    wSt3CountNG := wSt3CountNG + 1;
                ELSE
                    wDataArray[2] := 30+STEP_OK;
                    wSt3CountNG := 0;
                END_IF;
                
                IF wSt3CountNG >= CONTINUS_NG_TARGET THEN
                    St3ContNG := TRUE;
                ELSE
                    St3ContNG := FALSE;
                END_IF;
                
                gSt3CurIsBackSide := FALSE;
            END_IF;
            
            (* station 4 *)
            IF (wDataArray[3] = (30+STEP_OK)) THEN
                (* IF gSt4HasTool THEN *)
                IF xSt4Check THEN
                    wDataArray[3] := 40+STEP_OK;
                    wSt4CountNG := 0;
                ELSE
                    wDataArray[3] := 904;
                    wSt4CountNG := wSt4CountNG + 1;
                END_IF;
            
                IF wSt4CountNG >= CONTINUS_NG_TARGET THEN
                    St4ContNG := TRUE;
                ELSE
                    St4ContNG := FALSE;
                END_IF;
            END_IF;
            
            IF St5PutDone THEN
                wDataArray[4] := 50+STEP_OK;
            END_IF;
            
            IF St6Done THEN
                wDataArray[5] := 60+STEP_OK;
            END_IF;
        
            (* station 7 *)
            IF (wDataArray[6] = (60+STEP_OK)) THEN
                IF st7HasTool AND st7ToolOk THEN
                    St7ResultOK := TRUE;
                ELSE
                    St7ResultOK := FALSE;
                END_IF;
                
                IF St7ResultOK THEN
                    wDataArray[6] := 70+STEP_OK;
                    wSt7CountNG := 0;
                ELSE
                    wDataArray[6] := 907;
                    wSt7CountNG := wSt7CountNG + 1;
                END_IF;
            
                IF wSt7CountNG >= CONTINUS_NG_TARGET THEN
                    St7ContNG := TRUE;
                ELSE
                    St7ContNG := FALSE;
                END_IF;
            END_IF;
        
            IF St8GetDone THEN
                wDataArray[7] := 0;
                wProductOkCount := wProductOkCount + 1;
                wTotalOkCnt := wTotalOkCnt + 1;
            END_IF;
            
            IF St9Done THEN
                wDataArray[8] := 0;
                wProductNgCount := wProductNgCount + 1;
            END_IF;
            
            St1PutDone := FALSE;
            St3Done := FALSE;
            St5PutDone := FALSE;
            St6Done := FALSE;
            St7Done := FALSE;
            St8GetDone := FALSE;
            St9Done := FALSE;		
            St8NeedGet := FALSE;
            
            IF gEnStopCount THEN
                IF wProductOkCount >= wStopMachineNumber THEN
                    gTargetCounted := TRUE;
                    gWaitStopAuto := TRUE;
                END_IF;
            END_IF;
            
            IF gClearTool THEN
                IF CheckHasTool(wDataArray) = FALSE THEN
                    gClearTool := FALSE;
                    gWaitStopAuto := TRUE;
                END_IF;
            END_IF;
            
            wAutoIdx := 60;
        END_IF;	(* all cycle done *)
    60:
        (* non resident and non target counted *)
        IF (NOT F3) AND 
            (NOT F4) AND 
            NOT St3ContNG AND 
            NOT St4ContNG AND 
            NOT St7ContNG THEN
            
            IF NOT gWaitStopAuto THEN
                wAutoIdx := 10;
            ELSE
                wAutoIdx := OK_STEP;
            END_IF;
        END_IF;
    END_CASE;
    
    IF St8NeedGet AND (NOT St8GetDone) AND gRotateArrived AND (NOT St8Cycle) THEN
        autoSt8Cycle := TRUE;
    END_IF;
    
    IF wAutoIdx = OK_STEP THEN
        wAutoIdx := 0;
        sys.AutoMode := FALSE;
        sys.ManMode := TRUE;
        gWaitStopAuto := FALSE;
        uiFeeder := FALSE;	
        
        gClearTool := FALSE;
        
    ELSIF wAutoIdx = NG_STEP THEN
        IF gAutoCanGoNext THEN
            wAutoIdx := 0;
        END_IF;
    END_IF;
    
    IF autoGoNext THEN
        IF gAutoCanGoNext THEN
            wAutoIdx := wAutoIdx + 10;
            autoGoNext := FALSE;
        END_IF;
    END_IF;
