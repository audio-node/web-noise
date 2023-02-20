import styled from "@emotion/styled";
import {
  Theme,
  useStore,
  useTheme,
  useAudioNode,
  WNNode,
  TWNNode,
  WNAudioNode,
  WNNodeProps,
  ControlPanelNodeProps,
  EditorState,
} from "@web-noise/core";
import { FC, useCallback, useMemo } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import Input from "../components/Input";
import { Patch as TPatch } from "./patchAudioNode";

const PanelNode: FC<ControlPanelNodeProps> = (props) => {
  const { node, audioNode } = props;

  const getControlPanelNode = useStore((store) => store.getControlPanelNode);

  const ControlPanelNode = useMemo(() => getControlPanelNode(node), [node]);

  if (!ControlPanelNode) {
    return null;
  }

  return (
    <ControlPanelNode {...props} updateNodeValues={audioNode?.setValues} />
  );
};

interface PatchData {
  values?: {
    url?: string;
  };
}

const NodeWrapper = styled.div<{ theme: Theme }>`
  background-color: ${({ theme }) => theme.colors.elevation2};
  padding: 2% 3%;
`;

const PanelNodeWrapper = styled.div<{ theme: Theme }>`
  background-color: ${({ theme }) => theme.colors.elevation2};
  display: grid;
  grid-template-rows: max-content auto;
`;

const PanelNodeTitle = styled.div<{ theme: Theme }>`
  color: ${({ theme }) => theme.colors.highlight2};
  font-family: var(--leva-fonts-mono);
  font-size: var(--leva-fontSizes-root);
  margin-left: 0.5rem;
  margin-top: 0.3rem;
`;

const Patch: FC<WNNodeProps<PatchData>> = (props) => {
  const { id, data } = props;
  const { url } = data.values || {};
  const theme = useTheme();

  const createNode = useStore((store) => store.createNode);
  const removeNode = useStore((store) => store.removeNode);
  const getNode = useStore((store) => store.getNode);

  const { node: audioNode } = useAudioNode<TPatch>(id) || {};
  const patchData = audioNode?.patch;
  const controlPanelNodes = patchData?.controlPanel?.nodes;
  const filteredNodes = useMemo(() => {
    const controlPanel = patchData?.controlPanel;
    const patchNodes = patchData?.nodes;
    if (!controlPanel || !patchNodes) {
      return [];
    }
    const nodeIds = controlPanel.nodes.map(({ id }) => id);
    return patchNodes.filter(({ id }) => nodeIds.includes(id));
  }, [patchData]);

  const setPatchUrl = useCallback(
    (url) => {
      const node = getNode(id);
      if (!node) {
        console.error(`could not find node: #${id}`);
        return;
      }
      createNode({
        ...node,
        id: `${node.type}-${+new Date()}`,
        data: { ...node.data, values: { url } },
      });
      removeNode(node);
    },
    [createNode, removeNode, id, getNode]
  );

  return (
    <WNNode {...props}>
      {typeof url === "undefined" ? (
        <NodeWrapper theme={theme}>
          <Input placeholder="patch url" onSubmit={setPatchUrl} />
        </NodeWrapper>
      ) : null}
      {controlPanelNodes ? (
        <GridLayout
          layout={controlPanelNodes.map(
            ({ id: i, width, height, x, y }, index) => ({
              i,
              w: width || 1,
              h: height || 55,
              x: x || 0,
              y: y || controlPanelNodes.length + index,
            })
          )}
          className="layout"
          cols={1}
          rowHeight={1}
          width={172}
          margin={[0, 0]}
          isResizable={false}
          isDraggable={false}
        >
          {filteredNodes.map((node) => {
            return (
              <PanelNodeWrapper theme={theme} key={node.id}>
                <PanelNodeTitle theme={theme}>{node.data.label}</PanelNodeTitle>
                <PanelNode
                  node={node}
                  audioNode={audioNode?.audioNodes.get(node.id)?.node}
                />
              </PanelNodeWrapper>
            );
          })}
        </GridLayout>
      ) : null}
    </WNNode>
  );
};

export default Patch;
