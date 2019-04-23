const ReadLine = require('readline');
const primeSearch = require('./prime-search')(); // eslint-disable-line import/no-unresolved

if (process.argv.length === 2 || (process.argv.length > 2 && (process.argv[1] === '-h' || process.argv[1] === '--help'))) {
  console.log('Usage: near-prime k [progress-file]\n' +
    '\n' +
    'Convert a number to a prime.\n' +
    '\n' +
    'A number is read from stdin and a near prime number is outputted ' +
    'to stdout.\n' +
    '\n' +
    'k\t\tDetermine the probability that the generated number is prime\n' +
    '\t\tand is passed to mpz_probab_prime_p (see\n' +
    '\t\thttps://gmplib.org/manual/Number-Theoretic-Functions.html).');
  process.exit(1); // eslint-disable-line unicorn/no-process-exit
} else {
  primeSearch.then(Module => {
    // Get reps from CL args's.

    const reps = Number(process.argv[2]);
    if (!Number.isInteger(reps)) {
      console.error(`near-prime: ${process.argv[2]} is not a valid value for reps`);
      process.exit(1); // eslint-disable-line unicorn/no-process-exit
    }

    // Get input from stdin.

    console.log('Enter the number to convert to a prime and press enter:');

    const readline = ReadLine.createInterface({
      input: process.stdin,
      output: null,
      terminal: false
    });

    readline.once('line', number => {
      const allocAmount = Module.lengthBytesUTF8(number) + 1;
      const buffer = Module._malloc(allocAmount);
      Module.stringToUTF8(number, buffer, allocAmount);
      const res = Module._find_candidate_with_progress(buffer, 10);
      let returnCode = 10;
      switch (res) {
        case 1:
        case 2:
          console.log(`Found prime candidate:\n${Module.UTF8ToString(buffer)}`); // eslint-disable-line new-cap
          returnCode = 0;
          break;
        case 0:
          console.error('Error: cannot find a prime number');
          returnCode = 1;
          break;
        default:
          console.error(`Error: got return code = ${res}`);
          returnCode = res;
      }

      Module._free(buffer);
      process.exit(returnCode); // eslint-disable-line unicorn/no-process-exit
    });
  });
}
