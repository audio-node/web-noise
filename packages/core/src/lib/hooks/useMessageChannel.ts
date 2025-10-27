import { useEffect, useState } from "react";

export const useMessageChannel = () => {
  const [channel, setChannel] = useState<MessageChannel | null>(null);
  useEffect(() => {
    const newChannel = new MessageChannel();
    newChannel.port2.start();
    setChannel(newChannel);
    return () => {
      setChannel(null);
      newChannel.port2.close();
    };
  }, []);
  return channel;
};

export default useMessageChannel;
