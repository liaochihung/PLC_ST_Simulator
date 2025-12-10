import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { MachineElement, MachineStation, MachineDisc, MachineFeeder, MachineConveyor, BasicShape } from '@/types/machine-editor';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import IOBindingEditor from '@/components/IOBindingEditor';
import { Separator } from '@/components/ui/separator';

interface MachinePropertyPanelProps {
  element: MachineElement;
  onUpdate: (updates: Partial<MachineStation | MachineDisc | MachineFeeder | MachineConveyor | BasicShape>) => void;
  onClose: () => void;
  className?: string; // Added prop
}

const MachinePropertyPanel: React.FC<MachinePropertyPanelProps> = ({
  element,
  onUpdate,
  onClose,
  className,
}) => {
  const renderStationProperties = (station: MachineStation) => (
    <>
      <div className="space-y-1.5">
        <Label className="text-xs">Name</Label>
        <Input
          value={station.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          className="h-8 text-xs"
        />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs">Type</Label>
        <Select
          value={station.type}
          onValueChange={(value) => onUpdate({ type: value as MachineStation['type'] })}
        >
          <SelectTrigger className="h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="feed">Feed Station</SelectItem>
            <SelectItem value="assembly">Assembly Station</SelectItem>
            <SelectItem value="ok">OK Station</SelectItem>
            <SelectItem value="ng">NG Station</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1.5">
          <Label className="text-xs">X</Label>
          <Input
            type="number"
            value={station.x}
            onChange={(e) => onUpdate({ x: Number(e.target.value) })}
            className="h-8 text-xs"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Y</Label>
          <Input
            type="number"
            value={station.y}
            onChange={(e) => onUpdate({ y: Number(e.target.value) })}
            className="h-8 text-xs"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1.5">
          <Label className="text-xs">Width</Label>
          <Input
            type="number"
            value={station.width}
            onChange={(e) => onUpdate({ width: Number(e.target.value) })}
            className="h-8 text-xs"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Height</Label>
          <Input
            type="number"
            value={station.height}
            onChange={(e) => onUpdate({ height: Number(e.target.value) })}
            className="h-8 text-xs"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs">Angle</Label>
        <Input
          type="number"
          value={station.angle}
          onChange={(e) => onUpdate({ angle: Number(e.target.value) })}
          className="h-8 text-xs"
        />
      </div>

      <Separator className="my-3" />
      <div className="space-y-3">
        <h4 className="text-xs font-semibold">I/O Variable Binding</h4>
        <IOBindingEditor
          label="Inputs"
          bindings={station.ioMapping?.inputs || []}
          onChange={(inputs) => onUpdate({
            ioMapping: {
              inputs,
              outputs: station.ioMapping?.outputs || []
            }
          })}
          placeholder="e.g., X0, M10"
        />
        <IOBindingEditor
          label="Outputs"
          bindings={station.ioMapping?.outputs || []}
          onChange={(outputs) => onUpdate({
            ioMapping: {
              inputs: station.ioMapping?.inputs || [],
              outputs
            }
          })}
          placeholder="e.g., Y0, M20"
        />
      </div>
    </>
  );

  const renderDiscProperties = (disc: MachineDisc) => (
    <>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1.5">
          <Label className="text-xs">X</Label>
          <Input
            type="number"
            value={disc.x}
            onChange={(e) => onUpdate({ x: Number(e.target.value) })}
            className="h-8 text-xs"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Y</Label>
          <Input
            type="number"
            value={disc.y}
            onChange={(e) => onUpdate({ y: Number(e.target.value) })}
            className="h-8 text-xs"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs">Radius</Label>
        <Input
          type="number"
          value={disc.radius}
          onChange={(e) => onUpdate({ radius: Number(e.target.value) })}
          className="h-8 text-xs"
        />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs">Slots</Label>
        <Input
          type="number"
          value={disc.slots}
          onChange={(e) => onUpdate({ slots: Number(e.target.value) })}
          className="h-8 text-xs"
        />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs">Rotation Variable</Label>
        <Input
          value={disc.rotationVariable || ''}
          onChange={(e) => onUpdate({ rotationVariable: e.target.value })}
          placeholder="e.g., discAngle"
          className="h-8 text-xs"
        />
      </div>
    </>
  );

  const renderFeederProperties = (feeder: MachineFeeder) => (
    <>
      <div className="space-y-1.5">
        <Label className="text-xs">Name</Label>
        <Input
          value={feeder.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          className="h-8 text-xs"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1.5">
          <Label className="text-xs">X</Label>
          <Input
            type="number"
            value={feeder.x}
            onChange={(e) => onUpdate({ x: Number(e.target.value) })}
            className="h-8 text-xs"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Y</Label>
          <Input
            type="number"
            value={feeder.y}
            onChange={(e) => onUpdate({ y: Number(e.target.value) })}
            className="h-8 text-xs"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1.5">
          <Label className="text-xs">Width</Label>
          <Input
            type="number"
            value={feeder.width}
            onChange={(e) => onUpdate({ width: Number(e.target.value) })}
            className="h-8 text-xs"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Height</Label>
          <Input
            type="number"
            value={feeder.height}
            onChange={(e) => onUpdate({ height: Number(e.target.value) })}
            className="h-8 text-xs"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs">Active Variable</Label>
        <Input
          value={feeder.activeVariable || ''}
          onChange={(e) => onUpdate({ activeVariable: e.target.value })}
          placeholder="e.g., feederActive"
          className="h-8 text-xs"
        />
      </div>
    </>
  );

  const renderConveyorProperties = (conveyor: MachineConveyor) => (
    <>
      <div className="space-y-1.5">
        <Label className="text-xs">Type</Label>
        <Select
          value={conveyor.type}
          onValueChange={(value) => onUpdate({ type: value as MachineConveyor['type'] })}
        >
          <SelectTrigger className="h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ok">OK Conveyor</SelectItem>
            <SelectItem value="ng">NG Conveyor</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1.5">
          <Label className="text-xs">Start X</Label>
          <Input
            type="number"
            value={conveyor.startX}
            onChange={(e) => onUpdate({ startX: Number(e.target.value) })}
            className="h-8 text-xs"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Start Y</Label>
          <Input
            type="number"
            value={conveyor.startY}
            onChange={(e) => onUpdate({ startY: Number(e.target.value) })}
            className="h-8 text-xs"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1.5">
          <Label className="text-xs">End X</Label>
          <Input
            type="number"
            value={conveyor.endX}
            onChange={(e) => onUpdate({ endX: Number(e.target.value) })}
            className="h-8 text-xs"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">End Y</Label>
          <Input
            type="number"
            value={conveyor.endY}
            onChange={(e) => onUpdate({ endY: Number(e.target.value) })}
            className="h-8 text-xs"
          />
        </div>
      </div>
    </>
  );

  const renderShapeProperties = (shape: BasicShape) => (
    <>
      <div className="space-y-1.5">
        <Label className="text-xs">Type</Label>
        <div className="text-xs text-muted-foreground">
          {shape.type === 'rectangle' && 'Rectangle'}
          {shape.type === 'circle' && 'Circle'}
          {shape.type === 'line' && 'Line'}
          {shape.type === 'text' && 'Text'}
          {shape.type === 'triangle' && 'Triangle'}

          {shape.type === 'hexagon' && 'Hexagon'}
          {shape.type === 'ellipse' && 'Ellipse'}
          {shape.type === 'image' && 'Image'}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1.5">
          <Label className="text-xs">X</Label>
          <Input
            type="number"
            value={shape.x}
            onChange={(e) => onUpdate({ x: Number(e.target.value) })}
            className="h-8 text-xs"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Y</Label>
          <Input
            type="number"
            value={shape.y}
            onChange={(e) => onUpdate({ y: Number(e.target.value) })}
            className="h-8 text-xs"
          />
        </div>
      </div>

      {(shape.type === 'rectangle' || shape.type === 'ellipse' || shape.type === 'image') && (
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1.5">
            <Label className="text-xs">Width</Label>
            <Input
              type="number"
              value={shape.width || 80}
              onChange={(e) => onUpdate({ width: Number(e.target.value) })}
              className="h-8 text-xs"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Height</Label>
            <Input
              type="number"
              value={shape.height || 60}
              onChange={(e) => onUpdate({ height: Number(e.target.value) })}
              className="h-8 text-xs"
            />
          </div>
        </div>
      )}

      {shape.type === 'image' && (
        <div className="space-y-1.5 ">
          <Label className="text-xs">Image Source</Label>
          <div className="flex gap-2">
            <Input
              type="text"
              value={shape.src || ''}
              onClick={(e) => (e.target as HTMLInputElement).select()}
              readOnly
              className="h-8 text-xs flex-1 bg-muted"
              placeholder="Use button below to upload"
            />
          </div>
          <div className="flex gap-2">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id={`image-upload-${element.data.id}`}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    const result = event.target?.result as string;
                    // Optional: Load image to get dimensions
                    const img = new Image();
                    img.onload = () => {
                      onUpdate({
                        src: result,
                        // Optional: Update dimensions if it's a new image and we want to fit it?
                        // For now, let's keep user defined dimensions or maybe set aspect ratio?
                        // Let's just update src.
                      });
                    };
                    img.src = result;
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            <Button
              variant="secondary"
              size="sm"
              className="w-full h-8 text-xs"
              onClick={() => document.getElementById(`image-upload-${element.data.id}`)?.click()}
            >
              Change Image (Upload)
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground">
            Double-click image on canvas to change
          </p>
        </div>
      )}

      {(shape.type === 'circle' || shape.type === 'triangle' || shape.type === 'hexagon') && (
        <div className="space-y-1.5">
          <Label className="text-xs">Radius</Label>
          <Input
            type="number"
            value={shape.radius || 40}
            onChange={(e) => onUpdate({ radius: Number(e.target.value) })}
            className="h-8 text-xs"
          />
        </div>
      )}

      {shape.type === 'line' && (
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1.5">
            <Label className="text-xs">End X</Label>
            <Input
              type="number"
              value={shape.endX || shape.x + 80}
              onChange={(e) => onUpdate({ endX: Number(e.target.value) })}
              className="h-8 text-xs"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">End Y</Label>
            <Input
              type="number"
              value={shape.endY || shape.y}
              onChange={(e) => onUpdate({ endY: Number(e.target.value) })}
              className="h-8 text-xs"
            />
          </div>
        </div>
      )}

      {shape.type === 'text' && (
        <>
          <div className="space-y-1.5">
            <Label className="text-xs">Text Content</Label>
            <Input
              type="text"
              value={shape.text || 'Text'}
              onChange={(e) => onUpdate({ text: e.target.value })}
              className="h-8 text-xs"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Font Size</Label>
            <Input
              type="number"
              value={shape.fontSize || 16}
              onChange={(e) => onUpdate({ fontSize: Number(e.target.value) })}
              className="h-8 text-xs"
            />
          </div>
        </>
      )}

      {(shape.type === 'rectangle' || shape.type === 'circle' || shape.type === 'triangle' || shape.type === 'hexagon' || shape.type === 'ellipse') && (
        <>
          <div className="space-y-1.5">
            <Label className="text-xs">Fill Color</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={shape.fill || '#3b82f6'}
                onChange={(e) => onUpdate({ fill: e.target.value })}
                className="h-8 w-16 p-1"
              />
              <Input
                type="text"
                value={shape.fill || '#3b82f6'}
                onChange={(e) => onUpdate({ fill: e.target.value })}
                className="h-8 text-xs flex-1"
                placeholder="#3b82f6"
              />
            </div>
          </div>
        </>
      )}

      {(shape.type === 'rectangle' || shape.type === 'circle' || shape.type === 'line' || shape.type === 'triangle' || shape.type === 'hexagon' || shape.type === 'ellipse') && (
        <>
          <div className="space-y-1.5">
            <Label className="text-xs">Stroke Color</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={shape.stroke || '#1e40af'}
                onChange={(e) => onUpdate({ stroke: e.target.value })}
                className="h-8 w-16 p-1"
              />
              <Input
                type="text"
                value={shape.stroke || '#1e40af'}
                onChange={(e) => onUpdate({ stroke: e.target.value })}
                className="h-8 text-xs flex-1"
                placeholder="#1e40af"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Stroke Width</Label>
            <Input
              type="number"
              value={shape.strokeWidth || 2}
              onChange={(e) => onUpdate({ strokeWidth: Number(e.target.value) })}
              className="h-8 text-xs"
            />
          </div>
        </>
      )}

      {shape.type === 'text' && (
        <div className="space-y-1.5">
          <Label className="text-xs">Text Color</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={shape.fill || '#ffffff'}
              onChange={(e) => onUpdate({ fill: e.target.value })}
              className="h-8 w-16 p-1"
            />
            <Input
              type="text"
              value={shape.fill || '#ffffff'}
              onChange={(e) => onUpdate({ fill: e.target.value })}
              className="h-8 text-xs flex-1"
              placeholder="#ffffff"
            />
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className={className || "absolute right-2 top-2 w-56 bg-card border border-border rounded-lg shadow-lg p-3 z-50 pointer-events-auto"}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium">
          {element.type === 'station' && 'Station Properties'}
          {element.type === 'disc' && 'Disc Properties'}
          {element.type === 'feeder' && 'Feeder Properties'}
          {element.type === 'conveyor' && 'Conveyor Properties'}
          {element.type === 'shape' && 'Object Properties'}
        </h3>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
          <X className="w-3 h-3" />
        </Button>
      </div>
      <div className="space-y-3">
        {element.type === 'station' && renderStationProperties(element.data)}
        {element.type === 'disc' && renderDiscProperties(element.data)}
        {element.type === 'feeder' && renderFeederProperties(element.data)}
        {element.type === 'conveyor' && renderConveyorProperties(element.data)}
        {element.type === 'shape' && renderShapeProperties(element.data)}
      </div>
    </div>
  );
};

export default MachinePropertyPanel;
