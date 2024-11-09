import path from "path";
const PRODUCTS_FILE = (fileName) =>
  path.join(__dirname, `../../public/${fileName}.md`);

export { PRODUCTS_FILE };
