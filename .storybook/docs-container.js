import React from "react";
import { DocsContainer as BaseContainer } from "@storybook/addon-docs/blocks";
import { useDarkMode } from "storybook-dark-mode";
import { themes } from "@storybook/theming";

const customDarkTheme = {
  ...themes.dark,
  appBg: '#1a1a1a',
  appContentBg: '#111111',
  appBorderColor: '#333333',
  barBg: '#1A1A1A',
  barTextColor: '#ffffff',
  
  // Code area properties
  codeBg: '#1A1A1A',
  colorSecondary: '#666666',
  textMutedColor: '#999999',
  
  // Additional code-related properties
  monospaceFontFamily: '"Hasklig", "Source Code Pro", Monaco, Consolas, monospace',
  fontCode: '"Hasklig", "Source Code Pro", Monaco, Consolas, monospace',
  
  // Try these additional properties that might control code blocks
  inputBg: '#333333',
  inputBorder: '#555555',
  inputTextColor: '#ffffff'
};

export const DocsContainer = ({ children, ...rest }) => {
  const dark = useDarkMode();

  return (
    <BaseContainer {...rest} theme={dark ? customDarkTheme : themes.light}>
      {children}
    </BaseContainer>
  );
};