import { useAudioNode, useNode, WNNode, WNNodeProps } from "@web-noise/core";
import { LevaPanel, useControls, useCreateStore } from "leva";
import { useEffect } from "react";
import { Filter as TFilter, FilterValues } from "../audioNodes/filter";

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
  values?: FilterValues;
}

const DEFAULT_FREQUENCY = 12000;
const DEFAULT_Q = 0;
const DEFAULT_FILTER_TYPE: BiquadFilterType = "lowpass";

const Filter = (props: WNNodeProps<FilterData>) => {
  const { id, data } = props;
  const { node } = useAudioNode<TFilter>(id) || {};
  const { updateNodeValues } = useNode(id);
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
    <WNNode {...props}>
      <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
    </WNNode>
  );
};

export default Filter;
