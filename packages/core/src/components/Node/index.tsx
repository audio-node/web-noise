import styled from "@emotion/styled";
import React, { FC, useState, useCallback, useRef, useMemo } from "react";
import { Handle, HandleProps, NodeProps, Position } from "reactflow";
import { MdSettings as SettingsIcon } from "react-icons/md";
import { Resizable } from "re-resizable";
import { DRAG_HANDLE_CLASS } from "../../constants";
import useAudioNode from "../../hooks/useAudioNode";
import useTheme from "../../hooks/useTheme";
import useStore from "../../store";
import useNode from "../../hooks/useNode";
import { Theme } from "../../theme";
import { WNNodeData } from "../../types";

const NodeWrapper = styled.div`
  background-color: var(--leva-colors-elevation1);
`;

const NodeLoaderWrapper = styled(NodeWrapper)`
  padding: 2rem 5rem;
`;

const NodeErrorWrapper = styled(NodeWrapper)`
  padding: 1rem 2rem;
`;

const SettingsIconWrapper = styled(SettingsIcon)`
  font-size: 1.2rem;
  opacity: 0.4;
  width: 1rem;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const Section = styled.div`
  position: relative;
  font-family: var(--leva-fonts-mono);
  font-size: var(--leva-fontSizes-root);
  background-color: var(--leva-colors-elevation1);
`;

export const TitleBarInner = styled(Section)`
  display: flex;
  height: var(--leva-sizes-titleBarHeight);
  touch-action: none;
  align-items: center;
  justify-content: center;
  flex: 1 1 0%;
  color: var(--leva-colors-highlight1);
  padding: 0 0.4rem;
  gap: 0.3rem;
`;

export const TitleBarLabel = styled.input`
  width: 100%;
  background: none;
  border: none;
  text-align: center;
  color: var(--leva-colors-highlight1);
  font-family: var(--leva-fonts-mono);
  font-size: var(--leva-fontSizes-root);
  cursor: inherit;
  text-overflow: ellipsis;
  outline: none;

  &:focus {
    box-shadow: 0 0 0 green var(--leva-colors-accent2);
  }
  &:focus-within {
    box-shadow: 0 0 0 green var(--leva-colors-accent2);
  }
  &:focus-vissible {
    box-shadow: 0 0 0 green var(--leva-colors-accent2);
  }
  &:not([readonly]):focus {
    color: #fff;
    appearance: none;
    cursor: auto;
    background-color: var(--leva-colors-elevation2);
    padding: 0.3rem;
    border-radius: 0.2rem;
  }
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

export const InputHandle: FC<Partial<HandleProps>> = (props) => (
  <StyledInputHandle {...props} type="target" position={Position.Left} />
);

export const StyledOutputHandle = styled(Handle)`
  right: -3px;
`;

export const OutputHandle: FC<Partial<HandleProps>> = (props) => (
  <StyledOutputHandle {...props} type="source" position={Position.Right} />
);

export type WNNodeProps<T = Record<string, unknown>> = NodeProps<
  T & WNNodeData
>;

export const TitleBar: FC<{ className?: string }> = ({
  className,
  ...props
}) => (
  <TitleBarInner
    {...props}
    className={[className, DRAG_HANDLE_CLASS].join(" ")}
  />
);

export interface WNNodeParameters extends NodeProps {
  children?: any;
}

const useConfigNode = (type: string) => {
  const ConfigNode = useStore(
    (store) => store.nodesConfiguration[type]?.configNode
  );

  return {
    ConfigNode,
  };
};

export const WNNode = (props: WNNodeParameters) => {
  const { id, children, selected, ...rest } = props;
  const theme = useTheme();
  const getNode = useStore(({ getNode }) => getNode);
  const nodesConfiguration = useStore((store) => store.nodesConfiguration);

  const isResizeable = useMemo(
    () => nodesConfiguration[props.type].resizable ?? false,
    [nodesConfiguration, props.type]
  );

  const { updateNodeLabel, updateNodeConfig } = useNode(id);
  const { data } = getNode(id) || {};
  const audioNode = useAudioNode(id);
  const { ConfigNode } = useConfigNode(rest.type);

  const labelInputRef = useRef<HTMLInputElement>(null);

  const [labelEditMode, setLabelEditMode] = useState(false);
  const [configMode, setShowConfigMode] = useState(false);

  const editNodeLabel = useCallback(
    (event: React.MouseEvent) => {
      //@ts-ignore
      event.target?.select();
      setLabelEditMode(true);
    },
    [setLabelEditMode]
  );

  const exitEditMode = useCallback(() => {
    window.getSelection()?.collapseToEnd();
    setLabelEditMode(false);
  }, [setLabelEditMode]);

  const saveNodeLabel = useCallback(() => {
    exitEditMode();
    if (labelInputRef.current) {
      updateNodeLabel(labelInputRef.current.value);
    }
  }, [labelInputRef, exitEditMode, updateNodeLabel]);

  const cancelNodeLabelEdit = useCallback(() => {
    exitEditMode();
    if (labelInputRef.current && data?.label) {
      labelInputRef.current.value = data.label;
    }
  }, [labelInputRef, exitEditMode, data]);

  if (!audioNode) {
    return (
      <NodeLoaderWrapper className={DRAG_HANDLE_CLASS}>
        can't find audio node
      </NodeLoaderWrapper>
    );
  }

  if (audioNode.loading) {
    return (
      <NodeLoaderWrapper className={DRAG_HANDLE_CLASS}>
        loading
      </NodeLoaderWrapper>
    );
  }

  if (audioNode.error) {
    return (
      <NodeErrorWrapper className={DRAG_HANDLE_CLASS}>
        error: {audioNode.error.toString()}
      </NodeErrorWrapper>
    );
  }

  if (!audioNode.node) {
    return (
      <NodeLoaderWrapper className={DRAG_HANDLE_CLASS}>
        can't find audio node
      </NodeLoaderWrapper>
    );
  }

  const size = data?.config?.size as
    | { width: number; height: number }
    | undefined;

  const {
    node: { inputs, outputs },
  } = audioNode;

  return (
    <NodeWrapper>
      <TitleBar>
        <TitleBarLabel
          ref={labelInputRef}
          type="text"
          readOnly={!labelEditMode}
          defaultValue={data?.label || "No Name"}
          onDoubleClick={(event) => editNodeLabel(event)}
          onBlur={saveNodeLabel}
          onKeyDown={(event) => {
            switch (event.key) {
              case "Escape":
                cancelNodeLabelEdit();
                break;
              case "Enter":
                saveNodeLabel();
                break;
            }
          }}
        />
        {ConfigNode && (
          <SettingsIconWrapper
            onClickCapture={() => setShowConfigMode((isShown) => !isShown)}
          />
        )}
      </TitleBar>
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
      {ConfigNode && configMode && selected ? (
        <ConfigNode {...props} />
      ) : isResizeable ? (
        <Resizable
          size={size}
          minWidth={180}
          minHeight={30}
          enable={{
            bottom: true,
            bottomRight: true,
            right: true,
          }}
          onResizeStop={(e, direction, ref, d) => {
            const newSize = size
              ? {
                  width: size.width + d.width,
                  height: size.height + d.height,
                }
              : ref.getBoundingClientRect();
            updateNodeConfig({
              ...data?.config,
              size: newSize,
            });
          }}
        >
          {children}
        </Resizable>
      ) : (
        children
      )}
    </NodeWrapper>
  );
};
