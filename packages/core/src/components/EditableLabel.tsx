import styled from "@emotion/styled";
import React, { useCallback, useEffect, useRef, useState } from "react";

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

interface EditableLabelProps {
  onChange: (value: string) => void;
  value?: string;
  className?: string;
}

const EditableLabel = ({
  onChange,
  value = "",
  className,
}: EditableLabelProps) => {
  const labelInputRef = useRef<HTMLInputElement>(null);

  const [labelEditMode, setLabelEditMode] = useState(false);
  const editNodeLabel = useCallback(
    (event: React.MouseEvent) => {
      //@ts-ignore
      event.target?.select();
      setLabelEditMode(true);
    },
    [setLabelEditMode],
  );

  const exitEditMode = useCallback(() => {
    window.getSelection()?.collapseToEnd();
    setLabelEditMode(false);
  }, [setLabelEditMode]);

  const saveNodeLabel = useCallback(() => {
    exitEditMode();
    if (labelInputRef.current) {
      onChange(labelInputRef.current.value);
    }
  }, [labelInputRef, exitEditMode, onChange]);

  const cancelNodeLabelEdit = useCallback(() => {
    exitEditMode();
    if (labelInputRef.current && value) {
      labelInputRef.current.value = value;
    }
  }, [labelInputRef, exitEditMode, value]);

  useEffect(() => {
    if (!labelInputRef.current) {
      return;
    }
    labelInputRef.current.value = value;
  }, [value, labelInputRef]);

  return (
    <TitleBarLabel
      ref={labelInputRef}
      type="text"
      readOnly={!labelEditMode}
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
      className={className}
    />
  );
};

export default EditableLabel;
