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
    props: true,
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
    meta: {
      title: 'CI Wiki - Favorites',
    },
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
    beforeEnter: authGuard,
    meta: {
      title: 'CI Wiki - Search',
    },
  },
  {
    path: '/create',
    name: 'Create',
    component: () => import('../views/Create.vue'),
    beforeEnter: authGuard,
    meta: {
      title: 'CI Wiki - New Document',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const title = to.meta.title || 'CloudIntelligence - Wiki';
  document.title = title;
  return next();
});

export default router;
