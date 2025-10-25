import type { PluginConfig } from "@web-noise/core";
import NotGate from "./NotGate";
import AndGate from "./AndGate";
import OrGate from "./OrGate";
import NorGate from "./NorGate";
import NandGate from "./NandGate";
import XorGate from "./XorGate";
import XnorGate from "./XnorGate";
import ImplyGate from "./ImplyGate";
import NimplyGate from "./NimplyGate";

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
