import { Console } from "@woowacourse/mission-utils";
import { PROMOTION_PRODUCT } from "../constant/convenience";

export class DiscountManagement {
  #today;
  #order;
  #promotion;
  #inventory;

  constructor(today, order, promotion, inventory) {
    this.#today = today;
    this.#promotion = promotion;
    this.#inventory = inventory;
    this.#order = order;
  }

  getPresentInventoryInfo() {
    this.#order = this.#order.filter(
      (orderInfo) =>
        this.#filterPromotionalItems(orderInfo) &&
        this.#isPromotionActiveToday(orderInfo)
    );

    return this.#returnPresentInventory();
  }

  #filterPromotionalItems(orderInfo) {
    return this.#inventory.isPromotionProduct(orderInfo[0]);
  }

  #isPromotionActiveToday(orderInfo) {
    const orderPromotion = this.#inventory.getProductInfo(
      PROMOTION_PRODUCT(orderInfo[0])
    ).promotion;
    return orderPromotion !== "null";
  }

  #returnPresentInventory() {
    return this.#order.reduce((presentInventory, orderInfo) => {
      presentInventory[orderInfo[0]] =
        this.#getProductPromotionToday(orderInfo);
      return presentInventory;
    }, {});
  }

  #getProductPromotionToday(orderInfo) {
    const [buy, get] = this.#promotion.getPromotiondiscount(
      this.#today,
      this.#inventory.getProductInfo(PROMOTION_PRODUCT(orderInfo[0])).promotion
    );
    const price = this.#inventory.getProductInfo(orderInfo[0]).price;
    return { quantity: get, price: price };
  }
  //TODO : 추후 리팩토링 필요
}
