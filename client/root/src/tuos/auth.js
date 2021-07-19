import axios from "axios";
import store from '../store';
import { mapState } from 'vuex';

import ls from 'store'
const proto = function (options) {
    const { host } = options;

    const urls = {
        login: '/api/auth/login',
        register: '/api/auth/register'
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

    return { login }
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
            const originalState = store.state
            for (let x in originalState) {
                this.$store.commit(x, originalState[ x ])
            }
            ls.clearAll()
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