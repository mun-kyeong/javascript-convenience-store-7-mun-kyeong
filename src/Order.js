import { Console } from "@woowacourse/mission-utils";
import { Inventory } from "./repository/Inventory";

export class Order {
  #orderInventory = []; // 사용자가 주문한 상품명, 수량, 가격 저장
  #presentInventory = []; // 프로모션에 의해 제공된 상품명, 수량, 가격 저장
  #inventoryManager;
  #promotionManager;

  constructor(orders, inventoryManager, promotionManager) {
    this.#inventoryManager = inventoryManager;
    this.#promotionManager = promotionManager;
    this.#orderInventory = orders;
  }

  // #addOrderPirce(order) {
  //   // Console.print(this.#orderInventory.getPirce);
  //   return {
  //     price: this.#inventoryManager.getPrice(order[0]),
  //     quantity: order[1],
  //   };
  // }

  getOrderInventory() {
    return this.#orderInventory;
  }

  getPresentInventory() {
    return this.#presentInventory;
  }

  addPromotionItem(userAnswer, order) {
    if (userAnswer === "N") return;
    const todayPromotion = this.#promotionManager.getTodayPromotion(
      this.#orderInventory
    );
    this.#presentInventory.push([order, todayPromotion[order].quantity]);
  }
}
