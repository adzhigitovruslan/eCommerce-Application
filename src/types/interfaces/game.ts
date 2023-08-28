export interface Game {
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
            w: number;
            h: number;
          };
          label: string;
          url: string;
        }>;
      };
    };
  };
}
