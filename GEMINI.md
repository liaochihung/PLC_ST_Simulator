## Project Overview

This is a web-based PLC (Programmable Logic Controller) simulator for the IEC 61131-3 Structured Text (ST) language. It's built with React, Vite, and TypeScript, featuring a user interface constructed with shadcn/ui components.

The core of the application is a custom-built parser and interpreter for ST, located in `src/lib/st-parser.ts`. This module handles tokenizing, parsing, and executing ST code. It supports basic variable declarations, assignments, conditional statements (IF), loops (FOR, WHILE), and timers.

The main simulation logic is managed by the `useSimulator` hook (`src/hooks/useSimulator.ts`), which orchestrates the state of the simulated machine (a rotary indexing table with multiple stations) and the execution of the ST program. The frontend provides a code editor, simulation controls, and a visualization of the machine.

## Building and Running

1.  **Install dependencies:**
    ```bash
    npm install
    ```
    (Note: A `bun.lockb` file is present, so `bun install` can also be used if Bun is your preferred package manager.)

2.  **Run the development server:**
    This command starts a local server, typically on `http://localhost:8080`.
    ```bash
    npm run dev
    ```

3.  **Build for production:**
    This command bundles the application for deployment.
    ```bash
    npm run build
    ```

4.  **Lint the code:**
    This command runs ESLint to check for code quality and style issues.
    ```bash
    npm run lint
    ```

## Development Conventions

*   **Tech Stack:** React, Vite, TypeScript.
*   **UI:** The project uses `shadcn/ui` for its component library.
*   **State Management:** Application state, particularly for the simulator, is managed within custom React hooks (e.g., `useSimulator`). `react-query` is used for data fetching, although the primary logic is client-side.
*   **Code Style:** Code is formatted according to rules enforced by ESLint. The project uses path aliases, with `@` resolving to the `src` directory.
*   **File Structure:** The `src` directory is organized by feature/type:
    *   `components/`: React components, including UI elements.
    *   `hooks/`: Custom React hooks for stateful logic.
    *   `lib/`: Core application logic, like the ST parser (`st-parser.ts`) and utilities.
    *   `pages/`: Top-level page components.
*   **Core Logic:** The ST language interpreter is the heart of the application. Any changes to the simulation behavior or supported ST features should likely start in `src/lib/st-parser.ts` and `src/hooks/useSimulator.ts`.
