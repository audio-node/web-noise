import { useMemo, useEffect, useCallback, useState, useRef } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import styled from "@emotion/styled";
import { useModule, useNode } from "../ModuleContext";
import { Range, Scale, Note, Midi } from "@tonaljs/tonal";
import { Leva, useCreateStore, useControls, LevaPanel, button } from "leva";
import { atom } from "recoil";
import { RandomSequencer as TRandomSequencer } from "../nodes";

export const GlobalClockState = atom({
  key: "globalClock",
  default: {
    isPlaying: false,
    timeOutID: 0,
  },
});

export const GlobalClockCounterState = atom({
  key: "globalClockCounter",
  default: 0,
});

const RandomSequencer = ({ sourcePosition, data, id }: NodeProps) => {
  const { node } = useNode<TRandomSequencer>(id);
  const [randomSequencer, setRandomSequencer] =
    useState<TRandomSequencer | null>(null);

  const [ready, setReady] = useState<boolean>(false);

  const store = useCreateStore();

  const controls = useControls(
    {
      sequencer: { value: "", editable: false },
    },
    { store }
  );

  useEffect(() => {
    if (!randomSequencer) {
      return;
    }
    randomSequencer.constantSource.start();
    return () => {
      randomSequencer.constantSource.stop();
    };
  }, [randomSequencer]);

  useEffect(() => {
    node?.then((result: TRandomSequencer) => {
      setRandomSequencer(result);
      setReady(true);
    });
  }, [node, setReady]);

  return (
    <div>
      <LevaPanel
        store={store}
        titleBar={{ drag: false, title: data.label }}
        fill
        flat
        collapsed
      />

      {!ready ? <div>loading</div> : null}

      <Handle
        type="source"
        id="out"
        position={sourcePosition || Position.Right}
      />
    </div>
  );
};

export default RandomSequencer;
