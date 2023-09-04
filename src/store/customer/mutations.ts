import { ServerResponse } from '@/types/interfaces/api';
import { CustomerState } from '@/types/interfaces/states';
import { RegisterData } from '@/types/auth/RegisterData';

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
  setLoggedIn(state: CustomerState, payload: { isLoggedInValue: boolean; hasId: string }) {
    state.isLoggedIn = payload.isLoggedInValue;
    state.currentUserId = payload.hasId;
  },
  getUser(state: CustomerState, payload: RegisterData) {
    state.user.firstName = payload.body.firstName;
    state.user.lastName = payload.body.lastName;
    state.user.email = payload.body.email;
    state.user.dateOfBirth = payload.body.dateOfBirth;
    state.version = payload.body.version;
    payload.body.addresses.forEach((obj, index) => {
      state.user.address[index].country = obj.country;
      state.user.address[index].city = obj.city;
      state.user.address[index].phone = obj.phone;
      state.user.address[index].postalCode = obj.postalCode;
      state.user.address[index].streetName = obj.streetName;

      if (obj.id) state.user.address[index].id = obj.id;
    });
  },
  setVersion(state: CustomerState, payload: number) {
    state.version = payload;
  },
};
