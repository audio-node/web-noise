import styled from "@emotion/styled";
import { MouseEvent, useCallback, useState, useRef, ChangeEvent } from "react";
import { FileDrop } from "react-file-drop";
import { FaFileUpload } from "react-icons/fa";
import useTheme from "../hooks/useTheme";
import useStore from "../store";
import { Theme } from "../theme";
import Modal from "./Modal";
import { fileToBase64 } from "../lib";

interface UploadAudioProps {
  isOpen: boolean;
  closeMenu: () => void;
}

const UploadAudioWrapper = styled.div<{ theme: Theme }>`
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

const UploadAudio = ({ isOpen, closeMenu }: UploadAudioProps) => {
  const theme = useTheme();

  const setGraph = useStore(({ setGraph }) => setGraph);
  const setEditorState = useStore((store) => store.setEditorState);
  const addFile = useStore((store) => store.addFile);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(
    async (files: FileList | null) => {
      const [file] = files || [];
      const base64 = await fileToBase64(file);
      addFile({
        type: "audio",
        // @TODO: use nanoid here
        id: `audio-file-${+new Date()}`,
        name: file.name,
        file: base64,
      });
      closeMenu();
    },
    [addFile, closeMenu],
  );

  const onTargetClick = () => {
    fileInputRef.current?.click();
  };

  return isOpen ? (
    <Modal onClose={closeMenu}>
      <UploadAudioWrapper theme={theme}>
        <input
          onChange={({ target: { files } }) => uploadFile(files)}
          ref={fileInputRef}
          type="file"
          className="hidden"
          style={{ display: "none" }}
          accept=".wav,.mp3,.ogg"
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
      </UploadAudioWrapper>
    </Modal>
  ) : null;
};

export default UploadAudio;
