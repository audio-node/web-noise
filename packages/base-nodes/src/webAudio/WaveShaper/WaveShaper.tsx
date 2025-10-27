// @ts-nocheck
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "@emotion/styled";
import { WNAudioNode, WNNodeProps, useTheme, Theme } from "@web-noise/core";
import { Select, SplineEditor } from "@web-noise/core/components";
import { WaveShaperValues, WaveShaperConfig, WaveShaperData } from "./types";

const WaveShaperWrapper = styled.div<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 0.5rem;
  gap: 0.5rem;
  box-sizing: border-box;
`;

const WaveShaperValuesBar = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
`;

const ValueSelectLabel = styled.label<{ theme: Theme }>`
  display: flex;
  font-size: 0.5rem;
  align-items: center;
  color: ${({ theme }) => theme.colors.highlight2};
`;

export interface WaveShaperProps {
  node: WNNodeProps<WaveShaperData>;
  audioNode?: WNAudioNode | null;
  updateNodeValues: (value: any) => void;
}

const WaveShaper = ({
  node: props,
  audioNode,
  updateNodeValues,
}: WaveShaperProps) => {
  const { data } = props;
  const theme = useTheme();

  const values = data.values || {};

  const {
    points = [
      { x: 0.25, y: 0.25 },
      { x: 0.75, y: 0.75 },
    ],
    splineType = "monotonic",
    oversample = "none",
  } = values;

  const config = data.config || {};

  const { gridColor, textColor, curveColor, controlPointColor } = config;

  useEffect(() => audioNode?.setValues?.(data.values), [audioNode, data]);

  return (
    <WaveShaperWrapper theme={theme}>
      <WaveShaperValuesBar>
        <ValueSelectLabel theme={theme}>
          <span>type:</span>
          <Select
            value={splineType}
            options={[
              { label: "monotonic", value: "monotonic" },
              { label: "natural", value: "natural" },
            ]}
            onChange={(splineType) =>
              updateNodeValues({ ...values, splineType })
            }
          />
        </ValueSelectLabel>
        <ValueSelectLabel theme={theme}>
          <span>oversample:</span>
          <Select
            value={oversample}
            options={[
              { label: "none", value: "none" },
              { label: "2x", value: "2x" },
              { label: "4x", value: "4x" },
            ]}
            onChange={(newOversample) =>
              updateNodeValues({ ...values, oversample: newOversample })
            }
          />
        </ValueSelectLabel>
      </WaveShaperValuesBar>
      <SplineEditor
        points={points}
        type={splineType}
        gridColor={gridColor}
        textColor={textColor}
        controlPointColor={controlPointColor}
        curveColor={curveColor}
        onChange={(points) => updateNodeValues({ ...data.values, points })}
        onMove={(points) => {
          audioNode?.setValues?.({ points, splineType });
        }}
      />
    </WaveShaperWrapper>
  );
};

export default WaveShaper;
