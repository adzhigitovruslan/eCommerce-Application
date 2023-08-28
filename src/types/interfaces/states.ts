import { Game } from '@/types/interfaces/game';
import { CartItem } from '@/types/interfaces/cartItem';

export interface CustomerState {
  isLoggedIn: boolean;
  currentUserFirstName: string;
  currentUserId: string;
}

export interface GlobalState {
  customer: CustomerState;
  products: ProductsState;
}

export interface ProductsState {
  products: Game[];
  cart: CartItem[];
}
