import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
