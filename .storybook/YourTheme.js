import { create } from '@storybook/theming/create';
// Use require instead of import for the logo
const logoUrl = require('./sb-logo.png');

export default create({
  base: 'light',
  brandTitle: 'Design System',
  brandUrl: 'https://www.figma.com/design/H183SNYASQn8z49YEbqRZj/Design-System?node-id=3782-13078&t=FwlQPmpcAZ1d2IMZ-1',
  brandImage: logoUrl,
  brandTarget: '_blank',
  fontBase: '"Inter", sans-serif',
  fontCode: '"IBM Plex Mono", monospace',
  colorPrimary: "#2856E0",
  colorSecondary: "#2856E0",
  appBg: "#E9ECF5",
  appContentBg: "#E9ECF5",
  appBorderColor: "#BDBFC7",
  appBorderRadius: 4,
  textColor: "#171719",
  textInverseColor: "#F5F6F9",
  textMutedColor: "#47484D",
  barTextColor: "#171719",
  barSelectedColor: "rgba(53, 84, 206, 0.1)",
  barBg: "#F0F4FF",
  buttonBg: "#2856E0",
  booleanBg: "#F0F4FF",
  booleanSelectedBg: "#2856E0",
  inputBg: "#F5F6F9",
  inputBorder: "#BDBFC7",
  inputTextColor: "#171719",
  inputBorderRadius: 4,
});
