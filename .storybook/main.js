const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app",
    "storybook-dark-mode",
  ],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: ["ts-loader"],
      include: [path.resolve(__dirname, "../")],
      exclude: [path.resolve(__dirname, "../node_modules")],
    });

    config.module.rules.push({
      test: [/\.worker\.(ts|js)$/, /worklet\.(ts|js)$/],
      type: "asset/inline",
      generator: {
        dataUrl: (content) => {
          return `data:application/javascript;base64,${(content.toString('base64'))}`;
        },
      },
      include: [path.resolve(__dirname, "../")],
      exclude: [path.resolve(__dirname, "../node_modules")],
    });

    // Return the altered config
    return config;
  },
};
