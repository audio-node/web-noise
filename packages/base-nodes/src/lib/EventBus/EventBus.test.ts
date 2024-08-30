import EventBus from ".";

describe("EventBus", () => {
  let eventBus: EventBus;

  beforeEach(() => {
    eventBus = new EventBus();
  });

  it("should trigger an event and call the appropriate callback", () => {
    const mockCallback = jest.fn();
    eventBus.addEventListener("testEvent", mockCallback);

    eventBus.trigger("testEvent", "arg1", "arg2");

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith("arg1", "arg2");
  });

  it("should not throw an error if triggering a non-existent event", () => {
    console.warn = jest.fn(); // Mock console.warn to avoid actual warning

    eventBus.trigger("nonExistentEvent");

    expect(console.warn).toHaveBeenCalledWith("nonExistentEvent not found!");
  });

  it("should allow multiple listeners for the same event", () => {
    const mockCallback1 = jest.fn();
    const mockCallback2 = jest.fn();
    eventBus.addEventListener("testEvent", mockCallback1);
    eventBus.addEventListener("testEvent", mockCallback2);

    eventBus.trigger("testEvent", "arg1");

    expect(mockCallback1).toHaveBeenCalledWith("arg1");
    expect(mockCallback2).toHaveBeenCalledWith("arg1");
  });

  it("should return an unsubscribe function that works", () => {
    const mockCallback = jest.fn();
    const unSubscribe = eventBus.addEventListener("testEvent", mockCallback);

    eventBus.trigger("testEvent", "arg1");
    expect(mockCallback).toHaveBeenCalledTimes(1);

    unSubscribe();

    eventBus.trigger("testEvent", "arg2");
    expect(mockCallback).toHaveBeenCalledTimes(1); // Should not be called again
  });

  it("should remove event completely if all listeners are unsubscribed", () => {
    const mockCallback = jest.fn();
    const unSubscribe = eventBus.addEventListener("testEvent", mockCallback);

    unSubscribe();

    expect(eventBus.eventObject["testEvent"]).toBeUndefined();
  });

  it("should handle multiple unsubscribes correctly", () => {
    const mockCallback1 = jest.fn();
    const mockCallback2 = jest.fn();
    const unSubscribe1 = eventBus.addEventListener("testEvent", mockCallback1);
    const unSubscribe2 = eventBus.addEventListener("testEvent", mockCallback2);

    unSubscribe1();
    eventBus.trigger("testEvent", "arg1");

    expect(mockCallback1).not.toHaveBeenCalled();
    expect(mockCallback2).toHaveBeenCalledWith("arg1");

    unSubscribe2();
    expect(eventBus.eventObject["testEvent"]).toBeUndefined();
  });
});
