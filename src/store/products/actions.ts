import { ProductsState, GlobalState } from '@/types/interfaces/states';
import { ProductItem } from '@/types/interfaces/productItem';
import { ActionContext } from 'vuex';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from '@/utils/BuildClient';

const projectKey = process.env.VUE_APP_PRJ_KEY;

export default {
  async fetchProducts({ commit }: ActionContext<ProductsState, GlobalState>) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: `${projectKey}`,
    });

    const doFetch = () => {
      return apiRoot.products().get().execute();
    };

    try {
      const response = await doFetch();
      const products = response.body.results;

      commit('setProducts', products);

      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
  addProductToCart(context: ActionContext<ProductsState, GlobalState>, product: ProductItem) {
    const cartItem = context.state.cart.find((item) => item.id === product.key);

    if (!cartItem) {
      context.commit('pushProductToCart', product.key);
    } else {
      context.commit('incrementItemQuantity', cartItem);
    }
    context.commit('decrementProductInventory', product);
  },
};
