import actions from '@/store/customer/actions';
import mutations from '@/store/customer/mutations';
import getters from '@/store/customer/getters';

const cartModule = {
  namespaced: true,
  state() {
    return {
      cart: [],
    };
  },
  getters,
  actions,
  mutations,
};

export default cartModule;
