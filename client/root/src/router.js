import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('./pages-group/Auth.vue'),
            children: [
                {
                    path: "",
                    component: () => import('./pages/Login.vue')
                },
                {
                    path: "login",
                    component: () => import('./pages/Login.vue')
                },
                {
                    path: "register",
                    component: () => import('./pages/Register.vue')
                },
                {
                    path: "logout",
                    component: () => import('./pages/Logout.vue')
                },
            ]
        },
        {
            path: '/user',
            component: () => import('./pages-group/User.vue'),
            children: [
                {
                    path: "home",
                    component: () => import('./pages/Home.vue')
                },
            ]
        }
        
    ]
})
export default router