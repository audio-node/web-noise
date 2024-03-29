import { injectGlobal } from "@emotion/css";
import theme from "./theme";

injectGlobal`
  .react-flow {
    .react-flow__pane {
    /* background: rgb(106 106 106); */
    /* background: "white"; */
    // background: #292d39;
      background: ${theme.colors.elevation3};
    }

    .react-flow__background {
      /* background: #efefef; */
      stroke: white;
    }

    .react-flow__node-default {
      background: #292d39;
      color: white;
      border: none;
      /* background: transparent; */
    }

    .react-flow__node {
      padding: 0;
      width: auto;
    }

    .react-flow__edge-path {
      stroke:  ${theme.colors.accent2};
    }

    .react-flow__node.selected {
      border: 1px solid ${theme.colors.accent2};
      box-shadow: 0 0 0 0.5px #${theme.colors.accent2};
    }

    .react-flow__node-default.selected, .react-flow__node-default.selected:hover {
      box-shadow: 0 0 0 0.5px #${theme.colors.accent2};
    }

    /* .react-flow__minimap-mask {
      fill: ${theme.colors.elevation1}
    }

    .react-flow__minimap-node {
      fill:${theme.colors.accent2}
    } */
  }

`;
