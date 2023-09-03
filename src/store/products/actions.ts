import { ProductsState, GlobalState } from '@/types/interfaces/states';
import { ProductItem } from '@/types/interfaces/productItem';
import { ActionContext } from 'vuex';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from '@/utils/BuildClient';

const projectKey = process.env.VUE_APP_PRJ_KEY;

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: `${projectKey}`,
});

export default {
  async fetchProducts({ commit, state }: ActionContext<ProductsState, GlobalState>) {
    const priceRange = state.priceRange;
    const selectedCategoryValues: string = Object.values(state.selectedCategories)
      .filter((category) => category.selected && category.value)
      .map((category) => `"${category.value}"`)
      .join(',');

    try {
      const products = await doFetch(apiRoot, priceRange, selectedCategoryValues);

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

async function doFetch(apiRoot, priceRange: number, selectedCategoryValues: string | null = null) {
  const queryParams1 = {
    filter: `categories.id:${selectedCategoryValues}`,
  };
  const queryParams2 = {
    filter: `variants.price.centAmount:range(* to ${priceRange * 100})`,
  };

  const response1 = await apiRoot.productProjections().search().get({ queryArgs: queryParams1 }).execute();
  const response2 = await apiRoot.productProjections().search().get({ queryArgs: queryParams2 }).execute();

  const results1 = response1.body.results;
  const results2 = response2.body.results;

  console.log(results1, results2);

  function isInResults2(element: ProductItem) {
    return results2.some((result: ProductItem) => result.id === element.id);
  }

  const commonResults = results1.filter(isInResults2);

  return commonResults;
}
