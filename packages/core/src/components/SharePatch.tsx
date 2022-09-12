import type { FC } from "react";

import { useCallback, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ControlButton } from "react-flow-renderer";
import { FaShareAlt as IconShare } from "react-icons/fa";
import ReactTooltip from "react-tooltip";
import useStore from "../store";

const SharePatch: FC = () => {
  const [nodes, edges] = useStore(({ nodes, edges }) => [nodes, edges]);

  const [link, setLink] = useState<string>();

  const updateLink = useCallback(() => {
    const dump = JSON.stringify({
      nodes,
      edges,
    });
    const url = new URL(window.location.href);
    url.searchParams.append("state", btoa(dump));
    setLink(url.toString());
  }, [setLink, nodes, edges]);

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
