import { createStore } from 'vuex'
import createCache from 'vuex-cache'
import VuexPersistence from 'vuex-persist/dist/esm/index.js'

import ls from 'store'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const oldState = ls.get('vuex') || {}

const state = {
  accessToken: '',
  authenticated: false,
  userdataState: 'error',
  userdata: {
    _id: '',
    user: '',
    name: '',
    email: '',
    phone: ''
  },
  curUserData: {
    _id: '',
    user: '',
    name: ''
  },
  curUserDataState: 'error'
}

const stator = () => {
  const res = {}
  for (const x in state) {
    res[x] = oldState[x] || state[x]
  }
  return res
}

const mutate = () => {
  const res = {}
  for (const x in state) {
    res[x] = (state, val) => {
      state[x] = val
    }
  }
  return res
}

const store = createStore({
  plugins: [createCache(), vuexLocal.plugin],
  state: stator(),
  mutations: mutate()
})

export default { store, state }
