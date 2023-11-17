const LEVA_COLOR_ACCENT2_BLUE = "#007bff";
const COLOR_GREEN_PRIMARY = "#14df42";
const COLOR_WHITE_PRIMARY = "#ffffff";

const colors = <const>{
  elevation1: "#292d39", // bg color of the root panel (main title bar)
  elevation2: "#181c20", // bg color of the rows (main panel color)
  elevation3: "#373c4b", // bg color of the inputs
  accent1: "#0066dc",
  accent2: LEVA_COLOR_ACCENT2_BLUE,
  accent3: "#3c93ff",
  highlight1: "#535760",
  highlight2: "#8c92a4",
  highlight3: "#fefefe",
  vivid1: COLOR_GREEN_PRIMARY,
  whitePrimary: COLOR_WHITE_PRIMARY,
  error: "#db5353",
};

const zIndex = <const>{
  modal: 9998,
  controlPanel: 9999,
  resumeContextLayout: 10003,
};

const theme = {
  colors,
  zIndex,
};

export type Theme = typeof theme;

export default theme;
