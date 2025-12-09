import { FastLayer, Line } from 'react-konva';
import { useEditorStore } from '@/stores/editorStore';

export const GridLayer = () => {
    const canvasConfig = useEditorStore((state) => state.canvasConfig);
    const { scale, position } = canvasConfig;

    // In a real implementation with panning/zooming on the Stage, 
    // the Grid needs to be intelligent.
    // However, if we move the STAGE, the background moves with it.
    // Uses a large grid or re-calculates lines based on viewport.

    // Simplified: Just draw a large grid around 0,0 for now.
    // For infinite grid, we typically monitor stage position and draw lines relative to view.
    // Since we are using react-konva, we can just draw many lines.

    const GRID_SIZE = 50;
    const WIDTH = 5000;
    const HEIGHT = 5000;

    const lines = [];

    // Vertical lines
    for (let i = -WIDTH / 2; i < WIDTH / 2; i += GRID_SIZE) {
        lines.push(
            <Line
                key={`v-${i}`}
                points={[i, -HEIGHT / 2, i, HEIGHT / 2]}
                stroke="#ddd"
                strokeWidth={1}
            />
        );
    }

    // Horizontal lines
    for (let i = -HEIGHT / 2; i < HEIGHT / 2; i += GRID_SIZE) {
        lines.push(
            <Line
                key={`h-${i}`}
                points={[-WIDTH / 2, i, WIDTH / 2, i]}
                stroke="#ddd"
                strokeWidth={1}
            />
        );
    }

    return (
        <FastLayer listening={false}>
            {lines}
            <Line
                points={[-WIDTH / 2, 0, WIDTH / 2, 0]}
                stroke="#bbb"
                strokeWidth={2}
            />
            <Line
                points={[0, -HEIGHT / 2, 0, HEIGHT / 2]}
                stroke="#bbb"
                strokeWidth={2}
            />
        </FastLayer>
    );
};
