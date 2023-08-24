import { LoginPayload, SingUpPayload } from '@/types/interfaces/api';
import { ActionTree } from 'vuex';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from '@/utils/BuildClient';
import { CustomerState, GlobalState } from '@/types/interfaces/states';

const projectKey = process.env.VUE_APP_PRJ_KEY;

const actions: ActionTree<CustomerState, GlobalState> = {
  async login(context, payload: LoginPayload) {
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

    return doCustomer()
      .then(({ body }) => {
        context.commit('SET_USER', body);

        return body;
      })
      .catch((err) => {
        throw err;
      });
  },
  logout(context) {
    context.commit('logout');
  },
  async singUp(context, payload: SingUpPayload) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: `${projectKey}`,
    });

    const doCustomer = () => {
      return apiRoot.customers().post(payload).execute();
    };

    return doCustomer()
      .then(({ body }) => {
        context.commit('SIGN_UP', body);

        return body;
      })
      .catch((err) => {
        throw err;
      });
  },
};

export default actions;
