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

export default createUseTrigger;
