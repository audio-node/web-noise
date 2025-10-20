import { useNode, useTheme } from "@web-noise/core";
import {
  ColorInput,
  ConfigPanel,
  ConfigRow,
  ConfigRowControl,
  ConfigRowLabel,
  ConfigRowSeparator,
} from "@web-noise/core/components";
import { ADSRProps } from "./types";

const ADSRConfig = ({ id, data }: ADSRProps) => {
  const theme = useTheme();
  const { updateNodeConfig } = useNode(id);

  const { config = {} } = data;
  const { backgroundColor, colors } = config;

  return (
    <ConfigPanel theme={theme}>
      <ConfigRow theme={theme}>
        <ConfigRowLabel>Background Color</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <ColorInput
            value={backgroundColor}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, backgroundColor: value });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
      <ConfigRow theme={theme}>
        <ConfigRowLabel>Attack Color</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <ColorInput
            value={colors?.attack}
            onChange={(value) => {
              updateNodeConfig?.({
                ...config,
                colors: { ...colors, attack: value },
              });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
      <ConfigRow theme={theme}>
        <ConfigRowLabel>Decay Color</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <ColorInput
            value={colors?.decay}
            onChange={(value) => {
              updateNodeConfig?.({
                ...config,
                colors: { ...colors, decay: value },
              });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
      <ConfigRow theme={theme}>
        <ConfigRowLabel>Sustain Color</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <ColorInput
            value={colors?.sustain}
            onChange={(value) => {
              updateNodeConfig?.({
                ...config,
                colors: { ...colors, sustain: value },
              });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
      <ConfigRow theme={theme}>
        <ConfigRowLabel>Release Color</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <ColorInput
            value={colors?.release}
            onChange={(value) => {
              updateNodeConfig?.({
                ...config,
                colors: { ...colors, release: value },
              });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
      <ConfigRowSeparator theme={theme} />
    </ConfigPanel>
  );
};

export default ADSRConfig;
