export function validateLastName(lastName: string) {
  return /^[a-zA-Z]+$/.test(lastName);
}
