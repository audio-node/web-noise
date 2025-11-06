import { useNode, useTheme } from "@web-noise/core";
import {
  Checker,
  Input,
  ColorInput,
  ConfigPanel,
  ConfigRow,
  ConfigRowControl,
  ConfigRowLabel,
  ConfigRowSeparator,
} from "@web-noise/core/components";
import { GateProps } from "./types";

const ConfigNode = ({ id, data }: GateProps) => {
  const theme = useTheme();
  const { updateNodeConfig } = useNode(id);

  const { config = {} } = data;
  const {
    label,
    color,
    textColor,
    labelOpened,
    colorOpened,
    textColorOpened,
    isToggle,
  } = config;

  return (
    <ConfigPanel theme={theme}>
      <ConfigRow theme={theme}>
        <ConfigRowLabel>label</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <Input
            value={label}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, label: value });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
      <ConfigRow theme={theme}>
        <ConfigRowLabel>color</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <ColorInput
            value={color}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, color: value });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
      <ConfigRow theme={theme}>
        <ConfigRowLabel>text color</ConfigRowLabel>
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

      <ConfigRow oneLineLabels theme={theme}>
        <ConfigRowLabel>Opened State:</ConfigRowLabel>
      </ConfigRow>
      <ConfigRow theme={theme}>
        <ConfigRowLabel>color</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <ColorInput
            value={colorOpened}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, colorOpened: value });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
      <ConfigRow theme={theme}>
        <ConfigRowLabel>text color</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <ColorInput
            value={textColorOpened}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, textColorOpened: value });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
      <ConfigRow oneLineLabels theme={theme}>
        <ConfigRowControl theme={theme}>
          <Checker
            label="is toggle"
            value={true}
            checked={isToggle}
            onChange={(value) => {
              console.log(456654, value);
              updateNodeConfig?.({ ...config, isToggle: value });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
      {isToggle && (
        <ConfigRow theme={theme}>
          <ConfigRowLabel>label</ConfigRowLabel>
          <ConfigRowControl theme={theme}>
            <Input
              value={labelOpened}
              onChange={(value) => {
                updateNodeConfig?.({ ...config, labelOpened: value });
              }}
            />
          </ConfigRowControl>
        </ConfigRow>
      )}
    </ConfigPanel>
  );
};

export default ConfigNode;
