import styled from "@emotion/styled";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const WaveWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: var(--leva-colors-elevation2);
  text-align: center;
`;

const RangeEdge = ({
  start,
  color,
  width,
  height,
  align,
  onResizeStart,
  onResizeEnd,
}: {
  start: number;
  width: number;
  height: number;
  color: string;
  align: "left" | "right";
  onResizeStart: () => void;
  onResizeEnd: () => void;
}) => {
  const resizeHandleX = align === "left" ? width : start;
  return (
    <>
      <rect
        x={start}
        y={0}
        width={width}
        height={height}
        style={{ fill: color, opacity: 0.1 }}
      />
      <line
        x1={resizeHandleX}
        y1={0}
        x2={resizeHandleX}
        y2={height}
        style={{
          strokeWidth: 8,
          color: "transparent",
          opacity: 0,
          cursor: "col-resize",
        }}
        onMouseDown={() => onResizeStart()}
        onMouseUp={() => onResizeEnd()}
      />
      <line
        x1={resizeHandleX}
        y1={0}
        x2={resizeHandleX}
        y2={height}
        style={{
          stroke: color,
          strokeWidth: 1,
        }}
      />
    </>
  );
};

const Wave = ({
  waveColor = "blue",
  rangeColor = "red",
  progressColor = "grey",
  range = [0, 0],
  port,
  onRangeChange = () => {},
}: {
  waveColor?: string;
  rangeColor?: string;
  progressColor?: string;
  range?: [number, number];
  port: MessagePort;
  onRangeChange?: (range: [number, number]) => void;
}) => {
  const [max, setMax] = useState<number | null>(null);

  const viewPortWidth = 1000;
  const viewPortHeight = 250;
  const maxWidth = max ? viewPortWidth / max : 0;
  const startWidth = range[0] * maxWidth;
  const endPosition = range[1] * maxWidth;
  const endWidth = viewPortWidth - endPosition;

  const stageRef = useRef<SVGSVGElement>(null);

  const [activeRangeEdge, setActiveRangeEdge] = useState<number | null>(null);

  const svgPoint = useMemo(() => {
    return stageRef.current?.createSVGPoint();
  }, [stageRef.current]);

  const handleRangeResize = useCallback(
    (event: any) => {
      if (
        !stageRef.current ||
        !svgPoint ||
        activeRangeEdge === null ||
        max === null
      ) {
        return;
      }
      svgPoint.x = event.clientX;
      const value = +(
        svgPoint.matrixTransform(stageRef.current.getScreenCTM()?.inverse()).x /
        maxWidth
      ).toFixed(2);

      const newRange: [number, number] =
        activeRangeEdge === 0 ? [value, range[1]] : [range[0], value];
      if (
        newRange[0] >= 0 &&
        newRange[0] <= newRange[1] &&
        newRange[1] <= max
      ) {
        onRangeChange(newRange);
      }
    },
    [svgPoint, maxWidth, max, range, stageRef.current, activeRangeEdge],
  );

  const progressRef = useRef<SVGLineElement>(null);
  const waveRef = useRef<SVGPolylineElement>(null);

  const handlePortEvent = useCallback(
    (event: any) => {
      const data = event.data;
      const { name } = data;
      switch (name) {
        case "track":
          const {
            data: {
              length: bufferLength,
              channelData: [audioData],
            },
          } = data;
          const points: Array<string> = [];
          const step = Math.ceil(bufferLength / 1000);
          const sliceWidth = (1000 * 1.0) / bufferLength;
          for (let i = 0; i < bufferLength; i += step) {
            const x = i * sliceWidth;
            const y = ((audioData[i] + 1) * 250) / 2;

            points.push(`${x},${y}`);
          }
          requestAnimationFrame(() => {
            waveRef.current?.setAttribute("points", points.join(" "));
          });
          setMax(data.data.duration);
          break;
        case "time":
          requestAnimationFrame(() => {
            const newValue = data.progress * 1000;
            progressRef.current?.setAttribute("x1", newValue.toString());
            progressRef.current?.setAttribute("x2", newValue.toString());
          });
          break;
      }
    },
    [progressRef.current, waveRef.current, setMax],
  );

  useEffect(() => {
    port.addEventListener("message", handlePortEvent);
    return () => {
      port.removeEventListener("message", handlePortEvent);
    };
  }, [handlePortEvent]);

  return (
    <WaveWrapper>
      <svg
        onMouseMove={handleRangeResize}
        onMouseLeave={() => setActiveRangeEdge(null)}
        ref={stageRef}
        viewBox={[0, 0, viewPortWidth, viewPortHeight].join(" ")}
        style={{ width: "95%", height: "100%" }}
      >
        <polyline
          ref={waveRef}
          style={{ stroke: waveColor, strokeWidth: 1 }}
          points={[
            [0, viewPortHeight / 2].join(","),
            [viewPortWidth, viewPortHeight / 2].join(","),
          ].join(" ")}
        />
        <line
          ref={progressRef}
          x1={0}
          y1={0}
          x2={0}
          y2={viewPortHeight}
          style={{ stroke: progressColor, strokeWidth: 1 }}
        />
        {max && (
          <g>
            <RangeEdge
              start={0}
              width={startWidth}
              height={viewPortHeight}
              color={rangeColor}
              align="left"
              onResizeStart={() => setActiveRangeEdge(0)}
              onResizeEnd={() => setActiveRangeEdge(null)}
            />
            <RangeEdge
              start={endPosition}
              width={endWidth}
              height={viewPortHeight}
              color={rangeColor}
              align="right"
              onResizeStart={() => setActiveRangeEdge(1)}
              onResizeEnd={() => setActiveRangeEdge(null)}
            />
          </g>
        )}
      </svg>
    </WaveWrapper>
  );
};

export default Wave;
