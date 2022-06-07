import { LevaPanel, useControls, useCreateStore } from "leva";
import { useEffect, useState } from "react";
import { NodeProps } from "react-flow-renderer";
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
          <Scope analyser={analyser.analyser} color={input1Color} />
        </>
      ) : (
        <div>loading</div>
      )}
    </Node>
  );
};

export default Visualizer;
