#!/bin/bash

set -e

# Credit: https://github.com/TrueBitFoundation/wasm-ports/

mkdir -p ci/build
cd ci/build

# download

if [[ ! -d gmp-native ]]; then
    wget https://gmplib.org/download/gmp/gmp-6.1.2.tar.lz
    tar xf gmp-6.1.2.tar.lz -C gmp-native
fi

if [[ ! -d gmp-wasm ]]; then
    cp gmp-native gmp-wasm -r
fi


# Make normally

cd gmp-native
./configure
make -j 2
sudo make install
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

