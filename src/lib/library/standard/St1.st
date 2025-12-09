VAR
    canGoNext : BOOL;
    goNext : BOOL;
    goNg : BOOL;
END_VAR

    (* Station 1 Logic *)
    IF St1Cycle THEN   
    
        IF wSt1Index = OK_STEP THEN
            St1Cycle := FALSE;
            wSt1Index := 0;
            
        ELSIF wSt1Index = NG_STEP THEN
            IF canGoNext THEN			
                wSt1Index := wSt1LastIndex;
                wSt1LastIndex := 0;
            END_IF;
        END_IF;
    
        IF sys.AutoMode THEN
            IF gSt1CanPick AND NOT gSt1Seperate THEN
                gSt1Seperate := TRUE;
            END_IF;
        END_IF;
        
        CASE wSt1Index OF
        10:
            IF sys.AutoMode THEN
                wDataArray[0] := 10 + STEP_BUSY;
            END_IF;
            IF NOT F54 THEN
                IF gSt1CanPick OR sys.ManMode THEN
                    gSt1Seperate := TRUE;
                END_IF;
            END_IF;
            
            IF cySt1Seperate.oOn THEN
                goNext := TRUE;
            ELSIF cySt1Seperate.oErr THEN
                gSt1Seperate := FALSE;
                goNg := TRUE;
            END_IF;		
        20:
            gSt1Down := TRUE;
            
            IF cySt1Down.oOn THEN
                goNext := TRUE;
            ELSIF cySt1Down.oErr THEN
                gSt1Down := FALSE;
                goNg := TRUE;
            END_IF;
        30:
            gSt1Clamp := TRUE;
            IF cySt1Clamp.oOn THEN
                gSt1Vacuum := FALSE;			
                goNext := TRUE;
            END_IF;
        40:	(* up *)
            gSt1Down := FALSE;
            IF cySt1Down.oOff THEN
                gSt1Seperate := FALSE;
                goNext := TRUE;
            ELSIF cySt1Down.oErr THEN
                goNg := TRUE;
            END_IF;
        50:	(* rotate, forward *)
            gSt1ClampRotate := TRUE;
            gSt1Forward := TRUE;
            IF cySt1ClampRotate.oOn THEN
                goNext := TRUE;
            ELSIF cySt1ClampRotate.oErr THEN
                gSt1Forward := FALSE;
                goNg := TRUE;
            END_IF;
        60:	(* forward *)
            goNext := TRUE;		
            gSt1Forward := TRUE;
             
            IF cySt1Forward.oOn THEN
                goNext := TRUE;
            ELSIF cySt1Forward.oErr THEN
                gSt1Forward := FALSE;
                goNg := TRUE;
            END_IF;
            
        70:	(* down *)
            IF sys.ManMode THEN
                gSt1Down := TRUE;
            ELSIF sys.AutoMode THEN
                IF gRotateArrived THEN gSt1Down := TRUE; END_IF;
            END_IF;
            
            IF cySt1Down.oOn THEN
                goNext := TRUE;
            ELSIF cySt1Down.oErr THEN
                gSt1Down := FALSE;
                goNg := TRUE;
            END_IF;
        80:	(* clamp off *)
            gSt1Clamp := FALSE;
            IF cySt1Clamp.oOff THEN goNext := TRUE; END_IF;
            
        90:	(* up *)
            gSt1Down := FALSE;
            IF cySt1Down.oOff THEN
                St1PutDone := TRUE;
                goNext := TRUE;
            ELSIF cySt1Down.oErr THEN
                goNg := TRUE;
            END_IF;
        100: (* back *)
            gSt1Forward := FALSE;
            gSt1ClampRotate := FALSE;		
            
            IF cySt1Forward.oOff AND cySt1ClampRotate.oOff THEN
                goNext := TRUE;
            ELSIF cySt1Forward.oErr THEN
                goNg := TRUE;
            END_IF;
        110:
            wSt1Index := OK_STEP;	
        END_CASE;
    
        IF goNg THEN
            wSt1LastIndex := wSt1Index;
            wSt1Index := NG_STEP;
            goNg := FALSE;
        END_IF;
        
        IF goNext AND canGoNext THEN
            wSt1Index := wSt1Index + 10;
            goNext := FALSE;
        END_IF;
    END_IF;
    
    St1InOrg := 
        cySt1Down.oOff AND
        cySt1Forward.oOff AND
        cySt1Clamp.oOff AND
        cySt1ClampRotate.oOff AND
        SM8000;
    
    canGoNext := 
        NOT sys.HasError AND
        NOT cySt1Down.oErr AND
        NOT cySt1Forward.oErr AND
        NOT cySt1ClampRotate.oErr AND
        NOT cySt1Seperate.oErr AND
        SM8000;
