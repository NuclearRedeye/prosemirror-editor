import { default as copy } from 'rollup-plugin-copy';
import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';

module.exports = {
  input: './src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'dist/index.es.js',
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    resolve(),
    commonJS({
      include: 'node_modules/**'
    }),
    copy({
      targets: [
        {
          src: ['src/index.html', 'src/index.css', 'src/*.jpg'],
          dest: 'dist/'
        },
        {
          src: './node_modules/prosemirror-example-setup/style/style.css',
          dest: 'dist/'
        },
        {
          src: './node_modules/prosemirror-menu/style/menu.css',
          dest: 'dist/'
        }
      ]
    })
  ]
};
