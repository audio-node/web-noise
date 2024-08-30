export default class EventBus {
  eventObject: Record<string, any> = {};
  callbackId = 0;

  trigger(eventName: string, ...args: Array<unknown>) {
    const callbackObject = this.eventObject[eventName];

    if (!callbackObject) return console.warn(eventName + " not found!");

    for (let id in callbackObject) {
      callbackObject[id](...args);
    }
  }

  addEventListener<T>(
    eventName: string,
    callback: (...args: Array<T>) => void,
  ) {
    if (!this.eventObject[eventName]) {
      this.eventObject[eventName] = {};
    }

    const id = this.callbackId++;

    this.eventObject[eventName][id] = callback;

    const unSubscribe = () => {
      delete this.eventObject[eventName][id];

      if (Object.keys(this.eventObject[eventName]).length === 0) {
        delete this.eventObject[eventName];
      }
    };

    return unSubscribe;
  }
}
