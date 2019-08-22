/* eslint-env worker */

const MAX_ITERATIONS_BETWEEN_PRINT = 50;

const exports = {};

importScripts('../built/prime-search.js');

const PrimeSearch = exports.prime_search({
  locateFile(path, scriptDir) {
    return `${scriptDir}../built/${path}`;
  }
});

onmessage = message => {
  console.error('Message sent to prime worker before initialisation complete!', message);
};

// const STATES = {
//   IDLE: Symbol('IDLE'),
//   RUNNING: Symbol('RUNNING')
// };

PrimeSearch.then(() => {
  // Let state = STATES.IDLE;
  // let buffer = PrimeSearch._malloc(0);
  onmessage = ({data: payload}) => {
    switch (payload.type) {
      case 'Start': {
        const reps = 10;
        const {nonPrimeNumber} = payload;
        const allocAmount = PrimeSearch.lengthBytesUTF8(nonPrimeNumber) + 1;
        const buffer = PrimeSearch._malloc(allocAmount);

        try {
          PrimeSearch.stringToUTF8(nonPrimeNumber, buffer, allocAmount);
          // Const res = PrimeSearch._find_candidate_with_progress(buffer, reps);
          const {log2ProbPrime, primeNumber} = findCandidateWithProgress(nonPrimeNumber, {
            reps,
            startingSwaps: 1,
            swapStride: 1
          });
          postMessage({
            type: 'FoundPrime',
            log2ProbPrime,
            primeNumber,
          })
        } catch (error) {
          postMessage({
            type: 'Error',
            payload: `Prime search failed: ${error}`
          });
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
  };
});

function findCandidateWithProgress(input, {reps, startingSwaps, swapStride}) {
  let res = [0, ''];

  const trimmed = input.trim();
  const len = PrimeSearch.lengthBytesUTF8(trimmed);
  const str = PrimeSearch._malloc(len + 1);

  // Create bitmask with more bits in than there are bytes in input.
  const bitmask = PrimeSearch._malloc(PrimeSearch._bitset_size(len));

  try {
    PrimeSearch.stringToUTF8(trimmed, str, len + 1);

    console.warn(`Comencing search for a prime candidate, target is ${len} digits long.`);

    for (let i = startingSwaps; i < len; i += swapStride) {
      // Set first j i bits of bitmask.
      for (let j = 0; j < len; j++) {
        if (j < i) {
          PrimeSearch._bitset_set(bitmask, j, 1);
        } else {
          PrimeSearch._bitset_set(bitmask, j, 0);
        }
      }

      const numberOfPermuations = nCr(len, i);

      let totalIterationCount = 0;

      console.warn(progressToString(i, totalIterationCount, numberOfPermuations));

      let findRes;
      do {
        findRes = PrimeSearch._find_candidate_using_bitmask(str, reps, bitmask, MAX_ITERATIONS_BETWEEN_PRINT);
        totalIterationCount += MAX_ITERATIONS_BETWEEN_PRINT;
        console.warn(progressToString(i, totalIterationCount, numberOfPermuations));
      } while (findRes === 0);

      if (findRes === 1 || findRes === 2) {
        console.warn(': Found prime!');
        const log2ProbPrime = findRes === 1 ? 0 : 0.25 ** reps;
        return {
          log2ProbPrime,
          primeNumber: PrimeSearch.UTF8ToString(str) // eslint-disable-line new-cap
        };
      } else if (findRes === -1) {
        console.warn(': Could not find any primes.');
      } else {
        throw new Error('Could not find any primes.');
      }
    }
  } finally {
    PrimeSearch._free(bitmask);
    PrimeSearch._free(str);
  }
}

function nCr(n, r) {
  if (r > n - r) {
    r = n - r; // Because C(n, r) == C(n, n - r)
  }

  let ans = 1;

  for (let i = 1; i <= r; i++) {
    ans *= n - r + i;
    ans /= i;
  }

  return ans;
}

function progressToString(swapCount, iterationsRun, iterationsTotal) {
  return `Trying to find prime by swapping ${swapCount} digits` +
    `(${`${iterationsRun}`.padStart(10, '0')}/${iterationsTotal})`;
}
