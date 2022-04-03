import { FC, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { LEVA_COLORS } from "../styles/consts";

interface ContextMenuProps {
  nodeTypes: any;
  onMenuItem: (node: string) => void;
}

type MousePosition = {
  x: number;
  y: number;
};

const ContextMenu: FC<ContextMenuProps> = ({ nodeTypes, onMenuItem }) => {
  const [isOpen, setisOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  const onMouseClick = (e: MouseEvent) => {
    e.preventDefault();
    setMousePosition({ x: e.clientX, y: e.clientY });
    setisOpen(true);
  };

  const onKeyUp = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setisOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("contextmenu", onMouseClick);
    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("contextmenu", onMouseClick);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return (
    <>
      {isOpen ? (
        <MenuWrapper mousePosition={mousePosition}>
          <ul>
            {Object.keys(nodeTypes).map((node, idx) => (
              <li onClick={() => onMenuItem(node)} key={idx}>
                {node}
              </li>
            ))}
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
  background: ${LEVA_COLORS.elevation2};
  color: white;
  padding: 14px 20px;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    padding: 2px 0;
    &:hover {
      color: ${LEVA_COLORS.accent2};
      cursor: pointer;
    }
  }
`;

export default ContextMenu;
