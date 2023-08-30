export interface ProductItem {
  id: string;
  key: number;
  discount?: number;
  productType: {
    id: string;
    typeId: string;
  };
  masterData: {
    current: {
      slug: string;
      name: Record<string, string>;
      description: Record<string, string>;
      masterVariant: {
        prices: Array<{
          value: {
            centAmount: number;
          };
          discounted?: {
            discount: {
              typeId: string;
              id: string;
            };
            value: {
              type: string;
              currencyCode: string;
              centAmount: number;
              fractionDigits: number;
            };
          };
        }>;
        attributes: Array<{
          name: string;
          value: string | number | boolean | Record<string, unknown>;
        }>;
        availability: {
          availableQuantity: number;
          isOnStock: boolean;
        };
        images: Array<{
          dimensions: {
            width: number;
            height: number;
          };
          label: string;
          url: string;
        }>;
      };
    };
  };
}
