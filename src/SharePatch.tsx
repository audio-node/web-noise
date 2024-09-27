import styled from "@emotion/styled";
import { Modal, theme as defaultTheme, Theme, useStore } from "@web-noise/core";
// import { ErrorBoundary } from "react-error-boundary";
// import QRCode from "react-qr-code";

interface SharePatchProps {
  isOpen: boolean;
  closeMenu: () => void;
  theme?: Theme;
}

const SharePatchWrapper = styled.div`
  font-size: 1.1rem;
  height: 100%;

  display: grid;
  grid-template-columns: auto max-content;
  align-items: center;
  justify-items: center;
`;

// const QrCodeError = styled.div<{ theme: Theme }>``;
//
// const QRCodeWrapper = styled.div<{ theme: Theme }>`
//   padding: 1rem;
//   margin: 1rem;
//   background: white;
// `;

// export const getLink = ({ nodes, edges }: any) => {
//   const dump = JSON.stringify({
//     nodes,
//     edges,
//   });
//   const url = new URL(window.location.href);
//   url.searchParams.append("state", btoa(unescape(encodeURIComponent(dump))));
//   return url.toString();
// };

const SharePatch = ({
  isOpen,
  closeMenu,
  theme = defaultTheme,
}: SharePatchProps) => {
  // const nodes = useStore(({ nodes }) => nodes);
  // const edges = useStore(({ edges }) => edges);
  return null;

  return (
    <Modal onClose={closeMenu}>
      <SharePatchWrapper>TBD</SharePatchWrapper>
    </Modal>
  );
};

export default SharePatch;
