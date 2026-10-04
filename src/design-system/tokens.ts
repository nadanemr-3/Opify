/**
 * Opify Design System - Central Design Tokens (Source of Truth)
 * 
 * Defines official brand colors (#2563EB, #237848), semantic color mappings,
 * typography scales, border radii, shadows, and layout breakpoints.
 */

export const tokens = {
  colors: {
    // Official Brand Core
    brand: {
      blue: {
        50: '#EFF6FF',
        100: '#DBEAFE',
        200: '#BFDBFE',
        300: '#93C5FD',
        400: '#60A5FA',
        500: '#3B82F6',
        600: '#2563EB', // Official Primary Brand Blue
        700: '#1D4ED8', // Hover state
        800: '#1E40AF',
        900: '#1E3A8A',
        950: '#172554',
      },
      emerald: {
        50: '#EEF8F2',
        100: '#D7F0E0',
        200: '#B0E2C2',
        300: '#7DCF9D',
        400: '#4EB779',
        500: '#2D9A5B',
        600: '#237848', // Official Secondary Brand Emerald
        700: '#1B5E38', // Hover state
        800: '#144629',
        900: '#0F331F',
        950: '#081C11',
      },
    },
    // Semantic Functional Colors
    semantic: {
      success: {
        light: '#10B981',
        text: '#047857',
        bg: '#ECFDF5',
        border: '#A7F3D0',
        darkText: '#34D399',
        darkBg: 'rgba(6, 78, 59, 0.4)',
        darkBorder: '#065F46',
      },
      warning: {
        light: '#F59E0B',
        text: '#B45309',
        bg: '#FFFBEB',
        border: '#FDE68A',
        darkText: '#FBBF24',
        darkBg: 'rgba(120, 53, 15, 0.4)',
        darkBorder: '#92400E',
      },
      error: {
        light: '#EF4444',
        text: '#B91C1C',
        bg: '#FEF2F2',
        border: '#FECACA',
        darkText: '#F87171',
        darkBg: 'rgba(127, 29, 29, 0.4)',
        darkBorder: '#991B1B',
      },
      info: {
        light: '#0284C7',
        text: '#0369A1',
        bg: '#F0F9FF',
        border: '#BAE6FD',
        darkText: '#38BDF8',
        darkBg: 'rgba(14, 116, 144, 0.25)',
        darkBorder: '#0284C7',
      },
    },
    // Neutral Canvas & Surfaces
    neutral: {
      lightBg: '#F8FAFC',     // Slate-50
      lightSurface: '#FFFFFF',
      lightBorder: '#E2E8F0',  // Slate-200
      lightText: '#0F172A',    // Slate-900
      lightMuted: '#64748B',   // Slate-500
      
      darkBg: '#020617',      // Slate-950
      darkSurface: '#0F172A',  // Slate-900
      darkBorder: '#334155',   // Slate-700
      darkText: '#F8FAFC',     // Slate-50
      darkMuted: '#94A3B8',    // Slate-400
    },
  },
  
  // Typography
  typography: {
    fonts: {
      sans: "'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      arabic: "'Cairo', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.625,
    },
  },

  // Border Radii
  radii: {
    sm: '0.375rem', // 6px
    md: '0.5rem',   // 8px
    lg: '0.75rem',  // 12px (Buttons, Inputs, small cards)
    xl: '1rem',     // 16px (Standard cards)
    '2xl': '1.5rem',// 24px (Modals, Large hero panels)
    full: '9999px', // Badges, Avatar pills
  },

  // Elevation / Shadows
  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    brand: '0 4px 14px 0 rgba(37, 99, 235, 0.25)',
  },

  // Responsive Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Transition speeds
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

export type DesignTokens = typeof tokens;
export default tokens;
