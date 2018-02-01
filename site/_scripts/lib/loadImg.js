
// todo errors?

export function loadImg(src) {
  const img = document.createElement('img');

  return new Promise(function executor(resolve, reject) {
    img.onload = function onLoad() {
      resolve(img);
    };

    img.onerror = function onError(event) {
      const error = Object.assign(new Error('Could not load img'), {
        img: event.target,
        source: src,
      });

      reject(error);
    };

    img.src = src;
  });
}

export default loadImg;
