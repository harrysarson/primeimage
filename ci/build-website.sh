#!/bin/bash

set -e

if [[ "$TRAVIS_TAG" == "" ]]; then
    echo "DRAFT BUILD"
    export DEPLOY_REPO="$TRAVIS_REPO_SLUG-preview"
    printf "DRAFT" > site/version.txt
else
    echo "TAGGED BUILD"
    export DEPLOY_REPO="$TRAVIS_REPO_SLUG"
    node -e "process.stdout.write(require('./package.json').version)" > site/version.txt
fi

GIT_HASH=$(git rev-parse HEAD)
echo " (${GIT_HASH%?})" >> site/version.txt

# build elm files
npm run build

# build wasm files
make -C near-prime install-website

# stage built files
git add site/built -f
git add site/version.txt -f
git status
