import { WNNodeProps, WNNodeData } from "@web-noise/core";

export interface StickerValues {
  text: string;
}

export interface StickerConfig {
  transparentBackground: boolean;
  backgroundColor: string;
  textColor: string;
  size?: { width: number; height: number };
}

export type StickerData = WNNodeData<StickerValues, StickerConfig>;

export interface StickerProps extends WNNodeProps<StickerData> {}
