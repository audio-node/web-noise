import { withTheme } from "@emotion/react";
import styled from "@emotion/styled";
// @ts-ignore
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

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    unicode-bidi: isolate;
  }

  h1 {
    font-size: 2em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
  }

  h2 {
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
  }

  h3 {
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
  }

  ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    padding-inline-start: 40px;
    unicode-bidi: isolate;
  }

  p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    unicode-bidi: isolate;
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
