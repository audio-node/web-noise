import { LevaPanel, useControls, useCreateStore } from "leva";
import { useEffect, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "../ModuleContext";
import { RandomSequencer as TRandomSequencer } from "../nodes";
import { Node } from "./Node";

const RandomSequencer = ({ data, id }: NodeProps) => {
  const { node } = useNode<TRandomSequencer>(id);
  const [randomSequencer, setRandomSequencer] =
    useState<TRandomSequencer | null>(null);
  const [currentNote, setCurrentNote] = useState<string>();

  const [ready, setReady] = useState<boolean>(false);

  const store = useCreateStore();

  const [controls, set] = useControls(
    () => ({
      note: {
        value: "none",
        label: "Current Note",
        disabled: true,
      },
    }),
    { store },
    [ready, currentNote]
  );

  useEffect(() => {
    if (!randomSequencer) {
      return;
    }
    randomSequencer.onNoteChange(({ note }) => set({ note }));
  }, [randomSequencer]);

  useEffect(() => {
    node?.then((result: TRandomSequencer) => {
      setRandomSequencer(result);
      setReady(true);
    });
  }, [node, setReady]);

  return (
    <Node
      id={id}
      title={data.label}
      inputs={randomSequencer?.inputs}
      outputs={randomSequencer?.outputs}
    >
      {ready ? (
        <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
      ) : (
        <div>loading</div>
      )}
    </Node>
  );
};

export default RandomSequencer;
