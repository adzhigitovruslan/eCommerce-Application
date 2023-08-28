import { createStore } from 'vuex';
import customerModule from '@/store/customer/index';
import productsModule from '@/store/products/index';

export default createStore({
  modules: {
    customer: customerModule,
    products: productsModule,
  },
});
