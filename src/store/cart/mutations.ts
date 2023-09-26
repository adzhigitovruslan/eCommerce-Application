import { MutationTree } from 'vuex';
import { CartState } from '@/types/interfaces/states';

const mutations: MutationTree<CartState> = {
  setCart(state, products: []) {
    state.cart = products;
  },
};

export default mutations;
