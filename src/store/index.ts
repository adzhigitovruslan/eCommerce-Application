import { createStore } from 'vuex';
import customerModule from '@/store/customer/index';

export default createStore({
  modules: {
    customer: customerModule,
  },
});
