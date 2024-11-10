import { Console } from "@woowacourse/mission-utils";
import { Order, order, Receipt } from "../src/Order";
import { Inventory } from "../src/repository/Inventory";
import { readDocs } from "../src/utils/readDocs";
import { Promotion } from "../src/repository/Promotion";
import { InventoryManager } from "../src/InventoryManager";
import { PromotionManager } from "../src/PromotionManager";

describe("주문목록 클래스 테스트", () => {
  let inventoryManager;
  let promotionManager;

  beforeEach(async () => {
    const products = await readDocs("products");
    const inventory = new Inventory(products);
    inventoryManager = new InventoryManager(inventory);
    const promotions = await readDocs("promotions");
    const promotion = new Promotion(promotions);
    promotionManager = new PromotionManager("2024-10-01", promotion, inventory);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test("물품 구매 시 영수증에 구매한 상품명, 수량, 가격 저장", () => {
    const USER_ORDER = [
      ["콜라", 2],
      ["사이다", 1],
    ];
    const USER_ORDER_INFO = [
      ["콜라", 2],
      ["사이다", 1],
    ];
    const receipt = new Order(USER_ORDER, inventoryManager, promotionManager);
    expect(receipt.getOrderInventory()).toEqual(USER_ORDER_INFO);
  });

  test.each([
    ["Y", "콜라", [["콜라", 1]]],
    ["N", , []],
  ])(
    "사용자의 프로모션 추가 여부 %d 입력 판단하기",
    (userAnswer, promoionItem, result) => {
      const USER_ORDER = [
        ["콜라", 2],
        ["사이다", 1],
      ];
      const order = new Order(USER_ORDER, inventoryManager, promotionManager);
      order.addPromotionItem(userAnswer, promoionItem);
      expect(order.getPresentInventory()).toEqual(result);
    }
  );

  // test("프로모션에 따라 무료로 제공된 증정 상품의 목록 저장", () => {
  //   const TODAY = "2024-10-01";
  //   const USER_ORDER = [
  //     ["콜라", 2],
  //     ["오렌지주스", 1],
  //   ];
  //   const PRESENT_ORDER_INFO = {
  //     콜라: { quantity: 1, price: 1000 },
  //     오렌지주스: { quantity: 1, price: 1800 },
  //   };
  //   const receipt = new Order(USER_ORDER, inventory);

  //   // promotion.getPromotiondiscount(TODAY, receipt.getOrderInventory());
  //   // expect(receipt.getOrderInventory()).toEqual(PRESENT_ORDER_INFO);
  // });
});
