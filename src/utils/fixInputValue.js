export const fixValue = (value) => {
  return value && value.toString().indexOf(",") > -1 ? value.toString().replace(/,/g, ".") : value;
};
