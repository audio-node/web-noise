import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useAudioNode, useNode, WNNode, WNNodeProps } from "@web-noise/core";
import Editor from "./Editor";
import {
  MessageData,
  ScriptNode as TScriptNode,
  ScriptNodeData,
} from "./types";
import {
  types as scriptTypes,
  defaultValue as scriptDefaultValue,
} from "./Script/editorConfig";
import {
  types as workletScriptTypes,
  defaultValue as workletScriptDefaultValue,
} from "./WorkletScript/editorConfig";

const NodeWrapper = styled(WNNode)``;

const ScriptNode = (props: WNNodeProps<ScriptNodeData>) => {
  const { data, id, type } = props;

  const { node } = useAudioNode<TScriptNode>(id) || {};
  const { updateNodeValues, updateNodeConfig } = useNode(id);

  const { expression = "" } = data.values || {};

  const saveExpression = (expression: string) => {
    updateNodeValues({ expression });
  };

  const runExpression = (expression: string) => {
    node?.setValues({ expression });
  };

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!node) {
      return;
    }
    const onMessage = ({ data }: MessageEvent<MessageData>) => {
      const { name } = data;
      switch (name) {
        case "error":
          setError(data.error.toString());
          break;
        case "clean-error":
          setError(null);
          break;
      }
    };
    node.channel.addEventListener("message", onMessage);
    return () => {
      node.channel.removeEventListener("message", onMessage);
    };
  }, [node]);

  return (
    <NodeWrapper {...props}>
      <Editor
        value={expression}
        defaultValue={
          type === "workletScript"
            ? workletScriptDefaultValue
            : scriptDefaultValue
        }
        onExecute={(expression) => {
          saveExpression(expression);
          runExpression(expression);
        }}
        editorTypes={
          type === "workletScript" ? workletScriptTypes : scriptTypes
        }
        error={error}
      />
    </NodeWrapper>
  );
};

export default ScriptNode;
