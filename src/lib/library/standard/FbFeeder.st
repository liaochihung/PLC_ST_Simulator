FUNCTION_BLOCK FbFeeder
    VAR_INPUT
        iAct : BOOL;
        iFull : BOOL;
        iArrived : BOOL;
        iFullOnT : INT;
        iFullOffT : INT;
        iArrivedOnT : INT;
        iSupplyTO : INT;
        iArriveTO : INT;
    END_VAR
    VAR_OUTPUT
        oFeeder : BOOL;
        oLinearFeeder : BOOL;
        oCanPick : BOOL;
        oNeedSupply : BOOL;
        oArriveTO : BOOL;
    END_VAR
    VAR
        tmrArrivedOn : TON;
        tmrFullOn : TON;
        tmrNeedSupply : TON;
        tmrFullOff : TON;
        tmrArriveTO : TON;
        
        (* Edge helpers *)
        trigFullOff : R_TRIG;
        trigFullOn : R_TRIG;
    END_VAR

    oLinearFeeder := iAct;

    tmrArriveTO(
        IN := iAct AND NOT iArrived,
        PT := INT_TO_TIME(iArriveTO*100));

    tmrArrivedOn(
        IN := iAct AND iArrived,
        PT := INT_TO_TIME(iArrivedOnT*100));

    oCanPick := iAct AND tmrArrivedOn.Q;

    tmrFullOn(
        IN := iAct AND iFull,
        PT := INT_TO_TIME(iFullOnT*100));
        
    tmrFullOff(
        IN := iAct AND NOT iFull,
        PT := INT_TO_TIME(iFullOffT*100));

    (* Calculate edges *)
    trigFullOff(CLK := tmrFullOff.Q);
    trigFullOn(CLK := tmrFullOn.Q);

    IF iAct THEN
        IF trigFullOff.Q THEN
            oFeeder := TRUE; (* SET *)
        END_IF;
        
        IF trigFullOn.Q THEN
            oFeeder := FALSE; (* RST *)
        END_IF;
    ELSE
        oFeeder := FALSE; (* RST *)
    END_IF;

    tmrNeedSupply(
        IN := iAct AND oFeeder,
        PT := INT_TO_TIME(iSupplyTO*100));

    oNeedSupply := iAct AND tmrNeedSupply.Q AND (NOT tmrFullOn.Q);
        
    oArriveTO := tmrArriveTO.Q;

END_FUNCTION_BLOCK
