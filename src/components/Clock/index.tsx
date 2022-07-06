import { LevaPanel, useControls, useCreateStore, folder, button } from "leva";
import { useEffect, useState, useCallback, FC } from "react";
import { NodeProps } from "react-flow-renderer";
import useFlowNode from "../../hooks/useFlowNode";
import { useNode } from "../../ModuleContext";
import { Clock as TClock } from "../../nodes";
import { LEVA_COLOR_ACCENT2_BLUE } from "../../styles/consts";
import { Node } from "../Node";

interface ClockData {
  label: string;
  values?: {
    bpm?: number;
  };
  config?: {
    min?: number;
    max?: number;
  };
}

const DEFAULT_BPM = 120;

const Clock: FC<NodeProps<ClockData>> = ({ data, id }) => {
  const { node: clock, loading } = useNode<TClock>(id);
  const { updateNodeValues } = useFlowNode(id);
  const [isActive, setActive] = useState(false);

  const store = useCreateStore();

  const startClock = useCallback(() => {
    clock?.start();
    setActive(true);
  }, [clock, setActive]);

  const stopClock = useCallback(() => {
    clock?.stop();
    setActive(false);
  }, [clock, setActive]);

  const { bpm = DEFAULT_BPM } = data.values || {};

  const values = useControls(
    {
      values: folder(
        {
          bpm: {
            value: bpm,
            min: 0,
            max: 500,
          },
        },
        { collapsed: true, color: LEVA_COLOR_ACCENT2_BLUE }
      ),
      ...(isActive
        ? {
            stop: button(stopClock),
          }
        : {
            start: button(startClock, { disabled: !clock }),
          }),
    },

    { store },
    [isActive, clock]
  );

  useEffect(() => clock?.setValues(data.values), [clock, data]);
  useEffect(() => updateNodeValues(values), [values]);

  return (
    <Node
      id={id}
      title={data.label}
      inputs={clock?.inputs}
      outputs={clock?.outputs}
      loading={loading}
    >
        <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
    </Node>
  );
};

export default Clock;
