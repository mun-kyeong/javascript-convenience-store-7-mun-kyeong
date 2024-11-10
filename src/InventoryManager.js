import { Console } from "@woowacourse/mission-utils";
import { PROMOTION_PRODUCT } from "./constant/convenience";

export class InventoryManager {
  #inventory;

  constructor(inventory) {
    this.#inventory = inventory;
  }

  deletePromotion(userOrder, todayPromtion) {
    userOrder.forEach(([order, quantity]) => {
      if (this.#isNotPromotionOrder(todayPromtion, order, quantity)) return;
      // Console.print("2");
      if (this.#isEnoughQunatity(order, quantity)) return;
      // Console.print("3");

      const availableQuantity = this.#getAvailableQuantity(order);
      this.deleteOrderQuantity(PROMOTION_PRODUCT(order), availableQuantity);
      this.deleteOrderQuantity(order, quantity - availableQuantity);
    });
  }

  #isNotPromotionOrder(todayPromtion, order, quantity) {
    if (
      todayPromtion[order] === undefined ||
      todayPromtion[order].quantity === -1
    ) {
      this.deleteOrderQuantity(order, quantity);
      return true;
    }
    return false;
  }

  #isEnoughQunatity(order, quantity) {
    if (this.#inventory.hasQuantity(PROMOTION_PRODUCT(order), quantity)) {
      this.deleteOrderQuantity(PROMOTION_PRODUCT(order), quantity);
      return true;
    }
    return false;
  }

  #getAvailableQuantity(order) {
    return this.#inventory.getProductInfo(PROMOTION_PRODUCT(order)).quantity;
  }

  deleteOrderQuantity(order, quantity) {
    this.#inventory.deleteQuantity(order, quantity);
  }

  getOrderQuantity(order) {
    return this.#inventory.getProductInfo(order).quantity;
  }

  getPrice(order) {
    return this.#inventory.getProductInfo(order).price;
  }
}
