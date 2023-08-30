import { Module } from 'vuex';
import { ProductsState, GlobalState } from '@/types/interfaces/states';
import actions from '@/store/products/actions';
import mutations from '@/store/products/mutations';
import getters from '@/store/products/getters';

const productsModule: Module<ProductsState, GlobalState> = {
  state: {
    products: [],
    cart: [],
  },
  mutations,
  actions,
  getters,
};

export default productsModule;
