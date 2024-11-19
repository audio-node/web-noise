import { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import {
  WNAudioNode,
  WNNodeProps,
  useTheme,
  Theme,
  useNode,
} from "@web-noise/core";
import {
  AudioTrackValues,
  AudioTrackConfig,
  AudioTrackData,
  AudioTrack as TAudioTrack,
  MessageData,
  StatusEventHandler,
} from "./types";
import Input from "./Input";
import Wave from "./Wave";
import NumberInput from "../../components/NumberInput";
import Button from "../../components/Button";
import useMessageChannel from "../../lib/hooks/useMessageChannel";

const AudioTrackWrapper = withTheme(styled.div<{ theme: Theme }>``);

const Section = styled.div`
  font-family: var(--leva-fonts-mono);
  font-size: var(--leva-fontSizes-root);
  background-color: var(--leva-colors-elevation2);
  padding: 0.4rem 0.5rem;
}
`;

const Loader = withTheme(styled.div<{ theme: Theme }>`
  position: absolute;
  z-index: 1;
  color: ${({ theme }) => theme.colors.whitePrimary};
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--leva-fonts-mono);
  background: rgba(0, 0, 0, 0.7);
`);

const SampleInterval = withTheme(styled.div<{ theme: Theme }>`
  display: grid;
  grid-template-columns: 50% 50%;
  padding: 0.2rem 0.5rem;
  background: ${({ theme }) => theme.colors.elevation2};
`);

export interface AudioTrackProps {
  node: WNNodeProps<AudioTrackData>;
  audioNode?: TAudioTrack | null;
  updateNodeValues: (value?: AudioTrackValues) => void;
}

const AudioTrack = ({
  node: props,
  audioNode,
  updateNodeValues,
}: AudioTrackProps) => {
  const { id, data } = props;
  const [isLoading, setLoading] = useState(false);
  const channel = useMessageChannel();

  const { src = "" } = data.values || {};
  const { waveColor, progressColor, rangeColor } = data.config || {};

  useEffect(() => {
    requestAnimationFrame(() => audioNode?.setValues({ src }));
  }, [src, audioNode]);

  useEffect(() => {
    if (!audioNode) {
      return;
    }
    const statusEventHandler: StatusEventHandler = (data) => {
      const { name } = data;

      switch (name) {
        case "error":
          console.error(data.error);
          break;
        case "loading":
          setLoading(true);
          break;
        case "loaded":
          setLoading(false);
          break;
      }
    };
    const unSubscribe = audioNode.addEventListener(
      "status",
      statusEventHandler,
    );

    return () => unSubscribe();
  }, [audioNode]);

  useEffect(() => {
    if (!audioNode || !channel) {
      return;
    }

    const workletPort = audioNode.registerPort(channel.port1);
  }, [audioNode, channel]);

  return (
    <AudioTrackWrapper>
      <Section>
        <Input
          value={src}
          placeholder="place URL here"
          onSubmit={(src: string) => {
            updateNodeValues({ src });
          }}
        />
      </Section>

      <div style={{ position: "relative", cursor: "default" }}>
        {audioNode && isLoading && <Loader>loading</Loader>}
        {audioNode && channel && (
          <Wave
            waveColor={waveColor}
            rangeColor={rangeColor}
            progressColor={progressColor}
            port={channel.port2}
            // range={[start, end]}
            // onRangeChange={([start, end]) =>
            // updateNodeValues({ start, end, src })
            // }
          />
        )}
      </div>
    </AudioTrackWrapper>
  );
};

export default AudioTrack;
