import { themes } from "@storybook/theming";
import { LEVA_COLORS } from "../src/styles/consts";

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
    dark: { ...themes.dark, appBg: LEVA_COLORS.elevation1 },
    // Override the default light theme
    light: { ...themes.normal, appBg: "white" },
    current: "dark",
  },
};
