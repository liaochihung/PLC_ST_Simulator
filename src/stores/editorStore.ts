import { create } from 'zustand';

export interface EditorElement {
    id: string;
    type: 'rect' | 'circle' | 'text';
    x: number;
    y: number;
    width?: number;
    height?: number;
    radius?: number; // for circle
    text?: string;   // for text
    fontSize?: number; // for text
    fill: string;
    rotation: number;
    draggable: boolean;
    plcTag?: string; // For binding
}

export interface EditorState {
    elements: EditorElement[];
    selectedIds: string[];
    canvasConfig: {
        scale: number;
        position: { x: number; y: number };
    };
    actions: {
        addElement: (type: 'rect' | 'circle' | 'text') => void;
        updateElement: (id: string, attrs: Partial<EditorElement>) => void;
        selectElement: (id: string, multiSelect: boolean) => void;
        clearSelection: () => void;
        deleteSelected: () => void;
        setCanvasConfig: (config: Partial<EditorState['canvasConfig']>) => void;
    };
}

export const useEditorStore = create<EditorState>((set) => ({
    elements: [],
    selectedIds: [],
    canvasConfig: {
        scale: 1,
        position: { x: 0, y: 0 },
    },
    actions: {
        addElement: (type) =>
            set((state) => {
                const newElement: EditorElement = {
                    id: crypto.randomUUID(),
                    type,
                    x: 100, // Default position
                    y: 100,
                    fill: '#00D2FF', // Default color
                    rotation: 0,
                    draggable: true,
                };

                if (type === 'rect') {
                    newElement.width = 100;
                    newElement.height = 100;
                } else if (type === 'circle') {
                    newElement.radius = 50;
                } else if (type === 'text') {
                    newElement.text = 'Text';
                    newElement.fontSize = 20;
                    newElement.fill = 'black';
                }

                return { elements: [...state.elements, newElement] };
            }),
        updateElement: (id, attrs) =>
            set((state) => ({
                elements: state.elements.map((el) =>
                    el.id === id ? { ...el, ...attrs } : el
                ),
            })),
        selectElement: (id, multiSelect) =>
            set((state) => {
                if (multiSelect) {
                    if (state.selectedIds.includes(id)) {
                        return { selectedIds: state.selectedIds.filter(selectedId => selectedId !== id) };
                    }
                    return { selectedIds: [...state.selectedIds, id] };
                }
                return { selectedIds: [id] };
            }),
        clearSelection: () => set({ selectedIds: [] }),
        deleteSelected: () =>
            set((state) => ({
                elements: state.elements.filter(
                    (el) => !state.selectedIds.includes(el.id)
                ),
                selectedIds: [],
            })),
        setCanvasConfig: (config) =>
            set((state) => ({
                canvasConfig: { ...state.canvasConfig, ...config },
            })),
    },
}));
