/**
 * Copyright to http://www.chaijs.com/plugins/chai-bytes/
 *
 * Removed support for strings, changed test to uint8clampedarray from uint8array
 *
 * Needed to re-write to be a esm
 */
export function equalBytes (chai, utils) {
  const { Assertion } = chai;

  Assertion.addMethod('equalBytes', function (expected) {
    if (expected.length === undefined) {
      throw new TypeError('equalBytes consumes string, array, or array-like object; got none of those');
    }

    const actual = this._obj;

    new Assertion(actual).to.be.a('uint8clampedarray');

    const assert =
         expected.length === actual.length
      && actual.every((x, i) => expected[i] === x)
      ;

    const diffIndexes = assert
      ? []
      : [...actual]
          .map((x, i) => [x, i])
          .filter(([x, i]) => expected[i] !== x)
          .map(([x, i]) => i);

    this.assert(
      assert,
      `expected #{this} to equal #{exp}, indexes [${diffIndexes}] differ`,
      `expected #{this} to not equal #{exp}`,
      expected
    );
  });
};
