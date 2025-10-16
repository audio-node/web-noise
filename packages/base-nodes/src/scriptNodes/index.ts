import type { PluginConfig } from "@web-noise/core";
import Script from "./Script";
import WorkletScript from "./WorkletScript";

const scriptNodes: PluginConfig = {
  components: [Script, WorkletScript],
  name: "Script nodes",
  description:
    "Programmable audio nodes that execute custom JavaScript code for creating unique audio processors, effects, and routing logic, debugging and sketching up audio graphs. Includes both control-rate and audio-rate processing options.",
};

export default scriptNodes;
