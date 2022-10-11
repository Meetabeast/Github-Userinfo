import { createRouter, createWebHistory } from "vue-router";

import Home from "../components/Home.vue";
import User from "../components/User.vue";

const routes = [
    {
        name: 'Home',
        path: '/',
        component: Home
    },
    {
        name: 'User',
        path: '/user/:id',
        component: User
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    parseQuery: false,
    mode: 'history'
});

export default router;