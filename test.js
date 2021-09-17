console.log('[INSTALLED DEPENDECIES VERSION]')
const ds = require('./package.json').dependencies
for (const d in ds){
  try {
    const v = require(`${d}/package.json`).version
    console.log(`${d}: ${v}`)
  } catch (e) {
    console.log(`${d}: no version found`)
  }
}

process.exit(0)