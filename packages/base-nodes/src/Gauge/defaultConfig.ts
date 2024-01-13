import { theme } from "@web-noise/core";
import { GaugeConfig } from "./types";

const config: Required<GaugeConfig> = {
  backgroundColor: theme.colors.elevation1,
  min: -1,
  max: 1,
  majorTicks: 10,
  minorTicks: 50,
  labelsInterval: 5,
  arcColor: theme.colors.whitePrimary,
  arrowColor: theme.colors.vivid1,
  ticksColor: theme.colors.elevation2,
  labelsColor: theme.colors.elevation2,
  labels: [],
  size: { width: 280, height: 120 },
};

export default config;
