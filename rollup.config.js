import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const config = {
  input: 'src/privacy_compliance.js',
  output: {
    file: 'dist/data-privacy-compliance.js',
    format: 'cjs',
    sourcemap: true
  },
  plugins: [resolve(), commonjs(), babel({ babelHelpers: 'bundled' })]
};

export default config;
