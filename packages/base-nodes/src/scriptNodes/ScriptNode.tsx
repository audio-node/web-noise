import { useAudioNode, useNode, WNNode, WNNodeProps } from "@web-noise/core";
import { Resizable } from "re-resizable";
import { useEffect, useState } from "react";
import Editor from "../components/Editor";
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

const ScriptNode = (props: WNNodeProps<ScriptNodeData>) => {
  const { data, id, type } = props;

  const { node } = useAudioNode<TScriptNode>(id) || {};
  const { updateNodeValues, updateNodeConfig } = useNode(id);

  const { expression = "" } = data.values || {};
  const { size = { width: 16 * 35, height: 16 * 20 } } = data.config || {};

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

  const { width, height } = size;

  return (
    <WNNode {...props}>
      <Resizable
        size={{ width, height }}
        minWidth={200}
        enable={{
          top: false,
          right: true,
          bottom: true,
          left: false,
          topRight: false,
          bottomRight: true,
          bottomLeft: false,
          topLeft: false,
        }}
        onResizeStop={(e, direction, ref, d) => {
          console.log(5555);
          updateNodeConfig({
            size: {
              width: width + d.width,
              height: height + d.height,
            },
          });
        }}
      >
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
      </Resizable>
    </WNNode>
  );
};

export default ScriptNode;
