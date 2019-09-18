export async function getImageData(url, width) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  const {target: img} = await new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.addEventListener('load', resolve);
    img.addEventListener('error', event => {
      const error = new Error('could not convert url to an img');
      error.event = event;
      reject(error);
    });
    img.src = url;
  });

  const aspectRatio = img.height / img.width;

  if (width === null) {
    // Aim for 500 digits, width * height = 500 => width**2 * aspectRatio = 500
    width = Math.floor(Math.sqrt(500 / aspectRatio));
  }

  const height = width * aspectRatio;

  canvas.width = width;
  canvas.height = height;
  context.drawImage(img, 0, 0, width, height);
  return context.getImageData(0, 0, width, height);
}

export function quantise(input, output, levels) {
  if (input.length !== output.length) {
    throw new Error('Input array is a different size to the output');
  }

  const {length} = input;

  levels = levels.slice().sort((lhs, rhs) => lhs - rhs);
  const {length: numberOfLevels} = levels;

  for (let i = 0; i < length; i++) {
    let j = 0;
    while (j < numberOfLevels && input[i] > levels[j]) {
      j++;
    }

    output[i] = j;
  }

  return output;
}

export function guessLevels(imageData, numLevels) {
  console.log(imageData);

  const bins = new Uint32Array(256);

  for (const pixel of imageData.data) {
    bins[pixel] += 1;
  }

  const threshold = Math.ceil(imageData.data.length / (numLevels + 1));

  const [, levels] = bins.reduce(([oldPixelCount, levels], numPixels, pixelValue) => {
    const newPixelCount = oldPixelCount + numPixels;
    if (newPixelCount > threshold) {
      return [newPixelCount - threshold, [...levels, pixelValue]];
    }

    return [newPixelCount, levels];
  }, [0, []]);

  return levels;
}
