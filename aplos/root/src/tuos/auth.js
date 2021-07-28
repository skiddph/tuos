import axios from "axios";
import store from '../store';
import { mapState } from 'vuex';
import _ from 'lodash'
import ls from 'store'
const proto = function (options) {
    const { host } = options;

    const urls = {
        login: '/api/auth/login',
        register: '/api/auth/register',
        userMe: '/api/user',
    }

    const url = (u) => host + urls[ u ]

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
        const storeState = ls.get('vuex')
        const accessToken = storeState.accessToken || ""
        const opt = {
            method: 'GET',
            url: url('userMe'),
            headers: {
                authorization: 'Bearer ' + accessToken
            }
        }
        return await axios.request(opt)
            .then(e => e.data)
            .catch((e) => ({ type: 'error', message: 'Unknown error occur.',e }))
    }
    return { login ,register, userMe }
}
const mixin = {
    computed: {
        ...mapState([ 'accessToken', 'authenticated' ])
    },
    methods: {
        accessTokenHandler() { },
        accessTokenValidateChange(token) {
            if (token && typeof token == 'string' && token.length > 0) {
                this.$store.commit('authenticated', true)
            } else {
                this.$store.commit('authenticated', false)
            }
        },
        onAuthStateChanged() { },
        resetStore() {
            ls.clearAll()
            const originalState = store.state
            for (let x in originalState) {
                this.$store.commit(x, originalState[ x ])
            }
        },
        async authFormLogin(data) {
            this.loading = true;
            await this.$tuos.auth
                .login(data)
                .then((e) => {
                    this.serv = e
                    this.$store.commit("accessToken", e.token);
                })
                .catch(
                    () => (this.serv = { type: "error", message: "Unknown error occur." })
                )
                .finally(() => {
                    this.loading = false;
                });
        },
        async authFormRegister(data) {
            if(!Boolean(data.pass) || !Boolean(data.cpass) || data.pass != data.cpass){
                this.serv = { type: "error", message: "Password doesn't match" }
                return;
            }
            this.loading = true;
            await this.$tuos.auth
                .register(_.omit(data, ['cpass']))
                .then((e) => {
                    this.serv = e
                    this.$store.commit("accessToken", e.token);
                })
                .catch(
                    () => (this.serv = { type: "error", message: "Unknown error occur." })
                )
                .finally(() => {
                    this.loading = false;
                });
        },
        gotoHome(){
            try {
                window.location.href = '/'
            } catch {
                this.$router.push('/')
            }
        }
    },
    watch: {
        'accessToken': {
            handler: 'accessTokenHandler',
            immediate: true
        },
        'accessToken': {
            handler: 'accessTokenValidateChange',
            immediate: true
        },
        'authenticated': {
            handler: 'onAuthStateChanged',
            immediate: true
        },
    }
}
export default { proto, mixin }