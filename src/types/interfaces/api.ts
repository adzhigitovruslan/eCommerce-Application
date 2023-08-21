export interface LoginPayload {
  email: string;
  password: string;
}

export interface SingUpPayload {
  body: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    addresses: [
      {
        country: string;
        city: string;
        streetName: string;
        postalCode: string;
        phone: string;
      },
      {
        country: string;
        city: string;
        streetName: string;
        postalCode: string;
        phone: string;
      },
    ];
    shippingAddresses: number[];
    billingAddresses: number[];
  };
}
