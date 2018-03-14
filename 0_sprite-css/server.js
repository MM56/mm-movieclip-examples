const budo = require('budo')
const path = require('path')
const babelify = require('babelify')

budo('src/index.js', {
  port: 4000,
  serve: 'bundle.js',
  live: true,
  open: true,
  dir: 'public',
  stream: process.stdout,
  watchGlob: '**/*.{html,js,css,frag,vert,glsl}',
  browserify: {
    paths: [
      path.join(__dirname, '/src')
    ],
    insertGlobals: true,
    insertGlobalVars: {
      ENV: () => {
        return `window.ENV = '${process.env.NODE_ENV}'`
      }
    },
    transform: babelify
  }
})
