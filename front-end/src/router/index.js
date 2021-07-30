import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Document from '../views/Document.vue';
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
    path: '/doc/:id',
    name: 'Document',
    component: Document,
    props: true,
    beforeEnter: authGuard,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
