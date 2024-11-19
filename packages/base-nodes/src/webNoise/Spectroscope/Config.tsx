import { useNode, useTheme } from "@web-noise/core";
import ColorInput from "../../components/ColorInput";
import {
  ConfigPanel,
  ConfigRow,
  ConfigRowControl,
  ConfigRowLabel,
} from "../../components/NodeConfig";
import { SpectroscopeProps } from "./types";

const SpectroscopeConfig = ({ id, data }: SpectroscopeProps) => {
  const theme = useTheme();
  const { updateNodeConfig } = useNode(id);

  const { config = {} } = data;
  const { backgroundColor, inputColor } = config;

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
        <ConfigRowLabel>Input1 Color</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <ColorInput
            value={inputColor}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, inputColor: value });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
    </ConfigPanel>
  );
};

export default SpectroscopeConfig;
