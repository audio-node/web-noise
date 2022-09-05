import styled from "@emotion/styled";
import { FC } from "react";
import { Handle, HandleProps, NodeProps, Position } from "react-flow-renderer";
import useAudioNode from "../../hooks/useAudioNode";
import useNode from "../../hooks/useNode";
import useTheme from "../../hooks/useTheme";
import { Theme } from "../../theme";
import { DRAG_HANDLE_CLASS } from "../../constants";

const NodeWrapper = styled.div`
  background-color: var(--leva-colors-elevation1);
`;

const NodeLoaderWrapper = styled(NodeWrapper)`
  padding: 2rem 5rem;
`;

const NodeErrorWrapper = styled(NodeWrapper)`
  padding: 1rem 2rem;
`;

const Section = styled.div`
  position: relative;
  font-family: var(--leva-fonts-mono);
  font-size: var(--leva-fontSizes-root);
  background-color: var(--leva-colors-elevation1);
`;

const TitleBarInner = styled(Section)`
  display: flex;
  height: var(--leva-sizes-titleBarHeight);
  touch-action: none;
  align-items: center;
  justify-content: center;
  flex: 1 1 0%;
  color: var(--leva-colors-highlight1);
  padding: 0 1rem;
`;

export const PortsPanel = styled(Section)<{ theme: Theme }>(
  ({ theme }) => `
  display: grid;
  grid-template-areas: "inputs outputs";
  background: ${theme.colors.elevation2};
  border-bottom: 1px solid ${theme.colors.elevation1};
  color: ${theme.colors.highlight3};
  font-size: 0.6rem;
`
);

export const InputPorts = styled.div`
  grid-area: inputs;
  text-align: left;
`;

export const OutputPorts = styled.div`
  grid-area: outputs;
  text-align: right;
`;

export const Port = styled.div`
  position: relative;
  padding: 5px 10px;
`;

const StyledInputHandle = styled(Handle)`
  left: -3px;
`;

const InputHandle: FC<Partial<HandleProps>> = (props) => (
  <StyledInputHandle {...props} type="target" position={Position.Left} />
);

const StyledOutputHandle = styled(Handle)`
  right: -3px;
`;

const OutputHandle: FC<Partial<HandleProps>> = (props) => (
  <StyledOutputHandle {...props} type="source" position={Position.Right} />
);

export interface WNNodeData {
  label: string;
}

export type WNNodeProps<T = Record<string, unknown>> = NodeProps<
  T & WNNodeData
>;

export const TitleBar: FC<{ className?: string }> = ({ className, ...props }) => (
  <TitleBarInner {...props} className={[className, DRAG_HANDLE_CLASS].join(' ')} />
);

export const WNNode: FC<{ id: string }> = ({ id, children }) => {
  const theme = useTheme();
  const { data } = useNode(id);
  const audioNode = useAudioNode(id);

  if (audioNode.loading) {
    return <NodeLoaderWrapper>loading</NodeLoaderWrapper>;
  }

  if (audioNode.error) {
    return <NodeErrorWrapper>error: {audioNode.error}</NodeErrorWrapper>;
  }

  const {
    node: { inputs, outputs },
  } = audioNode;

  return (
    <NodeWrapper>
      <TitleBar>{data?.label || "No Name"}</TitleBar>
      <PortsPanel theme={theme}>
        <InputPorts>
          {inputs
            ? Object.keys(inputs).map((key, index) => (
                <Port key={index}>
                  <InputHandle id={key} />
                  <span>{key}</span>
                </Port>
              ))
            : null}
        </InputPorts>
        <OutputPorts>
          {outputs
            ? Object.keys(outputs).map((key, index) => (
                <Port key={index}>
                  <OutputHandle id={key} />
                  <span>{key}</span>
                </Port>
              ))
            : null}
        </OutputPorts>
      </PortsPanel>
      {children}
    </NodeWrapper>
  );
};
