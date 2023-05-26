const TRIGGER_THRESHOLD = 0.5;

const createUseTrigger = ({ threshold = 0.5 }) => {
  let isTriggered = false;
  return ({
    channel,
    onTriggered,
    onUntriggered,
  }: {
    channel: Float32Array;
    onTriggered?: () => void;
    onUntriggered?: () => void;
  }) => {
    for (let i = 0; i < channel.length; i++) {
      const value = channel[i];
      if (value >= threshold && !isTriggered) {
        isTriggered = true;
        onTriggered?.();
      }
      if (value < threshold && isTriggered) {
        isTriggered = false;
        onUntriggered?.();
      }
    }
  };
};

export class TriggerWatcherProcessor extends AudioWorkletProcessor {
  useTrigger = createUseTrigger({ threshold: TRIGGER_THRESHOLD });

  process(inputs: Float32Array[][]) {
    const [input] = inputs;
    const channel = input[0];
    channel &&
      this.useTrigger({
        channel,
        onTriggered: () => this.port.postMessage({ name: "triggered" }),
        onUntriggered: () => this.port.postMessage({ name: "untriggered" }),
      });
    return true;
  }
}

//@ts-ignore
registerProcessor("trigger-watcher-processor", TriggerWatcherProcessor);
