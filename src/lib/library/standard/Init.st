
    yLight := TRUE;
    sys.ManMode := TRUE;
    (* gCanChangePage := TRUE; *)
    
    ySt3ServoServoBrake := TRUE;
    ySt3ServoServoOn := TRUE;
    
    IF dwSt3Seperation = 0 THEN
        dwSt3Seperation := 4;
    END_IF;
    
    SM8049 := TRUE;
