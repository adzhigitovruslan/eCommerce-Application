import { ActionTree } from 'vuex';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from '@/utils/BuildClient';
import { GlobalState, CartState } from '@/types/interfaces/states';

const projectKey = process.env.VUE_APP_PRJ_KEY;

const actions: ActionTree<CartState, GlobalState> = {
  async createCart(context, payload) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: `${projectKey}`,
    });

    const doCustomer = () => {
      return apiRoot
        .me()
        .carts()
        .post({
          body: {
            currency: 'USD',
          },
        })
        .execute();
    };

    return doCustomer()
      .then(({ body }) => {
        console.log(body);

        return body;
      })
      .catch((err) => {
        throw err;
      });
  },
};

export default actions;
