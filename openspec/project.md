# Project Context

## Purpose
Web-based PLC (Programmable Logic Controller) simulator for the IEC 61131-3 Structured Text (ST) language. 

**主要目標：**
- 提供互動式的 ST 語言學習與測試環境
- 模擬真實 PLC 運行環境（以旋轉分度台為範例）
- 支援即時編輯、執行與視覺化回饋

## Tech Stack
- **Core Framework:** React + Vite + TypeScript
- **UI Components:** shadcn/ui (基於 Radix UI)
- **State Management:** Custom React Hooks（主要邏輯在 `useSimulator`）
- **Code Editor:** Monaco Editor（用於 ST 程式碼編輯）
- **Data Fetching:** react-query（雖然目前主要是 client-side 邏輯）
- **Package Manager:** pnpm（主要）/ npm / bun

## Project Conventions

### Code Style
- **Formatting:** ESLint 規則強制執行
- **Path Aliases:** `@` 解析至 `src/` 目錄
- **命名慣例：**
  - Components: PascalCase (e.g., `MachineToolbox.tsx`)
  - Hooks: camelCase with `use` prefix (e.g., `useSimulator.ts`)
  - Files: kebab-case for utilities, PascalCase for components
- **Import 順序:** 外部套件 → 內部 components → hooks → lib → types

### Architecture Patterns
- **Component-Based:** React functional components + hooks
- **Custom Hooks for State:** 業務邏輯封裝於自訂 hooks（如 `useSimulator`）
- **Parser/Interpreter Pattern:** ST 語言解析與執行分離於 `st-parser.ts`
- **File Structure:**
  ```
  src/
  ├── components/   # React UI components
  ├── hooks/        # Custom stateful logic
  ├── lib/          # Core logic (ST parser, utilities)
  ├── pages/        # Top-level page components
  └── types/        # TypeScript type definitions
  ```

### Testing Strategy
- 目前主要透過 ESLint 進行代碼品質檢查
- **Future TODO:** 為 ST parser 與 simulator 邏輯加入單元測試

### Git Workflow
- **Main Branch:** 主要開發分支
- **Commit Conventions:** 建議使用語意化提交訊息（feat/fix/refactor/docs）
- **OpenSpec Integration:** 功能開發前需建立 change proposal

## Domain Context

### IEC 61131-3 Structured Text (ST)
- PLC 標準程式語言之一
- 類似 Pascal 的語法結構
- 支援變數宣告、賦值、條件、迴圈、計時器等基本控制元素

### 核心概念：
- **Tokenizer:** 將 ST 源碼分解為 tokens
- **Parser:** 建立抽象語法樹（AST）
- **Interpreter:** 執行 AST 並更新狀態
- **Simulation Loop:** 週期性執行 ST 程式並更新機器狀態

### 模擬場景：
- **旋轉分度台（Rotary Indexing Table）**
- 多工位（Stations）協同作業
- Sensors/Actuators 狀態追蹤

## Important Constraints
- **Browser-Only:** 純前端應用，無後端依賴（目前）
- **ST Language Subset:** 僅支援基本 ST 語法，非完整 IEC 61131-3 實作
- **Performance:** 模擬循環需保持在合理頻率（避免阻塞 UI）

## External Dependencies
- **shadcn/ui:** UI component library
- **Monaco Editor:** 程式碼編輯器（如使用）
- **Vite:** Build tool and dev server
