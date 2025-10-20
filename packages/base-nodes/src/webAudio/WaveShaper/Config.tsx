import { useNode, useTheme } from "@web-noise/core";
import {
  ColorInput,
  ConfigPanel,
  ConfigRow,
  ConfigRowControl,
  ConfigRowLabel,
  ConfigRowSeparator,
} from "@web-noise/core/components";
import { WaveShaperProps } from "./types";

const WaveShaperConfig = ({ id, data }: WaveShaperProps) => {
  const theme = useTheme();
  const { updateNodeValues, updateNodeConfig } = useNode(id);

  const { config = {} } = data;
  const { gridColor, textColor, controlPointColor, curveColor } = config;

  return (
    <ConfigPanel theme={theme}>
      <ConfigRow theme={theme}>
        <ConfigRowLabel>Curve Color</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <ColorInput
            value={curveColor}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, curveColor: value });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
      <ConfigRow theme={theme}>
        <ConfigRowLabel>Point Color</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <ColorInput
            value={controlPointColor}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, controlPointColor: value });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
      <ConfigRow theme={theme}>
        <ConfigRowLabel>Grid Color</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <ColorInput
            value={gridColor}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, gridColor: value });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
      <ConfigRow theme={theme}>
        <ConfigRowLabel>Text Color</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <ColorInput
            value={textColor}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, textColor: value });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
      <ConfigRowSeparator theme={theme} />
    </ConfigPanel>
  );
};

export default WaveShaperConfig;
