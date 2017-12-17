
export class Chain {
  constructor(value) {
    Object.defineProperty(this, 'value', {
      enumerable: true,
      value,
    });
  }

  map(func) {
    return new Chain(func(this.value));
  }

  do(func) {
    func(this.value);
  }
}

export default Chain;
