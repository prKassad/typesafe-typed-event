import { TypedEvent } from "./typed-event";

interface IEventData {
  foo: string;
  bar: number;
}

const mockData = { foo: "foo", bar: 12345 };

describe("TypedEvent", () => {
  it("Should exist", () => {
    expect(TypedEvent).toBeTruthy();
  });

  test("Should construct", () => {
    expect(new TypedEvent()).toBeInstanceOf(TypedEvent);
  });

  test("Should receive event in registered handlers", () => {
    const event = new TypedEvent<IEventData>();

    const handler = jest.fn((data: IEventData) => {
      expect(data).toStrictEqual(mockData);
    });
    event.register(handler);

    const handler2 = jest.fn((data: IEventData) => {
      expect(data).toStrictEqual(mockData);
    });
    event.register(handler2);

    event.emit(mockData);
    expect(handler).toBeCalled();
    expect(handler2).toBeCalled();
  });

  test("Should unregister handler", () => {
    const event = new TypedEvent<IEventData>();

    const handler = jest.fn();
    event.register(handler);
    event.unregister(handler);

    event.emit(mockData);
    expect(handler).not.toBeCalled();
  });

  test("Should unregister not registred handler", () => {
    const event = new TypedEvent<IEventData>();

    const handler = jest.fn();
    event.unregister(handler);

    event.emit(mockData);
    expect(handler).not.toBeCalled();
  });

  test("Should unregister handler using dispose", () => {
    const event = new TypedEvent<IEventData>();

    const handler = jest.fn();
    event.register(handler).dispose();

    event.emit(mockData);
    expect(handler).not.toBeCalled();
  });
});
