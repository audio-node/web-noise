import { WNNodeProps, WNNodeData } from "@web-noise/core";

export enum ADSRParameters {
  A = "attack",
  AttackCurve = "attackCurve",
  D = "decay",
  S = "sustain",
  R = "release",
  Trigger = "trigger",
}

export enum PHASES {
  IDLE = "idle",
  ATTACK = "attack",
  DECAY = "decay",
  SUSTAIN = "sustain",
  RELEASE = "release",
}

export interface ADSREventData {
  attack: number;
  attackCurve: number;
  decay: number;
  sustain: number;
  release: number;
  phase: PHASES;
}

export enum WorkerEventNames {
  INIT = 'INIT',
  SET_COLORS = 'SET_COLORS'
}

export interface InitEvent {
  name: WorkerEventNames.INIT;
  canvas: OffscreenCanvas;
  port: MessagePort;
}

export interface ADSRColors {
  attack: string;
  decay: string;
  sustain: string;
  release: string;
}

export interface SetColorsEvent {
  name: WorkerEventNames.SET_COLORS;
  colors: ADSRColors;
}

export interface ADSRValues {}

export interface ADSRConfig {
  backgroundColor?: string;
  colors?: ADSRColors;
  size?: { width: number; height: number };
}

export type ADSRData = WNNodeData<ADSRValues, ADSRConfig>;

export interface ADSRProps extends WNNodeProps<ADSRData> {}
