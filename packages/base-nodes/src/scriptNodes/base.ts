import type { PluginConfig } from "@web-noise/core";
import Script from "./Script/base";
import WorkletScript from "./WorkletScript/base";

const scriptNodes: PluginConfig = {
  components: [Script, WorkletScript],
  name: "Script nodes",
  description: "Script nodes for debug and sketch purposes",
};

export default scriptNodes;
