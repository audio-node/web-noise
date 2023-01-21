import styled from "@emotion/styled";
import { TitleBar, useAudioNode } from "@web-noise/core";
import { FC, useEffect, useRef } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import {
  AnalyserEventHandler,
  Oscolloscope as Oscilloscope,
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

const ValueMeter: FC<NodeProps> = (props) => {
  const { id, data } = props;
  const { node } = useAudioNode<Oscilloscope>(id) || {};

  const inputRef = useRef<HTMLInputElement>(null);
  const lastValueRef = useRef<number>();

  useEffect(() => {
    if (!node || !inputRef.current) {
      return;
    }
    const handler: AnalyserEventHandler = ({ data }) => {
      if (data.length === 0 && inputRef.current) {
        inputRef.current.value = "";
      }
      for (let i = 0; i < data.length; i++) {
        const value = data[i];
        if (value !== lastValueRef.current) {
          requestAnimationFrame(() => {
            if (!inputRef.current) {
              return;
            }
            inputRef.current.value = value.toString();
          });

          lastValueRef.current = value;
        }
      }
    };
    //@TODO: use addEventListener instead
    //@ts-ignore
    node.input1Analyser.port.onmessage = handler;
  }, [node, inputRef, lastValueRef]);

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
