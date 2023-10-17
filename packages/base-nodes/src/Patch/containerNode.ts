import type { EditorState, TWNNode } from "@web-noise/core";

const containerNode = async (node: TWNNode) => {
  if (typeof node.data?.values?.url !== "string") {
    return;
  }
  const data: EditorState = await fetch(node.data.values.url).then((r) =>
    r.json(),
  );

  //@TODO: validate data

  return data;
};

export default containerNode;
