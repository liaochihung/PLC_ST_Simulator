import React, { useRef, useState, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';
import type { 
  MachineLayout, 
  MachineElement, 
  MachineStation,
  EditorMode 
} from '@/types/machine-editor';

interface MachineCanvasProps {
  layout: MachineLayout;
  mode: EditorMode;
  selectedElement: MachineElement | null;
  onSelectElement: (element: MachineElement | null) => void;
  onMoveElement: (element: MachineElement, deltaX: number, deltaY: number) => void;
  zoom: number;
  panOffset: { x: number; y: number };
  // Runtime props
  discAngle?: number;
  feederActive?: boolean;
  isRunning?: boolean;
  products?: { stationId: number; status: 'pending' | 'ok' | 'ng' }[];
  stationStates?: Map<string, boolean>;
}

const MachineCanvas: React.FC<MachineCanvasProps> = ({
  layout,
  mode,
  selectedElement,
  onSelectElement,
  onMoveElement,
  zoom,
  panOffset,
  discAngle = 0,
  feederActive = false,
  isRunning = false,
  products = [],
  stationStates = new Map(),
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragElement, setDragElement] = useState<MachineElement | null>(null);

  const getStationColor = (type: MachineStation['type']) => {
    switch (type) {
      case 'feed': return 'hsl(var(--station-feed))';
      case 'assembly': return 'hsl(var(--station-assembly))';
      case 'ok': return 'hsl(var(--station-ok))';
      case 'ng': return 'hsl(var(--station-ng))';
      default: return 'hsl(var(--primary))';
    }
  };

  const getSvgPoint = useCallback((e: React.MouseEvent) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse());
    return { x: svgP.x, y: svgP.y };
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent, element: MachineElement) => {
    if (mode !== 'edit') return;
    e.stopPropagation();
    
    const pt = getSvgPoint(e);
    setDragStart(pt);
    setDragElement(element);
    setIsDragging(true);
    onSelectElement(element);
  }, [mode, getSvgPoint, onSelectElement]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !dragElement || mode !== 'edit') return;
    
    const pt = getSvgPoint(e);
    const deltaX = (pt.x - dragStart.x) / zoom;
    const deltaY = (pt.y - dragStart.y) / zoom;
    
    if (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {
      onMoveElement(dragElement, deltaX, deltaY);
      setDragStart(pt);
      // Update dragElement with new position
      setDragElement(prev => {
        if (!prev) return null;
        switch (prev.type) {
          case 'station':
            return { ...prev, data: { ...prev.data, x: prev.data.x + deltaX, y: prev.data.y + deltaY } };
          case 'disc':
            return { ...prev, data: { ...prev.data, x: prev.data.x + deltaX, y: prev.data.y + deltaY } };
          case 'feeder':
            return { ...prev, data: { ...prev.data, x: prev.data.x + deltaX, y: prev.data.y + deltaY } };
          case 'conveyor':
            return { 
              ...prev, 
              data: { 
                ...prev.data, 
                startX: prev.data.startX + deltaX, 
                startY: prev.data.startY + deltaY,
                endX: prev.data.endX + deltaX,
                endY: prev.data.endY + deltaY
              } 
            };
          default:
            return prev;
        }
      });
    }
  }, [isDragging, dragElement, mode, getSvgPoint, zoom, dragStart, onMoveElement]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDragElement(null);
  }, []);

  const handleCanvasClick = useCallback(() => {
    if (mode === 'edit') {
      onSelectElement(null);
    }
  }, [mode, onSelectElement]);

  const isSelected = useCallback((type: string, id: string) => {
    return selectedElement?.type === type && selectedElement?.data?.id === id;
  }, [selectedElement]);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      className={cn(
        "w-full h-full max-w-[500px] max-h-[500px]",
        mode === 'edit' && "cursor-crosshair"
      )}
      style={{ transform: `scale(${zoom}) translate(${panOffset.x}px, ${panOffset.y}px)` }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleCanvasClick}
    >
      {/* Background Grid */}
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3" />
        </pattern>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="selection-glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      <rect width={layout.width} height={layout.height} fill="url(#grid)" />

      {/* Feeders */}
      {layout.feeders.map(feeder => {
        const active = feederActive || false;
        const selected = isSelected('feeder', feeder.id);
        
        return (
          <g 
            key={feeder.id}
            className={cn(
              active && isRunning && "animate-vibrate",
              mode === 'edit' && "cursor-move"
            )}
            onMouseDown={(e) => handleMouseDown(e, { type: 'feeder', data: feeder })}
          >
            <rect
              x={feeder.x - feeder.width / 2}
              y={feeder.y - feeder.height / 2}
              width={feeder.width}
              height={feeder.height}
              rx="4"
              fill="hsl(var(--secondary))"
              stroke={selected ? 'hsl(var(--primary))' : (active ? 'hsl(var(--station-feed))' : 'hsl(var(--border))')}
              strokeWidth={selected ? 3 : 2}
              style={selected ? { filter: 'url(#selection-glow)' } : undefined}
            />
            <text 
              x={feeder.x} 
              y={feeder.y - 5} 
              textAnchor="middle" 
              fill="hsl(var(--foreground))" 
              fontSize="10"
            >
              {feeder.name.split('').slice(0, 2).join('')}
            </text>
            <text 
              x={feeder.x} 
              y={feeder.y + 10} 
              textAnchor="middle" 
              fill="hsl(var(--foreground))" 
              fontSize="10"
            >
              {feeder.name.split('').slice(2, 4).join('')}
            </text>
            {/* LED indicator */}
            <circle
              cx={feeder.x - feeder.width / 2 + 10}
              cy={feeder.y - feeder.height / 2 + 10}
              r="4"
              fill={active && isRunning ? 'hsl(var(--station-feed))' : 'hsl(var(--muted))'}
              style={active && isRunning ? { filter: 'url(#glow)' } : undefined}
            />
          </g>
        );
      })}

      {/* Discs */}
      {layout.discs.map(disc => {
        const selected = isSelected('disc', disc.id);
        const anglePerSlot = 360 / disc.slots;
        
        return (
          <g 
            key={disc.id}
            style={{ transform: `rotate(${discAngle}deg)`, transformOrigin: `${disc.x}px ${disc.y}px` }}
            onMouseDown={(e) => handleMouseDown(e, { type: 'disc', data: disc })}
            className={cn(mode === 'edit' && "cursor-move")}
          >
            <circle
              cx={disc.x}
              cy={disc.y}
              r={disc.radius}
              fill="hsl(var(--card))"
              stroke={selected ? 'hsl(var(--primary))' : 'hsl(var(--border))'}
              strokeWidth={selected ? 4 : 3}
              style={selected ? { filter: 'url(#selection-glow)' } : undefined}
            />
            
            {/* Slots */}
            {Array.from({ length: disc.slots }).map((_, i) => {
              const angle = i * anglePerSlot;
              const rad = (angle - 90) * (Math.PI / 180);
              const slotX = disc.x + Math.cos(rad) * (disc.radius - 30);
              const slotY = disc.y + Math.sin(rad) * (disc.radius - 30);
              
              // Segment line
              const lineX = disc.x + Math.cos(rad) * disc.radius;
              const lineY = disc.y + Math.sin(rad) * disc.radius;
              
              return (
                <g key={i}>
                  <line
                    x1={disc.x}
                    y1={disc.y}
                    x2={lineX}
                    y2={lineY}
                    stroke="hsl(var(--border))"
                    strokeWidth="1"
                    opacity="0.5"
                  />
                  <circle
                    cx={slotX}
                    cy={slotY}
                    r="12"
                    fill="hsl(var(--muted))"
                    stroke="hsl(var(--border))"
                    strokeWidth="1"
                    opacity="0.5"
                  />
                </g>
              );
            })}
            
            {/* Center hub */}
            <circle
              cx={disc.x}
              cy={disc.y}
              r="20"
              fill="hsl(var(--secondary))"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
            />
          </g>
        );
      })}

      {/* Conveyors */}
      {layout.conveyors.map(conveyor => {
        const selected = isSelected('conveyor', conveyor.id);
        const color = conveyor.type === 'ok' ? 'hsl(var(--station-ok))' : 
                      conveyor.type === 'ng' ? 'hsl(var(--station-ng))' : 'hsl(var(--primary))';
        
        return (
          <g 
            key={conveyor.id}
            onMouseDown={(e) => handleMouseDown(e, { type: 'conveyor', data: conveyor })}
            className={cn(mode === 'edit' && "cursor-move")}
          >
            <line
              x1={conveyor.startX}
              y1={conveyor.startY}
              x2={conveyor.endX}
              y2={conveyor.endY}
              stroke={selected ? 'hsl(var(--primary))' : 'hsl(var(--border))'}
              strokeWidth={selected ? 6 : 4}
              strokeDasharray={isRunning ? "5,5" : "none"}
              className={cn(isRunning && "animate-conveyor")}
              style={selected ? { filter: 'url(#selection-glow)' } : undefined}
            />
            <rect
              x={conveyor.endX}
              y={conveyor.endY - 15}
              width="60"
              height="30"
              rx="4"
              fill="hsl(var(--secondary))"
              stroke={color}
              strokeWidth="2"
            />
            <text 
              x={conveyor.endX + 30} 
              y={conveyor.endY + 5} 
              textAnchor="middle" 
              fill={color} 
              fontSize="10" 
              fontWeight="600"
            >
              {conveyor.type === 'ok' ? 'OK 出料' : conveyor.type === 'ng' ? 'NG 出料' : '輸送'}
            </text>
          </g>
        );
      })}

      {/* Stations */}
      {layout.stations.map(station => {
        const active = stationStates.get(station.id) || false;
        const selected = isSelected('station', station.id);
        const color = getStationColor(station.type);
        
        return (
          <g 
            key={station.id}
            onMouseDown={(e) => handleMouseDown(e, { type: 'station', data: station })}
            className={cn(mode === 'edit' && "cursor-move")}
          >
            <rect
              x={station.x - station.width / 2}
              y={station.y - station.height / 2}
              width={station.width}
              height={station.height}
              rx="4"
              fill={active ? color : 'hsl(var(--secondary))'}
              stroke={selected ? 'hsl(var(--primary))' : color}
              strokeWidth={selected ? 3 : 2}
              opacity={active ? 1 : 0.6}
              style={selected ? { filter: 'url(#selection-glow)' } : (active && isRunning ? { filter: 'url(#glow)' } : undefined)}
            />
            <text
              x={station.x}
              y={station.y - 2}
              textAnchor="middle"
              fill={active ? 'hsl(var(--background))' : 'hsl(var(--foreground))'}
              fontSize="10"
              fontWeight="600"
            >
              {station.id.toUpperCase()}
            </text>
            <text
              x={station.x}
              y={station.y + 10}
              textAnchor="middle"
              fill={active ? 'hsl(var(--background))' : 'hsl(var(--muted-foreground))'}
              fontSize="8"
            >
              {station.name}
            </text>
            {/* LED */}
            <circle
              cx={station.x + station.width / 2 - 8}
              cy={station.y - station.height / 2 + 8}
              r="3"
              fill={active && isRunning ? color : 'hsl(var(--muted))'}
              style={active && isRunning ? { filter: 'url(#glow)' } : undefined}
            />
          </g>
        );
      })}

      {/* Running indicator */}
      {isRunning && mode === 'runtime' && (
        <circle
          cx={layout.width - 20}
          cy={20}
          r="8"
          className="fill-success animate-industrial-pulse"
          style={{ filter: 'url(#glow)' }}
        />
      )}

      {/* Edit mode indicator */}
      {mode === 'edit' && (
        <text
          x="10"
          y="20"
          fill="hsl(var(--primary))"
          fontSize="12"
          fontWeight="600"
        >
          編輯模式
        </text>
      )}
    </svg>
  );
};

export default MachineCanvas;
