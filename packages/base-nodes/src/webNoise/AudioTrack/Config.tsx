import { useNode, useTheme } from "@web-noise/core";
import {
  ColorInput,
  ConfigPanel,
  ConfigRow,
  ConfigRowControl,
  ConfigRowLabel,
  ConfigRowSeparator,
} from "@web-noise/core/components";
import { AudioTrackProps } from "./types";

const AudioTrackConfig = ({ id, data }: AudioTrackProps) => {
  const theme = useTheme();
  const { updateNodeConfig } = useNode(id);

  const { config = {} } = data;
  const { waveColor, progressColor, rangeColor } = config;

  return (
    <ConfigPanel theme={theme}>
      <ConfigRow theme={theme}>
        <ConfigRowLabel>Wave Color</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <ColorInput
            value={waveColor}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, waveColor: value });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
      <ConfigRow theme={theme}>
        <ConfigRowLabel>Progress Color</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <ColorInput
            value={progressColor}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, progressColor: value });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
      <ConfigRow theme={theme}>
        <ConfigRowLabel>Range Color</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <ColorInput
            value={rangeColor}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, rangeColor: value });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
    </ConfigPanel>
  );
};

export default AudioTrackConfig;
