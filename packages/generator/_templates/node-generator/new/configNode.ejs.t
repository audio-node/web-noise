---
to: <%= dir %>/<%= componentFolder %>/Config.tsx
skip_if: <%= !hasConfig %>
---
import { useNode, useTheme } from "@web-noise/core";
import {
  ConfigPanel,
  ConfigRow,
  ConfigRowControl,
  ConfigRowLabel,
  ConfigRowSeparator,
} from "@web-noise/core/components";
import { <%= componentName %>Props } from "./types";

const <%= componentName %>Config = ({ id, data }: <%= componentName %>Props) => {
  const theme = useTheme();
  const { updateNodeValues, updateNodeConfig } = useNode(id);

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
