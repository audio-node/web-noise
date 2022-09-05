import styled from "@emotion/styled";
import {
  Theme,
  useAudioNode,
  useNode,
  useTheme,
  WNNode,
  WNNodeProps,
} from "@web-noise/core";
import { button, LevaPanel, useControls, useCreateStore } from "leva";
import { FC, useEffect, useState } from "react";
import {
  ScriptNode as TScriptNode,
  ScriptNodeValues,
} from "../../audioNodes/scriptNode";
import { CodeEditor } from "../../levaPlugins";

interface ScriptNodeData {
  label: string;
  values?: ScriptNodeValues;
}

const ErrorWrapper = styled.div<{ theme: Theme }>`
  font-family: var(--leva-fonts-mono);
  padding: 1rem;
  display: flex;
  color: ${({ theme }) => theme.colors.error};
`;

const ScriptNode: FC<WNNodeProps<ScriptNodeData>> = ({ data, id }) => {
  const theme = useTheme();

  const { node } = useAudioNode<TScriptNode>(id);
  const { updateNodeValues } = useNode(id);

  const { expression = "" } = data.values || {};

  const store = useCreateStore();

  const values = useControls(
    {
      expression: CodeEditor(expression),
      set: button((get) => updateNodeValues({ expression: get("expression") })),
    },
    { store },
    [node, updateNodeValues]
  );

  useEffect(() => {
    node?.setValues({ expression });
  }, [expression, node]);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    node?.onMessage((data) => {
      const { name } = data;
      switch (name) {
        case "error":
          setError(data.error.toString());
          break;
        case "clean-error":
          setError(null);
          break;
      }
    });
  }, [node]);

  return (
    <WNNode id={id}>
      <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
      {error && <ErrorWrapper theme={theme}>{error}</ErrorWrapper>}
    </WNNode>
  );
};

export default ScriptNode;
