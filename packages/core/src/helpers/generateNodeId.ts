import { WNNode } from "../types";

const generateNodeId = (node?: Partial<WNNode>): WNNode["id"] => {
  const random = +new Date() + Math.floor(Math.random() * 1000);
  if (!node?.type) {
    return random.toString();
  }
  return `${node.type}-${random}`;
};

export default generateNodeId;
