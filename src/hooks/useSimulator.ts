import { useState, useCallback, useRef, useEffect } from 'react';
import { STInterpreter, createInterpreter } from '@/lib/st-parser';

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
  { id: 2, name: '組裝1', type: 'assembly', angle: 60, active: false, hasProduct: false },
  { id: 3, name: '組裝2', type: 'assembly', angle: 120, active: false, hasProduct: false },
  { id: 4, name: '檢測', type: 'assembly', angle: 180, active: false, hasProduct: false },
  { id: 5, name: 'OK出料', type: 'ok', angle: 240, active: false, hasProduct: false },
  { id: 6, name: 'NG出料', type: 'ng', angle: 300, active: false, hasProduct: false },
];

export function useSimulator() {
  const [interpreter] = useState<STInterpreter>(() => createInterpreter());
  const [isRunning, setIsRunning] = useState(false);
  const [scanTime, setScanTime] = useState(100);
  const [cycleCount, setCycleCount] = useState(0);
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  // Machine state
  const [stations, setStations] = useState<Station[]>(DEFAULT_STATIONS);
  const [discAngle, setDiscAngle] = useState(0);
  const [feederActive, setFeederActive] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize interpreter with code
  const loadCode = useCallback((newCode: string) => {
    setCode(newCode);
    setError(null);
    
    try {
      interpreter.reset();
      interpreter.parseVariables(newCode);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Parse error');
    }
  }, [interpreter]);

  // Execute one scan cycle
  const executeCycle = useCallback(() => {
    try {
      interpreter.executeScan(code);
      setCycleCount(prev => prev + 1);

      // Update machine visualization based on PLC variables
      const currentStation = interpreter.getVariable('CurrentStation') ?? 1;
      const indexing = interpreter.getVariable('Indexing') ?? false;
      const feederOn = interpreter.getVariable('FeederOn') ?? false;
      
      setFeederActive(feederOn);
      
      // Update stations
      setStations(prev => prev.map(station => ({
        ...station,
        active: station.id === currentStation || 
                (station.type === 'feed' && feederOn) ||
                interpreter.getVariable(`Station${station.id}Active`) === true
      })));

      // Handle disc rotation when indexing
      if (indexing) {
        setDiscAngle(prev => (prev + 1) % 360);
      }

      // Check for errors
      if (interpreter.state.error) {
        setError(interpreter.state.error);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Runtime error');
      stop();
    }
  }, [code, interpreter]);

  // Start simulation
  const start = useCallback(() => {
    if (!code.trim()) {
      setError('請先輸入 ST 程式碼');
      return;
    }

    try {
      interpreter.reset();
      interpreter.parseVariables(code);
      interpreter.start();
      setIsRunning(true);
      setError(null);

      intervalRef.current = setInterval(() => {
        executeCycle();
      }, scanTime);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Start error');
    }
  }, [code, interpreter, scanTime, executeCycle]);

  // Stop simulation
  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    interpreter.stop();
    setIsRunning(false);
  }, [interpreter]);

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
    
    // Re-parse variables
    if (code.trim()) {
      try {
        interpreter.parseVariables(code);
      } catch (e) {
        // Ignore parse errors on reset
      }
    }
  }, [code, interpreter, stop]);

  // Single step
  const step = useCallback(() => {
    if (isRunning) return;
    
    if (!interpreter.state.running) {
      try {
        interpreter.parseVariables(code);
        interpreter.start();
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Parse error');
        return;
      }
    }
    
    executeCycle();
  }, [code, interpreter, isRunning, executeCycle]);

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
  const setVariable = useCallback((name: string, value: any) => {
    interpreter.setInput(name, value);
  }, [interpreter]);

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
    interpreter,
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
