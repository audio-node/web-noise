import { useNode, useTheme } from "@web-noise/core";
import {
  ColorInput,
  NumberInput,
  ConfigPanel,
  ConfigRow,
  ConfigRowControl,
  ConfigRowLabel,
  ConfigRowSeparator,
} from "@web-noise/core/components";
import { SequencerProps } from "./types";

const SequencerConfig = ({ id, data }: SequencerProps) => {
  const theme = useTheme();
  const { updateNodeValues, updateNodeConfig } = useNode(id);

  const { config, values } = data || {};

  const { color } = config || {};

  const { sequence } = values || {};

  return (
    <ConfigPanel theme={theme}>
      <ConfigRow theme={theme}>
        <ConfigRowLabel>Steps</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <NumberInput
            min={2}
            max={32}
            value={sequence?.length}
            onChange={(value) => {
              const newSequence = Array.from({ length: value }).map(
                (value, index) => sequence?.[index] || [0, 0],
              );
              updateNodeValues({ ...values, sequence: newSequence });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
      <ConfigRowSeparator theme={theme} />
      <ConfigRow theme={theme}>
        <ConfigRowLabel>Color</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <ColorInput
            value={color}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, color: value });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
    </ConfigPanel>
  );
};

export default SequencerConfig;
