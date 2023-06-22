---
to: src/<%= name %>/Config.tsx
---
import { useNode, useTheme } from "@web-noise/core";
import {
  ConfigPanel,
  ConfigRow,
  ConfigRowControl,
  ConfigRowLabel,
  ConfigRowSeparator,
} from "../components/NodeConfig";
import { <%= componentName %>Props } from "./types";

const <%= componentName %>Config = ({ id, data }: <%= componentName %>Props) => {
  const theme = useTheme();
  const { updateNodeValues } = useNode(id);

  const { config = {} } = data;

  return (
    <ConfigPanel theme={theme}>
      <ConfigRow oneLineLabels theme={theme}>
        <ConfigRowLabel>label</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          ...control...
        </ConfigRowControl>
      </ConfigRow>
      <ConfigRowSeparator theme={theme} />

    </ConfigPanel>
  );
};

export default <%= componentName %>Config;
