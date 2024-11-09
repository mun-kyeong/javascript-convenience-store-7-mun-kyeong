import { readDocs, readFileInfo, readProducts } from "../src/utils/readDocs.js";

describe("products.md 파일 읽어오기", () => {
  let products;
  beforeEach(async () => {
    products = await readDocs("products");
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

describe("promotions.md 파일 읽어오기", () => {
  let promotions;
  beforeEach(async () => {
    promotions = await readDocs("promotions");
  });

  test("promotions.md 파일에서 첫 번째 라인 읽어오기", () => {
    expect(promotions[0]).toEqual([
      "name",
      "buy",
      "get",
      "start_date",
      "end_date",
    ]);
  });

  test.each([
    [1, ["탄산2+1", "2", "1", "2024-01-01", "2024-12-31"]],
    [2, ["MD추천상품", "1", "1", "2024-01-01", "2024-12-31"]],
    [3, ["반짝할인", "1", "1", "2024-11-01", "2024-11-30"]],
  ])("products.md 파일에서 %d번째 라인 읽어오기", (index, expected) => {
    expect(promotions[index]).toEqual(expected);
  });
});
