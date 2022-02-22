import { useEffect, useMemo, useState } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import {
  moduleAtom,
  audioContextAtom,
  audioContextSelector,
  registerModule,
} from "../Editor";
import { useEditorContext } from "./EditorContext";
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  atomFamily,
  selectorFamily,
} from "recoil";

const oscillatorAtom = atomFamily({
  key: "oscillator",
  default: (field) => {
    console.log(678678678, field);
    return { foo: "bar" };
  },
});

// const oscillatorState = selector({
// key: "registerNode",
// get: ({ get }) => {
// return +new Date();
// },
// set: ({ set }) => {},
// });

const DEFAULT_FREQUENCY = 440;

const useOscillator = (audioContext: AudioContext) => {
  // const osc = useRecoilValue(oscillatorState);
  // console.log(111, osc);
  return useMemo(() => {
    const oscillator = audioContext.createOscillator();
    return {
      inputs: {
        frequency: {
          port: oscillator.frequency,
        },
        detune: {
          port: oscillator.detune,
        },
      },
      outputs: {
        out: {
          port: oscillator,
        },
      },
      oscillator,
    };
  }, [audioContext]);
};

const Oscillator = ({
  sourcePosition,
  targetPosition,
  id,
  data,
}: NodeProps) => {
  const { audioContext, module } = useEditorContext();

  // const [oscState, setOscState] = useRecoilState(oscillatorAtom(id));

  const [osc, setOsc] = useRecoilState(registerModule(id));

  const oscillatorNode = useOscillator(audioContext);
  const { oscillator } = oscillatorNode;

  useEffect(() => {
    setOsc(oscillatorNode);
    oscillator.start();
    module[id] = oscillatorNode;
  }, []);

  const { maxValue, minValue, value } = oscillator.frequency;
  const [frequency, setFrequency] = useState<number>(
    value || DEFAULT_FREQUENCY
  );

  useEffect(() => {
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  }, [frequency]);

  const radioName = `radio-${+new Date()}`;
  return (
    <>
      <Handle
        type="target"
        position={targetPosition || Position.Left}
        style={{ top: 10 }}
        id="frequency"
      />
      <Handle
        type="target"
        position={targetPosition || Position.Left}
        id="detune"
      />
      <div>{data.label || "oscillator"}</div>
      <div>
        <label>
          <input
            name={radioName}
            type="radio"
            onChange={() => (oscillator.type = "sine")}
          />
          ∿
        </label>
        <label>
          <input
            name={radioName}
            type="radio"
            onChange={() => (oscillator.type = "square")}
          />
          ⎍
        </label>
        <label>
          <input
            name={radioName}
            type="radio"
            onChange={() => (oscillator.type = "triangle")}
          />
          ⋀
        </label>
        <label>
          <input
            name={radioName}
            type="radio"
            onChange={() => (oscillator.type = "sawtooth")}
          />
          ⊿
        </label>
      </div>
      <div>
        frequency:
        {
          <input
            type="number"
            min={minValue}
            max={maxValue}
            value={frequency}
            onChange={({ target: { value } }) => setFrequency(+value)}
          />
        }
      </div>
      <Handle
        type="source"
        position={sourcePosition || Position.Right}
        id="out"
      />
    </>
  );
};

export default Oscillator;
