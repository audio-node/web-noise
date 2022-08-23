import { themes } from "@storybook/theming";
import { theme } from "@web-noise/core";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: "fullscreen",
  darkMode: {
    // Override the default dark theme
    dark: { ...themes.dark, appBg: theme.colors.elevation1 },
    // Override the default light theme
    light: { ...themes.normal, appBg: "white" },
    current: "dark",
  },
};
