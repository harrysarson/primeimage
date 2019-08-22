/* eslint-env worker */

const MAX_ITERATIONS_BETWEEN_PRINT = 50;

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
          // const res = PrimeSearch._find_candidate_with_progress(buffer, reps);
          const res = find_candidate_with_progress(nonPrimeNumber, reps);
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


function find_candidate_with_progress(input, reps)
{
  const trimmed = input.trim();
  const len = PrimeSearch.lengthBytesUTF8(trimmed);
  const str = PrimeSearch._malloc(len + 1);

  // Create bitmask with more bits in than there are bytes in input.
  let bitmask = PrimeSearch._malloc(PrimeSearch._bitset_size(len));

  try {
    PrimeSearch.stringToUTF8(trimmed, str, allocAmount);

    console.warn(`Comencing search for a prime candidate, target is ${len} digits long.`);

    for (let i = 1; i < len; i++)
    {
      // Set first j i bits of bitmask.
      for (let j = 0; j < len; j++)
      {
        if (j < i)
        {
          PrimeSearch._bitset_set(bitmask, j, 1);
        }
        else
        {
          PrimeSearch._bitset_set(bitmask, j, 0);
        }
      }

      const numberOfPermuations = nCr(len, i);

      let total_iteration_count = 0;

      console.warn(progressToString(i, total_iteration_count, numberOfPerumations));

      let find_res;
      do
      {
        find_res = PrimeSearch._find_candidate_using_bitmask(str, reps, bitmask, MAX_ITERATIONS_BETWEEN_PRINT);
        total_iteration_count += MAX_ITERATIONS_BETWEEN_PRINT;
        console.warn(progressToString(i, total_iteration_count, numberOfPerumations));
      } while (find_res == 0);

      if (find_res == 1 || find_res == 2)
      {
        res = find_res;
        strcpy(input, str);
        fprintf(stderr, ": Found prime!\n");
        break;
      }
      else if(find_res == -1) {
        console.warn(": Could not find any primes.");
      }
    }
  } finally {
    PrimeSearch._free(bitmask);
    PrimeSearch._free(str);
  }
  return res;
}

function nCr(n, r)
{
  if (r > n - r)
  {
    r = n - r; // because C(n, r) == C(n, n - r)
  }

  let ans = 1;

  for (let i = 1; i <= r; i++)
  {
    ans *= n - r + i;
    ans /= i;
  }

  return ans;
}

function progressToString(swapCount, iterationsRun, iterationsTotal) {
  return `Trying to find prime by swapping ${swapCount} digits` +
    `(${`${iterationsRun}`.padStart(10, '0')}/${iterationsTotal})`;
}