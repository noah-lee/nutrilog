export const convertStringToPositiveInteger = (value: string) => {
  if (value === "") {
    return "";
  }

  if (/^[1-9]\d*$/.test(value)) {
    return value;
  }

  return "";
};
