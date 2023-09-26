export interface CartItem {
  id: string;
  quantity: number;
  name: {
    'en-US': string;
  };
  productId: string;
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
  variant: {
    images: imagesItem[];
  };
}

interface imagesItem {
  label: string;
  url: string;
}
