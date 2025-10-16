import type { WNNodeData, WNAudioNode } from "@web-noise/core";
import { PortType } from "@web-noise/core/constants";
import { SelectValues, SelectConfig, SelectData } from "./types";

export interface Select extends WNAudioNode {
  setValues: (values?: SelectValues) => void;
  setConfig: (config?: SelectConfig) => void;
}

export const select = async (
  audioContext: AudioContext,
  data?: SelectData,
): Promise<Select> => {
  let currentOptions = data?.config?.options;
  let currentValue = data?.values?.value;

  const constantSource = audioContext.createConstantSource();
  constantSource.start();

  const updateValue = () => {
    constantSource.offset.value = 0;

    if (!currentOptions) {
      return;
    }

    const { value } =
      currentOptions.find(({ key }) => key === currentValue) || {};

    if (typeof value === "undefined") {
      return;
    }

    constantSource.offset.value = value;
  };

  updateValue();

  return {
    outputs: {
      out: {
        port: constantSource,
        type: PortType.Number,
        range: [constantSource.offset.minValue, constantSource.offset.maxValue],
        defaultValue: constantSource.offset.value,
      },
    },
    setValues: ({ value } = {}) => {
      if (typeof value !== "undefined") {
        currentValue = value;
        updateValue();
      }
    },
    setConfig: ({ options } = {}) => {
      if (typeof options !== "undefined") {
        currentOptions = options;
        updateValue();
      }
    },
  };
};

export default select;
