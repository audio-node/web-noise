// @TODO: extract it to components
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
}: {
  start: number;
  width: number;
  height: number;
  color: string;
  align: "left" | "right";
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
        }}
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
  port,
}: {
  waveColor?: string;
  rangeColor?: string;
  progressColor?: string;
  port: MessagePort;
}) => {
  const [max, setMax] = useState<number | null>(null);

  const viewPortWidth = 1000;
  const viewPortHeight = 250;
  const maxWidth = max ? viewPortWidth / max : 0;
  const [range, setRange] = useState([0, 0]);
  const startWidth = range[0] * maxWidth;
  const endPosition = range[1] * maxWidth;
  const endWidth = viewPortWidth - endPosition;

  const stageRef = useRef<SVGSVGElement>(null);

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
        case "range":
          const range = data.data;
          setRange(range);
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
            />
            <RangeEdge
              start={endPosition}
              width={endWidth}
              height={viewPortHeight}
              color={rangeColor}
              align="right"
            />
          </g>
        )}
      </svg>
    </WaveWrapper>
  );
};

export default Wave;
