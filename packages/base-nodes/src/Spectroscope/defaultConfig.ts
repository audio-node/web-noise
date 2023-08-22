import { theme } from "@web-noise/core";
import { SpectroscopeConfig } from "./types";

const config: Required<SpectroscopeConfig> = {
  backgroundColor: theme.colors.elevation1,
  inputColor: theme.colors.accent2,
  size: { width: 280, height: 150 },
};

export default config;
