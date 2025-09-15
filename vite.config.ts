import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import postcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  css: {
    postcss: {
      plugins: [postcss, autoprefixer],
    },
  },
  build: {
    lib: {
      entry: {
        'style': resolve(__dirname, 'src/css/main.css'),
        'ds-button': resolve(__dirname, 'src/components/ds-button/ds-button.tsx'),
        'ds-checkbox': resolve(__dirname, 'src/components/ds-checkbox/ds-checkbox.tsx'),
        'ds-popover': resolve(__dirname, 'src/components/ds-popover/ds-popover.tsx'),
        'ds-select': resolve(__dirname, 'src/components/ds-select/ds-select.tsx'),
        'ds-badge': resolve(__dirname, 'src/components/ds-badge/ds-badge.tsx'),
        'ds-radio': resolve(__dirname, 'src/components/ds-radio/ds-radio.tsx'),
        'ds-tooltip': resolve(__dirname, 'src/components/ds-tooltip/ds-tooltip.tsx'),
        'ds-text-input': resolve(__dirname, 'src/components/ds-text-input/ds-text-input.tsx'),
        'ds-switch': resolve(__dirname, 'src/components/ds-switch/ds-switch.tsx'),
        'ds-status-message': resolve(__dirname, 'src/components/ds-status-message/ds-status-message.tsx'),
        'ds-stepper': resolve(__dirname, 'src/components/ds-stepper/ds-stepper.tsx'),
        'ds-toggle': resolve(__dirname, 'src/components/ds-toggle/ds-toggle.tsx'),
        'ds-empty': resolve(__dirname, 'src/components/ds-empty/ds-empty.tsx'),
        'ds-notification': resolve(__dirname, 'src/components/ds-notification/ds-notification.tsx'),
        'ds-modal': resolve(__dirname, 'src/components/ds-modal/ds-modal.tsx'),
        'ds-option-group': resolve(__dirname, 'src/components/ds-option-group/ds-option-group.tsx'),
      },
      fileName: '[name]/index',
      formats: ['cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  plugins: [dts({
    include: 'src/components/*/*.{ts,tsx}',
    exclude: ['src/components/**/*.stories.{ts,tsx}'],
    beforeWriteFile: (filePath, content) => ({
      filePath: filePath.replace(/ds(-[a-z]+)+.d.ts/, 'index.d.ts').replace(/components\//, ''),
      content,
    }),
  })],
});