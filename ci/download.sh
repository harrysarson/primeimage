#!/bin/bash

set -e

mkdir -p ci/build
cd ci/build

sudo apt update
sudo apt install lzip m4

# Get emsdk
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
./emsdk install sdk-1.38.30-64bit
./emsdk activate sdk-1.38.30-64bit
source ./emsdk_env.sh
cd -

# download

wget https://gmplib.org/download/gmp/gmp-6.1.2.tar.lz

if [[ ! -d gmp-native ]]; then
    mkdir gmp-native
    tar xf gmp-6.1.2.tar.lz -C gmp-native --strip-components=1
fi

if [[ ! -d gmp-wasm ]]; then
    mkdir gmp-wasm
    tar xf gmp-6.1.2.tar.lz -C gmp-wasm --strip-components=1
fi

# Make gmp normally

cd gmp-native
./configure
make -j 2
sudo make install
cd -

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



