/**
 * Step Sequencer
 *
 * TODO:
 *  - use real clock
 *  - implement clock input
 *  - toggle to display midi/values
 *  - implement sequence mode like: 'reverse', 'vertical', 'snake', 'random', etc..
 */

import { useNode } from "../../ModuleContext";
import { LevaPanel, useControls, useCreateStore, button } from "leva";
import { NodeProps } from "react-flow-renderer";
import { Node } from "../Node";
import { useState, useEffect } from "react";
import { Midi } from "@tonaljs/tonal";
import { StepSequencer as NodeStepSequencer } from "../../nodes/stepSequencer";
import { LEVA_COLOR_ACCENT2_BLUE } from "../../styles/consts";
import { Grid, Step, DebugBlock } from "./styles";

interface StepData {
  active: boolean;
  value: number;
}

const DEFAULT_STEP_VALUE = 36;

const StepSequencer = ({ id, data }: NodeProps) => {
  const { node } = useNode<NodeStepSequencer>(id);

  const levaStore = useCreateStore();
  const [stepsNumber] = useState(16);
  const [sequenceData, setsequenceData] = useState<StepData[]>(
    new Array(stepsNumber).fill({ value: DEFAULT_STEP_VALUE, active: false })
  );
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [mouseDownXY, setMouseDownXY] = useState({ x: 0, y: 0 });
  const [delta, setDelta] = useState(0);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const [selectedStepValue, setSelectedStepValue] =
    useState<number | null>(null);

  useControls(
    "settings",
    {
      clear: button(() => clearSeq()),
      "random seq": button(() => generateRandomSeq()),
    },
    { collapsed: true, color: LEVA_COLOR_ACCENT2_BLUE },
    { store: levaStore }
  );

  useEffect(() => {
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    // TODO: use real clock
    let counter = 0;
    setInterval(() => {
      setSequenceIndex(counter % stepsNumber);
      counter++;
    }, 200);

    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  useEffect(() => {
    if (node && sequenceData[sequenceIndex].active) {
      node.setValues({ midi: sequenceData[sequenceIndex].value });
    }
  }, [node, sequenceIndex]);

  useEffect(() => {
    if (isMousePressed) {
      window.addEventListener("mousemove", onMouseMove);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [mouseDownXY, isMousePressed]);

  useEffect(() => {
    if (selectedStep !== null && selectedStepValue !== null) {
      let newValue = selectedStepValue + delta;

      if (newValue >= 0 && newValue <= 127) {
        updateStep(selectedStep, { value: newValue });
      }
    }
  }, [delta, selectedStep, selectedStepValue]);

  const updateStep = (
    index: number,
    value: Record<string, boolean | number>
  ): void => {
    const newSeq = sequenceData.map((step, stepIdx) => {
      if (stepIdx === index) {
        return {
          ...step,
          ...value,
        };
      }
      return step;
    });

    setsequenceData(newSeq);
  };

  const onMouseDown = (e: MouseEvent): void => {
    setIsMousePressed(true);
    setMouseDownXY({ x: e.clientX, y: e.clientY });
  };

  const onMouseUp = (e: MouseEvent): void => {
    setIsMousePressed(false);
    setSelectedStep(null);
    setDelta(0);
  };

  const onMouseMove = function (e: MouseEvent): void {
    const delta = mouseDownXY.y - e.clientY;
    setDelta(delta);
  };

  // TODO: convert to component
  const formatStepValue = (value: number) => {
    return Midi.midiToNoteName(value);
  };

  function clearSeq() {
    const newSeq = sequenceData.map((step, index) => {
      return {
        ...step,
        value: 0,
        active: false,
      };
    });

    setsequenceData(newSeq);
  }

  function generateRandomSeq() {
    const newSeq = sequenceData.map((step, index) => {
      return {
        ...step,
        active: Math.random() < 0.5,
        value: Math.round(Math.random() * 127),
      };
    });

    setsequenceData(newSeq);
  }

  return (
    <Node id="step-sequencer" title={data.label} outputs={node?.outputs}>
      <LevaPanel store={levaStore} fill flat hideCopyButton titleBar={false} />
      <Grid>
        {sequenceData.map((el, index) => {
          return (
            <Step
              isActive={sequenceData[index].active}
              isSequenceIndex={index === sequenceIndex}
              key={`step-${index}`}
              id={`step-${index}`}
              onClick={() =>
                updateStep(index, { active: !sequenceData[index].active })
              }
              onMouseDown={() => {
                setSelectedStep(index);
                setSelectedStepValue(sequenceData[index].value);
              }}
            >
              {formatStepValue(el.value)}
            </Step>
          );
        })}
      </Grid>
      <DebugBlock>
        <p>
          output:
          {sequenceData[sequenceIndex].active &&
            sequenceData[sequenceIndex].value}
        </p>
        <p>sequence Index: {sequenceIndex + 1}</p>
        <p>selected step: {selectedStep}</p>
        <p>mouse delta: {delta}</p>
        <p>mouse: {isMousePressed ? "pressed" : "not pressed"}</p>
      </DebugBlock>
    </Node>
  );
};

export default StepSequencer;
