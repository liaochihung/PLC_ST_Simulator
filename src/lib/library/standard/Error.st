
    IF NOT tmrSysInit.Q THEN
        RETURN;
    END_IF;
    
    ResetAlarm := uiResetAlarm;
    (* BKRSTP(ResetAlarm, 100, F0); *) 
    (* Replaced BKRSTP with TODO or explicit reset if crucial *)
    IF ResetAlarm THEN
       (* Mock clearing F0..100 *)
       F0 := FALSE;
       F1 := FALSE; 
       (* ... *)
    END_IF;
    
    sys.HasError :=
        F0 OR
        F1 OR
        (* F2 *)
        errDoorOpen OR
        (* F3 OR *)
        F4 OR 
        F5 OR
        F6 OR
        F7 
        ;
    
    sys.HasWarning := SM8048;
    
    IF sys.EMG THEN
        sys.AutoMode := FALSE;
        sys.ManMode := TRUE;
        gWaitStopAuto := FALSE;
        gClearTool := FALSE;
        
        gSt1RotatoryFeeder := FALSE;
        gSt5RotatoryFeeder := FALSE;
        gSt3Feed := FALSE;
            
        gSt1Vacuum := FALSE;
        uiFeeder := FALSE;
        
        St1Cycle := FALSE;
        St3Cycle := FALSE;
        St5Cycle := FALSE;
        St6Cycle := FALSE;
        St7Cycle := FALSE;
        St8Cycle := FALSE;
        St9Cycle := FALSE;
        
        gAllAxisZeroDone := FALSE;
    END_IF;
    
    IF ResetAlarm THEN
        IF St2ContNG THEN
            wSt2CountNG := 0;
        END_IF;
        
        IF St3ContNG THEN
            wSt3CountNG := 0;
        END_IF;
        
        IF St4ContNG THEN
            wSt4CountNG := 0;
        END_IF;
        
        IF St7ContNG THEN
            wSt7CountNG := 0;
        END_IF;
            
        St3ContNG := FALSE;
        St4ContNG := FALSE;
        St7ContNG := FALSE;
    ELSE
        IF F58 THEN St3ContNG := TRUE; END_IF;
        IF F59 THEN St4ContNG := TRUE; END_IF;
        IF F63 THEN St7ContNG := TRUE; END_IF;
        
        IF F0 THEN sys.EMG := TRUE; END_IF;
        IF F1 THEN RotateTable.oErr := TRUE; END_IF;
        
        IF gEnStopCount AND gTargetCounted THEN
            F4 := TRUE;
            gTargetCounted := FALSE;
        END_IF;
        
        IF NOT X26 THEN F5 := TRUE; END_IF;
        IF NOT gA1ZeroDone THEN F6 := TRUE; END_IF;
        IF NOT gA2ZeroDone THEN F7 := TRUE; END_IF;
        
        IF cySt1Down.oErr THEN
            IF cySt1Down.oErrId = ErrCyOn THEN F10 := TRUE; END_IF;
            IF cySt1Down.oErrId = ErrCyOff THEN F11 := TRUE; END_IF;
            IF cySt1Down.oErrId = ErrCyBoth THEN F12 := TRUE; END_IF;
        END_IF;
    
        (* ... more Cylinder error mapping ... *)
    END_IF;
