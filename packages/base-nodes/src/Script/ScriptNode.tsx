import { useAudioNode, useNode, WNNode, WNNodeProps } from "@web-noise/core";
import { Resizable } from "re-resizable";
import { FC, useEffect, useState } from "react";
import Editor from "../components/Editor";
import {
  MessageData,
  ScriptNode as TScriptNode,
  ScriptNodeValues,
} from "./types";
import { types as scriptTypes, defaultValue as scriptDefaultValue } from "./script/editorConfig";
import { types as workletScriptTypes, defaultValue as workletScriptDefaultValue } from "./workletScript/editorConfig";

interface ScriptNodeData {
  label: string;
  values?: ScriptNodeValues;
}

const ScriptNode: FC<WNNodeProps<ScriptNodeData>> = (props) => {
  const { data, id, type } = props;

  const { node } = useAudioNode<TScriptNode>(id) || {};
  const { updateNodeValues } = useNode(id);

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
    <WNNode {...props}>
      <Resizable
        defaultSize={{
          width: 16 * 35,
          height: 16 * 20,
        }}
        minWidth={200}
      >
        <Editor
          value={expression}
          defaultValue={type === "workletScript"
              ? workletScriptDefaultValue
              : scriptDefaultValue}
          onExecute={(expression) => {
            saveExpression(expression);
            runExpression(expression);
          }}
          editorTypes={
            type === "workletScript"
              ? workletScriptTypes
              : scriptTypes
          }
          error={error}
        />
      </Resizable>
    </WNNode>
  );
};

export default ScriptNode;
