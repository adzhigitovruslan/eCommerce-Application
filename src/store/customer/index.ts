import mutations from '@/store/customer/mutations';
import { LoginPayload, SingUpPayload } from '@/types/interfaces/api';
import { Module } from 'vuex';

interface CustomerState {
  isLoggedIn: boolean;
  currentUserFirstName: string;
  currentUserId: string;
}

const customerModule: Module<CustomerState, undefined> = {
  namespaced: true,
  state() {
    return {
      isLoggedIn: false,
      currentUserFirstName: '',
      currentUserId: '',
    };
  },
  getters: {
    getIsLoggedIn(state) {
      return state.isLoggedIn;
    },
    getCurrentUserFirstName(state) {
      return state.currentUserFirstName;
    },
  },
  mutations,
  actions: {
    login(context, payload: LoginPayload) {
      context.commit('login', payload);
    },
    logout(context) {
      context.commit('logout');
    },
    singUp(context, payload: SingUpPayload) {
      context.commit('singUp', payload);
    },
  },
};

export default customerModule;
