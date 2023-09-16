import { GetterTree } from 'vuex';
import { GlobalState } from '@/types/interfaces/states';
import { CartState } from '@/types/interfaces/states';

const getters: GetterTree<CartState, GlobalState> = {
  getCartQuantity(state) {
    let sum = 0;

    state.cart.forEach((obj) => {
      sum += obj.quantity;
    });

    return sum;
  },
  cartProducts(state) {
    return state.cart;
  },
};

export default getters;
