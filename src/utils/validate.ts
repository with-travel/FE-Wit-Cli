export const validateEmail = (email: string) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhoneNumber = (phoneNumber: string) => {
  const re = /^01[016789]-\d{3,4}-\d{4}$/;
  return re.test(phoneNumber);
};
