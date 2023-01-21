import styled from "@emotion/styled";
import {
  NumberInput,
  Theme,
  useAudioNode,
  useNode,
  useTheme,
  WNNodeProps,
} from "@web-noise/core";
import { FC, useEffect } from "react";
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


interface ParameterData {
  values?: ConstantSourceValues;
}

export type ParameterProps = WNNodeProps<ParameterData>;

const Parameter: FC<ParameterProps> = (props) => {
  const { id, data } = props;
  const theme = useTheme();

  const { node } = useAudioNode<ConstantSource>(id) || {};

  const { updateNodeValues } = useNode(id);

  const { value = 1 } = data.values || {};

  useEffect(() => node?.setValues(data.values), [node, data]);

  return (
    <InputWrapper theme={theme}>
      <NumberInput
        step={1}
        value={value}
        onChange={(value) => {
          updateNodeValues({ value });
        }}
      />
    </InputWrapper>
  );
};

export default Parameter;
