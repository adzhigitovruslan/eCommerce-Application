export interface Game {
  key: number;
  name: string;
  productType: {
    typeId: string;
    key: string;
  };
  slug: string;
  price: number;
  discount: number;
  description: string;
  categories: {
    typeId: string;
    key: string;
  };
  platform: string[];
  'activation region': string;
  'system requirements': {
    'operating system': string;
    processor: string;
    memory: string;
    'graphics card': string;
    'disk space': string;
  };
  image: string;
}
