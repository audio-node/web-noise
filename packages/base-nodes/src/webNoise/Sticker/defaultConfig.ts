import { theme } from "@web-noise/core";
import { StickerConfig } from './types'

const config: Required<StickerConfig> = {
  transparentBackground: false,
  backgroundColor: theme.colors.elevation2,
  textColor: theme.colors.whitePrimary,
  size: { width: 280, height: 150 },
};

export default config;
