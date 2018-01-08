
// todo errors?

export function loadImg(src, doc = document) {
  const img = doc.createElement('img');

  return new Promise(function executor(resolve, reject) {
    img.onload = function onLoad() {
      resolve(img);
    };

    img.onerror = function onError(error) {
      reject(error);
    };

    img.src = src;
  });
}

export default loadImg;
