import { Console } from "@woowacourse/mission-utils";
import { HELPER_MESSAGE } from "../constant/helperMessage.js";
import { parserOrder } from "../utils/parserOrder.js";
import { getInput, printOneLine } from "./Console.js";

export class InputHandler {
  static async getUserOrder() {
    const userOrder = await getInput(HELPER_MESSAGE.orderMessage);
    return parserOrder(userOrder);
  }

  static async orderQuestion(order, userOrders) {
    const wait = await this.askAdditionalOrder(order, userOrders);
    const wait2 = await this.askNoPromotionOrder(order, userOrders);
    const wait3 = await this.askMebership();
    return;
  }

  static async askMebership() {
    const membershipAnswer = await getInput(HELPER_MESSAGE.membershipQuestion);
    return membershipAnswer === "Y";
  }

  static async askNoPromotionOrder(order, userOrders) {
    const promotions = [];
    userOrders.forEach(async ([userOrder, quantity]) => {
      const [promotionOrder, noPromotionOrder] = order.overPromotionOrder(
        userOrder,
        quantity
      );
      if (noPromotionOrder !== 0)
        promotions.push([userOrder, noPromotionOrder]);
    });

    for (const orderInfo of promotions) {
      const answer = await getInput(
        HELPER_MESSAGE.noPromotionOrder(orderInfo[0], orderInfo[1])
      );
      order.payForFullPrice(answer, orderInfo[0], orderInfo[1]);
    }
    return;
  }

  static async askAdditionalOrder(order, userOrders) {
    order.setPromotionOrder(userOrders);
    const additionalOrder = this.#hasAdditionalOrder(order, userOrders);
    if (additionalOrder.length === 0) return [];

    for (const orderInfo of additionalOrder) {
      const answer = await getInput(
        HELPER_MESSAGE.additionalOrder(orderInfo[0], orderInfo[1])
      );
      order.addPromotionItem(answer, orderInfo[0], orderInfo[1]);
    }
    return;
  }

  static #hasAdditionalOrder(order, userOrders) {
    let additionalOrder = [];
    userOrders.forEach(([userOrder, quantity]) => {
      const subOrder = order.findAdditionOrder(userOrder, quantity);
      if (subOrder !== undefined) additionalOrder.push(subOrder);
    });
    return additionalOrder;
  }
}
