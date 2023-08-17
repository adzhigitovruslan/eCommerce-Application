export function validateCity(city: string) {
  return /^[a-zA-Z]+$/.test(city);
}
