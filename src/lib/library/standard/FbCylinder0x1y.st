FUNCTION_BLOCK FbCylinder0x1y
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

END_FUNCTION_BLOCK
