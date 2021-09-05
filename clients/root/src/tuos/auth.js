import axios from 'axios'
import store from '../store'
import { mapState } from 'vuex'
import _ from 'lodash'
import ls from 'store'
const proto = function (options) {
  const { host } = options
  const authorizationToken = () => 'Bearer ' + (ls.get('vuex').accessToken || '')
  const urls = {
    login: '/api/auth/login',
    register: '/api/auth/register',
    user: '/api/user',
    users: '/api/users'
  }

  const url = (u) => host + urls[u]

  const login = async (data = {}) => {
    const opt = {
      method: 'POST',
      url: url('login'),
      headers: { 'content-type': 'application/json' },
      data
    }
    return await axios.request(opt)
      .then(e => e.data)
      .catch(() => ({ type: 'error', message: 'Unknown error occur.' }))
  }
  const register = async (data = {}) => {
    const opt = {
      method: 'POST',
      url: url('register'),
      headers: { 'content-type': 'application/json' },
      data
    }
    return await axios.request(opt)
      .then(e => e.data)
      .catch(() => ({ type: 'error', message: 'Unknown error occur.' }))
  }

  const userMe = async () => {
    const opt = {
      method: 'GET',
      url: url('user'),
      headers: {
        authorization: authorizationToken()
      }
    }
    return await axios.request(opt)
      .then(e => e.data)
      .catch((e) => ({ type: 'error', message: 'Unknown error occur.', e }))
  }

  const userName = async (username) => {
    const opt = {
      method: 'GET',
      url: `${url('user')}/@${username}`,
      headers: {
        authorization: authorizationToken()
      }
    }
    return await axios.request(opt)
      .then(e => e.data)
      .catch((e) => ({ type: 'error', message: 'Unknown error occur.', e }))
  }

  const update = async (data = {}) => {
    const opt = {
      method: 'PUT',
      url: url('user'),
      headers: {
        'content-type': 'application/json',
        authorization: authorizationToken()
      },
      data
    }
    return await axios.request(opt)
      .then(e => e.data)
      .catch(() => ({ type: 'error', message: 'Unknown error occur.' }))
  }

  const filterUpdateData = (old, data) => {
    const nd = {}
    for (const d in data) {
      if (String(old[d]) !== String(data[d])) {
        nd[d] = data[d]
      }
    }
    return nd
  }

  const filterUpdatePasswordData = data => _.pick(data, ['pass', 'npass'])

  return {
    login,
    register,
    userMe,
    userName,
    update,
    filterUpdateData,
    filterUpdatePasswordData
  }
}
const mixin = {
  computed: {
    ...mapState(['accessToken', 'authenticated'])
  },
  methods: {
    accessTokenHandler () { },
    accessTokenValidateChange (token) {
      if (token && typeof token === 'string' && token.length > 0) {
        this.$store.commit('authenticated', true)
      } else {
        this.$store.commit('authenticated', false)
      }
    },
    onAuthStateChanged () { },
    resetStore () {
      ls.clearAll()
      const originalState = store.state
      for (const x in originalState) {
        this.$store.commit(x, originalState[x])
      }
    },
    async authFormLogin (data) {
      this.loading = true
      await this.$tuos.auth
        .login(data)
        .then((e) => {
          this.serv = e
          this.$store.commit('accessToken', e.token)
        })
        .catch(
          () => (this.serv = { type: 'error', message: 'Unknown error occur.' })
        )
        .finally(() => {
          this.loading = false
        })
    },
    async authFormRegister (data) {
      if (!data.pass || !data.cpass || data.pass !== data.cpass) {
        this.serv = { type: 'error', message: "Password doesn't match" }
        return
      }
      this.loading = true
      await this.$tuos.auth
        .register(_.omit(data, ['cpass']))
        .then((e) => {
          this.serv = e
          this.$store.commit('accessToken', e.token)
        })
        .catch(
          () => (this.serv = { type: 'error', message: 'Unknown error occur.' })
        )
        .finally(() => {
          this.loading = false
        })
    },
    gotoHome () {
      try {
        window.location.href = '/'
      } catch {
        this.$router.push('/')
      }
    },
    async fetchUserData () {
      this.$store.commit('userdataState', 'fetching')
      return await this.$tuos.auth.userMe()
        .then(e => {
          if (e.type === 'error') throw Error('Error Server Response')
          const data = _.pick(e, ['user', 'name', 'email', '_id', 'phone'])
          this.$store.commit('userdata', data)
          this.$store.commit('userdataState', 'success')
          return data
        })
        .catch((e) => {
          console.error(e)
          this.$store.commit('userdataState', 'error')
        })
    },
    async fetchCurUserData () {
      const username = () => this.$router.currentRoute.value.params.user
      this.$store.commit('curUserDataState', 'fetching')
      return await this.$tuos.auth.userName(username())
        .then(e => {
          if (e.type === 'error') throw Error('Error Server Response')
          const data = _.pick(e, ['user', 'name', '_id'])
          this.$store.commit('curUserData', data)
          this.$store.commit('curUserDataState', 'success')
          return data
        })
        .catch((e) => {
          console.error(e)
          this.$store.commit('curUserDataState', 'error')
        })
    }
  },
  watch: {
    accessToken: {
      handler: ['accessTokenHandler', 'accessTokenValidateChange'],
      immediate: true
    },
    authenticated: {
      handler: 'onAuthStateChanged',
      immediate: true
    }
  }
}
export default { proto, mixin }
