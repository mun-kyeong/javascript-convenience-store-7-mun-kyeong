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
    [
      [["감자칩", 3]],
      { name: "감자칩", price: 1500, quantity: 2, promotion: "null" },
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
      inventoryManager.deletePromotion(userOrder, todayPromtion);
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
      inventoryManager.deletePromotion(userOrder, todayPromtion);
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
      [["콜라", 12]],
      { 콜라: { quantity: 1, price: 1000 } },
      "콜라",
      {
        name: "콜라",
        price: 1000,
        quantity: 8,
        promotion: "null",
      },
      "콜라pro",
      {
        name: "콜라pro",
        price: 1000,
        quantity: 0,
        promotion: "탄산2+1",
      },
    ],
    [
      [["사이다", 10]],
      { 사이다: { quantity: 1, price: 1000 } },
      "사이다",
      {
        name: "사이다",
        price: 1000,
        quantity: 5,
        promotion: "null",
      },
      "사이다pro",
      {
        name: "사이다pro",
        price: 1000,
        quantity: 0,
        promotion: "탄산2+1",
      },
    ],
  ])(
    "프로모션 재고가 없을 경우 일반 재고에서 차감",
    (
      userOrder,
      todayPromtion,
      expectTitle1,
      expect1,
      expectTitle2,
      expect2
    ) => {
      const inventoryManager = new InventoryManager(inventory, promotion);
      inventoryManager.deletePromotion(userOrder, todayPromtion);
      expect(inventory.getProductInfo(expectTitle1)).toEqual(expect1);
      expect(inventory.getProductInfo(expectTitle2)).toEqual(expect2);
    }
  );
});
