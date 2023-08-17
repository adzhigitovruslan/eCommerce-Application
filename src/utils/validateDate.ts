export const validateDate = (rawDate: string) => {
  let cleanedDate = rawDate.replace(/\D/g, '');

  if (cleanedDate.length >= 3 && cleanedDate.length <= 4) {
    cleanedDate = cleanedDate.slice(0, 2) + '/' + cleanedDate.slice(2);
  } else if (cleanedDate.length >= 5) {
    cleanedDate = cleanedDate.slice(0, 2) + '/' + cleanedDate.slice(2, 4) + '/' + cleanedDate.slice(4, 8);
  }

  return cleanedDate;
};
