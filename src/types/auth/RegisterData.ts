interface DataFormAddress {
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

interface BodyForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  addresses: DataFormAddress[];
  billingAddresses: number[];
  shippingAddresses: number[];
}

export interface RegisterData {
  body: BodyForm;
}
