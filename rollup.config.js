import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';
import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: ['node_modules/**'],
        include: ['node_modules/proxy-polyfill', 'src/**'],
        babelHelpers: 'bundled',
      }),
      getBabelOutputPlugin({
        presets: ['@babel/preset-env'],
      }),
    ],
  },
];
