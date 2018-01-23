function* emptyGenerator() {
  // creates empty iterator
}


export class Iterable {
  constructor(generator = emptyGenerator) {
    Object.defineProperties(this, {
      generator: {
        configurable: true,
        value: generator,
      },
    });
  }

  [Symbol.iterator]() {
    return this.generator();
  }

}

export const filter = predicate => iterable =>
  new Iterable(function* filterGenerator() {
    for (const value of iterable) {
      if (predicate(value)) {
        yield value;
      }
    }
  });

export const map = project => iterable =>
  new Iterable(function* filterGenerator() {
    for (const value of iterable) {
      yield project(value);
    }
  });

export default Iterable;
