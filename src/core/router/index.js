import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@views/Home.vue')
    },
    {
        path: '/vacancies_list',
        name: 'VacanciesList',
        component: () => import('@views/VacanciesList.vue')
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('@views/Profile.vue')
    },
    {
        path: '/settings',
        name: 'Settings',
        component: () => import('@views/Settings.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@views/AboutCompany.vue')
    },
    {
        path: '/vacancy/:id',
        name: 'Vacancy',
        component: () => import('@views/Vacancy.vue')
    },
    {
        path: '/vacancies_favorite',
        name: 'VacanciesListFavorite',
        component: () => import('@views/VacanciesListFavorite.vue')
    },
    {
        path: '/cv',
        name: 'CV',
        component: () => import('@views/CV.vue')
    },
    {
        path: '/404',
        name: 'NotFound',
        component: () => import('@views/NotFound.vue')
    },
    {
        path: '*',
        redirect: '/404'
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
