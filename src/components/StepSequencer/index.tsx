/**
 * Step Sequencer
 *
 * TODO:
 *  - implement gate output
 *  - implement clock input
 *  - toggle to display midi/values
 *  - implement more sequence mode: 'vertical', 'snake', etc..
 */

import { useNode, useModule } from "../../ModuleContext";
import { LevaPanel, useControls, useCreateStore, button } from "leva";
import { NodeProps } from "react-flow-renderer";
import { Node } from "../Node";
import { useState, useEffect, useCallback } from "react";
import { Midi } from "@tonaljs/tonal";
import { StepSequencer as NodeStepSequencer } from "../../nodes/stepSequencer";
import { LEVA_COLOR_ACCENT2_BLUE } from "../../styles/consts";
import { Grid, Step, DebugBlock } from "./styles";
import { Clock } from "../../nodes";

interface StepData {
  active: boolean;
  value: number;
}

type SequenceMode = "forward" | "reverse" | "random";

const sequenceModesOptions: Record<SequenceMode, SequenceMode> = {
  forward: "forward",
  reverse: "reverse",
  random: "random",
};

const DEFAULT_STEP_VALUE: number = 36;
const DEFAULT_SEQUENCE_MODE: SequenceMode = "forward";

const StepSequencer = ({ id, data }: NodeProps) => {
  const { node } = useNode<NodeStepSequencer>(id);
  const { clock: clockNode } = useModule();

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
  const [clock, setClock] = useState<Clock | null>(null);

  const controls = useControls(
    "settings",
    {
      clear: button(() => clearSeq()),
      "random seq": button(() => generateRandomSeq()),
      mode: {
        options: sequenceModesOptions,
        value: DEFAULT_SEQUENCE_MODE,
      },
    },
    { collapsed: true, color: LEVA_COLOR_ACCENT2_BLUE },
    { store: levaStore }
  );

  const updateStep = useCallback(
    (index: number, value: Record<string, boolean | number>): void => {
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
    },
    [sequenceData]
  );

  const onMouseMove = useCallback(
    (e: MouseEvent): void => {
      const delta = mouseDownXY.y - e.clientY;
      setDelta(delta);
    },
    [mouseDownXY.y]
  );

  const onMouseDown = (e: MouseEvent): void => {
    setIsMousePressed(true);
    setMouseDownXY({ x: e.clientX, y: e.clientY });
  };

  const onMouseUp = (): void => {
    setIsMousePressed(false);
    setSelectedStep(null);
    setDelta(0);
  };

  // TODO: convert to component
  const formatStepValue = (value: number) => {
    return Midi.midiToNoteName(value);
  };

  function clearSeq() {
    const newSeq = sequenceData.map((step) => {
      return {
        ...step,
        value: 0,
        active: false,
      };
    });

    setsequenceData(newSeq);
  }

  function generateRandomSeq() {
    const newSeq = sequenceData.map((step) => {
      return {
        ...step,
        active: Math.random() < 0.5,
        value: Math.round(Math.random() * 127),
      };
    });

    setsequenceData(newSeq);
  }

  useEffect(() => {
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    clockNode.then((clock) => setClock(clock));

    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  useEffect(() => {
    if (clock) {
      let counter = sequenceIndex;
      clock.onTick(() => {
        if (controls.mode === "forward") {
          counter++;
        }
        if (controls.mode === "random") {
          counter = Math.round(Math.random() * stepsNumber);
        }
        if (controls.mode === "reverse") {
          if (counter <= 0) {
            counter = stepsNumber;
          }
          counter--;
        }
        setSequenceIndex(Math.abs(counter) % stepsNumber);
      });
    }
  }, [clock, controls.mode, stepsNumber]);

  useEffect(() => {
    if (node && sequenceData[sequenceIndex].active) {
      node.setValues({ midi: sequenceData[sequenceIndex].value });
    }
  }, [node, sequenceData, sequenceIndex]);

  useEffect(() => {
    if (isMousePressed) {
      window.addEventListener("mousemove", onMouseMove);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [mouseDownXY, isMousePressed, onMouseMove]);

  useEffect(() => {
    if (selectedStep !== null && selectedStepValue !== null) {
      let value = selectedStepValue + delta;

      if (value >= 0 && value <= 127) {
        updateStep(selectedStep, { value });
      }
    }
  }, [delta, selectedStep, selectedStepValue, updateStep]);

  return (
    <Node id={id} title={data.label} outputs={node?.outputs}>
      <LevaPanel
        store={levaStore}
        fill
        flat
        hideCopyButton
        titleBar={false}
        oneLineLabels
      />
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
