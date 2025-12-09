FUNCTION_BLOCK FbAxisAbs
    VAR_INPUT
        iAct : BOOL;
        iAxisNo : INT;
        iSpeed : INT;
        iStop : BOOL;
        iDest : DINT;
    END_VAR
    VAR_OUTPUT
        oBusy : BOOL;
        oDone : BOOL;
        oErr : BOOL;
    END_VAR
    VAR
        done : BOOL;
        (* Mock Logic *)
        tmrDelay : TON;
    END_VAR

    (* Mock Implementation *)
    IF iAct AND NOT oBusy AND NOT oDone THEN
        oBusy := TRUE;
        oErr := FALSE;
    END_IF;

    IF oBusy THEN
        tmrDelay(IN := TRUE, PT := T#500ms);
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
