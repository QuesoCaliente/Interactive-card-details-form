export const formatCreditCard = (number: string) => {
  const removeSpaces = number.replace(/\s/g, "");
  const parts = [];
  let i = 0;
  while (i < removeSpaces.length) {
    parts.push(removeSpaces.substring(i, i + 4));
    i += 4;
  }
  return parts.join(" ");
};
