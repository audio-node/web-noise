import { useMemo, useEffect, useCallback, useState } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useEditorContext } from "./EditorContext";
import { useParameter } from "./Parameter";
import { Range, Scale, Note, Midi } from "@tonaljs/tonal";
import { Leva, useCreateStore, useControls, LevaPanel, button } from "leva";

const MonoSequencer = ({ sourcePosition, data, id }: NodeProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState(0);
  const { audioContext, module } = useEditorContext();
  const parameterNode = useParameter(audioContext);

  const range = Scale.rangeOf("C major");
  const freqRange = range("A2", "A6").map((note) => {
    return Note.freq(note || "C2");
  });

  const store = useCreateStore();

  const [controls, set] = useControls(
    () => ({
      time: { min: 0, max: 1, step: 0.1, value: 0.5 },
    }),
    { store }
  );

  let futureTickTime = audioContext.currentTime;
  let counter = 1;
  let tempo = 120;
  let secondsPerBeat = 60 / tempo;
  let counterTimeValue = secondsPerBeat / 4;

  useEffect(() => {
    parameterNode.constantSource.start();
    module[id] = parameterNode;
  }, []);

  useEffect(() => {
    if (isPlaying) {
      counter = 1;
      futureTickTime = audioContext.currentTime;
      scheduler();
    } else {
      window.clearTimeout(timer);
      setTimer(0);
    }
  }, [isPlaying]);

  function scheduler() {
    if (futureTickTime < audioContext.currentTime + 0.1) {
      console.log("This is 16th note: " + counter);
      counter += 1;
      futureTickTime += counterTimeValue;

      const randomIndex = Math.floor(Math.random() * freqRange.length);
      const randomFreq = freqRange[randomIndex];

      // @ts-ignore
      parameterNode.constantSource.offset.value = randomFreq;

      if (counter > 16) {
        counter = 1;
      }
    }
    setTimer(window.setTimeout(scheduler, 0));
  }

  return (
    <div>
      <LevaPanel
        store={store}
        titleBar={{ drag: false, title: data.label }}
        fill
      />

      <div className="leva-c-bduird">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="leva-c-ihqPFh"
        >
          play
        </button>
      </div>

      <Handle
        type="source"
        id="out"
        position={sourcePosition || Position.Right}
      />
    </div>
  );
};

export default MonoSequencer;
