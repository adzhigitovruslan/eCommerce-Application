import { MutationTree } from 'vuex';
import { ProductsState } from '@/types/interfaces/states';
import { Game } from '@/types/interfaces/game';
import { CartItem } from '@/types/interfaces/cartItem';

const mutations: MutationTree<ProductsState> = {
  setProducts(state, products: Game[]) {
    state.products = products;
  },
  pushProductToCart(state, productId: number) {
    state.cart.push({ id: productId, quantity: 1 });
  },
  incrementItemQuantity(state, cartItem: CartItem) {
    cartItem.quantity++;
  },
  decrementProductInventory(state, product: Game) {
    if (product.masterData.current.masterVariant.availability.availableQuantity > 0) {
      product.masterData.current.masterVariant.availability.availableQuantity--;
    }
  },
};

export default mutations;
