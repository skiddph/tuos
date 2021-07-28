import lo from './default.vue'
import user from './user.vue'
export default {
    install: (app) => {
        app.component('lo-default',lo)
        app.component('lo-user',user)
    }    
}