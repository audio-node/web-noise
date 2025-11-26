import styled from "@emotion/styled";
import {
  BaseWNNode,
  TitleBar,
  useNode,
  useTheme,
  WNNodeProps,
} from "@web-noise/core";
import { useEffect, useRef, useState } from "react";
import Sticker from "./Sticker";
import { StickerData } from "./types";

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

export interface StickerProps extends WNNodeProps<StickerData> {}

const StickerNode = (props: StickerProps) => {
  const { id, data, selected } = props;
  const { updateNodeValues } = useNode(id);

  const editorRef = useRef<HTMLTextAreaElement | null>(null);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!editMode || !editorRef.current) {
      return;
    }
    editorRef.current.focus();
  }, [editorRef, editMode]);

  const { text = `*Double click to edit*` } = data.values || {};

  const [currentValue, setCurrentValue] = useState(text);

  return (
    <BaseWNNode {...props} hideToolbar={!selected}>
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
          <StickerWrapper onDoubleClick={() => setEditMode(true)}>
            <Sticker node={props} />
          </StickerWrapper>
        </TitleBarWrapper>
      )}
    </BaseWNNode>
  );
};

export default StickerNode;
