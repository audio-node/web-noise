export const createUseGate = ({ threshold = 0.5 }) => {
  let isGateOpen = false;
  return ({
    channel,
    onBeforeOpen,
    onOpen,
    onAfterClosed,
    onClosed,
  }: {
    channel: Float32Array;
    onOpen?: () => void;
    onClosed?: () => void;
    onBeforeOpen?: () => void;
    onAfterClosed?: () => void;
  }) => {
    for (let i = 0; i < channel.length; i++) {
      const value = channel[i];
      if (value >= threshold && !isGateOpen) {
        onBeforeOpen?.();
        isGateOpen = true;
      }
      if (value < threshold && isGateOpen) {
        onAfterClosed?.();
        isGateOpen = false;
      }
    }
    if (isGateOpen) {
      onOpen?.();
    } else {
      onClosed?.();
    }
  };
};
