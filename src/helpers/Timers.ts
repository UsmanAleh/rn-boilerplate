export const Wait = (ms = 500) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
