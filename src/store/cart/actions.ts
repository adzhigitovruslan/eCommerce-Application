import { ActionTree } from 'vuex';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient, ctpAnonymousClient } from '@/utils/BuildClient';
import { GlobalState, CartState } from '@/types/interfaces/states';

const projectKey = process.env.VUE_APP_PRJ_KEY;
const apiRoot = createApiBuilderFromCtpClient(ctpAnonymousClient).withProjectKey({
  projectKey: `${projectKey}`,
});

const actions: ActionTree<CartState, GlobalState> = {
  async createAnonymousCart(context, payload) {
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
        console.log(body, 'create');

        if (body.id) {
          localStorage.setItem('cartId', body.id);
        }
        context.state.cartId = body.id;

        return body;
      })
      .catch((err) => {
        throw err;
      });
  },
  async updateCart(context, body) {
    return apiRoot
      .me()
      .carts()
      .withId({ ID: context.state.cartId })
      .post({
        body,
      })
      .execute()
      .then(({ body }) => {
        console.log(body, 'update');
        context.state.version = body.version;
        context.commit('setCart', body.lineItems);

        return body;
      })
      .catch((err) => {
        throw err;
      });
  },
};

export default actions;
