import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Document from '../views/Document.vue';
import Search from '../views/Search.vue';
import Favorites from '../views/Favorites.vue';
import Create from '../views/Create.vue';
import authGuard from '../auth/authGuard';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: authGuard,
  },
  {
    path: '/documents/:id',
    name: 'Document',
    component: Document,
    props: true,
    beforeEnter: authGuard,
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: Favorites,
    beforeEnter: authGuard,
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    beforeEnter: authGuard,
  },
  {
    path: '/create',
    name: 'Create',
    component: Create,
    beforeEnter: authGuard,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
