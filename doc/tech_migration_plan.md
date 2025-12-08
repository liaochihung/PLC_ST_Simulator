# Tech Migration Plan: Fuxa to React/Konva

## 1. Executive Summary
This document outlines the plan to adapt architectural concepts and UX patterns from the Fuxa SCADA editor (Angular/SVG) to our current PLC Simulator `MachineView` (React/Konva). The goal is to enhance the editor capabilities (Drag & Drop, Grouping, Property Editing) while maintaining our modern tech stack.

## 2. Architecture Comparison

| Feature | Fuxa (Source) | PLC_ST_Simulator (Target) | Migration Strategy |
| :--- | :--- | :--- | :--- |
| **Framework** | Angular 16 | React (Vite) | Retain React. Port logic patterns, not code. |
| **Rendering** | SVG (DOM-based) | Canvas (Konva) | **State**: Use React State/Zustand.<br>**Interaction**: Use standard Konva events. |
| **Editor Engine** | Custom `svg-editor` (Modified SVG-Edit) | `react-konva` | Use `Konva.Transformer` for resize/rotate (superior perfs). |
| **Data Storage** | Node/Express (JSON Files) | Browser LocalStorage / API | Keep current storage. Fuxa's server logic is irrelevant for UI interactive logic. |
| **Communication** | HTTP (Save/Load Project) | N/A (Currently Local) | N/A for now. |

## 3. Core Features to Migrate (UX Patterns)

### 3.1 Layout Architecture
**Fuxa Pattern**: 3-Pane Layout
1.  **Left (Resources)**: Toolbox, View List, Asset Library.
2.  **Center (Workspace)**: The infinite canvas.
3.  **Right (Properties)**: Context-sensitive property panel.

**Recommendation**:
Adopts this layout. It is standard for graphical editors.
*   **Action**: Create a `MainLayout` component ensuring the Center Canvas handles drop events from the Left Panel.

### 3.2 State Management (The "Thick Client")
Fuxa maintains a heavy client-side state (`editor.component.ts`). We have mirrored this using **React Context** (`MachineContext`) to manage:
*   `selectedElements`: Array of currently selected items.
*   `nodes`: The array of all shapes/components.
*   `history`: Undo/Redo stack.

### 3.3 Visual Editing (Resize/Move/Rotate)
*   **Fuxa**: Calculates SVG path changes manually in JS.
*   **Konva**: **DO NOT** copy Fuxa's math. Use `<Transformer>` component from `react-konva`. It handles resizing and rotation out-of-the-box with better performance.

### 3.4 Property Panel (Context-Aware)
**Fuxa Pattern**: The Right Panel changes based on selection (e.g., showing "Radius" for Circle, "Tag" for Gauge).
**Migration**: 
*   Create a `SelectionContext`.
*   The `PropertyPanel` component subscribes to `selectedIds`.
*   If `selectedIds.length === 1`, render the specific form for that component type.
*   If `selectedIds.length > 1`, render bulk actions (Align, Group, Delete).

### 3.5 Grouping & Hierarchy
**Fuxa Pattern**: SVG `<g>` elements.
**Migration**: 
*   Konva `<Group>` is the direct equivalent.
*   **Challenge**: Transforming (Resizing) a Group in Konva can be tricky (scaling children vs resizing children).
*   **Decision**: Start with *Scaling* group behavior (easiest/standard Konva behavior).

## 4. Implementation Phase Plan

### Phase 1: Foundation & Layout
- [x] Refactor `Index.tsx` / `MachineView` into the 3-Pane Layout.
- [x] Implement `SelectionManager` (Store/Context) to track `selectedId`.
    - Implemented as `MachineContext` (lifting state from `useMachineEditor`).
- [x] Implement `PropertyPanel` placeholder that reads `selectedId`.
    - Updated to read from `MachineContext`.

### Phase 2: Basic Interaction
- [x] Integrate `<Transformer>` attached to the selected node.
    - Implemented in `KonvaRenderer.tsx` using `Konva.Transformer` and `onTransformEnd` handling in `KonvaStation/Disc/etc`.
- [x] Implement "Drag from Toolbox" -> "Drop on Canvas" flow.
    - Implemented via `ComponentPalette` (drag start) and `KonvaRenderer` (onDrop) executing `addStation/Disc/etc`.
    -   *Tech*: HTML5 Drag API (Start) -> Konva `onDrop` (End).
    -   *Tech*: HTML5 Drag API (Start) -> Konva `onDrop` (End).

### Phase 2.5: Fuxa Toolbox & Data Structure
- [ ] **Data Structure Integration**:
    -   Modify `ProgramProject` to include `visualDesign: { layout: MachineLayout }`.
    -   Update `MachineContext` to sync with the main project store.
- [ ] **Left Panel Restructuring**:
    -   Implement Tabbed Left Panel (`Explorer` vs `Toolbox`).
    -   Create `MachineToolbox` with Accordion categories:
        -   **Machine** (Station, Disc...)
        -   **Shapes** (Rect, Circle...)
        -   **Controls** (Placeholder: Button, Switch...)
        -   **Widgets** (Placeholder: Gauge, Chart...)
- [ ] **Migration**:
    -   Move drag-and-drop logic from `ComponentPalette` to `MachineToolbox`.
    -   Remove floating `ComponentPalette` from Center Panel.
- [ ] Implement **Grouping**:
    -   Select multiple -> Command to wrap in `<Group>`.
    -   Ungroup -> Flatten children to parent layer.
- [ ] Implement **Z-Index** controls (Bring to Front/Send to Back).
- [ ] Implement **Alignment** tools (Align Left/Top/Center).

### Phase 4: Data Binding
- [ ] Connect component properties (e.g., "Color", "Rotation") to ST Variables.
- [ ] Ensure specific components (Pilot Light, Motor) expose their custom properties to the panel.
