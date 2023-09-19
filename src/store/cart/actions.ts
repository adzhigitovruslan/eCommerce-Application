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
  async addLineItem(context, body) {
    return apiRoot
      .me()
      .carts()
      .withId({ ID: context.state.cartId })
      .post({
        body,
      })
      .execute()
      .then(({ body }) => {
        context.state.version = body.version;
        context.commit('setCart', body.lineItems);
        context.state.totalPrice = body.totalPrice.centAmount;

        if (body.totalLineItemQuantity) context.state.totalLineItemQuantity = body.totalLineItemQuantity;

        return body;
      })
      .catch((err) => {
        throw err;
      });
  },
  async removeLineItem(context, body) {
    return apiRoot
      .me()
      .carts()
      .withId({ ID: context.state.cartId })
      .post({
        body,
      })
      .execute()
      .then(({ body }) => {
        context.state.version = body.version;
        context.commit('setCart', body.lineItems);

        return body;
      })
      .catch((err) => {
        throw err;
      });
  },
  async changeLineItemQuantity(context, body) {
    return apiRoot
      .me()
      .carts()
      .withId({ ID: context.state.cartId })
      .post({
        body,
      })
      .execute()
      .then(({ body }) => {
        context.state.version = body.version;

        return body;
      })
      .catch((err) => {
        throw err;
      });
  },
  async addPromocode(context, body) {
    return apiRoot
      .me()
      .carts()
      .withId({ ID: context.state.cartId })
      .post({
        body,
      })
      .execute()
      .then(({ body }) => {
        context.state.version = body.version;
        context.state.promocodeId = body.discountCodes[0].discountCode.id;
        context.state.totalPrice = body.totalPrice.centAmount;

        return body;
      })
      .catch((err) => {
        throw err;
      });
  },
  async removePromocode(context, body) {
    return apiRoot
      .me()
      .carts()
      .withId({ ID: context.state.cartId })
      .post({
        body,
      })
      .execute()
      .then(({ body }) => {
        context.state.version = body.version;
        context.state.totalPrice = body.totalPrice.centAmount;

        return body;
      })
      .catch((err) => {
        throw err;
      });
  },
};

export default actions;
