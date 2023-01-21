import styled from "@emotion/styled";
import {
  useAudioNode,
  useNode,
  useTheme,
  WNNode,
  WNNodeProps,
} from "@web-noise/core";
import { LevaPanel, useControls, useCreateStore } from "leva";
import { useEffect, FC } from "react";
import { Resizable } from "re-resizable";
import { Oscolloscope as TOscilloscope } from "../../audioNodes/oscilloscope";
import Grid from "./Grid";
import Scope from "./Scope";

interface OscilloscopeData {
  config?: {
    input1Color?: string;
    input2Color?: string;
    showGrid?: boolean;
    gridColor?: string;
    size?: { width: number; height: number };
  };
}

const Stage = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Oscilloscope: FC<WNNodeProps<OscilloscopeData>> = (props) => {
  const { id, data } = props;
  const { node } = useAudioNode<TOscilloscope>(id) || {};
  const { updateNodeConfig } = useNode(id);

  const theme = useTheme();

  const store = useCreateStore();

  const {
    input1Color = theme.colors.accent2,
    input2Color = theme.colors.vivid1,
    showGrid = false,
    gridColor = theme.colors.whitePrimary,
    size = { width: 280, height: 150 },
  } = data.config || {};

  const config = useControls(
    "settings",
    {
      input1Color: { value: input1Color, label: "Input1 Color" },
      input2Color: { value: input2Color, label: "Input2 Color" },
      showGrid: {
        value: showGrid,
        label: "Show Grid",
      },
      gridColor: {
        value: gridColor,
        label: "Grid Color",
        render: (get) => get("settings.showGrid"),
      },
    },
    { collapsed: true, color: theme.colors.accent2 },
    { store: store }
  );

  useEffect(
    () => updateNodeConfig({ ...config, size }),
    [config, size, updateNodeConfig]
  );

  const { width, height } = size;

  return (
    <WNNode {...props}>
      <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
      {node && (
        <Resizable
          enable={{
            top: false,
            right: true,
            bottom: true,
            left: false,
            topRight: false,
            bottomRight: true,
            bottomLeft: false,
            topLeft: false,
          }}
          minWidth={280}
          minHeight={50}
          size={{ width, height }}
          onResizeStop={(e, direction, ref, d) => {
            console.log(5555);
            updateNodeConfig({
              ...config,
              size: {
                width: width + d.width,
                height: height + d.height,
              },
            });
          }}
        >
          <Stage>
            {showGrid ? <Grid color={gridColor} /> : null}
            <Scope analyser={node.input1Analyser} color={input1Color} />
            <Scope analyser={node.input2Analyser} color={input2Color} />
          </Stage>
        </Resizable>
      )}
    </WNNode>
  );
};

export default Oscilloscope;
