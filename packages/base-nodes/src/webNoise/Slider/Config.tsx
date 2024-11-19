import { useNode, useTheme } from "@web-noise/core";
import Checker from "../../components/Checker";
import ColorInput from "../../components/ColorInput";
import {
  ConfigPanel,
  ConfigRow,
  ConfigRowControl,
  ConfigRowLabel,
  ConfigRowSeparator,
} from "../../components/NodeConfig";
import NumberInput from "../../components/NumberInput";
import { SliderProps } from "./types";

const SliderConfig = ({ id, data }: SliderProps) => {
  const theme = useTheme();
  const { updateNodeConfig } = useNode(id);

  const { config } = data;
  const { min, max, step, isVertical, color, showScale, scaleSteps } =
    config || {};

  return (
    <ConfigPanel theme={theme}>
      <ConfigRow theme={theme}>
        <ConfigRowLabel>Min</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <NumberInput
            value={min}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, min: value });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
      <ConfigRow theme={theme}>
        <ConfigRowLabel>Max</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <NumberInput
            value={max}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, max: value });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
      <ConfigRow theme={theme}>
        <ConfigRowLabel>Step</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <NumberInput
            value={step}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, step: value });
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

      <ConfigRow oneLineLabels theme={theme}>
        <ConfigRowControl theme={theme}>
          <Checker
            label="Is vertical"
            value={true}
            checked={isVertical}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, isVertical: value });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>

      <ConfigRowSeparator theme={theme} />

      <ConfigRow oneLineLabels theme={theme}>
        <ConfigRowControl theme={theme}>
          <Checker
            label="Show scale"
            value={true}
            checked={showScale}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, showScale: value });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>

      {showScale && (
        <ConfigRow theme={theme}>
          <ConfigRowLabel>Scale steps</ConfigRowLabel>
          <ConfigRowControl theme={theme}>
            <NumberInput
              value={scaleSteps}
              min={1}
              max={25}
              step={1}
              onChange={(value) => {
                updateNodeConfig?.({ ...config, scaleSteps: value });
              }}
            />
          </ConfigRowControl>
        </ConfigRow>
      )}
    </ConfigPanel>
  );
};

export default SliderConfig;
