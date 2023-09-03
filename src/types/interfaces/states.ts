import { ProductItem } from '@/types/interfaces/productItem';
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
  products: ProductItem[];
  cart: CartItem[];
  priceRange: number;
  selectedCategories: {
    [key: string]: {
      value: string;
      selected: boolean;
    };
  };
}
