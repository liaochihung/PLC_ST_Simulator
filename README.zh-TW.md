# PLC ST Simulator - IEC 61131-3 結構化文本模擬器(Work in Progress)

一個基於 Web 的專業 IEC 61131-3 結構化文本 (ST) PLC 程式模擬器。支援 2D/3D 機台動畫視覺化，特別適用於自動化設備（如圓盤分度機、震動送料機等）的程式開發與邏輯測試。

## 📸 專案截圖 (Screenshots)

[![主介面](./doc/screenshot%20-%201.jpeg)](./doc/screenshots.md)

**[查看更多截圖內容](./doc/screenshots.md)**

---

## 🚀 快速開始 (Quick Start)

本專案建議使用 **pnpm** 作為套件管理工具。

### 步驟 1: 複製專案
```sh
git clone <YOUR_GIT_URL>
cd PLC_ST_Simulator
```

### 步驟 2: 安裝依賴
```sh
pnpm install
```

### 步驟 3: 啟動開發伺服器
```sh
pnpm run dev
```

---

## 🛠️ 技術棧 (Technology Stack)

- **Vite** - 極速的前端開發工具與構建工具。
- **TypeScript** - 靜態型別開發。
- **React** - UI 庫。
- **shadcn-ui** - 優質的 UI 組件庫。
- **Tailwind CSS** - 實用的 CSS 框架。
- **Konva / PixiJS** - 用於 2D/3D 動畫視覺化呈現。
- **Monaco Editor** - 改編自 VS Code 的強力程式碼編輯器。

---

## 📖 程式範例 (Code Samples)

`doc/sample` 目錄包含了一個三菱 FX5U PLC 範例專案，使用結構化文本 (ST) 編寫：

- **`function-block-libaray(fx5u).html`**: **功能塊庫 (FB Library)**。定義了 Cylinder, RotateTable, Feeder, Axis 等硬體控制組件，作為底層硬體抽象層。
- **`fx5u-sample.html`**: **主程式 (Main Program)**。調用 FB 庫實現多工站自動機邏輯，包含初始化、主掃描循環（自動/手動模式）、錯誤處理及詳細的工站順序邏輯。

---

## 📄 授權 (License)

MIT License.
