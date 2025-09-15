const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/manager-api, @storybook/theming, @storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", "@storybook/addon-mdx-gfm", '@storybook/addon-toolbars', '@storybook/addon-designs', 'storybook-dark-mode', '@a110/storybook-expand-all'],
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  docs: {
    autodocs: "tag"
  },
  webpackFinal: async (config) => {
    // Find CSS rule and modify it to include PostCSS
    const cssRule = config.module.rules.find(rule => 
      rule.test && rule.test.toString().includes('css')
    );
    
    if (cssRule && cssRule.use) {
      // Find existing css-loader
      const cssLoaderIndex = cssRule.use.findIndex(loader => 
        typeof loader === 'object' && loader.loader && loader.loader.includes('css-loader')
      );
      
      if (cssLoaderIndex !== -1) {
        // Insert postcss-loader after css-loader
        cssRule.use.splice(cssLoaderIndex + 1, 0, {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                require('@tailwindcss/postcss'),
                require('autoprefixer'),
              ],
            },
          },
        });
      }
    }
    
    return config;
  }
};
export default config;