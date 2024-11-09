import { readProducts } from "../src/utils/readDocs";

describe("재고 관리 기능 테스트", () => {
  let products;
  beforeEach(async () => {
    products = await readProducts();
  });

  test.each([
    [1, { name: "콜라", price: 1000, quantity: 10, promotion: "탄산2+1" }],
  ])(
    "Inventory 클래스의 %d 번째 상품이 저장되는지 확인한다.",
    (index, result) => {
      const inventory = new Inventory(products);
      expext(inventory.getProductInfo(index)).toEqual(result);
    }
  );

  //   test("각 상품의 재고 수량을 고려하여 결제 가능 여부를 확인한다.", () => {
  //     const inventory = new Inventory(products);
  //     const USER_ORDER = { 콜라: 10, 사이다: 3 };
  //     expect(inventory.checkOrder(USER_ORDER)).toBe(true);
  //   });
});
