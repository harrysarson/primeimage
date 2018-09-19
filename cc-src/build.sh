#!/bin/bash

rm ./prime_search.js
rm ./prime_search.wasm

set -e

source /home/hsarson/emsdk/emsdk_env.sh

emcc prime_search.c /home/hsarson/gmp-6.1.2/.libs/libgmp.a -I/home/hsarson/gmp-6.1.2/ \
    --profiling \
    -o prime_search.js \
    -s EXPORTED_FUNCTIONS='["_find_candidate"]' \
    -s EXTRA_EXPORTED_RUNTIME_METHODS='["stringToUTF8", "Pointer_stringify"]' \
    -s MODULARIZE=1 -s 'EXPORT_NAME="prime_search"' \
    -s ALLOW_MEMORY_GROWTH=1

mv prime_search.js ../site/built/
mv prime_search.wasm ../site/built/

echo "Build complete"