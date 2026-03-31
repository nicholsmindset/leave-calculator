import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Stitch Design System — Atmospheric Trust palette
        'primary': '#004d60',
        'primary-container': '#00677f',
        'primary-fixed': '#b6eaff',
        'primary-fixed-dim': '#86d1ec',
        'on-primary': '#ffffff',
        'on-primary-fixed': '#001f28',
        'on-primary-fixed-variant': '#004e60',
        'on-primary-container': '#98e3ff',
        'inverse-primary': '#86d1ec',
        'surface-tint': '#00677f',

        'secondary': '#006a62',
        'secondary-container': '#81f3e5',
        'secondary-fixed': '#84f5e8',
        'secondary-fixed-dim': '#66d9cc',
        'on-secondary': '#ffffff',
        'on-secondary-fixed': '#00201d',
        'on-secondary-fixed-variant': '#005049',
        'on-secondary-container': '#006f66',

        'tertiary': '#7f2a0d',
        'tertiary-container': '#9f4122',
        'tertiary-fixed': '#ffdbd0',
        'tertiary-fixed-dim': '#ffb59e',
        'on-tertiary': '#ffffff',
        'on-tertiary-fixed': '#3a0b00',
        'on-tertiary-fixed-variant': '#7f2a0d',
        'on-tertiary-container': '#ffcebf',

        'surface': '#f3faff',
        'surface-dim': '#c7dde9',
        'surface-bright': '#f3faff',
        'surface-variant': '#cfe6f2',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#e6f6ff',
        'surface-container': '#dbf1fe',
        'surface-container-high': '#d5ecf8',
        'surface-container-highest': '#cfe6f2',
        'on-surface': '#071e27',
        'on-surface-variant': '#3f484c',
        'inverse-surface': '#1e333c',
        'inverse-on-surface': '#dff4ff',

        'background': '#f3faff',
        'on-background': '#071e27',

        'outline': '#6f787d',
        'outline-variant': '#bfc8cd',

        'error': '#ba1a1a',
        'error-container': '#ffdad6',
        'on-error': '#ffffff',
        'on-error-container': '#93000a',
      },
      fontFamily: {
        headline: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        label: ['Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        full: '9999px',
      },
      boxShadow: {
        ambient: '0 12px 32px -4px rgba(7, 30, 39, 0.06)',
        float: '0 8px 24px -4px rgba(7, 30, 39, 0.10)',
        card: '0 2px 8px rgba(7, 30, 39, 0.05)',
      },
    },
  },
  plugins: [],
}

export default config
