import { PluginComponent, theme } from "@web-noise/core";
import WaveShaper from "./WaveShaper";
import node from "./Node";
import audioNode from "./audioNode";
import configNode from "./Config";

const plugin: PluginComponent = {
  type: "waveShaper",
  controlPanelNode: WaveShaper,
  node,
  audioNode,
  configNode,
  resizable: true,
  defaultConfig: {
    size: { width: 300, height: 340 },
    curveColor: theme.colors.accent2,
    gridColor: theme.colors.elevation2,
    controlPointColor: theme.colors.vivid1,
    textColor: '#cf1616',
  },
};

export default plugin;
