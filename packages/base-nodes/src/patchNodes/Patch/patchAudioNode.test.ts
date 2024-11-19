import { createPatch } from "@web-noise/patch";
import { patchNode, getPatchData } from "./patchAudioNode";
import type { PatchValues, PatchData } from "./types";

const registerAudioNodes = jest.fn();
const registerAudioConnections = jest.fn();

jest.mock("@web-noise/patch", () => ({
  createPatch: jest.fn(() => ({
    registerAudioNodes,
    registerAudioConnections,
    audioNodes: new Map(),
  })),
}));

const fetchResponse = jest.fn();

const mockFetch = jest.fn().mockResolvedValue({
  json: fetchResponse,
});
// @ts-ignore
global.fetch = mockFetch;

describe("getPatchData", () => {
  const patchData = {
    nodes: [
      {
        id: "test-parameter",
        type: "parameter",
        data: {
          label: "parameter",
          config: {},
        },
      },
    ],
    edges: [],
    controlPanel: {
      nodes: [],
    },
  };

  it("should return patch data if provided", async () => {
    const result = await getPatchData({
      patch: patchData,
    } as unknown as PatchValues);
    expect(result).toEqual(patchData);
  });

  it("should fetch patch data if URL is specified", async () => {
    fetchResponse.mockReturnValueOnce({});
    const url = "http://example.com/patch-data";
    await getPatchData({ url } as PatchValues);

    expect(mockFetch).toHaveBeenCalledWith(url);
  });

  it("should throw an error if patch URL is not specified", async () => {
    await expect(getPatchData({} as PatchValues)).rejects.toThrow(
      "patch url is not specified",
    );
  });
});

describe("patchNode", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const patchData = {
    nodes: [
      {
        id: "test-parameter",
        type: "parameter",
        data: {
          label: "parameter",
          config: {},
        },
      },
    ],
    edges: [],
    controlPanel: {
      nodes: [],
    },
  };

  it("should return an empty object if values are not provided", async () => {
    const result = await patchNode(new AudioContext());
    expect(result).toEqual({});
  });

  it("should create a patch and register nodes when values are provided", async () => {
    const mockAudioContext = new AudioContext();
    const mockValues = {
      patch: patchData,
    };

    const result = await patchNode(mockAudioContext, {
      values: mockValues,
    } as unknown as PatchData);

    expect(result).toHaveProperty("inputs");
    expect(result).toHaveProperty("outputs");
    expect(result).toHaveProperty("patchData");
    expect(result).toHaveProperty("audioNodes");
    expect(result).toHaveProperty("destroy");

    expect(createPatch).toHaveBeenCalledWith(mockAudioContext);
    expect(registerAudioNodes).toHaveBeenCalledWith(mockValues.patch.nodes);
    expect(registerAudioConnections).toHaveBeenCalledWith(
      mockValues.patch.edges,
    );
  });
});
