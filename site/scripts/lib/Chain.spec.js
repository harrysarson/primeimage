/* global describe it expect sinon */
import { Iterable, filter, map } from './Iterable.js';

describe('Iterable Class', () => {
  it('new Iterable() should create empty iterable', () => {
    expect(new Iterable()).to.iterate.for.lengthOf(0);
  });

  it('Iterable should iterate over correct values', () => {
    const arr = [123, 235, 568, 'hseih', { hi: 235 }, [345, 35, 34]];

    expect(new Iterable(function* yieldArray() { yield* arr; })).to.iterate.over(arr);
  });
});
