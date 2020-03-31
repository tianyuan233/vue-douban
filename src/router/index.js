import Vue from 'vue';
import VueRouter from 'vue-router';
import store from 'store';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/topic/:id',
    name: 'Topic',
    component: () => import(/* webpackChunkName: "about" */ '../views/Topic.vue'),

  },
  {
    path: '/profile',
    name: 'Profile',
    beforeEnter: (to, from, next) => {
      // ...
      if (!store.get('loginname')) {
        next('/login');
      } else {
        next();
      }
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue'),

  },
  {
    path: '/collect',
    name: 'Collect',
    beforeEnter: (to, from, next) => {
      // ...
      if (!store.get('loginname')) {
        next('/login');
      } else {
        next();
      }
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Collect.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
