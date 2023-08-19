import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDollarSign, faSearch, faCartShopping, faCircle, faCircleDot } from '@fortawesome/free-solid-svg-icons';

library.add(faSearch, faDollarSign, faCartShopping, faCircle, faCircleDot);

createApp(App).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app');
