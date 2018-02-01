/* global describe it expect */
import sinon from 'sinon';
import { pipe } from './pipe.js';

describe('pipe', () => {
  it('should return initialValue if no functions are provided', () => {
    expect(pipe(5)).to.equal(5);
    expect(pipe()).to.be.undefined;
  });

  it('should pass intitialValue to project and return result', () => {
    const callback = sinon.stub().returns(7);

    expect(pipe('hi', callback)).to.equal(7);
    expect(callback).to.have.been.calledWith('hi');
  });

  it('should chain function calls', () => {
    const values = ['hi', 4, '89', false];

    const callbacks = values
      .slice(1)
      .map(value => sinon.stub().returns(value));

    expect(pipe(values[0], ...callbacks)).to.equal(values[values.length - 1]);

    for (let i = 0; i < callbacks.length; i += 1) {
      expect(callbacks[i]).to.have.been.calledWith(values[i]);
    }
  });
});
