import { createStore } from 'vuex';
import mutations from '@/store/mutations';
import LoginPayload from '../../types/interfaces/api';

export interface GlobalState {
  isLoggedIn: boolean;
  currentUserFirstName: string;
  currentUserId: string;
}

export default createStore({
  state() {
    return {
      isLoggedIn: false,
      currentUserFirstName: '',
      currentUserId: '',
    };
  },
  getters: {
    getIsLoggedIn(state) {
      console.log(state.currentUserId);

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
  },
  modules: {},
});
