import styled from "@emotion/styled";
import { TitleBar, useAudioNode } from "@web-noise/core";
import { FC, useEffect, useRef } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import {
    AnalyserEventHandler, Oscolloscope as Oscilloscope
} from "../audioNodes/oscilloscope";

const TitleBarWrapper = styled(TitleBar)`
  width: auto;
  height: auto;
  padding: 0;
`;

const ValueDisplay = styled.input`
  text-align: right;
  pointer-events: none;
  outline: none;
  border: none;
  background-color: var(--leva-colors-elevation2);
  color: #fff;
  padding: 0.3rem;
`;

const ValueMeter: FC<NodeProps> = ({ id }) => {
  const { node } = useAudioNode<Oscilloscope>(id) || {};

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!node || !inputRef.current) {
      return;
    }
    const handler: AnalyserEventHandler = ({ data }) => {
      for (
        let i = 0, value = data[i], prevValue = data[i - 1];
        i < data.length;
        i++
      ) {
        if (value !== prevValue) {
          requestAnimationFrame(() => {
            //@ts-ignore
            inputRef.current.value = value.toString();
          });
        }
      }
    };
    //@TODO: use addEventListener instead
    //@ts-ignore
    node.input1Analyser.port.onmessage = handler;
  }, [node, inputRef]);

  return (
    <>
      <TitleBarWrapper>
        <ValueDisplay readOnly ref={inputRef} placeholder="NO DATA" />
      </TitleBarWrapper>
      <Handle
        type="target"
        position={Position.Left}
        id="input1"
        onConnect={(params) => console.log("handle onConnect", params)}
      />
    </>
  );
};

export default ValueMeter;
