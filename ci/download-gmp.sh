#!/bin/bash

set -e

mkdir -p ci/build
cd ci/build

sudo apt update
sudo apt install lzip

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

