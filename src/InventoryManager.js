import { Console } from "@woowacourse/mission-utils";
import { PROMOTION_PRODUCT } from "./constant/convenience";

export class InventoryManager {
  #inventory;
  #promotion;

  constructor(inventory, promotion) {
    this.#inventory = inventory;
    this.#promotion = promotion;
  }

  deletePromotion(userOrder, todayPromtion) {
    userOrder.forEach(([order, quantity]) => {
      if (
        todayPromtion[order] === undefined ||
        todayPromtion[order].quantity === -1
      ) {
        this.#inventory.deleteQuantity(order, quantity);
        return;
      }
      if (this.#inventory.hasQuantity(PROMOTION_PRODUCT(order), quantity)) {
        this.#inventory.deleteQuantity(PROMOTION_PRODUCT(order), quantity);
        return;
      }

      const availableQuantity = this.#inventory.getProductInfo(
        PROMOTION_PRODUCT(order)
      ).quantity;

      this.#inventory.deleteQuantity(
        PROMOTION_PRODUCT(order),
        availableQuantity
      );

      this.deleteNormal(order, quantity - availableQuantity);
    });
  }
  //TODO : 함수 분할 필요

  deleteNormal(order, quantity) {
    this.#inventory.deleteQuantity(order, quantity);
  }
}
