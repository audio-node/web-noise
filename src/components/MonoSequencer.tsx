import { useMemo, useEffect } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useEditorContext } from "./EditorContext";
import { useParameter } from "./Parameter";

// const useMonoSequencer = (audioContext: AudioContext) =>
//   useMemo(() => {
//     const gain = audioContext.createGain();
//     return {
//       outputs: {
//         out: {
//           port: gain,
//         },
//       },
//       gain,
//     };
//   }, [audioContext]);

const MonoSequencer = ({ sourcePosition, data, id }: NodeProps) => {
  const { audioContext, module } = useEditorContext();
  const parameterNode = useParameter(audioContext);

  useEffect(() => {
    parameterNode.constantSource.start();
    module[id] = parameterNode;
  }, []);

  let futureTickTime = audioContext.currentTime;
  let counter = 1;

  const scheduler = () => {
    if (futureTickTime < audioContext.currentTime + 0.1) {
      console.log("This is beat: " + counter);
      futureTickTime += 0.5; /*____can be any time value. 0.5 happens
      to be a quarter note at 120 bpm*/
      parameterNode.constantSource.offset.value = Math.random() * 1000;

      counter += 1;
      if (counter > 4) {
        counter = 1;
      }
    }
    window.setTimeout(scheduler, 0);
  };

  return (
    <div>
      <h2>mono sequencer</h2>
      <button onClick={scheduler}>play</button>

      <Handle
        type="source"
        id="out"
        position={sourcePosition || Position.Right}
      />
    </div>
  );
};

export default MonoSequencer;
