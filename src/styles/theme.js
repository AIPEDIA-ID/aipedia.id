// Centralized theme configuration
export const theme = {
  colors: {
    primary: {
      50: '#f3f0ff',
      100: '#e9e2ff',
      200: '#d6c8ff',
      300: '#b8a1ff',
      400: '#9570ff',
      500: '#6320ee', // Main brand color (replacing orange)
      600: '#5a1dd8',
      700: '#4c18b8',
      800: '#3f1596',
      900: '#35137a',
      950: '#1f0a4a'
    },
    accent: {
      50: '#fef7ee',
      100: '#fdecd7',
      200: '#fad5ae',
      300: '#f6b67a',
      400: '#f18f44',
      500: '#ed7014', // Secondary accent
      600: '#de5a0a',
      700: '#b8460b',
      800: '#923810',
      900: '#762f11'
    },
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617'
    }
  },
  gradients: {
    primary: 'from-primary-400 to-primary-600',
    primaryHover: 'from-primary-500 to-primary-700',
    accent: 'from-accent-400 to-accent-600',
    accentHover: 'from-accent-500 to-accent-700'
  },
  shadows: {
    primary: 'shadow-primary-500/25',
    accent: 'shadow-accent-500/25'
  },
  borders: {
    primary: 'border-primary-500/30',
    primaryHover: 'border-primary-500/50',
    accent: 'border-accent-500/30'
  }
};

// CSS custom properties for dynamic theming
export const cssVariables = {
  '--color-primary-50': theme.colors.primary[50],
  '--color-primary-100': theme.colors.primary[100],
  '--color-primary-200': theme.colors.primary[200],
  '--color-primary-300': theme.colors.primary[300],
  '--color-primary-400': theme.colors.primary[400],
  '--color-primary-500': theme.colors.primary[500],
  '--color-primary-600': theme.colors.primary[600],
  '--color-primary-700': theme.colors.primary[700],
  '--color-primary-800': theme.colors.primary[800],
  '--color-primary-900': theme.colors.primary[900],
  '--color-primary-950': theme.colors.primary[950]
};