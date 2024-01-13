import { useMemo } from "react";

const useMessageChannel = () => {
  const channel = useMemo(() => {
    const channel = new MessageChannel();
    channel.port2.start();
    return channel;
  }, []);
  return channel;
};

export default useMessageChannel;
