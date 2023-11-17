import { withTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { marked } from "marked";
import useStore from "../../store";
import { Theme } from "../../theme";
import Modal from "../Modal";

//@ts-ignore
import HELP from "bundle-text:./HELP.md";

const MdPreview = withTheme(styled.div<{ theme: Theme }>`
  font-family: var(--leva-fonts-mono);
  font-size: 0.7rem;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  overflow: scroll;
  color: ${({ theme }) => theme.colors.whitePrimary};
  padding: 0 0.5rem;

  code {
    color: ${({ theme }) => theme.colors.accent3};
    filter: hue-rotate(180deg);
  }
`);

const ModalContent = withTheme(styled.div<{ theme: Theme }>`
  padding: 1rem;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
`);

const HelpModal = () => {
  const isHelpShown = useStore((store) => store.isHelpShown);
  const toggleHelp = useStore((store) => store.toggleHelp);

  if (!isHelpShown) {
    return null;
  }

  return (
    <Modal
      onClose={() => {
        toggleHelp();
      }}
    >
      <ModalContent>
        <MdPreview
          dangerouslySetInnerHTML={{ __html: marked(HELP) }}
          onWheelCapture={(event) => event.stopPropagation()}
        ></MdPreview>
      </ModalContent>
    </Modal>
  );
};

export default HelpModal;
