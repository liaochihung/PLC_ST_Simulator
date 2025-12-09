FUNCTION_BLOCK FbAxisZero
    VAR_INPUT
        iAct : BOOL;
        iAxisNo : INT; (* WORD/Bit String 16 *)
        iHomeSpeed : INT;
        iApproachSpeed : INT;
        iStop : BOOL;
    END_VAR
    VAR_OUTPUT
        oBusy : BOOL;
        oDone : BOOL;
        oErr : BOOL;
    END_VAR
    VAR
        done : BOOL;
        (* Mock Logic *)
        step : INT := 0;
        tmrDelay : TON;
    END_VAR

    (* Mock Implementation *)
    IF iAct AND NOT oBusy AND NOT oDone THEN
        oBusy := TRUE;
        oErr := FALSE;
        step := 1;
    END_IF;

    IF oBusy THEN
        tmrDelay(IN := TRUE, PT := T#1s);
        IF tmrDelay.Q THEN
            oBusy := FALSE;
            oDone := TRUE;
            tmrDelay(IN := FALSE);
        END_IF;
    ELSE
        tmrDelay(IN := FALSE);
    END_IF;

    IF NOT iAct THEN
        oDone := FALSE;
    END_IF;

END_FUNCTION_BLOCK
