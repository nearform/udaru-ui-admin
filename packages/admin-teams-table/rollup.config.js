import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import builtIns from 'rollup-plugin-node-builtins'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'lib/index.js',
  external: ['react'],
  output: [
    {
      file: 'dist/umd/udaru-admin-ui-components.js',
      name: 'UdadruAdminComponents',
      format: 'umd',
      globals: {
        react: 'React'
      }
    }
  ],
  plugins: [
    babel({
      plugins: ['external-helpers'],
      externalHelpers: true,
      exclude: 'node_modules/**'
    }),
    builtIns(),
    commonjs({
      include: /node_modules/
    }),
    resolve({
      module: true,
      jsnext: true,
      browser: true
    })
  ],
  watch: {
    exclude: ['node_modules/**']
  }
}
