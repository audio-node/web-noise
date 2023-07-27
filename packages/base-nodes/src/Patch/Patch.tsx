import styled from "@emotion/styled";
import {
  Theme,
  useAudioNode,
  useStore,
  useTheme,
  useNode,
  WNNode,
  TWNNode,
  WNNodeProps,
} from "@web-noise/core";
import { FC, useCallback, useMemo } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import Input from "../components/SubmitInput";
import PanelNode from "./PanelNode";
import { Patch as TPatch } from "./patchAudioNode";

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

interface PatchData {
  values?: {
    url?: string;
    nodes?: Record<TWNNode["id"], unknown>;
  };
}

const Patch: FC<WNNodeProps<PatchData>> = (props) => {
  const { id, data } = props;
  const { url } = data.values || {};
  const theme = useTheme();

  const createNode = useStore((store) => store.createNode);
  const removeNode = useStore((store) => store.removeNode);
  const getNode = useStore((store) => store.getNode);

  const { updateNodeValues } = useNode(id);

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
              w: width || 4,
              h: height || 6,
              x: x || 0,
              y: y || controlPanelNodes.length + index,
            })
          )}
          className="layout"
          cols={4}
          rowHeight={10}
          width={153}
          margin={[0, 0]}
          isResizable={false}
          isDraggable={false}
        >
          {filteredNodes.map((node) => {
            const nodeValues = data.values?.nodes?.[node.id];
            const extendedNode = {
              ...node,
              data: {
                ...node.data,
                values: {
                  ...node.data.values,
                  ...(nodeValues || {}),
                },
              },
            };
            return (
              <PanelNodeWrapper theme={theme} key={node.id}>
                <PanelNodeTitle theme={theme}>{node.data.label}</PanelNodeTitle>
                <PanelNode
                  node={extendedNode}
                  audioNode={audioNode?.audioNodes.get(node.id)?.node}
                  updateNodeValues={(values) => {
                    updateNodeValues({
                      ...data.values,
                      nodes: {
                        ...data.values?.nodes,
                        [node.id]: values,
                      },
                    });
                  }}
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
