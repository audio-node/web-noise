/**
 * Step Sequencer
 *
 * TODO:
 *  - implement additional sequence mode: e.g. 'vertical', 'snake', etc..
 */

import { Midi } from "@tonaljs/tonal";
import { button, LevaPanel, useControls, useCreateStore } from "leva";
import { FC, useCallback, useEffect, useState } from "react";
import { NodeProps } from "react-flow-renderer";
 import { useAudioNode } from "@web-noise/core";
 import { useNode } from "@web-noise/core";
import {
  DEFAULT_SEQUENCE_MODE,
  DEFAULT_STEP_VALUE,
  SEQUENCE_MODES,
  StepData,
  StepSequencer as NodeStepSequencer,
  StepSequencerValues,
} from "../../nodes/stepSequencer";
import { useTheme } from "@web-noise/core";
import { Node } from "@web-noise/core";
import Sequencer, { FormatNote } from "./Sequencer";

const sequenceModesOptions: Record<string, SEQUENCE_MODES> = {
  forward: SEQUENCE_MODES.forward,
  reverse: SEQUENCE_MODES.reverse,
  random: SEQUENCE_MODES.random,
};

const DEFAULT_STEPS_COUNT = 16;
const DEFAULT_SEQUENCE_DATA = new Array(DEFAULT_STEPS_COUNT).fill({
  value: DEFAULT_STEP_VALUE,
  active: false,
});

interface StepSequencerData {
  label: string;
  values?: StepSequencerValues;
  config?: {
    rows?: number;
    cols?: number;
    steps?: number;
    showMidiNumbers?: boolean;
  };
}

const midiToNote: FormatNote<number, string> = (value) => {
  return Midi.midiToNoteName(value);
};

const StepSequencer: FC<NodeProps<StepSequencerData>> = ({ id, data }) => {
  const { node } = useAudioNode<NodeStepSequencer>(id);
  const { updateNodeValues, updateNodeConfig } =  useNode(id);

  const theme = useTheme();

  const { steps = DEFAULT_STEPS_COUNT, showMidiNumbers = false } =
    data.config || {};
  const { sequenceData = DEFAULT_SEQUENCE_DATA, mode = DEFAULT_SEQUENCE_MODE } =
    data.values || {};

  const setSequenceData = useCallback(
    (data) => {
      updateNodeValues({ sequenceData: data });
    },
    [updateNodeValues]
  );

  const store = useCreateStore();
  const [sequenceIndex, setSequenceIndex] = useState(0);

  const clearSeq = useCallback(() => {
    if (!node) {
      return;
    }
    const newSeq = sequenceData.map((step) => {
      return {
        ...step,
        value: 0,
        active: false,
      };
    });

    setSequenceData(newSeq);
  }, [node, sequenceData, setSequenceData]);

  const generateRandomSeq = useCallback(() => {
    if (!node) {
      return;
    }
    const newSeq = sequenceData.map((step) => {
      return {
        ...step,
        active: Math.random() < 0.5,
        value: Math.round(Math.random() * 127),
      };
    });

    setSequenceData(newSeq);
  }, [sequenceData, node, setSequenceData]);

  const controls = useControls(
    "settings",
    {
      clear: button(clearSeq),
      "random seq": button(generateRandomSeq),
      "reset counter": button(() => node?.resetCounter()),
      mode: {
        options: sequenceModesOptions,
        value: mode,
      },
      showMidiNumbers,
    },
    { collapsed: true, color: theme.colors.accent2 },
    { store },
    [generateRandomSeq, clearSeq, node]
  );

  useEffect(
    () => updateNodeConfig({ showMidiNumbers: controls.showMidiNumbers }),
    [updateNodeConfig, controls.showMidiNumbers]
  );

  useEffect(
    () => updateNodeValues({ mode: controls.mode }),
    [updateNodeValues, controls.mode]
  );
  useEffect(
    () => node?.setValues({ sequenceData, mode }),
    [sequenceData, mode, node]
  );

  useEffect(() => {
    if (!node) {
      return;
    }
    node.onTick(({ sequenceIndex: sequenceIndexValue }) => {
      setSequenceIndex(sequenceIndexValue);
    });
  }, [node, controls.mode]);

  return (
    <Node id={id}>
      <LevaPanel
        store={store}
        fill
        flat
        hideCopyButton
        titleBar={false}
        oneLineLabels
      />
      <Sequencer
        options={Array.from({ length: 128 }, (_, i) => i)}
        sequence={sequenceData}
        activeStep={sequenceIndex}
        format={(value) =>
          controls.showMidiNumbers ? value : midiToNote(value as number)
        }
        onChange={(data) => {
          setSequenceData(data as Array<StepData>);
        }}
        columns={4}
      />
    </Node>
  );
};

export default StepSequencer;
