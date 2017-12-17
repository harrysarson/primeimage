
export class Iterable {
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
    return new Iterable(function* generator() {
      for (const value of self) {
        if (predicate(value)) {
          yield value;
        }
      }
    });
  }
}

export default Iterable;
