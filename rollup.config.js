import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import fs from 'fs';
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
export default {
  input: 'src/components/index.ts',
  output: [
    {
      dir: 'dist/cjs',
      format: 'cjs',
      sourcemap: false,
      interop: 'auto',
    },
    {
      dir: 'dist/es',
      format: 'es',
      sourcemap: false,
      // Enable tree-shaking for ES modules
      preserveModules: true,
      preserveModulesRoot: 'src/components',
    },
  ],
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    ...Object.keys(pkg.peerDependencies || {}),
    ...Object.keys(pkg.dependencies || {}),
  ],
  treeshake: {
    // Enable aggressive tree-shaking
    moduleSideEffects: false,
    propertyReadSideEffects: false,
    tryCatchDeoptimization: false,
  },
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true,
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json', // 使用标准tsconfig，类型声明通过其他方式处理
      compilerOptions: {
        module: 'ESNext',
        target: 'ES5',
        // Ensure ES modules are output for tree-shaking
        isolatedModules: true,
      },
    }),
    postcss({
      plugins: [autoprefixer()],
      extract: true,
      minimize: true,
      sourceMap: false,
    }),
    terser({
      format: {
        comments: false,
      },
      // Optimize for tree-shaking
      mangle: {
        keep_classnames: false,
        keep_fnames: false,
      },
    }),
  ],
};