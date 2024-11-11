import { Console } from "@woowacourse/mission-utils";
import { HELPER_MESSAGE } from "../constant/helperMessage.js";
import { parserOrder } from "../utils/parserOrder.js";
import { getInput } from "./Console.js";

export class InputHandler {
  static async getUserOrder() {
    const userOrder = await getInput(HELPER_MESSAGE.orderMessage);
    return parserOrder(userOrder);
  }

  static async askQuestion(message) {
    const orderQuestion = await getInput(message);
    return orderQuestion;
  }

  static async orderQuestion(order, userOrders) {
    const answers = [];
    answers.push(await this.askAdditionalOrder(order, userOrders));
    answers.push(await this.askNoPromotionOrder(order, userOrders));

    return;
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
    return await this.repeatQuestion(
      promotions,
      HELPER_MESSAGE.noPromotionOrder
    );
  }

  static async askAdditionalOrder(order, userOrders) {
    const additionalOrder = this.#hasAdditionalOrder(order, userOrders);
    if (additionalOrder.length === 0) return [];
    return await this.repeatQuestion(
      additionalOrder,
      HELPER_MESSAGE.additionalOrder
    );
  }

  static async repeatQuestion(additionalOrder, helperMessage) {
    const answers = [];
    for (const order of additionalOrder) {
      const answer = await this.askQuestion(helperMessage(order[0], order[1]));
      answers.push(answer);
    }
    return answers;
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
