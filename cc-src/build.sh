#!/bin/bash

rm -rf ./prime_search.js
rm -rf ./prime_search.wasm

set -e

source $HOME/emsdk/emsdk_env.sh

gcc main.c prime_search.c -Wall -lgmp -o prime_search.out

#
# FORCE_FILESYSTEM=1 is needed for flushing of printf without newlines.
#

emcc prime_search.c -lgmp \
    --profiling \
    -o prime_search.js \
    -s ALLOW_MEMORY_GROWTH=1 \
    -s EXPORTED_FUNCTIONS='["_find_candidate_with_progress", "_find_candidate"]' \
    -s EXTRA_EXPORTED_RUNTIME_METHODS='["stringToUTF8", "UTF8ToString"]' \
    -s MODULARIZE=1 -s 'EXPORT_NAME="prime_search"' \
    -s FORCE_FILESYSTEM=1 \

cp prime_search.js ../site/built/
cp prime_search.wasm ../site/built/

echo "Build complete"
