import { useState, useCallback, useRef, useEffect } from 'react';
import { Interpreter } from '@/lib/runtime/Interpreter';
import { VariableSymbol } from '@/lib/runtime/SymbolTable';
import { TON } from '@/lib/runtime/StandardFBs';

// UI Types (Compatible with VariableMonitor)
export interface Variable {
  name: string;
  type: string;
  value: string | number | boolean | object;
  address?: string;
}

export interface Timer {
  name: string;
  PT: number;
  ET: number;
  IN: boolean;
  Q: boolean;
  startTime?: number; // Not used in new generic TON but kept for UI
}

export interface Counter {
  name: string;
  PV: number;
  CV: number;
  CU: boolean;
  CD: boolean;
  R: boolean;
  Q: boolean;
}

interface Station {
  id: number;
  name: string;
  type: 'feed' | 'assembly' | 'ok' | 'ng';
  angle: number;
  active: boolean;
  hasProduct: boolean;
}

interface Product {
  stationId: number;
  status: 'pending' | 'ok' | 'ng';
}

const DEFAULT_STATIONS: Station[] = [
  { id: 1, name: '進料', type: 'feed', angle: 0, active: false, hasProduct: false },
  { id: 2, name: '組裝1', type: 'assembly', angle: 300, active: false, hasProduct: false },
  { id: 3, name: '組裝2', type: 'assembly', angle: 240, active: false, hasProduct: false },
  { id: 4, name: '檢測', type: 'assembly', angle: 180, active: false, hasProduct: false },
  { id: 5, name: 'OK出料', type: 'ok', angle: 120, active: false, hasProduct: false },
  { id: 6, name: 'NG出料', type: 'ng', angle: 60, active: false, hasProduct: false },
];

