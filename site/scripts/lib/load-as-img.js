
// todo errors?

export default (src) => {
  const img = document.createElement('img');

  return new Promise(function executor(resolve) {
    img.onload = function onLoad() {
      resolve(img);
    };

    img.src = src;
  });
};
