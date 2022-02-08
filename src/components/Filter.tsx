import { useEffect, useMemo, useState } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useEditorContext } from "./EditorContext";

const FILTER_TYPES: BiquadFilterType[] = [
  "allpass",
  "bandpass",
  "highpass",
  "highshelf",
  "lowpass",
  "lowshelf",
  "notch",
  "peaking",
];

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
  const { audioContext, module } = useEditorContext();
  const filterNode = useFilter(audioContext);
  const { filter } = filterNode;

  const { minValue: frequencyMinValue, maxValue: frequencyMaxValue } =
    filter.frequency;

  const [frequency, setFrequency] = useState<number>(frequencyMaxValue / 2);
  const [q, setQ] = useState<number>(0);
  const [type, setType] = useState<BiquadFilterType>(DEFAULT_FILTER_TYPE);

  useEffect(() => {
    filter.frequency.setValueAtTime(frequency, audioContext.currentTime);
  }, [frequency]);

  useEffect(() => {
    filter.Q.setValueAtTime(q, audioContext.currentTime);
  }, [q]);

  useEffect(() => {
    filter.type = type;
  }, [type]);

  useEffect(() => {
    console.log("filter rendered", id);
    module[id] = filterNode;
    filter.gain.setValueAtTime(10, audioContext.currentTime);
  }, []);
  return (
    <>
      <div className="dragHandle">Filter</div>
      <Handle
        type="target"
        position={targetPosition || Position.Left}
        id="in"
        onConnect={(params) => console.log("handle onConnect", params)}
      />

      <select
        defaultValue={type}
        onChange={({ target: { value } }) => setType(value as BiquadFilterType)}
      >
        {FILTER_TYPES.map((filterType) => (
          <option key={filterType} value={filterType}>
            {filterType}
          </option>
        ))}
      </select>

      <div>
        freq:
        {
          <input
            type="range"
            min={frequencyMinValue}
            max={frequencyMaxValue}
            step="0.01"
            value={frequency}
            onChange={({ target: { value } }) => setFrequency(+value)}
          />
        }
      </div>

      <div>
        resonance (q)
        {
          <input
            type="range"
            min={0}
            max={20}
            step="0.01"
            value={q}
            onChange={({ target: { value } }) => setQ(+value)}
          />
        }
      </div>

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
