// .storybook/YourTheme.js

import { create } from '@storybook/theming/create';

const getCssVarStringValue = (varName) => getComputedStyle(document.documentElement).getPropertyValue(varName);

export default create({
  base: 'light',
  // Typography
  fontBase: '"Inter Tight", sans-serif',
  fontCode: '"IBM Plex Mono", monospace',

  brandTitle: 'Design System',
  brandUrl: 'https://www.figma.com/design/H183SNYASQn8z49YEbqRZj/Design-System?node-id=3782-13078&t=FwlQPmpcAZ1d2IMZ-1',
  brandImage: '/Staute.png',
  brandTarget: '_self',

  //
  colorPrimary: 'red',
  colorSecondary: '#585C6D',

  // UI
  appBg: '#ddd',
  appContentBg: '#ffffff',
  appBorderColor: getCssVarStringValue('--ds-color-neutral-50'),
  appBorderRadius: getCssVarStringValue('--ds-border-radius-xlg'),

  // Text colors
  textColor: '#10162F',
  textInverseColor: '#ffffff',

  // Toolbar default and active colors
  barTextColor: '#9E9E9E',
  barSelectedColor: '#585C6D',
  barBg: '#ffffff',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: getCssVarStringValue('--ds-color-divider-solid'),
  inputTextColor: '#10162F',
  inputBorderRadius: getCssVarStringValue('--ds-border-radius-md'),
  colorPrimary: getCssVarStringValue('--ds-color-brand'),
});