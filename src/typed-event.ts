import { IDisposable, IHandler, ITypedEvent } from "./typed-event.interface";

export class TypedEvent<T> implements ITypedEvent<T> {
  protected _handlers: IHandler<T>[] = [];

  register = (handler: IHandler<T>): IDisposable => {
    this._handlers.push(handler);
    return {
      dispose: (): void => this.unregister(handler),
    };
  };

  unregister = (handler: IHandler<T>): void => {
    const handlerIndex = this._handlers.indexOf(handler);
    if (handlerIndex > -1) this._handlers.splice(handlerIndex, 1);
  };

  emit = (event: T): void => {
    this._handlers.forEach((handler) => handler(event));
  };
}
