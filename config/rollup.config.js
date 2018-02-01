import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';


export default {
  input: 'site/_scripts/main.js',

  output: {
    format: 'iife',
    file: 'site/bundle.js',
    sourcemap: true,
  },

  plugins: [
    replace({
      exclude: [],
      values: {
        // for redux
        'process.env.NODE_ENV': JSON.stringify('development'),
      },
    }),
    resolve({
      module: true,
      jsnext: true,
      main: false,
      browser: true,
      modulesOnly: true,
    }),
  ],
};
