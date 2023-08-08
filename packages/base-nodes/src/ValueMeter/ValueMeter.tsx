import { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { WNAudioNode, WNNodeProps, useTheme, Theme } from "@web-noise/core";
import { ValueMeterData } from "./types";

export type AnalyserEventHandler = (event: { data: Float32Array }) => void;

const ValueMeterWrapper = styled.div<{ theme: Theme }>`
  height: 100%;
`;

const ValueDisplay = styled.input<{ theme: Theme }>`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  text-align: right;
  pointer-events: none;
  outline: none;
  border: none;
  background-color: ${({ theme }) => theme.colors.elevation2};
  color: ${({ theme }) => theme.colors.whitePrimary};
  padding: 0.3rem;
  text-overflow: ellipsis;
`;

export interface ValueMeterProps {
  node: WNNodeProps<ValueMeterData>;
  audioNode?: WNAudioNode | null;
}

const ValueMeter = ({ audioNode }: ValueMeterProps) => {
  const theme = useTheme();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!audioNode || !inputRef.current) {
      return;
    }
    const channel = new MessageChannel();
    channel.port2.start();

    audioNode.registerPort(channel.port1);

    let currentValue: number | null = null;

    const handler: AnalyserEventHandler = ({ data }) => {
      if (data.length === 0) {
        currentValue = null;
      }
      for (let i = 0; i < data.length; i++) {
        currentValue = data[i];
      }
    };

    channel.port2.addEventListener("message", handler);

    const render = () => {
      if (!inputRef.current) {
        return;
      }
      inputRef.current.value =
        currentValue === null ? "" : currentValue.toString();
      requestAnimationFrame(render);
    };

    render();

    return () => {
      channel.port2.removeEventListener("message", handler);
    };
  }, [audioNode, inputRef]);

  return (
    <ValueMeterWrapper theme={theme}>
      <ValueDisplay
        theme={theme}
        readOnly
        ref={inputRef}
        placeholder="NO DATA"
      />
    </ValueMeterWrapper>
  );
};

export default ValueMeter;
