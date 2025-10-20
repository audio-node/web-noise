import styled from "@emotion/styled";
import {
  Theme,
  useAudioNode,
  useStore,
  useTheme,
  useNode,
  WNNode,
  WNNodeProps,
  isPatch,
} from "@web-noise/core";
import { useCallback, useMemo } from "react";
// @ts-ignore
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import { DropdownInput } from "@web-noise/core/components";
import PanelNode from "./PanelNode";
import { Patch as TPatch } from "./patchAudioNode";
import { PatchData } from "./types";

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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Patch = (props: WNNodeProps<PatchData>) => {
  const { id, data } = props;
  const { url } = data.values || {};
  const theme = useTheme();

  const createNode = useStore((store) => store.createNode);
  const removeNode = useStore((store) => store.removeNode);
  const getNode = useStore((store) => store.getNode);

  const projectFiles = useStore((store) => store.project.files);
  const currentFileIndex = useStore((store) => store.currentFileIndex);

  const { updateNodeValues } = useNode(id);

  const { node: audioNode } = useAudioNode<TPatch>(id) || {};
  const patchData = audioNode?.patchData;
  const controlPanelNodes = patchData?.controlPanel?.nodes;
  const width = patchData?.controlPanel?.size?.width ?? 200;
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
    (url: string) => {
      const node = getNode(id);
      if (!node) {
        console.error(`could not find node: #${id}`);
        return;
      }
      removeNode(node);
      createNode({
        ...node,
        id: `${node.type}-${+new Date()}`,
        data: { ...node.data, values: { url } },
      });
    },
    [createNode, removeNode, id, getNode],
  );

  return (
    <WNNode {...props}>
      {typeof url === "undefined" ? (
        <NodeWrapper theme={theme}>
          <DropdownInput
            placeholder="patch url"
            onSubmit={setPatchUrl}
            options={projectFiles
              .filter(
                (file, index) => index !== currentFileIndex && isPatch(file),
              )
              .map(({ id, name }) => ({
                value: `project://${id}`,
                label: name,
              }))}
          />
        </NodeWrapper>
      ) : null}
      {controlPanelNodes ? (
        <div style={{ width: `${width + 1}px` }}>
          {/* @ts-ignore */}
          <GridLayout
            layout={controlPanelNodes.map(
              ({ id: i, width, height, x, y }, index) => ({
                i,
                w: width || 4,
                h: height || 6,
                x: x || 0,
                y: y || controlPanelNodes.length + index,
              }),
            )}
            className="layout"
            cols={4}
            rowHeight={10}
            width={width}
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
                  <PanelNodeTitle theme={theme}>
                    {node.data.label}
                  </PanelNodeTitle>
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
        </div>
      ) : null}
    </WNNode>
  );
};

export default Patch;
