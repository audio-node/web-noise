import { useEffect, useMemo, useState } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useModule } from "../ModuleContext";
import { useControls, useCreateStore, LevaPanel } from "leva";

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

const useFilter = (audioContext: AudioContext) =>
  useMemo(() => {
    const filter = audioContext.createBiquadFilter();
    return {
      inputs: {
        in: {
          port: filter,
        },
      },
      outputs: {
        out: {
          port: filter,
        },
      },
      filter,
    };
  }, []);

const Filter = ({ sourcePosition, targetPosition, data, id }: NodeProps) => {
  const { audioContext, registerNode, unregisterNode } = useModule();
  const filterNode = useFilter(audioContext);
  const { filter } = filterNode;
  const store = useCreateStore();

  const { minValue: frequencyMinValue, maxValue: frequencyMaxValue } =
    filter.frequency;

  const controls = useControls(
    {
      frequency: {
        value: frequencyMaxValue / 2,
        max: frequencyMaxValue,
        min: 0,
        label: "freq",
        step: 0.000001,
      },
      q: {
        value: 0,
        max: 20,
        min: 0,
        label: "q",
      },
      type: {
        options: FilterTypes,
      },
    },
    { store }
  );

  useEffect(() => {
    filter.frequency.setValueAtTime(
      controls.frequency,
      audioContext.currentTime
    );
  }, [controls.frequency]);

  useEffect(() => {
    filter.Q.setValueAtTime(controls.q, audioContext.currentTime);
  }, [controls.q]);

  useEffect(() => {
    filter.type = controls.type;
  }, [controls.type]);

  useEffect(() => {
    registerNode(id, filterNode);
    filter.gain.setValueAtTime(10, audioContext.currentTime);
    return () => unregisterNode(id);
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
