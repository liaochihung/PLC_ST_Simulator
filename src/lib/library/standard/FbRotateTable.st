FUNCTION_BLOCK FbRotateTable
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
        
        (* Edge detection helpers *)
        trigRun : R_TRIG;
        trigOrigPos : R_TRIG;
    END_VAR

    (* Pre-calculate edges *)
    trigRun(CLK := iRun);
    rotate := trigRun.Q;
    trigOrigPos(CLK := iOrigPos);
    
    tmp := (NOT arrived) AND (NOT iStop) AND (rotate OR rotating);
    rotating := tmp;
    
    (* oDevice output calculation *)
    IF (NOT oErr) AND tmp THEN
        oDevice := TRUE;
    ELSE
        oDevice := FALSE;
    END_IF;

    reset := iReset;
    tmrTimeOut(IN := oDevice AND NOT reset, PT := INT_TO_TIME(iRotateTO * 100)); // Sample says *100? Assuming ms base
    
    IF NOT reset AND (tmrTimeOut.Q OR oErr) THEN
        oErr := TRUE;
    ELSE
        (* Manual Reset logic might be needed if strictly following Latching logic, 
           but here oErr := ... is assignment. 
           Sample has oErr := ... (OR oErr), which is self-holding. 
           In ST assignment: oErr := ... OR oErr works as hold. *)
         oErr := NOT reset AND (tmrTimeOut.Q OR oErr);
    END_IF;

    inPos := (NOT tmrWaitInPos.Q AND NOT iStop) OR ((rotating AND trigOrigPos.Q) OR inPos);
    
    waitInPos := (NOT tmrWaitInPos.Q) AND (((NOT iStop) OR ((rotating AND trigOrigPos.Q) OR inPos)) OR waitInPos);

    tmrWaitInPos(IN:= ((inPos AND waitInPos) OR arrived) AND NOT iStop AND NOT tmrWaitInPos.Q, PT := INT_TO_TIME(iInPosWaittime));

    arrived := ((inPos AND waitInPos) OR arrived) AND NOT iStop AND NOT tmrWaitInPos.Q;

    oBusy := rotating AND NOT arrived;

    (* SET/RST translations *)
    IF tmrWaitInPos.Q THEN
        oArrived := TRUE;
    END_IF;
    
    IF trigRun.Q THEN
        oArrived := FALSE;
    END_IF;

END_FUNCTION_BLOCK
