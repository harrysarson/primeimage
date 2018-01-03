function* emptyGenerator() {};


export class Iterable {
  constructor(generator) {
    Object.defineProperties(this, {
      generator: {
        configurable: true,
        value: generator != null
          ? generator
          : emptyGenerator,
      },
    });
  }

  [Symbol.iterator]() {
    return this.generator();
  }

  filter(predicate) {
    return Iterable.filter(predicate)(this);
  }

  pipe(...projects) {
    return projects.reduce((value, project) => project(value), this);
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
