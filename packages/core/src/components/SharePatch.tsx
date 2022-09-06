import type { FC } from "react";

import { useState, useCallback } from "react";
import { ControlButton, useReactFlow } from "react-flow-renderer";
import { FaShareAlt as IconShare } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";

const useUrlDump = () => {
  const { getNodes, getEdges } = useReactFlow();

  return JSON.stringify(
    {
      nodes: getNodes(),
      edges: getEdges(),
    },
    null,
    2
  );
};

const SharePatch: FC = () => {
  const { getNodes, getEdges } = useReactFlow();
  const [link, setLink] = useState<string>();

  const updateLink = useCallback(() => {
    const dump = JSON.stringify({
      nodes: getNodes(),
      edges: getEdges(),
    });
    const url = new URL(window.location.href);
    url.searchParams.append("state", btoa(dump));
    // JSON.parse(atob(decodeURIComponent(<URL>)))
    setLink(url.toString());
  }, [setLink, getNodes, getEdges]);

  return (
    <ControlButton onMouseOver={updateLink}>
      <CopyToClipboard
        text={link || ""}
        onCopy={() => console.log(link)}
        options={{ debug: true }}
      >
        <IconShare />
      </CopyToClipboard>
    </ControlButton>
  );
};

export default SharePatch;
