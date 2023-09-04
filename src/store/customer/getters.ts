import { GetterTree } from 'vuex';
import { CustomerState, GlobalState } from '@/types/interfaces/states';

const getters: GetterTree<CustomerState, GlobalState> = {
  getIsLoggedIn(state) {
    return state.isLoggedIn;
  },
  getCurrentUserFirstName(state) {
    return state.currentUserFirstName;
  },
  getUser(state) {
    return state.user;
  },
  getVersion(state) {
    return state.version;
  },
};

export default getters;
