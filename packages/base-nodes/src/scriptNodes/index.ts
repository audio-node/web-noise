import type { PluginConfig } from "@web-noise/core";
import Script from "./Script";
import WorkletScript from "./WorkletScript";

const scriptNodes: PluginConfig = {
  components: [Script, WorkletScript],
  name: "Script nodes",
  description: "Script nodes for debug and sketch purposes",
};

export default scriptNodes;
