export async function getImageData(url, width, height) {

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  const { target: img } = await new Promise((res, rej) => {
    const img = document.createElement('img');
    img.onload = res;
    img.onerror = event => {
      const error = new Error('could not convert url to an img');
      error.event = event;
      rej(error);
    };
    img.src = url;
  });

  canvas.width = width;
  canvas.height = height;
  context.drawImage(img, 0, 0, width, height);
  return context.getImageData(0, 0, width, height);
}

export function quantise(input, output, levels) {
  if (input.length !== output.length) {
    throw new Error('Input array is a different size to the output');
  }

  const { length } = input;

  levels = levels.slice().sort((lhs, rhs) => lhs - rhs);
  const { length: numberOfLevels } = levels;

  for (let i = 0; i < length; i++) {
    let j = 0;
    while (j < numberOfLevels && input[i] > levels[j]) {
      j++;
    }
    output[i] = j;
  }

  return output;
}
