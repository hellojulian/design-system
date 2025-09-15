/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "./.storybook/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Spacing tokens
      spacing: {
        'ds-xxs': 'var(--ds-space-xxs)', // 2px
        'ds-xs': 'var(--ds-space-xs)',   // 4px
        'ds-sm': 'var(--ds-space-sm)',   // 6px
        'ds-md': 'var(--ds-space-md)',   // 8px
        'ds-lg': 'var(--ds-space-lg)',   // 12px
        'ds-xlg': 'var(--ds-space-xlg)', // 16px
        'ds-xxlg': 'var(--ds-space-xxlg)', // 20px
      },
      
      // Control heights
      height: {
        'ds-control-sm': 'var(--ds-control-height-sm)', // 28px
        'ds-control-md': 'var(--ds-control-height-md)', // 40px
        'ds-control-lg': 'var(--ds-control-height-lg)', // 50px
      },
      
      // Border radius tokens
      borderRadius: {
        'ds-xs': 'var(--ds-radius-xs)',   // 2px
        'ds-sm': 'var(--ds-radius-sm)',   // 4px
        'ds-md': 'var(--ds-radius-md)',   // 6px
        'ds-lg': 'var(--ds-radius-lg)',   // 8px
        'ds-xlg': 'var(--ds-radius-xlg)', // 16px
        'ds-xxlg': 'var(--ds-radius-xxlg)', // 24px
        'ds-round': 'var(--ds-radius-round)', // 1000px
      },
      
      // Color tokens - All design system colors
      colors: {
        // Brand and semantic colors
        'ds-brand': 'var(--ds-color-brand)',
        'ds-icon': 'var(--ds-color-icon)',
        
        // Background colors
        'ds-bg-base': 'var(--ds-color-background-base)',
        'ds-bg-contrast': 'var(--ds-color-background-contrast)',
        'ds-bg-elevated': 'var(--ds-color-background-elevated)',
        'ds-bg-opaque': 'var(--ds-color-background-opaque)',
        'ds-bg-subdued': 'var(--ds-color-background-subdued)',
        'ds-bg-white': 'var(--ds-color-background-white)',
        
        // Foreground colors
        'ds-fg-default': 'var(--ds-color-foreground-default)',
        'ds-fg-inverted': 'var(--ds-color-foreground-inverted)',
        'ds-fg-light': 'var(--ds-color-foreground-light)',
        'ds-fg-opaque': 'var(--ds-color-foreground-opaque)',
        'ds-fg-primary': 'var(--ds-color-foreground-primary)',
        'ds-fg-soft': 'var(--ds-color-foreground-soft)',
        'ds-fg-softest': 'var(--ds-color-foreground-softest)',
        
        // Surface colors
        'ds-surface-base': 'var(--ds-color-surface-base)',
        'ds-surface-base-soft': 'var(--ds-color-surface-base-soft)',
        'ds-surface-subdued': 'var(--ds-color-surface-subdued)',
        
        // State colors
        'ds-state-active': 'var(--ds-color-state-active)',
        'ds-state-focus': 'var(--ds-color-state-focus)',
        'ds-state-hover': 'var(--ds-color-state-hover)',
        
        // Status colors
        'ds-status-attention': 'var(--ds-color-status-attention)',
        'ds-status-attention-subtle': 'var(--ds-color-status-attention-subtle)',
        'ds-status-danger': 'var(--ds-color-status-danger)',
        'ds-status-danger-subtle': 'var(--ds-color-status-danger-subtle)',
        'ds-status-info': 'var(--ds-color-status-info)',
        'ds-status-info-subtle': 'var(--ds-color-status-info-subtle)',
        'ds-status-success': 'var(--ds-color-status-success)',
        'ds-status-success-subtle': 'var(--ds-color-status-success-subtle)',
        
        // Divider colors
        'ds-divider-soft': 'var(--ds-color-divider-soft)',
        'ds-divider-solid': 'var(--ds-color-divider-solid)',
        
        // Disabled colors
        'ds-disabled-bg': 'var(--ds-color-disabled-bg)',
        'ds-disabled-divider': 'var(--ds-color-disabled-divider)',
        'ds-disabled-text': 'var(--ds-color-disabled-text)',
        
        // Button colors
        'ds-btn-primary-bg-destructive': 'var(--ds-color-button-primary-bg-destructive)',
        'ds-btn-primary-bg-neutral': 'var(--ds-color-button-primary-bg-neutral)',
        'ds-btn-primary-bg-success': 'var(--ds-color-button-primary-bg-success)',
        'ds-btn-secondary-bg-destructive': 'var(--ds-color-button-secondary-bg-destructive)',
        'ds-btn-secondary-bg-neutral': 'var(--ds-color-button-secondary-bg-neutral)',
        'ds-btn-secondary-bg-success': 'var(--ds-color-button-secondary-bg-success)',
        'ds-btn-secondary-border-destructive': 'var(--ds-color-button-secondary-border-destructive)',
        'ds-btn-secondary-border-neutral': 'var(--ds-color-button-secondary-border-neutral)',
        'ds-btn-secondary-border-success': 'var(--ds-color-button-secondary-border-success)',
        
        // Raw color palette
        'ds-blue': {
          50: 'var(--ds-color-blue-50)',
          100: 'var(--ds-color-blue-100)',
          200: 'var(--ds-color-blue-200)',
          300: 'var(--ds-color-blue-300)',
          400: 'var(--ds-color-blue-400)',
          500: 'var(--ds-color-blue-500)',
          600: 'var(--ds-color-blue-600)',
          700: 'var(--ds-color-blue-700)',
          800: 'var(--ds-color-blue-800)',
          900: 'var(--ds-color-blue-900)',
          950: 'var(--ds-color-blue-950)',
        },
        'ds-green': {
          50: 'var(--ds-color-green-50)',
          100: 'var(--ds-color-green-100)',
          200: 'var(--ds-color-green-200)',
          300: 'var(--ds-color-green-300)',
          400: 'var(--ds-color-green-400)',
          500: 'var(--ds-color-green-500)',
          600: 'var(--ds-color-green-600)',
          700: 'var(--ds-color-green-700)',
          800: 'var(--ds-color-green-800)',
          900: 'var(--ds-color-green-900)',
          950: 'var(--ds-color-green-950)',
        },
        'ds-red': {
          50: 'var(--ds-color-red-50)',
          100: 'var(--ds-color-red-100)',
          200: 'var(--ds-color-red-200)',
          300: 'var(--ds-color-red-300)',
          400: 'var(--ds-color-red-400)',
          500: 'var(--ds-color-red-500)',
          600: 'var(--ds-color-red-600)',
          700: 'var(--ds-color-red-700)',
          800: 'var(--ds-color-red-800)',
          900: 'var(--ds-color-red-900)',
          950: 'var(--ds-color-red-950)',
        },
        'ds-purple': {
          50: 'var(--ds-color-purple-50)',
          100: 'var(--ds-color-purple-100)',
          200: 'var(--ds-color-purple-200)',
          300: 'var(--ds-color-purple-300)',
          400: 'var(--ds-color-purple-400)',
          500: 'var(--ds-color-purple-500)',
          600: 'var(--ds-color-purple-600)',
          700: 'var(--ds-color-purple-700)',
          800: 'var(--ds-color-purple-800)',
          900: 'var(--ds-color-purple-900)',
          950: 'var(--ds-color-purple-950)',
        },
        'ds-neutral': {
          50: 'var(--ds-color-neutral-50)',
          100: 'var(--ds-color-neutral-100)',
          200: 'var(--ds-color-neutral-200)',
          300: 'var(--ds-color-neutral-300)',
          400: 'var(--ds-color-neutral-400)',
          500: 'var(--ds-color-neutral-500)',
          600: 'var(--ds-color-neutral-600)',
          700: 'var(--ds-color-neutral-700)',
          800: 'var(--ds-color-neutral-800)',
          900: 'var(--ds-color-neutral-900)',
          950: 'var(--ds-color-neutral-950)',
        },
        'ds-yellow': {
          50: 'var(--ds-color-yellow-50)',
          100: 'var(--ds-color-yellow-100)',
          200: 'var(--ds-color-yellow-200)',
          300: 'var(--ds-color-yellow-300)',
          400: 'var(--ds-color-yellow-400)',
          500: 'var(--ds-color-yellow-500)',
          600: 'var(--ds-color-yellow-600)',
          700: 'var(--ds-color-yellow-700)',
          800: 'var(--ds-color-yellow-800)',
          900: 'var(--ds-color-yellow-900)',
          950: 'var(--ds-color-yellow-950)',
        },
        'ds-brown': {
          50: 'var(--ds-color-brown-50)',
          100: 'var(--ds-color-brown-100)',
          200: 'var(--ds-color-brown-200)',
          300: 'var(--ds-color-brown-300)',
          400: 'var(--ds-color-brown-400)',
          500: 'var(--ds-color-brown-500)',
          600: 'var(--ds-color-brown-600)',
          700: 'var(--ds-color-brown-700)',
          800: 'var(--ds-color-brown-800)',
          900: 'var(--ds-color-brown-900)',
          950: 'var(--ds-color-brown-950)',
        },
      },
      
      // Z-index values
      zIndex: {
        'ds-under': 'var(--ds-zindex-under)', // -1
        'ds-bottom': 'var(--ds-zindex-bottom)', // 1
        'ds-middle': 'var(--ds-zindex-middle)', // 2
        'ds-top': 'var(--ds-zindex-top)', // 3
      },
      
      // Min widths
      minWidth: {
        'ds-select': 'var(--select-min-width)', // 150px
        'ds-popover': 'var(--popover-min-width)', // 150px
      },
    },
  },
  plugins: [],
}