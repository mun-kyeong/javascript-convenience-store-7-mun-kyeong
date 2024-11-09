import { readProducts } from "../src/utils/readDocs.js";

describe("Docs파일 읽어오기", () => {
  let products;
  beforeEach(async () => {
    products = await readProducts();
  });

  test("products.md 파일에서 첫 번째 라인 읽어오기", () => {
    expect(products[0]).toEqual(["name", "price", "quantity", "promotion"]);
  });

  test.each([
    [1, ["콜라", "1000", "10", "탄산2+1"]],
    [2, ["콜라", "1000", "10", "null"]],
    [5, ["오렌지주스", "1800", "9", "MD추천상품"]],
  ])("products.md 파일에서 %d번째 라인 읽어오기", (index, expected) => {
    expect(products[index]).toEqual(expected);
  });
});
