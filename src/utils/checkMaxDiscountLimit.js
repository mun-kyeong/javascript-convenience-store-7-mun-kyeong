export const checkMaxDiscountLimit = (price) => {
  const maxDiscount = 8_000;
  return price > maxDiscount;
};
