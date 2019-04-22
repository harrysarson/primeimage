#!/bin/bash

set -e
set -v

mkdir -p ci/build
cd ci/build

# Get emsdk
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
./emsdk install sdk-1.38.30-64bit
./emsdk activate sdk-1.38.30-64bit
source ./emsdk_env.sh
cd -

# download

wget https://gmplib.org/download/gmp/gmp-6.1.2.tar.lz

if [[ ! -d gmp-wasm ]]; then
    mkdir gmp-wasm
    tar xf gmp-6.1.2.tar.lz -C gmp-wasm --strip-components=1
fi

# Make gmp webassembly

cd gmp-wasm
sed -i '2igmp_asm_syntax_testing=no' configure

emconfigure ./configure --disable-assembly --disable-shared --prefix=$EMSCRIPTEN/system

echo '#define HAVE_MEMSET 1' >> config.h
echo '#define HAVE_STRNLEN 1' >> config.h
echo '#define HAVE_VSNPRINTF 1' >> config.h

make -j 2
make install

cd -



