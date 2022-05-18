import { LevaPanel, useControls, useCreateStore } from "leva";
import styled from "@emotion/styled";
import { NodeProps } from "react-flow-renderer";
import { Node } from "../Node";
import { useState, useEffect } from "react";
import { Midi } from "@tonaljs/tonal";

// @ts-ignore
import { MidiNumbers } from "react-piano";
import Step from "./Step";

const GRID_NUMBER = 16;

interface StepData {
  active: boolean;
  value: any;
  selected: boolean;
}

const StepSequencer = ({ id, data }: NodeProps) => {
  const levaStore = useCreateStore();
  const [gridData, setgridData] = useState<any[]>(
    new Array(GRID_NUMBER).fill({ value: null, active: false, selected: false })
  );
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [mouseDownXY, setMouseDownXY] = useState({ x: 0, y: 0 });
  const [deltaXY, setDeltaXY] = useState({ x: 0, y: 0 });

  useEffect(() => {
    window.addEventListener("mousedown", (e: MouseEvent) => {
      setIsMousePressed(true);
      setMouseDownXY({ x: e.clientX, y: e.clientY });
    });

    window.addEventListener("mouseup", () => {
      setIsMousePressed(false);
    });
  }, []);

  const onMouseMove = (e: MouseEvent) => {
    const delta = mouseDownXY.y - e.clientY;

    if (delta >= 0 && delta <= 127) {
      console.log(delta, Midi.midiToNoteName(delta));
    }

    if (delta < 0) {
      console.log("X");
    }
  };

  useEffect(() => {
    if (isMousePressed) {
      window.addEventListener("mousemove", onMouseMove);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [mouseDownXY, isMousePressed]);

  // const onStepClick = (index: number) => {
  //   console.log("sdfds");

  //   // const newGrid = gridData.map((step, stepIdx) => {
  //   //   if (stepIdx === index) {
  //   //     const updatedStep = {
  //   //       ...step,
  //   //       value: "A1",
  //   //     };
  //   //     return updatedStep;
  //   //   }
  //   //   return step;
  //   // });
  //   // setgridData(newGrid);
  // };

  const onDrag = (e: any) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <Node title={data.label}>
      <LevaPanel store={levaStore} fill flat hideCopyButton titleBar={false} />
      {isMousePressed ? "pressed" : "not-pressed"}
      <Grid>
        {gridData.map((el, idx) => {
          return (
            <StepBlock key={idx}>
              <>
                {el.value !== null ? el.value : "-"}
                {/* <Step></Step> */}
              </>
              {/* <input
                type="range"
                id="volume"
                name="volume"
                min={MidiNumbers.MIN_MIDI_NUMBER}
                max={MidiNumbers.MAX_MIDI_NUMBER}
              ></input> */}
            </StepBlock>
          );
        })}
      </Grid>
    </Node>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const StepBlock = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.5em;
  font-size: 0.8em;
  box-sizing: border-box;
  font-size: 8px;
  border: 1px solid transparent;
  &:hover {
    border-color: gray;
    cursor: pointer;
  }
`;

export default StepSequencer;
