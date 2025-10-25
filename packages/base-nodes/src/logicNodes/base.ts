import type { PluginConfig } from "@web-noise/core";
import NotGate from "./NotGate/base";
import AndGate from "./AndGate/base";
import OrGate from "./OrGate/base";
import NorGate from "./NorGate/base";
import NandGate from "./NandGate/base";
import XorGate from "./XorGate/base";
import XnorGate from "./XnorGate/base";
import ImplyGate from "./ImplyGate/base";
import NimplyGate from "./NimplyGate/base";

export const logicNodes: PluginConfig = {
  components: [
    NotGate,
    AndGate,
    OrGate,
    NorGate,
    NandGate,
    XorGate,
    XnorGate,
    ImplyGate,
    NimplyGate,
  ],
  name: "Logic nodes",
  description: "A Set of logic nodes",
};

export default logicNodes;
