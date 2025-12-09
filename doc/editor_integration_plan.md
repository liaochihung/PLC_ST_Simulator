# Machine State Editor Integration Plan (Konva Native)

**Objective**: Build a native "Visio-like" visual editor using `react-konva` for the PLC Simulator, replacing the previously attempted `react-design-editor` integration.

## Motivation
The previous attempt to integrate a legacy React 16 editor into our React 19 codebase proved too unstable due to dependency conflicts (Antd v3, old React APIs, build system mismatches). Building a lightweight native editor offers better performance, type safety, and maintainability.

## Target Functionality
1.  **Canvas**: Infinite (or large fixed) workspace with grid background, zooming, and panning.
2.  **Basic Shapes**: Rectangle, Circle, Text.
3.  **Interaction**:
    *   Select/Multi-select.
    *   Move (Drag & Drop).
    *   Resize (using Transformer).
    *   Rotate.
4.  **Properties Panel**: A side panel to edit properties of selected items (Dimensions, Color, **PLC Tag Binding**).
5.  **Persistence**: Save/Load layout to JSON.

## Architectural Design

### 1. State Management (Zustand)
We will use a dedicated Zustand store `useEditorStore` to manage the ephemeral editor state.

```typescript
interface EditorState {
  elements: EditorElement[]; // { id, type, x, y, rotation, scaleX, scaleY, fill, ...customProps }
  selectedIds: string[];
  history: EditorElement[][]; // Simple undo/redo stack
  canvasConfig: { scale: number, position: { x: number, y: number } };
  actions: {
    addElement: (type: string) => void;
    updateElement: (id: string, attrs: Partial<EditorElement>) => void;
    selectElement: (id: string, meta: boolean) => void; // meta = multi-select
    deleteSelected: () => void;
    // ...
  }
}
```

### 2. Components
*   `EditorLayout`: Main container (Sidebar Left, Canvas Middle, Property Right).
*   `EditorCanvas`: Wraps `react-konva` Stage.
    *   `GridLayer`: Renders grid lines.
    *   `ContentLayer`: Renders `elements.map`.
    *   `SelectionLayer`: Renders `<Transformer>` attached to selected nodes.
*   `PropertyPanel`: Uses `shadcn/ui` inputs to modify the selected element's state.

### 3. PLC Binding
The core value prop. Each element will have a `plcTag` property.
-   **Static**: Basic shape rendering.
-   **Dynamic (Runtime)**: The `MachineSimulator` will read the JSON, find elements with `plcTag`, and override their properties (e.g., `fill`, `opacity`, `rotation`) based on the current PLC variable value.

## Implementation Steps

1.  **Cleanup**: Remove failed integration files (Done).
2.  **Scaffolding**: Create `src/components/machine-editor-v2/` and store.
3.  **Canvas & Shapes**: Implement basic drawing and transformation.
4.  **Properties**: Implement the property panel.
5.  **Integration**: Replace the old editor route with this new one.

