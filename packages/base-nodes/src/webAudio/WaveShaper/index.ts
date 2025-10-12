import { PluginComponent, theme } from "@web-noise/core";
import WaveShaper from "./WaveShaper";
import node from "./Node";
import base from "./base";
import configNode from "./Config";

const plugin: PluginComponent = {
  ...base,
  node,
  controlPanelNode: WaveShaper,
  configNode,
  resizable: true,
  defaultConfig: {
    size: { width: 300, height: 340 },
    curveColor: theme.colors.accent2,
    gridColor: theme.colors.elevation2,
    controlPointColor: theme.colors.vivid1,
    textColor: "#cf1616",
  },
  name: "Wave Shaper (Distortion Designer)",
  description: `
  A non-linear audio processor that transforms signals using a customizable curve.
  
  Perfect for creating distortion effects, harmonic enhancement, and creative sound design.
  `,
  info: `
  # WaveShaper
  
  Transforms audio signals by mapping input values to output values using a custom curve.

  Use it to create distortion effects, waveshaping, and other creative sound transformations
  by designing your own transfer function.
  
  ## Values
  - Control Points: Define the shape of the transfer function
  - Spline Type: Choose between monotonic (preserves direction) or natural cubic splines
  - Oversample: Reduce aliasing artifacts with 2x or 4x oversampling
  
  The visual editor allows you to create and manipulate the waveshaping curve by adding, 
  moving, and removing control points. The resulting curve maps input audio values 
  (-1 to 1) to output values.

  ## Curve Editor Usage
  - Double click on a point to remove it
  - Double click anywhere else to add a new point
  - Grab a point to move it
  `,
  tags: ["distortion", "waveshaper", "curve"],
  portsDescription: {
    inputs: {
      input: "Audio signal to be processed by the waveshaping curve",
    },
    outputs: {
      output: "Processed audio output with applied waveshaping",
    },
  },
};

export default plugin;
