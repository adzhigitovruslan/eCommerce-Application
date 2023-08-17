export const calculateAge = (rawDate: string) => {
  let cleanedDate = rawDate.toString(); // Преобразуем в строку

  cleanedDate = cleanedDate.replace(/\D/g, ''); // Удаляем все нечисловые символы

  if (cleanedDate.length === 8) {
    const day = parseInt(cleanedDate.slice(0, 2));
    const month = parseInt(cleanedDate.slice(2, 4)) - 1;
    const year = parseInt(cleanedDate.slice(4, 8));

    const birthDate = new Date(year, month, day);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthDate.getFullYear();

    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  return -1; // Возвращаем -1, если данные некорректны
};
