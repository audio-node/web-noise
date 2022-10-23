import styled from "@emotion/styled";
import { TitleBar, useNode, WNNodeProps } from "@web-noise/core";
import { marked } from "marked";
import { Resizable } from "re-resizable";
import { FC, useEffect, useRef, useState } from "react";

interface StickerData {
  values?: {
    text?: string;
    width?: number;
    height?: number;
  };
}

const TitleBarWrapper = styled(TitleBar)`
  width: auto;
  height: 100%;
  padding: 0;

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
  border: none;
  padding: 0;
  resize: none;
  padding: 0 0.3rem;
  background: var(--leva-colors-elevation1);
  color: #fff;

  &:focus,
  &:active {
    outline: none;
  }
`;

const MdPreview = styled.div`
  height: 100%;
  width: 100%;
  overflow: scroll;
  color: #fff;
  background-color: var(--leva-colors-elevation2);
  padding: 0 0.5rem;
`;

const Sticker: FC<WNNodeProps<StickerData>> = ({ data, id }) => {
  const { updateNodeValues } = useNode(id);

  const editorRef = useRef<HTMLTextAreaElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const [editMode, setEditMode] = useState(false);

  const {
    text = `*Double click to edit*`,
    width = 200,
    height = 100,
  } = data.values || {};

  const [currentValue, setCurrentValue] = useState(text);

  useEffect(() => {
    if (!editorRef.current || !previewRef.current) {
      return;
    }
    const doubleClickHandler = () => {
      setEditMode(true);
      editorRef.current?.focus();
    };
    previewRef.current.addEventListener("dblclick", doubleClickHandler);
    return () => {
      previewRef.current?.removeEventListener("dblclick", doubleClickHandler);
    };
  }, [editorRef.current, previewRef.current, setEditMode]);


  return (
    <Resizable
      enable={{
        top: false,
        right: true,
        bottom: true,
        left: false,
        topRight: false,
        bottomRight: true,
        bottomLeft: false,
        topLeft: false,
      }}
      minWidth={100}
      minHeight={50}
      size={{ width, height }}
      onResizeStop={(e, direction, ref, d) => {
        updateNodeValues({
          text,
          width: width + d.width,
          height: height + d.height,
        });
      }}
    >
      <TitleBarWrapper>
        <MdEditor
          style={editMode ? {} : { display: "none" }}
          ref={editorRef}
          value={currentValue}
          onChange={(event) => setCurrentValue(event.target.value)}
          onBlur={() => {
            updateNodeValues({
              text: currentValue,
              width,
              height,
            });
            setEditMode(false);
          }}
          onWheelCapture={(event) => event.stopPropagation()}
        />
        <MdPreview
          ref={previewRef}
          style={editMode ? { display: "none" } : {}}
          dangerouslySetInnerHTML={{ __html: marked(text) }}
          onWheelCapture={(event) => event.stopPropagation()}
        ></MdPreview>
      </TitleBarWrapper>
    </Resizable>
  );
};

export default Sticker;
