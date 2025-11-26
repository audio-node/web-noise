import { theme } from "@web-noise/core";
import { StickerConfig } from "./types";

const config: Required<StickerConfig> = {
  transparentBackground: false,
  backgroundColor: theme.colors.elevation2,
  textColor: theme.colors.whitePrimary,
};

export default config;
