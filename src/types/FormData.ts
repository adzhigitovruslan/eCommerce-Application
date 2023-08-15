export interface DataFormAddress {
  street: string;
  city: string;
  postalCode: string;
  country: string;
  phoneNumber: number | null;
}

export interface DataForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  date: string;
  address: DataFormAddress;
}
