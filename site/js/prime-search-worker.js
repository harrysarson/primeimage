/* eslint-env worker */

const exports = {};
importScripts('../built/prime-search.js');
const PrimeSearch = exports.prime_search({
  locateFile(path, scriptDir) {
    return `${scriptDir}../built/${path}`;
  }
});

onmessage = function (e) {
  PrimeSearch.then(() => {
    const {data: number} = e;

    const allocAmount = PrimeSearch.lengthBytesUTF8(number) + 1;
    const buffer = PrimeSearch._malloc(allocAmount);

    try {
      PrimeSearch.stringToUTF8(number, buffer, allocAmount);
      const res = PrimeSearch._find_candidate_with_progress(buffer, 10);
      switch (res) {
        case 1:
        case 2:
          postMessage({
            type: res === 1 ? 'probablyPrimeGenerated' : 'definatelyPrimeGenerated',
            payload: PrimeSearch.UTF8ToString(buffer) // eslint-disable-line new-cap
          });
          break;
        case 0:
          postMessage({
            type: 'requestPrimeError',
            payload: 'Cannot find prime number'
          });
          break;
        default:
          postMessage({
            type: 'requestPrimeError',
            payload: `Webassembly function returned unknown error code ${res}`
          });
      }
    } finally {
      PrimeSearch._free(buffer);
    }
  });
};
