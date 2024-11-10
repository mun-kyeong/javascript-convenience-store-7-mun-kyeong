import path from "path";

const PRODUCTS_FILE = (fileName) =>
  path.join(__dirname, `../../public/${fileName}.md`);

const PROMOTION_PRODUCT = (product) => `${product}pro`;
// TODO : 코드를 작성하다보니 inventory를 production과 일반으로 나누는게 좋아 보임.
// 추후 리팩토링 필요

export { PRODUCTS_FILE, PROMOTION_PRODUCT };
