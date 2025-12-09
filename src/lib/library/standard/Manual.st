
    IF (NOT tmrSysInit.Q) OR sys.EMG OR (NOT sys.ManMode) THEN
        RETURN;
    END_IF;
    
    (* DMOV substitutions - assuming standard assignments work for now *)
    wProductOkCount := 0;
    wProductNgCount := 0;
    wTotalOkCnt := 0;
    
    IF uiResetAllSt THEN
        uiSt1Reset := TRUE;
        uiSt3Reset := TRUE;
        uiSt5Reset := TRUE;
        uiSt6Reset := TRUE;
        uiSt7Reset := TRUE;
        uiSt8Reset := TRUE;
        uiSt9Reset := TRUE;
    END_IF;
    
    CASE wPageIndex OF 
    11:
        IF NOT St1Cycle THEN
            (* ALTP replacement with IFs if needed, or assume ALTP is supported/mocked *)
            (* ALTP in Manual usually means button toggle. *)
            (* ALTP(M50 AND cySt1Seperate.oOn, gSt1Down); *)
        END_IF;	
        uiSt1Reset := uiStReset;
    13:
        IF NOT St3Cycle THEN
            (* Mock ALTPs *)
        END_IF;
        
    END_CASE;
    
    (* can change page *)
    M81 := 
        (wPageIndex=11 AND St1Cycle) OR 
        (wPageIndex=13 AND St3Cycle) OR 	
        SM8001;
    
    IF uiSt1Reset THEN
        gSt1Down := FALSE;
        gSt1Forward := FALSE;
        gSt1Clamp := FALSE;
        gSt1ClampRotate := FALSE;
        gSt1Seperate := FALSE;
            
        St1Cycle := FALSE;
            
        manSt1PF := FALSE;
        manSt1LF := FALSE;
        gSt1PF := FALSE;
        gSt1LF := FALSE;
        gSt1Vacuum := FALSE;
            
        uiSt1Reset := FALSE;
    END_IF;
    
    IF uiSt3Reset THEN
        gSt3Down := FALSE;
        gSt3Forward := FALSE;
        gSt3Suck := FALSE;
        gSt3GoSafeHeight := FALSE;
            
        St3Cycle := FALSE;
            
        gSt3Feed := FALSE;
        uiSt3Reset := FALSE;
    END_IF;
