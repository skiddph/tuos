import axios from "axios";

export default function (options) {
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