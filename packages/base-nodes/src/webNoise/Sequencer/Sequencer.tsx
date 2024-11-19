import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import { WNAudioNode, WNNodeProps, useTheme, Theme } from "@web-noise/core";
import {
  SequencerValues,
  SequencerConfig,
  SequencerData,
  Sequence,
  PortEvent,
} from "./types";
import { useEffect, useRef, useState } from "react";
import Select from "../../components/Select";
import Button from "../../components/Button";
import notes from "../MidiNote/notes";
import useMessageChannel from "../../lib/hooks/useMessageChannel";

const SequencerWrapper = withTheme(styled.div<{ theme: Theme }>`
  display: flex;
  height: 100%;
  width: 100%;
  padding: 0.1rem;
  gap: 0.1rem;
  box-sizing: border-box;
  overflow: hidden;
`);

const SequenceCell = withTheme(styled.div<{
  theme: Theme;
  state: number;
  color?: string;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  gap: 0.2rem;
  opacity: ${({ state }) => (state ? "1" : "0.5")};

  &.active {
    label {
      filter: brightness(125%);
    }
    select {
      color: ${({ color }) => color};
    }
  }
`);

const NoteSelector = withTheme(styled(Select)<{ theme: Theme }>`
  select {
    text-align: center;
    padding: 0;
    line-height: 2;
  }
  &::after {
    display: none;
  }
`);

const Pad = withTheme(styled.label<{ theme: Theme; color?: string }>`
  height: auto;
  width: auto;
  aspect-ratio: 1 / 1;
  cursor: pointer;
  border: 1px solid color-mix(in srgb, ${({ color }) => color}, #000 25%);
  background: ${({ color }) => color};
`);

const PadInput = withTheme(styled.input<{ theme: Theme }>`
  display: none;
`);

export interface SequencerProps {
  node: WNNodeProps<SequencerData>;
  audioNode?: WNAudioNode | null;
  updateNodeValues: (value: any) => void;
}

const NOTE_OPTIONS: Array<{ value: string; label: string }> = [
  {
    value: "0",
    label: "●",
  },
  ...notes.map(({ value, key }) => ({
    label: key,
    value: value.toString(),
  })),
];

const Sequencer = ({
  node: props,
  audioNode,
  updateNodeValues,
}: SequencerProps) => {
  const { data } = props;
  const { values, config } = data;

  const { sequence } = values || {};

  const ref = useRef<HTMLDivElement>(null);

  const channel = useMessageChannel();

  useEffect(() => {
    if (!audioNode || !channel || !ref.current) {
      return;
    }

    audioNode.registerPort(channel.port1);

    channel.port2.addEventListener(
      "message",
      ({ data }: MessageEvent<PortEvent>) => {
        if (data.name === "STEP_START") {
          const element =
            ref.current?.querySelectorAll(".sequence-cell")[data.data];
          element?.classList.add("active");
        }
        if (data.name === "STEP_END") {
          const element =
            ref.current?.querySelectorAll(".sequence-cell")[data.data];
          element?.classList.remove("active");
        }
      },
    );
  }, [audioNode, channel, ref]);

  return (
    <SequencerWrapper ref={ref}>
      {sequence?.map(([state, note], index) => (
        <SequenceCell
          key={index}
          state={state}
          className="sequence-cell"
          color={config?.color}
        >
          <NoteSelector
            options={NOTE_OPTIONS}
            value={note.toString()}
            placeholder="Select note"
            onChange={(value) => {
              const newSequence = [...sequence];
              newSequence[index][1] = +value;
              updateNodeValues({ ...values, sequence: newSequence });
            }}
          />
          <Pad color={config?.color}>
            <PadInput
              type="checkbox"
              checked={Boolean(state)}
              onChange={(event) => {
                const newSequence = [...sequence];
                newSequence[index][0] = +event.target.checked;
                updateNodeValues({ ...values, sequence: newSequence });
              }}
            />
          </Pad>
        </SequenceCell>
      ))}
    </SequencerWrapper>
  );
};

export default Sequencer;
