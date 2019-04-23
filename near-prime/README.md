# Prime Image - Prime Search

This directory contains c code designed to convert a string representation of a number into a string representation of a prime number in such a way that the two representations look similar if you squint at them.

## Building

There are three ways to build the files in this directory

### Native CLI

Generate a CLI program to do prime conversions.
After installing gmp, run `$ make built/near-prime` in this directory to generate an executable (which can be run with `$ built/near-prime`).
Install gmp either from the sources or by `$ apt install libgmp-dev`.

### Node js CLI

Generate a node script which should produce the exact same output as the native version.
Building this script requires [emscripten](https://emscripten.org/) downloaded and the `emcc` and `emconfigure` programs on your path.
To build a webassembly versions of the gmp library follow the steps in <https://raw.githubusercontent.com/TrueBitFoundation/wasm-ports/master/gmp.sh>.
Finally run `$ make built/prime-search.js` and use `$ node near-prime` to run the CLI.

### JavaScript library

The point of this directory is to generate the prime search functions needed for the website.
Integrating the webassembly into the website is the next step here.
