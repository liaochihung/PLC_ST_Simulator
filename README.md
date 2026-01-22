# PLC ST Simulator - IEC 61131-3 Structured Text Simulator (Work in Progress)

[繁體中文 (Traditional Chinese)](./README.zh-TW.md)

A web-based IEC 61131-3 Structured Text (ST) PLC simulator. It supports 2D/3D machine animation visualization, specifically designed for automation equipment like rotary indexing modules, vibratory feeders, and multi-station machines.

## 📸 Screenshots

[![Main Interface](./doc/screenshot%20-%201.jpeg)](./doc/screenshots.md)

**[View more screenshots here](./doc/screenshots.md)**

---

## 🚀 Quick Start

This project uses **pnpm** as the package manager.

### Step 1: Clone the repository
```sh
git clone <YOUR_GIT_URL>
cd PLC_ST_Simulator
```

### Step 2: Install dependencies
```sh
pnpm install
```

### Step 3: Start development server
```sh
pnpm run dev
```

---

## 🛠️ Technology Stack

- **Vite** - Next generation frontend tooling.
- **TypeScript** - For type-safe development.
- **React** - Frontend UI library.
- **shadcn-ui** - High-quality accessible UI components.
- **Tailwind CSS** - Utility-first CSS framework.
- **Konva / PixiJS** - For 2D/3D animation visualization.
- **Monaco Editor** - Powerful code editor (same as VS Code).

---

## 📖 Code Samples

The `doc/sample` directory contains a Mitsubishi FX5U PLC example project written in Structured Text (ST):

- **`function-block-libaray(fx5u).html`**: **Function Block Library (FB Library)**. Defines hardware control components like Cylinder, RotateTable, Feeder, and Axis as the low-level abstraction layer.
- **`fx5u-sample.html`**: **Main Program**. Orchestrates multi-station automation logic, including initialization, main scan cycle (Auto/Manual modes), error handling, and detailed station sequence logic.

---

## 📄 License

MIT License.
