import styled from "@emotion/styled";
import {
  Theme,
  useAudioNode,
  useNode,
  useTheme,
  WNNodeProps,
  WNAudioNode,
} from "@web-noise/core";
import { FC, useEffect } from "react";
import NumberInput from "../components/NumberInput";
import { ConstantSource, ConstantSourceValues } from "./constantSource";

const InputWrapper = styled.div<{ theme: Theme }>`
  background: ${({ theme }) => theme.colors.elevation2};
  font-family: var(--leva-fonts-mono);
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.whitePrimary};
  min-height: 1.5rem;
  display: grid;
  grid-template-areas:
    ".    "
    "input"
    ".    ";
  grid-template-columns: 95%;
  grid-template-rows: auto 70% auto;
  width: 100%;
  justify-content: center;
  span {
    grid-area: input;
    display: flex;
    align-items: center;
    position: relative;
    color: inherit;
    ::after {
      display: none;
    }
  }
  input {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    margin: 0;
    border: 0;
    outline: none;
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
    font-family: inherit;
    padding: 0 0.4rem;
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      margin-right: 0;
    }
  }
`;

export interface ParameterData {
  values?: ConstantSourceValues;
}

export interface ParameterProps  {
  node: WNNodeProps<ParameterData>;
  audioNode?: WNAudioNode | null;
  updateNodeValues?: (param: any) => void;
}

const Parameter: FC<ParameterProps> = ({ node: props, audioNode, updateNodeValues }) => {
  const { data } = props;
  const theme = useTheme();

  const { value = 0 } = data.values || {};

  useEffect(() => audioNode?.setValues?.(data.values), [audioNode, data]);

  return (
    <InputWrapper theme={theme}>
      <NumberInput
        step={1}
        value={value}
        onChange={(value) => {
          updateNodeValues?.({ value });
        }}
      />
    </InputWrapper>
  );
};

export default Parameter;
