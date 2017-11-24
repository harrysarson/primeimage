
const createReaderPromise = (file, func) => new Promise(function executor(resolve, reject) {
  const reader = new FileReader();

  reader.onload = function onLoad() {
    resolve(reader.result);
  };

  function onError() {
    reject(reader.error);
  }

  reader.onabort = onError;
  reader.onerror = onError;

  func.call(reader, file);
});

export default class ReadFile {
  constructor(file) {
    Object.defineProperties(this, {
      file: {
        enumerable: true,
        value: file,
      },
    });
  }

  asDataURL() {
    return createReaderPromise(this.file, FileReader.prototype.readAsDataURL);
  }
}
