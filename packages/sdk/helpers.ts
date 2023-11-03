import type {
  InputPort,
  OutputPort,
  PluginConfig,
  WNAudioNode,
} from "@web-noise/core/src/types";

import type { AudioNodeTypes } from "@web-noise/patch";

type GetPluginNodes = (plugins: PluginConfig[]) => AudioNodeTypes;

export const getPluginNodes: GetPluginNodes = (plugins) => {
  return plugins.reduce((acc, plugin) => {
    return {
      ...acc,
      ...plugin.components.reduce(
        (subAcc, item) => ({
          ...subAcc,
          [item.type]: item.audioNode,
        }),
        {},
      ),
    };
  }, {});
};

type FlattenPorts = (
  ports: Pick<WNAudioNode, "inputs" | "outputs">,
) => Record<string, InputPort["port"] | OutputPort["port"]>;

export const flattenPorts: FlattenPorts = (ports) =>
  Object.keys(ports).reduce(
    (acc, key) => ({
      ...acc,
      [key]: ports[key].port,
    }),
    {},
  );
