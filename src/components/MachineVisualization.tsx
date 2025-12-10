import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface Station {
  id: number;
  name: string;
  type: 'feed' | 'assembly' | 'ok' | 'ng';
  angle: number;
  active: boolean;
  hasProduct: boolean;
}

interface MachineVisualizationProps {
  stations: Station[];
  discAngle: number;
  feederActive: boolean;
  isRunning: boolean;
  products: { stationId: number; status: 'pending' | 'ok' | 'ng' }[];
}

const MachineVisualization: React.FC<MachineVisualizationProps> = ({
  stations,
  discAngle,
  feederActive,
  isRunning,
  products
}) => {
  const centerX = 200;
  const centerY = 200;
  const discRadius = 120;
  const stationRadius = 160;

  const stationPositions = useMemo(() => {
    return stations.map(station => {
      const rad = (station.angle - 90) * (Math.PI / 180);
      return {
        ...station,
        x: centerX + Math.cos(rad) * stationRadius,
        y: centerY + Math.sin(rad) * stationRadius
      };
    });
  }, [stations]);

  const productPositions = useMemo(() => {
    return products.map(product => {
      const station = stations.find(s => s.id === product.stationId);
      if (!station) return null;
      
      const rad = ((station.angle + discAngle) - 90) * (Math.PI / 180);
      return {
        ...product,
        x: centerX + Math.cos(rad) * (discRadius - 30),
        y: centerY + Math.sin(rad) * (discRadius - 30)
      };
    }).filter(Boolean);
  }, [products, stations, discAngle]);

  const getStationColor = (type: Station['type']) => {
    switch (type) {
      case 'feed': return 'hsl(var(--station-feed))';
      case 'assembly': return 'hsl(var(--station-assembly))';
      case 'ok': return 'hsl(var(--station-ok))';
      case 'ng': return 'hsl(var(--station-ng))';
    }
  };

  const getProductColor = (status: 'pending' | 'ok' | 'ng') => {
    switch (status) {
      case 'pending': return 'hsl(var(--muted-foreground))';
      case 'ok': return 'hsl(var(--success))';
      case 'ng': return 'hsl(var(--destructive))';
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 400 400" className="w-full h-full max-w-[500px] max-h-[500px]">
        {/* Background Grid */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3" />
          </pattern>
          
          {/* Glow filter for active elements */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        <rect width="400" height="400" fill="url(#grid)" />

        {/* Vibration Feeder */}
        <g className={cn(feederActive && isRunning && "animate-vibrate")}>
          <rect
            x="20"
            y="160"
            width="60"
            height="80"
            rx="4"
            fill="hsl(var(--secondary))"
            stroke={feederActive ? 'hsl(var(--station-feed))' : 'hsl(var(--border))'}
            strokeWidth="2"
          />
          <text x="50" y="200" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="10" fontFamily="Inter">
            Vibration
          </text>
          <text x="50" y="215" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="10" fontFamily="Inter">
            Feeder
          </text>
          
          {/* Feeder chute */}
          <path
            d="M 80 200 Q 100 200 110 185"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="3"
          />
          
          {/* LED indicator */}
          <circle
            cx="35"
            cy="175"
            r="4"
            className={cn(
              feederActive && isRunning ? "fill-station-feed" : "fill-muted"
            )}
            style={feederActive && isRunning ? { filter: 'url(#glow)' } : {}}
          />
        </g>

        {/* Main Disc */}
        <g style={{ transform: `rotate(${discAngle}deg)`, transformOrigin: `${centerX}px ${centerY}px` }}>
          {/* Disc body */}
          <circle
            cx={centerX}
            cy={centerY}
            r={discRadius}
            fill="hsl(var(--card))"
            stroke="hsl(var(--border))"
            strokeWidth="3"
          />
          
          {/* Disc segments */}
          {stations.map((station, i) => {
            const anglePerStation = 360 / stations.length;
            const startAngle = (station.angle - anglePerStation / 2 - 90) * (Math.PI / 180);
            const endAngle = (station.angle + anglePerStation / 2 - 90) * (Math.PI / 180);
            
            const x1 = centerX + Math.cos(startAngle) * discRadius;
            const y1 = centerY + Math.sin(startAngle) * discRadius;
            
            return (
              <line
                key={i}
                x1={centerX}
                y1={centerY}
                x2={x1}
                y2={y1}
                stroke="hsl(var(--border))"
                strokeWidth="1"
                opacity="0.5"
              />
            );
          })}
          
          {/* Center hub */}
          <circle
            cx={centerX}
            cy={centerY}
            r="20"
            fill="hsl(var(--secondary))"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
          />
          
          {/* Product slots on disc */}
          {stations.map((station, i) => {
            const rad = (station.angle - 90) * (Math.PI / 180);
            const slotX = centerX + Math.cos(rad) * (discRadius - 30);
            const slotY = centerY + Math.sin(rad) * (discRadius - 30);
            
            return (
              <circle
                key={`slot-${i}`}
                cx={slotX}
                cy={slotY}
                r="12"
                fill="hsl(var(--muted))"
                stroke="hsl(var(--border))"
                strokeWidth="1"
                opacity="0.5"
              />
            );
          })}
        </g>

        {/* Products on disc */}
        {productPositions.map((product, i) => product && (
          <circle
            key={`product-${i}`}
            cx={product.x}
            cy={product.y}
            r="10"
            fill={getProductColor(product.status)}
            stroke="hsl(var(--foreground))"
            strokeWidth="1"
            style={product.status !== 'pending' ? { filter: 'url(#glow)' } : {}}
          />
        ))}

        {/* Stations */}
        {stationPositions.map((station, i) => (
          <g key={station.id}>
            {/* Station housing */}
            <rect
              x={station.x - 25}
              y={station.y - 20}
              width="50"
              height="40"
              rx="4"
              fill={station.active ? getStationColor(station.type) : 'hsl(var(--secondary))'}
              stroke={getStationColor(station.type)}
              strokeWidth="2"
              opacity={station.active ? 1 : 0.6}
              style={station.active && isRunning ? { filter: 'url(#glow)' } : {}}
            />
            
            {/* Station label */}
            <text
              x={station.x}
              y={station.y - 5}
              textAnchor="middle"
              fill={station.active ? 'hsl(var(--background))' : 'hsl(var(--foreground))'}
              fontSize="10"
              fontWeight="600"
              fontFamily="Inter"
            >
              S{station.id}
            </text>
            <text
              x={station.x}
              y={station.y + 8}
              textAnchor="middle"
              fill={station.active ? 'hsl(var(--background))' : 'hsl(var(--muted-foreground))'}
              fontSize="8"
              fontFamily="Inter"
            >
              {station.name}
            </text>
            
            {/* Station LED */}
            <circle
              cx={station.x + 18}
              cy={station.y - 12}
              r="3"
              fill={station.active && isRunning ? getStationColor(station.type) : 'hsl(var(--muted))'}
              style={station.active && isRunning ? { filter: 'url(#glow)' } : {}}
            />
          </g>
        ))}

        {/* Output Conveyors */}
        {/* OK Output */}
        <g>
          <rect
            x="320"
            y="120"
            width="60"
            height="30"
            rx="4"
            fill="hsl(var(--secondary))"
            stroke="hsl(var(--station-ok))"
            strokeWidth="2"
          />
          <text x="350" y="140" textAnchor="middle" fill="hsl(var(--station-ok))" fontSize="10" fontWeight="600">
            OK Outfeed
          </text>
          <path
            d="M 290 150 L 320 135"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="3"
            strokeDasharray={isRunning ? "5,5" : "none"}
            className={cn(isRunning && "animate-conveyor")}
          />
        </g>

        {/* NG Output */}
        <g>
          <rect
            x="320"
            y="250"
            width="60"
            height="30"
            rx="4"
            fill="hsl(var(--secondary))"
            stroke="hsl(var(--station-ng))"
            strokeWidth="2"
          />
          <text x="350" y="270" textAnchor="middle" fill="hsl(var(--station-ng))" fontSize="10" fontWeight="600">
            NG Outfeed
          </text>
          <path
            d="M 290 250 L 320 265"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="3"
            strokeDasharray={isRunning ? "5,5" : "none"}
            className={cn(isRunning && "animate-conveyor")}
          />
        </g>

        {/* Running indicator */}
        {isRunning && (
          <circle
            cx="380"
            cy="20"
            r="8"
            className="fill-success animate-industrial-pulse"
            style={{ filter: 'url(#glow)' }}
          />
        )}
      </svg>
    </div>
  );
};

export default MachineVisualization;
