import { useEffect, useMemo } from "react";
import styled from "@emotion/styled";
import "rc-slider/assets/index.css";
import { WNAudioNode, WNNodeProps, useTheme, Theme } from "@web-noise/core";
import SliderControl from "../components/Slider";
import DEFAULT_CONFIG from "./defaultConfig";
import { SliderData } from "./types";

const SliderWrapper = styled.div<{ theme: Theme }>`
  display: flex;
  box-sizing: border-box;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  background: ${({ theme }) => theme.colors.elevation2};
`;

export interface SliderProps {
  node: WNNodeProps<SliderData>;
  audioNode?: WNAudioNode | null;
  updateNodeValues: (value: any) => void;
}

const Slider = ({ node: props, audioNode, updateNodeValues }: SliderProps) => {
  const { data } = props;
  const theme = useTheme();

  const { value = 0 } = data.values || {};

  const config = {
    ...DEFAULT_CONFIG,
    ...data.config,
  };
  const { min, max, step, isVertical, color, showScale, scaleSteps } = config;

  const marks = useMemo(() => {
    if (!showScale) {
      return {};
    }

    if (scaleSteps === 1) {
      return {
        [max]: max,
      };
    }

    const step = (max - min) / (scaleSteps - 1);

    return Array.from(
      { length: scaleSteps },
      (_, index) => min + index * step,
    ).reduce(
      (acc, val) => ({
        ...acc,
        [val]: val.toString().slice(0, 4),
      }),
      {},
    );
  }, [min, max, showScale, scaleSteps]);

  useEffect(() => audioNode?.setValues?.(data.values), [audioNode, data]);

  return (
    <SliderWrapper theme={theme}>
      <SliderControl
        theme={theme}
        color={color}
        min={min}
        max={max}
        step={step}
        marks={marks}
        vertical={isVertical}
        value={value}
        onChange={(value) => {
          updateNodeValues?.({ value });
        }}
        onAfterChange={(value) => {
          updateNodeValues?.({ value });
        }}
      />
    </SliderWrapper>
  );
};

export default Slider;
