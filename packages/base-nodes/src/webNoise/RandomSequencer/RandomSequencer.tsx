import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import { WNAudioNode, WNNodeProps, useTheme, Theme } from "@web-noise/core";
import {
  RandomSequencerValues,
  RandomSequencerConfig,
  RandomSequencerData,
  NoteChangeEvent,
} from "./types";
import Input from "../../components/Input";
import useMessageChannel from "../../lib/hooks/useMessageChannel";

const RandomSequencerWrapper = withTheme(styled.div<{ theme: Theme }>`
  background: ${({ theme }) => theme.colors.elevation2};
  padding: 0.2rem;
`);

const StyledInput = withTheme(styled(Input)<{ theme: Theme }>`
  height: 100%;
  width: 100%;
  input {
    height: 100%;
  }
`);

export interface RandomSequencerProps {
  node: WNNodeProps<RandomSequencerData>;
  audioNode?: WNAudioNode | null;
  updateNodeValues: (value: any) => void;
}

const RandomSequencer = ({
  node: props,
  audioNode,
  updateNodeValues,
}: RandomSequencerProps) => {
  const { data } = props;

  const [value, setValue] = useState<string | null>(null);

  const channel = useMessageChannel();

  useEffect(() => {
    if (!audioNode || !channel) {
      return;
    }

    const workletPort = audioNode.registerPort(channel.port1);

    channel.port2.addEventListener(
      "message",
      ({ data: { name, note } }: MessageEvent<NoteChangeEvent>) => {
        if (name === "noteChange") {
          setValue(note);
        }
      },
    );

    workletPort.postMessage({ name: "GET_CURRENT_NOTE" });
  }, [audioNode, channel, setValue]);

  return (
    <RandomSequencerWrapper>
      <StyledInput
        inputProps={{ readOnly: true }}
        value={value || "waiting for trigger.."}
      />
    </RandomSequencerWrapper>
  );
};

export default RandomSequencer;
