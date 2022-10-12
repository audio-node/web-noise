import styled from "@emotion/styled";
import { useAudioNode, useNode, useTheme, WNNode, WNNodeProps } from "@web-noise/core";
import { LevaPanel, useControls, useCreateStore } from "leva";
import { useEffect, FC } from "react";
import { Oscolloscope as TOscilloscope } from "../../audioNodes/oscilloscope";
import Grid from "./Grid";
import Scope from "./Scope";

interface OscilloscopeData {
  label: string;
  config?: {
    input1Color?: string;
    input2Color?: string;
    showGrid?: boolean;
    gridColor?: string;
  };
}

const Stage = styled.div`
  position: relative;
  height: 10rem;
  width: 100%;
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Oscilloscope: FC<WNNodeProps<OscilloscopeData>> = ({ data, id }) => {
  const { node } = useAudioNode<TOscilloscope>(id) || {};
  const { updateNodeConfig } = useNode(id);

  const theme = useTheme();

  const store = useCreateStore();

  const {
    input1Color = theme.colors.accent2,
    input2Color = theme.colors.vivid1,
    showGrid = false,
    gridColor = theme.colors.whitePrimary,
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

  useEffect(() => updateNodeConfig(config), [config, updateNodeConfig]);

  return (
    <WNNode id={id}>
      <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
      {node && (
        <Stage>
          {showGrid ? <Grid color={gridColor} /> : null}
          <Scope analyser={node.input1Analyser} color={input1Color} />
          <Scope analyser={node.input2Analyser} color={input2Color} />
        </Stage>
      )}
    </WNNode>
  );
};

export default Oscilloscope;
