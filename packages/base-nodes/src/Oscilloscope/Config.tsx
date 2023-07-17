import styled from "@emotion/styled";
import { Theme, useNode, useTheme } from "@web-noise/core";
import {
  ConfigPanel,
  ConfigRow,
  ConfigRowControl,
  ConfigRowLabel,
  ConfigRowSeparator,
} from "../components/NodeConfig";
import ColorInput from "../components/ColorInput";
import Checker from "../components/Checker";
import NumberInput from "../components/NumberInput";
import { OscilloscopeProps } from "./types";

const NumberInputStyled = styled(NumberInput)<{ theme: Theme }>`
  display: flex;
  height: 1.5rem;
  &::after {
    display: none;
  }
  input {
    box-sizing: border-box;
    height: 100%;
    color: inherit;
    padding: 0.2rem 0.4rem;
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      margin-right: 0;
    }
  }
`;

const OscilloscopeConfig = ({ id, data }: OscilloscopeProps) => {
  const theme = useTheme();
  const { updateNodeConfig } = useNode(id);

  const { config = {} } = data;
  const {
    minValue,
    maxValue,
    backgroundColor,
    input1Color,
    input2Color,
    showGrid,
    gridColor,
    gridRows,
    gridColumns,
  } = config;

  return (
    <ConfigPanel theme={theme}>
      <ConfigRow theme={theme}>
        <ConfigRowLabel>min value</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <NumberInputStyled
            theme={theme}
            value={minValue}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, minValue: value });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
      <ConfigRow theme={theme}>
        <ConfigRowLabel>max value</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <NumberInputStyled
            theme={theme}
            value={maxValue}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, maxValue: value });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>

      <ConfigRowSeparator theme={theme} />

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
            value={input1Color}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, input1Color: value });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
      <ConfigRow theme={theme}>
        <ConfigRowLabel>Input2 Color</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <ColorInput
            value={input2Color}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, input2Color: value });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>

      <ConfigRowSeparator theme={theme} />

      <ConfigRow oneLineLabels theme={theme}>
        <ConfigRowControl theme={theme}>
          <Checker
            label="Show Grid"
            value={true}
            checked={showGrid}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, showGrid: value });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
      {showGrid && (
        <>
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
            <ConfigRowLabel>Rows</ConfigRowLabel>
            <ConfigRowControl theme={theme}>
              <NumberInputStyled
                theme={theme}
                min={0}
                max={32}
                step={2}
                value={gridRows}
                onChange={(value) => {
                  updateNodeConfig?.({ ...config, gridRows: value });
                }}
              />
            </ConfigRowControl>
          </ConfigRow>
          <ConfigRow theme={theme}>
            <ConfigRowLabel>Columns</ConfigRowLabel>
            <ConfigRowControl theme={theme}>
              <NumberInputStyled
                theme={theme}
                min={0}
                max={64}
                step={2}
                value={gridColumns}
                onChange={(value) => {
                  updateNodeConfig?.({ ...config, gridColumns: value });
                }}
              />
            </ConfigRowControl>
          </ConfigRow>
        </>
      )}
    </ConfigPanel>
  );
};

export default OscilloscopeConfig;
