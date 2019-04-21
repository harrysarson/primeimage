#!/bin/bash

# Credit: https://github.com/TrueBitFoundation/wasm-ports/

mkdir -p build
cd build

# download

wget https://gmplib.org/download/gmp/gmp-6.1.2.tar.lz
tar xf gmp-6.1.2.tar.lz
cd gmp-6.1.2

# Make normally

./configure
make -j 2
sudo make install

sed -i '2igmp_asm_syntax_testing=no' configure

# Make webassembly

emconfigure ./configure --disable-assembly --disable-shared --prefix=$EMSCRIPTEN/system

echo '#define HAVE_MEMSET 1' >> config.h
echo '#define HAVE_STRNLEN 1' >> config.h
echo '#define HAVE_VSNPRINTF 1' >> config.h

make -j 2
make install

# clean up

cd ..

