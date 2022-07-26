/**
 * Step Sequencer
 *
 * TODO:
 *  - implement gate output
 *  - implement clock input
 *  - toggle to display midi/values
 *  - implement additional sequence mode: e.g. 'vertical', 'snake', etc..
 */

import { button, LevaPanel, useControls, useCreateStore } from "leva";
import { FC, useCallback, useEffect, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "../../ModuleContext";
import {
  DEFAULT_SEQUENCE_MODE,
  DEFAULT_STEP_VALUE,
  SEQUENCE_MODES,
  StepData,
  StepSequencer as NodeStepSequencer,
  StepSequencerValues,
} from "../../nodes/stepSequencer";
import { LEVA_COLOR_ACCENT2_BLUE } from "../../styles/consts";
import { Node } from "../Node";
import Sequencer from "./Sequencer";

const sequenceModesOptions: Record<string, SEQUENCE_MODES> = {
  forward: SEQUENCE_MODES.forward,
  reverse: SEQUENCE_MODES.reverse,
  random: SEQUENCE_MODES.random,
};

const StepSequencer: FC<NodeProps<StepSequencerValues>> = ({ id, data }) => {
  const { node: sequencer } = useNode<NodeStepSequencer>(id);

  const levaStore = useCreateStore();
  const [stepsNumber] = useState(16);
  const [sequenceData, setSequenceData] = useState<StepData[]>(
    new Array(stepsNumber).fill({ value: DEFAULT_STEP_VALUE, active: false })
  );
  const [sequenceIndex, setSequenceIndex] = useState(0);

  const clearSeq = useCallback(() => {
    if (!sequencer) {
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
  }, [sequencer, sequenceData]);

  const generateRandomSeq = useCallback(() => {
    if (!sequencer) {
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
  }, [sequenceData, sequencer]);

  const controls = useControls(
    "settings",
    {
      clear: button(clearSeq),
      "random seq": button(generateRandomSeq),
      mode: {
        options: sequenceModesOptions,
        value: DEFAULT_SEQUENCE_MODE,
      },
    },
    { collapsed: true, color: LEVA_COLOR_ACCENT2_BLUE },
    { store: levaStore },
    [generateRandomSeq, clearSeq]
  );

  useEffect(() => {
    if (!sequencer) {
      return;
    }
    sequencer.setValues({
      sequenceData,
      mode: controls.mode,
    });
  }, [sequenceData, controls.mode]);

  useEffect(() => {
    if (!sequencer) {
      return;
    }
    sequencer.onTick(({ sequenceIndex: sequenceIndexValue }) => {
      setSequenceIndex(sequenceIndexValue);
    });
  }, [sequencer, controls.mode]);

  return (
    <Node id={id}>
      <LevaPanel
        store={levaStore}
        fill
        flat
        hideCopyButton
        titleBar={false}
        oneLineLabels
      />
      <Sequencer
        sequence={sequenceData}
        activeStep={sequenceIndex}
        onChange={(data) => {
          setSequenceData(data);
        }}
      />
    </Node>
  );
};

export default StepSequencer;
