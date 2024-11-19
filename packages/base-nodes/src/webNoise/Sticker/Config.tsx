import { useNode, useTheme } from "@web-noise/core";
import Checker from "../../components/Checker";
import ColorInput from "../../components/ColorInput";
import {
  ConfigPanel,
  ConfigRow,
  ConfigRowControl,
  ConfigRowLabel,
} from "../../components/NodeConfig";
import { StickerProps } from "./types";

const StickerConfig = ({ id, data }: StickerProps) => {
  const theme = useTheme();
  const { updateNodeConfig } = useNode(id);

  const { config } = data;
  const { transparentBackground, backgroundColor, textColor } = config || {};

  return (
    <ConfigPanel theme={theme}>
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
      <ConfigRow oneLineLabels theme={theme}>
        <ConfigRowControl theme={theme}>
          <Checker
            label="Transparent Background"
            value={true}
            checked={transparentBackground}
            onChange={(value) => {
              console.log(456654, value);
              updateNodeConfig?.({ ...config, transparentBackground: value });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
      {!transparentBackground && (
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
      )}
    </ConfigPanel>
  );
};

export default StickerConfig;
