export interface DataFormAddress {
  street: string;
  city: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  date: string;
  billingAddress: DataFormAddress;
  shippingAddress: DataFormAddress;
}
