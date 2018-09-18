const fs = require('fs');
const {promisify} = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

(async () => {
  const elmPath = process.argv[2];

  console.log(`Making ${elmPath} into a es module...`);

  const elmEs3 = await readFile(elmPath, 'utf8');

  const elmEsm =
    '\n' +
    'const scope = {};\n' +
    elmEs3.replace('}(this));', '}(scope));') +
    'export const { Elm } = scope;\n' +
    '\n';

  await writeFile(elmPath, elmEsm);

  console.log(`Finished.`);
})();
