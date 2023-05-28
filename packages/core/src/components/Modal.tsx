import styled from "@emotion/styled";
import { FC } from "react";
import { MdClose as CloseIcon } from "react-icons/md";
import useTheme from "../hooks/useTheme";
import { Theme } from "../theme";

const ModalOuter = styled.div<{ theme: Theme }>`
  position: fixed;
  z-index: 9998;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgb(24 28 32 / 20%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalInner = styled.div<{ theme: Theme }>`
  background: rgb(24 28 32 / 78%);
  color: white;
  width: 70%;
  height: 80%;
  overflow-y: scroll;
  position: relative;
`;

const ModalCloser = styled(CloseIcon)<{ theme: Theme }>`
  position: absolute;
  top: 0.2rem;
  right: 0.2rem;
  cursor: pointer;
`;

const Modal: FC<{ onClose?: () => void }> = ({ children, onClose }) => {
  const theme = useTheme();
  return (
    <ModalOuter theme={theme} onClick={onClose}>
      <ModalInner
        onClick={(e) => {
          e.stopPropagation();
        }}
        theme={theme}
      >
        {children}
        <ModalCloser theme={theme} onClick={onClose} />
      </ModalInner>
    </ModalOuter>
  );
};

export default Modal;
