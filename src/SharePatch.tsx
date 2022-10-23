import styled from "@emotion/styled";
import { Modal, theme as defaultTheme, Theme, useStore } from "@web-noise/core";
import { FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import QRCode from "react-qr-code";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface SharePatchProps {
  isOpen: boolean;
  closeMenu: () => void;
  theme?: Theme;
}

const SharePatchWrapper = styled.div<{ theme: Theme }>`
  font-size: 1.1rem;
  height: 100%;
  color: ${({ theme }) => theme.colors.highlight2};

  display: grid;
  grid-template-columns: auto max-content;
  align-items: center;
  justify-items: center;
`;

const QrCodeError = styled.div<{ theme: Theme }>``;

const QRCodeWrapper = styled.div<{ theme: Theme }>`
  padding: 1rem;
  margin: 1rem;
  background: white;
`;

export const getLink = ({ nodes, edges }: any) => {
  const dump = JSON.stringify({
    nodes,
    edges,
  });
  const url = new URL(window.location.href);
  url.searchParams.append("state", btoa(unescape(encodeURIComponent(dump))));
  return url.toString();
};

const SharePatch: FC<SharePatchProps> = ({
  isOpen,
  closeMenu,
  theme = defaultTheme,
}) => {
  const nodes = useStore(({ nodes }) => nodes);
  const edges = useStore(({ edges }) => edges);

  const link = getLink({ nodes, edges });

  return isOpen ? (
    <Modal onClose={closeMenu}>
      <SharePatchWrapper theme={theme}>
        <p>
          <a
            href={link}
            style={{ fontSize: "2rem", color: theme.colors.accent1 }}
          >
            Link to this patch
          </a>
        </p>
        {/* @ts-ignore */}
        <ErrorBoundary FallbackComponent={() => <QrCodeError theme={theme} />}>
          <QRCodeWrapper theme={theme}>
            <QRCode
              size={256}
              style={{ height: "100%", maxHeight: "100%", width: "auto" }}
              value={link}
              viewBox={`0 0 256 256`}
            />
          </QRCodeWrapper>
        </ErrorBoundary>
      </SharePatchWrapper>
    </Modal>
  ) : null;
};

export default SharePatch;
