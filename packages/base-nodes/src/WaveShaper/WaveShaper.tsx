import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "@emotion/styled";
import { WNAudioNode, WNNodeProps, useTheme, Theme } from "@web-noise/core";
//@ts-ignore
import { CanvasSpliner } from "CanvasSpliner";
import Select from "../components/Select";
import SplineEditor from "../components/SplineEditor";
import { WaveShaperValues, WaveShaperConfig, WaveShaperData } from "./types";

class Spliner extends CanvasSpliner {
  _updateMousePosition(evt: MouseEvent) {
    const rect = this._canvas?.getBoundingClientRect();

    const scaleX = this._canvas.width / rect.width;
    const scaleY = this._canvas.height / rect.height;

    this._mouse = {
      x: (evt.clientX - rect.left) * scaleX,
      y: this._height - (evt.clientY - rect.top) * scaleY,
    };
  }

  getPoints() {
    const xFactor = 1 / this._width;
    const yFactor = 1 / this._height;
    return this._pointCollection._points.map(({ x, y }) => ({
      x: x * xFactor,
      y: y * yFactor,
    }));
  }

  removeAll() {
    const length = this._pointCollection.getNumberOfPoints();
    for (let i = length; i > 0; i--) {
      this._pointCollection.remove(i - 1);
    }
  }

  update(points: Array<{ x: number; y: number }>) {
    this.removeAll();

    const xFactor = this._width;
    const yFactor = this._height;
    points.forEach(({ x, y }) => {
      this._pointCollection.add({ x: x * xFactor, y: y * yFactor });
    });

    this.draw();
  }
}

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
