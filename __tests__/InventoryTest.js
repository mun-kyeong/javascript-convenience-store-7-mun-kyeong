import { Console } from "@woowacourse/mission-utils";
import { Inventory } from "../src/Inventory";
import { readProducts } from "../src/utils/readDocs";

describe("재고 관리 기능 테스트", () => {
  let inventory;
  beforeEach(async () => {
    const products = await readProducts();
    inventory = new Inventory(products);
  });

  test.each([
    [
      "콜라pro",
      { name: "콜라", price: 1000, quantity: 10, promotion: "탄산2+1" },
    ],
    [
      "사이다pro",
      { name: "사이다", price: 1000, quantity: 8, promotion: "탄산2+1" },
    ],
    ["사이다", { name: "사이다", price: 1000, quantity: 7, promotion: "null" }],
  ])(
    'Inventory 클래스의 "%s" 상품이 저장되는지 확인한다.',
    (keyword, result) => {
      expect(inventory.getProductInfo(keyword)).toEqual(result);
    }
  );

  test.each([
    [
      [
        ["콜라", 10],
        ["사이다", 3],
      ],
      true,
    ],
    [[["콜라", 11]], false],
    [[["오렌지주스pro", 9]], true],
    [[["탄산수", 6]], false],
  ])(
    "각 상품의 재고 수량을 고려하여 결제 가능 여부를 확인한다.",
    (userOrder, result) => {
      expect(inventory.checkOrder(userOrder)).toBe(result);
    }
  );

  test("상품 구매 시 결제된 수량만큼 재고 차감", () => {
    const USER_ORDER = [["콜라", 10]];
    const convenienceStore = new ConvenienceStore();
    convenienceStore.order(USER_ORDER);
    expect(inventory.getProductInfo(USER_ORDER[0][0].quantity)).toBe(0);
  });
});
