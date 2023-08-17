export function validateFirstName(firstName: string) {
  return /^[a-zA-Z]+$/.test(firstName);
}
