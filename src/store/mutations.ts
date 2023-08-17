import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from '@/utiles/BuildClient';
import { GlobalState } from '@/store/index';
import { LoginPayload } from '@/types/interfaces/api';

export default {
  login(state: GlobalState, payload: LoginPayload) {
    if (state.isLoggedIn) return;

    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-application' });
    const doCustomer = () => {
      return apiRoot
        .me()
        .login()
        .post({
          body: {
            email: `${payload.email}`,
            password: `${payload.password}`,
          },
        })
        .execute();
    };

    doCustomer()
      .then(({ body }) => {
        state.currentUserId = body.customer.id;

        state.currentUserFirstName = body.customer.firstName || 'Anonym';
        state.isLoggedIn = true;
      })
      .catch(console.error);
  },
  logout(state: GlobalState) {
    state.currentUserId = '';
    state.currentUserFirstName = '';
    state.isLoggedIn = false;
  },
};
