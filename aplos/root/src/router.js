import { createRouter, createWebHistory } from 'vue-router'

import Auth from './pages-group/Auth.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import Logout from './pages/Logout.vue'
import User from './pages-group/User.vue'
import Home from './pages/Home.vue'
import Settings from './pages-group/Settings.vue'
import SettingsProfile from './pages/SettingsProfile.vue'
import SettingsPassword from './pages/SettingsPassword.vue'
import SettingsAccBindings from './pages/SettingsAccBindings.vue'
import UserProfileGroup from './pages-group/UserProfileGroup.vue'
import UserAbout from './pages/UserAbout.vue'

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
                    path: "@:user",
                    component: UserProfileGroup,
                    children: [
                        {
                            path: "about",
                            alias: "",
                            component: UserAbout
                        }
                    ]
                },
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
                            component: SettingsProfile
                        },
                        {
                            path: "bindings",
                            component: SettingsAccBindings
                        },
                        {
                            path: "password",
                            component: SettingsPassword
                        }
                    ]
                }
            ]
        }
        
    ]
})
export default router