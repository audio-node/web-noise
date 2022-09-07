import type { FC } from "react";

import { useState, useCallback, useRef } from "react";
import { ControlButton, useReactFlow } from "react-flow-renderer";
import { FaShareAlt as IconShare } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ReactTooltip from "react-tooltip";

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
    setLink(url.toString());
  }, [setLink, getNodes, getEdges]);

  return (
    <ControlButton onMouseOver={updateLink}>
      <div
        data-tip="link to this patch copied to clipboard"
        data-effect="solid"
        data-place="right"
        data-event="click"
        data-event-off="mouseout"
        data-iscapture="true"
        data-delay-hide="1000"
      >
        <CopyToClipboard
          text={link || ""}
          onCopy={() => console.log(link)}
          options={{ debug: true }}
        >
          <IconShare style={{ display: "flex" }} />
        </CopyToClipboard>
      </div>
      {/* @ts-ignore */}
      <ReactTooltip />
    </ControlButton>
  );
};

export default SharePatch;
