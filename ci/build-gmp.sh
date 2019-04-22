#!/bin/bash

set -e

# Credit: https://github.com/TrueBitFoundation/wasm-ports/

cd ci/build

# Make normally

cd gmp-native
./configure
make -j 2
cd -

# Make webassembly

cd gmp-wasm
sed -i '2igmp_asm_syntax_testing=no' configure

emconfigure ./configure --disable-assembly --disable-shared --prefix=$EMSCRIPTEN/system

echo '#define HAVE_MEMSET 1' >> config.h
echo '#define HAVE_STRNLEN 1' >> config.h
echo '#define HAVE_VSNPRINTF 1' >> config.h

make -j 2
make install

cd -

