import { useEffect, useMemo, useState } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useControls, useCreateStore, LevaPanel } from "leva";
import { useModule, useNode } from "../ModuleContext";
import { Filter as TFilter } from "../nodes";

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

const DEFAULT_FILTER_TYPE: BiquadFilterType = "lowpass";

const Filter = ({ sourcePosition, targetPosition, data, id }: NodeProps) => {
  const { audioContext } = useModule();
  const { node } = useNode<TFilter>(id);
  const { filter } = node || {};
  const store = useCreateStore();

  const controls = useControls(
    {
      frequency: {
        value: 12000,
        max: 24000,
        min: 0,
        label: "freq",
        step: 0.01,
      },
      q: {
        value: 0,
        max: 20,
        min: 0,
        label: "q",
      },
      type: {
        options: FilterTypes,
        value: DEFAULT_FILTER_TYPE,
      },
    },
    { store }
  );

  useEffect(() => {
    if (!filter) {
      return;
    }
    filter.frequency.setValueAtTime(
      controls.frequency,
      audioContext.currentTime
    );
  }, [controls.frequency, filter, audioContext]);

  useEffect(() => {
    if (!filter) {
      return;
    }
    filter.Q.setValueAtTime(controls.q, audioContext.currentTime);
  }, [controls.q, filter, audioContext]);

  useEffect(() => {
    if (!filter) {
      return;
    }
    filter.type = controls.type;
  }, [controls.type, filter]);

  useEffect(() => {
    if (!filter) {
      return;
    }
    filter.gain.setValueAtTime(10, audioContext.currentTime);
  }, []);

  return (
    <>
      <LevaPanel
        store={store}
        fill
        flat
        titleBar={{ drag: false, title: data.label }}
      />
      <Handle
        type="target"
        position={targetPosition || Position.Left}
        id="in"
        onConnect={(params) => console.log("handle onConnect", params)}
      />

      <Handle
        type="source"
        position={sourcePosition || Position.Right}
        id="out"
        onConnect={(params) => console.log("handle onConnect", params)}
      />
    </>
  );
};

export default Filter;
