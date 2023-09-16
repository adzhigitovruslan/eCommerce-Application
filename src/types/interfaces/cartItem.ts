export interface CartItem {
  id: number;
  quantity: number;
  name: {
    'en-US': string;
  };
  price: {
    value: {
      centAmount: number;
      fractionDigits: number;
    };
    discounted?: {
      value: {
        centAmount: number;
        fractionDigits: number;
      };
    };
  };
}
