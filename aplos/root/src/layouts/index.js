import lo from './default.vue'
import user from './user.vue'
import settings from './settings.vue'
export default {
    install: (app) => {
        app.component('lo-default',lo)
        app.component('lo-user',user)
        app.component('lo-settings',settings)
    }    
}