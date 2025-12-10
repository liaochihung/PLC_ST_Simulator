import { MachineLayout } from './machine-editor';

// Program Block Type Definitions
export type BlockType = 'init' | 'scan' | 'subroutine' | 'function-block' | 'data-type' | 'global-var';

export type ScanInterval = 10 | 50 | 100 | 500 | 1000;

export interface ProgramBlock {
  id: string;
  name: string;
  type: BlockType;
  code: string;
  scanInterval?: ScanInterval; // Only required for scan type
  enabled: boolean;
  children?: ProgramBlock[]; // Subroutines
  parentId?: string | null;
}

export interface ProgramProject {
  id: string;
  name: string;
  blocks: ProgramBlock[];
  activeBlockId: string | null;
  visualDesign?: {
    layout: MachineLayout;
    views?: any[];
  }
}

// Default block templates
export const DEFAULT_INIT_CODE = `(* Initialization Block - Executes once on startup *)

(* Initialize Variables *)
PartCount := 0;
OKCount := 0;
NGCount := 0;
CurrentStation := 1;
MachineRunning := FALSE;

(* Initialize Timers *)
IndexTimer(IN := FALSE, PT := T#200ms);
StationTimer(IN := FALSE, PT := T#500ms);
FeederTimer(IN := FALSE, PT := T#100ms);
`;

export const DEFAULT_MAIN_SCAN_CODE = `(* Main Scan Block - 100ms cycle *)

(* Start/Stop Control *)
IF StartButton AND NOT StopButton THEN
    MachineRunning := TRUE;
END_IF;

IF StopButton THEN
    MachineRunning := FALSE;
END_IF;

(* Call Subroutines *)
(* CALL StationControl; *)
(* CALL OutputControl; *)
`;

export const DEFAULT_STATION_CONTROL_CODE = `(* Station Control Subroutine *)

IF MachineRunning THEN
    CASE CurrentStation OF
        1: (* Feed Station *)
            Station1Active := TRUE;
            Station2Active := FALSE;
            Station3Active := FALSE;
            Station4Active := FALSE;
            
            IF FeederSensor THEN
                PartCount := PartCount + 1;
                CurrentStation := 2;
            END_IF;
            
        2: (* Assembly Station 1 *)
            Station1Active := FALSE;
            Station2Active := TRUE;
            CurrentStation := 3;
            
        3: (* Assembly Station 2 *)
            Station2Active := FALSE;
            Station3Active := TRUE;
            CurrentStation := 4;
            
        4: (* Inspection Station *)
            Station3Active := FALSE;
            Station4Active := TRUE;
            
            IF InspectionResult THEN
                CurrentStation := 5;
                OKCount := OKCount + 1;
            ELSE
                CurrentStation := 6;
                NGCount := NGCount + 1;
            END_IF;
            
        5: (* OK Outfeed *)
            Station4Active := FALSE;
            OKOutput := TRUE;
            CurrentStation := 1;
            
        6: (* NG Outfeed *)
            Station4Active := FALSE;
            NGOutput := TRUE;
            CurrentStation := 1;
    END_CASE;
END_IF;
`;

export const DEFAULT_FAST_SCAN_CODE = `(* Fast Scan Block - 10ms cycle *)

(* High Speed Input Processing *)
(* Emergency Stop, High Speed Counters, etc. *)

IF EmergencyStop THEN
    MachineRunning := FALSE;
    FeederOn := FALSE;
    Indexing := FALSE;
END_IF;
`;

export const DEFAULT_SLOW_SCAN_CODE = `(* Slow Scan Block - 1000ms cycle *)

(* Status Monitoring, Communication Processing, etc. *)
(* Update HMI Display Data *)

TotalPartCount := PartCount;
TotalOKCount := OKCount;
TotalNGCount := NGCount;
YieldRate := (OKCount * 100) / (PartCount + 1);
`;

// Create default project
export function createDefaultProject(): ProgramProject {
  return {
    id: 'project-1',
    name: 'Rotary Indexing Machine',
    activeBlockId: 'main-scan',
    blocks: [
      {
        id: 'init',
        name: 'Initialization',
        type: 'init',
        code: DEFAULT_INIT_CODE,
        enabled: true,
      },
      {
        id: 'fast-scan',
        name: 'Fast Scan',
        type: 'scan',
        code: DEFAULT_FAST_SCAN_CODE,
        scanInterval: 10,
        enabled: true,
      },
      {
        id: 'main-scan',
        name: 'Main Scan',
        type: 'scan',
        code: DEFAULT_MAIN_SCAN_CODE,
        scanInterval: 100,
        enabled: true,
        children: [
          {
            id: 'station-control',
            name: 'Station Control',
            type: 'subroutine',
            code: DEFAULT_STATION_CONTROL_CODE,
            enabled: true,
            parentId: 'main-scan',
          },
        ],
      },
      {
        id: 'slow-scan',
        name: 'Slow Scan',
        type: 'scan',
        code: DEFAULT_SLOW_SCAN_CODE,
        scanInterval: 1000,
        enabled: true,
      },
    ],
  };
}

// 取得區塊類型顯示名稱
export function getBlockTypeName(type: BlockType): string {
  switch (type) {
    case 'data-type': return 'Data Type';
    case 'global-var': return 'Global Var';
    case 'init': return 'Init';
    case 'scan': return 'Scan';
    case 'subroutine': return 'Subroutine';
    case 'function-block': return 'Function Block';
  }
}

// 取得區塊類型圖示顏色
export function getBlockTypeColor(type: BlockType): string {
  switch (type) {
    case 'data-type': return 'text-purple-500';
    case 'global-var': return 'text-orange-500';
    case 'init': return 'text-station-feed';
    case 'scan': return 'text-primary';
    case 'subroutine': return 'text-station-assembly';
    case 'function-block': return 'text-chart-4';
  }
}
