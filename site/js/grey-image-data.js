export class GreyImageData {
  constructor(width, height) {
    this.data = new Uint8ClampedArray(width * height);
    this.width = width;
    this.height = height;
  }

  static fromColorImage(
    input,
    [redWeight, greenWeight, blueWeight] = [0.2126, 0.7152, 0.0722],
  ) {
    const weightSum = redWeight + greenWeight + blueWeight;

    redWeight /= weightSum;
    greenWeight /= weightSum;
    blueWeight /= weightSum;

    const {width, height} = input;

    const output = new GreyImageData(width, height);

    for (let y = 0; y < height; ++y) {
      for (let x = 0; x < width; ++x) {
        const val =
          (redWeight * input.data[0 + (4 * x) + (4 * width * y)]) +
          (greenWeight * input.data[1 + (4 * x) + (4 * width * y)]) +
          (blueWeight * input.data[2 + (4 * x) + (4 * width * y)]);

        output.data[x + (width * y)] = val * input.data[3 + (4 * x) + (4 * width * y)] / 255;
      }
    }

    return output;
  }
}
