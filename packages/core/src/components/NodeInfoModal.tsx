import styled from "@emotion/styled";
import Modal from "./Modal";
import { marked } from "marked";
import useStore from "../store";
import { withTheme } from "@emotion/react";
import { useMemo } from "react";
import { WNAudioNode } from "../types";
import { Theme } from "../theme";

interface NodeInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: string;
  node: WNAudioNode;
}

const NodeInfoWrapper = withTheme(styled.div<{ theme: Theme }>`
  height: 100%;
  width: 100%;
  overflow: scroll;
  padding: 0.6rem;
  box-sizing: border-box;

  hr {
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.elevation3};
  }

  code {
    background-color: ${({ theme }) => theme.colors.elevation3};
    color: ${({ theme }) => theme.colors.highlight3};
    font-family:
      source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  }

  pre {
    background-color: ${({ theme }) => theme.colors.elevation3};
    padding: 0.2rem 0.3rem;
    border-radius: 1px;
  }

  a {
    color: ${({ theme }) => theme.colors.accent1};
  }
`);

const useNodeManifest = (type: string) => {
  const data = useStore((store) => store.nodesConfiguration[type]);
  return data;
};

const NodeInfoModal = ({
  isOpen,
  onClose,
  type: nodeType,
  node,
}: NodeInfoModalProps) => {
  const { info, portsDescription } = useNodeManifest(nodeType);

  const portsInfo = useMemo(() => {
    const parts = [];

    const inputPorts = node.inputs;
    if (inputPorts) {
      parts.push(`## Inputs`);
      for (const portName in inputPorts) {
        const port = inputPorts[portName];
        parts.push(`### *${portName}*`);

        const description = portsDescription?.inputs?.[portName];

        if (description) {
          parts.push(description);
        }

        if (Array.isArray(port.type)) {
          parts.push(`**Types**: \`${port.type.join(", ")}\``);
        } else {
          parts.push(`**Type**: \`${port.type || "unknown"}\``);
        }

        if (port.range) {
          parts.push(`**Range**: \`[${port.range[0]}, ${port.range[1]}]\``);
        }

        if (port.defaultValue !== undefined) {
          parts.push(`**Default**: \`${port.defaultValue}\``);
        }
      }
    }

    const outputPorts = node.outputs;
    if (outputPorts) {
      parts.push(`## Outputs`);
      for (const portName in outputPorts) {
        const port = outputPorts[portName];
        parts.push(`### *${portName}*`);

        const description = portsDescription?.outputs?.[portName];

        if (description) {
          parts.push(description);
        }

        if (Array.isArray(port.type)) {
          parts.push(`**Types**: \`${port.type.join(", ")}\``);
        } else {
          parts.push(`**Type**: \`${port.type || "unknown"}\``);
        }

        if (port.range) {
          parts.push(`**Range**: \`[${port.range[0]}, ${port.range[1]}]\``);
        }

        if (port.defaultValue !== undefined) {
          parts.push(`**Default**: \`${port.defaultValue}\``);
        }
      }
    }
    return parts.join("\n\n");
  }, [node, portsDescription]);

  const combinedInfo = (info || "") + "\n\n" + portsInfo;

  return isOpen ? (
    <Modal onClose={onClose}>
      <NodeInfoWrapper
        dangerouslySetInnerHTML={{ __html: marked(combinedInfo || "") }}
      />
    </Modal>
  ) : null;
};

export default NodeInfoModal;