export function useSimulator() {
  const [interpreter] = useState<Interpreter>(() => new Interpreter());
  const [isRunning, setIsRunning] = useState(false);
  const [scanTime, setScanTime] = useState(100);
  const [cycleCount, setCycleCount] = useState(0);
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Variable States for UI
  const [variables, setVariables] = useState<Map<string, Variable>>(new Map());
  const [timers, setTimers] = useState<Map<string, Timer>>(new Map());
  const [counters, setCounters] = useState<Map<string, Counter>>(new Map());

  // Machine state
  const [stations, setStations] = useState<Station[]>(DEFAULT_STATIONS);
  const [discAngle, setDiscAngle] = useState(0);
  const [feederActive, setFeederActive] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Sync state from Symbol Table to UI Maps
  const syncStateFromInterpreter = useCallback(() => {
    const newVars = new Map<string, Variable>();
    const newTimers = new Map<string, Timer>();
    const newCounters = new Map<string, Counter>();

    const globalVars = interpreter.symbolTable.getGlobalVariables();

    globalVars.forEach((symbol: VariableSymbol, name: string) => {
      const type = symbol.type;

      if (type === 'TON' || type === 'TOF' || type === 'TP') {
        const val = symbol.value as TON; // Assuming TON structure for now
        if (val && typeof val === 'object') {
          newTimers.set(name, {
            name,
            PT: val.inputs?.PT ?? 0,
            ET: val.outputs?.ET ?? 0,
            IN: val.inputs?.IN ?? false,
            Q: val.outputs?.Q ?? false
          });
        }
      }
      else if (type === 'CTU' || type === 'CTD' || type === 'CTUD') {
        // TODO: Implement Counter support in Runtime
        // Placeholder
        newCounters.set(name, {
          name,
          PV: 0, CV: 0, CU: false, CD: false, R: false, Q: false
        });
      }
      else {
        // Standard Variable
        newVars.set(name, {
          name,
          type,
          value: symbol.value,
          address: symbol.address
        });
      }
    });

    setVariables(newVars);
    setTimers(newTimers);
    setCounters(newCounters);
  }, [interpreter]);

  // Initialize interpreter with code
  const loadCode = useCallback((newCode: string) => {
    setCode(newCode);
    setError(null);

    try {
      interpreter.reset();
      interpreter.loadCode(newCode); // New API
      syncStateFromInterpreter();
    } catch (e) {
      // Don't clear code on parse error, just show error
      // console.error(e);
      setError(e instanceof Error ? e.message : 'Parse error');
    }
  }, [interpreter, syncStateFromInterpreter]);

  // Stop simulation
  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    interpreter.stop();
    setIsRunning(false);
  }, [interpreter]);

  // Execute one scan cycle
  const executeCycle = useCallback(() => {
    try {
      interpreter.executeScan(); // New API: no args
      setCycleCount(prev => prev + 1);

      // Sync variables to UI
      syncStateFromInterpreter();

      // Update machine visualization based on PLC variables
      // Use helper to safely get value (0 or false if missing)
      const getVar = (name: string) => interpreter.symbolTable.get(name);

      const currentStation = getVar('CurrentStation') ?? 1;
      const indexing = getVar('Indexing') ?? false;
      const feederOn = getVar('FeederOn') ?? false;

      setFeederActive(feederOn);

      // Update stations
      setStations(prev => prev.map(station => ({
        ...station,
        active: station.id === currentStation ||
          (station.type === 'feed' && feederOn) ||
          getVar(`Station${station.id}Active`) === true
      })));

      // Handle disc rotation when indexing (逆時針旋轉)
      if (indexing) {
        setDiscAngle(prev => (prev - 1 + 360) % 360);
      }

      // Check for errors (Interpreter typically throws, but if we add error state later)
      // if (interpreter.state.error) ... 

    } catch (e) {
      setError(e instanceof Error ? e.message : 'Runtime error');
      stop();
    }
  }, [interpreter, syncStateFromInterpreter, stop]);

  // Start simulation
  const start = useCallback(() => {
    if (!code.trim()) {
      setError('請先輸入 ST 程式碼');
      return;
    }

    try {
      interpreter.reset();
      interpreter.loadCode(code);
      interpreter.start();
      setIsRunning(true);
      setError(null);

      syncStateFromInterpreter();

      intervalRef.current = setInterval(() => {
        executeCycle();
      }, scanTime);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Start error');
    }
  }, [code, interpreter, scanTime, executeCycle, syncStateFromInterpreter]);



  // Reset simulation
  const reset = useCallback(() => {
    stop();
    interpreter.reset();
    setCycleCount(0);
    setDiscAngle(0);
    setFeederActive(false);
    setProducts([]);
    setStations(DEFAULT_STATIONS);
    setError(null);
    setVariables(new Map());
    setTimers(new Map());
    setCounters(new Map());

    // Re-parse variables
    if (code.trim()) {
      try {
        interpreter.loadCode(code);
        syncStateFromInterpreter();
      } catch (e) {
        // Ignore parse errors on reset
      }
    }
  }, [code, interpreter, stop, syncStateFromInterpreter]);

  // Single step
  const step = useCallback(() => {
    if (isRunning) return;

    if (!interpreter.isRunning) { // check if started
      try {
        interpreter.reset();
        interpreter.loadCode(code);
        interpreter.start();
        setIsRunning(true); // Temporarily true? Or just started state?
        // Actually step usually implies run one cycle then pause.
        // If not running, we start it first.
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Parse error');
        return;
      }
    }

    executeCycle();
    // If we want "step" to just run one cycle and stay paused:
    if (isRunning) stop(); // If it was running, pause it? No, step usually means "next instruction" or "next cycle".
    // Here we define step as "Execute one scan".
    // If strictly "Step", we might not want to set isRunning=true globally if it wasn't.
    // user expectation: click step -> executes once -> visualization updates.

  }, [code, interpreter, isRunning, executeCycle, stop]);

  // Update scan time
  const updateScanTime = useCallback((time: number) => {
    setScanTime(time);

    if (isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        executeCycle();
      }, time);
    }
  }, [isRunning, executeCycle]);

  // Set variable value (for manual input)
  const setVariable = useCallback((name: string, value: string | number | boolean | object) => {
    try {
      interpreter.symbolTable.set(name, value);
      syncStateFromInterpreter(); // Update UI immediately
    } catch (e) {
      console.error(e);
    }
  }, [interpreter, syncStateFromInterpreter]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    // State
    interpreter, // Expose raw interpreter if needed, though mostly internal now
    variables,
    timers,
    counters,
    isRunning,
    scanTime,
    cycleCount,
    code,
    error,
    stations,
    discAngle,
    feederActive,
    products,

    // Actions
    loadCode,
    setCode: loadCode,
    start,
    stop,
    reset,
    step,
    setScanTime: updateScanTime,
    setVariable,
  };
}
