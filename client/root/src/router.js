import { createRouter, createWebHistory } from 'vue-router'

import Auth from './pages-group/Auth.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import Logout from './pages/Logout.vue'
import User from './pages-group/User.vue'
import Home from './pages/Home.vue'
import Settings from './pages-group/Settings.vue'
import Profile from './pages/Profile.vue'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Auth,
            children: [
                {
                    path: "",
                    component: Login
                },
                {
                    path: "login",
                    component: Login
                },
                {
                    path: "register",
                    component: Register
                },
                {
                    path: "logout",
                    component: Logout
                },
            ]
        },
        {
            path: '/user',
            component: User,
            children: [
                {
                    path: "/home",
                    component: Home
                },
                {
                    path: "/settings",
                    component: Settings,
                    children: [
                        {
                            path: "",
                            component: Profile
                        },
                    ]
                }
            ]
        }
        
    ]
})
export default router