/* eslint consistent-return: "off" */

const path = require('path');

const Koa = require('koa');
const getPkgDir = require('pkg-dir');
const serve = require('koa-static');
const koaBody = require('koa-body');
const Debug = require('debug');
const os = require('os');
const fs = require('fs');

const pkgDir = getPkgDir.sync(__dirname);
const app = new Koa();

const debug = Debug('server');


app
  .use(serve(path.join(pkgDir, 'site')))

  .use(koaBody({ multipart: true }))
  .use(async function process(ctx, next) {
    // ignore non-POSTs
    if (ctx.method !== 'POST') return next();

    debug(ctx.request.body);

    const { request: { body: { files: { file } } } } = ctx;
    const reader = fs.createReadStream(file.path);
    const stream = fs.createWriteStream(path.join(
      os.tmpdir(),
      Math.random().toString() + file.name,
    ));
    reader.pipe(stream);
    debug('uploading %s -> %s', file.name, stream.path);

    ctx.redirect('/');
  });


app.listen(3000);
