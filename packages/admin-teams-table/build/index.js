const del = require('del')
const execSync = require('child_process').execSync

function build() {
  console.log('\n*** es modules ***\n')
  execSync('babel lib -d dist/es', {
    stdio: 'inherit',
    env: Object.assign({}, process.env)
  })

  console.log('\n*** cjs modules ***\n')
  execSync('babel lib -d dist', {
    stdio: 'inherit',
    env: Object.assign({}, process.env, {
      BABEL_ENV: 'cjs'
    })
  })

  console.log('\n*** umd build ***\n')
  execSync('rollup -c -o dist/umd/udaru-admin-ui-components.js', {
    stdio: 'inherit',
    env: Object.assign({}, process.env, {
      BABEL_ENV: 'umd'
    })
  })

  console.log('\n*** minfied umd build ***\n')
  execSync('rollup -c -o dist/umd/udaru-admin-ui-components.min.js', {
    stdio: 'inherit',
    env: Object.assign({}, process.env, {
      BABEL_ENV: 'umd',
      NODE_ENV: 'production'
    })
  })
}

function clearDist() {
  console.log('\n*** Clearing dist/ folder ***\n')
  return del(['dist']).then(path => {
    console.log('Removed folder:')
    console.dir(path.join(''), { colors: true })
  })
}

function run() {
  clearDist().then(build)
}

run()
