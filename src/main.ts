import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import BaseAuth from '@/components/ui/auth/BaseAuth.vue';
import BaseButton from '@/components/ui/auth/BaseButton.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircleXmark, faSearch, faDollarSign, faCartShopping } from '@fortawesome/free-solid-svg-icons';
library.add(faSearch, faDollarSign, faCartShopping, faCircleXmark);

const app = createApp(App);

app.component('base-auth-button', BaseButton);
app.component('base-auth-wrapper', BaseAuth);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(store);
app.use(router);
app.mount('#app');
