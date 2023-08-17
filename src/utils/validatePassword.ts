export const validatePassword = (password: string) => {
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  if (passwordPattern.test(password)) {
    return true;
  } else {
    return false;
  }
};
