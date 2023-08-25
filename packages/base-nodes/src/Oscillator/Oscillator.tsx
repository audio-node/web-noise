import { useEffect } from "react";
import styled from "@emotion/styled";
import { WNAudioNode, WNNodeProps, useTheme, Theme } from "@web-noise/core";
import { OscillatorValues, OscillatorConfig, OscillatorData } from "./types";
import { SawToothIcon, SineIcon, SquareIcon, TriangleIcon } from "./icons";

const OscillatorWrapper = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0.2rem 0.4rem;
  box-sizing: border-box;
`;

const IconsWrapper = styled.div<{ theme: Theme }>`
  flex: 1;
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  align-items: center;
`;

const Icon = styled.div<{ selected: boolean; theme: Theme }>`
  cursor: pointer;
  height: 50%;
  text-align: center;
  color: ${({ selected, theme }) =>
    selected ? theme.colors.accent2 : theme.colors.highlight1};
  svg {
    height: 100%;
    fill: currentColor;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.accent3};
  }
`;

const oscillatorTypes = [
  {
    icon: <SineIcon />,
    value: "sine",
  },
  {
    icon: <SawToothIcon />,
    value: "sawtooth",
  },
  {
    icon: <TriangleIcon />,
    value: "triangle",
  },
  {
    icon: <SquareIcon />,
    value: "square",
  },
];

export interface OscillatorProps {
  node: WNNodeProps<OscillatorData>;
  audioNode?: WNAudioNode | null;
  updateNodeValues: (value: any) => void;
}

const Oscillator = ({
  node: props,
  audioNode,
  updateNodeValues,
}: OscillatorProps) => {
  const { data } = props;
  const theme = useTheme();

  useEffect(
    () => audioNode?.setValues?.(data.values),
    [audioNode, data.values]
  );

  const values = data.values || {};
  const { type = "sine" } = values;

  return (
    <OscillatorWrapper theme={theme}>
      <IconsWrapper theme={theme}>
        {oscillatorTypes.map(
          ({ icon, value: optionValue }: any, index: number) => (
            <Icon
              key={index}
              onClick={() => updateNodeValues({ ...values, type: optionValue })}
              theme={theme}
              selected={optionValue === type}
            >
              {icon}
            </Icon>
          )
        )}
      </IconsWrapper>
    </OscillatorWrapper>
  );
};

export default Oscillator;
