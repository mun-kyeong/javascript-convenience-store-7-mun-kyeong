import { Console } from "@woowacourse/mission-utils";
import { Order, order, Receipt } from "../src/Order";
import { Inventory } from "../src/repository/Inventory";
import { readDocs } from "../src/utils/readDocs";
import { Promotion } from "../src/repository/Promotion";
import { InventoryManager } from "../src/InventoryManager";
import { PromotionManager } from "../src/PromotionManager";
import { PROMOTION_PRODUCT } from "../src/constant/convenience";

describe("주문목록 클래스 테스트", () => {
  let inventoryManager;
  let promotionManager;
  let inventory;

  beforeEach(async () => {
    const products = await readDocs("products");
    inventory = new Inventory(products);
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
    ["N", "", []],
  ])(
    "사용자의 프로모션 추가 여부 %s 입력 판단하기",
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

  test.each([
    [
      "Y",
      "콜라",
      4,
      [["콜라", 13]],
      { name: "콜라pro", price: 1000, quantity: 0, promotion: "탄산2+1" },
      { name: "콜라", price: 1000, quantity: 7, promotion: "null" },
    ],
    [
      "N",
      "콜라",
      4,
      [["콜라", 9]],
      { name: "콜라pro", price: 1000, quantity: 1, promotion: "탄산2+1" },
      { name: "콜라", price: 1000, quantity: 10, promotion: "null" },
    ],
  ])(
    "사용자의 프로모션 비혜택 물품 구매 여부 %s 입력 판단하기",
    (
      userAnswer,
      promoionItem,
      noPromotionQuantity,
      orderResult,
      promotionResult,
      generalResult
    ) => {
      const USER_ORDER = [["콜라", 13]];
      const order = new Order(USER_ORDER, inventoryManager, promotionManager);
      order.payForFullPrice(userAnswer, promoionItem, noPromotionQuantity);
      expect(order.getOrderInventory()).toEqual(orderResult);
      expect(inventory.getProductInfo(PROMOTION_PRODUCT(promoionItem))).toEqual(
        promotionResult
      );
      expect(inventory.getProductInfo(promoionItem)).toEqual(generalResult);
    }
  );

  test.each([
    [[["오렌지주스", 5]], [["오렌지주스", 1]], [["오렌지주스", 4]]],
    [[["사이다", 8]], [["사이다", 2]], [["사이다", 6]]],
  ])("프로모션이 적용되지 않는 물품 판단", (userOrder, result, result2) => {
    const order = new Order(userOrder, inventoryManager, promotionManager);
    userOrder.forEach((userOrders, index) => {
      const nonOrderInfo = order.nonPromotionOrder(
        userOrders[0],
        userOrders[1]
      );
      const orderInfo = order.promotionOrder(userOrders[0], userOrders[1]);
      expect(nonOrderInfo).toEqual(result[index]);
      expect(orderInfo).toEqual(result2[index]);
    });
  });

  test.each([
    [
      "Y",
      [
        ["콜라", 7],
        ["사이다", 6],
      ],
      300,
    ],
    ["N", [["콜라", 10]], 0],
  ])("멤버십 할인 %s 적용 여부 판단", (userAnswer, userOrder, membership) => {
    const order = new Order(userOrder, inventoryManager, promotionManager);
    order.applyMembershipDiscount(userAnswer);
    expect(order.getMembershipDiscount()).toBe(membership);
  });
});
