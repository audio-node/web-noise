import styled from "@emotion/styled";
import { NodeResizeControl } from "@xyflow/react";
import { useEffect, useRef, useState } from "react";
import { MdSettings as SettingsIcon } from "react-icons/md";
import {
  Theme,
  TitleBar,
  useNode,
  useTheme,
  WNNodeProps,
} from "@web-noise/core";
import { Modal } from "@web-noise/core/components";
import ConfigNode from "./Config";
import Sticker from "./Sticker";
import { StickerData } from "./types";

const StickerNodeWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

export const ConfigModal = styled(Modal)`
  padding: 1rem;
  max-width: 20rem;
  height: auto;
  max-height: 90%;
`;

const TitleBarWrapper = styled(TitleBar)`
  width: 100%;
  min-width: 100%;
  height: 100%;
  min-height: 100%;
  padding: 0;
  background-color: transparent;

  hr {
    border: none;
    border-bottom: 1px solid var(--leva-colors-elevation3);
  }

  code {
    background-color: var(--leva-colors-elevation3);
  }

  pre {
    background-color: var(--leva-colors-elevation3);
    padding: 0.2rem 0.3rem;
    border-radius: 1px;
  }

  a {
    color: var(--leva-colors-accent1);
  }
`;

const MdEditor = styled.textarea`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  border: none;
  padding: 0;
  resize: none;
  padding: 0.5rem 0.3rem;
  background: var(--leva-colors-elevation1);
  color: #fff;

  &:focus,
  &:active {
    outline: none;
  }
`;

const StickerWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const SettingsIconWrapper = styled(SettingsIcon)<{ theme: Theme }>`
  font-size: 1.2rem;
  opacity: 0.4;
  width: 1rem;
  color: ${({ theme }) => theme.colors.highlight2};
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const Toolbar = styled.div<{ theme: Theme }>`
  position: absolute;
  top: -1.5rem;
`;

export interface StickerProps extends WNNodeProps<StickerData> {}

const StickerNode = (props: StickerProps) => {
  const { id, data, selected } = props;
  const { updateNodeValues, updateNodeConfig } = useNode(id);

  const theme = useTheme();

  const editorRef = useRef<HTMLTextAreaElement | null>(null);

  const [editMode, setEditMode] = useState(false);
  const [configMode, setConfigMode] = useState(false);

  useEffect(() => {
    if (!editMode || !editorRef.current) {
      return;
    }
    editorRef.current.focus();
  }, [editorRef, editMode]);

  useEffect(() => {
    if (configMode && !selected) {
      setConfigMode(false);
    }
  }, [selected, configMode]);

  const { text = `*Double click to edit*` } = data.values || {};

  const [currentValue, setCurrentValue] = useState(text);

  return (
    <StickerNodeWrapper>
      {selected && (
        <Toolbar theme={theme}>
          <SettingsIconWrapper
            theme={theme}
            onClickCapture={() => setConfigMode((isShown) => !isShown)}
          />
        </Toolbar>
      )}
      <NodeResizeControl
        style={{
          background: "transparent",
          border: "none",
        }}
        minWidth={100}
        minHeight={100}
      />
      {editMode ? (
        <MdEditor
          ref={editorRef}
          value={currentValue}
          onChange={(event) => setCurrentValue(event.target.value)}
          onBlur={() => {
            updateNodeValues({
              text: currentValue,
            });
            setEditMode(false);
          }}
          onWheelCapture={(event) => event.stopPropagation()}
        />
      ) : (
        <TitleBarWrapper>
          <StickerWrapper
            onDoubleClick={() => setEditMode(true)}
            style={editMode ? { display: "none" } : {}}
          >
            <Sticker node={props} />
          </StickerWrapper>
        </TitleBarWrapper>
      )}
      {configMode && (
        <ConfigModal onClose={() => setConfigMode(false)}>
          <ConfigNode {...props} />
        </ConfigModal>
      )}
    </StickerNodeWrapper>
  );
};

export default StickerNode;
