import { GetterTree } from 'vuex';
import { GlobalState } from '@/types/interfaces/states';
import { CartState } from '@/types/interfaces/states';

const getters: GetterTree<CartState, GlobalState> = {
  getCartQuantity(state) {
    return state.totalLineItemQuantity;
  },
  cartProducts(state) {
    return state.cart;
  },
  getTotalPrice(state) {
    return state.totalPrice;
  },
};

export default getters;
