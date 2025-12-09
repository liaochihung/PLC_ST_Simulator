# Design: Metadata-Driven Component Registry

## Core Concepts

### 1. Component Definition Schema
We will define a strict TypeScript interface `ComponentDefinition` that describes a palette item completely purely with data.

```typescript
type IconDefinition = 
  | { type: 'lucide'; name: string } // e.g., 'Square', 'Circle'
  | { type: 'svg'; content: string; viewBox?: string }; // Raw SVG innerHTML

interface ComponentDefinition {
  id: string;
  name: string;
  category: 'shapes' | 'machine' | 'user'; 
  
  // Logic mapping: Tells the system which internal handler to use
  actionType: 'createShape' | 'createStation' | 'createDevice'; 
  
  // Static properties to be passed to the creation handler
  defaultProps: Record<string, any>; 
  
  // UI Configuration
  icon: IconDefinition;
}
```

### 2. Registry Architecture
Instead of importing everything into the Palette, we will create `src/lib/component-registry.ts`.
This module will:
1.  Export the `ComponentDefinition` type.
2.  Export a default list of system components (`DEFAULT_COMPONENTS`).
3.  (Future) Provide methods to register/unregister components at runtime.

### 3. Icon Rendering Strategy
To support both system consistency and custom flexibility:
*   **Lucide Icons:** We will maintain a mapping of allowed string names to actual Lucide React components. This avoids bundling *every* icon while allowing JSON usage.
*   **SVG Icons:** We will render raw SVG strings. To ensure security (XSS prevention) in a real-world scenario, we would sanitize this, but for this refactor, we will focus on the structure. The rendering will rely on standard `svg` tags with a consistent `viewBox` (default `0 0 24 24`).

### 4. Palette Refactor
The `ComponentPalette` will no longer own data. It will accept a list of `ComponentDefinition` (or import the default one) and iterate over it.
It will use a new helper component, `PaletteIconRenderer`, to handle the switch between `lucide` and `svg` types.
