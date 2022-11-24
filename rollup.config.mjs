import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import { defineConfig } from 'rollup';

const publicConfig = {
  format: 'umd',
  name: 'uodule',
};

const config = defineConfig([
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'lib/index.js',
        ...publicConfig,
      },
      {
        file: 'lib/index.min.js',
        ...publicConfig,
        plugins: [
          terser(),
        ],
      },
    ],
    plugins: [
      typescript({
        declaration: false,
        target: 'ES5',
      }),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'lib/index.mjs',
      format: 'esm',
    },
    plugins: [
      typescript({
        declaration: false,
      }),
    ],
  },
]);

export default config;
