import { FC, useState, useEffect, useCallback, useRef } from "react";
import styled from "@emotion/styled";
import { LEVA_COLORS } from "../styles/consts";
import { useViewport } from "react-flow-renderer";

interface ContextMenuProps {
  nodeTypes: any;
  onMenuItem: (node: string, nodePosition: MousePosition) => void;
  onClearEditor?: () => void;
}

type MousePosition = {
  x: number;
  y: number;
};

const ContextMenu: FC<ContextMenuProps> = ({
  nodeTypes,
  onMenuItem,
  onClearEditor,
}) => {
  const [isOpen, setisOpen] = useState(false);
  const { x, y, zoom } = useViewport();
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const menuWrapper = useRef(null);

  const onContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    setMousePosition({ x: e.clientX, y: e.clientY });
    setisOpen(true);
  };

  const onClick = (e: MouseEvent) => {
    if (e.target !== menuWrapper.current) {
      setisOpen(false);
    }
  };

  const onKeyUp = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setisOpen(false);
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
    (node: string) => {
      onMenuItem(node, { x, y });
      setisOpen(false);
    },
    [onMenuItem]
  );

  return (
    <>
      {isOpen ? (
        <MenuWrapper
          className="context-menu__wrapper"
          mousePosition={mousePosition}
          ref={menuWrapper}
        >
          <ul>
            {Object.keys(nodeTypes).map((node, idx) => (
              <li onClick={() => onMenuItemClick(node)} key={idx}>
                {node}
              </li>
            ))}
          </ul>
          <ul>
            <li onClick={onClearEditor}>clear editor</li>
          </ul>
        </MenuWrapper>
      ) : null}
    </>
  );
};

const MenuWrapper = styled.div<{ mousePosition: MousePosition }>`
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
      color: ${LEVA_COLORS.accent2};
      cursor: pointer;
      background: rgb(0 0 0 / 32%);
    }
  }
`;

export default ContextMenu;
