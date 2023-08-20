export const validatePassword = (password: string) => {
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  if (passwordPattern.test(password)) {
    return true;
  } else {
    return false;
  }
};

export function validateLastName(lastName: string) {
  return /^[a-zA-Z]+$/.test(lastName);
}

export function validateFirstName(firstName: string) {
  return /^[a-zA-Z]+$/.test(firstName);
}

export const formatDate = (rawDate: string) => {
  let cleanedDate = rawDate.replace(/\D/g, '');

  if (cleanedDate.length >= 3 && cleanedDate.length <= 4) {
    cleanedDate = cleanedDate.slice(0, 2) + '/' + cleanedDate.slice(2);
  } else if (cleanedDate.length >= 5) {
    cleanedDate = cleanedDate.slice(0, 2) + '/' + cleanedDate.slice(2, 4) + '/' + cleanedDate.slice(4, 8);
  }

  return cleanedDate;
};

export const formatPhoneNumber = (inputValue: string, countryCode: string) => {
  type CodeType = { [key: string]: string };

  const code: CodeType = {
    ru: '+7',
    usa: '+1',
  };

  const phoneNumber = inputValue.replace(/\+\d|\D/g, '');
  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength < 1) {
    return '';
  }

  if (phoneNumberLength < 4) return `${code[countryCode.toLocaleLowerCase()]} (${phoneNumber}`;

  if (phoneNumberLength < 7) {
    return `${code[countryCode.toLocaleLowerCase()]} (${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }

  return `${code[countryCode.toLocaleLowerCase()]} (${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
    3,
    6,
  )}-${phoneNumber.slice(6, 10)}`;
};

export function validateCity(city: string) {
  return /^[a-zA-Z]+$/.test(city);
}

type CountryValidators = {
  [key: string]: {
    placeholder: string;
    phoneMask: string;
  };
};

export const validateCountry: CountryValidators = {
  USA: {
    placeholder: 'Enter ZIP Code (e.g., 12345)',
    phoneMask: '+1 (###) ###-####',
  },
  RU: {
    placeholder: 'Enter Postal Code (e.g., 123456)',
    phoneMask: '+7 (###) ###-####',
  },
};
