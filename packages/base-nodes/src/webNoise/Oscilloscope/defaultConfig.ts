import { theme } from "@web-noise/core";
import { OscilloscopeConfig } from './types'

const config: Required<OscilloscopeConfig> = {
  minValue: -1,
  maxValue: 1,
  backgroundColor: theme.colors.elevation1,
  input1Color: theme.colors.accent2,
  input2Color: theme.colors.vivid1,
  showGrid: false,
  gridColor: theme.colors.whitePrimary,
  gridRows: 4,
  gridColumns: 8,
  size: { width: 280, height: 150 },
};

export default config;
