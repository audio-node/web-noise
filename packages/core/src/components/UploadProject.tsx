import styled from "@emotion/styled";
import { useCallback, useRef } from "react";
import { FileDrop } from "react-file-drop";
import { FaFileUpload } from "react-icons/fa";
import useTheme from "../hooks/useTheme";
import useStore from "../store";
import { Theme } from "../theme";
import Modal from "./Modal";

interface UploadProjectProps {
  isOpen: boolean;
  closeMenu: () => void;
}

const UploadProjectWrapper = styled.div<{ theme: Theme }>`
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

// @TODO: unify with upload file
const UploadProject = ({ isOpen, closeMenu }: UploadProjectProps) => {
  const theme = useTheme();

  const setProject = useStore((store) => store.setProject);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(
    (files: FileList | null) => {
      const [file] = files || [];
      file
        .text()
        .then(JSON.parse)
        .then((projectState) => {
          setProject(projectState);
          closeMenu();
        })
        .catch(console.error);
    },
    [setProject, closeMenu],
  );

  const onTargetClick = () => {
    fileInputRef.current?.click();
  };

  return isOpen ? (
    <Modal onClose={closeMenu}>
      <UploadProjectWrapper theme={theme}>
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
      </UploadProjectWrapper>
    </Modal>
  ) : null;
};

export default UploadProject;
