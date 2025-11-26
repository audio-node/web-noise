import styled from "@emotion/styled";
import { MouseEvent, useCallback, useState } from "react";
import { Position, useReactFlow } from "@xyflow/react";
import useTheme from "../../hooks/useTheme";
import useStore from "../../store";
import { Theme } from "../../theme";
import { PluginComponent } from "../../types";
import Modal from "../Modal";
import Filters, { FiltersState } from "./Filters";
import Plugins from "./Plugins";

interface AddNodeProps {
  isOpen: boolean;
  closeMenu: () => void;
  mousePosition: MousePosition;
}

type MousePosition = {
  x: number;
  y: number;
};

const AddNodeWrapper = styled.div<{ theme: Theme }>`
  height: 100%;
  width: 100%;
  display: flex;
  gap: 1rem;
`;

const PluginsPanel = styled.div<{ theme: Theme }>`
  flex-grow: 1;
  height: 100%;
  overflow-y: scroll;
`;

const AddNode = ({ isOpen, closeMenu, mousePosition }: AddNodeProps) => {
  const theme = useTheme();
  const { screenToFlowPosition } = useReactFlow();

  const { createNode } = useStore(({ createNode }) => ({
    createNode,
  }));

  const [filtersState, setFiltersState] = useState<FiltersState>({});

  const onComponentClick = useCallback(
    ({ type, minSize }: PluginComponent) => {
      const { x, y } = screenToFlowPosition(mousePosition);
      const newNode = {
        //@TODO: generate node id in `createNode` function
        id: `${type}-${+new Date()}`,
        type,
        data: { label: type },
        position: {
          x,
          y,
        },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
        ...minSize,
      };
      createNode(newNode);
      closeMenu();
    },
    [mousePosition, screenToFlowPosition, createNode, closeMenu, mousePosition],
  );

  return isOpen ? (
    <Modal
      onClose={() => {
        closeMenu();
        setFiltersState({});
      }}
    >
      <AddNodeWrapper theme={theme}>
        <Filters onChange={setFiltersState} value={filtersState} />
        <PluginsPanel theme={theme}>
          <Plugins
            filters={filtersState}
            onTagClick={(tag) => {
              setFiltersState((state) => ({
                ...state,
                tags: state.tags?.includes(tag)
                  ? state.tags.filter((t) => t !== tag)
                  : [...(state.tags || []), tag],
              }));
            }}
            onComponentClick={(component) => {
              onComponentClick(component);
              setFiltersState({});
            }}
          />
        </PluginsPanel>
      </AddNodeWrapper>
    </Modal>
  ) : null;
};

export default AddNode;
