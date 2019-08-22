/* eslint-env worker */

const exports = {};

importScripts('../built/prime-search.js');

const PrimeSearch = exports.prime_search({
  locateFile(path, scriptDir) {
    return `${scriptDir}../built/${path}`;
  }
});

onmessage = function ({data: payload}) {
  PrimeSearch.then(() => {
    switch (payload.type) {
      case 'Start': {
        const reps = 10;
        const {nonPrimeNumber} = payload;

        const allocAmount = PrimeSearch.lengthBytesUTF8(nonPrimeNumber) + 1;
        const buffer = PrimeSearch._malloc(allocAmount);

        try {
          PrimeSearch.stringToUTF8(nonPrimeNumber, buffer, allocAmount);
          const res = PrimeSearch._find_candidate_with_progress(buffer, reps);
          switch (res) {
            case 1:
            case 2: {
              const log2ProbPrime = res === 1 ? 0 : 0.25 ** reps;
              postMessage({
                type: 'FoundPrime',
                log2ProbPrime,
                primeNumber: PrimeSearch.UTF8ToString(buffer) // eslint-disable-line new-cap
              });
              break;
            }

            case 0: {
              postMessage({
                type: 'Error',
                message: 'Cannot find prime number'
              });
              break;
            }

            default: {
              postMessage({
                type: 'Error',
                payload: `Webassembly function returned unknown error code ${res}`
              });
            }
          }
        } finally {
          PrimeSearch._free(buffer);
        }

        break;
      }

      default: {
        postMessage({
          type: 'Error',
          payload: `Prime worker received unkown message type ${payload.type}`
        });
      }
    }
  });
};

