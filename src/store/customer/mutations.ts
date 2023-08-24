import { ServerResponse } from '@/types/interfaces/api';
import { CustomerState } from '@/types/interfaces/states';

export default {
  SET_USER(state: CustomerState, body: ServerResponse) {
    const firstNameUser = body.customer.firstName || 'New User';

    state.currentUserId = body.customer.id;
    state.currentUserFirstName = firstNameUser;
    state.isLoggedIn = true;
  },
  SIGN_UP(state: CustomerState, body: ServerResponse) {
    state.currentUserFirstName = body.customer.firstName;
    state.isLoggedIn = true;
  },
  logout(state: CustomerState) {
    state.currentUserId = '';
    state.currentUserFirstName = '';
    state.isLoggedIn = false;
    localStorage.removeItem('isLoggedIn');
  },
  setLoggedIn(state: CustomerState, payload: boolean) {
    state.isLoggedIn = payload;
  },
};
