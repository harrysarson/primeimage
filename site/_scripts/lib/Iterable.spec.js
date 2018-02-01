/* global describe it expect */
import { Iterable, filter, map } from './Iterable.js';

describe('Iterable Class', () => {
  it('new Iterable() should create empty iterable', () => {
    expect([...new Iterable()]).to.be.empty;
  });

  it('Iterable should iterate over correct values', () => {
    const arr = [123, 235, 568, 'hseih', { hi: 235 }, [345, 35, 34]];

    expect([...new Iterable(function* yieldArray() { yield* arr; })]).to.deep.equal(arr);
  });
});

describe('Iterable functions', () => {
  const arr = new Array(100).fill(0).map((value, index) => index);

  it('filter()', () => {
    const predicate = x => x % 2 === 0;

    expect([...filter(predicate)(arr)]).to.deep.equal(arr.filter(predicate));
  });

  it('map', () => {
    const project = x => x * x;

    expect([...map(project)(arr)]).to.deep.equal(arr.map(project));
  });
});
