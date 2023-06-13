import styled from "@emotion/styled";
import {
  theme,
  useAudioNode,
  useNode,
  useTheme,
  WNNode,
  WNNodeProps,
} from "@web-noise/core";
import { LevaPanel, useControls, useCreateStore } from "leva";
import { FC, useCallback, useEffect, useState } from "react";
import {
  AudioTrack as TAudioTrack,
  AudioTrackValues,
} from "../../audioNodes/audioTrack";
import NumberInput from "../../components/NumberInput";
import Button from "../../components/Button";
import Input from "./Input";
import Wave from "./Wave";

const Section = styled.div`
  font-family: var(--leva-fonts-mono);
  font-size: var(--leva-fontSizes-root);
  background-color: var(--leva-colors-elevation2);
  padding: 0.4rem 0.5rem;
}
`;

const Loader = styled.div`
  position: absolute;
  z-index: 1;
  color: ${theme.colors.whitePrimary};
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--leva-fonts-mono);
  background: rgba(0, 0, 0, 0.7);
`;

const SampleInterval = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  padding: 0.2rem 0.5rem;
  background: ${theme.colors.elevation2};
`;

const SampleInputWrapper = styled.label`
  color: ${theme.colors.whitePrimary};
  color: var(--leva-colors-highlight2);
  font-family: var(--leva-fonts-mono);
  font-size: var(--leva-fontSizes-root);
  align-items: center;
  padding: 0 0.3rem;
`;

const SampleInputTitle = styled.span`
  margin-bottom: 0.1rem;
`;

interface AudioTrackConfig {
  waveColor?: string;
  progressColor?: string;
  rangeColor?: string;
}

interface AudioTrackData {
  values?: AudioTrackValues;
  config?: AudioTrackConfig;
}

const AudioTrack: FC<WNNodeProps<AudioTrackData>> = (props) => {
  const { id, data } = props;
  const { updateNodeValues, updateNodeConfig } = useNode(id);
  const { node } = useAudioNode<TAudioTrack>(id) || {};
  const [isActive, setActive] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [duration, setDuration] = useState(0);
  const theme = useTheme();

  const store = useCreateStore();

  const { src = "", start = 0, end = duration } = data.values || {};
  const {
    waveColor = theme.colors.accent2,
    progressColor = theme.colors.highlight2,
    rangeColor = theme.colors.vivid1,
  } = data.config || {};

  const play = useCallback(() => {
    node?.play();
    setActive(true);
  }, [node, setActive]);

  const stop = useCallback(() => {
    node?.stop();
    setActive(false);
  }, [node, setActive]);

  const config = useControls(
    "settings",
    {
      waveColor: {
        value: waveColor,
        label: "Wave Color",
      },
      progressColor: {
        value: progressColor,
        label: "Progress Color",
      },
      rangeColor: {
        value: rangeColor,
        label: "Range Color",
      },
    },
    { collapsed: true, color: theme.colors.accent2 },
    { store },
    [isActive, node, theme]
  );

  useEffect(() => {
    requestAnimationFrame(() => node?.setValues({ src }));
  }, [src, node]);

  useEffect(() => {
    node?.setValues({ start, end });
  }, [start, end, node]);

  useEffect(() => updateNodeConfig(config), [config, updateNodeConfig]);

  useEffect(() => {
    if (!node) {
      return;
    }
    (node as TAudioTrack).onMessage((data) => {
      const { name } = data;
      switch (name) {
        case "track":
          setDuration(data.data.duration);
          break;
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
    });
  }, [node]);

  return (
    <WNNode {...props}>
      <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
      <Section>
        <Input
          value={src}
          placeholder="place URL here"
          onSubmit={(src) => {
            updateNodeValues({ src });
          }}
        />
      </Section>

      <div style={{ position: "relative", cursor: "default" }}>
        {node && isLoading && <Loader>loading</Loader>}
        {node && (
          <Wave
            waveColor={waveColor}
            rangeColor={rangeColor}
            progressColor={progressColor}
            port={node.audioTrackWorklet.port}
            range={[start, end]}
            onRangeChange={([start, end]) =>
              updateNodeValues({ start, end, src })
            }
          />
        )}
        <SampleInterval>
          <SampleInputWrapper>
            <SampleInputTitle>start</SampleInputTitle>
            <NumberInput
              min={0}
              max={end}
              step={0.01}
              value={start}
              onChange={(value) => {
                updateNodeValues({ start: value, end, src });
              }}
            />
          </SampleInputWrapper>
          <SampleInputWrapper>
            <SampleInputTitle>end</SampleInputTitle>
            <NumberInput
              min={start}
              max={duration}
              step={0.01}
              value={end}
              onChange={(value) => {
                updateNodeValues({ start, end: value, src });
              }}
            />
          </SampleInputWrapper>
        </SampleInterval>
        <Section>
          {isActive ? (
            <Button theme={theme} style={{ width: "100%" }} onClick={stop}>
              stop
            </Button>
          ) : (
            <Button theme={theme} style={{ width: "100%" }} onClick={play}>
              play
            </Button>
          )}
        </Section>
      </div>
    </WNNode>
  );
};

export default AudioTrack;
