const path = require('path');

const Koa = require('koa');
const getPkgDir = require('pkg-dir');
const getRawBody = require('raw-body')
const serve = require('koa-static');
const koaBody = require('koa-body');
const route = require('koa-route');
const Debug = require('debug');
const os = require('os');
const fs = require('fs');

const pkgDir = getPkgDir.sync(__dirname);
const app = new Koa();

const debug = Debug('server');
  


app
  .use(serve(path.join(pkgDir, 'site')))

  .use(koaBody({ multipart: true }))
  .use(async function(ctx, next) {
    // ignore non-POSTs
    if ('POST' != ctx.method) return await next();
    
    debug(ctx.request.body);
    
    const file = ctx.request.body.files.file;
    const reader = fs.createReadStream(file.path);
    const stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString() + file.name));
    reader.pipe(stream);
    debug('uploading %s -> %s', file.name, stream.path);

    ctx.redirect('/');
  });
 
  
;



app.listen(3000);