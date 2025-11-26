import styled from "@emotion/styled";
import { type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { MdClose as CloseIcon } from "react-icons/md";
import { withTheme } from "@emotion/react";
import useTheme from "../hooks/useTheme";
import { Theme } from "../theme";

const ModalOuter = withTheme(styled.div<{
  theme: Theme;
  outerBackground?: string;
}>`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.modal};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: ${({ theme, outerBackground }) =>
    outerBackground || theme.colors.elevation3 + "cc"};
  display: flex;
  align-items: center;
  justify-content: center;
`);

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

export interface ModalProps {
  onClose?: () => void;
  children: ReactNode;
  outerBackground?: string;
}

export const Modal = ({
  children,
  onClose,
  outerBackground,
  ...props
}: ModalProps) => {
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

  return createPortal(
    <ModalOuter outerBackground={outerBackground} onClick={onClose}>
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
    </ModalOuter>,
    document.body,
  );
};

export default Modal;
