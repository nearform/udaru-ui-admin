import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import builtIns from 'rollup-plugin-node-builtins'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import uglify from 'rollup-plugin-uglify'

export default {
  input: 'lib/index.js',
  external: ['react'],
  output: [
    {
      name: 'UdadruAdminComponents',
      format: 'umd',
      globals: {
        react: 'React'
      }
    }
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    builtIns(),
    commonjs({
      include: /node_modules/
    }),
    resolve(),
    replace({
      exclude: 'node_modules/**',
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    process.env.NODE_ENV === 'production' && uglify()
  ],
  watch: {
    exclude: ['node_modules/**']
  }
}
