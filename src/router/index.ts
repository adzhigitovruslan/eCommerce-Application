import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import UserRegistration from '@/views/auth/UserRegistration.vue';

// const UserSignup = () => '@/views/auth/AuthPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/signup',
    component: UserRegistration,
  },
  // {
  //   path: '/login',
  //   component: CoachRegistration,
  //   meta: { requiresAuth: true },
  // },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "cart" */ '../views/CartView.vue'),
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: () => import(/* webpackChunkName: "catalog" */ '../views/CatalogView.vue'),
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: () => import(/* webpackChunkName: "not-found" */ '../views/NotFoundView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return (
      savedPosition ||
      new Promise((resolve) => {
        setTimeout(() => resolve({ top: 0, behavior: 'smooth' }), 1000);
      })
    );
  },
});

export default router;
