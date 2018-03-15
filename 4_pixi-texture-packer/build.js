const path = require('path')
const browserify = require('browserify')

const b = browserify('./src/index.js', {
  paths: [
    path.join(__dirname, '/src')
  ],
  insertGlobals: true,
  insertGlobalVars: {
    ENV: () => {
      return `window.ENV = '${process.env.NODE_ENV}'`
    }
  }
})

b.bundle().pipe(process.stdout)
