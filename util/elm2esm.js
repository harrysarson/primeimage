const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

(async function main() {

  const elm_path = process.argv[2];

  console.log(`Making ${elm_path} into a es module...`);

  const elm_es3 = await readFile(elm_path, 'utf8');

  const elm_esm =
    '\n' +
    'const scope = {};\n' +
    elm_es3.replace('}).call(this);', '}).call(scope);') +
    'export const { Elm } = scope;\n' +
    '\n';

  await writeFile(elm_path, elm_esm);

  console.log(`Finished.`);

})();
