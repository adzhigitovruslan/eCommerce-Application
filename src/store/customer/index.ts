import actions from '@/store/customer/actions';
import mutations from '@/store/customer/mutations';
import getters from '@/store/customer/getters';

const customerModule = {
  namespaced: true,
  state() {
    return {
      isLoggedIn: false,
      currentUserFirstName: '',
      currentUserId: '',
      user: {
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        address: [
          {
            streetName: '',
            city: '',
            phone: '',
            postalCode: '',
            country: '',
            id: '',
          },
          {
            streetName: '',
            city: '',
            phone: '',
            postalCode: '',
            country: '',
            id: '',
          },
        ],
      },
      version: null,
    };
  },
  getters,
  actions,
  mutations,
};

export default customerModule;
