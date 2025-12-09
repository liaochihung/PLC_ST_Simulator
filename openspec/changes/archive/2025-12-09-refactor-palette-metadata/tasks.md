# Task List

- [x] Define `ComponentDefinition` and `IconDefinition` interfaces in `src/types/component-registry.ts` <!-- id: 0 -->
- [x] Create `src/lib/registry/default-components.ts` containing the migrated JSON data for existing shapes (Rectangle, Circle, Line, Text) and machine parts (Station, Disc, Conveyor, Feeder). <!-- id: 1 -->
- [x] Create `src/components/ui/PaletteIcon.tsx` component that handles rendering of both Lucide icon names and SVG content strings. <!-- id: 2 -->
- [x] Refactor `src/components/machine/ComponentPalette.tsx` to remove hardcoded array and consume the data from `default-components.ts`. <!-- id: 3 -->
- [x] Implement the logic in `ComponentPalette` to map `actionType` (e.g., 'createShape') to the actual props callbacks (`onAddShape`, etc.). <!-- id: 4 -->
- [x] Verify that dragging and clicking all palette items still functions identical to the previous implementation. <!-- id: 5 -->
