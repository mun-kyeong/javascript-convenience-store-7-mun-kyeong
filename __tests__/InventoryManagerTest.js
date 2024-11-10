import { Console } from "@woowacourse/mission-utils";
import { PROMOTION_PRODUCT } from "../src/constant/convenience";
import { PromotionManager } from "../src/PromotionManager";
import { Inventory } from "../src/repository/Inventory";
import { Promotion } from "../src/repository/Promotion";
import { readDocs } from "../src/utils/readDocs";
import { InventoryManager } from "../src/InventoryManager";

describe("재고관리 클래스 테스트", () => {
  let inventory;
  let promotion;
  let promotionManager;

  beforeEach(async () => {
    const products = await readDocs("products");
    const promotions = await readDocs("promotions");
    promotion = new Promotion(promotions);
    inventory = new Inventory(products);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test.each([
    [
      [["콜라", 5]],
      { name: "콜라pro", price: 1000, quantity: 5, promotion: "탄산2+1" },
      true,
    ],
    [
      [["사이다", 3]],
      { name: "사이다pro", price: 1000, quantity: 5, promotion: "탄산2+1" },
      true,
    ],
    [
      [["오렌지주스", 5]],
      {
        name: "오렌지주스pro",
        price: 1800,
        quantity: 4,
        promotion: "MD추천상품",
      },
      true,
    ],
    [
      [["탄산수", 3]],
      { name: "탄산수pro", price: 1200, quantity: 2, promotion: "탄산2+1" },
      true,
    ],
    [
      [["비타민워터", 3]],
      { name: "비타민워터", price: 1500, quantity: 3, promotion: "null" },
      false,
    ],
  ])(
    "프로모션 기간 중이라면 프로모션 재고를 우선적으로 차감한다.",
    (userOrder, result, isPromotion) => {
      promotionManager = new PromotionManager(
        "2024-10-10",
        promotion,
        inventory
      );
      const inventoryManager = new InventoryManager(inventory, promotion);
      const todayPromtion = promotionManager.getTodayPromotion(userOrder);
      inventoryManager.deletePromotionFirst(userOrder, todayPromtion);
      Console.print(PROMOTION_PRODUCT(userOrder[0][0]));
      if (isPromotion) {
        expect(
          inventory.getProductInfo(PROMOTION_PRODUCT(userOrder[0][0]))
        ).toEqual(result);
      } else {
        expect(inventory.getProductInfo(userOrder[0][0])).toEqual(result);
      }
    }
  );

  test.each([
    [
      [["콜라", 5]],
      { name: "콜라pro", price: 1000, quantity: 10, promotion: "탄산2+1" },
      true,
    ],
    [
      [["사이다", 3]],
      { name: "사이다", price: 1000, quantity: 4, promotion: "null" },
      false,
    ],
  ])(
    "프로모션 기간이 아닐 경우 일반 재고를 차감한다.",
    (userOrder, result, isPromotion) => {
      promotionManager = new PromotionManager(
        "2026-10-10",
        promotion,
        inventory
      );
      const inventoryManager = new InventoryManager(inventory, promotion);
      const todayPromtion = promotionManager.getTodayPromotion(userOrder);
      Console.print(todayPromtion);
      inventoryManager.deletePromotionFirst(userOrder, todayPromtion);
      if (isPromotion) {
        expect(
          inventory.getProductInfo(PROMOTION_PRODUCT(userOrder[0][0]))
        ).toEqual(result);
      } else {
        expect(inventory.getProductInfo(userOrder[0][0])).toEqual(result);
      }
    }
  );
});
