export interface IHandler<T> {
  (event: T): void;
}

export interface IDisposable {
  dispose(): void;
}

export interface ITypedEvent<T> {
  register(handler: IHandler<T>): IDisposable;
  unregister(handler: IHandler<T>): void;
  emit(event: T): void;
}
