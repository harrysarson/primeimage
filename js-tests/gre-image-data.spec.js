import {expect} from 'chai';
import {GreyImageData} from '../site/js/grey-image-data';

describe('GreyImageData', () => {
  it('should construct GreyImageData', () => {
    const width = 17;
    const height = 6;

    const greyImageData = new GreyImageData(width, height);

    expect(greyImageData.width).to.equal(width);
    expect(greyImageData.height).to.equal(height);
    expect(greyImageData.data.length).to.equal(width * height);
  });

  describe('fromColorImage', () => {
    it('should not change greyscale image', () => {
      const width = 16;
      const height = 19;

      const input = new ImageData(width, height);
      const expected = new GreyImageData(width, height);

      for (let i = 0, length = width * height; i < length; ++i) {
        const val = Math.random() * 256;
        input.data[0 + (4 * i)] = val;
        input.data[1 + (4 * i)] = val;
        input.data[2 + (4 * i)] = val;
        input.data[3 + (4 * i)] = 255;

        expected.data[i] = val;
      }

      const output = GreyImageData.fromColorImage(input);

      expect(output).deep.equals(expected);
    });
    it('should work with uniform weightings', () => {
      const width = 16;
      const height = 19;

      const input = new ImageData(width, height);
      const expected = new GreyImageData(width, height);

      for (let i = 0, length = width * height; i < length; ++i) {
        input.data[0 + (4 * i)] = 1;
        input.data[1 + (4 * i)] = 5;
        input.data[2 + (4 * i)] = 3;
        input.data[3 + (4 * i)] = 255;

        expected.data[i] = 3;
      }

      const output = GreyImageData.fromColorImage(input, [1, 1, 1]);

      expect(output).deep.equals(expected);
    });
  });
});
