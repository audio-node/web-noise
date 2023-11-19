import { WNEdge, WNNode } from "../../types";

export type GraphItems = Array<WNNode | WNEdge>;

export interface GraphComparisonResult {
  added: GraphItems;
  removed: GraphItems;
}

export const compareGraphs = (
  left: GraphItems,
  right: GraphItems,
): GraphComparisonResult => {
  const setLeft = new Set(left.map((item) => item.id));
  const setRight = new Set(right.map((item) => item.id));

  const added = right.filter((item) => !setLeft.has(item.id));
  const removed = left.filter((item) => !setRight.has(item.id));

  return { added, removed };
};
