const vm = require('vm')

const run = async (code, context, ms) => {
  try {
    const script = new vm.Script(`(async function(){${code}})()`)
    const ctx = vm.createContext(context)
    script.runInNewContext(ctx, { displayErrors: true, timeout: ms })
  } catch (e) {
    return String(e.message || 'Code execution failed!')
  }
}

const response = (e) => ({ type: 'error', message: e || 'Code execution failed or not handled!' })

const codexecs = async (code, context = {}, ms = 200) => {
  return await run(code, context, ms)
    .then(e => response(e))
    .catch(e => response(e))
}
module.exports = codexecs
