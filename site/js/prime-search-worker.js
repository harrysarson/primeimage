
const exports = {};
importScripts("../built/prime-search.js");
console.log(exports);
const PrimeSearch = exports.prime_search();

onmessage = function (e) {
    PrimeSearch.then(() => {
        const { data: number } = e;
        console.log(number);
        console.log(PrimeSearch);

        const allocAmount = PrimeSearch.lengthBytesUTF8(number) + 1;
        const buffer = PrimeSearch._malloc(allocAmount);

        try {
            PrimeSearch.stringToUTF8(number, buffer, allocAmount);
            const res = PrimeSearch._find_candidate_with_progress(buffer, 10);
            switch (res) {
                case 1:
                case 2:
                    console.log(`Found prime candidate:\n${PrimeSearch.UTF8ToString(buffer)}`); // eslint-disable-line new-cap
                    break;
                case 0:
                    console.error('Error: cannot find a prime number');
                    break;
                default:
                    console.error(`Error: got return code = ${res}`);
            }
        } finally {
            PrimeSearch._free(buffer);
        }
    });
}