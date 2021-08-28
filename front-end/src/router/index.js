import Vue from 'vue';
import VueRouter from 'vue-router';
import authGuard from '../auth/authGuard';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    beforeEnter: authGuard,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    props: (route) => ({ error: route.query.error }),
    beforeEnter: authGuard,
  },
  {
    path: '/documents/:id',
    name: 'Document',
    component: () => import('../views/Document.vue'),
    props: true,
    beforeEnter: authGuard,
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('../views/Favorites.vue'),
    beforeEnter: authGuard,
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
    beforeEnter: authGuard,
  },
  {
    path: '/create',
    name: 'Create',
    component: () => import('../views/Create.vue'),
    beforeEnter: authGuard,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
