import styled from "@emotion/styled";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useReactFlow, useViewport, Position } from "react-flow-renderer";
import { Theme } from "../theme";
import useTheme from "../hooks/useTheme";
import useStore from "../store";
import { DRAG_HANDLE_SELECTOR } from "../constants";

interface ContextMenuProps {
  nodeTypes: any;
}

type MousePosition = {
  x: number;
  y: number;
};

const ContextMenu: FC<ContextMenuProps> = ({ nodeTypes }) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const { x, y, zoom } = useViewport();
  const { project } = useReactFlow();
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const menuWrapper = useRef(null);

  const { clearElements, addNode } = useStore();

  const onContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    setMousePosition({ x: e.clientX, y: e.clientY });
    setIsOpen(true);
  };

  const onClick = (e: MouseEvent) => {
    if (e.target !== menuWrapper.current) {
      setIsOpen(false);
    }
  };

  const onKeyUp = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("click", onClick);
    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("click", onClick);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  const onMenuItemClick = useCallback(
    (nodeType: string) => {
      const { x, y } = project(mousePosition);
      const newNode = {
        id: `${nodeType}-${+new Date()}`,
        type: nodeType,
        data: { label: nodeType },
        position: {
          x,
          y,
        },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
        dragHandle: DRAG_HANDLE_SELECTOR,
      };
      addNode(newNode);
      setIsOpen(false);
    },
    [mousePosition, project, addNode]
  );

  return (
    <>
      {isOpen ? (
        <MenuWrapper
          className="context-menu__wrapper"
          mousePosition={mousePosition}
          ref={menuWrapper}
          theme={theme}
        >
          <ul>
            {Object.keys(nodeTypes).map((node, idx) => (
              <li onClick={() => onMenuItemClick(node)} key={idx}>
                {node}
              </li>
            ))}
          </ul>
          <ul>
            <li onClick={clearElements}>clear editor</li>
          </ul>
        </MenuWrapper>
      ) : null}
    </>
  );
};

const MenuWrapper = styled.div<{ mousePosition: MousePosition; theme: Theme }>`
  position: absolute;
  top: ${({ mousePosition }) => mousePosition.y}px;
  left: ${({ mousePosition }) => mousePosition.x}px;
  z-index: 10;
  background: rgb(24 28 32 / 78%);
  color: white;
  padding: 14px 20px;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    border-bottom: 1px solid rgb(255 255 255 / 34%);
    margin-bottom: 10px;
    padding-bottom: 10px;
    columns: 2;
  }

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

export default ContextMenu;
