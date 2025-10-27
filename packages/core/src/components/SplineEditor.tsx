// @ts-nocheck
import { useCallback, useEffect, useRef, useState } from "react";
//@ts-ignore
import { CanvasSpliner } from "CanvasSpliner";
import styled from "@emotion/styled";
import { theme } from "../../";

export interface SplinePoint {
  x: number;
  y: number;
}

export type SplineType = "monotonic" | "natural";

export type SplinePoints = Array<SplinePoint>;

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

  off(eventName: string, handler: (csObj: Spliner) => void) {
    // @TODO: implement unsibscribe
  }
}

const WaveShaperInner = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  canvas {
    border: none !important;
    position: absolute;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
  }
`;

export interface SplineEditorProps {
  points: Array<{ x: number; y: number }>;
  type?: SplineType;
  textColor?: string;
  curveColor?: string;
  gridStep?: number;
  gridColor?: string;
  controlPointRadius?: number;
  controlPointColor?: string;
  onChange?: (points: SplinePoints) => void;
  onMove?: (points: SplinePoints) => void;
}

export const SplineEditor = ({
  onChange,
  onMove,
  points,
  type = "monotonic",
  textColor = "red",
  curveColor = theme.colors.accent2,
  gridStep = 0.25,
  gridColor = theme.colors.elevation2,
  controlPointRadius = 14,
  controlPointColor = theme.colors.vivid1,
}: SplineEditorProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [spliner, setSpliner] = useState<Spliner>();

  const handlePointsChange = useCallback(
    (csObj: Spliner) => {
      const points: SplinePoints = csObj.getPoints();
      onChange?.(points);
    },
    [onChange],
  );

  const handlePointMove = useCallback(
    (csObj: Spliner) => {
      const points: SplinePoints = csObj.getPoints();
      onMove?.(points);
    },
    [onMove],
  );

  useEffect(() => spliner?.update(points), [spliner, points]);

  useEffect(() => spliner?.setSplineType(type), [spliner, type]);
  useEffect(() => spliner?.setGridStep(gridStep), [spliner, gridStep]);
  useEffect(() => spliner?.setGridColor(gridColor), [spliner, gridColor]);
  useEffect(
    () => spliner?.setControlPointRadius(controlPointRadius),
    [spliner, controlPointRadius],
  );
  useEffect(() => spliner?.setTextColor(textColor), [spliner, textColor]);
  useEffect(() => {
    spliner?.setCurveColor("idle", curveColor);
    // spliner?.setCurveColor("moving", "yellow");
  }, [spliner, curveColor]);
  useEffect(() => {
    spliner?.setControlPointColor("idle", controlPointColor);
    // spliner?.setControlPointColor("hovered", "blue");
    // spliner?.setControlPointColor("grabbed", "black");
  }, [spliner, controlPointColor]);

  useEffect(() => {
    if (!spliner) {
      return;
    }

    spliner.setCurveThickness(4);

    spliner.on("movePoint", handlePointMove);
    spliner.on("releasePoint", handlePointsChange);
    spliner.on("pointAdded", handlePointsChange);
    spliner.on("pointRemoved", handlePointsChange);

    spliner.draw();

    return () => {
      spliner.off("movePoint", handlePointMove);
      spliner.off("releasePoint", handlePointsChange);
      spliner.off("pointAdded", handlePointsChange);
      spliner.off("pointRemoved", handlePointsChange);
    };
  }, [spliner, handlePointsChange, handlePointMove]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const cs = new Spliner(ref.current, 1024, 1024);
    setSpliner(cs);
  }, [ref]);

  return <WaveShaperInner ref={ref} />;
};

export default SplineEditor;
