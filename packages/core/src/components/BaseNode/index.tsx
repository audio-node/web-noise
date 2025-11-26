import { withTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Node, NodeProps, NodeResizeControl } from "@xyflow/react";
import { useMemo, useState } from "react";
import {
  MdInfoOutline as InfoIcon,
  MdSettings as SettingsIcon,
} from "react-icons/md";
import { DRAG_HANDLE_CLASS } from "../../constants";
import useAudioNode from "../../hooks/useAudioNode";
import useNode from "../../hooks/useNode";
import useTheme from "../../hooks/useTheme";
import useStore from "../../store";
import { Theme } from "../../theme";
import EditableLabel from "../EditableLabel";
import Modal, { ModalProps } from "../Modal";
import NodeInfoModal from "../NodeInfoModal";

const NodeWrapper = withTheme(styled.div<{ theme: Theme }>`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`);

const SettingsIconWrapper = styled(SettingsIcon)`
  font-size: 1.2rem;
  opacity: 0.4;
  width: 1rem;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const InfoIconWrapper = styled(InfoIcon)`
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
  height: 2rem;
  max-height: 2rem;
  min-height: 2rem;
  touch-action: none;
  align-items: center;
  justify-content: space-between;
  flex: 1 1 0%;
  color: var(--leva-colors-highlight1);
  padding: 0 0.4rem;
  gap: 0.3rem;
`;

export const NodeInner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const ConfigModal = styled(Modal)<ModalProps>`
  padding: 1rem;
  max-width: 20rem;
  height: auto;
  max-height: 90%;
`;

export type WNNodeProps<T extends Record<string, unknown>> = NodeProps<Node<T>>;

export interface TitleBarProps {
  className?: string;
  [key: string]: unknown;
}

export const TitleBar = ({ className, ...props }: TitleBarProps) => (
  <TitleBarInner
    {...props}
    className={[className, DRAG_HANDLE_CLASS].join(" ")}
  />
);

export interface BaseWNNodeParameters extends NodeProps {
  children?: any;
  hideToolbar?: boolean;
}

const useNodeManifest = (type: string) => {
  const data = useStore((store) => store.nodesConfiguration[type]);

  return data;
};

const useConfigNode = (type: string) => {
  const { configNode: ConfigNode } = useNodeManifest(type);

  return {
    ConfigNode,
  };
};

export const BaseWNNode = (props: BaseWNNodeParameters) => {
  const { id, children, selected, ...rest } = props;
  const theme = useTheme();
  const getNode = useStore(({ getNode }) => getNode);
  const nodesConfiguration = useStore((store) => store.nodesConfiguration);

  const [isInfoModalShown, setIsInfoModalShown] = useState(false);

  const { info, minSize } = useNodeManifest(props.type);

  const isResizeable = useMemo(
    () => nodesConfiguration[props.type].resizable ?? false,
    [nodesConfiguration, props.type],
  );

  const { updateNodeLabel } = useNode(id);
  const { data } = getNode(id) || {};
  const audioNode = useAudioNode(id);
  const { ConfigNode } = useConfigNode(rest.type);

  const [configMode, setShowConfigMode] = useState(false);

  return (
    <NodeWrapper>
      {!props.hideToolbar && (
        <TitleBar>
          {info && (
            <InfoIconWrapper onClickCapture={() => setIsInfoModalShown(true)} />
          )}
          <EditableLabel
            value={data?.label ?? "No Name"}
            onChange={updateNodeLabel}
          />
          {ConfigNode && (
            <SettingsIconWrapper
              onClickCapture={() => setShowConfigMode((isShown) => !isShown)}
            />
          )}
        </TitleBar>
      )}

      {children}

      {isResizeable && (
        <NodeResizeControl
          style={{
            background: "transparent",
            border: "none",
          }}
          minWidth={minSize?.width || 180}
          minHeight={minSize?.height || 100}
        />
      )}
      <NodeInfoModal
        isOpen={isInfoModalShown}
        type={props.type}
        onClose={() => setIsInfoModalShown(false)}
        node={audioNode?.node ?? null}
      />
      {ConfigNode && configMode && (
        <ConfigModal
          onClose={() => setShowConfigMode(false)}
          outerBackground={theme.colors.elevation3 + "ee"}
        >
          <ConfigNode
            {...{
              ...props,
              data: {
                label: "unknown",
                ...props.data,
              },
            }}
          />
        </ConfigModal>
      )}
    </NodeWrapper>
  );
};
