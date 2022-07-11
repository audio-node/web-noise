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
  const { node } = useNode<TClock>(id);
  const { updateNodeValues } = useFlowNode(id);
  const [isActive, setActive] = useState(false);

  const store = useCreateStore();

  const startClock = useCallback(() => {
    node?.start();
    setActive(true);
  }, [node, setActive]);

  const stopClock = useCallback(() => {
    node?.stop();
    setActive(false);
  }, [node, setActive]);

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
            start: button(startClock, { disabled: !node }),
          }),
    },

    { store },
    [isActive, node]
  );

  useEffect(() => node?.setValues(data.values), [node, data]);
  useEffect(() => updateNodeValues(values), [values, updateNodeValues]);

  return (
    <Node id={id}>
      <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
    </Node>
  );
};

export default Clock;
