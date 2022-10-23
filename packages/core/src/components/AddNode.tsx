import styled from "@emotion/styled";
import { FC, MouseEvent, useCallback, useState } from "react";
import { Position, useReactFlow } from "react-flow-renderer";
import useTheme from "../hooks/useTheme";
import useStore from "../store";
import { Theme } from "../theme";
import Modal from "./Modal";

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
`;

const PluginWrapper = styled.div<{ theme: Theme }>`
  padding: 1rem;
`;

const NodesList = styled.ul<{ theme: Theme }>`
  list-style: none;
  margin: 0;
  padding: 0;
  padding-bottom: 10px;
  columns: 2;

  li {
    padding: 4px;
    &:hover {
      color: ${({ theme }) => {
        return theme.colors.accent2;
      }};
      cursor: pointer;
      background: rgb(0 0 0 / 32%);
    }
  }
`;

const PluginTitle = styled.div<{ theme: Theme }>`
  font-size: 1.1rem;
  padding: 0.25rem;
  color: ${({ theme }) => theme.colors.highlight2};
`;

const AddNode: FC<AddNodeProps> = ({ isOpen, closeMenu, mousePosition }) => {
  const theme = useTheme();
  const { project } = useReactFlow();

  const { createNode } = useStore(({ createNode }) => ({
    createNode,
  }));
  const plugins = useStore(({ plugins }) => plugins);

  const onMenuItemClick = useCallback(
    (nodeType: string) => {
      const { x, y } = project(mousePosition);
      const newNode = {
        //@TODO: generate node id in `createNode` function
        id: `${nodeType}-${+new Date()}`,
        type: nodeType,
        data: { label: nodeType },
        position: {
          x,
          y,
        },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
      };
      createNode(newNode);
      closeMenu();
    },
    [mousePosition, project, createNode, closeMenu, mousePosition]
  );

  return isOpen ? (
    <Modal onClose={closeMenu}>
      <AddNodeWrapper theme={theme}>
        {plugins.map(({ name, components }, index) => {
          return (
            <PluginWrapper key={index} theme={theme}>
              <PluginTitle theme={theme}>{name}</PluginTitle>
              <NodesList theme={theme}>
                {components
                  .sort((a, b) =>
                    a.type.toLowerCase() > b.type.toLowerCase() ? 1 : -1
                  )
                  .map(({ type }, idx) => (
                    <li onClick={() => onMenuItemClick(type)} key={idx}>
                      {type}
                    </li>
                  ))}
              </NodesList>
            </PluginWrapper>
          );
        })}
      </AddNodeWrapper>
    </Modal>
  ) : null;
};

export default AddNode;
