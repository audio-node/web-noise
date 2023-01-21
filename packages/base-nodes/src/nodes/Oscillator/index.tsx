import {
  useAudioNode,
  useNode,
  useTheme,
  WNNode,
  WNNodeProps,
} from "@web-noise/core";
import { LevaPanel, useControls, useCreateStore } from "leva";
import { FC, useEffect } from "react";
import {
  Oscillator as TOscillator,
  OscillatorValues,
} from "../../audioNodes/oscillator";
import { iconsGroup } from "../../levaPlugins";
import { SawToothIcon, SineIcon, SquareIcon, TriangleIcon } from "./icons";

interface OscillatorData {
  values?: OscillatorValues;
  config?: {
    min?: number;
    max?: number;
  };
}

const DEFAULT_FREQUENCY = 440;
const DEFAULT_TYPE = "sine";

const Oscillator: FC<WNNodeProps<OscillatorData>> = (props) => {
  const { id, data } = props;
  const { node } = useAudioNode<TOscillator>(id) || {};
  const { updateNodeValues } = useNode(id);

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
    <WNNode {...props}>
      <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
    </WNNode>
  );
};

export default Oscillator;
