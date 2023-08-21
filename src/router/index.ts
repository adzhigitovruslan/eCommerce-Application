import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import UserRegistration from '@/views/auth/UserRegistration.vue';
import UserLogin from '@/views/auth/UserLogin.vue';
import TheMainPage from '@/components/layout/TheMainPage.vue';
import AuthLayout from '@/components/layout/TheAuthLayout.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    component: TheMainPage,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView,
      },
      {
        path: 'about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import(/* webpackChunkName: "cart" */ '../views/CartView.vue'),
      },
      {
        path: 'catalog',
        name: 'catalog',
        component: () => import(/* webpackChunkName: "catalog" */ '../views/CatalogView.vue'),
      },
    ],
  },
  {
    path: '/',
    name: 'account-layout',
    component: AuthLayout,
    children: [
      {
        path: '/',
        redirect: 'login',
      },
      {
        path: '/signup',
        name: 'signup',
        component: UserRegistration,
      },
      {
        path: '/login',
        name: 'login',
        component: UserLogin,
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: () => import(/* webpackChunkName: "not-found" */ '../views/NotFoundView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      if (to.hash) {
        setTimeout(() => {
          const element = document.querySelector(to.hash);

          if (element) {
            resolve({
              el: to.hash,
              behavior: 'smooth',
            });
          } else {
            console.error(`Element with selector ${to.hash} not found.`);
            resolve(savedPosition || { left: 0, top: 0 });
          }
        }, 2000);
      } else {
        resolve(savedPosition || { left: 0, top: 0 });
      }
    });
  },
});

export default router;
