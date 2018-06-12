import { quantise, getImageData } from '../site/js/createNonPrime';

describe('getImageData', () => {
  it('should work with image data urls', async () => {
    const url = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

    const imageData = await getImageData(url, 1, 1);

    expect(imageData).deep.equals(new ImageData(1, 1));

  });
});

describe('quantise', () => {
  it('should quantise data stored in arrays', async () => {
    const input = [52, 43, 140, 20, 126, 61, 10, 45, 23, 166];

    const levels = [40, 70, 53];

    const expected = [1, 1, 3, 0, 3, 2, 0, 1, 0, 3];

    expect(quantise(input, input.slice().fill(0), levels)).deep.equals(expected);

  });
});