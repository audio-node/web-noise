import styled from "@emotion/styled";
import { FC, useEffect } from "react";
import { MdClose as CloseIcon } from "react-icons/md";
import useTheme from "../hooks/useTheme";
import { Theme } from "../theme";

const ModalOuter = styled.div<{ theme: Theme }>`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.modal};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.colors.elevation3}cc;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalInner = styled.div<{ theme: Theme }>`
  background: ${({ theme }) => theme.colors.elevation2};
  box-shadow: 1px 1px 1px 1px ${({ theme }) => theme.colors.elevation1};
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

const Modal: FC<{ onClose?: () => void }> = ({
  children,
  onClose,
  ...props
}) => {
  const theme = useTheme();

  useEffect(() => {
    const escHandler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };
    document.addEventListener("keydown", escHandler);
    return () => {
      document.removeEventListener("keydown", escHandler);
    };
  }, [onClose]);

  return (
    <ModalOuter theme={theme} onClick={onClose}>
      <ModalInner
        {...props}
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
