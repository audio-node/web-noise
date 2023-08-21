import styled from "@emotion/styled";
import { marked } from "marked";
import { WNNodeProps } from "@web-noise/core";
import { StickerData } from "./types";

const MdPreview = styled.div<{ backgroundColor?: string; textColor?: string }>`
  font-size: 0.7rem;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  overflow: scroll;
  color: ${({ textColor }) => textColor};
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 0 0.5rem;
`;

export interface StickerProps {
  node: WNNodeProps<StickerData>;
}

const Sticker = ({ node: props }: StickerProps) => {
  const { data } = props;
  const { text = "*Double click to edit*" } = data.values || {};
  const { transparentBackground, backgroundColor, textColor } =
    data.config || {};

  return (
    <MdPreview
      backgroundColor={transparentBackground ? "none" : backgroundColor}
      textColor={textColor}
      dangerouslySetInnerHTML={{ __html: marked(text) }}
      onWheelCapture={(event) => event.stopPropagation()}
    ></MdPreview>
  );
};

export default Sticker;
