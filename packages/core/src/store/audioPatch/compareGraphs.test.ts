import {
  compareGraphs,
  GraphComparisonResult,
  GraphItems,
} from "./compareGraphs";

describe("compareGraphs", () => {
  it("should compare two arrays and return the added and removed items", () => {
    const graph1 = [{ id: "1" }, { id: "2" }] as GraphItems;
    const graph2 = [{ id: "1" }, { id: "3" }] as GraphItems;

    const result: GraphComparisonResult = compareGraphs(graph1, graph2);

    expect(result.added).toEqual([{ id: "3" }]);
    expect(result.removed).toEqual([{ id: "2" }]);
  });

  it("should handle empty arrays", () => {
    const result: GraphComparisonResult = compareGraphs([], []);

    expect(result.added).toEqual([]);
    expect(result.removed).toEqual([]);
  });

  it("should handle arrays with the same items", () => {
    const graph1 = [{ id: "1" }, { id: "2" }] as GraphItems;
    const graph2 = [{ id: "1" }, { id: "2" }] as GraphItems;

    const result: GraphComparisonResult = compareGraphs(graph1, graph2);

    expect(result.added).toEqual([]);
    expect(result.removed).toEqual([]);
  });

  it("should handle arrays with no common items", () => {
    const graph1 = [{ id: "1" }] as GraphItems;
    const graph2 = [{ id: "2" }] as GraphItems;

    const result: GraphComparisonResult = compareGraphs(graph1, graph2);

    expect(result.added).toEqual([{ id: "2" }]);
    expect(result.removed).toEqual([{ id: "1" }]);
  });
});
