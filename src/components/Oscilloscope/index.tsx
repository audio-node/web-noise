import { LevaPanel, useControls, useCreateStore } from "leva";
import { useEffect, useState, useRef, FC } from "react";
import { NodeProps } from "react-flow-renderer";
import styled from "@emotion/styled";
import useFlowNode from "../../hooks/useFlowNode";
import { useNode } from "../../ModuleContext";
import { AnalyserWorklet as Analyser } from "../../nodes";
import { LEVA_COLOR_ACCENT2_BLUE, COLOR_GREEN_PRIMARY, COLOR_WHITE_PRIMARY } from "../../styles/consts";
import { Node } from "../Node";
import Scope from "./Scope";
import Grid from "./Grid";

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


const Oscilloscope = ({ data, id }: NodeProps<OscilloscopeData>) => {
  const { node: analyser, loading } = useNode<Analyser>(id);
  const { updateNodeConfig } = useFlowNode(id);

  const store = useCreateStore();

  const {
    input1Color = LEVA_COLOR_ACCENT2_BLUE,
    input2Color = COLOR_GREEN_PRIMARY,
    showGrid = false,
    gridColor = COLOR_WHITE_PRIMARY,
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
    { collapsed: true, color: LEVA_COLOR_ACCENT2_BLUE },
    { store: store }
  );

  useEffect(() => updateNodeConfig(config), [config]);

  return (
    <Node
      id={id}
      title={data.label}
      inputs={analyser?.inputs}
      outputs={analyser?.outputs}
      loading={loading}
    >
      {analyser ? (
        <>
          <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
          <Stage>
            {showGrid ? <Grid color={gridColor} /> : null}
            <Scope analyser={analyser.input1Analyser} color={input1Color} />
            <Scope analyser={analyser.input2Analyser} color={input2Color} />
          </Stage>
        </>
      ) : (
        <div>loading</div>
      )}
    </Node>
  );
};

export default Oscilloscope;
