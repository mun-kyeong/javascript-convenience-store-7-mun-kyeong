import { Inventory } from "../src/repository/Inventory";
import { Promotion } from "../src/repository/Promotion";
import { readDocs } from "../src/utils/readDocs";
import { PromotionManager } from "../src/PromotionManager";

describe("할인 관리자 클래스 테스트", () => {
  let inventory;
  let promotion;

  beforeEach(async () => {
    const products = await readDocs("products");
    const promotions = await readDocs("promotions");
    promotion = new Promotion(promotions);
    inventory = new Inventory(products);
  });

  test("프로모션 기간에 해당되는 상품의 정보를 가져온다.", () => {
    const TODAY = "2024-10-10";
    const USER_ORDER = [
      ["콜라", 2],
      ["오렌지주스", 1],
      ["비타민워터", 3],
    ];
    const PRESENT_INVENTORY = {
      콜라: { paidQuantity: 2, quantity: 1, price: 1000 },
      오렌지주스: { paidQuantity: 1, quantity: 1, price: 1800 },
    };
    const discountManager = new PromotionManager(TODAY, promotion, inventory);
    const result = discountManager.getTodayPromotion(USER_ORDER);
    expect(result).toEqual(PRESENT_INVENTORY);
  });
});
