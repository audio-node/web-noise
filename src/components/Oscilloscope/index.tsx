import { LevaPanel, useControls, useCreateStore } from "leva";
import { useEffect, useState, useRef, FC } from "react";
import { NodeProps } from "react-flow-renderer";
import styled from "@emotion/styled";
import useFlowNode from "../../hooks/useFlowNode";
import { useNode } from "../../ModuleContext";
import { AnalyserWorklet as Analyser } from "../../nodes";
import { LEVA_COLOR_ACCENT2_BLUE } from "../../styles/consts";
import { Node } from "../Node";
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

const Grid: FC<{ color: string }> = ({ color }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      return;
    }
    const { height, width } = canvas;
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.2;
    ctx.beginPath();

    const xGap = width / 8;
    for (let x = xGap; x < width; x += xGap) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }

    const yGap = height / 4;
    for (var y = yGap; y < height; y += yGap) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }

    ctx.stroke();

    ctx.font = "10px serif";
    ctx.fillStyle = color;
    ctx.fillText("1", 3, 12);
    ctx.fillText("0", 3, height / 2 + 12);
    ctx.fillText("-1", 2, height - 3);
  }, [color, canvasRef]);

  return <canvas ref={canvasRef} style={{ display: "block", width: "100%" }} />;
};

const Visualizer = ({ data, id }: NodeProps<OscilloscopeData>) => {
  const analyserNode = useNode<Analyser>(id);
  const { updateNodeConfig } = useFlowNode(id);
  const { node } = analyserNode;
  const [analyser, setAnalyser] = useState<Analyser>();

  const store = useCreateStore();

  const {
    input1Color = LEVA_COLOR_ACCENT2_BLUE,
    input2Color = "#14df42",
    showGrid = false,
    gridColor = "#fff",
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

  useEffect(() => {
    node?.then((result: Analyser) => {
      setAnalyser(result);
    });
  }, [node, setAnalyser]);
  useEffect(() => updateNodeConfig(config), [config]);

  return (
    <Node
      id={id}
      title={data.label}
      inputs={analyser?.inputs}
      outputs={analyser?.outputs}
    >
      {analyser ? (
        <>
          <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
          <Stage>
            {showGrid ? <Grid color={gridColor} /> : null}
            <Scope analyser={analyser.analyser} color={input1Color} />
          </Stage>
        </>
      ) : (
        <div>loading</div>
      )}
    </Node>
  );
};

export default Visualizer;
