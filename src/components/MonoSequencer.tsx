import { useMemo, useEffect } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useEditorContext } from "./EditorContext";
import { useParameter } from "./Parameter";
import { Range, Scale, Note, Midi } from "@tonaljs/tonal";

const MonoSequencer = ({ sourcePosition, data, id }: NodeProps) => {
  const { audioContext, module } = useEditorContext();
  const parameterNode = useParameter(audioContext);

  const range = Scale.rangeOf("C major");
  const freqRange = range("A2", "A6").map((note) => {
    console.log(note, Note.freq(note!));
    return Note.freq(note || "C2");
  });

  useEffect(() => {
    parameterNode.constantSource.start();
    module[id] = parameterNode;
  }, []);

  const play = () => {
    let futureTickTime = audioContext.currentTime;
    let counter = 1;
    const scheduler = () => {
      if (futureTickTime < audioContext.currentTime) {
        console.log("This is beat: " + counter);
        futureTickTime += 0.1; /*____can be any time value. 0.5 happens
        to be a quarter note at 120 bpm*/

        const randomIndex = Math.floor(Math.random() * freqRange.length);
        const randomFreq = freqRange[randomIndex];

        // @ts-ignore
        parameterNode.constantSource.offset.value = randomFreq;

        counter += 1;
        if (counter > 8) {
          counter = 1;
        }
      }
      window.setTimeout(scheduler, 0);
    };
    scheduler();
  };

  return (
    <div>
      <h2>mono sequencer</h2>
      <button onClick={play}>play</button>

      <Handle
        type="source"
        id="out"
        position={sourcePosition || Position.Right}
      />
    </div>
  );
};

export default MonoSequencer;
