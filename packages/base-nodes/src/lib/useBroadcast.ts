type PoolName = string | number;

type Broadcast = <T = unknown>(data: T, poolName?: PoolName) => void;

interface AddListenerEvent {
  name: "ADD_LISTENER";
  port: MessagePort;
  poolName?: string | number;
}

interface RemoveListenerEvent {
  name: "REMOVE_LISTENER";
  port: MessagePort;
  poolName?: string | number;
}

type UseBroadcastEvent = AddListenerEvent | RemoveListenerEvent;

const DEFAULT_POOL_NAME = "default";

export const useBroadcast = (port: MessagePort): Broadcast => {
  const listeners: Record<PoolName, Array<MessagePort>> = {
    [DEFAULT_POOL_NAME]: [],
  };
  port.addEventListener(
    "message",
    ({ data }: MessageEvent<UseBroadcastEvent>) => {
      if (data.name === "ADD_LISTENER") {
        const poolName = data.poolName ?? DEFAULT_POOL_NAME;
        if (!listeners[poolName]) {
          listeners[poolName] = [];
        }
        listeners[poolName].push(data.port);
      }
    }
  );

  return (data, index = DEFAULT_POOL_NAME) =>
    listeners[index]?.forEach((listener) => listener.postMessage(data));
};

export const addBroadcastListener = (
  broadcastPort: MessagePort,
  listenerPort: MessagePort,
  poolName?: PoolName
) => {
  broadcastPort.postMessage(
    {
      name: "ADD_LISTENER",
      port: listenerPort,
      poolName,
    },
    [listenerPort]
  );
};

export const removeBroadcastListener = (
  broadcastPort: MessagePort,
  listenerPort: MessagePort,
  poolName?: PoolName
) => {
  broadcastPort.postMessage(
    {
      name: "REMOVE_LISTENER",
      port: listenerPort,
      poolName,
    },
    [listenerPort]
  );
};
