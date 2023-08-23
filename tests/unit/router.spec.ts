import { mount, VueWrapper } from '@vue/test-utils';
import { Router, createRouter, createWebHistory } from 'vue-router';
import App from '@/App.vue';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import CartView from '@/views/CartView.vue';
import CatalogView from '@/views/CatalogView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import { Component } from 'vue';

const setupRouter = () => {
  return createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', name: 'home', component: HomeView },
      { path: '/about', name: 'about', component: AboutView },
      { path: '/cart', name: 'cart', component: CartView },
      { path: '/catalog', name: 'catalog', component: CatalogView },
      { path: '/:catchAll(.*)', component: NotFoundView },
    ],
  });
};

const setupWrapper = (router: Router) => {
  return mount(App, {
    global: {
      plugins: [router],
    },
  });
};

const navigateAndAssertViewExists = async (
  router: Router,
  wrapper: VueWrapper,
  path: string,
  viewComponent: Component,
) => {
  await router.push(path);
  await router.isReady();
  expect(wrapper.findComponent(viewComponent).exists()).toBe(true);
};

describe('App', () => {
  let router: Router;
  let wrapper: VueWrapper;

  beforeEach(() => {
    router = setupRouter();
    wrapper = setupWrapper(router);
  });

  it('renders the home view when the route is /', async () => {
    await navigateAndAssertViewExists(router, wrapper, '/', HomeView);
  });

  it('renders the about view when the route is /about', async () => {
    await navigateAndAssertViewExists(router, wrapper, '/about', AboutView);
  });

  it('renders the cart view when the route is /cart', async () => {
    await navigateAndAssertViewExists(router, wrapper, '/cart', CartView);
  });

  it('renders the catalog view when the route is /catalog', async () => {
    await navigateAndAssertViewExists(router, wrapper, '/catalog', CatalogView);
  });

  it('renders the not-found view when the route is unknown', async () => {
    await navigateAndAssertViewExists(router, wrapper, '/unknown', NotFoundView);
  });
});
