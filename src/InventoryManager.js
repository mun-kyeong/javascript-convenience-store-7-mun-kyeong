import { Console } from "@woowacourse/mission-utils";
import { PROMOTION_PRODUCT } from "./constant/convenience";

export class InventoryManager {
  #inventory;
  #promotion;

  constructor(inventory, promotion) {
    this.#inventory = inventory;
    this.#promotion = promotion;
  }

  deletePromotionFirst(userOrder, todayPromtion) {
    userOrder.forEach(([order, quantity]) => {
      if (
        todayPromtion[order] === undefined ||
        todayPromtion[order].quantity === -1
      ) {
        this.#inventory.deleteQuantity(order, quantity);
        return;
      }
      Console.print("here");
      this.#inventory.deleteQuantity(PROMOTION_PRODUCT(order), quantity);
      return;
    });
  }
}
