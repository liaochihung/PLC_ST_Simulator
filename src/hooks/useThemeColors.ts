import { useTheme } from 'next-themes';
import { useMemo } from 'react';

// Theme-aware colors for Konva (which doesn't support CSS variables)
export function useThemeColors() {
  const { resolvedTheme } = useTheme();
  
  const colors = useMemo(() => {
    const isDark = resolvedTheme === 'dark';
    
    return {
      // Base colors
      background: isDark ? '#1a1a24' : '#fafafa',
      foreground: isDark ? '#e5e7eb' : '#1f2937',
      
      // Card/Panel colors
      card: isDark ? '#1f1f2e' : '#ffffff',
      cardForeground: isDark ? '#e5e7eb' : '#1f2937',
      
      // Secondary colors
      secondary: isDark ? '#27272a' : '#e5e7eb',
      secondaryForeground: isDark ? '#d4d4d8' : '#374151',
      
      // Muted colors
      muted: isDark ? '#2d2d3a' : '#f3f4f6',
      mutedForeground: isDark ? '#71717a' : '#6b7280',
      
      // Border
      border: isDark ? '#2d2d3d' : '#e5e7eb',
      
      // Primary
      primary: isDark ? '#22c55e' : '#16a34a',
      primaryForeground: isDark ? '#1a1a24' : '#ffffff',
      
      // Station colors
      stationFeed: isDark ? '#10b981' : '#059669',
      stationAssembly: isDark ? '#3b82f6' : '#2563eb',
      stationOk: isDark ? '#22c55e' : '#16a34a',
      stationNg: isDark ? '#ef4444' : '#dc2626',
      
      // Selection/accent
      selection: isDark ? '#6366f1' : '#4f46e5',
      accent: isDark ? '#f59e0b' : '#d97706',
      
      // Grid
      gridLine: isDark ? '#27272a' : '#d1d5db',
      
      // Text on active elements
      activeText: isDark ? '#ffffff' : '#ffffff',
      inactiveText: isDark ? '#fafafa' : '#1f2937',
      inactiveSecondaryText: isDark ? '#a1a1aa' : '#6b7280',
      
      // LED inactive
      ledInactive: isDark ? '#52525b' : '#9ca3af',
      
      // Running indicator
      runningIndicator: '#22c55e',
    };
  }, [resolvedTheme]);
  
  return colors;
}

export type ThemeColors = ReturnType<typeof useThemeColors>;
