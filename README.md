# typesafe-typed-event

Implements Observer pattern that support statically analyze event types in [TypeScript](https://www.typescriptlang.org/).

## Purpose

Using Observer pattern in distributed event handling systems is good practice. In the JavaScript community its most common implementation is EventEmitter. However using the EventEmitter in TypeScript you lose out robust type checking when publishing and subscribing to events.

Instead, for the sake of event type safety, we can create an emitter per event type:

```ts
const onFoo = new TypedEvent<Foo>();
const onBar = new TypedEvent<Bar>();

// Emit:
onFoo.emit(foo);
onBar.emit(bar);

// Listen:
onFoo.register((foo) => console.log(foo));
onBar.register((bar) => console.log(bar));
```

This has the following advantages:

- The types of events are easily discoverable as variables.
- The event emitter variables are easily refactored independently.
- Type safety for event data structures.

And this package implements the above idea.

## Install

This package is published in the NPM registry and can be installed using any compatible package manager:

```sh
# using npm
npm install typesafe-typed-event

# using Yarn
yarn add typesafe-typed-event
```

## Usage

Subscribing and publishing event:

```ts
import { TypedEvent } from "typesafe-typed-event";

// define event type structure
interface IEventData {
  foo: string;
  bar: number;
}

// create instance of TypedEvent
const event = new TypedEvent<IEventData>();

// register event handler for listening events
event.register((data) => {
  console.log(data);
});

// publish event
event.emit({ foo: "foo", bar: 12345 });
```

To unregister event handler, you can use:

```ts
event.unregister(handler);
```

Or:

```ts
handler.dispose();
```

## License

Released under [MIT License](./LICENSE).
