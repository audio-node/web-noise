import { create } from "zustand";
import { HistoryState, historyStateCreator } from "./";

describe("push", () => {
  const { getState, setState } = create(historyStateCreator);
  const { history } = getState();

  it("should push changes to history buffer", async () => {
    const node = { id: "test" };
    const changes = [node];
    history.push(changes);

    expect(getState().history.buffer).toEqual([changes]);
    expect(getState().history.pointer).toEqual(1);
  });

  it("should push changes to history buffer and trim first buffer element when buffer is full", async () => {
    const node = { id: "test" };
    const node2 = { id: "test2" };
    const node3 = { id: "test3" };

    const bufferStateMock = [
      [node],
      [],
      [node2],
    ] as HistoryState["history"]["buffer"];

    setState({
      history: {
        ...history,
        buffer: bufferStateMock,
        maxHistoryLength: 3,
        pointer: 3,
      },
    });

    const changes = [node3];
    history.push(changes);

    expect(getState().history.buffer).toEqual([
      bufferStateMock[1],
      bufferStateMock[2],
      changes,
    ]);
    expect(getState().history.pointer).toEqual(3);
  });

  it("should push changes to history buffer and trim elements after pointer when is back in history", async () => {
    const node = { id: "test" };
    const node2 = { id: "test2" };
    const node3 = { id: "test3" };

    const bufferStateMock = [
      [node],
      [],
      [node2],
    ] as HistoryState["history"]["buffer"];

    setState({
      history: {
        ...history,
        buffer: bufferStateMock,
        maxHistoryLength: 3,
        pointer: 2,
      },
    });

    const changes = [node3];
    history.push(changes);

    expect(getState().history.buffer).toEqual([
      bufferStateMock[0],
      bufferStateMock[1],
      changes,
    ]);
  });
});
