export const DRAG_HANDLE_CLASS = "web-noise-drag-handle";
export const DRAG_HANDLE_SELECTOR = `.${DRAG_HANDLE_CLASS}`;

export const CONTROL_PANEL_GRID_CONFIG = {
  rowHeight: 10,
  cols: 4,
};

export enum PortType {
  Gate = "gate",
  Number = "number",
  Audio = "audio",
  Any = "any",
}

export const portColors = {
  [PortType.Audio]: "#4ade80", // vibrant green
  [PortType.Gate]: "#c084fc", // rich purple
  [PortType.Number]: "#38bdf8", // bright blue
  [PortType.Any]: "#ffffff", // white
};
