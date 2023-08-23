import { GetterTree } from 'vuex';
import { CustomerState } from '@/types/interfaces/states';

const getters: GetterTree<CustomerState, undefined> = {
  getIsLoggedIn(state) {
    return state.isLoggedIn;
  },
  getCurrentUserFirstName(state) {
    return state.currentUserFirstName;
  },
};

export default getters;
