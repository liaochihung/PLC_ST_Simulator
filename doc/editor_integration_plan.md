# Machine State Editor Integration Plan

**Objective**: Replace the current custom-built/raw-SVG `MachineEditor` with a separate, Fabric.js-based editor to provide robust layout capabilities (grid snapping, grouping, zooming) and maintainability.

**Target Implementation**: Integration of `react-design-editor` (based on Fabric.js).
**Repository**: `https://github.com/salgum1114/react-design-editor`

## 1. Architectural Philosophy: Separation of Concerns

We will adopt a strict separation between **Editing** and **Runtime**:

*   **Editor's Role**: A purely static layout generator using Fabric.js. It handles user interactions (drawing, resizing, grouping, aligning) and outputs a `Layout Config` (JSON) and/or `SVG Output`.
*   **Simulator's Role**: The runtime consumer. It reads the `Layout Config` (or SVG) and applies dynamic updates based on `PLC Data`.
*   **The Bridge**: Standardized "Custom Attributes" in Fabric.js objects (e.g., `data-plc-tag`, `data-animation-type`) that bind the static shape to a dynamic PLC variable.

## 2. Integration Strategy: "The Super Component"

Instead of rewriting our current code, we will treat the open-source editor as a self-contained "Super Component" imported into our project.

### Phase 1: Preparation & Scaffolding
- [ ] **Dependency Check**: Install `fabric` (Version 5.x recommended for compatibility), `ant-design` (often used by these editors), and other specific deps from the target repo.
- [ ] **Directory Structure**: Create `src/components/external-editor/` to house the imported codebase.
- [ ] **Isolation**: Ensure the imported editor's styles (often global CSS) do not break our `shadcn/ui` styles. Use CSS Modules or specific scoping.
- [ ] **Clean Up**: Remove the previous `naresh-khatri` npm package if unused.

### Phase 2: Core Integration
- [ ] **Code Ingestion**: Clone `react-design-editor` and copy its `src` content into `src/components/external-editor/`.
- [ ] **Mounting**: Create a wrapper component `<WrapperEditor />` and mount it inside our `/machine-editor` route.
- [ ] **Asset Handling**: Ensure icons and local assets referenced by the external editor are correctly placed in our `public/` directory.

### Phase 3: Customization (PLC Binding)
This is the critical "Adaptation" step.
- [ ] **Locate Property Inspector**: Find the component responsible for the "Right Sidebar" (Settings Panel).
- [ ] **Inject PLC Fields**: Add input fields for:
    -   `PLC Tag` (string): The variable name to bind to.
    -   `Data Type` (enum): Boolean, Integer, Float.
    -   `Animation Rule` (enum): Visibility, Color Change, Rotation, Position.
- [ ] **Persist Custom Data**: Ensure these new fields are saved into the `fabric.Object` custom properties so they appear in the final JSON export.

### Phase 4: Data Bridge (JSON/SVG Adapter)
- [ ] **Export Logic**: Verify the editor's `onSave` functions output standard Fabric JSON.
- [ ] **Runtime Adapter**: Update `MachineSimulator.tsx` (MachineVisualization) to:
    -   *Option A (Preferred)*: Render the exported SVG directly.
    -   *Option B*: Use a lightweight `fabric-static-canvas` to render the JSON.
    -   *Dynamic Updates*: Select elements by ID or Custom Attribute and manipulate them via DOM or Fabric API based on simulation state.

## 3. Risk Mitigation

| Risk | Mitigation Strategy |
| :--- | :--- |
| **Styling Conflict** | Isolate editor CSS. Ideally run the editor in an Iframe if CSS bleed is severe, but simple Scoped CSS usually works. |
| **React Version** | `react-design-editor` might use older React patterns. Verify strict mode compatibility with our React 19 setup. |
| **Heavy Bundle** | Fabric.js is large. Ensure it's lazy-loaded only when visiting the Editor route. |

## 4. Next Steps (Implementation)
1.  **Clone & Analyze**: Clone `salgum1114/react-design-editor` to a temp folder.
2.  **Audit Dependencies**: Check `package.json` for version mismatches (especially React 18 vs 19).
3.  **Ingest Source**: Move code to `src/components/external-editor/`.
4.  **Fix Build**: Resolve immediate TypeScript/Import errors.
