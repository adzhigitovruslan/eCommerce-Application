import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import BaseAuth from '@/components/ui/auth/BaseAuth.vue';
import BaseButton from '@/components/ui/auth/BaseButton.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faCircleXmark,
  faDollarSign,
  faSearch,
  faCartShopping,
  faCircle,
  faCircleDot,
} from '@fortawesome/free-solid-svg-icons';
library.add(faDollarSign, faSearch, faCartShopping, faCircle, faCircleDot, faCircleXmark);
import { clickOutSide as vClickOutSide } from '@mahdikhashan/vue3-click-outside';

const app = createApp(App);

app.component('base-auth-button', BaseButton);
app.component('base-auth-wrapper', BaseAuth);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(store);
app.use(router);
app.directive('click-out-side', vClickOutSide);
app.mount('#app');
