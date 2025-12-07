import type { MachineLayout, MachineElement, EditorMode } from './machine-editor';

/**
 * Renderer type enum
 */
export type RendererType = 'svg' | 'konva' | 'babylon';

/**
 * Machine runtime state for rendering
 */
export interface MachineRuntimeState {
    // Disc rotation
    discAngles: Map<string, number>; // disc id -> angle in degrees

    // Station states
    stationStates: Map<string, Record<string, any>>; // station id -> state data

    // Feeder states
    feederStates: Map<string, boolean>; // feeder id -> active state

    // Conveyor states
    conveyorStates: Map<string, boolean>; // conveyor id -> active state

    // Products on disc
    products: { stationId: number; status: 'pending' | 'ok' | 'ng' }[];

    // Global runtime state
    isRunning: boolean;
}

/**
 * Renderer interface abstraction
 * All renderers (SVG, Konva, Babylon) must implement this interface
 */
export interface IMachineRenderer {
    /**
     * Initialize the renderer with a container element
     */
    initialize(container: HTMLElement, layout: MachineLayout): void;

    /**
     * Clean up and destroy the renderer
     */
    destroy(): void;

    /**
     * Render the machine layout with current state
     */
    render(layout: MachineLayout, state: MachineRuntimeState): void;

    /**
     * Update only the runtime state (more efficient than full render)
     */
    updateState(state: MachineRuntimeState): void;

    /**
     * Set the editor mode (edit/runtime)
     */
    setMode(mode: EditorMode): void;

    /**
     * Set zoom level
     */
    setZoom(zoom: number): void;

    /**
     * Set pan offset
     */
    setPan(x: number, y: number): void;

    /**
     * Register callback for element selection
     */
    onElementSelect(callback: (element: MachineElement | null) => void): void;

    /**
     * Register callback for element movement
     */
    onElementMove(callback: (element: MachineElement, deltaX: number, deltaY: number) => void): void;

    /**
     * Get the renderer type
     */
    getType(): RendererType;
}

/**
 * Renderer factory configuration
 */
export interface RendererConfig {
    type: RendererType;
    layout: MachineLayout;
    mode: EditorMode;
    zoom?: number;
    panOffset?: { x: number; y: number };
}
