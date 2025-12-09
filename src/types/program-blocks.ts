import { MachineLayout } from './machine-editor';

// 程式區塊類型定義
export type BlockType = 'init' | 'scan' | 'subroutine' | 'function-block' | 'data-type' | 'global-var';

export type ScanInterval = 10 | 50 | 100 | 500 | 1000;

export interface ProgramBlock {
  id: string;
  name: string;
  type: BlockType;
  code: string;
  scanInterval?: ScanInterval; // 只有 scan 類型需要
  enabled: boolean;
  children?: ProgramBlock[]; // 子程式
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

// 預設區塊模板
export const DEFAULT_INIT_CODE = `(* 初始化區塊 - 僅在啟動時執行一次 *)
(* Initialization Block - Executes once on startup *)

(* 初始化變數 *)
PartCount := 0;
OKCount := 0;
NGCount := 0;
CurrentStation := 1;
MachineRunning := FALSE;

(* 初始化計時器 *)
IndexTimer(IN := FALSE, PT := T#200ms);
StationTimer(IN := FALSE, PT := T#500ms);
FeederTimer(IN := FALSE, PT := T#100ms);
`;

export const DEFAULT_MAIN_SCAN_CODE = `(* 主掃描區塊 - 100ms 週期 *)
(* Main Scan Block - 100ms cycle *)

(* 啟動/停止控制 *)
IF StartButton AND NOT StopButton THEN
    MachineRunning := TRUE;
END_IF;

IF StopButton THEN
    MachineRunning := FALSE;
END_IF;

(* 呼叫子程式 *)
(* CALL StationControl; *)
(* CALL OutputControl; *)
`;

export const DEFAULT_STATION_CONTROL_CODE = `(* 站點控制子程式 *)
(* Station Control Subroutine *)

IF MachineRunning THEN
    CASE CurrentStation OF
        1: (* 進料站 *)
            Station1Active := TRUE;
            Station2Active := FALSE;
            Station3Active := FALSE;
            Station4Active := FALSE;
            
            IF FeederSensor THEN
                PartCount := PartCount + 1;
                CurrentStation := 2;
            END_IF;
            
        2: (* 組裝站1 *)
            Station1Active := FALSE;
            Station2Active := TRUE;
            CurrentStation := 3;
            
        3: (* 組裝站2 *)
            Station2Active := FALSE;
            Station3Active := TRUE;
            CurrentStation := 4;
            
        4: (* 檢測站 *)
            Station3Active := FALSE;
            Station4Active := TRUE;
            
            IF InspectionResult THEN
                CurrentStation := 5;
                OKCount := OKCount + 1;
            ELSE
                CurrentStation := 6;
                NGCount := NGCount + 1;
            END_IF;
            
        5: (* OK出料 *)
            Station4Active := FALSE;
            OKOutput := TRUE;
            CurrentStation := 1;
            
        6: (* NG出料 *)
            Station4Active := FALSE;
            NGOutput := TRUE;
            CurrentStation := 1;
    END_CASE;
END_IF;
`;

export const DEFAULT_FAST_SCAN_CODE = `(* 快速掃描區塊 - 10ms 週期 *)
(* Fast Scan Block - 10ms cycle *)

(* 高速輸入處理 *)
(* 緊急停止、高速計數器等 *)

IF EmergencyStop THEN
    MachineRunning := FALSE;
    FeederOn := FALSE;
    Indexing := FALSE;
END_IF;
`;

export const DEFAULT_SLOW_SCAN_CODE = `(* 慢速掃描區塊 - 1000ms 週期 *)
(* Slow Scan Block - 1000ms cycle *)

(* 狀態監控、通訊處理等 *)
(* 更新 HMI 顯示資料 *)

TotalPartCount := PartCount;
TotalOKCount := OKCount;
TotalNGCount := NGCount;
YieldRate := (OKCount * 100) / (PartCount + 1);
`;

// 建立預設專案
export function createDefaultProject(): ProgramProject {
  return {
    id: 'project-1',
    name: '圓盤分度機',
    activeBlockId: 'main-scan',
    blocks: [
      {
        id: 'init',
        name: '初始化',
        type: 'init',
        code: DEFAULT_INIT_CODE,
        enabled: true,
      },
      {
        id: 'fast-scan',
        name: '快速掃描',
        type: 'scan',
        code: DEFAULT_FAST_SCAN_CODE,
        scanInterval: 10,
        enabled: true,
      },
      {
        id: 'main-scan',
        name: '主掃描',
        type: 'scan',
        code: DEFAULT_MAIN_SCAN_CODE,
        scanInterval: 100,
        enabled: true,
        children: [
          {
            id: 'station-control',
            name: '站點控制',
            type: 'subroutine',
            code: DEFAULT_STATION_CONTROL_CODE,
            enabled: true,
            parentId: 'main-scan',
          },
        ],
      },
      {
        id: 'slow-scan',
        name: '慢速掃描',
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
    case 'data-type': return '資料型別';
    case 'global-var': return '全域變數';
    case 'init': return '初始化';
    case 'scan': return '掃描區塊';
    case 'subroutine': return '子程式';
    case 'function-block': return '功能塊';
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
