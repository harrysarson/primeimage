# PrimeImage

Turn any image into an prime number.
See https://harrysarson.github.io/PrimeImage.

**Master**: [![Build Status](https://travis-ci.com/harrysarson/primeimage.svg?branch=master)](https://travis-ci.com/harrysarson/primeimage)

## Installation Instructions

### Required Software

- node and npm
- ruby

### Steps

```bash
npm install
gem install bundle
bundle install
```

## Running Localy

```bash
npm run build
npm run serve
```

To recompile on changes use:

```bash
npm install -g chokidar-cli
chokidar elm-src -c "npm run build" --intial"
```