export const validateEmail = (value) => {
  return new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(value);
};
