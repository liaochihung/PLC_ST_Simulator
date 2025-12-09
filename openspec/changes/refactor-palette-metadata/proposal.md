# Refactor Component Palette to Metadata-Driven Registry

## Summary
Refactor the `ComponentPalette` component to separate the component definitions (metadata) from the UI rendering logic. Introduce a `ComponentRegistry` and a data schema to define palette items, supporting both built-in Lucide icons and raw SVG content for future extensibility.

## Motivation
Currently, the `ComponentPalette.tsx` contains hardcoded arrays of component definitions, mixing UI logic with data. This makes it difficult to:
1.  Add new components dynamically.
2.  Support user-defined components in the future.
3.  Load component definitions from external sources (e.g., JSON files or APIs).
4.  Customize icons beyond the imported Lucide React components.

By moving to a metadata-driven approach, we lay the groundwork for a more flexible and extensible editor system.
