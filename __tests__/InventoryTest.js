import { Console } from "@woowacourse/mission-utils";
import { Inventory } from "../src/repository/Inventory";
import { readDocs, readFileInfo, readProducts } from "../src/utils/readDocs";

describe("재고 관리 기능 테스트", () => {
  let inventory;
  beforeEach(async () => {
    const products = await readDocs("products");
    inventory = new Inventory(products);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test.each([
    [
      "콜라pro",
      { name: "콜라pro", price: 1000, quantity: 10, promotion: "탄산2+1" },
    ],
    [
      "사이다pro",
      { name: "사이다pro", price: 1000, quantity: 8, promotion: "탄산2+1" },
    ],
    ["사이다", { name: "사이다", price: 1000, quantity: 7, promotion: "null" }],
    [
      "오렌지주스pro",
      {
        name: "오렌지주스pro",
        price: 1800,
        quantity: 9,
        promotion: "MD추천상품",
      },
    ],
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
    [[["탄산수pro", 6]], false],
  ])(
    "각 상품의 재고 수량을 고려하여 결제 가능 여부를 확인한다.",
    (userOrder, result) => {
      expect(inventory.checkOrder(userOrder)).toBe(result);
    }
  );

  test.each([
    [["콜라", 10], [0]],
    [["콜라pro", 5], [5]],
    [["감자칩pro", 3], [2]],
    [["에너지바", 5], [0]],
  ])("상품 구매 시 결제된 수량만큼 재고 차감", (userOrder, result) => {
    inventory.deleteQuantity(userOrder[0], userOrder[1]);
    const orderInfo = inventory.getProductInfo(userOrder[0]);
    expect(orderInfo.quantity).toBe(result[0]);
  });

  test.each([
    ["오렌지주스", true],
    ["콜라", true],
    ["비타민워터", false],
  ])("%s가 프모로션 상품인지 확인한다.", (product, result) => {
    expect(inventory.isPromotionProduct(product)).toBe(result);
  });

  test.each([
    ["콜라pro", 10, true],
    ["콜라", 11, false],
    ["사이다pro", 8, true],
    ["사이다", 9, false],
  ])("재고 수량 확인", (product, quantity, result) => {
    expect(inventory.hasQuantity(product, quantity)).toBe(result);
  });
});
