import styled from "@emotion/styled";
import { Item, Menu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import { Theme } from "../../theme";


export const ItemWrapper = styled(Item)``;

export const MenuWrapper = styled(Menu)<{ colors: Theme["colors"] }>`
  background: ${({ colors }) => colors.elevation2};
  padding: 0;
  border-radius: 0;

  .react-contexify__item__content {
    color: ${({ colors }) => colors.whitePrimary};
  }

  .react-contexify__separator {
    background-color: ${({ colors }) => colors.elevation1};
    margin: 0;
  }
`;
