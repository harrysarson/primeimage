
export default class Iterable {
  constructor(generator) {
    Object.defineProperties(this, {
      generator: {
        cofigurable: true,
        value: generator,
      },
    });
  }

  [Symbol.iterator]() {
    return this.generator();
  }

  filter(predicate) {
    const self = this;
    return new Iterable(function* () {
      for (const value of self) {
        if (predicate(value)) {
          yield value;
        }
      }
    });
  }
}