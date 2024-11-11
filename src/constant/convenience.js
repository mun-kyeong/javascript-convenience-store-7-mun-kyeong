import path from "path";

const PRODUCTS_FILE = (fileName) =>
  path.join(process.cwd(), `public/${fileName}.md`);

const RECEPT = {
  startLine: "==============W 편의점================",
  header: "상품명		수량	금액",
  presentLine: "=============증	정===============",
  line: "====================================",
  printOption: (name, quantity, price) => {
    return `${name}		${quantity}	${price}`;
  },
};

const PROMOTION_PRODUCT = (product) => `${product}pro`;

export { PRODUCTS_FILE, PROMOTION_PRODUCT, RECEPT };
