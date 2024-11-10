export const parserOrder = (orderString) => {
  return orderString.split(",").map((order) => {
    const [product, quantity] = order.replace(/\[|\]/g, "").split("-");
    return [product, Number(quantity)];
  });
};
