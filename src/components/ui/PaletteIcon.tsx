import React from 'react';
import {
  Square,
  Circle,
  Minus,
  Type,
  ArrowRight,
  Disc,
  Package,
  LucideIcon,
} from 'lucide-react';
import { IconDefinition } from '@/types/component-registry';
import { cn } from '@/lib/utils';

interface PaletteIconProps extends React.SVGProps<SVGSVGElement> {
  icon: IconDefinition;
  className?: string;
}

const LucideIconMap: { [key: string]: LucideIcon } = {
  Square,
  Circle,
  Minus,
  Type,
  ArrowRight,
  Disc,
  Package,
};

const PaletteIcon: React.FC<PaletteIconProps> = ({ icon, className, ...props }) => {
  if (icon.type === 'lucide') {
    const IconComponent = LucideIconMap[icon.name];
    if (IconComponent) {
      return <IconComponent className={cn('w-4 h-4', className)} {...props} />;
    } else {
      console.warn(`Lucide icon "${icon.name}" not found.`);
      return null;
    }
  } else if (icon.type === 'svg') {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: icon.content }}
        className={cn('w-4 h-4 flex items-center justify-center', className)}
      />
    );
  }
  return null;
};

export default PaletteIcon;
