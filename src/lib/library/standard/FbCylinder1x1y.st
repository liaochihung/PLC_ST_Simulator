FUNCTION_BLOCK FbCylinder1x1y
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

END_FUNCTION_BLOCK
