import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from '@/utiles/BuildClient';
import { LoginPayload, SingUpPayload } from '@/types/interfaces/api';

interface GlobalState {
  isLoggedIn: boolean;
  currentUserFirstName: string;
  currentUserId: string;
}

const projectKey = process.env.VUE_APP_PRJ_KEY;

export default {
  login(state: GlobalState, payload: LoginPayload) {
    if (state.isLoggedIn) return;

    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: `${projectKey}`,
    });
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
        const firstNameUser = body.customer.firstName || 'Anonym';

        state.currentUserId = body.customer.id;
        state.currentUserFirstName = firstNameUser;
        state.isLoggedIn = true;
      })
      .catch(console.error);
  },
  logout(state: GlobalState) {
    state.currentUserId = '';
    state.currentUserFirstName = '';
    state.isLoggedIn = false;
  },
  singUp(state: GlobalState, payload: SingUpPayload) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: `${projectKey}`,
    });

    const doCustomer = () => {
      return apiRoot.customers().post(payload).execute();
    };

    doCustomer()
      .then(({ body }) => {
        console.log(body);
        state.currentUserFirstName = payload.body.firstName;
        state.isLoggedIn = true;
      })
      .catch(console.error);
  },
};
