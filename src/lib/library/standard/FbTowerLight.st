FUNCTION_BLOCK FbTowerLight
    VAR_INPUT
        // iStatus : dsSysStatus; (* STRUCT not fully supported in simple string parse unless defined *)
        iStopBuzzer : BOOL;
    END_VAR
    VAR_OUTPUT
        // oLights : dsTowerLight;
        hasErr : BOOL;
    END_VAR
    VAR
        keepStopBuzzer : BOOL;
    END_VAR

    (* Mock logic since structs are tricky in this simple setup *)
    hasErr := FALSE;

END_FUNCTION_BLOCK
