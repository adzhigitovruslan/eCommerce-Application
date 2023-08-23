import actions from '@/store/customer/actions';
import mutations from '@/store/customer/mutations';
import getters from '@/store/customer/getters';
import { Module } from 'vuex';
import { CustomerState } from '@/types/interfaces/states';

const customerModule: Module<CustomerState, undefined> = {
  namespaced: true,
  state() {
    return {
      isLoggedIn: false,
      currentUserFirstName: '',
      currentUserId: '',
    };
  },
  getters,
  actions,
  mutations,
};

export default customerModule;
