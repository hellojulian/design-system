import '../src/css/main.css';
import { themes } from '@storybook/theming';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';
import React from 'react';
import { addons } from '@storybook/preview-api';
import { DocsContainer } from './docs-container';

const channel = addons.getChannel();

const withThemeProvider = (Story) => {
  const [isDark, setDark] = React.useState(false);

  React.useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, setDark);
    return () => channel.off(DARK_MODE_EVENT_NAME, setDark);
  }, [channel, setDark]);

  document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
  return Story();
};

const preview = {
  decorators: [withThemeProvider],
  parameters: {
    backgrounds: { disable: true },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      container: DocsContainer,
      source: { 
        type: 'code',
        state: 'open',
        excludeDecorators: true
      },
      canvas: {
        sourceState: 'shown'
      },
      story: {
        inline: true,
        height: 'auto'
      }
    },
    options: {
      storySort: {
        order: ['Foundations', 'Components']
      }
    },
    viewMode: 'docs',
    previewTabs: {
      'storybook/docs/panel': { hidden: false }
    }
  },
};

export default preview;
