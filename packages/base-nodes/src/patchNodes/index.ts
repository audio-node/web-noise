import type { PluginConfig } from "@web-noise/core";
import Patch from "./Patch";
import Inlet from "./Inlet";
import Outlet from "./Outlet";

export const patchNodes: PluginConfig = {
  components: [Patch, Inlet, Outlet],
  name: "Patch nodes",
};

export default patchNodes;
