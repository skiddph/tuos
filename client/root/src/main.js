import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import layouts from './layouts'
import directives from './directives'
import tuos from './tuos'
import store from './store'

import './assets/css/font-awesome.min.css'
import './styles/global.scss'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(layouts)
app.use(directives)
app.use(tuos,{devHost: 'http://localhost:8080'})
app.mount('#app')