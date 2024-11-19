import type { PluginConfig } from "@web-noise/core";
import Patch from "./Patch/base";
import Inlet from "./Inlet/base";
import Outlet from "./Outlet/base";

export const patchNodes: PluginConfig = {
  components: [Patch, Inlet, Outlet],
  name: "Patch nodes",
};

export default patchNodes;
