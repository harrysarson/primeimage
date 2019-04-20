#!/bin/bash

rm -rf ./prime_search.js
rm -rf ./prime_search.wasm

set -e

source $HOME/emsdk/emsdk_env.sh

CFLAGS="-Wall -Werror -lgmp -O3"

gcc main.c prime_search.c $CFLAGS -o prime_search.out

echo "Native cli build complete"

emcc prime_search.c $CFLAGS \
    --profiling \
    -o prime_search.js \
    -s ALLOW_MEMORY_GROWTH=1 \
    -s EXPORTED_FUNCTIONS='["_find_candidate_with_progress", "_malloc", "_free"]' \
    -s EXTRA_EXPORTED_RUNTIME_METHODS='["stringToUTF8", "UTF8ToString", "lengthBytesUTF8"]' \
    -s MODULARIZE=1 -s 'EXPORT_NAME="prime_search"' \

cp prime_search.js ../site/built/
cp prime_search.wasm ../site/built/

echo "WASM build complete"
