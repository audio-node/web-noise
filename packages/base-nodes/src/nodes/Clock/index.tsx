import { useAudioNode, useNode, useTheme, WNNode, WNNodeProps } from "@web-noise/core";
import { button, folder, LevaPanel, useControls, useCreateStore } from "leva";
import { FC, useCallback, useEffect, useState } from "react";
import { Clock as TClock } from "../../audioNodes/clock";

interface ClockData {
  values?: {
    bpm?: number;
  };
  config?: {
    min?: number;
    max?: number;
  };
}

const DEFAULT_BPM = 120;

const Clock: FC<WNNodeProps<ClockData>> = ({ data, id }) => {
  const { node } = useAudioNode<TClock>(id);
  const { updateNodeValues } = useNode(id);
  const [isActive, setActive] = useState(false);

  const theme = useTheme();

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
        { collapsed: true, color: theme.colors.accent2 }
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
    <WNNode id={id}>
      <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
    </WNNode>
  );
};

export default Clock;