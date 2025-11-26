import { theme } from "@web-noise/core";
import { ADSRConfig } from "./types";

const config: Required<ADSRConfig> = {
  backgroundColor: theme.colors.elevation1,
  colors: {
    attack: theme.colors.accent2,
    decay: theme.colors.accent2,
    sustain: theme.colors.accent2,
    release: theme.colors.accent2,
  },
};

export default config;
