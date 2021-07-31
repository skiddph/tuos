import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import layouts from './layouts'
import components from './components'
import directives from './directives'
import wireframes from './wireframes'
import tuos from './tuos'
import store from './store'

import './assets/css/font-awesome.min.css'
import './styles/index.scss'
import './styles/global.scss'

const app = createApp(App)

app.use(store.store)
app.use(router)
app.use(components)
app.use(layouts)
app.use(directives)
app.use(wireframes)
app.use(tuos, { devHost: 'http://localhost:8080' })
app.mount('#app')