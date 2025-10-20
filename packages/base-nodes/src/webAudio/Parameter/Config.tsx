import styled from "@emotion/styled";
import { Theme, useNode, useTheme, WNNodeProps } from "@web-noise/core";
import { NumberInput } from "@web-noise/core/components";
import { ParameterData } from "./Parameter";

export interface ParameterProps extends WNNodeProps<ParameterData> {}

const ConfigRowLabel = styled.div``;

const ConfigRowInput = styled.div<{ theme: Theme }>`
  font-family: var(--leva-fonts-mono);
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.whitePrimary};
`;

const ConfigRow = styled.div`
  position: relative;
  z-index: 100;
  display: grid;
  row-gap: var(--leva-space-rowGap);
  grid-template-rows: minmax(var(--leva-sizes-rowHeight), max-content);
  align-items: center;
  color: var(--leva-colors-highlight2);
  grid-template-columns: auto var(--leva-sizes-controlWidth);
  column-gap: var(--leva-space-colGap);
`;

const ConfigRowInner = styled.div<{ theme: Theme }>`
  padding: 0.2rem 0.4rem;
  background: ${({ theme }) => theme.colors.elevation2};
  font-size: 0.7rem;
  span::after {
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

const ParameterConfig = ({ id, data }: ParameterProps) => {
  const theme = useTheme();
  const { updateNodeConfig } = useNode(id);

  const { config = { min: -Infinity, max: Infinity, step: 1 } } = data;
  const { min, max, step } = config;

  return (
    <ConfigRowInner theme={theme}>
      <ConfigRow>
        <ConfigRowLabel>min</ConfigRowLabel>
        <ConfigRowInput theme={theme}>
          <NumberInput
            value={min}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, min: value });
            }}
          />
        </ConfigRowInput>
      </ConfigRow>
      <ConfigRow>
        <ConfigRowLabel>max</ConfigRowLabel>
        <ConfigRowInput theme={theme}>
          <NumberInput
            value={max}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, max: value });
            }}
          />
        </ConfigRowInput>
      </ConfigRow>
      <ConfigRow>
        <ConfigRowLabel>step</ConfigRowLabel>
        <ConfigRowInput theme={theme}>
          <NumberInput
            value={step}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, step: value });
            }}
          />
        </ConfigRowInput>
      </ConfigRow>
    </ConfigRowInner>
  );
};

export default ParameterConfig;
