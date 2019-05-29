
if [[ "$TRAVIS_TAG" == "" ]]; then
    echo "DRAFT BUILD"
    printf "DRAFT " > site/version.txt
    git rev-parse HEAD >> site/version.txt
else
    echo "TAGGED BUILD"
    node -e "console.log(require('./package.json').version)" > site/version.txt
fi

# build elm files
npm run build

# build wasm files
make -C near-prime install-website

# stage built files
git add site/built -f
git add site/version.txt
git status