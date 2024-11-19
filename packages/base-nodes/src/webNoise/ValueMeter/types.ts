import { WNNodeProps, WNNodeData } from "@web-noise/core";

export interface ValueMeterValues {
}

export interface ValueMeterConfig {
}

export type ValueMeterData = WNNodeData<ValueMeterValues, ValueMeterConfig>;

export interface ValueMeterProps extends WNNodeProps<ValueMeterData> { };
