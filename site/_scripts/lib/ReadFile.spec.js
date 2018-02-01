/* global describe it expect */

import { ReadFile } from './ReadFile.js';

describe('ReadFile#asDataUrl', () => {
  it('should read a file', async () => {
    const testFile = new File(
      /* eslint-disable */
      [new ArrayBuffer([137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 2, 188, 0, 0, 2, 188, 1, 3, 0, 0, 0, 55, 116, 254, 0, 0, 0, 0, 1, 115, 82, 71, 66, 0, 174, 206, 28, 233, 0, 0, 0, 4, 103, 65, 77, 65, 0, 0, 177, 143, 11, 252, 97, 5, 0, 0, 0, 32, 99, 72, 82, 77, 0, 0, 122, 38, 0, 0, 128, 132, 0, 0, 250, 0, 0, 0, 128, 232, 0, 0, 117, 48, 0, 0, 234, 96, 0, 0, 58, 152, 0, 0, 23, 112, 156, 186, 81, 60, 0, 0, 0, 3, 80, 76, 84, 69, 255, 255, 255, 167, 196, 27, 200, 0, 0, 0, 83, 73, 68, 65, 84, 24, 25, 237, 193, 49, 1, 0, 0, 0, 194, 160, 245, 79, 109, 12, 31, 160, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 120, 25, 243, 92, 0, 1, 45, 111, 161, 62, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130])],
      /* eslint-enable */
      'test-image.png',
    );
    const readFile = new ReadFile(testFile);

    expect(readFile.asDataURL()).to.eventually.equal('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArwAAAK8AQMAAAA3dP4AAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAANQTFRF////p8QbyAAAAFNJREFUGBntwTEBAAAAwqD1T20MH6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4GfNcAAEtb6E+AAAAAElFTkSuQmCC');
  });
});

