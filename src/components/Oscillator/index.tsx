import { LevaPanel, useControls, useCreateStore } from "leva";
import { useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
 import { useNode } from "@web-noise/core";
 import { useAudioNode } from "@web-noise/core";
import { Oscillator as TOscillator, OscillatorValues } from "../../nodes";
import { useTheme } from "@web-noise/core";
import { Node } from "@web-noise/core";
import { SawToothIcon, SineIcon, SquareIcon, TriangleIcon } from "./icons";
import iconsGroup from "./iconsGroup";

interface OscillatorData {
  label: string;
  values?: OscillatorValues;
  config?: {
    min?: number;
    max?: number;
  };
}

const DEFAULT_FREQUENCY = 440;
const DEFAULT_TYPE = "sine";

const Oscillator = ({ id, data }: NodeProps<OscillatorData>) => {
  const { node } = useAudioNode<TOscillator>(id);
  const { updateNodeValues } =  useNode(id);

  const theme = useTheme();

  const store = useCreateStore();

  const { frequency = DEFAULT_FREQUENCY, type = DEFAULT_TYPE } =
    data.values || {};

  const values = useControls(
    "settings",
    {
      frequency: {
        value: frequency,
        max: data.config?.max ?? 800,
        min: data.config?.min ?? 0,
        label: "freq",
      },
      type: iconsGroup({
        label: "type",
        value: type,
        options: [
          {
            icon: SineIcon,
            value: "sine",
          },
          {
            icon: SawToothIcon,
            value: "sawtooth",
          },
          {
            icon: TriangleIcon,
            value: "triangle",
          },
          {
            icon: SquareIcon,
            value: "square",
          },
        ],
      }),
    },
    { collapsed: true, color: theme.colors.accent2 },
    { store }
  );

  useEffect(() => node?.setValues(data.values), [node, data]);
  useEffect(() => updateNodeValues(values), [values, updateNodeValues]);

  return (
    <Node id={id}>
      <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
    </Node>
  );
};

export default Oscillator;
