import { WNNodeProps, WNNodeData } from "@web-noise/core";

export interface PassThroughValues {
  value?: number;
}

export interface PassThroughConfig {
  //your config here
}

export type PassThroughData = WNNodeData<PassThroughValues, PassThroughConfig>;

export interface PassThroughProps extends WNNodeProps<PassThroughData> {};
