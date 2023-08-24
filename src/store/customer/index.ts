import actions from '@/store/customer/actions';
import mutations from '@/store/customer/mutations';
import getters from '@/store/customer/getters';

const customerModule = {
  namespaced: true,
  state() {
    return {
      isLoggedIn: localStorage.getItem('isLoggedIn') || false,
      currentUserFirstName: '',
      currentUserId: '',
    };
  },
  getters,
  actions,
  mutations,
};

export default customerModule;
