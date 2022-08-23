import { LevaPanel, useControls, useCreateStore } from "leva";
import { FC, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import useFlowNode from "../hooks/useFlowNode";
 import { useAudioNode } from "@web-noise/core";
import { Filter as TFilter, FilterValues } from "../nodes";
import { Node } from "./Node";

const FilterTypes: Record<BiquadFilterType, BiquadFilterType> = {
  lowpass: "lowpass",
  allpass: "allpass",
  bandpass: "bandpass",
  highpass: "highpass",
  highshelf: "highshelf",
  lowshelf: "lowshelf",
  notch: "notch",
  peaking: "peaking",
};

interface FilterData {
  label: string;
  values?: FilterValues;
}

const DEFAULT_FREQUENCY = 12000;
const DEFAULT_Q = 0;
const DEFAULT_FILTER_TYPE: BiquadFilterType = "lowpass";

const Filter: FC<NodeProps<FilterData>> = ({ data, id }) => {
  const { node } = useAudioNode<TFilter>(id);
  const { updateNodeValues } = useFlowNode(id);
  const store = useCreateStore();

  const {
    frequency = DEFAULT_FREQUENCY,
    q = DEFAULT_Q,
    type = DEFAULT_FILTER_TYPE,
  } = data.values || {};

  const values = useControls(
    {
      frequency: {
        value: frequency,
        max: 24000,
        min: 0,
        label: "freq",
        step: 0.01,
      },
      q: {
        value: q,
        max: 20,
        min: 0,
        label: "q",
      },
      type: {
        options: FilterTypes,
        value: type,
      },
    },
    { store }
  );

  useEffect(() => node?.setValues(data.values), [node, data]);
  useEffect(() => updateNodeValues(values), [values]);

  return (
    <Node id={id}>
      <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
    </Node>
  );
};

export default Filter;
