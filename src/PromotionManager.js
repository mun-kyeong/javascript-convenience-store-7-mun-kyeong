import { Console } from "@woowacourse/mission-utils";
import { PROMOTION_PRODUCT } from "./constant/convenience.js";

export class PromotionManager {
  #today;
  #promotion;
  #inventory;

  constructor(today, promotion, inventory) {
    this.#today = today;
    this.#promotion = promotion;
    this.#inventory = inventory;
  }

  getTodayPromotion(userOrder) {
    userOrder = userOrder.filter(
      (order) =>
        this.#filterPromotionalItems(order) &&
        this.#isPromotionActiveToday(order)
    );
    return this.#returnPresentInventory(userOrder);
  }

  #filterPromotionalItems(order) {
    return this.#inventory.isPromotionProduct(order[0]);
  }

  #isPromotionActiveToday(order) {
    const orderPromotion = this.#inventory.getProductInfo(
      PROMOTION_PRODUCT(order[0])
    ).promotion;
    return orderPromotion !== "null";
  }

  #returnPresentInventory(userOrder) {
    return userOrder.reduce((presentInventory, order) => {
      presentInventory[order[0]] = this.#getProductPromotionToday(order);
      return presentInventory;
    }, {});
  }

  #getProductPromotionToday(order) {
    const [buy, get] = this.#promotion.getPromotiondiscount(
      this.#today,
      this.#inventory.getProductInfo(PROMOTION_PRODUCT(order[0])).promotion
    );
    const price = this.#inventory.getProductInfo(
      PROMOTION_PRODUCT(order[0])
    ).price;

    return { paidQuantity: buy, quantity: get, price: price };
  }
}
