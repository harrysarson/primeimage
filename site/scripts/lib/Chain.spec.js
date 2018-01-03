/* global describe it expect sinon */
import { Chain } from './Chain.js';

describe('Chain Class', () => {
  it('construct instance of Chain', () => {
    expect(new Chain(5)).to.have.property('value', 5);
  });
});

describe('Chain functions', () => {
  it('map', () => {
    expect(new Chain(5).map(x => x * x)).to.have.property('value', 25);
  });

  it('do', () => {
    const spy = sinon.spy();
    new Chain('hi').do(spy);
    expect(spy).to.have.been.calledWith('hi');
  });
});
