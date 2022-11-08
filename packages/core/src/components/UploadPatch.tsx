import styled from "@emotion/styled";
import {
  FC,
  MouseEvent,
  useCallback,
  useState,
  useRef,
  ChangeEvent,
} from "react";
import { FileDrop } from "react-file-drop";
import { FaFileUpload } from "react-icons/fa";
import useTheme from "../hooks/useTheme";
import useStore from "../store";
import { Theme } from "../theme";
import Modal from "./Modal";

interface UploadPatchProps {
  isOpen: boolean;
  closeMenu: () => void;
}

const UploadPatchWrapper = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

  .drop-zone-wrapper {
    width: 80%;
    height: 80%;
  }

  .drop-zone {
    height: 100%;
    width: 100%;
    border-style: dashed;
    border-width: 2px;
    border-color: ${({ theme }) => theme.colors.highlight2};
    opacity: 0.5;
    cursor: pointer;
  }

  .drop-zone:hover,
  .drop-zone-drag-over {
    opacity: 1;
  }
`;

const DropZoneInner = styled.div<{ theme: Theme }>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const FileUploadIcon = styled(FaFileUpload)`
  width: 100%;
  height: 8rem;
`;

const FileUploadMessage = styled.div`
  font-size: 2rem;
`;

const UploadPatch: FC<UploadPatchProps> = ({ isOpen, closeMenu }) => {
  const theme = useTheme();

  const setGraph = useStore(({ setGraph }) => setGraph);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(
    (files: FileList | null) => {
      const [file] = files || [];
      file
        .text()
        .then(JSON.parse)
        .then((graphState) => {
          setGraph(graphState);
          closeMenu();
        })
        .catch(console.error);
    },
    [setGraph, closeMenu]
  );

  const onTargetClick = () => {
    fileInputRef.current?.click();
  };

  return isOpen ? (
    <Modal onClose={closeMenu}>
      <UploadPatchWrapper theme={theme}>
        <input
          onChange={({ target: { files } }) => uploadFile(files)}
          ref={fileInputRef}
          type="file"
          className="hidden"
          style={{ display: "none" }}
          accept=".json"
        />
        <FileDrop
          className="drop-zone-wrapper"
          targetClassName="drop-zone"
          draggingOverTargetClassName="drop-zone-drag-over"
          onTargetClick={onTargetClick}
          onDrop={(files) => uploadFile(files)}
        >
          <DropZoneInner theme={theme}>
            <FileUploadIcon />
            <FileUploadMessage>click or drop file here</FileUploadMessage>
          </DropZoneInner>
        </FileDrop>
      </UploadPatchWrapper>
    </Modal>
  ) : null;
};

export default UploadPatch;
