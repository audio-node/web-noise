import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useTheme, WNNodeProps } from "@web-noise/core";
import { Oscilloscope as TOscilloscope } from "./audioNode";
import Grid from "./Grid";
import Scope from "../components/Scope";
import { OscilloscopeData } from "./types";

export interface OscilloscopeProps {
  node: WNNodeProps<OscilloscopeData>;
  audioNode?: TOscilloscope | null;
  updateNodeValues: (value: any) => void;
}

const Stage = styled.div<{ backgroundColor?: string }>`
  position: relative;
  height: 100%;
  width: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor};
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Oscilloscope = ({ node: props, audioNode }: OscilloscopeProps) => {
  const { data } = props;
  const theme = useTheme();

  const [ports, setPorts] = useState<[MessagePort, MessagePort]>();

  const { config = {} } = data;
  const {
    showGrid,
    backgroundColor,
    gridColor = theme.colors.whitePrimary,
    input1Color = theme.colors.accent2,
    input2Color = theme.colors.vivid1,
    minValue,
    maxValue,
    gridRows,
    gridColumns,
  } = config;

  useEffect(() => {
    if (!audioNode) {
      return;
    }
    const channel1 = new MessageChannel();
    channel1.port2.start();

    const channel2 = new MessageChannel();
    channel2.port2.start();

    audioNode.registerPorts([channel1.port1, channel2.port1])
    setPorts([channel1.port2, channel2.port2]);
  }, [audioNode]);

  if (!ports) {
    return null;
  }

  return (
    <Stage backgroundColor={backgroundColor}>
      {showGrid ? (
        <Grid
          color={gridColor}
          minValue={minValue}
          maxValue={maxValue}
          rows={gridRows}
          columns={gridColumns}
        />
      ) : null}
      <Scope
        port={ports[0]}
        color={input1Color}
        minValue={minValue}
        maxValue={maxValue}
      />
      <Scope
        port={ports[1]}
        color={input2Color}
        minValue={minValue}
        maxValue={maxValue}
      />
    </Stage>
  );
};

export default Oscilloscope;
