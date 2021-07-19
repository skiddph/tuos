import auth from './auth'
export default {
    install: (app, options) => {
        const prodHost = options.host || '';
        const devHost = options.devHost || prodHost
        const host = import.meta.env.PROD ? prodHost : devHost;

        options = {
            ...options,
            prodHost,
            devHost,
            host
        }

        app.config.globalProperties.$tuos = {
            auth: auth.proto(options)
        }

        app.mixin(auth.mixin)
    }
}