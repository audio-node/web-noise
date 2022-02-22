import { useState, useEffect, useCallback } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  MiniMap,
  Controls,
  removeElements,
  addEdge,
  Elements,
  ReactFlowProvider,
} from "react-flow-renderer";
import {
  RecoilRoot,
  atom,
  constSelector,
  useRecoilState,
  useRecoilValue,
  selector,
  selectorFamily,
} from "recoil";
import MultiHandlesNode from "./MultiHandlesNode";
import Oscillator from "./components/Oscillator";
import Destination from "./components/Destination";
import Gain from "./components/Gain";
import Wire from "./components/Wire";
import Visualizer from "./components/Visualizer";
import WhiteNoise from "./components/WhiteNoise";
import Filter from "./components/Filter";
import Parameter from "./components/Parameter";
import { EditorContext, contextValue } from "./components/EditorContext";
import ResumeContext from "./components/ResumeContext";

import {
  filterExample,
  parameterExample,
  simpleExample,
} from "./editorExamples";

const initialElements: Elements = simpleExample;

export const audioContextAtom = atom({
  key: "audioContext",
  default: contextValue.audioContext,
});

export const audioContextSelector = selector({
  key: "audioContext",
  get: ({ get }) => {
    get(audioContextAtom);
  },
});

export const moduleAtom = atom<Record<string, any>>({
  key: "moduleState",
  default: {},
});

export const registerModule = selectorFamily({
  key: "registerModule",
  get:
    (field: string) =>
    ({ get }) => {
      return get(moduleAtom)[field];
    },
  set:
    (field: string) =>
    ({ set }, node) => {
      set(moduleAtom, (prevState) => ({ ...prevState, [field]: node }));
      console.log(`registered #${field}`);
    },
});

const nodeTypes = {
  multiHandlesNode: MultiHandlesNode,
  oscillator: Oscillator,
  gain: Gain,
  visualiser: Visualizer,
  destination: Destination,
  whiteNoise: WhiteNoise,
  filter: Filter,
  parameter: Parameter,
};

const edgeTypes = {
  wire: Wire,
};

const onNodeDragStop = (_event: any, node: any) =>
  console.log("drag stop", node);
const onElementClick = (_event: any, element: any) =>
  console.log("click", element);

const snapGrid: [number, number] = [20, 20];

export const Editor = () => {
  const [reactflowInstance, setReactflowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);

  const state = useRecoilValue(moduleAtom);
  console.log(555, state);

  useEffect(() => {
    setElements(elements);
  }, [elements]);

  useEffect(() => {
    if (reactflowInstance && elements.length > 0) {
      // @ts-ignore
      reactflowInstance.fitView();
    }
  }, [reactflowInstance, elements.length]);

  const onElementsRemove = useCallback(
    (elementsToRemove) =>
      // @ts-ignore
      setElements((els) => removeElements(elementsToRemove, els)),
    []
  );
  const onConnect = useCallback((params) => {
    setElements((els) => addEdge({ ...params, type: "wire" }, els));
  }, []);

  const onLoad = useCallback(
    (rfi) => {
      if (!reactflowInstance) {
        setReactflowInstance(rfi);
        console.log("flow loaded:", rfi);
      }
    },
    [reactflowInstance]
  );

  return (
    <EditorContext.Provider value={contextValue}>
      <ReactFlowProvider>
        <ReactFlow
          elements={elements}
          onElementClick={onElementClick}
          onElementsRemove={onElementsRemove}
          onConnect={onConnect}
          onNodeDragStop={onNodeDragStop}
          onLoad={onLoad}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          snapToGrid={true}
          snapGrid={snapGrid}
          defaultZoom={1.5}
        >
          <Background variant={BackgroundVariant.Dots} gap={12} />
          <MiniMap />
          <Controls>
            <ResumeContext />
          </Controls>
        </ReactFlow>
      </ReactFlowProvider>
    </EditorContext.Provider>
  );
};

export default Editor;
